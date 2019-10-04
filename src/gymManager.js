var fs=require('fs')

class GymManager {
  constructor(pathfile) {
    try {
      var json_db=fs.readFileSync(pathfile, 'utf8');
      this.db=JSON.parse(json_db);
    } catch (error){
      //var json_db = {clientes:{"1":{nombre:"Iván",apellidos:"Garzón Segura",dni:"1234567S",email:"ivangarzon98@correo.ugr.es",id: 1}}};
      var json_db = {clientes:{}};
      fs.writeFile(pathfile, JSON.stringify(json_db, null, 2), function(err) {
        if (err) {
          console.log('Error de escritura');
        }
      });
      this.db=json_db;
    }

    this.num_clientes = Object.keys(this.db["clientes"]).length;
  }

  load(pathfile) {
    try {
      var json_db=fs.readFileSync(pathfile, 'utf8');
      this.db=JSON.parse(json_db);
    } catch (error){
      //var json_db = {clientes:{"1":{nombre:"Iván",apellidos:"Garzón Segura",dni:"1234567S",email:"ivangarzon98@correo.ugr.es",id: 1}}};
      var json_db = {clientes:{}};
      fs.writeFile(pathfile, JSON.stringify(json_db, null, 2), function(err) {
        if (err) {
          console.log('Error de escritura');
        }
      });
      this.db=json_db;
    }

    this.num_clientes = Object.keys(this.db["clientes"]).length;
  }

  save(pathfile) {
    fs.writeFile(pathfile, JSON.stringify(this.db, null, 2), function(err) {
      if (err) {
        console.log('Error de escritura');
      }
    });
  }

  clear() {
    this.db = {clientes:{}};
    this.num_clientes = 0;
  }

  insert(cliente) {
    var list_keys = Object.keys(this.db["clientes"]);

    var id_cliente = this.num_clientes;
    var found;

    do {
      id_cliente = id_cliente+1;
      found = list_keys.find(function(element) {
        return element == id_cliente;
      });
    } while (found != undefined);

    this.db["clientes"][id_cliente] = cliente;
    this.num_clientes += 1;
  }

  eliminarCliente(id) {
    if (id in this.db["clientes"]) {
      delete this.db["clientes"][id];
      this.num_clientes -= 1;
      return true;
    }else {
      return false;
    }
  }

  listarClientes() {
    return this.db["clientes"];
  }

  getCliente(id) {
    if (id in this.db["clientes"]) {
      return this.db["clientes"][id];
    }else {
      return null;
    }
  }
}

module.exports = GymManager;
