import mock from '../mock'
import { ClientsType } from '../types'

const data: { users: ClientsType[] } = {
  users: [
    {
      id: 12718,
      msisdn: '44920012076',
      iccid: '8955170110176008405',
      parceiro: 'PLAY MÓVEL',
      cnpj: '44255627000169',
      cpf: '33093462000150',
      name: 'Play Tecnologia E Telefonia Celular Ltda',
      companyid: 46,
      pospago: true,
      email: 'ilber@infiniti.app',
      birthdate: '2018-01-01 00:00:00',
      cellphone: '61981549928',
      whatsapp: '61981549928',
      cep: '72405010',
      uf: 'DF',
      city: 'Brasília',
      district: 'Setor Central (Gama)',
      street: 'Quadra 1',
      number: '21',
      avatar: '',
      contafatura: 'Play3303060',
      plandescription: '(M2M) Plano Assinatura',
      planvalue: '7.00'
    },
    {
      id: 26355,
      msisdn: '11996001604',
      iccid: '8955170110337674541',
      parceiro: 'TEGG',
      cnpj: '45435783000174',
      cpf: '35426806802',
      name: 'Joeldes José Da Silva Martins',
      companyid: 247,
      pospago: true,
      email: 'joeldes.martins2@gmail.com',
      birthdate: '1986-04-16 00:00:00',
      cellphone: '11996001604',
      whatsapp: '11996001604',
      cep: '05874180',
      uf: 'SP',
      city: 'São Paulo',
      district: 'Parque Novo Santo Amaro',
      street: 'Rua das Três Marias',
      number: '809',
      complement: 'Casa 25',
      avatar: '/images/avatars/1.png',
      plandescription: '(Start) 21Gb +  Minutos Ilimitados + 100 sms + 1 Gb Portabilidade',
      planvalue: '42.91'
    },
    {
      id: 26384,
      msisdn: '24933005611',
      iccid: '8955170110322137546',
      parceiro: 'ICONNEXT',
      cnpj: '43470720000123',
      cpf: '15349641778',
      name: 'João Vitor Santoro Costa',
      companyid: 22,
      pospago: false,
      avatar: '/images/avatars/7.png',
      email: 'joaosantoro1993@outlook.com',
      birthdate: '1996-11-26 00:00:00',
      cellphone: '24999553620',
      whatsapp: '24999553620',
      cep: '22240005',
      uf: 'RJ',
      city: 'Rio de Janeiro',
      district: 'Laranjeiras',
      street: 'Rua das Laranjeiras',
      number: '336',
      complement: 'Apt 818 Bl A',
      rgie: '297544280',
      plandescription: '(Start) 21Gb +  Minutos Ilimitados + 100 sms + 1 Gb Portabilidade',
      planvalue: '42.91'
    },
    {
      id: 26030,
      msisdn: '11920184896',
      iccid: '8955170110322144245',
      parceiro: 'ICONNEXT',
      cnpj: '43470720000123',
      cpf: '37322479882',
      name: 'Dayane Rocha Santos',
      companyid: 22,
      pospago: false,
      avatar: '/images/avatars/6.png',
      email: 'dayaneamina@gmail.com',
      birthdate: '1992-07-22 00:00:00',
      cellphone: '11951379045',
      whatsapp: '11951349045',
      cep: '03203000',
      uf: 'SP',
      city: 'São Paulo',
      district: 'Vila Bela',
      street: 'Rua Doutor Vicente Giacaglini',
      number: '730',
      complement: 'Casa 2',
      rgie: '387408629',
      plandescription: '(Turbo) 29Gb +  Minutos Ilimitados + 100 sms + 1 Gb Portabilidade',
      planvalue: '49.72'
    },
    {
      id: 12329,
      msisdn: '47992584506',
      iccid: '8955170110322140516',
      parceiro: 'ICONNEXT',
      cnpj: '43470720000123',
      cpf: '09409402999',
      name: 'Nicholas Pablo Pereira',
      companyid: 22,
      pospago: false,
      avatar: '/images/avatars/5.png',
      email: 'nicholaspablopereira@gmal.com',
      birthdate: '2000-01-01 00:00:00',
      cellphone: '47992584506',
      whatsapp: '55479925845',
      cep: '72600000',
      uf: 'DF',
      city: 'Brasilia',
      district: 'Padrão',
      street: 'Padrão',
      number: '99',
      plandescription: '(Turbo) 29Gb +  Minutos Ilimitados + 100 sms + 1 Gb Portabilidade',
      planvalue: '49.72'
    }
  ]
}

// Obter a lista
mock.onGet('/users/list').reply(config => {
  return new Promise(resolve => {
    console.log(config)
    setTimeout(() => {
      resolve([200, data.users])
    }, 1000) // Delay de 2 segundos
  })
})

// Buscar usuário pelo cpf
mock.onGet('/users/search').reply(config => {
  const { cpf } = config.params

  const user = data.users.find(user => user.cpf === cpf)

  return user ? [200, user] : [404, { message: 'Usuário não encontrado' }]
})
