var GymManager = require('../src/gymManager.js');

var clientes = new GymManager('./test/data/database.json');

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
