# GymManager

## Gestor de usuarios y empleados de un gimnasio

La idea es crear una API que permita manejar una base de datos en la cual se podrán almacenar datos de los clientes suscritos al gimnasio, los cuales podrán tener además distintas tarifas cada uno. Por ejemplo, clientes completos, con acceso al gimnasio todos los días de la semana, o clientes básicos, con acceso un número de días limitado.

De dichos clientes se almacenarán distintos datos que podrían ser útiles, como son por ejemplo del nombre completo, el teléfono, el DNI, y el número de socio, que será único para cada uno de los clientes. También será importante almacenar la tarifa asociada a dicho cliente.

## Funcionalidades

Este microservicio formaría parte de una aplicación completa que maneje el sistema informático completo de un gimnasio, tales como los accesos al gimnasio, el registro de clientes, etc.

Sin embargo, la funcionalidad de este microservicio que vamos a desarrollar durante la asignatura va a encargarse únicamente de manejar la base de datos de clientes.  
Para llevar a cabo esta función, debe disponer de las siguientes funcionalidades:

  - Crear una nueva base de datos de clientes.
  - Añadir un nuevo cliente a la base de datos.
  - Modificar los datos de alguno de los clientes ya creados.
  - Eliminar clientes de la base de datos.
  - Consultar la lista completa de clientes.
  - Consultar los datos de un cliente específico.

## Implementación

Las herramientas utilizadas para llevar a cabo el proyecto serán las siguientes:

  - Lenguaje de programación: **Python3**.  
  Se ha decidido utilizar dado que es un lenguaje intuitivo y sencillo que, junto con el microframework flask, nos van a permitir crear el sistema que buscamos.

  - Framework de aplicaciones web: **Flask**.  
  Había dos opciones para el uso del Framework a utilizar. El primero de ellos era Flask, y el otro era Django. Finalmente he decidido usar Flask dado que la magnitud del sistema no es muy grande, y podemos abordarlo perfectamente con este microframework. Django es algo más completo.

  - **Virtualenv** para crear el entorno virtual sobre el que trabajar.  
  Es importante trabajar con entornos virtuales para así poder trabajar con distintas versiones de librerías, etc, sin que esto afecte al sistema general ni a otros proyectos distintos. Por ello, he decidido utilizar *virtualenv* para crear dicho entorno virtual sobre el que trabajar e instalar todas las librerías a utilizar.

  - Base de datos: **MongoDB**.
  Se usará una base de datos para almacenar toda la información de los clientes de forma permanente. En este caso, he decidido usar MongoDB, que es una base de datos NoSQL que nos permitirá llevar a cabo todas las tareas relacionadas con dicha base de datos.

  - Sistema de logs: **Logging** (módulo de python).  
  Es importante mantener un registro de logs que vayan indicando qué está ocurriendo en cada momento en nuestro sistema. Si hay algún fallo, esto permite saber por ejemplo qué es lo que ha pasado, y dónde ha fallado exactamente.  
  En este caso, he decidido utilizar el módulo *logging* de python, por su simplicidad y claridad a la hora de implementarlo.

  - Test: **Unittest**.  
  Es necesario comprobar el correcto funcionamiento de nuestros programas antes de poder desplegarlos, para así tener la certeza de que aquello que desplegamos hace correctamente la función que le ha sido encomendada.  
  Para ello, vamos a utilizar la biblioteca de python *Unittest*, que nos permite justamente realizar test que todo lo que implementemos deberá ser capaz de pasar, antes de poder ser desplegado.

  - **Travis-CI** para la integración continua.

## Documentación

*Coming soon.*

## Instalación

*Coming soon.*
