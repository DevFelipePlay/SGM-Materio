import { useContext } from 'react'
import { AuthContext } from 'src/context/Auth/Auth'

export const useAuth = () => useContext(AuthContext)
