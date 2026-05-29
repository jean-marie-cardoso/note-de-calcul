let currentRuntime = null;

function run(values = {}, datasets = {}, callback) {
  const previousRuntime = currentRuntime;
  currentRuntime = createRuntime(values, datasets);

  try {
    callback();
    return currentRuntime.payload();
  } finally {
    currentRuntime = previousRuntime;
  }
}

function createRuntime(values, datasets) {
  const elements = new Map();
  let latestResult = { title: '', items: [], html: '', summary: '' };

  function getElement(id) {
    if (!elements.has(id)) {
      const element = {
        id,
        value: values[id] ?? '',
        style: {},
        dataset: { ...(datasets[id] || {}) },
        innerHTML: '',
        textContent: ''
      };
      elements.set(id, element);
    }
    return elements.get(id);
  }

  function payload() {
    return {
      ...latestResult,
      domUpdates: Array.from(elements.values()).map((element) => ({
        id: element.id,
        value: element.value,
        innerHTML: element.innerHTML,
        textContent: element.textContent,
        style: element.style,
        dataset: element.dataset
      }))
    };
  }

  return {
    getElement,
    setResult(result) {
      latestResult = result;
      getElement('calcResults').innerHTML = result.html;
    },
    payload
  };
}

function assertRuntime() {
  if (!currentRuntime) {
    throw new Error('Aucun contexte de calcul actif.');
  }
  return currentRuntime;
}

const document = {
  getElementById(id) {
    return assertRuntime().getElement(id);
  }
};

function value(id) {
  const input = document.getElementById(id);
  return input ? Number(String(input.value ?? '').replace(',', '.')) : 0;
}

function selectValue(id) {
  return document.getElementById(id)?.value;
}

const fmt = (value, digits = 2) => Number.isFinite(value)
  ? value.toLocaleString('fr-FR', { maximumFractionDigits: digits })
  : '-';

const mm = (value) => `${fmt(value, 1)} mm`;
const m3h = (value) => `${fmt(value, 2)} m3/h`;
const lps = (value) => `${fmt(value, 3)} l/s`;

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '\"': '&quot;',
    "'": '&#39;'
  }[char]));
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
  const html = result(items);
  const summary = `${title}\n${items.map((item) => `- ${item.label}: ${item.value}`).join("\n")}`;
  assertRuntime().setResult({ title, items, html, summary });
}

module.exports = {
  run,
  document,
  fmt,
  mm,
  m3h,
  lps,
  value,
  selectValue,
  setResults
};
