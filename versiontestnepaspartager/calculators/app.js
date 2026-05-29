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
    id: "convertisseur-technique-cvc",
    category: "utilitaires",
    title: "Pouvoir calorifique combustible",
    status: "ready",
    calculator: "pouvoirCalorifique",
    source: ["Module ajoute manuellement"],
    description: "Conversion rapide d'une quantite de combustible en energie PCI, PCS et energie utile.",
    keywords: ["combustible", "pouvoir calorifique", "pci", "pcs", "fioul", "gaz", "propane", "butane", "kwh", "energie", "rendement"]
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
  pouvoirCalorifique: { label: "Pouvoir calorifique combustible", render: renderPouvoirCalorifique },
  pending: { label: "Module a migrer", render: renderPending },
  library: { label: "Bibliotheque", render: renderLibrary }
};

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
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#39;"
}[char]));

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
          <span>${escapeHtml(item.label)}</span>
          <strong>${escapeHtml(item.value)}</strong>
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
    pouvoirCalorifique: calculatePouvoirCalorifique,
    pending: calculatePending,
    library: calculateLibrary
  };

  runners[state.currentCalculator]?.();
}

function selectedModule() {
  return modules.find((module) => module.id === state.selectedModule);
}

function renderPending() {
  const module = selectedModule();
  const pendingModule = module?.calculator === "pending" ? module : null;
  wrapForm(`
    <div class="empty-state">
      ${pendingModule ? `${pendingModule.title} est reference, mais son calculateur n'est pas encore migre.` : "Module a migrer."}
    </div>
    <div id="calcResults"></div>
  `, "Ce module reste dans le catalogue pour garder la trace du classeur source, mais il n'est pas encore exploitable.");
}

function calculatePending() {
  const module = selectedModule();
  const pendingModule = module?.calculator === "pending" ? module : null;
  setResults([
    { label: "Etat", value: "Module a migrer" },
    { label: "Source", value: pendingModule ? pendingModule.source.join(" / ") : "-" },
    { label: "Action", value: "Extraire les formules du classeur puis creer un calculateur dedie." }
  ], pendingModule ? pendingModule.title : "Module a migrer");
}

init();
