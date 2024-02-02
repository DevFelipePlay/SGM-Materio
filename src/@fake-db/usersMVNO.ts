import mock from './mock'

const data = {
  users: [
    {
      id: 1,
      name: 'Adam Sandler',
      cpf: '33093462000150',
      iccid: '8955170110333029997',
      msisdn: '(61) 92002-8084',
      tipoCliente: 'pj',
      tipoDeLinha: 'pospago',
      status: 'ativo'
    },
    {
      id: 2,
      name: 'João Pedro',
      cpf: '08007069194',
      iccid: '8955170110333028510',
      msisdn: '(61) 92004-6246',
      tipoCliente: 'pf',
      tipoDeLinha: 'prepago',
      status: 'ativo'
    },
    {
      id: 3,
      name: 'Daniel',
      cpf: '84016864282',
      iccid: '8955170110319855035',
      msisdn: '(61) 92002-9499',
      tipoCliente: 'pf',
      tipoDeLinha: 'prepago',
      status: 'ativo'
    },
    {
      id: 4,
      name: 'Leandro',
      cpf: '55284223181',
      iccid: '8955170110333025532',
      msisdn: '(61) 92003-1586',
      tipoCliente: 'pf',
      tipoDeLinha: 'prepago',
      status: 'grace2'
    },
    {
      id: 5,
      name: 'Marcelo',
      cpf: '56187646413',
      iccid: '8955170110333025995',
      msisdn: '(61) 92003-3758',
      tipoCliente: 'pf',
      tipoDeLinha: 'prepago',
      status: 'grace1'
    },
    {
      id: 6,
      name: 'Eder',
      cpf: '4954242645',
      iccid: '8955170110333027306',
      msisdn: '(61) 92003-4430',
      tipoCliente: 'pf',
      tipoDeLinha: 'prepago',
      status: 'grace3'
    },
    {
      id: 7,
      name: 'Pedro',
      cpf: '45748556832',
      iccid: '8955170110333029062',
      msisdn: '(61) 92004-2693',
      tipoCliente: 'pf',
      tipoDeLinha: 'prepago',
      status: 'ativo'
    },
    {
      id: 8,
      name: 'Renato',
      cpf: '58745686715',
      iccid: '8955170110333030086',
      msisdn: '(61) 92004-6246',
      tipoCliente: 'pf',
      tipoDeLinha: 'prepago',
      status: 'ex'
    },
    {
      id: 9,
      name: 'Felipe',
      cpf: '56515484714',
      iccid: '8955170110114549551',
      msisdn: '(61) 92004-3512',
      tipoCliente: 'pf',
      tipoDeLinha: 'prepago',
      status: 'ex'
    },
    {
      id: 10,
      name: 'Mateus',
      cpf: '65346653418',
      iccid: '8955170110114511429',
      msisdn: '(61) 92004-6246',
      tipoCliente: 'pf',
      tipoDeLinha: 'prepago',
      status: 'grace1'
    },
    {
      id: 11,
      name: 'Adam Sandler',
      cpf: '33093462000150',
      iccid: '8955170110333029997',
      msisdn: '(61) 92002-8084',
      tipoCliente: 'pj',
      tipoDeLinha: 'pospago',
      status: 'ativo'
    },
    {
      id: 12,
      name: 'João Pedro',
      cpf: '08007069194',
      iccid: '8955170110333028510',
      msisdn: '(61) 92004-6246',
      tipoCliente: 'pf',
      tipoDeLinha: 'prepago',
      status: 'ativo'
    },
    {
      id: 13,
      name: 'Daniel',
      cpf: '84016864282',
      iccid: '8955170110319855035',
      msisdn: '(61) 92002-9499',
      tipoCliente: 'pf',
      tipoDeLinha: 'prepago',
      status: 'ativo'
    },
    {
      id: 14,
      name: 'Leandro',
      cpf: '55284223181',
      iccid: '8955170110333025532',
      msisdn: '(61) 92003-1586',
      tipoCliente: 'pf',
      tipoDeLinha: 'prepago',
      status: 'grace2'
    },
    {
      id: 15,
      name: 'Marcelo',
      cpf: '56187646413',
      iccid: '8955170110333025995',
      msisdn: '(61) 92003-3758',
      tipoCliente: 'pf',
      tipoDeLinha: 'prepago',
      status: 'grace1'
    }
  ]
}

mock.onGet('/users/list').reply(config => {
  return [200, data.users]
})
