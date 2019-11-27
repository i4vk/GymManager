# Dockerfile

Para añadir virtualización a nuestro proyecto, y que este pueda ser desplegado más fácilmente, lo primero que debemos hacer es construir la propia imagen de Docker que contendrá nuestra aplicación.

El primer paso para ello consiste en crear un Dockerfile, que será el archivo de configuración a partir del cual se creará la imagen de la aplicación.  
En este archivo debemos indicar todos los pasos necesarios, así con la configuración necesaria para construir nuestro proyecto.  
Lo primero que debemos indicar en él es el sistema sobre el que se ejecutará virtualmente. En este caso, he decidido usar la versión oficial de *Node 10* sobre Alpine. Alpine es una distribución de Linux mucho menos pesada que las distribuciones de Ubuntu por ejemplo, por lo que de esta manera nuestro contenedor será bastante menos pesado que si hubieramos escogido dicha imagen.

        FROM node:10-alpine

Posteriormente, se indica alguna información del autor, pero esto es opcional.

        LABEL maintainer='Iván Garzón (ivangs98@gmail.com)'

Ahora es necesario definir el directorio de trabajo de nuestra aplicación dentro del sistema virtualizado, de la siguiente manera:

        WORKDIR /gymmanager

Posteriormente definimos el puerto en el que escuchará nuestra aplicación como una variable de entorno:

        ENV PORT 8080

A continuación, copiamos los archivos necesarios para poder poner en funcionamiento la aplicación al directorio de trabajo que definimos anteriormente. Es importante que únicamente copiemos los archivos que sean totalmente necesarios, porque añadir cosas de más hará que nuestra imagen sea más pesada.  

        COPY package.json ./
        COPY src ./src
        COPY gulpfile.js ./

En este caso, únicamente copiamos los archivos contenimos en el directorio *src*, que contiene los propios ficheros de la aplicación, y además de eso otros dos ficheros que son necesarios para poder arrancarla. Estos son el *package.json*, que contiene las dependencias de nuestra aplicación, y el *gulpfile.js*, que contiene las tareas necesarias para llevar a cabo el arranque de dicha aplicación.

Posteriormente instalamos las dependencias del proyecto de la siguiente manera:

        RUN npm install
        RUN install -g gulp

Sin embargo, esto instala también las dependencias de desarrollo, tales como las necesarias para compilar documentación, etc. Estas dependencias no son necesarias en producción, y únicamente añadirían tamaño a nuestra imagen. Por lo tanto, las eliminamos de la siguiente manera:

        RUN npm prune --production

Lo siguiente que haremos será indicar el comando que se usará para arrancar nuestra aplicación de la siguiente manera:

        CMD ["gulp", "start-simple"]

Y finalmente, *exponemos* el puerto en el que estará escuchando nuestra aplicación. Esto es importante dado que para hacer el posterior despliegue, algunos PaaS necesitan conocer el puerto de escucha para poder mapearlo posteriormente. Esto lo haremos de la siguiente manera:

    EXPOSE 8080