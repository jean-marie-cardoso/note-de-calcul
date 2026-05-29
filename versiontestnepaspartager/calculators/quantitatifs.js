function renderInsulation() {
  wrapForm(`
    <div class="form-grid">
      ${field("insDext", "Diametre exterieur tube", "60.3", "mm")}
      ${field("insThickness", "Epaisseur isolant", "30", "mm")}
      ${field("insLength", "Longueur", "120", "m")}
      ${field("insCoef", "Coefficient accessoires", "1.15")}
    </div>
    <div id="calcResults"></div>
  `);
}

function calculateInsulation() {
  const d = (value("insDext") + 2 * value("insThickness")) / 1000;
  const areaPerM = Math.PI * d;
  const total = areaPerM * value("insLength") * value("insCoef");
  setResults([
    { label: "Diametre exterieur isole", value: mm(d * 1000) },
    { label: "Surface par ml", value: `${fmt(areaPerM, 3)} m2/ml` },
    { label: "Longueur corrigee", value: `${fmt(value("insLength") * value("insCoef"), 1)} m` },
    { label: "Surface totale", value: `${fmt(total, 1)} m2` }
  ], "Surface de calorifuge");
}

function renderDuctWeight() {
  const defaultRows = [
    { type: "rect", width: 700, height: 400, length: 20 },
    { type: "rect", width: 400, height: 400, length: 17 },
    { type: "rect", width: 300, height: 400, length: 15 },
    { type: "rect", width: 200, height: 300, length: 10 },
    { type: "rect", width: 0, height: 0, length: 0 },
    { type: "circ", width: 250, height: 0, length: 0 }
  ];

  wrapForm(`
    <div class="form-grid">
      ${field("ductWeightKgM2", "Poids de gaine", "12", "kg/m2")}
      ${field("ductWeightCalo", "Epaisseur calorifuge", "30", "mm")}
      ${field("ductWeightFlocking", "Epaisseur flocage", "50", "mm")}
      ${field("ductWeightMargin", "Majoration", "0", "%")}
    </div>

    <div class="duct-weight-table" aria-label="Métré des gaines" style="display:grid;grid-template-columns:80px 120px minmax(120px,1fr) minmax(120px,1fr) minmax(120px,1fr);gap:8px;align-items:end;overflow-x:auto;">
      <div class="segment-head">Rep.</div>
      <div class="segment-head">Type</div>
      <div class="segment-head">Largeur / Ø</div>
      <div class="segment-head">Hauteur</div>
      <div class="segment-head">Longueur</div>
      ${defaultRows.map((row, index) => `
        <strong>G${index + 1}</strong>
        <select id="ductWeightType${index}" aria-label="Type gaine ${index + 1}" style="width:100%;min-width:0;box-sizing:border-box;">
          <option value="rect" ${row.type === "rect" ? "selected" : ""}>rect.</option>
          <option value="circ" ${row.type === "circ" ? "selected" : ""}>circ.</option>
        </select>
        <input id="ductWeightWidth${index}" type="number" min="0" step="10" value="${row.width}" aria-label="Largeur ou diamètre gaine ${index + 1}" style="width:100%;min-width:0;box-sizing:border-box;">
        <input id="ductWeightHeight${index}" type="number" min="0" step="10" value="${row.height}" aria-label="Hauteur gaine ${index + 1}" style="width:100%;min-width:0;box-sizing:border-box;">
        <input id="ductWeightLength${index}" type="number" min="0" step="0.1" value="${row.length}" aria-label="Longueur gaine ${index + 1}" style="width:100%;min-width:0;box-sizing:border-box;">
      `).join("")}
    </div>

    <div id="calcResults"></div>
    <div class="segment-output" id="ductWeightRowsOutput"></div>
  `, "Les surfaces reprennent les formules du classeur: rectangulaire = L x 2 x (largeur + hauteur + 4 x épaisseur) / 1000 ; circulaire = L x π x (diamètre + 2 x épaisseur) / 1000.");
}

