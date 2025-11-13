const express = require('express');

module.exports = (prisma) => {
  const router = express.Router();

  // Submit claim
  router.post('/claim', async (req, res) => {
    const { patientId, amount, description } = req.body;
    if (!patientId || !amount) return res.status(400).json({ error: 'Missing claim data' });

    const claim = await prisma.insuranceClaim.create({
      data: { patientId, amount, description, status: 'submitted' }
    });
    res.json({ ok: true, claim });
  });

  // List claims
  router.get('/', async (req, res) => {
    const claims = await prisma.insuranceClaim.findMany({ take: 50, orderBy: { createdAt: 'desc' } });
    res.json({ ok: true, claims });
  });

  return router;
};
