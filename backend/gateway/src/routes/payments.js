const express = require('express');
const axios = require('axios');

module.exports = (prisma) => {
  const router = express.Router();

  // Mock M-PESA payment
  router.post('/mpesa', async (req, res) => {
    const { amount, phone } = req.body;
    if (!amount || !phone) return res.status(400).json({ error: 'Missing payment data' });
    return res.json({ ok: true, provider: 'mpesa', status: 'initiated', amount, phone });
  });

  // Mock Stripe payment
  router.post('/stripe', async (req, res) => {
    const { amount, card } = req.body;
    if (!amount || !card) return res.status(400).json({ error: 'Missing payment data' });
    return res.json({ ok: true, provider: 'stripe', status: 'paid', amount });
  });

  // Retrieve payments history
  router.get('/', async (req, res) => {
    const payments = await prisma.payment.findMany({ take: 50, orderBy: { createdAt: 'desc' } }).catch(() => []);
    res.json({ ok: true, payments });
  });

  return router;
};
