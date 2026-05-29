const { document, fmt, mm, m3h, lps, value, selectValue, setResults } = require("./runtime");
const { pipeTables, standardVesselVolumes } = require('../data/hydraulique');

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
  return pipeTables[material]?.[index] || pipeTables[material]?.[0] || null;
}

function calculateDdv() {
  updateDdvPipeOptions();
  updateDdvVisibility();

  const mode = selectValue("ddvMode");
  const unit = selectValue("ddvUnit");
  const material = selectValue("ddvMaterial") || "cuivre";
  const selectedPipe = getDdvSelectedPipe();
  const flowInput = value("ddvFlow");
  const velocity = value("ddvVelocity");
  const manualDiameter = value("ddvDiameter");
  const diameter = manualDiameter > 0 ? manualDiameter : selectedPipe?.d || 0;
  const flowM3s = unit === "ls" ? flowInput / 1000 : unit === "lh" ? flowInput / 3600000 : flowInput / 3600;
  const dM = diameter / 1000;
  const area = Math.PI * Math.pow(dM, 2) / 4;

  if (mode === "diameter") {
    const theoreticalDiameter = velocity > 0 ? Math.sqrt((4 * flowM3s) / (Math.PI * velocity)) * 1000 : 0;
    const recommended = selectPipe(material, theoreticalDiameter);
    const recommendedVelocity = recommended && flowM3s > 0
      ? flowM3s / (Math.PI * Math.pow(recommended.d / 1000, 2) / 4)
      : 0;

    setResults([
      { label: "Matiere", value: materialLabel(material) },
      { label: "Debit saisi", value: m3h(flowM3s * 3600) },
      { label: "Vitesse cible", value: `${fmt(velocity, 2)} m/s` },
      { label: "Diametre theorique", value: mm(theoreticalDiameter) },
      { label: "Reference conseillee", value: recommended ? recommended.ref : "hors table" },
      { label: "Diametre interieur conseille", value: recommended ? mm(recommended.d) : "-" },
      { label: "Vitesse reelle conseillee", value: `${fmt(recommendedVelocity, 2)} m/s` },
      { label: "Avis", value: velocityAdvice(recommendedVelocity) }
    ], "Debit - diametre - vitesse");
    return;
  }

  if (mode === "flow") {
    const q = area * velocity;
    setResults([
      { label: "Matiere", value: materialLabel(material) },
      { label: "Reference retenue", value: selectedPipe ? selectedPipe.ref : "diametre manuel" },
      { label: "Diametre interieur utilise", value: mm(diameter) },
      { label: "Vitesse", value: `${fmt(velocity, 2)} m/s` },
      { label: "Debit", value: m3h(q * 3600) },
      { label: "Debit", value: lps(q * 1000) },
      { label: "Section", value: `${fmt(area, 5)} m2` },
      { label: "Avis", value: velocityAdvice(velocity) }
    ], "Debit - diametre - vitesse");
    return;
  }

  const v = area > 0 ? flowM3s / area : 0;
  const recommended = selectPipe(material, diameter);
  setResults([
    { label: "Matiere", value: materialLabel(material) },
    { label: "Reference retenue", value: selectedPipe ? selectedPipe.ref : "diametre manuel" },
    { label: "Diametre interieur utilise", value: mm(diameter) },
    { label: "Debit", value: m3h(flowM3s * 3600) },
    { label: "Debit", value: lps(flowM3s * 1000) },
    { label: "Section", value: `${fmt(area, 5)} m2` },
    { label: "Vitesse calculee", value: `${fmt(v, 2)} m/s` },
    { label: "Reference normalisee proche", value: recommended ? recommended.ref : "hors table" },
    { label: "Avis", value: velocityAdvice(v) }
  ], "Debit - diametre - vitesse");
}

function materialLabel(material) {
  return {
    acier: "Acier",
    cuivre: "Cuivre",
    per: "PER"
  }[material] || material;
}

