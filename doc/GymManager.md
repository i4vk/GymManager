<a name="GymManager"></a>

## GymManager
Clase que implementa la gestión de la base de datos de clientes de un gimnasio.

**Kind**: global class  

* [GymManager](#GymManager)
    * [new GymManager(pathfile)](#new_GymManager_new)
    * [.load(pathfile)](#GymManager+load)
    * [.save(pathfile)](#GymManager+save)
    * [.clear()](#GymManager+clear)
    * [.insert(cliente)](#GymManager+insert)
    * [.eliminarCliente(id)](#GymManager+eliminarCliente) ⇒ <code>boolean</code>
    * [.listarClientes()](#GymManager+listarClientes) ⇒ <code>dictionary</code>
    * [.getCliente(id)](#GymManager+getCliente) ⇒ <code>dictionary</code>
    * [.update(id, campo, nuevo_valor)](#GymManager+update) ⇒ <code>boolean</code>
    * [.searchByName(nombre, apellidos)](#GymManager+searchByName) ⇒ <code>int</code>
    * [.searchByDNI(dni)](#GymManager+searchByDNI) ⇒ <code>int</code>

<a name="new_GymManager_new"></a>

### new GymManager(pathfile)
Crea una instancia de base de datos en una ruta especiticada.


| Param | Type | Description |
| --- | --- | --- |
| pathfile | <code>string</code> | Ruta de la base de datos en el sistema de archivos |

<a name="GymManager+load"></a>

### gymManager.load(pathfile)
Carga una base de datos previamente creada.

**Kind**: instance method of [<code>GymManager</code>](#GymManager)  

| Param | Type | Description |
| --- | --- | --- |
| pathfile | <code>string</code> | Ruta de la base de datos en el sistema de archivos |

<a name="GymManager+save"></a>

### gymManager.save(pathfile)
Guarda los datos realizados en la base de datos.

**Kind**: instance method of [<code>GymManager</code>](#GymManager)  

| Param | Type | Description |
| --- | --- | --- |
| pathfile | <code>string</code> | Ruta de la base de datos en el sistema de archivos |

<a name="GymManager+clear"></a>

### gymManager.clear()
Vacía la base de datos. No recibe parámetros.

**Kind**: instance method of [<code>GymManager</code>](#GymManager)  
<a name="GymManager+insert"></a>

### gymManager.insert(cliente)
Inserta un nuevo cliente a la base de datos

**Kind**: instance method of [<code>GymManager</code>](#GymManager)  

| Param | Type | Description |
| --- | --- | --- |
| cliente | <code>dictionary</code> | Cliente que será insertado. |

<a name="GymManager+eliminarCliente"></a>

### gymManager.eliminarCliente(id) ⇒ <code>boolean</code>
Elimina un cliente dado por su ID.

**Kind**: instance method of [<code>GymManager</code>](#GymManager)  
**Returns**: <code>boolean</code> - True si se ha podido eliminar, False en caso contrario.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>int</code> | Identificador (ID) del cliente dentro de la base de datos. |

<a name="GymManager+listarClientes"></a>

### gymManager.listarClientes() ⇒ <code>dictionary</code>
Devuelve una lista con todos los clientes almacenados.

**Kind**: instance method of [<code>GymManager</code>](#GymManager)  
**Returns**: <code>dictionary</code> - Lista de clientes almacenados.  
<a name="GymManager+getCliente"></a>

### gymManager.getCliente(id) ⇒ <code>dictionary</code>
Devuelve un único cliente identificado por su ID.

**Kind**: instance method of [<code>GymManager</code>](#GymManager)  
**Returns**: <code>dictionary</code> - Atributos del cliente identificado por el id.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>int</code> | Identificador (ID) del cliente dentro de la base de datos. |

<a name="GymManager+update"></a>

### gymManager.update(id, campo, nuevo_valor) ⇒ <code>boolean</code>
Modifica alguno de los atributos asociados a un cliente identificado por un ID.

**Kind**: instance method of [<code>GymManager</code>](#GymManager)  
**Returns**: <code>boolean</code> - True si se ha podido modificar correctamente, False en caso contrario.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>int</code> | Identificador (ID) del cliente dentro de la base de datos. |
| campo | <code>string</code> | Atributo que será modificado. |
| nuevo_valor | <code>string</code> | Nuevo valor que contendrá el atributo dado. |

<a name="GymManager+searchByName"></a>

### gymManager.searchByName(nombre, apellidos) ⇒ <code>int</code>
Busca un cliente a partir de su nombre completo y devuelve su ID.

**Kind**: instance method of [<code>GymManager</code>](#GymManager)  
**Returns**: <code>int</code> - ID del cliente buscado. Si no se ha encontrado dicho cliente, devuelve False.  

| Param | Type | Description |
| --- | --- | --- |
| nombre | <code>string</code> | Nombre del cliente. |
| apellidos | <code>string</code> | Apellidos del cliente. |

<a name="GymManager+searchByDNI"></a>

### gymManager.searchByDNI(dni) ⇒ <code>int</code>
searchByDNI - description

**Kind**: instance method of [<code>GymManager</code>](#GymManager)  
**Returns**: <code>int</code> - ID del cliente buscado. Si no se ha encontrado dicho cliente, devuelve False.  

| Param | Type | Description |
| --- | --- | --- |
| dni | <code>string</code> | DNI del cliente buscado |

