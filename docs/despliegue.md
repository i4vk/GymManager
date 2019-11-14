# Heroku

He decidido desplegar primero en heroku debido a su simplicidad y dado que no es necesario añadir una tarjeta de crédito para poder desplegar de manera gratuita.

Posteriormente intentaré hacer un despliegue en azure, pero para comenzar a habituarme con algún PaaS, he decidido hacerlo primero en Heroku.

Lo primero que debemos hacer para desplegarlo es descargarnos el CLI propio de Heroku, y posteriormente hacer login a nuestra cuenta de Heroku de la siguiente manera:

        $ heroku login

Tras esto, se abrirá una pestaña en nuestro navegador donde tendremos que iniciar sesión con nuestras credenciales de Heroku. Una vez hecho esto, nos indicará que hemos iniciado sesión correctamente y podremos continuar.

Ahora, lo que debemos hacer es crear nuestra app en heroku. Para ello, ejecutamos lo siguiente:

        $ heroku create

Esto nos creará una app de nombre aleatorio, que podremos modificar más adelante de la siguiente manera:

        $ heroku apps:rename gym-manager-iv-1920

Dado que no le hemos especificado ningún *buildpack*, heroku tomará uno por defecto que una stack para nuestro lenguaje predeterminado, en este caso *Node.js*. Sin embargo, este buildpack no tiene instalado por defecto la herramienta de construcción que yo utilizado, en este caso *Gulp*. Por lo tanto tenemos dos opciones, una es buscar un buildpack ya creado en github que integre esta herramienta de construcción, o crear uno nosotros mismos.

En este caso, dado que los buildpacks que había en internet no se ajustaban exactamente a lo que yo quería, he decidido tomar el buildpack oficial de heroku para *Node* y hacerle una modificación para añadir la funcionalidad que necesito. Para ello, he realizado un *fork* al repositorio del buildpack de *Node* a mi perfil de github. Posteriormente lo he clonado localmente, y he hecho la modificación necesaria. Un buildpack consta principalmente de tres scripts, *compile*, *detect* y *release*. En este caso, únicamente he tenido que modificar el script *compile*, para añadir una orden que instale gulp globalmente. Finalmente, una vez añadidos los cambios al repositorio de github, lo único que debemos hacer es indicarle a heroku que al desplegar la aplicación tome nuestro buildpack como referencia de la siguiente manera:

        $ heroku buildpacks:set https://github.com/i4vk/heroku-buildpack-nodejs

> **_NOTA:_**  Si se desea consultar, el repositorio del buildpack es el siguiente: [https://github.com/i4vk/heroku-buildpack-nodejs](https://github.com/i4vk/heroku-buildpack-nodejs)  
> Más concretamente, el cambio realizado se encuentra en la línea 263 del archivo *bin/compile*.

Una vez hecho esto, ya podemos crear el **Procfile**, que contendrá lo siguiente:

        web: gulp start-simple

Esto indicará a heroku lo que deberá ejecutar para arrancar el servidor.  
En este caso, arrancará con la tarea *start-simple* de gulp. Esta tarea la he añadido ya que heroku no necesita arrancar con pm2, ya que él mismo implementa balanceo de carga y el arranque de varias instancias. Por lo tanto esta tarea lo único que hace es arrancar el servidor sin pm2.

Una vez hecho esto, ya podríamos desplegar la aplicación ejecutando lo siguiente:

        $ git push heroku master

Sin embargo, existe una manera de no tener que subir los cambios a heroku manualmente, y que sea github el encargado de hacerlo siempre que se suban los cambios al repositorio, y se pasen los test.

Para ello, debemos ir a la configuración de la app desde la web de heroku, y en el apartado *Deploy* indicamos que se conecte con *GitHub*. Iniciamos sesión con nuestros datos de github, seleccionamos el repositorio y le activamos el despliegue automático, marcando la opción de esperar a la integración continua antes de realizar el despliegue. Finalmente, la configuración quedaría de la siguiente manera:

![](./images/despliegue_automatico_heroku.png)

De esta manera ya tendríamos totalmente configurado el despliegue automático en Heroku.