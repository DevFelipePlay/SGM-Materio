export interface PartnersTypes {
  id: string
  companyid: number
  companyname: string
  cnpj: string
  tradename: string
  logotipo: string
  nomeparceiro: string
  email: string
  celular: string
  telefone: any
  cep: string
  endereco: string
  numeroendereco: string
  complemento: string
  bairro: string
  inscricaomunicipal: any
  inscricaoestadual: string
  observacoes: string
  walletid: string
  link_playstore: any
  link_appstore: any
  link_website: any
  link_chat: any
  pospago: any
  criadoem: string
  atualizadoem: any
  link_contrato: string
  consultor: ConsultorTypes
}

export interface ConsultorTypes {
  name: string
  cpf: string
}
