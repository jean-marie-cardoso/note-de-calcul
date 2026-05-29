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

module.exports = {
  efEcApparelsData,
  efEcDefaultQuantities
};
