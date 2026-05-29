const ductPressureDiameters = [60, 80, 100, 125, 160, 200, 250, 315, 355, 400, 450, 500, 560, 630, 710, 800, 900, 1000, 1120, 1250];

const ductPressureMaterials = [
  { value: "acier_galva", label: "acier galvanise", roughness: 0.15 },
  { value: "spirale", label: "conduit agrafe spirale", roughness: 0.5 },
  { value: "acier_inox", label: "acier inoxydable", roughness: 0.05 },
  { value: "acier_noir", label: "acier noir lamine", roughness: 0.1 },
  { value: "aluminium", label: "aluminium", roughness: 0.002 },
  { value: "flexible", label: "flexible", roughness: 3 },
  { value: "plastique", label: "mat. plastique", roughness: 0.002 },
  { value: "beton_lisse", label: "beton lisse", roughness: 0.55 },
  { value: "beton_brut", label: "beton brut de decoffrage", roughness: 2 },
  { value: "brique", label: "paroi de brique", roughness: 2 },
  { value: "tole_rivee", label: "tole d'acier rivee", roughness: 2 }
];

const ductPressureRows = [
  { flow: 1800, length: 12, shape: "round", diameter: 315, width: 600, height: 300, fixed: 0, zeta: 0.8 },
  { flow: 1200, length: 8, shape: "rect", diameter: 250, width: 500, height: 250, fixed: 0, zeta: 1.2 },
  { flow: 800, length: 10, shape: "round", diameter: 250, width: 400, height: 200, fixed: 0, zeta: 0.6 },
  { flow: 0, length: 0, shape: "round", diameter: 200, width: 300, height: 200, fixed: 0, zeta: 0 },
  { flow: 0, length: 0, shape: "round", diameter: 200, width: 300, height: 200, fixed: 0, zeta: 0 },
  { flow: 0, length: 0, shape: "round", diameter: 200, width: 300, height: 200, fixed: 0, zeta: 0 }
];

function renderDuct() {
  wrapForm(`
    <div class="form-grid">
      ${field("ductFlow", "Debit air", "1800", "m3/h")}
      ${field("ductVelocity", "Vitesse cible", "5", "m/s")}
      ${field("ductHeight", "Hauteur rectangulaire", "400", "mm")}
      ${field("ductLength", "Longueur", "18", "m")}
      ${field("ductCoef", "Coefficient accessoires", "1.2")}
      ${field("ductInsulation", "Epaisseur isolant", "25", "mm")}
    </div>
    <div id="calcResults"></div>
  `);
}

function calculateDuct() {
  const flow = value("ductFlow") / 3600;
  const velocity = value("ductVelocity");
  const height = value("ductHeight") / 1000;
  const length = value("ductLength");
  const coef = value("ductCoef");
  const insulation = value("ductInsulation") / 1000;

  if (flow <= 0 || velocity <= 0 || height <= 0) {
    setResults([
      { label: "Controle", value: "Saisir un debit, une vitesse et une hauteur strictement positifs." }
    ], "Gaine aeraulique");
    return;
  }

  const area = flow / velocity;
  const diameter = Math.sqrt((4 * area) / Math.PI);
  const width = area / height;
  const circSurface = Math.PI * (diameter + 2 * insulation) * length * coef;
  const rectSurface = 2 * (height + width + 4 * insulation) * length * coef;
  setResults([
    { label: "Section utile", value: `${fmt(area, 3)} m2` },
    { label: "Diametre circulaire", value: mm(diameter * 1000) },
    { label: "Largeur rectangulaire", value: mm(width * 1000) },
    { label: "Format rectangulaire", value: `${fmt(value("ductHeight"), 0)} x ${fmt(width * 1000, 0)} mm` },
    { label: "Surface iso circulaire", value: `${fmt(circSurface, 1)} m2` },
    { label: "Surface iso rectangulaire", value: `${fmt(rectSurface, 1)} m2` }
  ], "Gaine aeraulique");
}

function renderDuctFlow() {
  const diameters = [125, 160, 200, 250, 315, 355, 400, 450, 500, 560, 630, 710];
  wrapForm(`
    <div class="form-grid">
      ${selectField("ductFlowDiameter", "Diametre gaine circulaire", diameters.map((d) => ({ value: String(d), label: `${d} mm` })))}
      ${field("ductFlowVelocity", "Vitesse d'air", "5", "m/s", "number", "step=\"0.5\" min=\"0\"")}
      ${field("ductFlowWidth", "Largeur rectangulaire optionnelle", "600", "mm")}
      ${field("ductFlowHeight", "Hauteur rectangulaire optionnelle", "300", "mm")}
    </div>
    <div id="calcResults"></div>
    <div class="lookup-table" aria-label="Table rapide des debits">
      <div class="lookup-head">Diametre</div>
      <div class="lookup-head">4 m/s</div>
      <div class="lookup-head">5 m/s</div>
      <div class="lookup-head">6 m/s</div>
      <div class="lookup-head">8 m/s</div>
      <div class="lookup-head">10 m/s</div>
      <div class="lookup-head">12 m/s</div>
      ${diameters.map((diameter) => {
        const section = Math.PI * Math.pow(diameter / 1000, 2) / 4;
        const flows = [4, 5, 6, 8, 10, 12].map((velocity) => fmt(section * velocity * 3600, 0));
        return `
          <span>${diameter} mm</span>
          ${flows.map((flow) => `<span>${flow}</span>`).join("")}
        `;
      }).join("")}
    </div>
  `, "Le tableau rapide reproduit les debits m3/h pour les diametres standards.");
}

