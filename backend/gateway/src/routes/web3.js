const express = require('express');

module.exports = (prisma) => {
  const router = express.Router();

  // Create blockchain identity
  router.post('/create', async (req, res) => {
    const { patientId, walletAddress } = req.body;
    if (!patientId || !walletAddress) return res.status(400).json({ error: 'Missing fields' });

    const identity = await prisma.web3Identity.create({
      data: { patientId, walletAddress }
    });
    res.json({ ok: true, identity });
  });

  // List identities
  router.get('/', async (req, res) => {
    const identities = await prisma.web3Identity.findMany({ take: 50 });
    res.json({ ok: true, identities });
  });

  return router;
};
