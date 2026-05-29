const { document, fmt, mm, m3h, lps, value, selectValue, setResults } = require("./runtime");
const { sanitaryEvacFixtures, sanitaryEvacUsageFactors, sanitaryChuteThresholds, sanitaryCollectorCapacity, roofDrainEpTable } = require('../data/evacuations');





function renderSanitaryEvac() {
  const fixtureRows = sanitaryEvacFixtures.map((item) => `
    <div class="apparatus-row">
      <strong>${item.label}</strong>
      <span>${item.type} · DU ${fmt(item.du, 2)} l/s · mini ${item.min || "-"} mm</span>
      <input id="se-${item.id}" type="number" min="0" step="1" value="0">
    </div>
  `).join("");

  wrapForm(`
    <div class="form-grid">
      ${selectField("seMode", "Type de calcul", [
        { value: "euEv", label: "EU / EV - appareils sanitaires" },
        { value: "ep", label: "EP - descente eaux pluviales" }
      ])}
      ${selectField("seUsage", "Coefficient K", Object.entries(sanitaryEvacUsageFactors).map(([value, item]) => ({ value, label: `${item.k} - ${item.label}` })))}
      ${selectField("seBranchType", "Type de chute / branchement", [
        { value: "gt45", label: "Branchement > 45°" },
        { value: "le45", label: "Branchement ≤ 45°" }
      ])}
      ${selectField("seFill", "Taux de remplissage collecteur", [
        { value: "fill70", label: "7/10e" },
        { value: "fill50", label: "5/10e" }
      ])}
      ${field("seSlope", "Pente collecteur", "2", "%", "number", "min=\"0.5\" step=\"0.5\"")}
      ${field("seSpecificFlow", "Debit specifique ajoute", "0", "l/s", "number", "min=\"0\" step=\"0.1\"")}
    </div>

    <div class="apparatus-grid" id="seFixtureGrid">
      ${fixtureRows}
    </div>

    <div class="form-grid" id="seEpGrid">
      ${field("seEpSurface", "Surface collectee", "100", "m2", "number", "min=\"0\" step=\"1\"")}
      ${selectField("seEpShape", "Type EEP", [
        { value: "cyl", label: "EEP cylindrique" },
        { value: "tron", label: "EEP tronconique" }
      ])}
      ${selectField("seEpMajor", "Surface", [
        { value: "normal", label: "Surface normale" },
        { value: "major", label: "Surface minoree / diametre majore" }
      ])}
    </div>

    <div id="calcResults"></div>
  `, "Predimensionnement issu de DTU 60.11. A verifier avec le DTU source avant usage contractuel.");
}

