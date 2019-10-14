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
