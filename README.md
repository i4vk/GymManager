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

    $ npm install

Dado que gulp necesita algunas dependencias dentro del *gulpfile.js*, no es posible instalar los paquetes usando gulp install. Esta es la razón por la que es necesario hacer *npm install*.

## Uso

Para iniciar el servidor, ejecutaremos:

    $ gulp start &

Esto creará una instancia corriendo del servidor. Es necesario poner el símbolo *'&'* al final del comando para que el terminal no se quede bloqueado, y así poder seguir ejecutando órdenes.

Si queremos detenerla, ejecutaremos lo siguiente:

    $ gulp stop

Una vez arrancado el servidor, ya podemos empezar a hacer peticiones a la dirección *127.0.0.1:8080/*.

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

# Enlaces a la aplicación

Despliegue: https://gym-manager-iv-1920.herokuapp.com/

Despliegue 2: https://gymmanager-iv-1920.azurewebsites.net/

Contenedor: https://gym-manager-iv-1920.herokuapp.com/

Contenedor 2: https://gym-manager-iv.azurewebsites.net/

Docker Hub: https://hub.docker.com/r/i4vk/gymmanager

Provision: provision/playbook.yml

## Documentación

- Clase principal: [GymManager](https://i4vk.github.io/GymManager/gymManager/GymManager.html)  
- API REST: [Endpoints](https://i4vk.github.io/GymManager/rest/index.html)  
- Herramientas utilizadas: [Herramientas](https://i4vk.github.io/GymManager/herramientas)  
- Herramienta de construcción: [Gulpfile](https://i4vk.github.io/GymManager/doc_herramienta_construccion)  
- Integración continua: [CI](https://i4vk.github.io/GymManager/doc_CI)  
- Hooks Git: [Hooks](https://i4vk.github.io/GymManager/doc_hooks)  
- Despliegue en PaaS: [Despliegue](https://i4vk.github.io/GymManager/despliegue)
- Docker y DockerHub: [Docker](https://i4vk.github.io/GymManager/doc_docker)
- Despliegue en PaaS mediante Docker: [Docker PaaS](https://i4vk.github.io/GymManager/despliegue_docker)
- Instanciación y aprovisionamiento de VM: [Aprovisionamiento](https://i4vk.github.io/GymManager/doc_VM)