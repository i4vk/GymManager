[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) [![Build Status](https://travis-ci.org/i4vk/GymManager.svg?branch=master)](https://travis-ci.org/i4vk/GymManager) [![Run Status](https://api.shippable.com/projects/5d9ca4ed27d7a0000752c711/badge?branch=master)]() [![Coverage Status](https://coveralls.io/repos/github/i4vk/GymManager/badge.svg?branch=master)](https://coveralls.io/github/i4vk/GymManager?branch=master)

# GymManager

## Gestor de usuarios y empleados de un gimnasio

La idea es crear una API que permita manejar una base de datos en la cual se podrán almacenar datos de los clientes suscritos al gimnasio, los cuales podrán tener además distintas tarifas cada uno. Por ejemplo, clientes completos, con acceso al gimnasio todos los días de la semana, o clientes básicos, con acceso un número de días limitado.

De dichos clientes se almacenarán distintos datos que podrían ser útiles, como son por ejemplo del nombre completo, el teléfono, el DNI, y el número de socio, que será único para cada uno de los clientes. También será importante almacenar la tarifa asociada a dicho cliente.

## Instalación

Para instalarlo, primero de todo es necesario clonar el repositorio:

    $ git clone https://github.com/i4vk/GymManager.git

Posteriormente, instalamos todas las dependencias:

    $ npm install

## Test

Finalmente, si queremos ejecutar los test, escribiremos el siguiente comando:

    $ npm test

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

## Descripción de la clase

El servicio completo del que este microservicio formaría parte consiste en la gestión completa de un gimnasio. Es decir, la gestión de los empleados, los clientes, las tarifas, etc.

Sin embargo, nosotros nos vamos a centrar exclusivamente en el microservicio que implementa la gestión de la base de datos únicamente de clientes.  
Esta clase posee métodos para llevar a cabo todas las funcionalidades comentadas anteriormente, tales como añadir un nuevo cliente, modificar uno ya creado, o eliminarlo.  
Además de eso, también posee métodos para cargar una base de datos sobre la que trabajar y para guardar los cambios hechos en la misma.

Los test implementados sobre dicha clase implementan una comprobación para cada uno de los métodos de la clase, y comprueban si realmente producen el resultado esperado con una serie de pruebas.

Se puede encontrar la documentación específica de la clase en [este enlace](https://github.com/i4vk/GymManager/tree/master/doc/GymManager.html).

## Herramientas utilizadas

Las herramientas utilizadas para llevar a cabo este proyecto serán básicamente el lenguaje **Javascript**, más concretamente el entorno *nodeJS*, junto con las siguientes herramientas:

  - Framework de aplicaciones web: **ExpressJS**.  

  - Base de datos: **MongoDB**.

  - Sistema de logs: **Morgan**.  

  - Test: **Jest**.  

  - **Travis-CI** para la integración continua, junto con **Shippable**.

  Para entrar más en detalle, se puede consultar [este enlace de la documentación](https://github.com/i4vk/GymManager/blob/master/doc/herramientas.md) donde se explica por qué se han elegido exactamente algunas de estas herramientas.
