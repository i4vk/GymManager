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