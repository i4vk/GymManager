var express=require('express');
var app=express();
var gymManager = require("../gymManager.js");

app.set('json spaces', 2)

var clientes = new gymManager('./src/data/database.json');

app.get('/', function(req, res) {
  res.status(200).json({status:"OK"})
});

app.get('/clientes', function(req, res) {
  var lista_clientes = clientes.listarClientes();
  res.status(200).json(lista_clientes);
});

app.get('/clientes/name/', function(req, res) {
  try {
    var id_cliente = clientes.searchByName(req.body['nombre'], req.body['apellidos']);
    var cliente = clientes.getCliente(id_cliente);

    res.status(200).json(cliente);
  } catch(error) {
    console.log(error)
    next(error);
    return;
  }
});

app.get('/clientes/:id', function(req, res) {
  cliente = clientes.getCliente(req.params.id);
  if (cliente != null) {
    res.status(200).send(JSON.stringify(cliente, null, 2));
  }else {
    res.sendStatus(404);
  }
});

module.exports = app;
