# Despliegue de VM en Azure

Esta vez, el objetivo consiste en desplegar y provisionar una máquina virtual de Azure haciendo uso de Vagrant.

Para ello, el primer paso que debemos realizar consiste en instalar Vagrant, y posteriormente instalar el plugin de azure de la siguiente manera:

    $ vagrant plugin install vagrant-azure

Posteriormete, una vez instalado esto, necesitamos obtener ciertas credenciales de nuestra cuenta de azure que posteriormente usaremos para conectarnos desde el Vagranfile.

Para ello, debemos ejecutar lo siguiente:

    $ az ad sp create-for-rbac

Esto nos devolverá un JSON de donde podremos obtener las credenciales mencionadas anteriormente. Para evitar poner información privada en el Vagrantfile, lo que haremos será trabajar con variables de entorno mediante las cuales accederemos a estas credenciales.

Además necesitaremos información de nuestra subscripción de azure, la cual obtendremos con el comando

    $ az account list --query '[?isDefault].id' -o tsv

Por lo tanto, simplemente debemos ejecutar lo siguiente con las credenciales obtenidas:

    export AZURE_TENANT_ID='xxx'
    export AZURE_CLIENT_ID='xxx'
    export AZURE_CLIENT_SECRET='xxx'
    export AZURE_SUBSCRIPTION_ID='xxx'

Posteriormente, para trabajar con Vagrant junto con Azure necesitaremos una máquina virtual que no haga nada, pero que permita a Vagrant funcionar, y que delegue las operaciones en la máquina virtual de Azure. Esta máquina se conoce como *Dummy-box*, y la instalaremos en Vagrant con el siguiente comando:

    vagrant box add azure-dummy https://github.com/azure/vagrant-azure/raw/v2.0/dummy.box --provider azure

Una vez hecho esto, ya tenemos todo lo necesario para comenzar con el Vagrantfile.

En este caso, yo he creado el siguiente Vagrantfile, que procederé a explicar a continuación:

~~~ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  # Identificador de la máquina virtual
  config.vm.define "GymManager"

  # Usar la VBox 'dummy' creada previamente
  config.vm.box = "azure-dummy"

  # Especificamos la localización de la clave privada de ssh
  config.ssh.private_key_path = '~/.ssh/id_rsa'
  
  # Configuramos Azure como provider para nuestra VM
  config.vm.provider "azure" do |azure, override|
    # Ajustamos las credenciales desde variables de entorno
    azure.tenant_id = ENV['AZURE_TENANT_ID']
    azure.client_id = ENV['AZURE_CLIENT_ID']
    azure.client_secret = ENV['AZURE_CLIENT_SECRET']
    azure.subscription_id = ENV['AZURE_SUBSCRIPTION_ID']

    # Nombre de la máquina virtual de Azure
    azure.vm_name = "gymmanager"

    # Nombre del grupo de recursos de azure
    azure.resource_group_name = "vm-vagrant"

    # Una de las máquinas más baratas de azure, con 1 procesador
    # y 2gb de memoria
    azure.vm_size = "Standard_B1ms"
    
    # Escogemos el único sistema operativo Ubuntu disponible en azure
    azure.vm_image_urn = "Canonical:UbuntuServer:18.04-LTS:latest"

    # Abrimos el puerto en el que escuchará nuestra aplicación
    azure.tcp_endpoints = 8080

    # Localización en europa de la VM
    azure.location = "westeurope"
  end

  # Indicamos provisionamiento a traves de ansible, con nuestro playbook
  config.vm.provision "ansible" do |ansible|
    # Ruta del playbook de ansible
    ansible.playbook = "provision/playbook.yml"
  end
end
~~~

Básicamente, el funcionamiento de este Vagrantfile se puede resumir de la siguiente manera:

- Ajustamos el identificador que tendrá la máquina virtual dentro de Vagrant.
- Decimos a Vagrant que use la máquina dummy que hemos descargado e instalado anteriormente, para posteriormente delegar las operaciones en la máquina de Azure.
- Indicamos la localización de la clave privada de ssh, para poder conectarse a la máquina sin necesidad de poner contraseña.
- Indicamos que Azure será el provider utilizado:
  - Ajustamos las credenciales de Azure, que deben haber sido exportadas anteriormente como variables de entorno.
  - Indicamos el nombre que tendrá la máquina vitual en Azure.
  - Indicamos el grupo de recursos al que pertenecerá dicha máquina.
  - Indicamos el tamaño que tendrá nuestra máquina virtual. En este caso, he decidido escoger una máquina de tipo B, que son las más baratas de Azure, y dentro de este tipo, aquella que tiene un procesador y 2GB de memoria RAM, para asegurarnos de que no nos quedaremos sin memoria durante la ejecución de nuestra aplicación.
  - Indicamos el sistema operativo que tendrá la máquina virtual. En este caso, he escogido la última versión de Ubuntu 18.04-LTS, por haber sido desarrollada la aplicación en un sistema Ubuntu. Además, esta es la única versión de Ubuntu que he encontrado disponible en Azure.
  - Abrimos el puerto 8080 de la VM, que será el puerto en el que escuchará nuestra aplicación.
  - Indicamos que la localización de dicha VM será en Europa Oeste, para así cumplir con el marco legal requerido.
