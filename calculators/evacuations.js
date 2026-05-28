const sanitaryEvacFixtures = [
  { id: "wc67", label: "WC 6 ou 7,5 l - reservoir", type: "EV", du: 2, min: 73, pvc: "80", cuivre: "---", fonte: "75" },
  { id: "wc9", label: "WC 9 l - reservoir", type: "EV", du: 2.5, min: 83, pvc: "84/90", cuivre: "---", fonte: "100" },
  { id: "wcRobinet", label: "WC avec robinet de chasse", type: "EV", du: 2, min: 83, pvc: "84/90", cuivre: "---", fonte: "100" },
  { id: "evier", label: "Evier - timbre office", type: "EU", du: 0.5, min: 33, pvc: "33,6/40", cuivre: "34/36", fonte: "50" },
  { id: "laveLinge6", label: "Lave-linge jusqu'a 6 kg", type: "EU", du: 0.5, min: 33, pvc: "33,6/40", cuivre: "34/36", fonte: "50" },
  { id: "laveLinge12", label: "Lave-linge jusqu'a 12 kg", type: "EU", du: 1, min: 43, pvc: "43,6/50", cuivre: "52/54", fonte: "50" },
  { id: "laveVaisselle", label: "Lave-vaisselle domestique", type: "EU", du: 0.5, min: 33, pvc: "33,6/40", cuivre: "34/36", fonte: "50" },
  { id: "lavabo", label: "Lavabo / lave-mains", type: "EU", du: 0.3, min: 25, pvc: "25,6/32", cuivre: "26/28", fonte: "---" },
  { id: "bidet", label: "Bidet", type: "EU", du: 0.3, min: 25, pvc: "25,6/32", cuivre: "26/28", fonte: "---" },
  { id: "baignoire", label: "Baignoire", type: "EU", du: 0.5, min: 38, pvc: "43,6/50", cuivre: "40/42", fonte: "50" },
  { id: "doucheBouchon", label: "Douche a bouchon", type: "EU", du: 0.5, min: 33, pvc: "33,6/40", cuivre: "34/36", fonte: "50" },
  { id: "doucheGrille", label: "Douche a grille fixe", type: "EU", du: 0.4, min: 33, pvc: "33,6/40", cuivre: "34/36", fonte: "50" },
  { id: "urinoirSiphonique", label: "Urinoir a action siphonique", type: "EU", du: 0.5, min: 33, pvc: "33,6/40", cuivre: "34/36", fonte: "50" },
  { id: "urinoirVanne", label: "Urinoir avec vanne de rincage", type: "EU", du: 0.3, min: 25, pvc: "25,6/32", cuivre: "26/28", fonte: "---" },
  { id: "urinoirRigole", label: "Urinoir rigole par personne", type: "EU", du: 0.2, min: 25, pvc: "25,6/32", cuivre: "26/28", fonte: "---" },
  { id: "lavaboCollectif", label: "Lavabo collectif par jet", type: "EU", du: 0.05, min: 25, pvc: "25,6/32", cuivre: "26/28", fonte: "---" },
  { id: "bacLaver", label: "Bac a laver", type: "EU", du: 0.8, min: 43, pvc: "43,6/50", cuivre: "52/54", fonte: "50" },
  { id: "grilleSol50", label: "Grille de sol DN50", type: "EU", du: 0.6, min: 43, pvc: "43,6/50", cuivre: "52/54", fonte: "50" },
  { id: "grilleSol75", label: "Grille de sol DN75", type: "EU", du: 1, min: 75, pvc: "75", cuivre: "---", fonte: "75" },
  { id: "grilleSol100", label: "Grille de sol DN100", type: "EU", du: 1.3, min: 83, pvc: "84/90", cuivre: "---", fonte: "100" }
];

const sanitaryEvacUsageFactors = {
  irregular: { label: "Utilisation irreguliere - maison individuelle / bureau", k: 0.5 },
  regular: { label: "Utilisation reguliere - habitat collectif / ERP courant", k: 0.7 },
  frequent: { label: "Utilisation frequente - toilettes / douches publiques", k: 1 },
  special: { label: "Utilisation speciale - laboratoire / usage intensif", k: 1.2 }
};

const sanitaryChuteThresholds = {
  gt45: [
    { flow: 0.5, diameter: 56 }, { flow: 1.5, diameter: 68 }, { flow: 2, diameter: 73 },
    { flow: 2.7, diameter: 83 }, { flow: 4, diameter: 93 }, { flow: 5.8, diameter: 117 },
    { flow: 9.5, diameter: 150 }, { flow: 16, diameter: 191 }
  ],
  le45: [
    { flow: 0.7, diameter: 56 }, { flow: 2, diameter: 68 }, { flow: 2.6, diameter: 73 },
    { flow: 3.5, diameter: 83 }, { flow: 5.2, diameter: 93 }, { flow: 7.6, diameter: 117 },
    { flow: 12.4, diameter: 150 }, { flow: 21, diameter: 191 }
  ]
};

