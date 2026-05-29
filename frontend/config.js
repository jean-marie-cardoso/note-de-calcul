const API_BASE_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname.startsWith("192.168.") ||
  window.location.hostname === "82.67.215.219" ||
  window.location.hostname.endsWith(".local")
    ? ""
    : "https://api.mon-domaine.fr";
