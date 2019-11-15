var GymManager = require('../src/gymManager.js');
var path = require('path')

var clientes = new GymManager(path.join(__dirname, './data/database.json'));
var fs=require('fs');

beforeEach(() => {
  clientes.clear();
});

test('Carga archivo correctamente', () => {
  clientes.load(path.join(__dirname, "./data/prueba_io.json"));
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

  clientes.load("./test/data/temp.json");
  fs.unlink("./test/data/temp.json", (err) => {
    if (err) {
      console.error(err);
      return
    }
  });

  expect(clientes.db).toEqual(db_esperada);
});
