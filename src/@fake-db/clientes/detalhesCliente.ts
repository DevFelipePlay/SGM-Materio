import mock from '../mock'
import { DetalhesClienteType } from '../types'

const data: { users: DetalhesClienteType[] } = {
  users: [
    {
      id: 12718,
      cpf: '33093462000150',
      tipoPlano: 'Pós-Pago',
      operadora: 'PLAY MÓVEL',
      msisdn: '(44) 92001-2076',
      iccid: '8955170110176008405',
      portin: 'Portabilidade não solicitada',
      plano: '(M2M) - Play',
      statusplan: 'ATIVO',
      criado: '2022-12-01',
      fimplano: '2024-03-09',
      dados: '100',
      minutos: '0',
      smsrestante: '0',
      revendedor: null
    },
    {
      id: 26355,
      cpf: '35426806802',
      tipoPlano: 'Pós-Pago',
      msisdn: '(11) 99600-1604',
      iccid: '8955170110337674541',
      operadora: 'TEGG',
      statusplan: 'ATIVO',
      plano: 'Basic 7GB',
      fimplano: '2024-03-13',
      portin: 'Portabilidade não solicitada',
      minutos: '997',
      dados: '4860.226578',
      smsrestante: '60',
      criado: '2024-02-11',
      revendedor: '45435783000174'
    },
    {
      id: 26384,
      cpf: '15349641778',
      msisdn: '(24) 93300-5611',
      iccid: '8955170110322137546',
      operadora: 'ICONNEXT',
      statusplan: 'ATIVO',
      plano: 'EASY 21GB',
      fimplano: '2024-03-20',
      portin: 'Portabilidade concluída',
      minutos: '999',
      dados: '22192.155879',
      smsrestante: '94',
      criado: '2023-06-12',
      revendedor: null,
      tipoPlano: 'Pré-Pago'
    },
    {
      id: 26030,
      cpf: '37322479882',
      msisdn: '(11) 92018-4896',
      iccid: '8955170110322144245',
      operadora: 'ICONNEXT',
      statusplan: 'ATIVO',
      plano: 'EASY 29GB',
      fimplano: '2024-03-08',
      portin: 'Portabilidade concluída',
      minutos: '993',
      dados: '0',
      smsrestante: '200',
      criado: '2024-01-14',
      revendedor: null,
      tipoPlano: 'Pré-Pago'
    },
    {
      id: 12329,
      cpf: '09409402999',
      msisdn: '(47) 99258-4506',
      iccid: '8955170110322140516',
      operadora: 'ICONNEXT',
      statusplan: 'ATIVO',
      plano: 'EASY 21GB',
      fimplano: '2024-03-17',
      portin: 'Portabilidade não solicitada',
      minutos: '996',
      dados: '13870.699632',
      smsrestante: '95',
      criado: '2024-02-17',
      revendedor: '48419001953',
      tipoPlano: 'Pré-Pago'
    }
  ]
}

// Buscar usuário pelo cpf
mock.onGet('/api/detalhescliente').reply(config => {
  const { cpf } = config.params

  const user = data.users.find(user => user.cpf === cpf)

  return user ? [200, user] : [404, { message: 'Usuário não encontrado' }]
})
