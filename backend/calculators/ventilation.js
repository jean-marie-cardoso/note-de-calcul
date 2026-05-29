const { document, fmt, mm, m3h, lps, value, selectValue, setResults } = require("./runtime");
const { smokeZones } = require('../data/ventilation');

function renderSmoke() {
  wrapForm(`
    <div class="form-grid">
      ${field("smokeSurfaceMain", "Surface principale", "100", "m2")}
      ${field("smokeMinFlow", "Debit minimal", "1.5", "m3/s")}
      ${field("smokeRatio", "Ratio extraction", "1", "m3/s / 100 m2")}
      ${field("smokeCompensation", "Compensation", "0.6", "x extraction")}
      ${field("smokeAreaPerOutlet", "Surface par bouche", "320", "m2/bouche")}
      ${field("smokeExtractVelocity", "Vitesse extraction", "8", "m/s")}
      ${field("smokeCompVelocity", "Vitesse compensation", "5", "m/s")}
      ${field("smokeReserve", "Marge ventilateur", "10", "%")}
      ${selectField("smokeZoneMode", "Mode de calcul", [
        { value: "simple", label: "Une seule zone" },
        { value: "multi", label: "Detail par zones" }
      ])}
    </div>
    <details class="module-help" id="smokeZoneDetails">
      <summary>Zones detaillees optionnelles</summary>
      <div class="module-help-content">
        <p>Utilise cette partie uniquement si le local est decoupe en plusieurs zones de desenfumage. Sinon, laisse le mode une seule zone.</p>
        <div class="form-grid">
          ${smokeZones.map((zone, index) => `
            <div class="form-field">
              <label for="smokeRepere${index}">Zone ${index + 1} - repere</label>
              <input id="smokeRepere${index}" type="text" value="${zone.repere}" aria-label="Repere zone ${index + 1}">
            </div>
            <div class="form-field">
              <label for="smokeSurface${index}">Zone ${index + 1} - surface (m2)</label>
              <input id="smokeSurface${index}" type="number" min="0" step="0.01" value="${zone.surface}" aria-label="Surface zone ${index + 1}">
            </div>
            <div class="form-field">
              <label for="smokeOutlets${index}">Zone ${index + 1} - bouches</label>
              <input id="smokeOutlets${index}" type="number" min="0" step="1" value="0" aria-label="Nombre de bouches zone ${index + 1}">
            </div>
            <div class="form-field">
              <label for="smokeEnabled${index}">Zone ${index + 1} - active</label>
              <select id="smokeEnabled${index}" aria-label="Activation zone ${index + 1}">
                <option value="yes" ${zone.enabled ? "selected" : ""}>oui</option>
                <option value="no" ${zone.enabled ? "" : "selected"}>non</option>
              </select>
            </div>
          `).join("")}
        </div>
      </div>
    </details>
    <details class="module-help">
      <summary>Logique de calcul</summary>
      <div class="module-help-content">
        <p>Extraction = ratio x surface, avec un debit minimal applique par zone.</p>
        <p>Compensation = coefficient x extraction. Le nombre de bouches est propose automatiquement selon la surface par bouche, sauf saisie manuelle.</p>
        <p>Les sections indicatives sont calculees avec les vitesses d'extraction et de compensation saisies. Module de predimensionnement a faire valider par le bureau de controle / SSI.</p>
      </div>
    </details>
    <div id="calcResults"></div>
    <div class="segment-output" id="smokeRowsOutput"></div>
  `, "Predimensionnement simplifie du desenfumage : extraction, compensation, nombre de bouches, debit unitaire et section indicative.");
}

