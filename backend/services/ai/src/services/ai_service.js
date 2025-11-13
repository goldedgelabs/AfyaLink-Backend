const axios = require('axios');
const AI_ENGINE_URL = process.env.AI_ENGINE_URL || 'http://localhost:6000';

async function askAI(prompt) {
  try {
    const r = await axios.post(`${AI_ENGINE_URL}/ask`, { prompt }, { timeout: 10000 });
    return r.data;
  } catch (err) {
    return { source: 'fallback', data: { message: 'AI unreachable' } };
  }
}

module.exports = { askAI };
