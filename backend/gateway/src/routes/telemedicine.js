const express = require('express');

module.exports = (prisma) => {
  const router = express.Router();

  // Schedule teleconsult
  router.post('/schedule', async (req, res) => {
    const { patientId, doctorId, datetime } = req.body;
    if (!patientId || !doctorId || !datetime) return res.status(400).json({ error: 'Missing fields' });

    const consult = await prisma.teleconsult.create({
      data: { patientId, doctorId, scheduledAt: new Date(datetime), status: 'scheduled' }
    });
    res.json({ ok: true, consult });
  });

  // List consultations
  router.get('/', async (req, res) => {
    const consults = await prisma.teleconsult.findMany({ take: 50, orderBy: { scheduledAt: 'desc' } });
    res.json({ ok: true, consults });
  });

  return router;
};
