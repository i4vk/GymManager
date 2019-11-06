Las herramientas utilizadas para llevar a cabo el proyecto serán las siguientes:

  - Lenguaje de programación: **Javascript**.  
  Más concretamente, usaremos *Node.JS*, que es un entorno de ejecución para desarrollar con javascript en el lado del servidor.

  - Framework de aplicaciones web: **ExpressJS**.  
  Es el framework más usado sobre *nodejs* para trabajar con el protocolo http y para tener un sistema de rutas que nos permitirá implementar nuestra *API RESTful*.

  - Base de datos: **MongoDB**.
  Se usará una base de datos para almacenar toda la información de los clientes de forma permanente. En este caso, he decidido usar MongoDB, que es una base de datos NoSQL que nos permitirá llevar a cabo todas las tareas relacionadas con dicha base de datos.

  - Sistema de logs: **Morgan**.  
  Es importante mantener un registro de logs que vayan indicando qué está ocurriendo en cada momento en nuestro sistema. Si hay algún fallo, esto permite saber por ejemplo qué es lo que ha pasado, y dónde ha fallado exactamente.  
  En este caso, he decidido utilizar la biblioteca *Morgan*.

  - Test:

    - **Jest**. Es necesario comprobar el correcto funcionamiento de nuestros programas antes de poder desplegarlos, para así tener la certeza de que aquello que desplegamos hace correctamente la función que le ha sido encomendada. Para ello, vamos a utilizar la biblioteca *Jest*, que nos permite justamente realizar test que todo lo que implementemos deberá ser capaz de pasar, antes de poder ser desplegado.  
    La decisión de usar jest y no usar mocha viene dada del hecho de que jest es un paquete más simple que mocha, pero que sin embargo, para el proyecto que nosotros tenemos entre manos, será totalmente válido.

    - **Supertest**. Supertest es un framework que combinaremos con *Jest* para poder testear de esta manera nuestra api REST. Este framework nos añade funcionalidades para poder hacer peticiones a nuestra api sin necesidad de tener que levantar el servidor.  
    Dado que para ejecutar los test no nos interesa tener que levantar el servidor y después pararlo, entonces *Supertest* es nuestra solución.  
    A partir de estas peticiones a nuestra api, podremos comprobar posteriormente el correcto funcionamiento de la misma, además de que el resultado obtenido es el esperado.

  - **Travis-CI** para la integración continua, junto con **Shippable**.  
  A la hora de implementar un sistema, es importante comprobar su correcto funcionamiento antes de que este sea desplegado. Un servicio que no ha sido testeado no se puede considerar un servicio que funciona. Por lo tanto, para comprobar que se cumplen los requisitos funcionales deseados, es necesario crear unos test que comprueben el correcto funcionamiento del sistema cada vez que se realiza una modificación del sistema.  
  Para poder automatizar la ejecución de estos test para que cada vez que hagamos un push al repositorio se compruebe si se pasan dichos test, lo que se utiliza son herramientas como *Travis* por ejemplo.  
  La elección de *Travis* viene dada porque es el sistema de integración continua con mas popularidad, y además posee una fácil integración con github.  
  Por otro lado, además, he decidido activar la integración continua en *Shippable*, con el objetivo de aprender también a usar otro servicio que no sea el propio *Travis*  
  Como extra, he decidido instalar **coveralls** con el objetivo de ver qué porcentaje de código está siendo realmente testeado.

Por otro lado, como herramienta de construcción he decidido usar la herramienta *npm* ya incluida con nodeJS, dado que para el uso que se le va a dar a la clase implementada, este es totalmente válido y funcional, ya que nos permite instalar las dependencias necesarias, ejecutar los test, etc. Todo esto, estará descrito en el archivo *package.json*, que será la descripción que realmente permitirá a *npm* construir la infraestructura.
