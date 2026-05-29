const { document, fmt, mm, m3h, lps, value, selectValue, setResults } = require("./runtime");
const { conversionGroups, conversionReferences } = require('../data/conversions');


function renderConversion() {
  wrapForm(`
    <div class="form-grid">
      ${selectField("convFamily", "Famille", Object.entries(conversionGroups).map(([value, group]) => ({ value, label: group.label })))}
      ${field("convValue", "Valeur a convertir", "1", "", "number", "step=\"any\"")}
      ${selectField("convFrom", "Unite source", [])}
      ${selectField("convTo", "Unite cible", [])}
    </div>
    <div id="calcResults"></div>
    <div class="conversion-reference">
      <div class="result-head">Famille</div>
      <div class="result-head">Reference 1</div>
      <div class="result-head">Reference 2</div>
      <div class="result-head">Reference 3</div>
      ${conversionReferences.map((row) => row.map((cell, index) => index === 0 ? `<strong>${cell}</strong>` : `<span>${cell}</span>`).join("")).join("")}
    </div>
  `, "Module Conversions");
}

function calculateConversion() {
  const family = selectValue("convFamily") || "length";
  const group = conversionGroups[family];
  populateConversionUnits(family);
  const amount = value("convValue");
  const from = group.units.find((unit) => unit.id === selectValue("convFrom")) || group.units[0];
  const to = group.units.find((unit) => unit.id === selectValue("convTo")) || group.units[1] || group.units[0];

  if (family === "temperature") {
    const celsius = toCelsius(amount, from.id);
    const converted = fromCelsius(celsius, to.id);
    setResults([
      { label: "Valeur convertie", value: `${formatConversion(converted)} ${to.label}` },
      { label: "Valeur en Celsius", value: `${formatConversion(celsius)} deg C` },
      { label: "Formule", value: temperatureFormula(from.id, to.id) },
      { label: "Source", value: "Conversions/tableau de conversion" }
    ], "Conversions d'unites");
    return;
  }

  const baseValue = amount * from.factor;
  const converted = baseValue / to.factor;
  const factor = from.factor / to.factor;
  setResults([
    { label: "Valeur convertie", value: `${formatConversion(converted)} ${to.label}` },
    { label: `Valeur base (${group.base})`, value: `${formatConversion(baseValue)} ${group.base}` },
    { label: "Facteur source -> cible", value: formatConversion(factor) },
    { label: "Facteur inverse", value: formatConversion(1 / factor) }
  ], "Conversions d'unites");
}

function populateConversionUnits(family) {
  const group = conversionGroups[family];
  const fromSelect = document.getElementById("convFrom");
  const toSelect = document.getElementById("convTo");
  if (!group || !fromSelect || !toSelect) return;

  const currentFrom = fromSelect.value;
  const currentTo = toSelect.value;
  const options = group.units.map((unit) => `<option value="${unit.id}">${unit.label}</option>`).join("");
  fromSelect.innerHTML = options;
  toSelect.innerHTML = options;

  const defaults = {
    length: ["in", "mm"],
    area: ["acre", "ha"],
    volume: ["l", "m3"],
    mass: ["lb", "kg"],
    pressure: ["bar", "pa"],
    energy: ["kwh", "j"],
    power: ["cv", "w"],
    angle: ["rad", "deg"],
    temperature: ["c", "f"]
  };
  const ids = group.units.map((unit) => unit.id);
  const [defaultFrom, defaultTo] = defaults[family] || [ids[0], ids[1] || ids[0]];
  fromSelect.value = ids.includes(currentFrom) ? currentFrom : defaultFrom;
  toSelect.value = ids.includes(currentTo) ? currentTo : defaultTo;
}

function formatConversion(value) {
  if (!Number.isFinite(value)) return "-";
  const abs = Math.abs(value);
  if (abs > 0 && (abs < 0.000001 || abs >= 1000000000)) return value.toExponential(6).replace(".", ",");
  return value.toLocaleString("fr-FR", { maximumFractionDigits: 8 });
}

function toCelsius(value, unit) {
  if (unit === "f") return (value - 32) / 1.8;
  if (unit === "k") return value - 273.15;
  return value;
}

function fromCelsius(value, unit) {
  if (unit === "f") return value * 1.8 + 32;
  if (unit === "k") return value + 273.15;
  return value;
}

function temperatureFormula(from, to) {
  if (from === "c" && to === "f") return "deg F = 1,8 x deg C + 32";
  if (from === "c" && to === "k") return "K = deg C + 273,15";
  if (from === "f" && to === "c") return "deg C = (deg F - 32) / 1,8";
  if (from === "k" && to === "c") return "deg C = K - 273,15";
  return "conversion via deg C";
}


module.exports = {
  calculateConversion
};
