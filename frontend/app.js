let uiData = {};
let categories = [];
let modules = [];
let ductPressureDiameters = [];
let ductPressureMaterials = [];
let ductPressureRows = [];
let combustionFuels = {};
let conversionGroups = {};
let conversionReferences = [];
let sanitaryEvacFixtures = [];
let sanitaryEvacUsageFactors = {};
let compressedAirPipes = [];
let pipeTables = {};
let efEcApparelsData = { apparels: [], wc_flush: { name: "WC avec robinet de chasse", index: 0 } };
let efEcDefaultQuantities = {};
let thermalSolarGains = {};
let thermalSolarTreatments = {};
let smokeZones = [];

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


function renderDuctFlow() {
  const diameters = uiData.aeraulique?.ductFlowDiameters || [];
  const lookupRows = uiData.aeraulique?.ductFlowLookupRows || [];
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
      ${lookupRows.map((row) => `
        <span>${row.diameter} mm</span>
        ${row.flows.map((flow) => `<span>${fmt(flow, 0)}</span>`).join("")}
      `).join("")}
    </div>
  `, "Le tableau rapide reproduit les debits m3/h pour les diametres standards.");
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






function renderLibrary() {
  const byCategory = categories
    .filter((category) => category.id !== "overview")
    .map((category) => {
      const count = modules.filter((module) => module.category === category.id).length;
      return { category, count };
    });
  wrapForm(`
    <div class="result-grid">
      ${byCategory.map(({ category, count }) => `
        <div class="result-item">
          <span>${category.label}</span>
          <strong>${count} modules</strong>
        </div>
      `).join("")}
    </div>
    <div id="calcResults"></div>
  `, "Le catalogue complet pourra etre genere automatiquement depuis les 161 classeurs quand la structure produit sera stabilisee.");
}



function renderCombustionPciPcs() {
  wrapForm(`
    <div class="form-grid">
      ${selectField("fuelType", "Combustible", [
        { value: "fioul", label: "Fioul domestique" },
        { value: "gaz", label: "Gaz naturel" },
        { value: "propane", label: "Propane" },
        { value: "butane", label: "Butane" }
      ])}
      ${field("fuelQuantity", "Quantite combustible", "3000", "", "number", "step=\"any\" min=\"0\"")}
      ${field("fuelEnergyPci", "Energie PCI a convertir", "30240", "kWh PCI", "number", "step=\"any\" min=\"0\"")}
      ${field("fuelPci", "PCI unitaire", "10.08", "kWh/unite", "number", "step=\"any\" min=\"0\"")}
      ${field("fuelPcs", "PCS unitaire", "10.6848", "kWh/unite", "number", "step=\"any\" min=\"0\"")}
      ${field("fuelEfficiency", "Rendement utile", "100", "%", "number", "step=\"any\" min=\"0\" max=\"100\"")}
    </div>

    <details class="module-help" open>
      <summary>Lecture rapide</summary>
      <div class="module-help-content">
        <p>Le calcul reprend la logique du tableau combustion : quantite combustible x PCI/PCS = energie, puis conversion inverse depuis une energie PCI.</p>
        <p>Les valeurs fioul, gaz, propane et butane sont calees sur le tableau fourni.</p>
      </div>
    </details>

    <div id="calcResults"></div>
  `, "Conversion combustible vers energie et energie PCI vers quantite combustible.");

  updateCombustionDefaults(true);
}

function updateCombustionDefaults(forceQuantity = false) {
  const fuelKey = selectValue("fuelType") || "fioul";
  const fuel = combustionFuels[fuelKey] || combustionFuels.fioul;
  const quantityInput = document.getElementById("fuelQuantity");
  const energyInput = document.getElementById("fuelEnergyPci");
  const pciInput = document.getElementById("fuelPci");
  const pcsInput = document.getElementById("fuelPcs");

  if (quantityInput && (forceQuantity || quantityInput.dataset.fuel !== fuelKey)) {
    quantityInput.value = fuel.defaultQuantity;
    quantityInput.dataset.fuel = fuelKey;
  }

  if (energyInput && (forceQuantity || energyInput.dataset.fuel !== fuelKey)) {
    energyInput.value = fuel.defaultEnergyPci;
    energyInput.dataset.fuel = fuelKey;
  }

  if (pciInput && pciInput.dataset.fuel !== fuelKey) {
    pciInput.value = fuel.pci;
    pciInput.dataset.fuel = fuelKey;
  }

  if (pcsInput && pcsInput.dataset.fuel !== fuelKey) {
    pcsInput.value = fuel.pcs;
    pcsInput.dataset.fuel = fuelKey;
  }
}








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







function renderDdv() {
  wrapForm(`
    <div class="form-grid">
      ${selectField("ddvMode", "Grandeur a calculer", [
        { value: "diameter", label: "Diametre depuis debit + vitesse" },
        { value: "flow", label: "Debit depuis diametre + vitesse" },
        { value: "velocity", label: "Vitesse depuis debit + diametre" }
      ])}
      ${selectField("ddvUnit", "Unite debit", [
        { value: "m3h", label: "m3/h" },
        { value: "ls", label: "l/s" },
        { value: "lh", label: "l/h" }
      ])}
      ${selectField("ddvMaterial", "Matiere du tube", [
        { value: "cuivre", label: "Cuivre" },
        { value: "per", label: "PER" },
        { value: "acier", label: "Acier" }
      ])}
      <div id="ddvPipeGroup">
        ${selectField("ddvPipe", "Diametre norme", pipeTables.cuivre.map((pipe, index) => ({
          value: String(index),
          label: `${pipe.ref} - int. ${fmt(pipe.d, 1)} mm`
        })))}
      </div>
      <div id="ddvFlowGroup">
        ${field("ddvFlow", "Debit", "2.4")}
      </div>
      <div id="ddvVelocityGroup">
        ${field("ddvVelocity", "Vitesse", "1.2", "m/s")}
      </div>
      <div id="ddvDiameterGroup">
        ${field("ddvDiameter", "Diametre interieur manuel", "26", "mm")}
      </div>
    </div>
    <div class="calc-note" id="ddvModeNote"></div>
    <div id="calcResults"></div>
  `);
  updateDdvPipeOptions();
  updateDdvVisibility();
}

function updateDdvVisibility() {
  const mode = selectValue("ddvMode") || "diameter";
  const pipeGroup = document.getElementById("ddvPipeGroup");
  const flowGroup = document.getElementById("ddvFlowGroup");
  const velocityGroup = document.getElementById("ddvVelocityGroup");
  const diameterGroup = document.getElementById("ddvDiameterGroup");
  const note = document.getElementById("ddvModeNote");

  const showPipe = mode === "flow" || mode === "velocity";
  const showFlow = mode === "diameter" || mode === "velocity";
  const showVelocity = mode === "diameter" || mode === "flow";
  const showManualDiameter = false;

  if (pipeGroup) pipeGroup.hidden = !showPipe;
  if (flowGroup) flowGroup.hidden = !showFlow;
  if (velocityGroup) velocityGroup.hidden = !showVelocity;
  if (diameterGroup) diameterGroup.hidden = !showManualDiameter;

  if (note) {
    note.textContent = {
      diameter: "Saisis le debit, la vitesse cible et la matiere: le module calcule le diametre theorique et propose une reference normalisee.",
      flow: "Saisis le diametre norme, la vitesse et la matiere: le module calcule le debit correspondant.",
      velocity: "Saisis le debit, le diametre norme et la matiere: le module calcule la vitesse reelle dans le tube."
    }[mode] || "Predimensionnement: resultats a valider avant usage contractuel.";
  }
}

function updateDdvPipeOptions() {
  const material = selectValue("ddvMaterial") || "cuivre";
  const pipeSelect = document.getElementById("ddvPipe");
  if (!pipeSelect || !pipeTables[material]) return;

  const current = pipeSelect.value;
  pipeSelect.innerHTML = pipeTables[material]
    .map((pipe, index) => `<option value="${index}">${pipe.ref} - int. ${fmt(pipe.d, 1)} mm</option>`)
    .join("");

  if (pipeTables[material][Number(current)]) {
    pipeSelect.value = current;
  } else {
    pipeSelect.value = "0";
  }

  const selected = getDdvSelectedPipe();
  const manual = document.getElementById("ddvDiameter");
  if (manual && selected) {
    manual.value = selected.d;
  }
}

function getDdvSelectedPipe() {
  const material = selectValue("ddvMaterial") || "cuivre";
  const index = Number(selectValue("ddvPipe") || 0);
  return pipeTables[material][index] || pipeTables[material][0];
}




function renderHydraulic() {
  wrapForm(`
    <div class="form-grid">
      ${field("hydPower", "Puissance", "45", "kW")}
      ${field("hydDelta", "Delta T", "15", "K")}
      ${field("hydVelocity", "Vitesse cible", "0.8", "m/s")}
      ${selectField("hydMaterial", "Tube", [
        { value: "acier", label: "Acier" },
        { value: "cuivre", label: "Cuivre" },
        { value: "per", label: "PER" }
      ])}
    </div>
    <div id="calcResults"></div>
  `);
}



function renderPump() {
  wrapForm(`
    <div class="form-grid">
      ${field("pumpName", "Designation du circulateur", "Circulateur test", "", "text")}
      ${field("pumpQ1", "Point 1 - debit", "5", "m3/h")}
      ${field("pumpP1", "Point 1 - DP", "90", "kPa")}
      ${field("pumpQ2", "Point 2 - debit", "15", "m3/h")}
      ${field("pumpP2", "Point 2 - DP", "60", "kPa")}
      ${field("pumpQ3", "Point 3 - debit", "25", "m3/h")}
      ${field("pumpP3", "Point 3 - DP", "10", "kPa")}
      ${field("pumpKv", "Coefficient de debit du reseau Kv", "6", "", "number", "min=\"0.01\" step=\"0.1\"")}
    </div>
    <details class="module-help">
      <summary>Comment utiliser ce module ?</summary>
      <div class="module-help-content">
        <p><strong>Points 1, 2 et 3 :</strong> relever trois points sur la courbe constructeur du circulateur. Pour chaque point, saisir le debit en m3/h et la pression disponible correspondante en kPa.</p>
        <p><strong>Kv reseau :</strong> coefficient qui represente la facilite de passage de l'eau dans le reseau. Plus le Kv est eleve, moins le reseau est resistant.</p>
        <p><strong>Resultat :</strong> le module croise la courbe pompe avec la courbe reseau pour trouver le debit d'equilibre, la DP pompe, la DP reseau et la puissance hydraulique.</p>
      </div>
    </details>
    <div class="calc-note">
      Calcul indicatif de predimensionnement. A valider avec la courbe constructeur reelle du circulateur.
    </div>
    <div id="calcResults"></div>
  `, "Calcul inspire du fichier Excel circulateur : trois points constructeur, coefficient Kv reseau et resolution du point d'equilibre.");
}






function renderVessel() {
  wrapForm(`
    <div class="form-grid">
      ${selectField("vesFluidMode", "Type de reseau", [
        { value: "hot", label: "Eau chaude / chauffage" },
        { value: "cold", label: "Eau glacee / froid" }
      ])}
      ${field("vesVolume", "Volume installation", "1200", "l")}
      ${field("vesTempMin", "Temperature mini", "10", "deg C")}
      ${field("vesTempMax", "Temperature maxi", "80", "deg C")}
      ${field("vesHeight", "Hauteur statique", "12", "m")}
      ${field("vesValve", "Soupape", "3", "bar")}
      ${field("vesFillMargin", "Marge remplissage", "0.3", "bar")}
      ${field("vesFinalMargin", "Marge sous soupape", "0.5", "bar")}
      ${field("vesSafety", "Coefficient securite", "1.1")}
      ${field("vesInstalled", "Vase installe / envisage", "0", "l")}
    </div>
    <details class="module-help">
      <summary>Logique de calcul</summary>
      <div class="module-help-content">
        <p>Le volume de dilatation est calcule a partir de l'ecart de masse volumique entre la temperature mini et la temperature maxi.</p>
        <p>Pression initiale = hauteur statique / 10 + marge de remplissage. Pression finale = soupape - marge sous soupape.</p>
        <p>Capacite mini = volume dilate / rendement du vase, avec coefficient de securite.</p>
      </div>
    </details>
    <div id="calcResults"></div>
  `, "Predimensionnement du vase d'expansion inspire du fichier NC Calculs vases expansions. A valider selon la notice fabricant et le contexte du projet.");
}






function renderPlumbing() {
  wrapForm(`
    <div class="apparatus-grid">
      ${efEcApparelsData.apparels.map((item, index) => `
        <div class="apparatus-row">
          <strong>${item.name}</strong>
          <span>${fmt(item.index, 2)} l/s unitaire</span>
          <input id="efec-app-${index}" type="number" min="0" step="1" value="${efEcDefaultQuantities[item.name] || 0}">
        </div>
      `).join("")}
      <div class="apparatus-row">
        <strong>${efEcApparelsData.wc_flush.name}</strong>
        <span>${fmt(efEcApparelsData.wc_flush.index, 2)} l/s par groupe</span>
        <input id="efec-wc-flush" type="number" min="0" step="1" value="0">
      </div>
    </div>
    <div class="form-grid">
      ${selectField("plumbLuxe", "Niveau de confort", [
        { value: "1", label: "Standard" },
        { value: "2", label: "Confort +" },
        { value: "3", label: "Luxe" }
      ])}
      ${field("plumbTempEF", "Temperature EF", "10", "deg C")}
      ${field("plumbTempECS", "Temperature ECS production", "60", "deg C")}
      ${field("plumbTempMix", "Temperature eau melangee", "40", "deg C")}
      ${field("plumbSimuMin", "Coefficient mini simultaneite", "0.2")}
      ${field("plumbMajoration", "Majoration simultaneite", "1")}
      ${field("plumbVelocity", "Vitesse cible", "1.5", "m/s")}
      ${selectField("plumbMaterial", "Tube", [
        { value: "cuivre", label: "Cuivre" },
        { value: "per", label: "PER" },
        { value: "acier", label: "Acier" }
      ])}
    </div>
    <div id="calcResults"></div>
  `);
}


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


function renderDuctWeight() {
  const defaultRows = uiData.quantitatifs?.ductWeightDefaultRows || [];

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





function renderPsychro() {
  wrapForm(`
    <div class="form-grid">
      ${field("psyTemp", "Temperature seche", "25", "deg C")}
      ${field("psyRh", "Humidite relative", "50", "%")}
      ${field("psyPressure", "Pression atmospherique", "101.325", "kPa")}
      ${field("psyFlow", "Debit air", "1000", "m3/h")}
    </div>
    <div id="calcResults"></div>
  `);
}


function renderThermal() {
  wrapForm(`
    <div class="form-grid">
      ${field("thermLength", "Longueur du local", "8", "m", "number", "min=\"0\" step=\"0.1\"")}
      ${field("thermWidth", "Largeur du local", "5", "m", "number", "min=\"0\" step=\"0.1\"")}
      ${field("thermHeight", "Hauteur sous plafond", "2.5", "m", "number", "min=\"0\" step=\"0.1\"")}
      ${field("thermSummerExtTemp", "Ete - temperature exterieure", "32", "deg C")}
      ${field("thermSummerExtRh", "Ete - humidite exterieure", "40", "%")}
      ${field("thermSummerIntTemp", "Ete - temperature interieure", "26", "deg C")}
      ${field("thermSummerIntRh", "Ete - humidite interieure", "50", "%")}
      ${field("thermWinterExtTemp", "Hiver - temperature exterieure", "-5", "deg C")}
      ${field("thermWinterIntTemp", "Hiver - temperature interieure", "20", "deg C")}
      ${field("thermWallCoeff", "Coefficient murs", "1", "W/m2.K")}
      ${field("thermCeilingCoeff", "Coefficient plafond", "1", "W/m2.K")}
      ${field("thermGlassCoeff", "Coefficient vitrage", "2.9", "W/m2.K")}
      ${field("thermLightingRatio", "Ratio eclairage", "15", "W/m2")}
      ${field("thermPeople", "Occupation", "2", "pers", "number", "min=\"0\" step=\"1\"")}
      ${field("thermFreshAir", "Debit d'air neuf", "60", "m3/h")}
      ${field("thermInternalGain", "Apport interne", "0", "W")}
      ${field("thermGlassArea", "Surface vitrage", "6", "m2")}
      ${selectField("thermSolarOrientation", "Exposition vitrage", Object.entries(thermalSolarGains).map(([value, item]) => ({ value, label: item.label })))}
      ${selectField("thermSolarTreatment", "Traitement vitrage", Object.entries(thermalSolarTreatments).map(([value, item]) => ({ value, label: item.label })))}
      ${field("thermComputers", "Postes informatiques", "1", "u", "number", "min=\"0\" step=\"1\"")}
      ${field("thermComputerPower", "Puissance par poste", "200", "W")}
      ${field("thermFans", "Ventilateurs", "0", "u", "number", "min=\"0\" step=\"1\"")}
      ${field("thermFanPower", "Puissance par ventilateur", "0", "W")}
    </div>
    <details class="module-help">
      <summary>Logique du calcul</summary>
      <div class="module-help-content">
        <p>Module Bilan thermique simplifie : cloisons, plafond, eclairage, occupation, air neuf, apport interne, vitrage, informatique et ventilateurs.</p>
        <p>Le total froid additionne les apports ete. Le total chaud additionne les deperditions hiver par parois, plafond, air neuf et vitrages.</p>
      </div>
    </details>
    <div id="calcResults"></div>
  `, "Predimensionnement thermique simplifie : a valider par une note de calcul complete avant usage contractuel.");
}




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








const calculators = {
  ddv: { label: "Debit / diametre / vitesse", render: renderDdv },
  hydraulic: { label: "Reseau hydraulique", render: renderHydraulic },
  pump: { label: "Circulateur", render: renderPump },
  vessel: { label: "Vase d'expansion", render: renderVessel },
  duct: { label: "Gaine aeraulique", render: renderDuct },
  ductFlow: { label: "Debit air dans gaine", render: renderDuctFlow },
  ductPressure: { label: "Pertes de charge air", render: renderDuctPressure },
  plumbing: { label: "Debit plomberie", render: renderPlumbing },
  sanitaryEvac: { label: "Evacuations EU/EV/EP", render: renderSanitaryEvac },
  psychro: { label: "Psychrometrie", render: renderPsychro },
  thermal: { label: "Bilan thermique", render: renderThermal },
  gas: { label: "Debit gaz", render: renderGas },
  compressedAir: { label: "Tuyauterie air comprime", render: renderCompressedAir },
  insulation: { label: "Calorifuge", render: renderInsulation },
  ductWeight: { label: "Poids gaine et metré", render: renderDuctWeight },
  smoke: { label: "Desenfumage", render: renderSmoke },
  conversion: { label: "Conversions d'unites", render: renderConversion },
  combustionPciPcs: { label: "Combustion PCI/PCS", render: renderCombustionPciPcs },
  pending: { label: "Module a migrer", render: renderPending },
  library: { label: "Bibliotheque", render: renderLibrary }
};

const state = {
  category: "overview",
  query: "",
  selectedModule: null,
  currentCalculator: "ddv",
  report: [],
  requestId: 0
};

const $ = (selector) => document.querySelector(selector);
const fmt = (value, digits = 2) => Number.isFinite(value) ? value.toLocaleString("fr-FR", { maximumFractionDigits: digits }) : "-";
const mm = (value) => `${fmt(value, 1)} mm`;
const m3h = (value) => `${fmt(value, 2)} m3/h`;
const lps = (value) => `${fmt(value, 3)} l/s`;
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#39;"
}[char]));

async function loadAppData() {
  const [catalogResponse, uiResponse] = await Promise.all([
    fetch(`${API_BASE_URL}/api/catalog`),
    fetch(`${API_BASE_URL}/api/data/ui`)
  ]);

  if (!catalogResponse.ok) throw new Error(`Catalogue API ${catalogResponse.status}`);
  if (!uiResponse.ok) throw new Error(`Donnees UI API ${uiResponse.status}`);

  const catalog = await catalogResponse.json();
  uiData = await uiResponse.json();

  categories = catalog.categories || [];
  modules = catalog.modules || [];

  (catalog.calculators || []).forEach((item) => {
    if (calculators[item.id]) calculators[item.id].label = item.label;
  });

  ductPressureDiameters = uiData.aeraulique?.ductPressureDiameters || [];
  ductPressureMaterials = uiData.aeraulique?.ductPressureMaterials || [];
  ductPressureRows = uiData.aeraulique?.ductPressureRows || [];
  combustionFuels = uiData.combustion?.combustionFuels || {};
  conversionGroups = uiData.conversions?.conversionGroups || {};
  conversionReferences = uiData.conversions?.conversionReferences || [];
  sanitaryEvacFixtures = uiData.evacuations?.sanitaryEvacFixtures || [];
  sanitaryEvacUsageFactors = uiData.evacuations?.sanitaryEvacUsageFactors || {};
  compressedAirPipes = uiData.fluides?.compressedAirPipes || [];
  pipeTables = uiData.hydraulique?.pipeTables || {};
  efEcApparelsData = uiData.plumbing?.efEcApparelsData || efEcApparelsData;
  efEcDefaultQuantities = uiData.plumbing?.efEcDefaultQuantities || {};
  thermalSolarGains = uiData.thermique?.thermalSolarGains || {};
  thermalSolarTreatments = uiData.thermique?.thermalSolarTreatments || {};
  smokeZones = uiData.ventilation?.smokeZones || [];
}

function showStartupError(error) {
  const mount = document.getElementById("calculatorMount");
  if (mount) {
    mount.innerHTML = `
      <div class="empty-state">
        Impossible de charger les donnees de configuration depuis l'API : ${escapeHtml(error.message)}
      </div>
    `;
  }
}

async function init() {
  try {
    await loadAppData();
  } catch (error) {
    showStartupError(error);
    return;
  }

  if (!state.selectedModule && modules[0]) {
    state.selectedModule = modules[0].id;
    state.currentCalculator = modules[0].calculator;
  }

  renderCategories();
  renderCalculatorSelect();
  bindShellEvents();
  updateMetrics();
  render();
}

function bindShellEvents() {
  $("#searchInput").addEventListener("input", (event) => {
    state.query = event.target.value.trim().toLowerCase();
    render();
  });

  $("#resetButton").addEventListener("click", () => {
    state.category = "overview";
    state.query = "";
    state.selectedModule = modules[0].id;
    state.currentCalculator = modules[0].calculator;
    $("#searchInput").value = "";
    render();
  });

  $("#calculatorSelect").addEventListener("change", (event) => {
    state.currentCalculator = event.target.value;
    $("#calculatorTitle").textContent = calculators[state.currentCalculator].label;
    calculators[state.currentCalculator].render();
  });

  $("#copyReport").addEventListener("click", async () => {
    const text = $("#reportOutput").textContent;
    try {
      await navigator.clipboard.writeText(text);
      $("#copyReport").textContent = "Copie";
      window.setTimeout(() => $("#copyReport").textContent = "Copier", 1200);
    } catch {
      $("#copyReport").textContent = "Selectionner";
      window.setTimeout(() => $("#copyReport").textContent = "Copier", 1200);
    }
  });
}

function renderCategories() {
  const nav = $("#categoryNav");
  nav.innerHTML = categories.map((category) => {
    const count = category.id === "overview"
      ? modules.length
      : modules.filter((module) => module.category === category.id).length;
    return `
      <button class="nav-button" type="button" data-category="${category.id}">
        <span class="nav-icon" aria-hidden="true"></span>
        <span>${category.label}</span>
        <span class="nav-count">${count}</span>
      </button>
    `;
  }).join("");

  nav.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.category = button.dataset.category;
      render();
    });
  });
}

function renderCalculatorSelect() {
  const select = $("#calculatorSelect");
  select.innerHTML = Object.entries(calculators)
    .map(([id, calc]) => `<option value="${id}">${calc.label}</option>`)
    .join("");
}

function updateMetrics() {
  const metricModules = document.getElementById("metricModules");
  const metricCalculators = document.getElementById("metricCalculators");
  const metricSources = document.getElementById("metricSources");

  if (metricModules) {
    metricModules.textContent = modules.length;
  }

  if (metricCalculators) {
    metricCalculators.textContent = Object.keys(calculators).length;
  }

  if (metricSources) {
    metricSources.textContent = new Set(modules.flatMap((module) => module.source)).size;
  }
}

function render() {
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.category === state.category);
  });

  const category = categories.find((item) => item.id === state.category);
  $("#workspaceTitle").textContent = category ? category.label : "Vue d'ensemble";

  const filtered = modules.filter((module) => {
    const inCategory = state.category === "overview" || module.category === state.category;
    const haystack = `${module.title} ${module.description} ${module.source.join(" ")} ${(module.keywords || []).join(" ")}`.toLowerCase();
    return inCategory && (!state.query || haystack.includes(state.query));
  });

  $("#moduleCount").textContent = filtered.length;
  renderModules(filtered);

  if (!filtered.find((module) => module.id === state.selectedModule) && filtered[0]) {
    state.selectedModule = filtered[0].id;
  }

  const selected = modules.find((module) => module.id === state.selectedModule) || filtered[0] || modules[0];
  if (selected && selected.calculator !== state.currentCalculator) {
    state.currentCalculator = selected.calculator;
  }

  $("#calculatorSelect").value = state.currentCalculator;
  $("#calculatorTitle").textContent = calculators[state.currentCalculator].label;
  calculators[state.currentCalculator].render();
}

function renderModules(filtered) {
  const list = $("#moduleList");
  if (!filtered.length) {
    list.innerHTML = `<div class="empty-state">Aucun module ne correspond au filtre.</div>`;
    return;
  }

  list.innerHTML = filtered.map((module) => `
    <button class="module-card ${module.id === state.selectedModule ? "is-selected" : ""}" type="button" data-module="${module.id}">
      <div class="module-meta">
        <span class="status-pill ${module.status}">${statusLabel(module.status)}</span>
        <span class="source-chip">${categoryLabel(module.category)}</span>
      </div>
      <h4>${module.title}</h4>
      <p>${module.description}</p>
      <div class="module-meta">
        ${module.source.slice(0, 2).map((source) => `<span class="source-chip">${source}</span>`).join("")}
      </div>
    </button>
  `).join("");

  list.querySelectorAll(".module-card").forEach((button) => {
    button.addEventListener("click", () => {
      const module = modules.find((item) => item.id === button.dataset.module);
      state.selectedModule = module.id;
      state.currentCalculator = module.calculator;
      render();

      // En affichage mobile, le calculateur est placé sous la liste des modules.
      // Ce défilement automatique rend immédiatement visible le module sélectionné.
      if (window.innerWidth <= 768) {
        window.setTimeout(() => {
          document.querySelector(".calculator-panel")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }, 80);
      }
    });
  });
}

function statusLabel(status) {
  return {
    ready: "utilisable",
    draft: "a fiabiliser",
    backlog: "inactif"
  }[status] || status;
}

function categoryLabel(id) {
  return categories.find((category) => category.id === id)?.label || id;
}

function wrapForm(inner, note = "Predimensionnement: resultats a valider avant usage contractuel.") {
  $("#calculatorMount").innerHTML = `
    <form class="calc-form" id="calcForm">
      ${inner}
      <p class="calc-note">${note}</p>
    </form>
  `;
  $("#calcForm").addEventListener("input", runCurrentCalculator);
  $("#calcForm").addEventListener("change", runCurrentCalculator);
  runCurrentCalculator();
}

function field(id, label, value, unit = "", type = "number", attrs = "") {
  return `
    <div class="form-field">
      <label for="${id}">${label}${unit ? ` (${unit})` : ""}</label>
      <input id="${id}" name="${id}" type="${type}" value="${value}" ${attrs}>
    </div>
  `;
}

function selectField(id, label, options) {
  return `
    <div class="form-field">
      <label for="${id}">${label}</label>
      <select id="${id}" name="${id}">
        ${options.map((option) => `<option value="${option.value}">${option.label}</option>`).join("")}
      </select>
    </div>
  `;
}

function value(id) {
  const input = document.getElementById(id);
  return input ? Number(input.value.replace(",", ".")) : 0;
}

function selectValue(id) {
  return document.getElementById(id)?.value;
}

function result(items) {
  return `
    <div class="result-grid">
      ${items.map((item) => `
        <div class="result-item">
          <span>${escapeHtml(item.label)}</span>
          <strong>${escapeHtml(item.value)}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function setResults(items, title) {
  const output = document.getElementById("calcResults");
  if (output) output.innerHTML = result(items);
  const summary = `${title}\n${items.map((item) => `- ${item.label}: ${item.value}`).join("\n")}`;
  state.report = [summary, ...state.report.filter((item) => item !== summary)].slice(0, 6);
  $("#reportOutput").textContent = state.report.join("\n\n");
}

function prepareFormBeforeApiCall() {
  if (state.currentCalculator === "ddv") {
    updateDdvPipeOptions();
    updateDdvVisibility();
  }

  if (state.currentCalculator === "conversion") {
    populateConversionUnits(selectValue("convFamily") || "length");
  }

  if (state.currentCalculator === "combustionPciPcs") {
    updateCombustionDefaults(false);
  }
}

function collectFormPayload() {
  const values = {};
  const datasets = {};

  document.querySelectorAll("#calcForm input, #calcForm select, #calcForm textarea").forEach((element) => {
    if (!element.id) return;
    values[element.id] = element.value;
    datasets[element.id] = { ...element.dataset };
  });

  return {
    calculator: state.currentCalculator,
    module: state.selectedModule,
    values,
    datasets
  };
}

function applyDomUpdates(updates) {
  updates.forEach((update) => {
    if (!update.id || update.id === "calcResults") return;
    const element = document.getElementById(update.id);
    if (!element) return;

    if (typeof update.innerHTML === "string" && update.innerHTML && element.innerHTML !== update.innerHTML) {
      element.innerHTML = update.innerHTML;
    }

    if (update.style && typeof update.style === "object") {
      Object.entries(update.style).forEach(([key, val]) => {
        element.style[key] = val;
      });
    }

    if (update.dataset && typeof update.dataset === "object") {
      Object.entries(update.dataset).forEach(([key, val]) => {
        element.dataset[key] = val;
      });
    }

    if (Object.prototype.hasOwnProperty.call(update, "value") && element.value !== undefined && String(element.value) !== String(update.value)) {
      element.value = update.value;
    }

    if (typeof update.textContent === "string" && update.textContent && element.textContent !== update.textContent) {
      element.textContent = update.textContent;
    }
  });
}

async function runCurrentCalculator() {
  const calculator = state.currentCalculator;
  const requestId = ++state.requestId;

  try {
    prepareFormBeforeApiCall();

    const response = await fetch(`${API_BASE_URL}/api/calculate/${encodeURIComponent(calculator)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(collectFormPayload())
    });

    if (!response.ok) {
      throw new Error(`API ${response.status} ${response.statusText}`);
    }

    const payload = await response.json();
    if (requestId !== state.requestId || calculator !== state.currentCalculator) return;

    applyDomUpdates(payload.domUpdates || []);
    setResults(payload.items || [], payload.title || calculators[calculator]?.label || calculator);
  } catch (error) {
    if (requestId !== state.requestId) return;
    setResults([
      { label: "Erreur API", value: error.message },
      { label: "Controle", value: "Verifier que le backend Node.js est demarre et que /api est accessible." }
    ], calculators[calculator]?.label || "Calculateur");
  }
}

function selectedModule() {
  return modules.find((module) => module.id === state.selectedModule);
}

function renderPending() {
  const module = selectedModule();
  const pendingModule = module?.calculator === "pending" ? module : null;
  wrapForm(`
    <div class="empty-state">
      ${pendingModule ? `${pendingModule.title} est reference, mais son calculateur n'est pas encore migre.` : "Module a migrer."}
    </div>
    <div id="calcResults"></div>
  `, "Ce module reste dans le catalogue pour garder la trace du classeur source, mais il n'est pas encore exploitable.");
}

function calculatePending() {
  const module = selectedModule();
  const pendingModule = module?.calculator === "pending" ? module : null;
  setResults([
    { label: "Etat", value: "Module a migrer" },
    { label: "Source", value: pendingModule ? pendingModule.source.join(" / ") : "-" },
    { label: "Action", value: "Extraire les formules du classeur puis creer un calculateur dedie." }
  ], pendingModule ? pendingModule.title : "Module a migrer");
}

init();
