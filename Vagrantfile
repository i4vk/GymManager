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
