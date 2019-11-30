var GymManager = require('../src/gymManager.js');
var path = require('path')
var fs = require('fs')

var database = require('./data/database.json')

var clientes = new GymManager(path.join(__dirname, './data/database.json'));

beforeEach(() => {
  clientes.clear();
});

test('Inserta correctamente', () => {
  var ini_num_clientes = clientes.num_clientes;
  var nuevo_cliente = {nombre:"Antonio",apellidos:"Papaya Telescopio",dni:"1234567S",email:"papaya@correo.ugr.es"};
  clientes.insert(nuevo_cliente);

  var cliente = clientes.getCliente(clientes.num_clientes);
  expect(cliente).toEqual(nuevo_cliente);
  expect(clientes.num_clientes).toBe(ini_num_clientes+1);
});


test('Borra correctamente', () => {
  un_cliente = {nombre:"Iván",apellidos:"Garzón Segura",dni:"1234567S",email:"ivangarzon98@correo.ugr.es"};
  clientes.insert(un_cliente);
  var ini_num_clientes = clientes.num_clientes;

  expect(clientes.eliminarCliente(1)).toBeTruthy();
  expect(clientes.num_clientes).toBe(ini_num_clientes-1);
});

test('Modifica correctamente', () => {
  un_cliente = {nombre:"Iván",apellidos:"Garzón Segura",dni:"1234567S",email:"ivangarzon98@correo.ugr.es"};
  clientes.insert(un_cliente);
  clientes.update(1, "nombre", 'Roberto');

  expect(clientes.db["clientes"][1]["nombre"]).toBe('Roberto');
});

test('Lista correctamente', () => {
  var un_cliente = {nombre:"Iván",apellidos:"Garzón Segura",dni:"1234567S",email:"ivangarzon98@correo.ugr.es"};
  var un_cliente2 = {nombre:"Antonio",apellidos:"Papaya Telescopio",dni:"1234567S",email:"papaya@correo.ugr.es"};

  clientes.insert(un_cliente);
  clientes.insert(un_cliente2);

  db_esperada = {
    "1": {
      "nombre": "Iván",
      "apellidos": "Garzón Segura",
      "dni": "1234567S",
      "email": "ivangarzon98@correo.ugr.es"
    },
    "2": {
      "nombre": "Antonio",
      "apellidos": "Papaya Telescopio",
      "dni": "1234567S",
      "email": "papaya@correo.ugr.es"
    }
  };

  expect(clientes.listarClientes()).toEqual(db_esperada);
});

test('Obtiene un cliente correctamente', () => {
  var un_cliente = {nombre:"Iván",apellidos:"Garzón Segura",dni:"1234567S",email:"ivangarzon98@correo.ugr.es"};
  clientes.insert(un_cliente);

  expect(clientes.getCliente(clientes.num_clientes)).toEqual(un_cliente);
});

test('Busca por nombre correctamente', () => {
  var un_cliente = {nombre:"Iván",apellidos:"Garzón Segura",dni:"1234567S",email:"ivangarzon98@correo.ugr.es"};
  clientes.insert(un_cliente);

  id_cliente = clientes.searchByName("iván", "garzón segura");
  expect(id_cliente).toBe("1");

  try {
    id_cliente_falso = clientes.searchByName("antoñito", "garzón segura");
  }catch(error) {
    expect(error.message).toEqual('ClientNotFound');
    expect(error.status).toBe(404);
  }

  expect(clientes.db["clientes"][id_cliente]).toEqual(un_cliente);
});

test('Busca por DNI correctamente', () => {
  var un_cliente = {nombre:"Iván",apellidos:"Garzón Segura",dni:"1234567S",email:"ivangarzon98@correo.ugr.es"};
  clientes.insert(un_cliente);

  id_cliente = clientes.searchByDNI("1234567S");
  expect(id_cliente).toBe("1");

  try {
    id_cliente_falso = clientes.searchByDNI("987643245F");
  }catch(error) {
    expect(error.message).toEqual('ClientNotFound');
    expect(error.status).toBe(404);
  }

  expect(clientes.db["clientes"][id_cliente]).toEqual(un_cliente);
});

test('Función update falló', () => {
  var thrown_error = () => clientes.update("WRONG_ID", "id", "NEW_DNI");
  var expected_thrown_error = new Error("CannotUpdateClient");
  expect(thrown_error).toThrow(expected_thrown_error);
});

test('Función getCliente falló', () => {
  var thrown_error = () => clientes.getCliente("WRONG_ID");
  var expected_thrown_error = new Error("ClientNotFound");
  expect(thrown_error).toThrow(expected_thrown_error);
});

test('Función eliminarCliente falló', () => {
  var thrown_error = () => clientes.eliminarCliente("WRONG_ID");
  var expected_thrown_error = new Error("CannotDeleteClient");
  expect(thrown_error).toThrow(expected_thrown_error);
});

test('Función insert falló - MissingClientData', () => {
  var thrown_error = () => clientes.insert({});
  var expected_thrown_error = new Error("MissingClientData");
  expect(thrown_error).toThrow(expected_thrown_error);
});

test('Función insert falló - MissingClientData', () => {
  var un_cliente = {nombre:"Iván",apellidos:"Garzón Segura",dni:"1234567S",email:"ivangarzon98@correo.ugr.es", adicional:"test"};
  var thrown_error = () => clientes.insert(un_cliente);
  var expected_thrown_error = new Error("ClientDataError");
  expect(thrown_error).toThrow(expected_thrown_error);
});
test('Función load falló - fichero inexistente', () => {
  var pathInexistente = path.join(__dirname, './data/inexistente.json')
  var db = clientes.load(pathInexistente);
  var expected_json = {clientes:{}}
  expect(db).toStrictEqual(expected_json);
  fs.unlink(pathInexistente, (err) => {
    if (err) {
      console.error(err)
    }
  })
});
