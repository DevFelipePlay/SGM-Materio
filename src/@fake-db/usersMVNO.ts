import mock from './mock'

const data = {
  users: [
    {
      id: 2,
      name: 'João Pedro',
      cpf: '08007069194',
      iccid: '8955170110333028510',
      msisdn: '(61) 92004-6246',
      tipoCliente: 'pf',
      tipoDeLinha: 'prepago',
      status: 'ativo',
      avatar: ''
    },
    {
      id: 3,
      name: 'Daniel',
      cpf: '84016864282',
      iccid: '8955170110319855035',
      msisdn: '(61) 92002-9499',
      tipoCliente: 'pf',
      tipoDeLinha: 'prepago',
      status: 'ativo',
      avatar: '/images/avatars/3.png'
    },
    {
      id: 4,
      name: 'Leandro',
      cpf: '55284223181',
      iccid: '8955170110333025532',
      msisdn: '(61) 92003-1586',
      tipoCliente: 'pf',
      tipoDeLinha: 'prepago',
      status: 'grace2',
      avatar: '/images/avatars/4.png'
    },
    {
      id: 5,
      name: 'Marcelo',
      cpf: '56187646413',
      iccid: '8955170110333025995',
      msisdn: '(61) 92003-3758',
      tipoCliente: 'pf',
      tipoDeLinha: 'prepago',
      status: 'grace1',
      avatar: '/images/avatars/5.png'
    },
    {
      id: 6,
      name: 'Eder',
      cpf: '4954242645',
      iccid: '8955170110333027306',
      msisdn: '(61) 92003-4430',
      tipoCliente: 'pf',
      tipoDeLinha: 'prepago',
      status: 'grace3',
      avatar: '/images/avatars/6.png'
    },
    {
      id: 7,
      name: 'Pedro',
      cpf: '45748556832',
      iccid: '8955170110333029062',
      msisdn: '(61) 92004-2693',
      tipoCliente: 'pf',
      tipoDeLinha: 'prepago',
      status: 'ativo',
      avatar: '/images/avatars/7.png'
    },
    {
      id: 8,
      name: 'Renato',
      cpf: '58745686715',
      iccid: '8955170110333030086',
      msisdn: '(61) 92004-6246',
      tipoCliente: 'pf',
      tipoDeLinha: 'prepago',
      status: 'ex',
      avatar: '/images/avatars/8.png'
    },
    {
      id: 9,
      name: 'Felipe',
      cpf: '56515484714',
      iccid: '8955170110114549551',
      msisdn: '(61) 92004-3512',
      tipoCliente: 'pf',
      tipoDeLinha: 'prepago',
      status: 'ex',
      avatar: '/images/avatars/5.png'
    },
    {
      id: 1,
      name: 'Adam Sandler',
      cpf: '33093462000150',
      iccid: '8955170110333029997',
      msisdn: '(61) 92002-8084',
      tipoCliente: 'pj',
      tipoDeLinha: 'pospago',
      status: 'ativo',
      avatar:
        'data:image/jpeg;base64,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'
    },
    {
      id: 10,
      name: 'Mateus',
      cpf: '65346653418',
      iccid: '8955170110114511429',
      msisdn: '(61) 92004-6246',
      tipoCliente: 'pf',
      tipoDeLinha: 'prepago',
      status: 'grace1',
      avatar: ''
    },
    {
      id: 11,
      name: 'Marcelo',
      cpf: '56187646413',
      iccid: '8955170110333025995',
      msisdn: '(61) 92003-3758',
      tipoCliente: 'pf',
      tipoDeLinha: 'prepago',
      status: 'grace1',
      avatar: '/images/avatars/5.png'
    },
    {
      id: 12,
      name: 'Eder',
      cpf: '4954242645',
      iccid: '8955170110333027306',
      msisdn: '(61) 92003-4430',
      tipoCliente: 'pf',
      tipoDeLinha: 'prepago',
      status: 'grace3',
      avatar: '/images/avatars/6.png'
    },
    {
      id: 13,
      name: 'Pedro',
      cpf: '45748556832',
      iccid: '8955170110333029062',
      msisdn: '(61) 92004-2693',
      tipoCliente: 'pf',
      tipoDeLinha: 'prepago',
      status: 'ativo',
      avatar: '/images/avatars/7.png'
    },
    {
      id: 14,
      name: 'Renato',
      cpf: '58745686715',
      iccid: '8955170110333030086',
      msisdn: '(61) 92004-6246',
      tipoCliente: 'pf',
      tipoDeLinha: 'prepago',
      status: 'ex',
      avatar: '/images/avatars/8.png'
    },
    {
      id: 15,
      name: 'Felipe',
      cpf: '56515484714',
      iccid: '8955170110114549551',
      msisdn: '(61) 92004-3512',
      tipoCliente: 'pf',
      tipoDeLinha: 'prepago',
      status: 'ex',
      avatar: '/images/avatars/5.png'
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
