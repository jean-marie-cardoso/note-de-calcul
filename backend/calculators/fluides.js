const { document, fmt, mm, m3h, lps, value, selectValue, setResults } = require("./runtime");
const compressedAirPipes = [
  { nominal: 15, retained: 20, outer: 21.3, thickness: 2.6, inner: 16.1, inch: '1/2"' },
  { nominal: 20, retained: 25, outer: 26.9, thickness: 2.6, inner: 21.7, inch: '3/4"' },
  { nominal: 25, retained: 32, outer: 33.7, thickness: 3.2, inner: 27.3, inch: '1"' },
  { nominal: 32, retained: 40, outer: 42.4, thickness: 3.2, inner: 36, inch: '1 1/4"' },
  { nominal: 40, retained: 50, outer: 48.3, thickness: 3.2, inner: 41.9, inch: '1 1/2"' },
  { nominal: 50, retained: 65, outer: 60.3, thickness: 3.6, inner: 53.1, inch: '2"' },
  { nominal: 65, retained: 85, outer: 76.1, thickness: 3.6, inner: 68.9, inch: '2 1/2"' },
  { nominal: 80, retained: 100, outer: 88.9, thickness: 4, inner: 80.9, inch: '3"' },
  { nominal: 100, retained: 125, outer: 114.3, thickness: 4.5, inner: 105.3, inch: '4"' },
  { nominal: 125, retained: 150, outer: 139.7, thickness: 4.5, inner: 130.7, inch: '5"' },
  { nominal: 150, retained: 200, outer: 168.3, thickness: 4.5, inner: 159.3, inch: '6"' },
  { nominal: 200, retained: 250, outer: 219.1, thickness: 6.3, inner: 206.5, inch: '8"' },
  { nominal: 250, retained: 300, outer: 273, thickness: 6.3, inner: 260.4, inch: '10"' }
];

const compressedAirEquivalentLengths = {
  20: { globe: 0.6, tee: 0.5, elbow: 0.6, longElbow: 0.6, valve: 0.3 },
  25: { globe: 0.6, tee: 0.6, elbow: 0.5, longElbow: 0.3, valve: 0.3 },
  32: { globe: 0.9, tee: 0.75, elbow: 0.55, longElbow: 0.4, valve: 0.4 },
  40: { globe: 1.2, tee: 0.9, elbow: 0.6, longElbow: 0.5, valve: 0.5 },
  50: { globe: 2, tee: 1.5, elbow: 0.7, longElbow: 0.6, valve: 0.85 },
  65: { globe: 2.5, tee: 2, elbow: 0.9, longElbow: 0.7, valve: 1.1 },
  85: { globe: 4.3788, tee: 3.0909, elbow: 1.2364, longElbow: 0.9788, valve: 1.9576 },
  100: { globe: 6, tee: 4, elbow: 1.5, longElbow: 1.2, valve: 2.7 },
  125: { globe: 8.5, tee: 5.5, elbow: 1.8, longElbow: 1.5, valve: 4 },
  150: { globe: 11, tee: 7, elbow: 2.1, longElbow: 1.8, valve: 5 },
  200: { globe: 16, tee: 10, elbow: 2.7, longElbow: 2.5, valve: 7 },
  250: { globe: 21, tee: 15, elbow: 3.4, longElbow: 3, valve: 9 },
  300: { globe: 21, tee: 15, elbow: 3.4, longElbow: 3, valve: 9 }
};

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
