var GymManager = require('../src/gymManager.js');

var clientes = new GymManager('./src/database.json');

// var nuevo_cliente = {nombre:"Antonio",apellidos:"Papaya Telescopio",dni:"1234567S",email:"ivangarzon98@correo.ugr.es"};
// clientes.insertarCliente(nuevo_cliente);
//
// console.log(clientes.listarClientes());

beforeAll(() => {
  clientes.load('./src/database.json');
});

test('Inserta correctamente', () => {
  var ini_num_clientes = clientes.num_clientes;
  var nuevo_cliente = {nombre:"Antonio",apellidos:"Papaya Telescopio",dni:"1234567S",email:"ivangarzon98@correo.ugr.es"};
  clientes.insert(nuevo_cliente);

  var cliente = clientes.getCliente(clientes.num_clientes);
  expect(cliente).toEqual(nuevo_cliente);
  expect(clientes.num_clientes).toBe(ini_num_clientes+1);
});
