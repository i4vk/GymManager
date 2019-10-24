var fs=require('fs');

/**Clase que implementa la gestión de la base de datos de clientes de un gimnasio.*/
class GymManager {

  /**
  * Crea una instancia de base de datos en una ruta especiticada.
  * @param {string} pathfile - Ruta de la base de datos en el sistema de archivos
  */
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

    this.dbpath = pathfile;
    this.num_clientes = Object.keys(this.db["clientes"]).length;
  }

  /**
   * Carga una base de datos previamente creada.
   * @param {string} pathfile - Ruta de la base de datos en el sistema de archivos
   */
  load(pathfile) {
    try {
      var json_db=fs.readFileSync(pathfile, 'utf8');
      this.db=JSON.parse(json_db);
    } catch (error){
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

  /**
   * Guarda los datos realizados en la base de datos.
   *
   * @param  {string} pathfile Ruta de la base de datos en el sistema de archivos
   */
  save(pathfile) {
    return new Promise(function(resolve, reject) {
      fs.writeFile(pathfile, JSON.stringify(this.db, null, 2), function(err) {
        if (err) {
          reject(err);
        }else {
          resolve();
        }
      })
    }.bind(this));
  }

  /**
   * Vacía la base de datos. No recibe parámetros.
   */
  clear() {
    this.db = {clientes:{}};
    this.num_clientes = 0;
  }

  /**
   * Inserta un nuevo cliente a la base de datos
   *
   * @param  {dictionary} cliente Cliente que será insertado.
   */
  insert(cliente) {
    var list_keys = Object.keys(this.db["clientes"]);
    var campos_esperados = ['nombre', 'dni', 'email', 'apellidos'];

    var id_cliente = this.num_clientes;
    var found;

    do {
      id_cliente = id_cliente+1;
      found = list_keys.find(function(element) {
        return element == id_cliente;
      });
    } while (found != undefined);

    var keys_nuevo_cliente = Object.keys(cliente);
    var campo;

    for(campo of campos_esperados) {
      if (keys_nuevo_cliente.indexOf(campo) == -1) {
        var error = new Error('Faltan datos de cliente');
        error.status = 400;
        throw error;
      }
    }

    for(campo of keys_nuevo_cliente) {
      if (campos_esperados.indexOf(campo) == -1) {
        var error = new Error('Error en los datos del cliente');
        error.status = 400;
        throw error;
      }
    }

    this.db["clientes"][id_cliente] = cliente;
    this.num_clientes += 1;
    this.save(this.dbpath);
  }

  /**
   * Elimina un cliente dado por su ID.
   *
   * @param  {int} id Identificador (ID) del cliente dentro de la base de datos.
   * @return {boolean}  True si se ha podido eliminar.
   */
  eliminarCliente(id) {
    if (id in this.db["clientes"]) {
      delete this.db["clientes"][id];
      this.num_clientes -= 1;
      return true;
    }else {
      var error = new Error("No es posible eliminar el cliente");
      error.status = 400;
      throw error;
    }
  }

  /**
   * Devuelve una lista con todos los clientes almacenados.
   *
   * @return {dictionary}  Lista de clientes almacenados.
   */
  listarClientes() {
    return this.db["clientes"];
  }

  /**
   * Devuelve un único cliente identificado por su ID.
   *
   * @param  {int} id Identificador (ID) del cliente dentro de la base de datos.
   * @return {dictionary}    Atributos del cliente identificado por el id.
   */
  getCliente(id) {
    if (id in this.db["clientes"]) {
      return this.db["clientes"][id];
    }else {
      var error = new Error("No existe cliente");
      error.status = 404;
      throw error;
    }
  }

  /**
   * Modifica alguno de los atributos asociados a un cliente identificado por un ID.
   *
   * @param  {int} id          Identificador (ID) del cliente dentro de la base de datos.
   * @param  {string} campo       Atributo que será modificado.
   * @param  {string} nuevo_valor Nuevo valor que contendrá el atributo dado.
   * @return {boolean}             True si se ha podido modificar correctamente.
   */
  update(id, campo, nuevo_valor) {
    if ((id in this.db["clientes"]) && (Object.keys(this.db["clientes"][id]).indexOf(campo) != -1)) {
      this.db["clientes"][id][campo] = nuevo_valor;
      this.save(this.dbpath)
      return true;
    }else {
      var error = new Error("No es posible actualizar el cliente");
      error.status = 400;
      throw error;
    }
  }

  /**
   * Busca un cliente a partir de su nombre completo y devuelve su ID.
   *
   * @param  {string} nombre    Nombre del cliente.
   * @param  {string} apellidos Apellidos del cliente.
   * @return {int}           ID del cliente buscado.
   */
  searchByName(nombre, apellidos) {
    var id;
    for (id of Object.keys(this.db["clientes"])) {
      if (this.db["clientes"][id]["nombre"].toUpperCase() == nombre.toUpperCase() &&
          this.db["clientes"][id]["apellidos"].toUpperCase() == apellidos.toUpperCase()) {
        return id;
      }
    }

    var error = new Error("Cliente no encontrado");
    error.status = 404;
    throw error;
  }

  /**
   * searchByDNI - description
   *
   * @param  {string} dni DNI del cliente buscado
   * @return {int}     ID del cliente buscado.
   */
  searchByDNI(dni) {
    var id;
    for (id of Object.keys(this.db["clientes"])) {
      if (this.db["clientes"][id]["dni"].toUpperCase() == dni.toUpperCase()) {
        return id;
      }
    }

    var error = new Error("Cliente no encontrado");
    error.status = 404;
    throw error;
  }
}

module.exports = GymManager;
