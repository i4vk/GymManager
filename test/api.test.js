const app = require('../src/app.js');
const supertest = require('supertest');
const request = supertest(app);

var nuevo_cliente = {nombre:"Rubén",apellidos:"Murcia Sevilla",dni:"987123S",email:"telescopio@correo.ugr.es"};

describe('/ and /status endpoints', () => {
  it('Get / endpoint', (done) => {
    supertest(app)
    .get('/')
    .expect(200, {status:"OK", ejemplo:{ruta:"/clientes", valor:{
      "1": {
        "nombre": "Iván",
        "apellidos": "Garzón Segura",
        "dni": "1234567S",
        "email": "ivangarzon98@correo.ugr.es"
      },
      "2": {
        "nombre": "Antonio",
        "apellidos": "Papaya Telescopio",
        "dni": "9999999V",
        "email": "modificado@hello.com"
      },
      "3": {
        "nombre": "Rodrigo",
        "apellidos": "Rodriguez",
        "dni": "987123S",
        "email": "telescopio@correo.ugr.es"
      }
    }}})
    .end(() => {
      done()
    })
  })
  it('Get /status endpoint', (done) => {
    supertest(app)
    .get('/status')
    .expect(200, {status:"OK", ejemplo:{ruta:"/clientes", valor:{
      "1": {
        "nombre": "Iván",
        "apellidos": "Garzón Segura",
        "dni": "1234567S",
        "email": "ivangarzon98@correo.ugr.es"
      },
      "2": {
        "nombre": "Antonio",
        "apellidos": "Papaya Telescopio",
        "dni": "9999999V",
        "email": "modificado@hello.com"
      },
      "3": {
        "nombre": "Rodrigo",
        "apellidos": "Rodriguez",
        "dni": "987123S",
        "email": "telescopio@correo.ugr.es"
      }
    }}})
    .end(() => {
      done()
    })
  })
})

describe('GET ruta inexistente', function() {
  test('Devuelve que la ruta no existe', async () => {
    return request.get('/inexistente').then(response => {
      expect(response.statusCode).toBe(404);
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    })
  });
})

describe('GET /clientes', function() {
  test('Obtiene lista de clientes correctamente', async () => {
    return request.get('/clientes').then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    })
  });
})

describe('GET /clientes/id', function() {
  test('Obtiene cliente específico por ID', async () => {
    return request.get('/clientes/id/1').then(response => {
      cliente_esperado = {
                          "nombre": "Iván",
                          "apellidos": "Garzón Segura",
                          "dni": "1234567S",
                          "email": "ivangarzon98@correo.ugr.es"
                        }
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
      expect(response.body).toEqual(cliente_esperado);
    })
  });
})

describe('GET /clientes/name/', function() {
  test('Obtiene cliente por nombre', async () => {
    var nombre_cliente = {"nombre": "Iván", "apellidos": "Garzón Segura"};
    return request.get('/clientes/name/').send(nombre_cliente).then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    })
  });
})

describe('GET /clientes/dni/', function() {
  test('Obtiene cliente por dni', async () => {
    return request.get('/clientes/dni/1234567S').then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    })
  });
})

describe('POST /clientes', function() {
  test('Inserta correctamente un cliente', async () => {
    return request.post('/clientes').send(nuevo_cliente).then(response => {
      expect(response.statusCode).toBe(201);
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    })
  });
})

describe('PUT /clientes/id', function() {
  test('Modifica un cliente correctamente', async () => {
    campos_modificados = {"dni":"9999999V", "email":"modificado@hello.com"};
    return request.put('/clientes/id/2').send(campos_modificados).then(response => {
      expect(response.statusCode).toBe(201);
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    })
  });
})

describe('DELETE /clientes/id', function() {
  test('Elimina cliente correctamente', async () => {
    return request.delete('/clientes/id/1').then(response => {
      expect(response.statusCode).toBe(200);
    })
  });
})
