const categories = [
  { id: "overview", label: "Vue d'ensemble" },
  { id: "hydraulique", label: "Hydraulique" },
  { id: "aeraulique", label: "Aeraulique" },
  { id: "plomberie", label: "Plomberie" },
  { id: "thermique", label: "Thermique" },
  { id: "ventilation", label: "Ventilation" },
  { id: "fluides", label: "Gaz, vapeur, air" },
  { id: "quantitatifs", label: "Quantitatifs" },
  { id: "utilitaires", label: "Utilitaires" },
  { id: "bibliotheque", label: "Bibliotheque Excel" }
];

const modules = [
  {
    id: "fluides-ddv",
    category: "hydraulique",
    title: "Debit - diametre - vitesse",
    status: "ready",
    calculator: "ddv",
    source: ["Programmes/Chaufferie/Calcul pratique Fluides", "DIM ALIM EF"],
    description: "Predimensionnement rapide d'une conduite ou d'un reseau par debit, vitesse et diametre.",
    keywords: ["debit", "débit", "diametre", "diamètre", "vitesse", "tube", "tuyau", "canalisation", "conduite", "section", "hydraulique", "eau", "dimensionnement"]
  },
  {
    id: "reseau-hydraulique",
    category: "hydraulique",
    title: "Reseau hydraulique chauffage",
    status: "ready",
    calculator: "hydraulic",
    source: ["Reseau hydraulique/Réseau hydraulique_model_V01", "Programmes/Chaufferie/Calcul pratique Fluides"],
    description: "Debit d'eau, diametre theorique, reference tube et vitesse reelle a partir de la puissance.",
    keywords: ["chauffage", "réseau", "reseau", "hydraulique", "puissance", "kw", "delta t", "débit eau", "debit eau", "diametre", "diamètre", "tube", "vitesse", "radiateur", "PAC", "chaudière", "chaudiere", "dimensionnement"]
  },
  {
    id: "circulateur",
    category: "hydraulique",
    title: "Point d'equilibre circulateur",
    status: "ready",
    calculator: "pump",
    source: ["Programmes/Chaufferie/circulateur"],
    description: "Calcul du point d'equilibre d'un circulateur a partir de trois points constructeur et du coefficient Kv du reseau.",
    keywords: ["pompe", "circulateur", "courbe", "hmt", "perte de charge", "pression", "débit", "debit", "réseau", "reseau", "chauffage", "dimensionnement", "sélection", "selection", "performance", "rendement"]
  },
  {
    id: "vase",
    category: "hydraulique",
    title: "Vase d'expansion chauffage",
    status: "ready",
    calculator: "vessel",
    source: ["Programmes/Chaufferie/vase", "Vase d'expansion/Calcul capacité vase d'expension"],
    description: "Capacite minimale, pressions de gonflage et volume de dilatation.",
    keywords: ["vase", "expansion", "chauffage", "pression", "gonflage", "soupape", "dilatation", "volume", "installation", "sécurité", "securite" ,"dimensionnement", "selection", "sélection", "selection", "calcul", "capacité", "capacite"]
  },
  {
    id: "gaine-air",
    category: "aeraulique",
    title: "Gaine circulaire et rectangulaire",
    status: "ready",
    calculator: "duct",
    source: ["Réseau Aéraulique/Réseau aéraulique_model_V01", "Aéraulique/Réseau aéraulique_model_V01"],
    description: "Diametre circulaire, largeur rectangulaire et surface d'isolation de gaine.",
    keywords: ["gaine", "air", "aéraulique", "aeraulique", "ventilation", "diametre", "diamètre", "rectangulaire", "circulaire", "section", "isolation", "calorifuge"]
  },
  {
    id: "debit-air-gaine",
    category: "aeraulique",
    title: "Debit d'air dans gaine",
    status: "ready",
    calculator: "ductFlow",
    source: ["Aéraulique/DEBIT D'AIR DANS GAINE"],
    description: "Debit d'air en fonction du diametre de gaine circulaire et de la vitesse d'air.",
    keywords: ["débit air", "debit air", "gaine", "ventilation", "vitesse", "diametre", "diamètre", "m3/h", "l/s", "circulaire", "rectangulaire", "aéraulique", "aeraulique"]
  },
  {
    id: "pdc-air",
    category: "aeraulique",
    title: "Pertes de charge air",
    status: "ready",
    calculator: "ductPressure",
    source: ["Réseau Aéraulique/Tableur aeraulique vierge", "Réseau Aéraulique/Réseau aéraulique_model_V01"],
    description: "Calcul par troncons: vitesse, diametre equivalent, j, jL, singularites et perte totale.",
    keywords: ["perte de charge", "pdc", "pression", "gaine", "air", "aéraulique", "aeraulique", "tronçon", "troncon", "singularité", "singularite", "rugosité", "rugosite", "ventilation"]
  },
  {
    id: "alimentation-ef-simple",
    category: "plomberie",
    title: "Alimentation EF simple",
    status: "ready",
    calculator: "ddv",
    source: ["DIM ALIM EF", "Programmes/Chaufferie/Calcul pratique Fluides"],
    description: "Dimensionnement rapide d'une alimentation d'eau froide par debit, vitesse et diametre de tube.",
    keywords: ["plomberie", "alimentation", "ef", "eau froide", "débit", "debit", "diametre", "diamètre", "vitesse", "per", "acier", "cuivre", "tube", "simple", "dimensionnement"]
  },
  {
    id: "plomberie-debits",
    category: "plomberie",
    title: "Debit probable EF/ECS complet",
    status: "ready",
    calculator: "plumbing",
    source: ["Programmes/Divers/150106 Calcul débit Pb EF-EC- NEW", "Calcul débit Pb EF-EC- NEW"],
    description: "Calcul complet des debits probables EF/ECS avec appareils sanitaires et coefficient de simultaneite.",
    keywords: ["plomberie", "sanitaire", "ef", "ec", "ecs", "eau froide", "eau chaude", "débit probable", "debit probable", "simultanéité", "simultaneite", "wc", "lavabo", "douche", "baignoire", "complet"]
  },
  {
    id: "evacuations",
    category: "plomberie",
    title: "Evacuations EU/EV/EP",
    status: "ready",
    calculator: "sanitaryEvac",
    source: ["Calcul débit évacuations DTU60"],
    description: "Predimensionnement des evacuations sanitaires: appareils EU/EV, debit probable, diametre de chute, collecteur et descente EP.",
    keywords: ["évacuation", "evacuation", "eu", "ev", "ep", "eaux usées", "eaux usees", "eaux vannes", "eaux pluviales", "wc", "chute", "collecteur", "pente", "diametre", "diamètre", "dtu 60.11"]
  },
  {
    id: "psychro",
    category: "thermique",
    title: "Psychrometrie air humide",
    status: "ready",
    calculator: "psychro",
    source: ["Programmes/PsychrometricPr", "Programmes/Divers/Psychro annexe"],
    description: "Humidite specifique, point de rosee, enthalpie et masse volumique approchee.",
    keywords: ["psychrométrie", "psychrometrie", "air humide", "humidité", "humidite", "point de rosée", "point de rosee", "enthalpie", "masse volumique", "température", "temperature", "hygrométrie", "hygrometrie"]
  },
  {
    id: "deperditions",
    category: "thermique",
    title: "Deperditions et bilan chaud/froid",
    status: "ready",
    calculator: "thermal",
    source: ["Déperdition et froid/Déperdition", "Calculs thermiques/Bilan thermique simplifié"],
    description: "Estimation simplifiee des besoins chaud et froid d'un local avec apports internes, air neuf, vitrages et transmission thermique.",
    keywords: ["déperdition", "deperdition", "bilan thermique", "chauffage", "froid", "paroi", "mur", "toiture", "fenêtre", "fenetre", "coefficient u", "isolation", "puissance"]
  },
  {
    id: "vmc-hygro",
    category: "ventilation",
    title: "VMC hygro collectif",
    status: "backlog",
    calculator: "duct",
    source: ["Ventilation/Dimensionnement hygro", "Ventilation/Rapid_ MI-2.16"],
    description: "A migrer apres validation des bouches, colonnes et avis techniques sources.",
    keywords: ["vmc", "hygro", "hygroréglable", "hygroreglable", "ventilation", "bouche", "colonne", "logement", "extraction", "air", "débit", "debit"]
  },
  {
    id: "desenfumage",
    category: "ventilation",
    title: "Desenfumage",
    status: "ready",
    calculator: "smoke",
    source: ["Désenfumage/Débit de désenfumage", "Désenfumage/Débit désenfumage"],
    description: "Calcul des debits d'extraction et de compensation par zone, avec nombre de bouches, debit unitaire et sections indicatives.",
    keywords: ["désenfumage", "desenfumage", "fumée", "fumee", "sécurité incendie", "securite incendie", "débit", "debit", "surface utile", "extraction", "amenée air", "amenee air", "compensation", "bouche", "zf"]
  },
  {
    id: "gaz",
    category: "fluides",
    title: "Debit gaz et puissance",
    status: "ready",
    calculator: "gas",
    source: ["Programmes/Chaufferie/calcul gaz coll", "Gaz/Détermination tuyauterie gaz"],
    description: "Conversion puissance, PCI, rendement et debit gaz de reference.",
    keywords: ["gaz", "débit gaz", "debit gaz", "puissance", "pci", "pcs", "rendement", "chaudière", "chaudiere", "brûleur", "bruleur", "m3/h"]
  },
  {
    id: "vapeur",
    category: "fluides",
    title: "Vapeur saturee",
    status: "backlog",
    calculator: "gas",
    source: ["Programmes/TechVapor/TechVaporFR", "Vapeur/Détermination tuyauterie Vapeur"],
    description: "Tables vapeur et dimensionnement a migrer depuis TechVapor.",
    keywords: ["vapeur", "saturée", "saturee", "pression", "température", "temperature", "condensat", "tuyauterie", "dimensionnement", "débit", "debit", "techvapor"]
  },
  {
    id: "air-comprime",
    category: "fluides",
    title: "Tuyauterie air comprime",
    status: "ready",
    calculator: "compressedAir",
    source: ["Air Comprimé/Détermination tuyauterie air comprimé", "Programmes/PdcAirComprimé/Biblio air comprimé"],
    description: "Diametre conseille, longueur equivalente, vitesse et perte de pression reelle.",
    keywords: ["air comprimé", "air comprime", "compresseur", "pression", "bar", "perte", "diametre", "diamètre", "tuyauterie", "longueur équivalente", "longueur equivalente", "débit", "debit"]
  },
  {
    id: "calorifuge",
    category: "quantitatifs",
    title: "Surface de calorifuge",
    status: "ready",
    calculator: "insulation",
    source: ["Calorifuge/CALORIFUGE", "Surface tuyauteries/Calcul surface"],
    description: "Surface au metre lineaire, accessoires et quantitatif d'isolant.",
    keywords: ["calorifuge", "isolation", "isolant", "surface", "m2", "mètre linéaire", "metre lineaire", "tuyauterie", "tube", "épaisseur", "epaisseur", "vanne", "pompe"]
  },
  {
    id: "poids-gaine",
    category: "quantitatifs",
    title: "Poids de gaine et metrer",
    status: "ready",
    calculator: "ductWeight",
    source: ["/Feuilles de calcul/Poids gaine rectangulaire"],
    description: "Poids de gaine rectangulaire, surfaces de calorifuge et flocage avec majoration.",
    keywords: ["poids", "gaine", "métré", "metre", "métrage", "metrage", "rectangulaire", "circulaire", "calorifuge", "flocage", "surface", "kg", "quantitatif", "ventilation"]
  },
  {
    id: "conversions-unites",
    category: "utilitaires",
    title: "Conversions d'unites",
    status: "ready",
    calculator: "conversion",
    source: ["Conversions/tableau de conversion", "Convertisseur", "Programmes/Chaufferie/conversion"],
    description: "Convertisseur transverse: longueurs, surfaces, volumes, masses, pressions, energies, puissances, angles et temperatures.",
    keywords: ["conversion", "convertisseur", "unité", "unite", "longueur", "surface", "volume", "masse", "pression", "énergie", "energie", "puissance", "température", "temperature", "angle", "bar", "pa", "kw", "m3", "m2"]
  },
  {
    id: "bibliotheque",
    category: "bibliotheque",
    title: "Catalogue des fichiers Excel",
    status: "draft",
    calculator: "library",
    source: ["Dossier Soft etude JM"],
    description: "Index vivant des classeurs: outils generiques, notes de calcul, fabricants et archives projet.",
    keywords: ["bibliothèque", "bibliotheque", "catalogue", "excel", "sources", "classeur", "archive", "notes de calcul", "référentiel", "referentiel", "dtu", "normes"]
  }
];

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
  library: { label: "Bibliotheque", render: renderLibrary }
};

