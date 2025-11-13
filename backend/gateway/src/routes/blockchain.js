const express = require('express');

module.exports = (prisma) => {
  const router = express.Router();

  router.post('/log', async (req, res) => {
    const { userId, action, entity, meta } = req.body;
    const log = await prisma.auditLog.create({ data: { userId, action, entity, meta } });
    res.json({ ok: true, log });
  });

  router.get('/logs', async (req, res) => {
    const logs = await prisma.auditLog.findMany({ take: 50, orderBy: { createdAt: 'desc' } });
    res.json({ ok: true, logs });
  });

  return router;
};
