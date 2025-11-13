const express = require('express');

module.exports = (prisma) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    // Placeholder: global settings
    const settings = { maintenanceMode: false, features: { ai: true, telemedicine: true, web3: true } };
    res.json({ ok: true, settings });
  });

  router.post('/', async (req, res) => {
    // Placeholder: save settings
    const newSettings = req.body;
    res.json({ ok: true, settings: newSettings });
  });

  return router;
};