const pipeTables = {
  acier: [
    { ref: "DN15 - 17.2 x 2", d: 13.2 },
    { ref: "DN20 - 21.3 x 2.3", d: 16.7 },
    { ref: "DN25 - 26.9 x 2.3", d: 22.3 },
    { ref: "DN32 - 33.7 x 2.9", d: 27.9 },
    { ref: "DN40 - 42.4 x 2.9", d: 36.6 },
    { ref: "DN50 - 60.3 x 3.2", d: 53.9 },
    { ref: "DN65 - 76.1 x 3.2", d: 69.7 },
    { ref: "DN80 - 88.9 x 3.2", d: 82.5 },
    { ref: "DN100 - 114.3 x 3.6", d: 107.1 }
  ],
  cuivre: [
    { ref: "Cu 12/14", d: 12 },
    { ref: "Cu 14/16", d: 14 },
    { ref: "Cu 16/18", d: 16 },
    { ref: "Cu 20/22", d: 20 },
    { ref: "Cu 26/28", d: 26 },
    { ref: "Cu 32/35", d: 32 },
    { ref: "Cu 40/42", d: 40 },
    { ref: "Cu 50/52", d: 50 },
    { ref: "Cu 60/64", d: 60 }
  ],
  per: [
    { ref: "PER 12 x 1.1", d: 9.8 },
    { ref: "PER 16 x 1.5", d: 13 },
    { ref: "PER 20 x 1.9", d: 16.2 },
    { ref: "PER 25 x 2.3", d: 20.4 },
    { ref: "PER 32 x 2.9", d: 26.2 },
    { ref: "PER 40 x 3.7", d: 32.6 },
    { ref: "PER 50 x 4.6", d: 40.8 },
    { ref: "PER 63 x 5.8", d: 51.4 }
  ]
};

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

