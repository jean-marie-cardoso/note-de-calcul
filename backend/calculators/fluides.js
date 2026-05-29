const { document, fmt, mm, m3h, lps, value, selectValue, setResults } = require("./runtime");
const { compressedAirPipes, compressedAirEquivalentLengths } = require('../data/fluides');


function renderGas() {
  wrapForm(`
    <div class="form-grid">
      ${field("gasPower", "Puissance utile totale", "240", "kW")}
      ${field("gasPci", "PCI gaz", "10.5", "kWh/m3")}
      ${field("gasEfficiency", "Rendement", "92", "%")}
      ${field("gasDiversity", "Coefficient foisonnement", "1")}
    </div>
    <div id="calcResults"></div>
  `);
}

function calculateGas() {
  const power = value("gasPower");
  const pci = value("gasPci");
  const efficiency = value("gasEfficiency") / 100;
  const diversity = value("gasDiversity");
  const absorbed = power / efficiency;
  const flow = absorbed / pci * diversity;
  setResults([
    { label: "Puissance absorbee", value: `${fmt(absorbed, 1)} kW` },
    { label: "Debit gaz", value: `${fmt(flow, 2)} m3/h` },
    { label: "Debit gaz", value: `${fmt(flow * 1000 / 3600, 2)} l/s` },
    { label: "Energie horaire", value: `${fmt(flow * pci, 1)} kWh/h` }
  ], "Debit gaz");
}

function renderCompressedAir() {
  wrapForm(`
    <div class="form-grid">
      ${field("airFlow", "Debit", "27", "m3/h")}
      ${field("airTemp", "Temperature d'utilisation", "20", "deg C")}
      ${field("airPressureEff", "Pression effective origine", "10", "bar")}
      ${field("airPressureMin", "Pression effective minimum", "9.75", "bar")}
      ${field("airLength", "Longueur de tuyauterie", "51", "m")}
      ${selectField("airPipe", "Diametre retenu", compressedAirPipes.map((pipe) => ({
        value: String(pipe.nominal),
        label: `DN${pipe.nominal} / Ø ${pipe.retained} / int. ${pipe.inner} mm`
      })))}
      ${field("airLongElbows", "Coudes grand rayon", "4", "u", "number", "min=\"0\" step=\"1\"")}
      ${field("airElbows", "Coudes rayon moyen", "5", "u", "number", "min=\"0\" step=\"1\"")}
      ${field("airTees", "Tes", "7", "u", "number", "min=\"0\" step=\"1\"")}
      ${field("airValves", "Vannes", "2", "u", "number", "min=\"0\" step=\"1\"")}
      ${field("airGlobes", "Robinets a soupape", "0", "u", "number", "min=\"0\" step=\"1\"")}
    </div>
    <div id="calcResults"></div>
    <div class="result-table tube-output" id="airPipeOutput"></div>
  `, "La perte est calculee avec formule empirique, puis controlee avec le diametre retenu.");
}

