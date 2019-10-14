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

Instalación del sistema.
~~~
install:
  - npm install
~~~

Scripts que se ejecutarán a la hora de realizar la integración continua. En este caso, primero se testea y posteriormente se comprueba la cobertura de los test sobre el código.
~~~
script:
  - npm test
  - npm run coveralls
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

Pasos a realizar para la integración continua, en este caso primero instalar (contruir) y después ejecutar los test.
~~~
build:
  ci:
    - npm install
    - npm test
~~~
