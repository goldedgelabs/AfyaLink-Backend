const express = require('express');
const axios = require('axios');

module.exports = (prisma) => {
  const router = express.Router();

  // POST /api/ai/ask
  router.post('/ask', async (req, res) => {
    const prompt = req.body.prompt;
    if (!prompt) return res.status(400).json({ error: 'prompt required' });

    try {
      // NeuroEdge API call (mock-safe)
      const response = await axios.post(
        process.env.NEUROEDGE_URL,
        { prompt },
        { headers: { Authorization: `Bearer ${process.env.NEUROEDGE_KEY}` }, timeout: 8000 }
      );
      return res.json({ source: 'NeuroEdge', data: response.data });
    } catch (e) {
      return res.json({ source: 'mock', data: { message: 'fallback AI response', prompt } });
    }
  });

  return router;
};
