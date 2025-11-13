#!/usr/bin/env node
const express = require('express');
const http = require('http');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { ApolloServer } = require('apollo-server-express');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();
const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || '*', credentials: true }));
app.use(bodyParser.json({ limit: '2mb' }));

// JWT auth middleware
app.use((req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return next();
  const token = auth.split(' ')[1];
  try { req.user = jwt.verify(token, process.env.JWT_SECRET || 'devsecret'); }
  catch (e) { console.error('JWT error:', e); }
  next();
});

// REST Health check
app.get('/health', async (req, res) => {
  const dbStatus = await prisma.$queryRaw`SELECT 1;`.catch(() => null);
  res.json({ ok: true, db: !!dbStatus, timestamp: new Date().toISOString() });
});

// REST routes mount
const routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach(file => {
  const route = require(path.join(routesPath, file));
  if (typeof route === 'function') app.use('/api', route(prisma));
});

// GraphQL setup
const typeDefs = fs.readFileSync(path.join(__dirname, 'graphql/schema/index.graphql'), 'utf-8');
const resolvers = require('./graphql/resolvers/index.js');

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ prisma, user: req.user })
});

(async () => { await apolloServer.start(); apolloServer.applyMiddleware({ app, path: '/graphql' }); })();

// Socket.IO for live chat, notifications
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { cors: { origin: process.env.FRONTEND_URL || '*' } });

io.on('connection', socket => {
  console.log('Socket connected:', socket.id);
  socket.on('join', room => socket.join(room));
  socket.on('chat:send', msg => {
    if (msg.room) io.to(msg.room).emit('chat:message', msg);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log('Gateway running on', PORT));
