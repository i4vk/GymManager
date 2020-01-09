# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  # Identificador de la máquina virtual
  config.vm.define "GymManager"

  # Usar la VBox de azure creada previamente
  config.vm.box = "azure-dummy"

  # Especificamos la clave privada de ssh
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

    # Una de las máquinas más baratas de azure, con 1 procesador
    # y 2gb de memoria
    azure.vm_size = "Standard_B1ms"
    
    # Escogemos el único sistema operativo Ubuntu disponible en azure
    azure.vm_image_urn = "Canonical:UbuntuServer:18.04-LTS:latest"

    # Nombre del grupo de recursos de azure
    azure.resource_group_name = "vm-vagrant"

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
