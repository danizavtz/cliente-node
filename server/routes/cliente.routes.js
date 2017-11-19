(function() {
  'use strict';

  const express = require('express');
  const router = express.Router();
  const clienteController = require('../controllers/cliente.controller.js');

  router.post('/clientes/');
  router.get('/clientes/');
  router.get('/clientes/:id([0-9]+)');
  router.put('/clientes/:id([0-9]+)');
  router.delete('/clientes/:id([0-9]+)');

  module.exports = router;
}());