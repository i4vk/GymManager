var express=require('express');
var app=express();
var gymManager = require("../gymManager.js");

app.set('json spaces', 2)

var clientes = new gymManager('./src/data/database.json');

/**
* @apiDefine parametros
* @apiParam {String} nombre Nombre del cliente
* @apiParam {String} apellidos Apellidos del cliente
* @apiParam {String} dni DNI del cliente
* @apiParam {String} email Dirección de orreo del cliente
*/

/**
* @apiDefine success
* @apiSuccess {String} nombre Nombre del cliente
* @apiSuccess {String} apellidos Apellidos del cliente
* @apiSuccess {String} dni DNI del cliente
* @apiSuccess {String} email Dirección de correo del cliente
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "nombre": "Rodrigo",
*       "apellidos": "Rodríguez Fernández",
*       "dni": "12345678S",
*       "email": "foo@gmail.es"
*     }
*/

/**
* @apiDefine success201
* @apiSuccess (201 Created) {String} nombre Nombre del cliente
* @apiSuccess (201 Created) {String} apellidos Apellidos del cliente
* @apiSuccess (201 Created) {String} dni DNI del cliente
* @apiSuccess (201 Created) {String} email Dirección de correo del cliente
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "nombre": "Rodrigo",
*       "apellidos": "Rodríguez Fernández",
*       "dni": "12345678S",
*       "email": "foo@gmail.es"
*     }
*/


/**
* @api {get} /clientes/id/:id GET /clientes/id/:id
* @apiDescription Obtiene cliente mediante ID
* @apiGroup Clientes
* @apiName GetClienteByID
* @apiParam {Number} id ID único de un cliente
* @apiUse success
*/
app.get('/clientes/id/:id', function(req, res) {
  try {
    cliente = clientes.getCliente(req.params.id);
    res.status(200).json(cliente);
  }catch(error) {
    throw error;
  }
});

/**
* @api {get} /clientes/name GET /clientes/name
* @apiDescription Obtiene cliente mediante nombre y apellidos
* @apiGroup Clientes
* @apiName GetClienteByName
* @apiParam {String} nombre Nombre del cliente
* @apiParam {String} apellidos Apellidos del cliente
* @apiExample Example usage:
*     endpoint: http://localhost/clientes/name
*
*     body:
*     {
*       "nombre": "Peter",
*       "apellidos": "Johannson Steven"
*     }
* @apiUse success
* @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ClientNotFound"
 *     }
*/
app.get('/clientes/name/', function(req, res) {
  try {
    var id_cliente = clientes.searchByName(req.body.nombre, req.body.apellidos);
    var cliente = clientes.getCliente(id_cliente);
    res.status(200).json(cliente);
  } catch(error) {
    throw error;
  }
});

/**
* @api {get} /clientes/dni/:dni GET /clientes/dni/:dni
* @apiDescription Obtiene cliente mediante DNI
* @apiGroup Clientes
* @apiName GetClienteByDNI
* @apiParam {String} dni DNI del cliente
* @apiUse success
* @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ClientNotFound"
 *     }
*/
app.get('/clientes/dni/:dni', function(req, res) {
  try {
    var id_cliente = clientes.searchByDNI(req.params.dni);
    var cliente = clientes.getCliente(id_cliente);
    res.status(200).json(cliente);
  } catch(error) {
    throw error;
  }
});

/**
* @api {post} /clientes POST /clientes
* @apiDescription Crea un nuevo cliente
* @apiGroup Clientes
* @apiName PostClientes
* @apiUse parametros
* @apiExample Example usage:
*     endpoint: http://localhost/clientes
*
*     body:
*     {
*       "nombre": "Rodrigo",
*       "apellidos": "Rodríguez Fernández",
*       "dni": "12345678S",
*       "email": "foo@gmail.com"
*     }
* @apiSuccess (Success 201) {int} id ID del cliente
* @apiSuccessExample Success-Response:
*     HTTP/1.1 201 OK
*     {
*       "id":3
*     }
*/
app.post('/clientes', function(req, res) {
  nuevo_cliente = req.body;
  try {
    id_insertado = clientes.insert(nuevo_cliente);
    res.status(201).json({id:id_insertado});
  }catch(error) {
    throw error;
  }
});

/**
* @api {get} /clientes GET /clientes
* @apiDescription Obtiene la lista completa de clientes
* @apiGroup Clientes
* @apiName GetClientes
* @apiSuccess (Success 200) {JSON} Clientes Lista completa de clientes
*/
app.get('/clientes', function(req, res) {
  var lista_clientes = clientes.listarClientes();
  res.status(200).json(lista_clientes);
});


/**
* @api {put} /clientes/id/:id PUT /clientes/id/:id
* @apiDescription Modifica los datos de alguno de los clientes
* @apiGroup Clientes
* @apiName PutClientes
* @apiUse parametros
* @apiExample Example usage:
*     endpoint: http://localhost/clientes/id/1
*
*     body:
*     {
*       "nombre": "Rodrigo",
*       "dni": "12345678S"
*     }
* @apiUse success201
* @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "CannotUpdateClient"
 *     }
*/
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

  res.status(201).json(clientes.getCliente(req.params.id));
});

/**
* @api {delete} /clientes/id/:id DELETE /clientes/id/:id
* @apiDescription Elimina un cliente con una ID determinada
* @apiGroup Clientes
* @apiName DeleteClientes
* @apiParam {int} id ID del cliente a eliminar
* @apiSuccess 200 El cliente se ha eliminado correctamente
* @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "CannotDeleteClient"
 *     }
*/
app.delete('/clientes/id/:id', function(req, res) {
  try {
    clientes.eliminarCliente(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    throw error;
  }
});

/**
* @api {get} /status GET /status
* @apiDescription Comprueba estado del servidor
* @apiGroup Status
* @apiName GetStatus
* @apiSuccess status Estado del servidor
*/
app.get('/status', function(req, res) {
  res.status(200).json({status:"OK"})
});

module.exports = app;
