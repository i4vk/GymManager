Para la integración continua he utilizado tanto Travis como Shippable. En ambos, el funcionamiento es muy parecido, aunque sus ficheros tengan algunas diferencias en la sintaxis.

A *grosso modo*, lo que hacemos en estas herramientas de integración continua consiste en declarar el lenguaje que usaremos, en este caso *nodejs*. Posteriormente, indicamos las versiones de este lenguaje que testearemos.  
Vamos a testear dos versiones de *nodejs*, la más actual y la estable. La más actual es la *12.10.0*, y la estable es la *10.16.3*.

Posteriormente, indicamos las ramas sobre las que se ejecutarán estas herramientas. En este caso, únicamente lo vamos a utilizar sobre la rama master, que será la única donde se están implementando los cambios en este momento.

Antes de poder ejecutar nada, dado que la herramienta de construcción no viene instalada por defecto, deberemos indicar que se debe instalar *gulp* antes de comenzar a ejecutar las tareas de construcción y test. Además, es necesario instalar todas las dependencias del proyecto con *npm install* antes de poder ejecutar cualquier cosa dado que gulp utilizar algunas de esas dependencias.

Finalmente, se ejecutan las tareas que deberemos llevar a cabo para poder ejecutar los test. En este caso, primero debemos instalar todas las dependencias, y posteriormente ejecutaremos los test.

Adicionalmente, en travis se ha añadido un script para comprobar la cobertura de los test sobre el código, de manera que en el *README.md* del proyecto podamos ver un *badge* donde veremos el porcentaje de esta cobertura.

# Travis

Indicamos que para ejecutar las órdenes, es necesario que se haga como administrador. Esto es debido a que docker así lo requiere. Además, indicamos que se debe arrancar el servicio de Docker (para el despliegue).
~~~
sudo: 'required'
services:
  - 'docker'
~~~

Lenguaje utilizado para la integración continua.
~~~
language: node_js
~~~

Version del lenguaje utilizada para probar la aplicación.
~~~
node_js:
  - 10.16.3
~~~

Ramas del repositorio donde se va a realizar la integración continua. En este caso, únicamente master.
~~~
branches:
  only:
    - master
~~~

Antes de poder ejecutar las tareas de construcción, es necesario instalar las dependencias necesarias, además del propio gulp globalmente para que todo funciones correctamente. Esto se hace ejecutando lo siguiente:
~~~
before_script:
  - npm install
  - npm install -g gulp
~~~

Scripts que se ejecutarán a la hora de realizar la integración continua. En este caso, primero se testea y posteriormente se comprueba la cobertura de los test sobre el código.
~~~
script:
  - gulp test
  - gulp coveralls
~~~

La cobertura del código se podrá observar en un *badge* al principio del archivo *README.md*.

Dado que se realizará un despliegue del contenedor en DockerHub, indicamos que dicho despliegue se realice usando el script [docker_push.sh](https://github.com/i4vk/GymManager/blob/master/docker_push.sh). Esto se realizará únicamente desde la rama *master*.
~~~
deploy:
  provider: script
  script: sh docker_push.sh
  on:
    branch: master
~~~

# Shippable

Lenguaje utilizado para  la integración continua.
~~~
language: node_js
~~~

Versiones utilizadas para los test, en este caso 10.16.3 y 12.10.0. La primera de ellas por ser la estable, y la segunda por ser la más reciente.
~~~
node_js:
  - "12.10.0"
  - 10.16.3
~~~

Ramas del repositorio donde se va a realizar la integración continua. En este caso, únicamente master.
~~~
branches:
  only:
    - master
~~~

Antes de poder ejecutar las tareas de construcción, es necesario instalar las dependencias necesarias, además del propio gulp globalmente para que todo funciones correctamente. Esto se hace ejecutando lo siguiente:
~~~
before_install:
  - npm install
  - npm install -g gulp
~~~

Posteriormente, una vez instalado gulp, se ejecutan las tareas de construcción y de test.
~~~
script:
  - gulp test
~~~