function calculateDuctFlow() {
  const diameter = value("ductFlowDiameter");
  const velocity = value("ductFlowVelocity");
  const width = value("ductFlowWidth") / 1000;
  const height = value("ductFlowHeight") / 1000;
  const circularSection = Math.PI * Math.pow(diameter / 1000, 2) / 4;
  const circularFlow = circularSection * velocity * 3600;
  const rectangularSection = width * height;
  const rectangularFlow = rectangularSection * velocity * 3600;

  setResults([
    { label: "Section circulaire", value: `${fmt(circularSection, 5)} m2` },
    { label: "Debit circulaire", value: `${fmt(circularFlow, 0)} m3/h` },
    { label: "Debit circulaire", value: `${fmt(circularFlow / 3600 * 1000, 2)} l/s` },
    { label: "Diametre retenu", value: mm(diameter) },
    { label: "Section rectangulaire", value: `${fmt(rectangularSection, 3)} m2` },
    { label: "Debit rectangulaire", value: `${fmt(rectangularFlow, 0)} m3/h` }
  ], "Debit d'air dans gaine");
}

function renderDuctPressure() {
  wrapForm(`
    <div class="form-grid">
      ${field("pdcTemp", "Temperature air", "20", "deg C")}
      ${field("pdcHumidity", "Humidite absolue", "7", "g/kg air sec")}
      ${field("pdcPressure", "Pression atmospherique", "101.325", "kPa")}
      ${selectField("pdcMaterial", "Materiau / rugosite", ductPressureMaterials)}
    </div>
    <div class="segment-table" aria-label="Troncons perte de charge air">
      <div class="segment-head">Rep.</div>
      <div class="segment-head">Debit</div>
      <div class="segment-head">Long.</div>
      <div class="segment-head">Forme</div>
      <div class="segment-head">Diam.</div>
      <div class="segment-head">Larg.</div>
      <div class="segment-head">Haut.</div>
      <div class="segment-head">PDC fixe</div>
      <div class="segment-head">d</div>
      ${ductPressureRows.map((row, index) => `
        <strong>T${index + 1}</strong>
        <input id="pdcFlow${index}" type="number" min="0" step="10" value="${row.flow}" aria-label="Debit troncon ${index + 1}">
        <input id="pdcLength${index}" type="number" min="0" step="0.5" value="${row.length}" aria-label="Longueur troncon ${index + 1}">
        <select id="pdcShape${index}" aria-label="Forme troncon ${index + 1}">
          <option value="round" ${row.shape === "round" ? "selected" : ""}>circ.</option>
          <option value="rect" ${row.shape === "rect" ? "selected" : ""}>rect.</option>
        </select>
        <select id="pdcDiameter${index}" aria-label="Diametre troncon ${index + 1}">
          ${ductPressureDiameters.map((diameter) => `<option value="${diameter}" ${diameter === row.diameter ? "selected" : ""}>${diameter}</option>`).join("")}
        </select>
        <input id="pdcWidth${index}" type="number" min="0" step="10" value="${row.width}" aria-label="Largeur troncon ${index + 1}">
        <input id="pdcHeight${index}" type="number" min="0" step="10" value="${row.height}" aria-label="Hauteur troncon ${index + 1}">
        <input id="pdcFixed${index}" type="number" min="0" step="1" value="${row.fixed}" aria-label="PDC fixe troncon ${index + 1}">
        <input id="pdcZeta${index}" type="number" min="0" step="0.1" value="${row.zeta}" aria-label="Coefficient d troncon ${index + 1}">
      `).join("")}
    </div>
    <div id="calcResults"></div>
    <div class="segment-output" id="pdcRowsOutput"></div>
  `, "Calcul reconstruit depuis la structure du tableur PDC: j = lambda x rho x v2 / 2D, jL, pdc fixe et d x rho x v2 / 2. Diametre rectangulaire equivalent selon la formule usuelle des gaines.");
}

