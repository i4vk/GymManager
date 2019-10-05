var GymManager = require('../src/gymManager.js');

var clientes = new GymManager('./test/data/database.json');

beforeEach(() => {
  clientes.clear();
});

test('Carga archivo correctamente', () => {
  clientes.load("./test/data/prueba_io.json");
  db_esperada = {
    "clientes": {
      "1": {
        "nombre": "Antonio",
        "apellidos": "Papaya Telescopio",
        "dni": "1234567S",
        "email": "papaya@correo.ugr.es"
      },
      "2": {
        "nombre": "Iván",
        "apellidos": "Garzón Segura",
        "dni": "1234748S",
        "email": "telescopio@correo.ugr.es"
      }
    }
  };

  expect(clientes.db).toEqual(db_esperada);
});

test('Guarda correctamente', async () => {
  var un_cliente = {nombre:"Iván",apellidos:"Garzón Segura",dni:"1234567S",email:"ivangarzon98@correo.ugr.es"};
  var un_cliente2 = {nombre:"Antonio",apellidos:"Papaya Telescopio",dni:"1234567S",email:"papaya@correo.ugr.es"};

  clientes.insert(un_cliente);
  clientes.insert(un_cliente2);

  await clientes.save("./test/data/temp.json");
  db_esperada = clientes.db;

  clientes.clear();
  clientes.load("./test/data/temp.json");

  expect(clientes.db).toEqual(db_esperada);
});
