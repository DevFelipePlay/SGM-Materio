import mock from './mock'

import './auth/jwt'

import './apps/invoice'
import './apps/userList'
import './Parceiros'

// Clientes
import './clientes/listaClientes'
import './clientes/detalhesCliente'
import './clientes/faturasClientes'

mock.onAny().passThrough()
