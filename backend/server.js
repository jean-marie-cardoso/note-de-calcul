const path = require('path');
const express = require('express');
const cors = require('cors');
const calculationRoutes = require('./routes/calculations');

const app = express();
const port = Number(process.env.PORT || 3000);
const serveFrontend = process.env.SERVE_FRONTEND === 'true';

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use('/api', calculationRoutes);

if (serveFrontend) {
  const frontendDir = process.env.FRONTEND_DIR || path.join(__dirname, '..', 'frontend');
  app.use(express.static(frontendDir));

  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDir, 'index.html'));
  });
}

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    error: 'Erreur calcul serveur',
    message: error.message
  });
});

app.listen(port, () => {
  console.log(`Soft Etudes JM API ecoute sur http://localhost:${port}`);
});
