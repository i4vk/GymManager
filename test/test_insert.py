import unittest
import sys

sys.path.append("..")
from src.gymManager import *

class TestInsert(unittest.TestCase):
    clientes = GymManager()

    def test_insert(self):
        #Insertamos un cliente nuevo
        un_cliente = {"nombre": "Antonio", "apellidos": "García García", "dni":"1234", "email": "papaya"}
        self.clientes.insertarCliente(un_cliente)

        cliente = self.clientes.getCliente(self.clientes.num_clientes)
        #Probamos si se ha insertado correctamente
        self.assertNotEqual(cliente, None, "No se ha insertado correctamente el cliente.")
        #Comprobamos si el cliente insertado contiene los valores que debería
        del cliente["id"]
        un_cliente2 = {"nombre": "Antonio", "apellidos": "García García", "dni":"1234", "email": "papaya"}
        self.assertEqual(cliente, un_cliente2, "El cliente insertado no se corresponde con el que debería.")


if __name__ == '__main__':
    unittest.main()