function velocityAdvice(velocity) {
  if (!Number.isFinite(velocity) || velocity <= 0) return "Saisir des valeurs positives.";
  if (velocity < 0.5) return "Vitesse faible: installation silencieuse, mais debit peu dynamique.";
  if (velocity <= 1.5) return "Vitesse correcte pour un predimensionnement courant.";
  if (velocity <= 2) return "Vitesse elevee mais encore exploitable selon le contexte.";
  return "Vitesse trop elevee: risque de bruit, pertes de charge et usure.";
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

function calculateHydraulic() {
  const power = value("hydPower");
  const deltaT = value("hydDelta");
  const velocity = value("hydVelocity");
  const material = selectValue("hydMaterial");

  if (power <= 0 || deltaT <= 0 || velocity <= 0) {
    setResults([
      { label: "Controle", value: "Saisir une puissance, un delta T et une vitesse strictement positifs." }
    ], "Reseau hydraulique chauffage");
    return;
  }

  const flowM3h = power * 0.86 / deltaT;
  const flowM3s = flowM3h / 3600;
  const theoreticalDiameter = Math.sqrt((4 * flowM3s) / (Math.PI * velocity)) * 1000;
  const selected = selectPipe(material, theoreticalDiameter);
  const realVelocity = selected ? flowM3s / (Math.PI * Math.pow(selected.d / 1000, 2) / 4) : NaN;

  setResults([
    { label: "Debit chauffage", value: m3h(flowM3h) },
    { label: "Debit", value: `${fmt(flowM3h * 1000, 0)} l/h` },
    { label: "Diametre theorique", value: mm(theoreticalDiameter) },
    { label: "Reference proposee", value: selected ? selected.ref : "hors table" },
    { label: "Diametre interieur retenu", value: selected ? mm(selected.d) : "-" },
    { label: "Vitesse reelle", value: `${fmt(realVelocity, 2)} m/s` }
  ], "Reseau hydraulique chauffage");
}

function selectPipe(material, minDiameter) {
  const table = pipeTables[material] || [];
  if (!table.length || !Number.isFinite(minDiameter) || minDiameter <= 0) return null;
  return table.find((pipe) => pipe.d >= minDiameter) || null;
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

function calculatePump() {
  const name = document.getElementById("pumpName")?.value || "Circulateur";
  const points = [
    [value("pumpQ1"), value("pumpP1")],
    [value("pumpQ2"), value("pumpP2")],
    [value("pumpQ3"), value("pumpP3")]
  ];
  const kv = value("pumpKv");
  const z = kv > 0 ? 10 / Math.pow(kv, 2) : 0;

  const validPoints = points.every(([q, dp]) => q >= 0 && dp >= 0) && new Set(points.map(([q]) => q)).size === 3;
  if (!validPoints || kv <= 0) {
    setResults([
      { label: "Controle", value: "Saisir trois debits differents, trois DP positives et un Kv superieur a 0." }
    ], "Point d'equilibre circulateur");
    return;
  }

  const coeffs = quadraticThroughPoints(points);
  const qZeroRoots = quadraticRoots(coeffs.a, coeffs.b, coeffs.c).filter((root) => root >= 0);
  const qZero = qZeroRoots.length ? Math.max(...qZeroRoots) : 0;
  const equilibriumRoots = quadraticRoots(coeffs.a - z, coeffs.b, coeffs.c).filter((root) => root >= 0);
  const qEquilibrium = equilibriumRoots.length ? Math.max(...equilibriumRoots) : 0;
  const pumpDp = pumpPressureAt(coeffs, qEquilibrium);
  const networkDp = z * Math.pow(qEquilibrium, 2);
  const hydraulicPower = qEquilibrium * networkDp / 3.6;
  const delta = Math.abs(pumpDp - networkDp);
  const isInsideCurve = qZero > 0 ? qEquilibrium <= qZero : true;

  setResults([
    { label: "Circulateur", value: name },
    { label: "Coefficient reseau Z", value: `${fmt(z, 4)} kPa/(m3/h)2` },
    { label: "Equation pompe", value: `DP = ${fmt(coeffs.a, 4)} qv2 + ${fmt(coeffs.b, 4)} qv + ${fmt(coeffs.c, 2)}` },
    { label: "Debit a DP zero", value: m3h(qZero) },
    { label: "Debit d'equilibre", value: m3h(qEquilibrium) },
    { label: "DP pompe", value: `${fmt(pumpDp, 2)} kPa` },
    { label: "DP reseau", value: `${fmt(networkDp, 2)} kPa` },
    { label: "Puissance hydraulique", value: `${fmt(hydraulicPower, 1)} W` },
    { label: "Ecart pompe / reseau", value: `${fmt(delta, 3)} kPa` },
    { label: "Controle", value: isInsideCurve ? "Point situe dans la plage de courbe." : "Point hors plage: verifier les points constructeur." }
  ], "Point d'equilibre circulateur");
}

function quadraticThroughPoints(points) {
  const [[x1, y1], [x2, y2], [x3, y3]] = points;
  const denominator = (x1 - x2) * (x1 - x3) * (x2 - x3);
  if (denominator === 0) return { a: 0, b: 0, c: 0 };

  const a = (x3 * (y2 - y1) + x2 * (y1 - y3) + x1 * (y3 - y2)) / denominator;
  const b = (Math.pow(x3, 2) * (y1 - y2) + Math.pow(x2, 2) * (y3 - y1) + Math.pow(x1, 2) * (y2 - y3)) / denominator;
  const c = (x2 * x3 * (x2 - x3) * y1 + x3 * x1 * (x3 - x1) * y2 + x1 * x2 * (x1 - x2) * y3) / denominator;

  return { a, b, c };
}

function quadraticRoots(a, b, c) {
  if (Math.abs(a) < 1e-9) {
    return Math.abs(b) < 1e-9 ? [] : [-c / b];
  }

  const delta = Math.pow(b, 2) - 4 * a * c;
  if (delta < 0) return [];
  if (delta === 0) return [-b / (2 * a)];

  const sqrtDelta = Math.sqrt(delta);
  return [
    (-b + sqrtDelta) / (2 * a),
    (-b - sqrtDelta) / (2 * a)
  ];
}

function pumpPressureAt(coeffs, flow) {
  return coeffs.a * Math.pow(flow, 2) + coeffs.b * flow + coeffs.c;
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

function calculateVessel() {
  const mode = selectValue("vesFluidMode") || "hot";
  const volume = value("vesVolume");
  const tempMin = value("vesTempMin");
  const tempMax = value("vesTempMax");
  const height = value("vesHeight");
  const valve = value("vesValve");
  const fillMargin = value("vesFillMargin");
  const finalMargin = value("vesFinalMargin");
  const safety = value("vesSafety");
  const installedVolume = value("vesInstalled");

  const rhoMin = waterDensity(tempMin);
  const rhoMax = waterDensity(tempMax);
  const expansion = Math.max((rhoMin / rhoMax) - 1, 0);
  const dilatedVolume = volume * expansion;

  const staticPressure = height / 10;
  const pInitial = Math.max(staticPressure + fillMargin, 0.8);
  const pFill = pInitial + 0.2;
  const pFinal = Math.max(valve - finalMargin, pInitial + 0.4);
  const efficiency = Math.max(1 - ((pInitial + 1) / (pFinal + 1)), 0.01);
  const usefulCapacity = dilatedVolume / efficiency;
  const vesselCapacity = usefulCapacity * safety;

  const recommendedStandard = standardVesselVolumes.find((standard) => standard >= vesselCapacity) || null;
  const installedRatio = installedVolume > 0 ? usefulCapacity / installedVolume : 0;
  const installedStatus = installedVolume <= 0
    ? "Non renseigne."
    : installedVolume >= vesselCapacity
      ? "Volume installe suffisant."
      : "Volume installe insuffisant.";
  const pressureStatus = pFinal > pInitial
    ? "Pressions coherentes."
    : "Pression finale insuffisante : verifier soupape, hauteur statique ou marge.";

  setResults([
    { label: "Type de reseau", value: mode === "cold" ? "Eau glacee / froid" : "Eau chaude / chauffage" },
    { label: "Volume installation", value: `${fmt(volume, 0)} l` },
    { label: "Masse volumique mini", value: `${fmt(rhoMin, 1)} kg/m3` },
    { label: "Masse volumique maxi", value: `${fmt(rhoMax, 1)} kg/m3` },
    { label: "Coefficient dilatation", value: fmt(expansion, 4) },
    { label: "Volume dilate", value: `${fmt(dilatedVolume, 1)} l` },
    { label: "Pression statique", value: `${fmt(staticPressure, 2)} bar` },
    { label: "Pression initiale vase", value: `${fmt(pInitial, 2)} bar` },
    { label: "Pression de remplissage", value: `${fmt(pFill, 2)} bar` },
    { label: "Pression finale retenue", value: `${fmt(pFinal, 2)} bar` },
    { label: "Rendement du vase", value: `${fmt(efficiency * 100, 1)} %` },
    { label: "Capacite utile", value: `${fmt(usefulCapacity, 0)} l` },
    { label: "Capacite mini avec securite", value: `${fmt(vesselCapacity, 0)} l` },
    { label: "Volume standard conseille", value: recommendedStandard ? `${fmt(recommendedStandard, 0)} l` : "hors table" },
    { label: "Vase installe / envisage", value: installedVolume > 0 ? `${fmt(installedVolume, 0)} l` : "non renseigne" },
    { label: "Taux utile / vase installe", value: installedVolume > 0 ? `${fmt(installedRatio * 100, 1)} %` : "-" },
    { label: "Controle vase", value: installedStatus },
    { label: "Controle pressions", value: pressureStatus }
  ], "Vase d'expansion chauffage / eau glacee");
}

function expansionCoefficient(temp) {
  return Math.max((waterDensity(10) / waterDensity(temp)) - 1, 0);
}

function waterDensity(tempC) {
  const t = Math.max(0, Math.min(100, tempC));
  return 1000 * (1 - ((t + 288.9414) / (508929.2 * (t + 68.12963))) * Math.pow(t - 3.9863, 2));
}


module.exports = {
  calculateDdv,
  calculateHydraulic,
  calculatePump,
  calculateVessel,
  selectPipe
};
