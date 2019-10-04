var GymManager = require('../src/gymManager.js');

var clientes = new GymManager('./test/data/database.json');

beforeEach(() => {
  clientes.load('./test/data/database.json');
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
