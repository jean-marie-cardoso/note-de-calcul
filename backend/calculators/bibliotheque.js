const { document, fmt, mm, m3h, lps, value, selectValue, setResults } = require("./runtime");
const { categories, modules } = require("../routes/catalog-data");
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


module.exports = {
  calculateLibrary
};
