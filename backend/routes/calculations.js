const express = require('express');
const runtime = require('../calculators/runtime');
const catalog = require('./catalog-data');

const hydraulique = require('../calculators/hydraulique');
const aeraulique = require('../calculators/aeraulique');
const plumbing = require('../calculators/plumbing');
const evacuations = require('../calculators/evacuations');
const thermique = require('../calculators/thermique');
const ventilation = require('../calculators/ventilation');
const fluides = require('../calculators/fluides');
const quantitatifs = require('../calculators/quantitatifs');
const conversions = require('../calculators/conversions');
const combustion = require('../calculators/combustion-pci-pcs');
const bibliotheque = require('../calculators/bibliotheque');

const router = express.Router();

const runners = {
  ddv: { title: 'Debit / diametre / vitesse', run: hydraulique.calculateDdv },
  hydraulic: { title: 'Reseau hydraulique', run: hydraulique.calculateHydraulic },
  pump: { title: 'Circulateur', run: hydraulique.calculatePump },
  vessel: { title: 'Vase d\'expansion', run: hydraulique.calculateVessel },
  duct: { title: 'Gaine aeraulique', run: aeraulique.calculateDuct },
  ductFlow: { title: 'Debit air dans gaine', run: aeraulique.calculateDuctFlow },
  ductPressure: { title: 'Pertes de charge air', run: aeraulique.calculateDuctPressure },
  plumbing: { title: 'Debit plomberie', run: plumbing.calculatePlumbing },
  sanitaryEvac: { title: 'Evacuations EU/EV/EP', run: evacuations.calculateSanitaryEvac },
  psychro: { title: 'Psychrometrie', run: thermique.calculatePsychro },
  thermal: { title: 'Bilan thermique', run: thermique.calculateThermal },
  gas: { title: 'Debit gaz', run: fluides.calculateGas },
  compressedAir: { title: 'Tuyauterie air comprime', run: fluides.calculateCompressedAir },
  insulation: { title: 'Calorifuge', run: quantitatifs.calculateInsulation },
  ductWeight: { title: 'Poids gaine et metré', run: quantitatifs.calculateDuctWeight },
  smoke: { title: 'Desenfumage', run: ventilation.calculateSmoke },
  conversion: { title: 'Conversions d\'unites', run: conversions.calculateConversion },
  combustionPciPcs: { title: 'Combustion PCI/PCS', run: combustion.calculateCombustionPciPcs },
  pouvoirCalorifique: { title: 'Combustion PCI/PCS', run: combustion.calculateCombustionPciPcs },
  pending: { title: 'Module a migrer', run: runPending },
  library: { title: 'Bibliotheque', run: bibliotheque.calculateLibrary }
};

router.get('/health', (req, res) => {
  res.json({ ok: true, service: 'soft-etudes-jm-api' });
});

router.get('/catalog', (req, res) => {
  res.json(catalog);
});

router.post('/calculate/:calculator', (req, res, next) => {
  try {
    const calculator = req.params.calculator;
    const runner = runners[calculator];

    if (!runner) {
      res.status(404).json({ error: 'Calculateur inconnu', calculator });
      return;
    }

    const payload = runtime.run(req.body?.values || {}, req.body?.datasets || {}, runner.run);
    res.json({
      calculator,
      requestedTitle: runner.title,
      ...payload
    });
  } catch (error) {
    next(error);
  }
});

function runPending() {
  const { setResults } = require('../calculators/runtime');
  setResults([
    { label: 'Etat', value: 'Module a migrer' },
    { label: 'Action', value: 'Extraire les formules du classeur puis creer un calculateur dedie.' }
  ], 'Module a migrer');
}

module.exports = router;
