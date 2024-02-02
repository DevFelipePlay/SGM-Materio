import mock from './mock'

import './auth/jwt'
import './usersMVNO'

// import './apps/userList'

mock.onAny().passThrough()
