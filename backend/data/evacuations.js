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

module.exports = {
  sanitaryEvacFixtures,
  sanitaryEvacUsageFactors,
  sanitaryChuteThresholds,
  sanitaryCollectorCapacity,
  roofDrainEpTable
};
