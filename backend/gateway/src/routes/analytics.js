const express = require('express');

module.exports = (prisma) => {
  const router = express.Router();

  router.get('/overview', async (req, res) => {
    const userCount = await prisma.user.count();
    const patientCount = await prisma.patient.count();
    const hospitalCount = await prisma.hospital.count();
    const upcomingConsults = await prisma.teleconsult.count({ where: { status: 'scheduled' } });
    res.json({ ok: true, users: userCount, patients: patientCount, hospitals: hospitalCount, upcomingConsults });
  });

  router.get('/recent-activities', async (req, res) => {
    const logs = await prisma.auditLog.findMany({ take: 50, orderBy: { createdAt: 'desc' } });
    res.json({ ok: true, logs });
  });

  return router;
};
