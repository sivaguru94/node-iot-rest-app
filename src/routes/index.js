const express = require('express');
const deviceRoutes = require('./device.route');
const userRoutes = require('./user.route');

const router = express.Router();

const routes = [
  {
    path: '/devices',
    routes: deviceRoutes,
  },
  {
    path: '/users',
    routes: userRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.routes));

module.exports = router;
