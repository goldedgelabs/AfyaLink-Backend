const express = require('express');

module.exports = (prisma) => {
  const router = express.Router();

  // Request lab test
  router.post('/request', async (req, res) => {
    const { patientId, testType, notes } = req.body;
    if (!patientId || !testType) return res.status(400).json({ error: 'Missing fields' });

    const test = await prisma.labTest.create({
      data: { patientId, type: testType, notes, status: 'pending' }
    });
    res.json({ ok: true, test });
  });

  // Upload test results (AI interpretation placeholder)
  router.post('/:id/results', async (req, res) => {
    const { result, interpretation } = req.body;
    const labId = parseInt(req.params.id);
    const updated = await prisma.labTest.update({
      where: { id: labId },
      data: { result, interpretation, status: 'completed' }
    });
    res.json({ ok: true, lab: updated });
  });

  // List all tests
  router.get('/', async (req, res) => {
    const tests = await prisma.labTest.findMany({ take: 100, orderBy: { createdAt: 'desc' } });
    res.json({ ok: true, tests });
  });

  return router;
};
