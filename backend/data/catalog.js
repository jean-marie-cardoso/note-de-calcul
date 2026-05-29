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
    description: "Capacite minimale du vase, volume de dilatation, pressions de service/remplissage et rendement du vase.",
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
    title: "Debit probable EF/ECS complet DTU 60.11",
    status: "ready",
    calculator: "plumbing",
    source: ["Programmes/Divers/150106 Calcul débit Pb EF-EC- NEW", "Calcul débit Pb EF-EC- NEW"],
    description: "Calcul complet des debits probables EF/ECS selon une logique DTU 60.11 simplifiee, avec appareils sanitaires, simultaneite et estimation eau melangee.",
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
    calculator: "pending",
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
    calculator: "pending",
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
    id: "combustion-pci-pcs",
    category: "utilitaires",
    title: "Combustion PCI/PCS",
    status: "ready",
    calculator: "combustionPciPcs",
    source: ["Module ajoute manuellement"],
    description: "Conversion combustible vers energie PCI/PCS et energie PCI vers quantite combustible.",
    keywords: ["combustion", "combustible", "pouvoir calorifique", "pci", "pcs", "fioul", "gaz", "propane", "butane", "kwh", "energie", "rendement"]
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

const calculators = [
  { id: 'ddv', label: 'Debit / diametre / vitesse' },
  { id: 'hydraulic', label: 'Reseau hydraulique' },
  { id: 'pump', label: 'Circulateur' },
  { id: 'vessel', label: 'Vase d\'expansion' },
  { id: 'duct', label: 'Gaine aeraulique' },
  { id: 'ductFlow', label: 'Debit air dans gaine' },
  { id: 'ductPressure', label: 'Pertes de charge air' },
  { id: 'plumbing', label: 'Debit plomberie' },
  { id: 'sanitaryEvac', label: 'Evacuations EU/EV/EP' },
  { id: 'psychro', label: 'Psychrometrie' },
  { id: 'thermal', label: 'Bilan thermique' },
  { id: 'gas', label: 'Debit gaz' },
  { id: 'compressedAir', label: 'Tuyauterie air comprime' },
  { id: 'insulation', label: 'Calorifuge' },
  { id: 'ductWeight', label: 'Poids gaine et metré' },
  { id: 'smoke', label: 'Desenfumage' },
  { id: 'conversion', label: 'Conversions d\'unites' },
  { id: 'combustionPciPcs', label: 'Combustion PCI/PCS' },
  { id: 'pending', label: 'Module a migrer' },
  { id: 'library', label: 'Bibliotheque' }
];

module.exports = { categories, modules, calculators };
