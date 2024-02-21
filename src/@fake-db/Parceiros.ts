import mock from './mock'

//

const data = {
  parceiros: [
    {
      id: 1,
      companyid: 250,
      companyname: 'SKYMOVEL SERVICOS DE TELECOMUNICACOES LTDA',
      cnpj: '29947778000194',
      logotipo: '',
      nomeparceiro: 'SKYNET MOVEL',
      email: 'financeiro@skymovel.com.br',
      celular: '55999142560',
      telefone: '55933003944',
      cep: '98760000',
      endereco: 'R CEL. RAUL OLIVEIRA',
      numeroendereco: '698',
      complemento: 'SALA 2',
      bairro: 'Centro',
      inscricaomunicipal: null,
      inscricaoestadual: '1840008668',
      observacoes: 'MVNO',
      walletid: '0393cf50-58ec-42e9-84d0-49c771f33f39',
      link_playstore: 'https://play.google.com/store/apps/details?id=app.mobile.skymovel',
      link_appstore: 'https://apps.apple.com/us/app/seu-chip/id6450275524',
      link_website: null,
      link_chat: 'https://tawk.to/chat/63d803114742512879107c52/1h4ej1no8',
      pospago: null,
      criadoem: '2024-01-05T17:33:26.000000Z',
      link_contrato:
        'https://playmovel-my.sharepoint.com/:f:/g/personal/renato_sena_playmovel_com_br/Em7lm_hzJgZKoOAZAB22J-kBGjWQi3kudeHfqdKKgWaoKg?e=udYXFK',
      consultor: {
        name: 'Dominique Oliveira De Ornela'
      }
    },
    {
      id: 2,
      companyid: 48,
      companyname: 'HNS SERVICOS DE TELECOMUNICACOES EIRELI',
      cnpj: '11367712000160',
      tradename: 'HNS',
      logotipo: '',
      nomeparceiro: '-',
      email: 'financeiro@hns.net.br',
      celular: '77981447711',
      telefone: '7740097802',
      cep: '46430000',
      endereco: '-',
      numeroendereco: '0',
      complemento: null,
      bairro: '-',
      inscricaomunicipal: '0',
      inscricaoestadual: '084987680',
      observacoes: '0',
      walletid: '06956bef-1974-46a3-bb28-af10a90b850a',
      link_playstore:
        'https://play.google.com/console/u/0/developers/7695212327294419416/app/4972072206044574797/app-dashboard?timespan=thirtyDays',
      link_appstore: 'https://apps.apple.com/us/app/hns-m\u00f3vel/id1620573614',
      link_website: 'http://hns.net.br/',
      link_chat: 'https://tawk.to/chat/608c384a62662a09efc3be2f/1fuc5fvvp',
      pospago: false,
      criadoem: '2023-12-12T17:44:20.000000Z',
      atualizadoem: null,
      link_contrato:
        'https://playmovel-my.sharepoint.com/:f:/g/personal/pedro_barbosa_playmovel_com_br1/EnkpFSbfQv1AumJXRcBK19oBN-W6Zz0nwuJZYJYnnWJ73w?e=S3gfqP',
      consultor: {
        name: 'Dominique Oliveira De Ornela',
        cpf: '70942070186'
      }
    },
    {
      id: 3,
      companyid: 46,
      companyname: 'PLAY M\u00d3VEL',
      cnpj: '44255627000169',
      tradename: 'PLAY M\u00d3VEL',
      logotipo: '/images/logoMock/icon.png',
      nomeparceiro: 'Playmovel',
      email: 'xxxxxxxxx@xxxxxxxxx.com',
      celular: '00000000000',
      telefone: null,
      cep: '00000000',
      endereco: 'gama gama gama',
      numeroendereco: '111',
      complemento: null,
      bairro: 'Gama',
      inscricaomunicipal: null,
      inscricaoestadual: '00000000000000',
      observacoes: null,
      walletid: 'f9f95cff-0d56-4572-9317-e967eac8c3a5',
      link_playstore: 'https://play.google.com/store/apps/details?id=app.mobile.ios.infiniti',
      link_appstore: 'https://apps.apple.com/us/app/play-m%C3%B3vel/id1624910613',
      link_website: 'https://playmovel.com.br/',
      link_chat: 'https://tawk.to/chat/608c384a62662a09efc3be2f/1fpk8ig35',
      pospago: true,
      criadoem: '2023-09-01T12:04:05.000000Z',
      atualizadoem: null,
      link_contrato: 'https://playmovel.com.br/',
      consultor: {
        name: '',
        cpf: ''
      }
    }
  ]
}

// Obter a lista

mock.onGet('/parceiros/list').reply(config => {
  return new Promise(resolve => {
    console.log(config)
    setTimeout(() => {
      resolve([200, data.parceiros])
    }, 1000) // Delay de 2 segundos
  })
})

// Buscar usuário pelo cpf
mock.onGet('/parceiros/search').reply(config => {
  const { id } = config.params

  const parceiro = data.parceiros.find(parceiro => parceiro.companyid === id)

  return parceiro ? [200, parceiro] : [404, { message: 'Parceiro não encontrado' }]
})
