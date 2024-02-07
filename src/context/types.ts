export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  cpf: string
  password: string
  rememberMe?: boolean
}

export interface IJwt {
  sub: string
  iat: number
  exp: number
}

export interface IResPostAuthLogin {
  access_token: string
  token_type: string
  expires_in: number
}

export type UserDataType = {
  parceiro: string
  cnpj: string
  cpf: string
  name: string
  email: string
  userid: number
  companyid: number
  companyref: string
  profileid: number
  UF: string
  token: string
  faturaaberta: number
  faturas: any[]
  pospago: boolean
  mk: boolean
  parceirorevendedor: boolean
  primeiroAcesso: boolean
  super: boolean
  cadastrocompleto: boolean
  primeiroacessoconcluidoparceirommn: boolean
  profileid_multinivel: number
  licenciado: boolean
  msisdnativo: boolean
  niveis: number
  logo: string
  role: string
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}
