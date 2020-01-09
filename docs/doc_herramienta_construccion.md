Como herramienta de construcción he utilizado **Gulp** para automatizar todas las tareas posibles del proyecto. Estas tareas estarán implementadas en el archivo [gulpfile.js](https://github.com/i4vk/GymManager/blob/master/gulpfile.js).

En este archivo podemos ver las tareas relacionadas con la instalación y manejo del servidor, además de añadir también algunas tareas adicionales como por ejemplo una para compilar toda la documentación del proyecto.

Antes de ejecutar cualquier tarea de *gulp* necesitamos haber instalado todos los paquetes previamente con *npm install*, dado que necesitamos de algunas dependencias para que este funcione correctamente.

Las tareas disponibles son las siguientes:

- **gulp start**: Levanta el servidor para poder comenzar a hacerle peticiones REST, usando pm2.

- **gulp start-simple**: Levanta el servidor sin pm2, haciendo uso simplemente de node.

- **gulp stop**: Detiene el servidor.

- **gulp restart**: Reinicia el servidor.

- **gulp test**: Ejecuta los test del proyecto. Es necesario haber ejecutado *gulp install* previamente para poder ejecutar los test correctamente.

- **gulp coveralls**: Ejecuta la comprobación de la cobertura de los test sobre el código. No se puede utilizar en local, ya que es necesario que este proyecto esté en un repositorio seguido por [Coveralls](https://coveralls.io/). Por lo tanto, su utilidad vendrá en el momento de ejecutar los test en una herramienta de Integración Continua, en este caso Travis.

- **gulp doc**: Compila toda la documentación del proyecto y la almacena en el directorio docs/ haciendo una distinción entre cada uno de los archivos documentados. Por ahora, la documentación consistirá en una documentación de la clase principal, contenida en *docs/gymManager*, y posteriormente la documentación de la api REST contenida en *docs/rest*.

- **gulp vm-up**: Inicia la ejecución de la máquina virtual definida mediante *Vagrant*.

- **gulp vm-stop**: Detiene la ejecución de la anterior VM.

- **gulp vm-provision**: Realiza el aprovisionamiento de la máquina virtual comentada anteriormente.
