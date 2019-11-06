Para la integración continua he utilizado tanto Travis como Shippable. En ambos, el funcionamiento es muy parecido, aunque sus ficheros tengan algunas diferencias en la sintaxis.

A *grosso modo*, lo que hacemos en estas herramientas de integración continua consiste en declarar el lenguaje que usaremos, en este caso *nodejs*. Posteriormente, indicamos las versiones de este lenguaje que testearemos.  
Vamos a testear dos versiones de *nodejs*, la más actual y la estable. La más actual es la *12.10.0*, y la estable es la *10.16.3*.

Posteriormente, indicamos las ramas sobre las que se ejecutarán estas herramientas. En este caso, únicamente lo vamos a utilizar sobre la rama master, que será la única donde se están implementando los cambios en este momento.

Antes de poder ejecutar nada, dado que la herramienta de construcción no viene instalada por defecto, deberemos indicar que se debe instalar *gulp* antes de comenzar a ejecutar las tareas de construcción y test. Dado que gulp es una dependencia del proyecto, es necesario instalar todas las dependencias del proyecto con *npm install* antes de poder ejecutar cualquier cosa.

Finalmente, se ejecutan las tareas que deberemos llevar a cabo para poder ejecutar los test. En este caso, primero debemos instalar todas las dependencias, y posteriormente ejecutaremos los test.

Adicionalmente, en travis se ha añadido un script para comprobar la cobertura de los test sobre el código, de manera que en el *README.md* del proyecto podamos ver un *badge* donde veremos el porcentaje de esta cobertura.

# Travis

Lenguaje utilizado para la integración continua.
~~~
language: node_js
~~~

Versiones utilizadas para los test, en este caso 10.16.3 y 12.10.0. La primera de ellas por ser la estable, y la segunda por ser la más reciente.
~~~
node_js:
  - 12.10.0
  - 10.16.3
~~~

Ramas del repositorio donde se va a realizar la integración continua. En este caso, únicamente master.
~~~
branches:
  only:
    - master
~~~

Antes de poder ejecutar las tareas de la herramienta de construcción, es necesario instalar previamente todos las dependencias necesarias ejecutando la tarea siguiente:
~~~
before_script:
  - npm install
~~~

Scripts que se ejecutarán a la hora de realizar la integración continua. En este caso, primero se testea y posteriormente se comprueba la cobertura de los test sobre el código.
~~~
script:
  - gulp test
  - gulp coveralls
~~~

La cobertura del código se podrá observar en un *badge* al principio del archivo *README.md*.

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

Antes de poder ejecutar las tareas de construcción, es necesario instalar las dependencias necesarias ejecutando lo siguiente:
~~~
before_install:
  - npm install
~~~

Posteriormente, una vez instalado gulp, se ejecutan las tareas de construcción y de test.
~~~
script:
  - gulp test
~~~
