const express = require('express');
const deviceRoutes = require('./device.route');

const router = express.Router();

const routes = [
  {
    path: '/devices',
    routes: deviceRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.routes);
});

module.exports = router;
