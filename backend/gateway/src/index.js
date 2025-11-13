const express = require('express'); const http = require('http'); const helmet = require('helmet'); const cors = require('cors'); const bodyParser = require('body-parser'); const jwt = require('jsonwebtoken'); const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); const path = require('path');
const app = express(); app.use(helmet()); app.use(cors({ origin: '*' })); app.use(bodyParser.json({ limit: '1mb' }));
app.use((req,res,next)=>{ const h = req.headers.authorization; if(!h) return next(); const t = h.split(' ')[1]; try{ req.user = jwt.verify(t, process.env.JWT_SECRET || 'devsecret'); }catch(e){} next(); });
app.get('/health', (req,res)=>res.json({ ok:true, ts: Date.now() }));
try{ const routes = require('./routes/index'); app.use('/api', routes(prisma)); }catch(e){ console.warn('no routes', e.message); }
app.get('/graphql',(req,res)=>res.json({ ok:true, info:'GraphQL placeholder' }));
const adminPath = path.join(__dirname,'..','..','..','admin'); if(require('fs').existsSync(adminPath)){ app.use('/admin', express.static(adminPath)); }
const server = http.createServer(app); const { Server } = require('socket.io'); const io = new Server(server, { cors:{ origin: '*' } }); io.on('connection', socket=>{ console.log('socket connected', socket.id); socket.on('join', r=>socket.join(r)); socket.on('chat:send', m=>{ if(m.room) io.to(m.room).emit('chat:message', m); }); });
const PORT = process.env.PORT || 5000; server.listen(PORT, ()=>console.log('Gateway listening on', PORT));