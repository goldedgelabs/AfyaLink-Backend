const express = require('express');

module.exports = (prisma) => {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const { userId, message, rating } = req.body;
    if (!userId || !message) return res.status(400).json({ error: 'Missing feedback' });

    const feedback = await prisma.feedback.create({ data: { userId, message, rating } });
    res.json({ ok: true, feedback });
  });

  router.get('/', async (req, res) => {
    const feedbacks = await prisma.feedback.findMany({ take: 50, orderBy: { createdAt: 'desc' } });
    res.json({ ok: true, feedbacks });
  });

  return router;
};
