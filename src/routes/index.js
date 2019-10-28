var express=require('express');
var app=express();
var gymManager = require("../gymManager.js");

app.set('json spaces', 2)

var clientes = new gymManager('./src/data/database.json');

app.get('/clientes/id/:id', function(req, res) {
  try {
    cliente = clientes.getCliente(req.params.id);
    res.status(200).json(cliente);
  }catch(error) {
    throw error;
  }
});

app.get('/clientes/name/', function(req, res) {
  try {a
    var id_cliente = clientes.searchByName(req.body.nombre, req.body.apellidos);
    var cliente = clientes.getCliente(id_cliente);
    res.status(200).json(cliente);
  } catch(error) {
    throw error;
  }
});

app.post('/clientes', function(req, res) {
  nuevo_cliente = req.body;
  try {
    clientes.insert(nuevo_cliente);
    res.sendStatus(201);
  }catch(error) {
    throw error;
  }
});

app.get('/clientes', function(req, res) {
  var lista_clientes = clientes.listarClientes();
  res.status(200).json(lista_clientes);
});

app.put('/clientes/id/:id', function(req, res) {
  datos = req.body;
  campos = Object.keys(datos);

  for (var i = 0; i < campos.length; i++) {
    try {
      clientes.update(req.params.id, campos[i], datos[campos[i]]);
    } catch (error) {
      throw error;
    }
  }

  res.sendStatus(201);
});

app.delete('/clientes/id/:id', function(req, res) {
  try {
    clientes.eliminarCliente(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    throw error;
  }
});

app.get('/', function(req, res) {
  res.status(200).json({status:"OK"})
});

module.exports = app;
