~~~
{
  "name": "gymmanager",     #Nombre del proyecto
  "version": "1.0.0",       #Versión del proyecto
  "description": "Sistema para manejar clientes de un gimnasio.",     #Descripción
  "main": "index.js",       #Fichero principal
  "scripts": {
    "start": "nodemon index.js",  #Inicializa estructura del proyecto
    "test": "jest", Ejecuta los test
    "coveralls": "jest --coverage --coverageReporters=text-lcov | coveralls"  
            #Comprueba la cobertura de los test sobre el código
  },
  "author": "Iván Garzón Segura",     #Autor del proyecto
  "license": "GPL-3.0", "Licencia del proyecto"
  "dependencies": {     #Módulos necesarios para ejecutar el proyecto
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "ejs": "~2.6.1",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "morgan": "~1.9.1"
  },
  "devDependencies": {      #Módulos necesarios para el desarrollo del proyecto
    "coveralls": "^3.0.6",
    "jest": "^24.9.0",
    "jsdoc": "^3.6.3",
    "nodemon": "^1.14.12"
  }
}
~~~
