const { document, fmt, mm, m3h, lps, value, selectValue, setResults } = require("./runtime");
const { selectPipe } = require("./hydraulique");
const efEcApparelsData = {
  apparels: [
    { name: "évier - timbre office", index: 0.2 },
    { name: "Lavabo", index: 0.2 },
    { name: "bidet", index: 0.2 },
    { name: "baignoire", index: 0.33 },
    { name: "douche", index: 0.2 },
    { name: "WC avec réservoir de chasse", index: 0.12 },
    { name: "urinoir avec robinet individuel", index: 0.15 },
    { name: "urinoir à action siphonique", index: 0.5 },
    { name: "lavabo collectif (0,05 l/s par jet)", index: 0.05 },
    { name: "poste d'eau, robinet 1/2", index: 0.33 },
    { name: "poste d'eau, robinet 3/4", index: 0.42 },
    { name: "lave-mains", index: 0.1 },
    { name: "bac à laver", index: 0.33 },
    { name: "MAL le linge (Compter pour une MAL)", index: 0.2 },
    { name: "MAL la vaiselle (Compter pour une MAL)", index: 0.1 },
    { name: "Equipements Restaurant-cuisine collective", index: 1.08 },
    { name: "robinet de plonge (mélangeur 3/4)", index: 0.75 },
    { name: "robinet de plonge (mélangeur1/2 )", index: 0.33 },
    { name: "MAL semi-automatique 10 à 150 couverts", index: 0.5 },
    { name: "MAL semi-automatique 151 à 300 couverts", index: 0.5 },
    { name: "MAL automatique 300 à 1500 couverts", index: 0.7 },
    { name: "MAL automatique 1500 à 2000 couverts", index: 1 }
  ],
  wc_flush: { name: "WC avec robinet de chasse", index: 1.5 }
};

const efEcDefaultQuantities = {
  Lavabo: 4,
  douche: 2,
  "WC avec réservoir de chasse": 3
};

function calculateDebitProbable(inputs = {}, luxeLevel = 1, simuMin = 0.2, majoration = 1) {
  let debitBaseSanit = 0;
  let countSanit = 0;

  efEcApparelsData.apparels.forEach((app) => {
    const qty = Number(inputs[app.name] ?? 0);
    if (!Number.isFinite(qty) || qty <= 0) return;
    debitBaseSanit += app.index * qty;
    countSanit += qty;
  });

  const comfortLevel = Number(luxeLevel);
  const kLuxeFactor = comfortLevel === 2 ? 1.25 : comfortLevel >= 3 ? 1.5 : 1;
  let coeffSimulSanit = countSanit >= 3 ? 0.8 * kLuxeFactor / Math.sqrt(countSanit - 1) : 1;
  coeffSimulSanit = Math.max(coeffSimulSanit * majoration, simuMin);
  const debitSanit = debitBaseSanit * coeffSimulSanit;

  const wcFlush = efEcApparelsData.wc_flush;
  const wcCount = Number(inputs[wcFlush.name] ?? 0);
  let wcGroup = 0;
  if (wcCount >= 1 && wcCount < 4) {
    wcGroup = 1;
  } else if (wcCount >= 4 && wcCount < 13) {
    wcGroup = 2;
  } else if (wcCount >= 13 && wcCount < 25) {
    wcGroup = 3;
  } else if (wcCount >= 25 && wcCount < 51) {
    wcGroup = 4;
  } else if (wcCount >= 51) {
    wcGroup = 5;
  }

  const debitWC = wcGroup * wcFlush.index;
  const debitTotal = debitSanit + debitWC;

  return {
    debitBaseSanit: Number(debitBaseSanit.toFixed(3)),
    debitSanit: Number(debitSanit.toFixed(3)),
    debitWC: Number(debitWC.toFixed(3)),
    debitTotal: Number(debitTotal.toFixed(3)),
    coeffSimulSanit: Number(coeffSimulSanit.toFixed(3)),
    countSanit: Number(countSanit),
    wcCount: Number.isFinite(wcCount) && wcCount > 0 ? Number(wcCount) : 0,
    wcGroup: Number(wcGroup)
  };
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

function calculatePlumbing() {
  const inputs = {};
  efEcApparelsData.apparels.forEach((item, index) => {
    inputs[item.name] = Number(document.getElementById(`efec-app-${index}`)?.value || 0);
  });
  inputs[efEcApparelsData.wc_flush.name] = Number(document.getElementById("efec-wc-flush")?.value || 0);

  const luxe = Number(selectValue("plumbLuxe") || 1);
  const tempEF = value("plumbTempEF");
  const tempECS = value("plumbTempECS");
  const tempMix = value("plumbTempMix");
  const simuMin = value("plumbSimuMin");
  const majoration = value("plumbMajoration") || 1;
  const velocity = value("plumbVelocity");

  const debit = calculateDebitProbable(inputs, luxe, simuMin, majoration);
  const probable = debit.debitTotal;
  const flowM3h = probable * 3.6;

  const ecsRatio = Math.max(0, Math.min(1, (tempMix - tempEF) / Math.max(tempECS - tempEF, 1)));
  const ecsFlow = probable * ecsRatio;
  const efFlow = probable - ecsFlow;

  const theoreticalDiameter = probable > 0 && velocity > 0
    ? Math.sqrt((4 * probable / 1000) / (Math.PI * velocity)) * 1000
    : 0;

  const selected = theoreticalDiameter > 0 ? selectPipe(selectValue("plumbMaterial"), theoreticalDiameter) : null;

  const realVelocity = selected && probable > 0
    ? (probable / 1000) / (Math.PI * Math.pow(selected.d / 1000, 2) / 4)
    : 0;

  setResults([
    { label: "Appareils sanitaires", value: fmt(debit.countSanit, 0) },
    { label: "Debit brut sanitaires", value: lps(debit.debitBaseSanit) },
    { label: "Coefficient simultaneite", value: fmt(debit.coeffSimulSanit, 3) },
    { label: "Correction ECS", value: `${fmt(ecsRatio * 100, 0)} % du debit melange` },
    { label: "Temperatures", value: `EF ${fmt(tempEF, 0)} deg C / ECS ${fmt(tempECS, 0)} deg C / melange ${fmt(tempMix, 0)} deg C` },
    { label: "Debit probable sanitaires", value: lps(debit.debitSanit) },
    { label: "WC robinet de chasse", value: `${fmt(debit.wcCount, 0)} appareil(s) / ${fmt(debit.wcGroup, 0)} groupe(s)` },
    { label: "Debit WC robinet", value: lps(debit.debitWC) },
    { label: "Debit probable total", value: lps(probable) },
    { label: "Debit total", value: m3h(flowM3h) },
    { label: "Debit EF estime", value: lps(efFlow) },
    { label: "Debit ECS production", value: lps(ecsFlow) },
    { label: "Diametre theorique", value: mm(theoreticalDiameter) },
    { label: "Reference proposee", value: selected ? selected.ref : "hors table" },
    { label: "Vitesse reelle", value: `${fmt(realVelocity, 2)} m/s` }
  ], "Debit probable plomberie EF/ECS");
}


module.exports = {
  calculatePlumbing,
  calculateDebitProbable
};