const compressedAirPipes = [
  { nominal: 15, retained: 20, outer: 21.3, thickness: 2.6, inner: 16.1, inch: '1/2"' },
  { nominal: 20, retained: 25, outer: 26.9, thickness: 2.6, inner: 21.7, inch: '3/4"' },
  { nominal: 25, retained: 32, outer: 33.7, thickness: 3.2, inner: 27.3, inch: '1"' },
  { nominal: 32, retained: 40, outer: 42.4, thickness: 3.2, inner: 36, inch: '1 1/4"' },
  { nominal: 40, retained: 50, outer: 48.3, thickness: 3.2, inner: 41.9, inch: '1 1/2"' },
  { nominal: 50, retained: 65, outer: 60.3, thickness: 3.6, inner: 53.1, inch: '2"' },
  { nominal: 65, retained: 85, outer: 76.1, thickness: 3.6, inner: 68.9, inch: '2 1/2"' },
  { nominal: 80, retained: 100, outer: 88.9, thickness: 4, inner: 80.9, inch: '3"' },
  { nominal: 100, retained: 125, outer: 114.3, thickness: 4.5, inner: 105.3, inch: '4"' },
  { nominal: 125, retained: 150, outer: 139.7, thickness: 4.5, inner: 130.7, inch: '5"' },
  { nominal: 150, retained: 200, outer: 168.3, thickness: 4.5, inner: 159.3, inch: '6"' },
  { nominal: 200, retained: 250, outer: 219.1, thickness: 6.3, inner: 206.5, inch: '8"' },
  { nominal: 250, retained: 300, outer: 273, thickness: 6.3, inner: 260.4, inch: '10"' }
];

const compressedAirEquivalentLengths = {
  20: { globe: 0.6, tee: 0.5, elbow: 0.6, longElbow: 0.6, valve: 0.3 },
  25: { globe: 0.6, tee: 0.6, elbow: 0.5, longElbow: 0.3, valve: 0.3 },
  32: { globe: 0.9, tee: 0.75, elbow: 0.55, longElbow: 0.4, valve: 0.4 },
  40: { globe: 1.2, tee: 0.9, elbow: 0.6, longElbow: 0.5, valve: 0.5 },
  50: { globe: 2, tee: 1.5, elbow: 0.7, longElbow: 0.6, valve: 0.85 },
  65: { globe: 2.5, tee: 2, elbow: 0.9, longElbow: 0.7, valve: 1.1 },
  85: { globe: 4.3788, tee: 3.0909, elbow: 1.2364, longElbow: 0.9788, valve: 1.9576 },
  100: { globe: 6, tee: 4, elbow: 1.5, longElbow: 1.2, valve: 2.7 },
  125: { globe: 8.5, tee: 5.5, elbow: 1.8, longElbow: 1.5, valve: 4 },
  150: { globe: 11, tee: 7, elbow: 2.1, longElbow: 1.8, valve: 5 },
  200: { globe: 16, tee: 10, elbow: 2.7, longElbow: 2.5, valve: 7 },
  250: { globe: 21, tee: 15, elbow: 3.4, longElbow: 3, valve: 9 },
  300: { globe: 21, tee: 15, elbow: 3.4, longElbow: 3, valve: 9 }
};

