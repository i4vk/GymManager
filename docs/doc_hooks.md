Para simplificar el proceso de la compilación de la documentación tanto de la api rest como de la clase gymManager he decidido crear un hook de git que cada vez que se haga un commit, compruebe si se han cambiado tanto el archivo *src/gymManager.js* como *src/routes/index.js* y además han sido añadidos al stage para el commit. Si es así, entonces ejecuta *gulp doc* para recompilar toda la documentación.  
La razón de que se compruebe si se han añadido estos archivos al commit es que en ellos están descritos los métodos que se compilarán para generar el correspondiente html de documentación del archivo.

El archivo que hace esta función es [pre-commit](https://github.com/i4vk/GymManager/blob/master/docs/pre-commit).  
Este archivo deberá estar situado dentro de *.git/hooks*, y se le deben dar permisos de ejecución. De esta manera, cada vez que hagamos una modificación con su respectivo commit sobre estos archivos, entonces se compilarán los archivos de documentación y posteriormente serán añadidos al mismo commit.