function calculateSmoke() {
  const minFlowM3s = value("smokeMinFlow");
  const ratioM3sPer100 = value("smokeRatio");
  const compensationCoef = value("smokeCompensation");
  const areaPerOutlet = value("smokeAreaPerOutlet");
  const extractVelocity = value("smokeExtractVelocity");
  const compVelocity = value("smokeCompVelocity");
  const reserve = value("smokeReserve") / 100;
  const mode = selectValue("smokeZoneMode") || "simple";
  const rows = [];

  if (mode === "simple") {
    rows.push(buildSmokeRow("Zone unique", value("smokeSurfaceMain"), 0, minFlowM3s, ratioM3sPer100, compensationCoef, areaPerOutlet, extractVelocity, compVelocity, reserve));
  } else {
    smokeZones.forEach((_, index) => {
      if (selectValue(`smokeEnabled${index}`) !== "yes") return;
      const repere = document.getElementById(`smokeRepere${index}`)?.value.trim() || `Zone ${index + 1}`;
      const surface = value(`smokeSurface${index}`);
      const forcedOutlets = value(`smokeOutlets${index}`);
      if (surface <= 0) return;
      rows.push(buildSmokeRow(repere, surface, forcedOutlets, minFlowM3s, ratioM3sPer100, compensationCoef, areaPerOutlet, extractVelocity, compVelocity, reserve));
    });
  }

  const totals = rows.reduce((acc, row) => {
    acc.surface += row.surface;
    acc.outlets += row.outlets;
    acc.extractionM3s += row.extractionM3s;
    acc.extractionM3h += row.extractionM3h;
    acc.extractionWithReserve += row.extractionWithReserve;
    acc.compensationM3s += row.compensationM3s;
    acc.compensationM3h += row.compensationM3h;
    acc.extractSection += row.extractSection;
    acc.compSection += row.compSection;
    return acc;
  }, { surface: 0, outlets: 0, extractionM3s: 0, extractionM3h: 0, extractionWithReserve: 0, compensationM3s: 0, compensationM3h: 0, extractSection: 0, compSection: 0 });

  const output = document.getElementById("smokeRowsOutput");
  if (output) output.innerHTML = renderSmokeRows(rows);

  setResults([
    { label: "Mode", value: mode === "simple" ? "Une seule zone" : "Detail par zones" },
    { label: "Surface totale", value: `${fmt(totals.surface, 2)} m2` },
    { label: "Nombre de bouches", value: fmt(totals.outlets, 0) },
    { label: "Extraction calculee", value: `${fmt(totals.extractionM3h, 0)} m3/h / ${fmt(totals.extractionM3s, 2)} m3/s` },
    { label: "Extraction avec marge", value: `${fmt(totals.extractionWithReserve, 0)} m3/h` },
    { label: "Compensation", value: `${fmt(totals.compensationM3h, 0)} m3/h / ${fmt(totals.compensationM3s, 2)} m3/s` },
    { label: "Section extraction indicative", value: `${fmt(totals.extractSection, 2)} m2` },
    { label: "Section compensation indicative", value: `${fmt(totals.compSection, 2)} m2` },
    { label: "Regle appliquee", value: `${fmt(ratioM3sPer100, 2)} m3/s / 100 m2, mini ${fmt(minFlowM3s, 2)} m3/s` }
  ], "Desenfumage");
}

function buildSmokeRow(repere, surface, forcedOutlets, minFlowM3s, ratioM3sPer100, compensationCoef, areaPerOutlet, extractVelocity, compVelocity, reserve) {
  const extractionM3s = Math.max(minFlowM3s, ratioM3sPer100 * surface / 100);
  const extractionM3h = extractionM3s * 3600;
  const extractionWithReserve = extractionM3h * (1 + reserve);
  const compensationM3s = extractionM3s * compensationCoef;
  const compensationM3h = compensationM3s * 3600;
  const outlets = forcedOutlets > 0 ? forcedOutlets : Math.max(1, Math.ceil(surface / Math.max(areaPerOutlet, 1)));
  const flowPerOutletM3h = outlets > 0 ? extractionM3h / outlets : 0;
  const extractSection = extractVelocity > 0 ? extractionM3s / extractVelocity : 0;
  const compSection = compVelocity > 0 ? compensationM3s / compVelocity : 0;

  return {
    repere,
    surface,
    outlets,
    extractionM3s,
    extractionM3h,
    extractionWithReserve,
    compensationM3s,
    compensationM3h,
    flowPerOutletM3h,
    extractSection,
    compSection
  };
}

function renderSmokeRows(rows) {
  if (!rows.length) {
    return `<div class="empty-state">Aucune zone active avec une surface superieure a 0.</div>`;
  }

  return `
    <div class="result-grid">
      ${rows.map((row) => `
        <div class="result-item">
          <span>${row.repere}</span>
          <strong>${fmt(row.extractionM3h, 0)} m3/h</strong>
          <small>${fmt(row.surface, 2)} m2 - ${fmt(row.outlets, 0)} bouche(s) - ${fmt(row.flowPerOutletM3h, 0)} m3/h/bouche</small>
          <small>Compensation ${fmt(row.compensationM3h, 0)} m3/h - sections ${fmt(row.extractSection, 2)} / ${fmt(row.compSection, 2)} m2</small>
        </div>
      `).join("")}
    </div>
  `;
}


module.exports = {
  calculateSmoke
};
