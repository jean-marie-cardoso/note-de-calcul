const express = require('express');
const uiData = require('../data/ui');

const router = express.Router();

router.get('/data/ui', (req, res) => {
  res.json(uiData);
});

module.exports = router;