const conversionGroups = {
  length: {
    label: "Distances",
    base: "m",
    units: [
      { id: "m", label: "metre (m)", factor: 1 },
      { id: "km", label: "kilometre (km)", factor: 1000 },
      { id: "cm", label: "centimetre (cm)", factor: 0.01 },
      { id: "mm", label: "millimetre (mm)", factor: 0.001 },
      { id: "in", label: "pouce (in)", factor: 0.0254 },
      { id: "ft", label: "pied (ft)", factor: 0.3048 },
      { id: "yd", label: "yard (yd)", factor: 0.9144 },
      { id: "mile", label: "mile terrestre", factor: 1609.347 },
      { id: "nmi", label: "mile nautique international", factor: 1851.99 },
      { id: "nmi_uk", label: "mile nautique anglais", factor: 1853.19 },
      { id: "ua", label: "unite astronomique", factor: 1.496e11 },
      { id: "al", label: "annee lumiere", factor: 9.461e15 },
      { id: "ang", label: "angstrom", factor: 1e-10 }
    ]
  },
  area: {
    label: "Surfaces",
    base: "m2",
    units: [
      { id: "m2", label: "metre carre (m2)", factor: 1 },
      { id: "km2", label: "kilometre carre (km2)", factor: 1e6 },
      { id: "cm2", label: "centimetre carre (cm2)", factor: 0.0001 },
      { id: "ha", label: "hectare (ha)", factor: 10000 },
      { id: "are", label: "are (a)", factor: 100 },
      { id: "acre", label: "acre", factor: 4046.86 },
      { id: "mile2", label: "mile carre", factor: 2.59e6 },
      { id: "yd2", label: "yard carre", factor: 0.8361 },
      { id: "ft2", label: "pied carre", factor: 0.0929 },
      { id: "in2", label: "pouce carre", factor: 0.00064516 },
      { id: "barn", label: "barn", factor: 1e-28 }
    ]
  },
  volume: {
    label: "Volumes",
    base: "m3",
    units: [
      { id: "m3", label: "metre cube (m3)", factor: 1 },
      { id: "l", label: "litre", factor: 0.001 },
      { id: "dm3", label: "decimetre cube (dm3)", factor: 0.001 },
      { id: "cm3", label: "centimetre cube (cm3)", factor: 1e-6 },
      { id: "tonneau_mer", label: "tonneau de mer", factor: 1.44 },
      { id: "tonneau_jauge", label: "tonneau de jauge", factor: 2.832 },
      { id: "usgal", label: "gallon US", factor: 0.003785 },
      { id: "ukgal", label: "gallon UK", factor: 0.004546 },
      { id: "usbbl", label: "baril US", factor: 0.159 },
      { id: "ukbbl", label: "baril UK", factor: 0.164 },
      { id: "cuyd", label: "yard cube", factor: 0.765 },
      { id: "cuft", label: "pied cube", factor: 0.02833 },
      { id: "cuin", label: "pouce cube", factor: 0.00001639 },
      { id: "uspint", label: "pinte US", factor: 0.000473 },
      { id: "ukpint", label: "pinte UK", factor: 0.000568 },
      { id: "usbushel", label: "bushel US", factor: 0.03524 },
      { id: "ukbushel", label: "bushel UK", factor: 0.03636 }
    ]
  },
  mass: {
    label: "Masses",
    base: "kg",
    units: [
      { id: "kg", label: "kilogramme (kg)", factor: 1 },
      { id: "t", label: "tonne", factor: 1000 },
      { id: "g", label: "gramme (g)", factor: 0.001 },
      { id: "mg", label: "milligramme (mg)", factor: 0.000001 },
      { id: "longton", label: "long ton", factor: 1016.05 },
      { id: "shortton", label: "short ton", factor: 907.2 },
      { id: "lb", label: "livre US", factor: 0.4536 },
      { id: "oz", label: "once US", factor: 0.02835 },
      { id: "grain", label: "grain", factor: 0.00006481 },
      { id: "quintal", label: "quintal", factor: 100 },
      { id: "carat", label: "carat", factor: 0.0002 },
      { id: "u", label: "unite masse atomique", factor: 1.66053e-27 }
    ]
  },
  pressure: {
    label: "Pressions",
    base: "Pa",
    units: [
      { id: "pa", label: "pascal (Pa)", factor: 1 },
      { id: "kpa", label: "kilopascal (kPa)", factor: 1000 },
      { id: "bar", label: "bar", factor: 100000 },
      { id: "mbar", label: "millibar (mbar)", factor: 100 },
      { id: "atm", label: "atmosphere (atm)", factor: 101325 },
      { id: "mmhg", label: "mm Hg / torr", factor: 133.3 },
      { id: "mmce", label: "mmCE", factor: 9.80665 },
      { id: "mce", label: "mCE", factor: 9806.65 }
    ]
  },
  energy: {
    label: "Energies",
    base: "J",
    units: [
      { id: "j", label: "joule (J)", factor: 1 },
      { id: "kj", label: "kilojoule (kJ)", factor: 1000 },
      { id: "erg", label: "erg", factor: 1e-7 },
      { id: "cal", label: "calorie thermochimique", factor: 4.184 },
      { id: "calit", label: "calorie IT", factor: 4.1868 },
      { id: "kcal", label: "kilocalorie", factor: 4184 },
      { id: "wh", label: "wattheure (Wh)", factor: 3600 },
      { id: "kwh", label: "kilowattheure (kWh)", factor: 3.6e6 },
      { id: "th", label: "thermie", factor: 4.18e6 },
      { id: "cvh", label: "chevalheure", factor: 2.648e6 },
      { id: "btu", label: "BTU", factor: 1055 },
      { id: "ev", label: "electronvolt", factor: 1.602e-19 },
      { id: "frigorie", label: "frigorie", factor: 4180 }
    ]
  },
  power: {
    label: "Puissances",
    base: "W",
    units: [
      { id: "w", label: "watt (W)", factor: 1 },
      { id: "kw", label: "kilowatt (kW)", factor: 1000 },
      { id: "cv", label: "cheval-vapeur (cv)", factor: 735.5 },
      { id: "frigh", label: "frigorie par heure", factor: 1.161 },
      { id: "kcalh", label: "kcal/h", factor: 1.163 },
      { id: "btuh", label: "BTU/h", factor: 0.293071 }
    ]
  },
  angle: {
    label: "Angles",
    base: "degre",
    units: [
      { id: "deg", label: "degre", factor: 1 },
      { id: "rad", label: "radian", factor: 180 / Math.PI },
      { id: "grad", label: "grade", factor: 0.9 },
      { id: "min", label: "minute", factor: 1 / 60 },
      { id: "sec", label: "seconde", factor: 1 / 3600 }
    ]
  },
  temperature: {
    label: "Temperatures",
    base: "C",
    units: [
      { id: "c", label: "Celsius (deg C)" },
      { id: "f", label: "Fahrenheit (deg F)" },
      { id: "k", label: "Kelvin (K)" }
    ]
  }
};

const conversionReferences = [
  ["Distances", "1 in = 25,4 mm", "1 mile nautique UK = 1,85319 km", "1 mile = 1,609347 km"],
  ["Surfaces", "1 ha = 10 000 m2", "1 acre = 0,404686 ha", "1 sq ft = 0,0929 m2"],
  ["Volumes", "1 litre = 1e-3 m3", "1 tonneau de mer = 1,44 m3", "1 tonneau de jauge = 2,832 m3"],
  ["Masses", "1 pound = 0,4536 kg", "1 ounce = 28,35 g", "1 quintal = 100 kg"],
  ["Energies", "1 kWh = 3,6e6 J", "1 BTU = 1,055e3 J", "1 kcal = 4184 J"],
  ["Pressions", "1 atm = 1,01325 bar", "1 mm Hg = 133,3 Pa", "1 Pa = 1e-5 bar"],
  ["Puissances", "1 cv = 735,5 W", "1 frigorie/h = 1,161 W", "1 kcal/h = 1,163 W"],
  ["Temperatures", "deg F = 1,8 x deg C + 32", "K = deg C + 273,15", ""]
];

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

const smokeZones = [
  { repere: "Zone 1", surface: 100, enabled: true },
  { repere: "Zone 2", surface: 0, enabled: false },
  { repere: "Zone 3", surface: 0, enabled: false },
  { repere: "Zone 4", surface: 0, enabled: false }
];

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

const state = {
  category: "overview",
  query: "",
  selectedModule: modules[0].id,
  currentCalculator: "ddv",
  report: []
};

const $ = (selector) => document.querySelector(selector);
const fmt = (value, digits = 2) => Number.isFinite(value) ? value.toLocaleString("fr-FR", { maximumFractionDigits: digits }) : "-";
const mm = (value) => `${fmt(value, 1)} mm`;
const m3h = (value) => `${fmt(value, 2)} m3/h`;
const lps = (value) => `${fmt(value, 3)} l/s`;

