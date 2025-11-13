module.exports = (prisma) => {
  const express = require('express');
  const router = express.Router();

  // Import individual module routes
  const authRoutes = require('./auth');
  const userRoutes = require('./users');
  const patientRoutes = require('./patients');
  const hospitalRoutes = require('./hospitals');
  const staffRoutes = require('./staff');
  const adminRoutes = require('./admin');
  const aiRoutes = require('./ai');
  const paymentRoutes = require('./payments');
  const labRoutes = require('./labs');
  const telemedicineRoutes = require('./telemedicine');
  const insuranceRoutes = require('./insurance');
  const web3Routes = require('./web3');

  // Mount
  router.use('/auth', authRoutes(prisma));
  router.use('/users', userRoutes(prisma));
  router.use('/patients', patientRoutes(prisma));
  router.use('/hospitals', hospitalRoutes(prisma));
  router.use('/staff', staffRoutes(prisma));
  router.use('/admin', adminRoutes(prisma));
  router.use('/ai', aiRoutes(prisma));
  router.use('/payments', paymentRoutes(prisma));
  router.use('/labs', labRoutes(prisma));
  router.use('/telemedicine', telemedicineRoutes(prisma));
  router.use('/insurance', insuranceRoutes(prisma));
  router.use('/web3', web3Routes(prisma));

  return router;
};