const sanitaryCollectorCapacity = {
  fill70: [
    { slope: 0.5, dn100: 2.9, dn125: 4.8, dn150: 9, dn200: 16.7 },
    { slope: 1, dn100: 4.2, dn125: 6.8, dn150: 12.8, dn200: 23.7 },
    { slope: 1.5, dn100: 5.1, dn125: 8.3, dn150: 15.7, dn200: 29.1 },
    { slope: 2, dn100: 5.9, dn125: 9.6, dn150: 18.2, dn200: 33.6 },
    { slope: 2.5, dn100: 6.7, dn125: 10.8, dn150: 20.3, dn200: 37.6 },
    { slope: 3, dn100: 7.3, dn125: 11.8, dn150: 22.3, dn200: 41.2 },
    { slope: 3.5, dn100: 7.9, dn125: 12.8, dn150: 24.1, dn200: 44.5 },
    { slope: 4, dn100: 8.4, dn125: 13.7, dn150: 25.8, dn200: 47.6 },
    { slope: 4.5, dn100: 8.9, dn125: 14.5, dn150: 27.3, dn200: 50.5 },
    { slope: 5, dn100: 9.4, dn125: 15.3, dn150: 28.8, dn200: 53.3 }
  ],
  fill50: [
    { slope: 1, dn100: 2.5, dn125: 4.1, dn150: 7.7, dn200: 14.2 },
    { slope: 1.5, dn100: 3.1, dn125: 5, dn150: 9.4, dn200: 17.4 },
    { slope: 2, dn100: 3.5, dn125: 5.7, dn150: 10.9, dn200: 20.1 },
    { slope: 2.5, dn100: 4, dn125: 6.4, dn150: 12.2, dn200: 22.5 },
    { slope: 3, dn100: 4.4, dn125: 7.1, dn150: 13.3, dn200: 24.7 },
    { slope: 3.5, dn100: 4.7, dn125: 7.6, dn150: 14.4, dn200: 26.6 },
    { slope: 4, dn100: 5, dn125: 8.2, dn150: 15.4, dn200: 28.5 },
    { slope: 4.5, dn100: 5.3, dn125: 8.7, dn150: 16.3, dn200: 30.2 },
    { slope: 5, dn100: 5.6, dn125: 9.1, dn150: 17.2, dn200: 31.9 }
  ]
};

const roofDrainEpTable = [
  { cylNormal: 50, cylMajor: 33, tronNormal: 71, tronMajor: 47, diameter: 8 },
  { cylNormal: 64, cylMajor: 43, tronNormal: 91, tronMajor: 61, diameter: 9 },
  { cylNormal: 79, cylMajor: 53, tronNormal: 113, tronMajor: 75, diameter: 10 },
  { cylNormal: 95, cylMajor: 63, tronNormal: 136, tronMajor: 91, diameter: 11 },
  { cylNormal: 113, cylMajor: 75, tronNormal: 161, tronMajor: 107, diameter: 12 },
  { cylNormal: 133, cylMajor: 88, tronNormal: 190, tronMajor: 127, diameter: 13 },
  { cylNormal: 154, cylMajor: 103, tronNormal: 220, tronMajor: 147, diameter: 14 },
  { cylNormal: 177, cylMajor: 118, tronNormal: 253, tronMajor: 168, diameter: 15 },
  { cylNormal: 201, cylMajor: 134, tronNormal: 287, tronMajor: 191, diameter: 16 },
  { cylNormal: 227, cylMajor: 151, tronNormal: 324, tronMajor: 216, diameter: 17 },
  { cylNormal: 254, cylMajor: 169, tronNormal: 363, tronMajor: 242, diameter: 18 },
  { cylNormal: 284, cylMajor: 189, tronNormal: 406, tronMajor: 270, diameter: 19 },
  { cylNormal: 314, cylMajor: 209, tronNormal: 449, tronMajor: 300, diameter: 20 },
  { cylNormal: 346, cylMajor: 230, tronNormal: 494, tronMajor: 329, diameter: 21 },
  { cylNormal: 380, cylMajor: 253, tronNormal: 543, tronMajor: 362, diameter: 22 },
  { cylNormal: 415, cylMajor: 277, tronNormal: 593, tronMajor: 394, diameter: 23 },
  { cylNormal: 452, cylMajor: 302, tronNormal: 646, tronMajor: 430, diameter: 24 },
  { cylNormal: 490, cylMajor: 327, tronNormal: 700, tronMajor: 466, diameter: 25 },
  { cylNormal: 530, cylMajor: 400, tronNormal: Infinity, tronMajor: 570, diameter: 26 },
  { cylNormal: 570, cylMajor: 472, tronNormal: Infinity, tronMajor: 680, diameter: 27 },
  { cylNormal: 615, cylMajor: 550, tronNormal: Infinity, tronMajor: Infinity, diameter: 27 },
  { cylNormal: 660, cylMajor: 625, tronNormal: Infinity, tronMajor: Infinity, diameter: 29 },
  { cylNormal: 700, cylMajor: 700, tronNormal: Infinity, tronMajor: Infinity, diameter: 30 }
];

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