function init() {
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
          <span>${item.label}</span>
          <strong>${item.value}</strong>
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

function runCurrentCalculator() {
  const runners = {
    ddv: calculateDdv,
    hydraulic: calculateHydraulic,
    pump: calculatePump,
    vessel: calculateVessel,
    duct: calculateDuct,
    ductFlow: calculateDuctFlow,
    ductPressure: calculateDuctPressure,
    plumbing: calculatePlumbing,
    sanitaryEvac: calculateSanitaryEvac,
    psychro: calculatePsychro,
    thermal: calculateThermal,
    gas: calculateGas,
    compressedAir: calculateCompressedAir,
    insulation: calculateInsulation,
    ductWeight: calculateDuctWeight,
    smoke: calculateSmoke,
    conversion: calculateConversion,
    library: calculateLibrary
  };

  runners[state.currentCalculator]?.();
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

  // (Suppression de l'appel à renderDdvPipeTable(material);)
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
  return pipeTables[material].find((pipe) => pipe.d >= minDiameter) || pipeTables[material].at(-1);
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
      ${field("vesVolume", "Volume installation", "1200", "l")}
      ${field("vesTemp", "Temperature max", "80", "deg C")}
      ${field("vesHeight", "Hauteur statique", "12", "m")}
      ${field("vesValve", "Soupape", "3", "bar")}
      ${field("vesReserve", "Marge minimale", "0.3", "bar")}
      ${field("vesSafety", "Coefficient securite", "1.1")}
    </div>
    <div id="calcResults"></div>
  `);
}

function calculateVessel() {
  const volume = value("vesVolume");
  const temp = value("vesTemp");
  const height = value("vesHeight");
  const valve = value("vesValve");
  const reserve = value("vesReserve");
  const safety = value("vesSafety");
  const expansion = expansionCoefficient(temp);
  const vd = volume * expansion;
  const p0 = Math.max(height / 10 + reserve, 0.8);
  const pMax = Math.max(valve - 0.5, p0 + 0.4);
  const efficiency = 1 - ((p0 + 1) / (pMax + 1));
  const capacity = vd / efficiency * safety;
  setResults([
    { label: "Coefficient dilatation", value: fmt(expansion, 4) },
    { label: "Volume dilate", value: `${fmt(vd, 1)} l` },
    { label: "Pression gonflage mini", value: `${fmt(p0, 2)} bar` },
    { label: "Pression finale retenue", value: `${fmt(pMax, 2)} bar` },
    { label: "Rendement vase", value: `${fmt(efficiency * 100, 1)} %` },
    { label: "Capacite mini", value: `${fmt(capacity, 0)} l` }
  ], "Vase d'expansion chauffage");
}

function expansionCoefficient(temp) {
  const table = [
    [20, 0],
    [40, 0.0078],
    [50, 0.0121],
    [60, 0.0171],
    [70, 0.0228],
    [80, 0.029],
    [90, 0.0359],
    [100, 0.0434]
  ];
  if (temp <= 20) return 0;
  for (let i = 1; i < table.length; i += 1) {
    const [t2, e2] = table[i];
    const [t1, e1] = table[i - 1];
    if (temp <= t2) return e1 + ((temp - t1) / (t2 - t1)) * (e2 - e1);
  }
  return table.at(-1)[1];
}

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

function calculateDuct() {
  const flow = value("ductFlow") / 3600;
  const velocity = value("ductVelocity");
  const height = value("ductHeight") / 1000;
  const length = value("ductLength");
  const coef = value("ductCoef");
  const insulation = value("ductInsulation") / 1000;
  const area = flow / velocity;
  const diameter = Math.sqrt((4 * area) / Math.PI);
  const width = area / height;
  const circSurface = Math.PI * (diameter + 2 * insulation) * length * coef;
  const rectSurface = 2 * (height + width + 4 * insulation) * length * coef;
  setResults([
    { label: "Section utile", value: `${fmt(area, 3)} m2` },
    { label: "Diametre circulaire", value: mm(diameter * 1000) },
    { label: "Largeur rectangulaire", value: mm(width * 1000) },
    { label: "Format rectangulaire", value: `${fmt(value("ductHeight"), 0)} x ${fmt(width * 1000, 0)} mm` },
    { label: "Surface iso circulaire", value: `${fmt(circSurface, 1)} m2` },
    { label: "Surface iso rectangulaire", value: `${fmt(rectSurface, 1)} m2` }
  ], "Gaine aeraulique");
}

function renderDuctFlow() {
  const diameters = [125, 160, 200, 250, 315, 355, 400, 450, 500, 560, 630, 710];
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
      ${diameters.map((diameter) => {
        const section = Math.PI * Math.pow(diameter / 1000, 2) / 4;
        const flows = [4, 5, 6, 8, 10, 12].map((velocity) => fmt(section * velocity * 3600, 0));
        return `
          <span>${diameter} mm</span>
          ${flows.map((flow) => `<span>${flow}</span>`).join("")}
        `;
      }).join("")}
    </div>
  `, "Le tableau rapide reproduit les debits m3/h pour les diametres standards.");
}