- Finalmente, indicamos que el provisionamiento se hará con Ansible usando el playbook indicado.

Finalmente, he creado una tarea en el gulpfile para poder realizar esta acción desde el propio gestor de tareas. Por lo tanto, si queremos crear y arrancar la máquina virtual, simplemente debemos ejecutar:

  $ gulp vm-up

De esta manera se instanciará la VM en azure, pero aún no se llevará a cabo el provisionamiento.

# Provisionamiento de la VM

Como podemos observar en el apartado anterior, el provisionamiento se lleva a cabo usando un playbook de ansible. Este se encuentra en *provisionamiento/playbook.yml*, y contiene lo siguiente:

~~~yaml
---
# Tareas sobre la máquina GymManager
- hosts: GymManager
  # Ajustamos el intérprete de ansible como python3
  vars:
    ansible_python_interpreter: /usr/bin/python3
  
  # Damos permisos de superusuario
  become: yes
  tasks:
    # Descargamos un script para instalar node en los repositorios de ubuntu
    - name: Descargar node
      get_url: 
        url: https://deb.nodesource.com/setup_10.x
        dest: /tmp/node.sh

    # Instalamos node en los repositorios de ubuntu
    - name: Instalar node en los repositorios
      command: bash /tmp/node.sh

    # Hacemos un update de los paquetes con apt
    - name: Actualiza lista de paquetes apt
      apt:
        update_cache: yes

    # Instalamos git
    - name: Instala git
      apt: 
        name: git

    # Instalamos node 10
    - name: install nodejs
      apt: 
        name:
          - nodejs

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

    # Clonamos el repositorio de nuestra aplicación desde Github
    - name: Clonar repositorio de la aplicación
      git:
        repo: https://github.com/i4vk/GymManager
        dest: /home/vagrant/GymManager
        force: yes

    # Instalamos dependencias propias de la aplicación
    - name: Instalar dependencias de la aplicación
      command: npm install
      args:
        chdir: /home/vagrant/GymManager

    # Arrancamos la aplicación en segundo plano
    - name: Arrancar la aplicación
      shell: gulp start &
      args:
        chdir: /home/vagrant/GymManager
~~~

Este playbook consta de las siguientes tareas:

- Primero descargamos un script de instalación de node 10 en los repositorios de ubuntu. Esto lo hago porque por defecto, en los repositorios únicamente está la versión 8 de node.
- Ejecutamos el script descargado anteriormente.
- Actualizamos los repositorios de ubuntu, simulando un ```sudo apt update```.
- Instalamos git.
- Instalamos node 10.
- Instalamos gulp globalmente para poder acceder a nuestro gestor de tareas dentro de la VM.
- Instalamos pm2 de nuevo globalmente.
- Clonamos el repositorio de GitHub de nuestra aplicación. Le añadimos la opción force por si en algún momento necesitamos volver a provisionar, para que se descarguen todos los cambios que haya podido haber en el repositorio.
- Instalamos las dependencias de nuestra aplicación con ```npm install```.
- Arrancamos la aplicación en segundo plano con ```gulp start &```. Lo ejecutamos en segundo plano para que de esta manera se puedan seguir ejecutando tareas de aprovisionamiento si fuera necesario, o como es el caso, para que el script de aprovisionamiento de ansible pueda terminar su ejecución y no se quede bloqueado con la tarea de gulp.

Como podemos observar también en el script de ansible, estamos ejecutando todas estas tareas sobre la máquina GymManager, que es el nombre que le dimos a la máquina al ser creada desde el vagrantfile. Dado que vagrant crea su propio inventario, no es necesario que lo creemos nosotros manualmente. Si tuvieramos más de una máquina y quisiéramos provisionarlas todas ellas, simplemente deberíamos cambiar los hosts y poner ```hosts: all```, para así provisionarlas todas al mismo tiempo.

Finalmente, ya tenemos desplegada nuestra aplicación en la máquina virtual de azure. 

> Si queremos acceder a ella, simplemente tenemos que ir al siguiente enlace: gymmanager.westeurope.cloudapp.azure.com:8080/status