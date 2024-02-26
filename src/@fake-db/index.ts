import mock from './mock'

import './auth/jwt'
import './clientes/detalhesCliente'
import './clientes/faturasClientes'
import './clientes/listaClientes'

import './apps/invoice'
import './apps/userList'
import './Parceiros'

mock.onAny().passThrough()
