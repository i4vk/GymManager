# Instanciación y aprovisionamiento

## Instanciación de la VM

**Vagrant** es una herramienta que nos permite, a través de un archivo de configuración, crear e instanciar una serie de máquinas virtuales las cuales tendrán todas la misma configuración.

Para ello necesitaremos crear un archivo llamado *Vagrantfile*, que contendrá lo siguiente:

~~~ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  # Identificador de la máquina virtual
  config.vm.define "GymManager"

  # SO utilizado
  config.vm.box = "ubuntu/bionic64"

  # Desactivamos las actualizaciones automáticas
  config.vm.box_check_update = false
  
  # Configuramos virtualbox como provider para nuestra VM
  config.vm.provider "virtualbox" do |vb|
    # Hacemos que no se active la interfaz gráfica
    vb.gui = false
    # Asignamos 1GB de memoria
    vb.memory = "1024"
  end

  # Indicamos provisionamiento a traves de ansible, con nuestro playbook
  config.vm.provision "ansible" do |ansible|
    # Ruta del fichero de inventario usado por ansible
    ansible.inventory_path = "provision/inventory"
    # Ruta del playbook de ansible
    ansible.playbook = "provision/playbook.yml"
  end
end
~~~

Como resumen de este archivo de configuración, vemos que estamos creando una única VM que se llamará *GymManager*, y hará uso de Ubuntu 18.04 LTS, dado que es lal última versión estable de ubuntu. Además, dado que nuestro proyecto ha sido desarrollado en el entorno de ubuntu, haremos uso de esta misma plataforma en nuestra VM.

Además de ello, hemos desactivado las actualizaciones automáticas para evitar que una actualización corrompa el sistema o nuestra aplicación. Es preferible realizar las actualizaciones manualmente.

Posteriormente, definimos el provider de la VM, que en este caso será *Virtualbox*. En este caso, en la configuración de dicho provider indicamos que no se arranque la interfaz gráfica, y le asignamos 1GB de memoria.

Finalmente, dado que posteriormente para el aprovisionamiento usaremos *Ansible*, debemos indicar dónde se encontrará el archivo de aprovisionamiento del mismo. En este caso, se encuentra en la ruta *provision/playbook.yml*.  
Además de ello, indicamos un archivo de inventario que hemos creado manualmente en el directorio *provision/inventory*. En este fichero, hemos definido un grupo de VMs llamado *gm* que posteriormente usaremos para hacer el aprovisionamiento. En este caso no sería totalmente necesario ya que el propio Vagrant crea un inventario sobre el que podríamos acceder a todas las máquinas virtuales creadas, pero no podríamos crear grupos de Ansible. Dado que únicamente tenemos una máquina virtual, no es necesario crear este grupo. Sin embargo, lo he creado por si en algún momento necesitamos escalabilidad.

Ahora ya podríamos arrancar la máquina virtual. Para ello, he creado las siguientes tareas en nuestro gestor de tareas, en este caso, gulp:

- **vm-start**: Arranca la máquina virtual.
- **vm-stop**: Detiene la ejecución de la VM.

En *vm-start* arrancamos la máquina con ```vagrant up --no-provision```. Con este comando hacemos que se arranque la máquina sin realizar el aprovisionamiento, ya que lo haremos más tarde manualmente.

Si quisiéramos acceder a nuestra VM que hemos creado, podríamos hacerlo con el siguiente comando:

    $ vagrant ssh

El propio *Vagrant* se encarga de crear un usuario por defecto, en este caso llamado *vagrant*, además de insertar la clave pública, para que podamos acceder sin necesidad de aportar una contraseña.

## Aprovisionamiento

Para el aprovisionamiento haremos uso de *Ansible*. Para ello, necesitamos definir un fichero llamado *playbook.yml*, que contendrá las tareas a llevar a cabo por ansible para realizar dicho aprovisionamiento.

Este fichero, contenido en el directorio *provision/*, contiene lo siguiente:

~~~ruby
---
# Tareas sobre los host del grupo 'gm'
- hosts: gm
  # Ajustamos el intérprete de ansible como python3
  vars:
    ansible_python_interpreter: /usr/bin/python3
  
  # Damos permisos de superusuario
  become: yes
  tasks:
    # Hacemos un update de los paquetes con apt
    - name: Actualiza lista de paquetes apt
      apt:
        update_cache: yes

    # Instalamos git
    - name: Instala git
      apt: 
        name: git

    # Instalamos node y npm
    - name: Instala node
      apt: 
        name:
          - nodejs
          - npm

    # Instalamos gulp globalmente
    - name: Instalar gulp
      npm:
        name: gulp
        global: yes

    # Instalamos pm2 globalmente
    - name: Instalar pm2
      npm:
        name: pm2
        global: yes
~~~

En general, lo que hacemos en este archivo es declarar una serie de tareas que se aplicarán sobre el grupo de VMs *gm*, definido anteriormente en el archivo de inventario de Vagrant.  
Posteriormente, ajustamos el intérprete en el que se apoyará ansible como el intérprete de Python3. En mi caso ha sido necesario ya que por la versión de Ansible, el intérprete por defecto de Python2 no funcionaba correctamente.

En este momento, ya comenzamos con las tareas. Antes de llevarlas a cabo, indicamos: ```become: yes```, que quiere decir que a partir de ahí, en ese bloque se van a usar privilegios de superusuario.  
Dichas tareas son las siguientes:

- Actualizamos la lista de paquetes de ubuntu haciendo un *apt update*.
- Instalamos *git*.
- Instalamos node y npm, que serán necesarios para ejecutar nuestra aplicación.
- Instalamos gulp globalmente, que será necesario posteriormente para ejecutar las tareas de nuestra aplicación.
- Instalamos pm2 de nuevo globalmente. A través de él arrancaremos finalmente la aplicación para el despliegue.

Finalmente, he creado una tarea en gulp llamada **vm-provision**. Esta tarea llamará a *vagrant provision*, que usará justamente este playbook, y llevará a cabo el aprovisionamiento sobre las máquinas virtuales definidas.

## Vagrant Cloud

Finalmente, he decidido subir la imagen de mi máquina virtual a la plataforma Vagrant Cloud. Para ello, simplemente hemos tenido que crear la imagen con la siguiente orden:

    vagrant package --output gymmanager.box

Una vez creada la imagen, simplemente debemos subirla a la plataforma. Podemos acceder a ella desde el siguiente [enlace](https://app.vagrantup.com/i4vk/boxes/gymmanager)