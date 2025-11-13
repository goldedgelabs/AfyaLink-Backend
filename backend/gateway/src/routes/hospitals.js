const express = require('express');

module.exports = (prisma) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const hospitals = await prisma.hospital.findMany({ take: 50 });
    res.json({ ok: true, hospitals });
  });

  router.post('/', async (req, res) => {
    const data = req.body;
    const hospital = await prisma.hospital.create({ data });
    res.json({ ok: true, hospital });
  });

  return router;
};
