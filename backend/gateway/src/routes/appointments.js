const express = require('express');

module.exports = (prisma) => {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const { patientId, doctorId, date, notes } = req.body;
    if (!patientId || !date) return res.status(400).json({ error: 'Missing fields' });

    const appointment = await prisma.appointment.create({
      data: { patientId, doctorId, date: new Date(date), notes, status: 'scheduled' }
    });
    res.json({ ok: true, appointment });
  });

  router.get('/', async (req, res) => {
    const appointments = await prisma.appointment.findMany({ take: 50, orderBy: { date: 'desc' } });
    res.json({ ok: true, appointments });
  });

  return router;
};
