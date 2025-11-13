#!/usr/bin/env node
// Gateway: Express + Apollo + Socket.IO (core)
const path = require('path');
const express = require('express');
const http = require('http');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || '*', credentials: true }));
app.use(bodyParser.json({ limit: '2mb' }));

// JWT attach
app.use((req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return next();
  const token = auth.split(' ')[1];
  try { req.user = jwt.verify(token, process.env.JWT_SECRET || 'devsecret'); } 
  catch (e) { /* ignore */ }
  return next();
});

// Health endpoint
app.get('/health', (req, res) => res.json({ ok: true, ts: new Date().toISOString() }));

// Mount routes
const routes = require('./routes/index');
app.use('/api', routes(prisma));

// GraphQL placeholder
app.get('/graphql', (req, res) => res.json({ ok: true, info: 'GraphQL endpoint placeholder' }));

// Socket.IO setup
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { cors: { origin: process.env.FRONTEND_URL || '*' } });
io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
  socket.on('join', (r) => socket.join(r));
  socket.on('chat:send', (m) => { if (m.room) io.to(m.room).emit('chat:message', m); });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log('Gateway listening on', PORT));// Placeholder content for index.js
