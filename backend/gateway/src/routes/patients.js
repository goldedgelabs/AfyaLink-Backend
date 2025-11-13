const express = require('express');

module.exports = (prisma) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const patients = await prisma.patient.findMany({ take: 100 });
    res.json({ ok: true, patients });
  });

  router.post('/', async (req, res) => {
    const data = req.body;
    const patient = await prisma.patient.create({ data });
    res.json({ ok: true, patient });
  });

  return router;
};