function calculateDuctFlow() {
  const diameter = value("ductFlowDiameter");
  const velocity = value("ductFlowVelocity");
  const width = value("ductFlowWidth") / 1000;
  const height = value("ductFlowHeight") / 1000;
  const circularSection = Math.PI * Math.pow(diameter / 1000, 2) / 4;
  const circularFlow = circularSection * velocity * 3600;
  const rectangularSection = width * height;
  const rectangularFlow = rectangularSection * velocity * 3600;

  setResults([
    { label: "Section circulaire", value: `${fmt(circularSection, 5)} m2` },
    { label: "Debit circulaire", value: `${fmt(circularFlow, 0)} m3/h` },
    { label: "Debit circulaire", value: `${fmt(circularFlow / 3600 * 1000, 2)} l/s` },
    { label: "Diametre retenu", value: mm(diameter) },
    { label: "Section rectangulaire", value: `${fmt(rectangularSection, 3)} m2` },
    { label: "Debit rectangulaire", value: `${fmt(rectangularFlow, 0)} m3/h` }
  ], "Debit d'air dans gaine");
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

function calculateDuctPressure() {
  const air = moistAir(value("pdcTemp"), value("pdcHumidity"), value("pdcPressure"));
  const material = ductPressureMaterials.find((item) => item.value === selectValue("pdcMaterial")) || ductPressureMaterials[0];
  const roughnessM = material.roughness / 1000;
  const rows = [];

  ductPressureRows.forEach((_, index) => {
    const flow = value(`pdcFlow${index}`);
    const length = value(`pdcLength${index}`);
    if (flow <= 0 || length < 0) return;

    const shape = selectValue(`pdcShape${index}`);
    const diameter = value(`pdcDiameter${index}`) / 1000;
    const width = value(`pdcWidth${index}`) / 1000;
    const height = value(`pdcHeight${index}`) / 1000;
    const fixed = value(`pdcFixed${index}`);
    const zeta = value(`pdcZeta${index}`);
    const q = flow / 3600;
    const area = shape === "round" ? Math.PI * Math.pow(diameter, 2) / 4 : width * height;
    if (area <= 0) return;

    const velocity = q / area;
    const equivalentDiameter = shape === "round" ? diameter : equivalentRoundDuct(width, height);
    const reynolds = air.density * velocity * equivalentDiameter / air.viscosity;
    const lambda = frictionFactor(reynolds, roughnessM, equivalentDiameter);
    const dynamicPressure = air.density * Math.pow(velocity, 2) / 2;
    const j = lambda * dynamicPressure / equivalentDiameter;
    const linear = j * length;
    const singular = zeta * dynamicPressure;
    const total = linear + fixed + singular;

    rows.push({
      index: index + 1,
      flow,
      length,
      shape,
      velocity,
      equivalentDiameter,
      reynolds,
      lambda,
      dynamicPressure,
      j,
      linear,
      fixed,
      zeta,
      singular,
      total
    });
  });

  const totals = rows.reduce((acc, row) => {
    acc.length += row.length;
    acc.linear += row.linear;
    acc.fixed += row.fixed;
    acc.singular += row.singular;
    acc.total += row.total;
    acc.maxVelocity = Math.max(acc.maxVelocity, row.velocity);
    acc.maxJ = Math.max(acc.maxJ, row.j);
    return acc;
  }, { length: 0, linear: 0, fixed: 0, singular: 0, total: 0, maxVelocity: 0, maxJ: 0 });

  const output = document.getElementById("pdcRowsOutput");
  if (output) output.innerHTML = renderDuctPressureRows(rows);

  setResults([
    { label: "PDC totale reseau", value: `${fmt(totals.total, 1)} Pa` },
    { label: "PDC lineaire jL", value: `${fmt(totals.linear, 1)} Pa` },
    { label: "PDC ponctuelle fixe", value: `${fmt(totals.fixed, 1)} Pa` },
    { label: "PDC singuliere d rv2/2", value: `${fmt(totals.singular, 1)} Pa` },
    { label: "Longueur totale", value: `${fmt(totals.length, 1)} m` },
    { label: "Vitesse max", value: `${fmt(totals.maxVelocity, 2)} m/s` },
    { label: "j max", value: `${fmt(totals.maxJ, 3)} Pa/m` },
    { label: "Air / rugosite", value: `${fmt(air.density, 3)} kg/m3 / ${fmt(material.roughness, 3)} mm` }
  ], "Pertes de charge air");
}

function renderDuctPressureRows(rows) {
  if (!rows.length) {
    return `<div class="empty-state">Saisir au moins un troncon avec debit et longueur.</div>`;
  }

  return `
    <div class="result-table">
      <div class="result-head">Rep.</div>
      <div class="result-head">v</div>
      <div class="result-head">D eq.</div>
      <div class="result-head">Re</div>
      <div class="result-head">lambda</div>
      <div class="result-head">j</div>
      <div class="result-head">jL</div>
      <div class="result-head">dyn.</div>
      <div class="result-head">sing.</div>
      <div class="result-head">total</div>
      ${rows.map((row) => `
        <strong>T${row.index}</strong>
        <span>${fmt(row.velocity, 2)} m/s</span>
        <span>${fmt(row.equivalentDiameter * 1000, 0)} mm</span>
        <span>${fmt(row.reynolds, 0)}</span>
        <span>${fmt(row.lambda, 4)}</span>
        <span>${fmt(row.j, 3)}</span>
        <span>${fmt(row.linear, 1)}</span>
        <span>${fmt(row.dynamicPressure, 1)}</span>
        <span>${fmt(row.singular, 1)}</span>
        <strong>${fmt(row.total, 1)} Pa</strong>
      `).join("")}
    </div>
  `;
}

function moistAir(tempC, humidityGKg, pressureKPa) {
  const t = tempC + 273.15;
  const w = Math.max(humidityGKg, 0) / 1000;
  const pressure = pressureKPa * 1000;
  const specificVolume = 287.05 * t * (1 + 1.6078 * w) / pressure;
  const density = 1 / specificVolume;
  const viscosity = 1.716e-5 * Math.pow(t / 273.15, 1.5) * ((273.15 + 110.4) / (t + 110.4));
  return { density, viscosity, specificVolume };
}

function equivalentRoundDuct(widthM, heightM) {
  if (widthM <= 0 || heightM <= 0) return 0;
  return 1.3 * Math.pow(widthM * heightM, 0.625) / Math.pow(widthM + heightM, 0.25);
}

function frictionFactor(reynolds, roughnessM, diameterM) {
  if (!Number.isFinite(reynolds) || reynolds <= 0 || diameterM <= 0) return 0;
  if (reynolds < 2300) return 64 / reynolds;
  const relativeRoughness = roughnessM / diameterM;
  const term = Math.pow(relativeRoughness / 3.7, 1.11) + 6.9 / reynolds;
  return Math.pow(-1.8 * Math.log10(term), -2);
}

function calculateDebitProbable(inputs = {}, luxeLevel = 1) {
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
  const coeffSimulSanit = countSanit >= 3 ? 0.8 * kLuxeFactor / Math.sqrt(countSanit - 1) : 1;
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

  const debit = calculateDebitProbable(inputs, Number(selectValue("plumbLuxe") || 1));
  const probable = debit.debitTotal;
  const velocity = value("plumbVelocity");
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
    { label: "Debit probable sanitaires", value: lps(debit.debitSanit) },
    { label: "WC robinet de chasse", value: `${fmt(debit.wcCount, 0)} appareil(s) / ${fmt(debit.wcGroup, 0)} groupe(s)` },
    { label: "Debit WC robinet", value: lps(debit.debitWC) },
    { label: "Debit probable total", value: lps(probable) },
    { label: "Diametre theorique", value: mm(theoreticalDiameter) },
    { label: "Reference proposee", value: selected ? selected.ref : "hors table" },
    { label: "Vitesse reelle", value: `${fmt(realVelocity, 2)} m/s` }
  ], "Debit probable plomberie");
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

