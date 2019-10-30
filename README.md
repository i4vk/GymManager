[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) [![Build Status](https://travis-ci.org/i4vk/GymManager.svg?branch=master)](https://travis-ci.org/i4vk/GymManager) [![Run Status](https://api.shippable.com/projects/5d9ca4ed27d7a0000752c711/badge?branch=master)]() [![Coverage Status](https://coveralls.io/repos/github/i4vk/GymManager/badge.svg?branch=master)](https://coveralls.io/github/i4vk/GymManager?branch=master)

# GymManager

## Gestor de usuarios y empleados de un gimnasio

La idea es crear una API que permita manejar una base de datos en la cual se podrán almacenar datos de los clientes suscritos al gimnasio, los cuales podrán tener además distintas tarifas cada uno. Por ejemplo, clientes completos, con acceso al gimnasio todos los días de la semana, o clientes básicos, con acceso un número de días limitado.

De dichos clientes se almacenarán distintos datos que podrían ser útiles, como son por ejemplo del nombre completo, el teléfono, el DNI, y el número de socio, que será único para cada uno de los clientes. También será importante almacenar la tarifa asociada a dicho cliente.

## Instalación

buildtool: gulpfile.js

Para instalarlo, primero de todo es necesario clonar el repositorio:

    $ git clone https://github.com/i4vk/GymManager.git

Antes de nada, necesitamos tener instalado gulp. Si no es así, necesitamos ejecutar:

    $ npm -g install gulp

Posteriormente, instalamos todas las dependencias:

    $ gulp install

## Uso

Para iniciar el servidor, ejecutaremos:

  $ gulp start&

Esto creará una instancia corriendo del servidor. Si queremos detenerla, ejecutaremos lo siguiente:

  $ gulp stop

## Test

Finalmente, si queremos ejecutar los test, escribiremos el siguiente comando:

    $ gulp test

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

## Documentación

- Clase principal: [GymManager](https://i4vk.github.io/GymManager/gymManager/GymManager.html)

- API REST: [Endpoints](https://i4vk.github.io/GymManager/rest/index.html)

- Herramientas utilizadas: [Herramientas](https://github.com/i4vk/GymManager/blob/master/docs/herramientas.md)

- Herramienta de construcción: [Gulpfile](https://github.com/i4vk/GymManager/blob/master/docs/doc_herramienta_construccion.md)

- Integración continua: [CI](https://github.com/i4vk/GymManager/blob/master/docs/doc_CI.md)

- Hooks Git: [Hooks](https://github.com/i4vk/GymManager/blob/master/docs/doc_hooks.md)
