const aeraulique = require('./aeraulique');
const combustion = require('./combustion');
const conversions = require('./conversions');
const evacuations = require('./evacuations');
const fluides = require('./fluides');
const hydraulique = require('./hydraulique');
const plumbing = require('./plumbing');
const quantitatifs = require('./quantitatifs');
const thermique = require('./thermique');
const ventilation = require('./ventilation');

function withoutKeys(items, keys) {
  return items.map((item) => {
    const copy = { ...item };
    keys.forEach((key) => delete copy[key]);
    return copy;
  });
}

function conversionGroupsForUi(groups) {
  return Object.fromEntries(Object.entries(groups).map(([id, group]) => [id, {
    label: group.label,
    base: group.base,
    units: group.units.map((unit) => ({ id: unit.id, label: unit.label }))
  }]));
}

function objectLabelsOnly(object) {
  return Object.fromEntries(Object.entries(object).map(([id, item]) => [id, { label: item.label }]));
}

function ductFlowLookupRows(diameters) {
  return diameters.map((diameter) => {
    const section = Math.PI * Math.pow(diameter / 1000, 2) / 4;
    return {
      diameter,
      flows: [4, 5, 6, 8, 10, 12].map((velocity) => Math.round(section * velocity * 3600))
    };
  });
}

module.exports = {
  aeraulique: {
    ductPressureDiameters: aeraulique.ductPressureDiameters,
    ductPressureMaterials: withoutKeys(aeraulique.ductPressureMaterials, ['roughness']),
    ductPressureRows: aeraulique.ductPressureRows,
    ductFlowDiameters: aeraulique.ductFlowDiameters,
    ductFlowLookupRows: ductFlowLookupRows(aeraulique.ductFlowDiameters)
  },
  combustion: {
    combustionFuels: combustion.combustionFuels
  },
  conversions: {
    conversionGroups: conversionGroupsForUi(conversions.conversionGroups),
    conversionReferences: conversions.conversionReferences
  },
  evacuations: {
    sanitaryEvacFixtures: evacuations.sanitaryEvacFixtures,
    sanitaryEvacUsageFactors: evacuations.sanitaryEvacUsageFactors
  },
  fluides: {
    compressedAirPipes: fluides.compressedAirPipes
  },
  hydraulique: {
    pipeTables: hydraulique.pipeTables
  },
  plumbing: {
    efEcApparelsData: plumbing.efEcApparelsData,
    efEcDefaultQuantities: plumbing.efEcDefaultQuantities
  },
  quantitatifs: {
    ductWeightDefaultRows: quantitatifs.ductWeightDefaultRows
  },
  thermique: {
    thermalSolarGains: objectLabelsOnly(thermique.thermalSolarGains),
    thermalSolarTreatments: objectLabelsOnly(thermique.thermalSolarTreatments)
  },
  ventilation: {
    smokeZones: ventilation.smokeZones
  }
};
