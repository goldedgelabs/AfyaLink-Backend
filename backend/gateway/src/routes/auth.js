const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = (prisma) => {
  const router = express.Router();

  // Register
  router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!email || !password || !name) return res.status(400).json({ error: 'Missing fields' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { name, email, password: hashed, role: role || 'patient' } });
    return res.json({ ok: true, user });
  });

  // Login
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Missing credentials' });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });
    return res.json({ ok: true, token, user: { id: user.id, name: user.name, role: user.role } });
  });

  return router;
};