function calculateDuctPressure() {
  const air = moistAir(value("pdcTemp"), value("pdcHumidity"), value("pdcPressure"));
  const material = ductPressureMaterials.find((item) => item.value === selectValue("pdcMaterial")) || ductPressureMaterials[0];
  const roughnessM = material.roughness / 1000;
  const rows = [];

  ductPressureRows.forEach((_, index) => {
    const flow = value(`pdcFlow${index}`);
    const length = value(`pdcLength${index}`);
    if (flow <= 0 || length < 0) return;

    const shape = selectValue(`pdcShape${index}`);
    const diameter = value(`pdcDiameter${index}`) / 1000;
    const width = value(`pdcWidth${index}`) / 1000;
    const height = value(`pdcHeight${index}`) / 1000;
    const fixed = value(`pdcFixed${index}`);
    const zeta = value(`pdcZeta${index}`);
    const q = flow / 3600;
    const area = shape === "round" ? Math.PI * Math.pow(diameter, 2) / 4 : width * height;
    if (area <= 0) return;

    const velocity = q / area;
    const equivalentDiameter = shape === "round" ? diameter : equivalentRoundDuct(width, height);
    const reynolds = air.density * velocity * equivalentDiameter / air.viscosity;
    const lambda = frictionFactor(reynolds, roughnessM, equivalentDiameter);
    const dynamicPressure = air.density * Math.pow(velocity, 2) / 2;
    const j = lambda * dynamicPressure / equivalentDiameter;
    const linear = j * length;
    const singular = zeta * dynamicPressure;
    const total = linear + fixed + singular;

    rows.push({
      index: index + 1,
      flow,
      length,
      shape,
      velocity,
      equivalentDiameter,
      reynolds,
      lambda,
      dynamicPressure,
      j,
      linear,
      fixed,
      zeta,
      singular,
      total
    });
  });

  const totals = rows.reduce((acc, row) => {
    acc.length += row.length;
    acc.linear += row.linear;
    acc.fixed += row.fixed;
    acc.singular += row.singular;
    acc.total += row.total;
    acc.maxVelocity = Math.max(acc.maxVelocity, row.velocity);
    acc.maxJ = Math.max(acc.maxJ, row.j);
    return acc;
  }, { length: 0, linear: 0, fixed: 0, singular: 0, total: 0, maxVelocity: 0, maxJ: 0 });

  const output = document.getElementById("pdcRowsOutput");
  if (output) output.innerHTML = renderDuctPressureRows(rows);

  setResults([
    { label: "PDC totale reseau", value: `${fmt(totals.total, 1)} Pa` },
    { label: "PDC lineaire jL", value: `${fmt(totals.linear, 1)} Pa` },
    { label: "PDC ponctuelle fixe", value: `${fmt(totals.fixed, 1)} Pa` },
    { label: "PDC singuliere d rv2/2", value: `${fmt(totals.singular, 1)} Pa` },
    { label: "Longueur totale", value: `${fmt(totals.length, 1)} m` },
    { label: "Vitesse max", value: `${fmt(totals.maxVelocity, 2)} m/s` },
    { label: "j max", value: `${fmt(totals.maxJ, 3)} Pa/m` },
    { label: "Air / rugosite", value: `${fmt(air.density, 3)} kg/m3 / ${fmt(material.roughness, 3)} mm` }
  ], "Pertes de charge air");
}

function renderDuctPressureRows(rows) {
  if (!rows.length) {
    return `<div class="empty-state">Saisir au moins un troncon avec debit et longueur.</div>`;
  }

  return `
    <div class="result-table">
      <div class="result-head">Rep.</div>
      <div class="result-head">v</div>
      <div class="result-head">D eq.</div>
      <div class="result-head">Re</div>
      <div class="result-head">lambda</div>
      <div class="result-head">j</div>
      <div class="result-head">jL</div>
      <div class="result-head">dyn.</div>
      <div class="result-head">sing.</div>
      <div class="result-head">total</div>
      ${rows.map((row) => `
        <strong>T${row.index}</strong>
        <span>${fmt(row.velocity, 2)} m/s</span>
        <span>${fmt(row.equivalentDiameter * 1000, 0)} mm</span>
        <span>${fmt(row.reynolds, 0)}</span>
        <span>${fmt(row.lambda, 4)}</span>
        <span>${fmt(row.j, 3)}</span>
        <span>${fmt(row.linear, 1)}</span>
        <span>${fmt(row.dynamicPressure, 1)}</span>
        <span>${fmt(row.singular, 1)}</span>
        <strong>${fmt(row.total, 1)} Pa</strong>
      `).join("")}
    </div>
  `;
}

function moistAir(tempC, humidityGKg, pressureKPa) {
  const t = tempC + 273.15;
  const w = Math.max(humidityGKg, 0) / 1000;
  const pressure = pressureKPa * 1000;
  const specificVolume = 287.05 * t * (1 + 1.6078 * w) / pressure;
  const density = 1 / specificVolume;
  const viscosity = 1.716e-5 * Math.pow(t / 273.15, 1.5) * ((273.15 + 110.4) / (t + 110.4));
  return { density, viscosity, specificVolume };
}

function equivalentRoundDuct(widthM, heightM) {
  if (widthM <= 0 || heightM <= 0) return 0;
  return 1.3 * Math.pow(widthM * heightM, 0.625) / Math.pow(widthM + heightM, 0.25);
}

function frictionFactor(reynolds, roughnessM, diameterM) {
  if (!Number.isFinite(reynolds) || reynolds <= 0 || diameterM <= 0) return 0;
  if (reynolds < 2300) return 64 / reynolds;
  const relativeRoughness = roughnessM / diameterM;
  const term = Math.pow(relativeRoughness / 3.7, 1.11) + 6.9 / reynolds;
  return Math.pow(-1.8 * Math.log10(term), -2);
}
