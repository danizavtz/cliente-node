  const express = require('express');
  const router = express.Router();
  const clienteController = require('../controllers/cliente.controller');
  const clienteValidator = require('../validators/cliente.validator');

  router.post('/clientes/', clienteValidator.validateCliente, clienteController.addCliente);
  router.get('/clientes/', clienteController.clientes);
  router.get('/clientes/:id([0-9]+)', clienteController.lookupCliente, clienteController.getCliente);
  router.put('/clientes/:id([0-9]+)', clienteValidator.validateCliente, clienteController.lookupCliente, clienteController.updateCliente);
  router.delete('/clientes/:id([0-9]+)', clienteController.lookupCliente, clienteController.deleteCliente);

  module.exports = router;