function calculateSanitaryEvac() {
  const mode = selectValue("seMode");
  const fixtureGrid = document.getElementById("seFixtureGrid");
  const epGrid = document.getElementById("seEpGrid");
  if (fixtureGrid) fixtureGrid.style.display = mode === "ep" ? "none" : "grid";
  if (epGrid) epGrid.style.display = mode === "ep" ? "grid" : "none";

  if (mode === "ep") {
    calculateSanitaryEp();
    return;
  }

  const usage = sanitaryEvacUsageFactors[selectValue("seUsage")] || sanitaryEvacUsageFactors.regular;
  const branchType = selectValue("seBranchType") || "gt45";
  const fill = selectValue("seFill") || "fill70";
  const slope = value("seSlope");
  const specificFlow = Math.max(value("seSpecificFlow"), 0);

  const totals = sanitaryEvacFixtures.reduce((acc, item) => {
    const qty = Number(document.getElementById(`se-${item.id}`)?.value || 0);
    if (!Number.isFinite(qty) || qty <= 0) return acc;
    const du = qty * item.du;
    acc.count += qty;
    acc.totalDu += du;
    acc.maxMini = Math.max(acc.maxMini, Number(item.min) || 0);
    if (item.type === "EV") {
      acc.evCount += qty;
      acc.evDu += du;
    } else {
      acc.euCount += qty;
      acc.euDu += du;
    }
    return acc;
  }, { count: 0, totalDu: 0, euCount: 0, euDu: 0, evCount: 0, evDu: 0, maxMini: 0 });

  const probableEu = usage.k * Math.sqrt(totals.euDu);
  const probableEv = usage.k * Math.sqrt(totals.evDu);
  const probableTotal = usage.k * Math.sqrt(totals.totalDu) + specificFlow;
  const chuteEu = chooseSanitaryChute(probableEu, branchType);
  const chuteEv = chooseSanitaryChute(probableEv, branchType);
  const chuteTotal = chooseSanitaryChute(probableTotal, branchType);
  const collector = chooseSanitaryCollector(probableTotal, slope, fill);

  setResults([
    { label: "Nombre appareils", value: fmt(totals.count, 0) },
    { label: "DU total", value: lps(totals.totalDu) },
    { label: "Coefficient K", value: fmt(usage.k, 2) },
    { label: "Debit probable EU", value: lps(probableEu) },
    { label: "Debit probable EV", value: lps(probableEv) },
    { label: "Debit probable total", value: lps(probableTotal) },
    { label: "Chute EU conseillee", value: chuteEu ? `Ø ${chuteEu} mm` : "-" },
    { label: "Chute EV conseillee", value: chuteEv ? `Ø ${chuteEv} mm` : "-" },
    { label: "Chute totale conseillee", value: chuteTotal ? `Ø ${chuteTotal} mm` : "hors table" },
    { label: "Diametre mini appareils", value: totals.maxMini ? mm(totals.maxMini) : "-" },
    { label: "Collecteur", value: collector ? `${collector.dn} à ${fmt(collector.slope, 1)} %` : "hors table" },
    { label: "Capacite collecteur", value: collector ? lps(collector.capacity) : "-" }
  ], "Evacuations EU/EV");
}

function chooseSanitaryChute(flow, branchType) {
  if (!Number.isFinite(flow) || flow <= 0) return 0;
  const table = sanitaryChuteThresholds[branchType] || sanitaryChuteThresholds.gt45;
  const found = table.find((row) => flow <= row.flow);
  return found ? found.diameter : table.at(-1).diameter;
}

function chooseSanitaryCollector(flow, slope, fill) {
  if (!Number.isFinite(flow) || flow <= 0) return null;
  const table = sanitaryCollectorCapacity[fill] || sanitaryCollectorCapacity.fill70;
  const closest = table.reduce((best, row) => Math.abs(row.slope - slope) < Math.abs(best.slope - slope) ? row : best, table[0]);
  const dns = [
    { dn: "DN100", capacity: closest.dn100 },
    { dn: "DN125", capacity: closest.dn125 },
    { dn: "DN150", capacity: closest.dn150 },
    { dn: "DN200", capacity: closest.dn200 }
  ];
  const selected = dns.find((item) => flow <= item.capacity) || dns.at(-1);
  return { ...selected, slope: closest.slope };
}

function calculateSanitaryEp() {
  const surface = Math.max(value("seEpSurface"), 0);
  const shape = selectValue("seEpShape") || "cyl";
  const major = selectValue("seEpMajor") || "normal";
  const key = `${shape}${major === "major" ? "Major" : "Normal"}`;
  const row = roofDrainEpTable.find((item) => surface <= item[key]) || roofDrainEpTable.at(-1);
  const capacity = row ? row[key] : 0;
  setResults([
    { label: "Surface collectee", value: `${fmt(surface, 0)} m2` },
    { label: "Type EEP", value: shape === "cyl" ? "Cylindrique" : "Tronconique" },
    { label: "Mode", value: major === "major" ? "Diametre majore" : "Diametre normal" },
    { label: "Diametre DEP conseille", value: row ? `Ø ${row.diameter} cm` : "hors table" },
    { label: "Capacite table", value: Number.isFinite(capacity) ? `${fmt(capacity, 0)} m2` : "hors table" },
    { label: "Controle", value: row && Number.isFinite(capacity) && surface <= capacity ? "OK" : "A verifier hors table" }
  ], "Evacuation EP");
}


module.exports = {
  calculateSanitaryEvac
};
