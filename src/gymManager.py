# -*- coding: utf-8 -*-

import json
import os.path as path

class GymManager:
    db = None
    num_clientes = None

    def __init__(self):
        if path.isfile("database.json"):
            f = open("database.json")
            self.db = json.load(f)
        else:
            json_db = '''{
                          "clientes": [
                            {
                        	    "nombre": "Iván",
                        		"apellidos": "Garzón Segura",
                        		"dni": "1234567S",
                        		"email": "ivangarzon98@correo.ugr.es",
                                "id": 1
                            }
                          ]
                        }'''
            #Crea database con una entrada
            self.db = json.loads(json_db)
            f = open("database.json", 'w')
            json.dump(self.db, f, indent=2)

        self.num_clientes = len(self.db["clientes"])

    def save(self, path):
        f = open(path, 'w')
        json.dump(self.db, f, indent=2)

    def insertarCliente(self, cliente):
        cliente["id"] = self.num_clientes + 1
        self.db["clientes"].append(cliente)
        self.num_clientes = self.num_clientes + 1

    def eliminarCliente(self, id):
        for i in range(len(self.db["clientes"])):
            if self.db["clientes"][i]["id"] == id:
                self.db["clientes"].pop(i)

    def listarClientes(self):
        return self.db["clientes"]

    def getCliente(self, id):
        for i in range(len(self.db["clientes"])):
            if self.db["clientes"][i]["id"] == id:
                return self.db["clientes"][i]
        return None



if __name__ == "__main__":
    clientes = GymManager()

    un_cliente = {"nombre": "Antonio", "apellidos": "García García", "dni":"1234", "email": "papaya"}
    clientes.insertarCliente(un_cliente)
    print(clientes.listarClientes())
