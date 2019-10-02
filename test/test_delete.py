import unittest
import sys

sys.path.append("..")
from src.gymManager import *

class TestDelete(unittest.TestCase):
    clientes = GymManager()

    def test_delete(self):
        #Insertamos un cliente nuevo
        un_cliente = {"nombre": "Antonio", "apellidos": "García García", "dni":"1234", "email": "papaya"}
        self.clientes.insertarCliente(un_cliente)

        id_cliente = self.clientes.num_clientes
        #self.clientes.eliminarCliente(id_cliente)

        self.assertIsNone(self.clientes.getCliente(id_cliente))


if __name__ == '__main__':
    unittest.main()