function calculateDuctWeight() {
  const kgM2 = value("ductWeightKgM2");
  const caloThickness = value("ductWeightCalo");
  const flockingThickness = value("ductWeightFlocking");
  const margin = value("ductWeightMargin") / 100;
  const rows = [];

  for (let index = 0; index < 6; index += 1) {
    const type = selectValue(`ductWeightType${index}`) || "rect";
    const width = value(`ductWeightWidth${index}`);
    const height = value(`ductWeightHeight${index}`);
    const length = value(`ductWeightLength${index}`);
    if (width <= 0 || length <= 0) continue;

    let bareSurface = 0;
    let caloSurface = 0;
    let flockingSurface = 0;
    let label = "";

    if (type === "rect") {
      if (height <= 0) continue;
      bareSurface = length * 2 * ((width + height) / 1000);
      caloSurface = length * 2 * ((width + height + 4 * caloThickness) / 1000);
      flockingSurface = length * 2 * ((width + height + 4 * flockingThickness) / 1000);
      label = `${fmt(width, 0)} x ${fmt(height, 0)} mm`;
    } else {
      bareSurface = length * Math.PI * (width / 1000);
      caloSurface = length * Math.PI * ((width + 2 * caloThickness) / 1000);
      flockingSurface = length * Math.PI * ((width + 2 * flockingThickness) / 1000);
      label = `Ø ${fmt(width, 0)} mm`;
    }

    const weight = caloSurface * kgM2;
    rows.push({
      index: index + 1,
      type,
      label,
      length,
      bareSurface,
      caloSurface,
      flockingSurface,
      weight
    });
  }

  const totals = rows.reduce((acc, row) => {
    acc.length += row.length;
    acc.bareSurface += row.bareSurface;
    acc.caloSurface += row.caloSurface;
    acc.flockingSurface += row.flockingSurface;
    acc.weight += row.weight;
    return acc;
  }, { length: 0, bareSurface: 0, caloSurface: 0, flockingSurface: 0, weight: 0 });

  const output = document.getElementById("ductWeightRowsOutput");
  if (output) output.innerHTML = renderDuctWeightRows(rows);

  setResults([
    { label: "Longueur totale", value: `${fmt(totals.length, 1)} m` },
    { label: "Surface gaine nue", value: `${fmt(totals.bareSurface, 2)} m2` },
    { label: "Surface calorifuge", value: `${fmt(totals.caloSurface, 2)} m2` },
    { label: "Surface flocage", value: `${fmt(totals.flockingSurface, 2)} m2` },
    { label: "Poids brut gaine", value: `${fmt(totals.weight, 1)} kg` },
    { label: "Poids avec majoration", value: `${fmt(totals.weight * (1 + margin), 1)} kg` },
    { label: "Flocage avec majoration", value: `${fmt(totals.flockingSurface * (1 + margin), 2)} m2` }
  ], "Poids de gaine et metré");

  if (output) output.innerHTML = renderDuctWeightRows(rows);
}

function renderDuctWeightRows(rows) {
  if (!rows.length) {
    return `<div class="empty-state">Saisir au moins une gaine avec dimensions et longueur.</div>`;
  }

  return `
    <div class="duct-weight-result-table" style="display:grid;grid-template-columns:70px 90px minmax(130px,1.2fr) 90px repeat(4,minmax(100px,1fr));gap:8px;align-items:start;overflow-x:auto;">
      <div class="result-head">Rep.</div>
      <div class="result-head">Type</div>
      <div class="result-head">Dimensions</div>
      <div class="result-head">Long.</div>
      <div class="result-head">Surf. nue</div>
      <div class="result-head">Surf. calo.</div>
      <div class="result-head">Surf. floc.</div>
      <div class="result-head">Poids</div>
      ${rows.map((row) => `
        <strong>G${row.index}</strong>
        <span>${row.type === "rect" ? "Rect." : "Circ."}</span>
        <span>${row.label}</span>
        <span>${fmt(row.length, 1)} m</span>
        <span>${fmt(row.bareSurface, 2)} m2</span>
        <span>${fmt(row.caloSurface, 2)} m2</span>
        <span>${fmt(row.flockingSurface, 2)} m2</span>
        <strong>${fmt(row.weight, 1)} kg</strong>
      `).join("")}
    </div>
  `;
}
