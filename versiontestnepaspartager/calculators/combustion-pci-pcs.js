const combustionFuels = {
  fioul: {
    label: "Fioul domestique",
    unit: "litres",
    pci: 10.08,
    pcs: 10.6848,
    defaultQuantity: 3000,
    example: "3000 litres -> 30 240 kWh PCI / 32 054,4 kWh PCS"
  },
  gaz: {
    label: "Gaz naturel",
    unit: "Nm3",
    pci: 9.45,
    pcs: 10.4895,
    defaultQuantity: 1000,
    example: "1000 Nm3 -> 9450 kWh PCI / 10 489,5 kWh PCS"
  },
  propane: {
    label: "Propane",
    unit: "kg",
    pci: 12.78,
    pcs: 13.8,
    defaultQuantity: 0,
    example: "100 kg de propane ≈ 1 278 kWh PCI"
  },
  butane: {
    label: "Butane",
    unit: "kg",
    pci: 12.66,
    pcs: 13.7,
    defaultQuantity: 0,
    example: "100 kg de butane ≈ 1 266 kWh PCI"
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
        <p>Les valeurs fioul et gaz sont celles du tableau fourni. Propane et butane restent modifiables tant que leurs valeurs source ne sont pas completees.</p>
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
    energyInput.value = fuel.defaultQuantity * fuel.pci;
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
