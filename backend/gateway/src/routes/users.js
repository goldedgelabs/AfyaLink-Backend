const express = require('express');

module.exports = (prisma) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const users = await prisma.user.findMany({ take: 50 });
    res.json({ ok: true, users });
  });

  router.get('/:id', async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.id) } });
    res.json({ ok: !!user, user });
  });

  return router;
};
