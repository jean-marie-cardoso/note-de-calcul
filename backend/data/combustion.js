const combustionFuels = {
  fioul: {
    label: "Fioul domestique",
    unit: "litres",
    pci: 10.08,
    pcs: 10.6848,
    defaultQuantity: 3000,
    defaultEnergyPci: 30240,
    example: "3000 litres -> 30 240 kWh PCI / 32 054,4 kWh PCS"
  },
  gaz: {
    label: "Gaz naturel",
    unit: "Nm3",
    pci: 9.45,
    pcs: 10.4895,
    defaultQuantity: 1000,
    defaultEnergyPci: 3000,
    example: "1000 Nm3 -> 9450 kWh PCI / 10 489,5 kWh PCS"
  },
  propane: {
    label: "Propane",
    unit: "kg",
    pci: 12.88,
    pcs: 13.9104,
    defaultQuantity: 3000,
    defaultEnergyPci: 3000,
    example: "3000 kg -> 38 640 kWh PCI / 41 731,2 kWh PCS"
  },
  butane: {
    label: "Butane",
    unit: "kg",
    pci: 12.3,
    pcs: 13.369,
    defaultQuantity: 3000,
    defaultEnergyPci: 3000,
    example: "3000 kg -> 36 900 kWh PCI / 40 107 kWh PCS"
  }
};

module.exports = {
  combustionFuels
};
