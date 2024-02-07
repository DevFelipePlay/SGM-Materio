import { IReqPostAuthLogin, postAuthLogin } from 'src/services/AuthLogin'
import { IJwt, UserDataType } from '../types'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie'
import { jwtDecode } from 'jwt-decode'
import apiPlaySgm from 'src/services/apiPlaySgm'
import { postPlayUserInfo } from 'src/services/UserInfo/postPlayUserInfo'
import toast from 'react-hot-toast'
import { Box } from '@mui/material'

interface IAuthContext {
  user: UserDataType | null
  loadingAuth: boolean
  signIn: (formData: IReqPostAuthLogin) => void
  signOut: () => void
  signUp: (formData: { [key: string]: any }) => void
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()

  const cookies = new Cookies()

  const [loadingSystem, setLoadingSystem] = useState(true)
  const [loadingAuth, setLoadingAuth] = useState(false)
  const [user, setuser] = useState<UserDataType | null>(null)

  const [jwt, setJwt] = useState<IJwt | null>(null)
  console.log(jwt)

  async function signIn(formData: IReqPostAuthLogin) {
    setLoadingAuth(true)

    const { access_token } = await postAuthLogin({
      cpf: formData.cpf,
      password: formData.password
    })
    const jwtContent = jwtDecode<IJwt>(access_token)
    try {
      cookies.set('jwt', access_token, {
        expires: new Date(jwtContent.exp * 1000)
      })

      apiPlaySgm.defaults.headers.common.Authorization = `Bearer ${access_token}`
    } catch (error) {}
    try {
      const returnUrl = router.query.returnUrl

      const userInfo = await postPlayUserInfo({
        cpf: formData.cpf
      })

      const userWithRole: UserDataType = {
        ...userInfo,
        role: 'admin' // ou a role desejada
      }
      cookies.set('user', userWithRole, {
        expires: new Date(jwtContent.exp * 1000)
      })
      setuser(userWithRole)

      setJwt(jwtContent)

      // formData.rememberMe ? cookies.set('user', JSON.stringify(userInfo)) : null

      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

      router.replace(redirectURL as string)
    } catch (error: any) {
    } finally {
      setLoadingAuth(false)
    }
  }

  async function signUp(formData: { [key: string]: any }) {
    setLoadingAuth(true)
    try {
      // POST PARA API DE CADASTRO AQUI*
      toast.success('Cadastro realizado com sucesso!')
      signIn({ cpf: formData.email, password: formData.password })
    } catch (error: any) {
      console.log(error)

      // toast.error(error
    } finally {
      setLoadingAuth(false)
    }
  }

  function signOut() {
    router.push('/login')
    apiPlaySgm.defaults.headers.common.Authorization = undefined
    cookies.remove('jwt')
    cookies.remove('user')
    setJwt(null)
    setuser(null)
  }

  function checkLogin() {
    setLoadingSystem(true)
    const jwt = cookies.get<string | undefined>('jwt')
    const user = cookies.get<UserDataType | undefined>('user')
    if (!jwt || !user) {
      signOut()
      setLoadingSystem(false)

      return
    }

    apiPlaySgm.defaults.headers.common.Authorization = `Bearer ${jwt}`

    //@ts-ignore
    const jwtContent = jwtDecode<IJwt>(jwt)
    setJwt(jwtContent)
    setuser(user)

    setLoadingSystem(false)
  }

  // function handle401Unauthorized() {
  //   // Adiciona um interceptador na resposta
  //   apiPlaySgm.interceptors.response.use(
  //     response => response,
  //     error => {
  //       if (error.response.status === 401) {
  //         toast.success('Sua sessão expirou, por favor logue novamente!')
  //         router.push('/login')
  //       }

  //       return Promise.reject(error)
  //     }
  //   )
  // }

  useEffect(() => {
    // handle401Unauthorized();
    checkLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loadingSystem) return <Box></Box>

  return (
    <AuthContext.Provider
      value={{
        loadingAuth,
        signIn,
        signOut,
        signUp,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
