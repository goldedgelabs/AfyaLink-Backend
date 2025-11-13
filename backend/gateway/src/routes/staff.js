const express = require('express');

module.exports = (prisma) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const staff = await prisma.staff.findMany({ take: 50 });
    res.json({ ok: true, staff });
  });

  router.post('/', async (req, res) => {
    const data = req.body;
    const member = await prisma.staff.create({ data });
    res.json({ ok: true, member });
  });

  return router;
};