function calculateGas() {
  const power = value("gasPower");
  const pci = value("gasPci");
  const efficiency = value("gasEfficiency") / 100;
  const diversity = value("gasDiversity");
  const absorbed = power / efficiency;
  const flow = absorbed / pci * diversity;
  setResults([
    { label: "Puissance absorbee", value: `${fmt(absorbed, 1)} kW` },
    { label: "Debit gaz", value: `${fmt(flow, 2)} m3/h` },
    { label: "Debit gaz", value: `${fmt(flow * 1000 / 3600, 2)} l/s` },
    { label: "Energie horaire", value: `${fmt(flow * pci, 1)} kWh/h` }
  ], "Debit gaz");
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

function calculateCompressedAir() {
  const flow = value("airFlow");
  const temp = value("airTemp");
  const pressureEff = value("airPressureEff");
  const pressureMin = value("airPressureMin");
  const pressureAbs = pressureEff + 1.013;
  const admissibleLoss = Math.max(pressureEff - pressureMin, 0.001);
  const selected = compressedAirPipes.find((pipe) => pipe.nominal === Number(selectValue("airPipe"))) || compressedAirPipes[0];
  const equivalents = compressedAirEquivalentLengths[selected.retained] || compressedAirEquivalentLengths[20];
  const accessoryLength =
    value("airLongElbows") * equivalents.longElbow +
    value("airElbows") * equivalents.elbow +
    value("airTees") * equivalents.tee +
    value("airValves") * equivalents.valve +
    value("airGlobes") * equivalents.globe;
  const equivalentLength = value("airLength") + accessoryLength;
  const diameterTheory = compressedAirTheoreticalDiameter(flow, equivalentLength, pressureAbs, admissibleLoss);
  const recommended = compressedAirPipes.find((pipe) => pipe.inner >= diameterTheory) || compressedAirPipes.at(-1);
  const realLoss = compressedAirPressureLoss(flow, equivalentLength, pressureAbs, selected.inner);
  const realLossRecommended = compressedAirPressureLoss(flow, equivalentLength, pressureAbs, recommended.inner);
  const density = compressedAirDensity(pressureAbs, temp);
  const actualFlowM3h = flow * (1.013 / pressureAbs) * ((temp + 273.15) / 293.15);
  const velocity = actualFlowM3h / 3600 / (Math.PI * Math.pow(selected.inner / 1000, 2) / 4);
  const status = realLoss <= admissibleLoss ? "OK" : "A augmenter";
  const output = document.getElementById("airPipeOutput");
  if (output) output.innerHTML = renderCompressedAirPipeOutput(selected, recommended, equivalents);

  setResults([
    { label: "Diametre theorique", value: mm(diameterTheory) },
    { label: "Diametre conseille", value: `DN${recommended.nominal} / Ø ${recommended.retained}` },
    { label: "Diametre retenu", value: `DN${selected.nominal} / int. ${fmt(selected.inner, 1)} mm` },
    { label: "Longueur equivalente", value: `${fmt(equivalentLength, 1)} m` },
    { label: "Dont accessoires", value: `${fmt(accessoryLength, 1)} m` },
    { label: "Perte admissible", value: `${fmt(admissibleLoss, 3)} bar` },
    { label: "Perte reelle retenue", value: `${fmt(realLoss, 3)} bar` },
    { label: "Perte avec diam. conseille", value: `${fmt(realLossRecommended, 3)} bar` },
    { label: "Vitesse estimee", value: `${fmt(velocity, 2)} m/s` },
    { label: "Controle", value: status },
    { label: "Pression absolue", value: `${fmt(pressureAbs, 3)} bar` },
    { label: "Masse volumique", value: `${fmt(density, 2)} kg/m3` }
  ], "Tuyauterie air comprime");
}

function compressedAirTheoreticalDiameter(flowM3h, lengthM, pressureAbsBar, lossBar) {
  if (flowM3h <= 0 || lengthM <= 0 || pressureAbsBar <= 0 || lossBar <= 0) return 0;
  return Math.pow(89.9 * Math.pow(flowM3h, 1.85) * lengthM / (pressureAbsBar * lossBar), 1 / 5);
}

function compressedAirPressureLoss(flowM3h, lengthM, pressureAbsBar, innerDiameterMm) {
  if (flowM3h <= 0 || lengthM <= 0 || pressureAbsBar <= 0 || innerDiameterMm <= 0) return 0;
  return 89.9 * Math.pow(flowM3h, 1.85) * lengthM / (pressureAbsBar * Math.pow(innerDiameterMm, 5));
}

function compressedAirDensity(pressureAbsBar, tempC) {
  return pressureAbsBar * 100000 / (287.05 * (tempC + 273.15));
}

function renderCompressedAirPipeOutput(selected, recommended, equivalents) {
  return `
    <div class="result-head">Tube</div>
    <div class="result-head">DN</div>
    <div class="result-head">Ø ext.</div>
    <div class="result-head">Ep.</div>
    <div class="result-head">Ø int.</div>
    <div class="result-head">Pouce</div>
    <strong>Retenu</strong>
    <span>${selected.nominal}</span>
    <span>${fmt(selected.outer, 1)}</span>
    <span>${fmt(selected.thickness, 1)}</span>
    <span>${fmt(selected.inner, 1)}</span>
    <span>${selected.inch}</span>
    <strong>Conseille</strong>
    <span>${recommended.nominal}</span>
    <span>${fmt(recommended.outer, 1)}</span>
    <span>${fmt(recommended.thickness, 1)}</span>
    <span>${fmt(recommended.inner, 1)}</span>
    <span>${recommended.inch}</span>
    <div class="result-head">Eq. accessoire</div>
    <span>Coude GR ${fmt(equivalents.longElbow, 2)} m</span>
    <span>Coude ${fmt(equivalents.elbow, 2)} m</span>
    <span>Te ${fmt(equivalents.tee, 2)} m</span>
    <span>Vanne ${fmt(equivalents.valve, 2)} m</span>
    <span>Soupape ${fmt(equivalents.globe, 2)} m</span>
  `;
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

function calculateInsulation() {
  const d = (value("insDext") + 2 * value("insThickness")) / 1000;
  const areaPerM = Math.PI * d;
  const total = areaPerM * value("insLength") * value("insCoef");
  setResults([
    { label: "Diametre exterieur isole", value: mm(d * 1000) },
    { label: "Surface par ml", value: `${fmt(areaPerM, 3)} m2/ml` },
    { label: "Longueur corrigee", value: `${fmt(value("insLength") * value("insCoef"), 1)} m` },
    { label: "Surface totale", value: `${fmt(total, 1)} m2` }
  ], "Surface de calorifuge");
}

function renderDuctWeight() {
  const defaultRows = [
    { type: "rect", width: 700, height: 400, length: 20 },
    { type: "rect", width: 400, height: 400, length: 17 },
    { type: "rect", width: 300, height: 400, length: 15 },
    { type: "rect", width: 200, height: 300, length: 10 },
    { type: "rect", width: 0, height: 0, length: 0 },
    { type: "circ", width: 250, height: 0, length: 0 }
  ];

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

function calculateDuctWeight() {
  const kgM2 = value("ductWeightKgM2");
  const caloThickness = value("ductWeightCalo");
  const flockingThickness = value("ductWeightFlocking");
  const margin = value("ductWeightMargin") / 100;
  const rows = [];

  for (let index = 0; index < 6; index += 1) {
    const type = selectValue(`ductWeightType${index}`) || "rect";
    const width = value(`ductWeightWidth${index}`);
    const height = value(`ductWeightHeight${index}`);
    const length = value(`ductWeightLength${index}`);
    if (width <= 0 || length <= 0) continue;

    let bareSurface = 0;
    let caloSurface = 0;
    let flockingSurface = 0;
    let label = "";

    if (type === "rect") {
      if (height <= 0) continue;
      bareSurface = length * 2 * ((width + height) / 1000);
      caloSurface = length * 2 * ((width + height + 4 * caloThickness) / 1000);
      flockingSurface = length * 2 * ((width + height + 4 * flockingThickness) / 1000);
      label = `${fmt(width, 0)} x ${fmt(height, 0)} mm`;
    } else {
      bareSurface = length * Math.PI * (width / 1000);
      caloSurface = length * Math.PI * ((width + 2 * caloThickness) / 1000);
      flockingSurface = length * Math.PI * ((width + 2 * flockingThickness) / 1000);
      label = `Ø ${fmt(width, 0)} mm`;
    }

    const weight = caloSurface * kgM2;
    rows.push({
      index: index + 1,
      type,
      label,
      length,
      bareSurface,
      caloSurface,
      flockingSurface,
      weight
    });
  }

  const totals = rows.reduce((acc, row) => {
    acc.length += row.length;
    acc.bareSurface += row.bareSurface;
    acc.caloSurface += row.caloSurface;
    acc.flockingSurface += row.flockingSurface;
    acc.weight += row.weight;
    return acc;
  }, { length: 0, bareSurface: 0, caloSurface: 0, flockingSurface: 0, weight: 0 });

  const output = document.getElementById("ductWeightRowsOutput");
  if (output) output.innerHTML = renderDuctWeightRows(rows);

  setResults([
    { label: "Longueur totale", value: `${fmt(totals.length, 1)} m` },
    { label: "Surface gaine nue", value: `${fmt(totals.bareSurface, 2)} m2` },
    { label: "Surface calorifuge", value: `${fmt(totals.caloSurface, 2)} m2` },
    { label: "Surface flocage", value: `${fmt(totals.flockingSurface, 2)} m2` },
    { label: "Poids brut gaine", value: `${fmt(totals.weight, 1)} kg` },
    { label: "Poids avec majoration", value: `${fmt(totals.weight * (1 + margin), 1)} kg` },
    { label: "Flocage avec majoration", value: `${fmt(totals.flockingSurface * (1 + margin), 2)} m2` }
  ], "Poids de gaine et metré");

  if (output) output.innerHTML = renderDuctWeightRows(rows);
}

function renderDuctWeightRows(rows) {
  if (!rows.length) {
    return `<div class="empty-state">Saisir au moins une gaine avec dimensions et longueur.</div>`;
  }

  return `
    <div class="duct-weight-result-table" style="display:grid;grid-template-columns:70px 90px minmax(130px,1.2fr) 90px repeat(4,minmax(100px,1fr));gap:8px;align-items:start;overflow-x:auto;">
      <div class="result-head">Rep.</div>
      <div class="result-head">Type</div>
      <div class="result-head">Dimensions</div>
      <div class="result-head">Long.</div>
      <div class="result-head">Surf. nue</div>
      <div class="result-head">Surf. calo.</div>
      <div class="result-head">Surf. floc.</div>
      <div class="result-head">Poids</div>
      ${rows.map((row) => `
        <strong>G${row.index}</strong>
        <span>${row.type === "rect" ? "Rect." : "Circ."}</span>
        <span>${row.label}</span>
        <span>${fmt(row.length, 1)} m</span>
        <span>${fmt(row.bareSurface, 2)} m2</span>
        <span>${fmt(row.caloSurface, 2)} m2</span>
        <span>${fmt(row.flockingSurface, 2)} m2</span>
        <strong>${fmt(row.weight, 1)} kg</strong>
      `).join("")}
    </div>
  `;
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

function calculateConversion() {
  const family = selectValue("convFamily") || "length";
  const group = conversionGroups[family];
  populateConversionUnits(family);
  const amount = value("convValue");
  const from = group.units.find((unit) => unit.id === selectValue("convFrom")) || group.units[0];
  const to = group.units.find((unit) => unit.id === selectValue("convTo")) || group.units[1] || group.units[0];

  if (family === "temperature") {
    const celsius = toCelsius(amount, from.id);
    const converted = fromCelsius(celsius, to.id);
    setResults([
      { label: "Valeur convertie", value: `${formatConversion(converted)} ${to.label}` },
      { label: "Valeur en Celsius", value: `${formatConversion(celsius)} deg C` },
      { label: "Formule", value: temperatureFormula(from.id, to.id) },
      { label: "Source", value: "Conversions/tableau de conversion" }
    ], "Conversions d'unites");
    return;
  }

  const baseValue = amount * from.factor;
  const converted = baseValue / to.factor;
  const factor = from.factor / to.factor;
  setResults([
    { label: "Valeur convertie", value: `${formatConversion(converted)} ${to.label}` },
    { label: `Valeur base (${group.base})`, value: `${formatConversion(baseValue)} ${group.base}` },
    { label: "Facteur source -> cible", value: formatConversion(factor) },
    { label: "Facteur inverse", value: formatConversion(1 / factor) }
  ], "Conversions d'unites");
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

function formatConversion(value) {
  if (!Number.isFinite(value)) return "-";
  const abs = Math.abs(value);
  if (abs > 0 && (abs < 0.000001 || abs >= 1000000000)) return value.toExponential(6).replace(".", ",");
  return value.toLocaleString("fr-FR", { maximumFractionDigits: 8 });
}

function toCelsius(value, unit) {
  if (unit === "f") return (value - 32) / 1.8;
  if (unit === "k") return value - 273.15;
  return value;
}

function fromCelsius(value, unit) {
  if (unit === "f") return value * 1.8 + 32;
  if (unit === "k") return value + 273.15;
  return value;
}

function temperatureFormula(from, to) {
  if (from === "c" && to === "f") return "deg F = 1,8 x deg C + 32";
  if (from === "c" && to === "k") return "K = deg C + 273,15";
  if (from === "f" && to === "c") return "deg C = (deg F - 32) / 1,8";
  if (from === "k" && to === "c") return "deg C = K - 273,15";
  return "conversion via deg C";
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

function calculateLibrary() {
  const ready = modules.filter((module) => module.status === "ready").length;
  const draft = modules.filter((module) => module.status === "draft").length;
  const backlog = modules.filter((module) => module.status === "backlog").length;
  setResults([
    { label: "Modules utilisables", value: fmt(ready, 0) },
    { label: "Modules a fiabiliser", value: fmt(draft, 0) },
    { label: "Modules a migrer", value: fmt(backlog, 0) },
    { label: "Sources referencees", value: fmt(new Set(modules.flatMap((module) => module.source)).size, 0) }
  ], "Bibliotheque Excel");
}

init();
