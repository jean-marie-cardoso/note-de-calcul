const ductPressureDiameters = [60, 80, 100, 125, 160, 200, 250, 315, 355, 400, 450, 500, 560, 630, 710, 800, 900, 1000, 1120, 1250];

const ductPressureMaterials = [
  { value: "acier_galva", label: "acier galvanise", roughness: 0.15 },
  { value: "spirale", label: "conduit agrafe spirale", roughness: 0.5 },
  { value: "acier_inox", label: "acier inoxydable", roughness: 0.05 },
  { value: "acier_noir", label: "acier noir lamine", roughness: 0.1 },
  { value: "aluminium", label: "aluminium", roughness: 0.002 },
  { value: "flexible", label: "flexible", roughness: 3 },
  { value: "plastique", label: "mat. plastique", roughness: 0.002 },
  { value: "beton_lisse", label: "beton lisse", roughness: 0.55 },
  { value: "beton_brut", label: "beton brut de decoffrage", roughness: 2 },
  { value: "brique", label: "paroi de brique", roughness: 2 },
  { value: "tole_rivee", label: "tole d'acier rivee", roughness: 2 }
];

const ductPressureRows = [
  { flow: 1800, length: 12, shape: "round", diameter: 315, width: 600, height: 300, fixed: 0, zeta: 0.8 },
  { flow: 1200, length: 8, shape: "rect", diameter: 250, width: 500, height: 250, fixed: 0, zeta: 1.2 },
  { flow: 800, length: 10, shape: "round", diameter: 250, width: 400, height: 200, fixed: 0, zeta: 0.6 },
  { flow: 0, length: 0, shape: "round", diameter: 200, width: 300, height: 200, fixed: 0, zeta: 0 },
  { flow: 0, length: 0, shape: "round", diameter: 200, width: 300, height: 200, fixed: 0, zeta: 0 },
  { flow: 0, length: 0, shape: "round", diameter: 200, width: 300, height: 200, fixed: 0, zeta: 0 }
];

const ductFlowDiameters = [125, 160, 200, 250, 315, 355, 400, 450, 500, 560, 630, 710];

module.exports = {
  ductPressureDiameters,
  ductPressureMaterials,
  ductPressureRows,
  ductFlowDiameters
};
