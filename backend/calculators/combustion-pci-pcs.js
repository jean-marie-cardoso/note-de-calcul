const { document, fmt, mm, m3h, lps, value, selectValue, setResults } = require("./runtime");
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

function renderCombustionPciPcs() {
  wrapForm(`
    <div class="form-grid">
      ${selectField("fuelType", "Combustible", [
        { value: "fioul", label: "Fioul domestique" },
        { value: "gaz", label: "Gaz naturel" },
        { value: "propane", label: "Propane" },
        { value: "butane", label: "Butane" }
      ])}
      ${field("fuelQuantity", "Quantite combustible", "3000", "", "number", "step=\"any\" min=\"0\"")}
      ${field("fuelEnergyPci", "Energie PCI a convertir", "30240", "kWh PCI", "number", "step=\"any\" min=\"0\"")}
      ${field("fuelPci", "PCI unitaire", "10.08", "kWh/unite", "number", "step=\"any\" min=\"0\"")}
      ${field("fuelPcs", "PCS unitaire", "10.6848", "kWh/unite", "number", "step=\"any\" min=\"0\"")}
      ${field("fuelEfficiency", "Rendement utile", "100", "%", "number", "step=\"any\" min=\"0\" max=\"100\"")}
    </div>

    <details class="module-help" open>
      <summary>Lecture rapide</summary>
      <div class="module-help-content">
        <p>Le calcul reprend la logique du tableau combustion : quantite combustible x PCI/PCS = energie, puis conversion inverse depuis une energie PCI.</p>
        <p>Les valeurs fioul, gaz, propane et butane sont calees sur le tableau fourni.</p>
      </div>
    </details>

    <div id="calcResults"></div>
  `, "Conversion combustible vers energie et energie PCI vers quantite combustible.");

  updateCombustionDefaults(true);
}

function updateCombustionDefaults(forceQuantity = false) {
  const fuelKey = selectValue("fuelType") || "fioul";
  const fuel = combustionFuels[fuelKey] || combustionFuels.fioul;
  const quantityInput = document.getElementById("fuelQuantity");
  const energyInput = document.getElementById("fuelEnergyPci");
  const pciInput = document.getElementById("fuelPci");
  const pcsInput = document.getElementById("fuelPcs");

  if (quantityInput && (forceQuantity || quantityInput.dataset.fuel !== fuelKey)) {
    quantityInput.value = fuel.defaultQuantity;
    quantityInput.dataset.fuel = fuelKey;
  }

  if (energyInput && (forceQuantity || energyInput.dataset.fuel !== fuelKey)) {
    energyInput.value = fuel.defaultEnergyPci;
    energyInput.dataset.fuel = fuelKey;
  }

  if (pciInput && pciInput.dataset.fuel !== fuelKey) {
    pciInput.value = fuel.pci;
    pciInput.dataset.fuel = fuelKey;
  }

  if (pcsInput && pcsInput.dataset.fuel !== fuelKey) {
    pcsInput.value = fuel.pcs;
    pcsInput.dataset.fuel = fuelKey;
  }
}

function calculateCombustionPciPcs() {
  updateCombustionDefaults();

  const fuelKey = selectValue("fuelType") || "fioul";
  const fuel = combustionFuels[fuelKey] || combustionFuels.fioul;
  const quantity = value("fuelQuantity");
  const targetEnergyPci = value("fuelEnergyPci");
  const pci = value("fuelPci") || fuel.pci;
  const pcs = value("fuelPcs") || fuel.pcs;
  const efficiency = Math.max(0, Math.min(100, value("fuelEfficiency"))) / 100;

  const energyPci = quantity * pci;
  const energyPcs = quantity * pcs;
  const usefulEnergy = energyPci * efficiency;
  const requiredQuantity = pci > 0 ? targetEnergyPci / pci : 0;
  const equivalentPcs = pci > 0 ? targetEnergyPci * pcs / pci : 0;
  const pcsPciRatio = pci > 0 ? pcs / pci : 0;

  setResults([
    { label: "Combustible", value: fuel.label },
    { label: "Quantite combustible", value: `${fmt(quantity, 2)} ${fuel.unit}` },
    { label: "PCI unitaire", value: `${fmt(pci, 4)} kWh/${fuel.unit}` },
    { label: "PCS unitaire", value: `${fmt(pcs, 4)} kWh/${fuel.unit}` },
    { label: "Energie PCI", value: `${fmt(energyPci, 1)} kWh` },
    { label: "Energie PCS", value: `${fmt(energyPcs, 1)} kWh` },
    { label: "Energie utile", value: `${fmt(usefulEnergy, 1)} kWh avec rendement ${fmt(efficiency * 100, 0)} %` },
    { label: "Rapport PCS / PCI", value: fmt(pcsPciRatio, 4) },
    { label: `Pour obtenir ${fmt(targetEnergyPci, 1)} kWh PCI`, value: `${fmt(requiredQuantity, 6)} ${fuel.unit}` },
    { label: "PCS equivalent", value: `${fmt(equivalentPcs, 1)} kWh PCS` },
    { label: "Reference tableau", value: fuel.example }
  ], "Combustion PCI/PCS");
}

function renderPouvoirCalorifique() {
  renderCombustionPciPcs();
}

function calculatePouvoirCalorifique() {
  calculateCombustionPciPcs();
}

function renderConvertisseurTechniqueCVC() {
  renderCombustionPciPcs();
}

function calculateConvertisseurTechniqueCVC() {
  calculateCombustionPciPcs();
}


module.exports = {
  calculateCombustionPciPcs,
  calculatePouvoirCalorifique,
  calculateConvertisseurTechniqueCVC
};