function calculateCompressedAir() {
  const flow = value("airFlow");
  const temp = value("airTemp");
  const pressureEff = value("airPressureEff");
  const pressureMin = value("airPressureMin");
  const pressureAbs = pressureEff + 1.013;
  const admissibleLoss = Math.max(pressureEff - pressureMin, 0.001);
  const selected = compressedAirPipes.find((pipe) => pipe.nominal === Number(selectValue("airPipe"))) || compressedAirPipes[0];
  const equivalents = compressedAirEquivalentLengths[selected.retained] || compressedAirEquivalentLengths[20];
  const accessoryLength =
    value("airLongElbows") * equivalents.longElbow +
    value("airElbows") * equivalents.elbow +
    value("airTees") * equivalents.tee +
    value("airValves") * equivalents.valve +
    value("airGlobes") * equivalents.globe;
  const equivalentLength = value("airLength") + accessoryLength;
  const diameterTheory = compressedAirTheoreticalDiameter(flow, equivalentLength, pressureAbs, admissibleLoss);
  const recommended = compressedAirPipes.find((pipe) => pipe.inner >= diameterTheory) || compressedAirPipes.at(-1);
  const realLoss = compressedAirPressureLoss(flow, equivalentLength, pressureAbs, selected.inner);
  const realLossRecommended = compressedAirPressureLoss(flow, equivalentLength, pressureAbs, recommended.inner);
  const density = compressedAirDensity(pressureAbs, temp);
  const actualFlowM3h = flow * (1.013 / pressureAbs) * ((temp + 273.15) / 293.15);
  const velocity = actualFlowM3h / 3600 / (Math.PI * Math.pow(selected.inner / 1000, 2) / 4);
  const status = realLoss <= admissibleLoss ? "OK" : "A augmenter";
  const output = document.getElementById("airPipeOutput");
  if (output) output.innerHTML = renderCompressedAirPipeOutput(selected, recommended, equivalents);

  setResults([
    { label: "Diametre theorique", value: mm(diameterTheory) },
    { label: "Diametre conseille", value: `DN${recommended.nominal} / Ø ${recommended.retained}` },
    { label: "Diametre retenu", value: `DN${selected.nominal} / int. ${fmt(selected.inner, 1)} mm` },
    { label: "Longueur equivalente", value: `${fmt(equivalentLength, 1)} m` },
    { label: "Dont accessoires", value: `${fmt(accessoryLength, 1)} m` },
    { label: "Perte admissible", value: `${fmt(admissibleLoss, 3)} bar` },
    { label: "Perte reelle retenue", value: `${fmt(realLoss, 3)} bar` },
    { label: "Perte avec diam. conseille", value: `${fmt(realLossRecommended, 3)} bar` },
    { label: "Vitesse estimee", value: `${fmt(velocity, 2)} m/s` },
    { label: "Controle", value: status },
    { label: "Pression absolue", value: `${fmt(pressureAbs, 3)} bar` },
    { label: "Masse volumique", value: `${fmt(density, 2)} kg/m3` }
  ], "Tuyauterie air comprime");
}

function compressedAirTheoreticalDiameter(flowM3h, lengthM, pressureAbsBar, lossBar) {
  if (flowM3h <= 0 || lengthM <= 0 || pressureAbsBar <= 0 || lossBar <= 0) return 0;
  return Math.pow(89.9 * Math.pow(flowM3h, 1.85) * lengthM / (pressureAbsBar * lossBar), 1 / 5);
}

function compressedAirPressureLoss(flowM3h, lengthM, pressureAbsBar, innerDiameterMm) {
  if (flowM3h <= 0 || lengthM <= 0 || pressureAbsBar <= 0 || innerDiameterMm <= 0) return 0;
  return 89.9 * Math.pow(flowM3h, 1.85) * lengthM / (pressureAbsBar * Math.pow(innerDiameterMm, 5));
}

function compressedAirDensity(pressureAbsBar, tempC) {
  return pressureAbsBar * 100000 / (287.05 * (tempC + 273.15));
}

function renderCompressedAirPipeOutput(selected, recommended, equivalents) {
  return `
    <div class="result-head">Tube</div>
    <div class="result-head">DN</div>
    <div class="result-head">Ø ext.</div>
    <div class="result-head">Ep.</div>
    <div class="result-head">Ø int.</div>
    <div class="result-head">Pouce</div>
    <strong>Retenu</strong>
    <span>${selected.nominal}</span>
    <span>${fmt(selected.outer, 1)}</span>
    <span>${fmt(selected.thickness, 1)}</span>
    <span>${fmt(selected.inner, 1)}</span>
    <span>${selected.inch}</span>
    <strong>Conseille</strong>
    <span>${recommended.nominal}</span>
    <span>${fmt(recommended.outer, 1)}</span>
    <span>${fmt(recommended.thickness, 1)}</span>
    <span>${fmt(recommended.inner, 1)}</span>
    <span>${recommended.inch}</span>
    <div class="result-head">Eq. accessoire</div>
    <span>Coude GR ${fmt(equivalents.longElbow, 2)} m</span>
    <span>Coude ${fmt(equivalents.elbow, 2)} m</span>
    <span>Te ${fmt(equivalents.tee, 2)} m</span>
    <span>Vanne ${fmt(equivalents.valve, 2)} m</span>
    <span>Soupape ${fmt(equivalents.globe, 2)} m</span>
  `;
}


module.exports = {
  calculateGas,
  calculateCompressedAir
};
