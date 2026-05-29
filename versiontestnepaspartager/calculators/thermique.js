const thermalSolarGains = {
  ne: { label: "NE", base: 300 },
  e: { label: "E", base: 510 },
  se: { label: "SE", base: 515 },
  s: { label: "S", base: 525 },
  so: { label: "SO", base: 510 },
  o: { label: "O", base: 510 },
  no: { label: "NO", base: 300 },
  horizontal: { label: "Horizontale", base: 650 }
};

const thermalSolarTreatments = {
  none: { label: "Sans traitement", factor: 1 },
  double: { label: "Double vitrage", factor: 0.8 },
  solar: { label: "Traitement solaire", factor: 0.6 },
  interiorBlind: { label: "Store interieur", factor: 0.5 },
  exteriorBlind: { label: "Store exterieur", factor: 0.3 }
};

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

function calculatePsychro() {
  const t = value("psyTemp");
  const rh = value("psyRh") / 100;
  const pressure = value("psyPressure");
  const flow = value("psyFlow");
  const pws = 0.61078 * Math.exp((17.2694 * t) / (t + 237.3));
  const pv = rh * pws;
  const w = 0.62198 * pv / (pressure - pv);
  const h = 1.006 * t + w * (2501 + 1.86 * t);
  const alpha = Math.log(rh) + (17.2694 * t) / (237.3 + t);
  const dew = (237.3 * alpha) / (17.2694 - alpha);
  const density = (pressure * 1000) / (287.05 * (t + 273.15) * (1 + 1.6078 * w));
  setResults([
    { label: "Pression vapeur saturante", value: `${fmt(pws, 3)} kPa` },
    { label: "Humidite specifique", value: `${fmt(w * 1000, 2)} g/kg air sec` },
    { label: "Point de rosee", value: `${fmt(dew, 1)} deg C` },
    { label: "Enthalpie", value: `${fmt(h, 1)} kJ/kg air sec` },
    { label: "Masse volumique", value: `${fmt(density, 3)} kg/m3` },
    { label: "Debit massique", value: `${fmt(flow * density, 0)} kg/h` }
  ], "Psychrometrie");
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

function calculateThermal() {
  const length = value("thermLength");
  const width = value("thermWidth");
  const height = value("thermHeight");
  const area = length * width;
  const volume = area * height;
  const wallSurface = (length + width) * 2 * height;

  const summerDelta = value("thermSummerExtTemp") - value("thermSummerIntTemp");
  const winterDelta = value("thermWinterIntTemp") - value("thermWinterExtTemp");
  const summerExternalAir = thermalMoistAir(value("thermSummerExtTemp"), value("thermSummerExtRh"));
  const summerInternalAir = thermalMoistAir(value("thermSummerIntTemp"), value("thermSummerIntRh"));
  const deltaEnthalpy = summerExternalAir.enthalpy - summerInternalAir.enthalpy;

  const wallCoeff = value("thermWallCoeff");
  const ceilingCoeff = value("thermCeilingCoeff");
  const glassCoeff = value("thermGlassCoeff");
  const lightingRatio = value("thermLightingRatio");
  const people = value("thermPeople");
  const freshAir = value("thermFreshAir");
  const internalGain = value("thermInternalGain");
  const glassArea = value("thermGlassArea");
  const computers = value("thermComputers");
  const computerPower = value("thermComputerPower");
  const fans = value("thermFans");
  const fanPower = value("thermFanPower");

  const solarOrientation = thermalSolarGains[selectValue("thermSolarOrientation")] || thermalSolarGains.s;
  const solarTreatment = thermalSolarTreatments[selectValue("thermSolarTreatment")] || thermalSolarTreatments.none;
  const solarRatio = solarOrientation.base * solarTreatment.factor;

  const summerWalls = wallSurface * summerDelta * wallCoeff;
  const summerCeiling = area * summerDelta * ceilingCoeff;
  const summerLighting = area * lightingRatio;
  const summerPeople = people * 150;
  const summerFreshAir = freshAir * (1.2 / 3600) * deltaEnthalpy * 1000;
  const summerGlass = glassArea * solarRatio;
  const summerComputers = computers * computerPower;
  const summerFans = fans * fanPower;
  const summerTotal = summerWalls + summerCeiling + summerLighting + summerPeople + summerFreshAir + internalGain + summerGlass + summerComputers + summerFans;

  const winterWalls = wallSurface * winterDelta * wallCoeff;
  const winterCeiling = area * winterDelta * ceilingCoeff;
  const winterFreshAir = freshAir * 0.34 * winterDelta;
  const winterGlass = glassArea * glassCoeff * winterDelta;
  const winterTotal = winterWalls + winterCeiling + winterFreshAir + winterGlass;

  setResults([
    { label: "Surface", value: `${fmt(area, 2)} m2` },
    { label: "Volume", value: `${fmt(volume, 2)} m3` },
    { label: "Delta ete", value: `${fmt(summerDelta, 1)} K` },
    { label: "Delta hiver", value: `${fmt(winterDelta, 1)} K` },
    { label: "Delta enthalpie ete", value: `${fmt(deltaEnthalpy, 2)} kJ/kg` },
    { label: "Froid - cloisons", value: `${fmt(summerWalls, 0)} W` },
    { label: "Froid - plafond", value: `${fmt(summerCeiling, 0)} W` },
    { label: "Froid - eclairage", value: `${fmt(summerLighting, 0)} W` },
    { label: "Froid - occupation", value: `${fmt(summerPeople, 0)} W` },
    { label: "Froid - air neuf", value: `${fmt(summerFreshAir, 0)} W` },
    { label: "Froid - vitrage solaire", value: `${fmt(summerGlass, 0)} W (${solarOrientation.label} / ${solarTreatment.label})` },
    { label: "Froid - informatique", value: `${fmt(summerComputers, 0)} W` },
    { label: "Froid - ventilateurs", value: `${fmt(summerFans, 0)} W` },
    { label: "Total froid", value: `${fmt(summerTotal, 0)} W / ${fmt(summerTotal / 1000, 2)} kW` },
    { label: "Ratio froid", value: area > 0 ? `${fmt(summerTotal / area, 1)} W/m2` : "-" },
    { label: "Chaud - cloisons", value: `${fmt(winterWalls, 0)} W` },
    { label: "Chaud - plafond", value: `${fmt(winterCeiling, 0)} W` },
    { label: "Chaud - air neuf", value: `${fmt(winterFreshAir, 0)} W` },
    { label: "Chaud - vitrage", value: `${fmt(winterGlass, 0)} W` },
    { label: "Total chaud", value: `${fmt(winterTotal, 0)} W / ${fmt(winterTotal / 1000, 2)} kW` },
    { label: "Ratio chaud", value: area > 0 ? `${fmt(winterTotal / area, 1)} W/m2` : "-" }
  ], "Bilan thermique simplifie");
}

function thermalMoistAir(tempC, relativeHumidityPercent) {
  const pvs = Math.pow(10, 2.7877 + ((7.625 * tempC) / (241.6 + tempC)));
  const rh = Math.max(relativeHumidityPercent, 0) / 100;
  const humidityRatio = (0.622 * rh * pvs) / (101325 - (rh * pvs));
  const enthalpy = tempC + humidityRatio * ((1.96 * tempC) + 2490);
  return { pvs, humidityRatio, enthalpy };
}
