const express = require('express');

module.exports = (prisma) => {
  const router = express.Router();

  router.get('/stats', async (req, res) => {
    const users = await prisma.user.count();
    const patients = await prisma.patient.count();
    const hospitals = await prisma.hospital.count();
    res.json({ ok: true, users, patients, hospitals });
  });

  router.get('/logs', async (req, res) => {
    const logs = await prisma.auditLog.findMany({ take: 50, orderBy: { createdAt: 'desc' } });
    res.json({ ok: true, logs });
  });

  return router;
};
