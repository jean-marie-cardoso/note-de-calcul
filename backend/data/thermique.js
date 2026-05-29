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

module.exports = {
  thermalSolarGains,
  thermalSolarTreatments
};
