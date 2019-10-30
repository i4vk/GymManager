define({ "api": [
  {
    "type": "delete",
    "url": "/clientes/id/:id",
    "title": "DELETE /clientes/id/:id",
    "description": "<p>Elimina un cliente con una ID determinada</p>",
    "group": "Clientes",
    "name": "DeleteClientes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "id",
            "description": "<p>ID del cliente a eliminar</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>El cliente se ha eliminado correctamente</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"CannotDeleteClient\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Clientes"
  },
  {
    "type": "get",
    "url": "/clientes/dni/:dni",
    "title": "GET /clientes/dni/:dni",
    "description": "<p>Obtiene cliente mediante DNI</p>",
    "group": "Clientes",
    "name": "GetClienteByDNI",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "dni",
            "description": "<p>DNI del cliente</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"ClientNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Clientes",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del cliente</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "apellidos",
            "description": "<p>Apellidos del cliente</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dni",
            "description": "<p>DNI del cliente</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Dirección de correo del cliente</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"nombre\": \"Rodrigo\",\n  \"apellidos\": \"Rodríguez Fernández\",\n  \"dni\": \"12345678S\",\n  \"email\": \"foo@gmail.es\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/clientes/id/:id",
    "title": "GET /clientes/id/:id",
    "description": "<p>Obtiene cliente mediante ID</p>",
    "group": "Clientes",
    "name": "GetClienteByID",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID único de un cliente</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Clientes",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del cliente</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "apellidos",
            "description": "<p>Apellidos del cliente</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dni",
            "description": "<p>DNI del cliente</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Dirección de correo del cliente</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"nombre\": \"Rodrigo\",\n  \"apellidos\": \"Rodríguez Fernández\",\n  \"dni\": \"12345678S\",\n  \"email\": \"foo@gmail.es\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/clientes/name",
    "title": "GET /clientes/name",
    "description": "<p>Obtiene cliente mediante nombre y apellidos</p>",
    "group": "Clientes",
    "name": "GetClienteByName",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del cliente</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "apellidos",
            "description": "<p>Apellidos del cliente</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "endpoint: http://localhost/clientes/name\n\nbody:\n{\n  \"nombre\": \"Peter\",\n  \"apellidos\": \"Johannson Steven\"\n}",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"ClientNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Clientes",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del cliente</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "apellidos",
            "description": "<p>Apellidos del cliente</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dni",
            "description": "<p>DNI del cliente</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Dirección de correo del cliente</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"nombre\": \"Rodrigo\",\n  \"apellidos\": \"Rodríguez Fernández\",\n  \"dni\": \"12345678S\",\n  \"email\": \"foo@gmail.es\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/clientes",
    "title": "GET /clientes",
    "description": "<p>Obtiene la lista completa de clientes</p>",
    "group": "Clientes",
    "name": "GetClientes",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "Clientes",
            "description": "<p>Lista completa de clientes</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Clientes"
  },
  {
    "type": "post",
    "url": "/clientes",
    "title": "POST /clientes",
    "description": "<p>Crea un nuevo cliente</p>",
    "group": "Clientes",
    "name": "PostClientes",
    "examples": [
      {
        "title": "Example usage:",
        "content": "endpoint: http://localhost/clientes\n\nbody:\n{\n  \"nombre\": \"Rodrigo\",\n  \"apellidos\": \"Rodríguez Fernández\",\n  \"dni\": \"12345678S\",\n  \"email\": \"foo@correo.es\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "int",
            "optional": false,
            "field": "id",
            "description": "<p>ID del cliente</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"id\":3\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Clientes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del cliente</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "apellidos",
            "description": "<p>Apellidos del cliente</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "dni",
            "description": "<p>DNI del cliente</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Dirección de orreo del cliente</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/clientes/id/:id",
    "title": "PUT /clientes/id/:id",
    "description": "<p>Modifica los datos de alguno de los clientes</p>",
    "group": "Clientes",
    "name": "PutClientes",
    "examples": [
      {
        "title": "Example usage:",
        "content": "endpoint: http://localhost/clientes/id/1\n\nbody:\n{\n  \"nombre\": \"Rodrigo\",\n  \"dni\": \"12345678S\"\n}",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"CannotUpdateClient\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Clientes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del cliente</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "apellidos",
            "description": "<p>Apellidos del cliente</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "dni",
            "description": "<p>DNI del cliente</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Dirección de orreo del cliente</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201 Created": [
          {
            "group": "201 Created",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del cliente</p>"
          },
          {
            "group": "201 Created",
            "type": "String",
            "optional": false,
            "field": "apellidos",
            "description": "<p>Apellidos del cliente</p>"
          },
          {
            "group": "201 Created",
            "type": "String",
            "optional": false,
            "field": "dni",
            "description": "<p>DNI del cliente</p>"
          },
          {
            "group": "201 Created",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Dirección de correo del cliente</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"nombre\": \"Rodrigo\",\n  \"apellidos\": \"Rodríguez Fernández\",\n  \"dni\": \"12345678S\",\n  \"email\": \"foo@correo.es\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/status",
    "title": "GET /status",
    "description": "<p>Comprueba estado del servidor</p>",
    "group": "Status",
    "name": "GetStatus",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "status",
            "description": "<p>Estado del servidor</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/index.js",
    "groupTitle": "Status"
  }
] });
