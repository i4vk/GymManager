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
  - Framework de aplicaciones web: **Flask**.
  - **Virtualenv** para crear el entorno virtual sobre el que trabajar.
  - Base de datos: **MongoDB**.
  - Sistema de logs: **Logging** (módulo de python)
  - Test: **Unittest**
  - **Travis-CI** para la integración continua.

## Documentación

*Coming soon.*

## Instalación

*Coming soon.*
