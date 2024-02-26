import mock from '../mock'
import { FaturasClientesType } from '../types'

interface DataFaturasProps {
  iccid: string
  faturas: FaturasClientesType[]
}

const data: { faturasClientes: DataFaturasProps[] } = {
  faturasClientes: [
    {
      iccid: '8955170110337674541',
      faturas: [
        {
          id: 1,
          paymentid: 138022,
          msisdnid: 44697,
          paymenttypeid: 3,
          paymentstatus: 1,
          created: '2024-02-11T20:22:31.000000Z',
          paymentasaasid: 'pay_z5r83kca78r02km0',
          invoiceurl: 'https://www.asaas.com/i/z5r83kca78r02km0',
          paid: '2024-02-12 00:00:00',
          valuetopup: '44.90',
          tipo: 'ATIVACAO',
          adicionalid: null,
          planid: '3000',
          invoicenumber: null,
          nossonumero: null,
          netvalue: null,
          bankslipurl: null,
          split: null,
          transactionreceipturl: null,
          atualizadoem: null,
          save: '0',
          statussplitparceiro: null
        }
      ]
    },
    {
      iccid: '8955170110322137546',
      faturas: [
        {
          id: 2,
          paymentid: 73289,
          msisdnid: 32372,
          paymenttypeid: 3,
          paymentstatus: 1,
          created: '2023-06-12T14:30:32.000000Z',
          paymentasaasid: 'pay_6910966219421948',
          invoiceurl: 'https://www.asaas.com/i/6910966219421948',
          paid: '2023-06-12 00:00:00',
          valuetopup: '59.90',
          tipo: 'ATIVACAO',
          adicionalid: null,
          planid: '3501',
          invoicenumber: null,
          nossonumero: null,
          netvalue: null,
          bankslipurl: null,
          split: null,
          transactionreceipturl: null,
          atualizadoem: null,
          save: '0',
          statussplitparceiro: null
        },
        {
          id: 3,
          paymentid: 76694,
          msisdnid: 32372,
          paymenttypeid: 3,
          paymentstatus: 1,
          created: '2023-07-01T14:20:05.000000Z',
          paymentasaasid: 'pay_2303405656198453',
          invoiceurl: 'https://www.asaas.com/i/2303405656198453',
          paid: '2023-07-13 00:00:00',
          valuetopup: '59.90',
          tipo: 'Mensalidade_PF',
          adicionalid: null,
          planid: '3501',
          invoicenumber: null,
          nossonumero: null,
          netvalue: null,
          bankslipurl: null,
          split: null,
          transactionreceipturl: null,
          atualizadoem: null,
          save: '0',
          statussplitparceiro: null
        },
        {
          id: 4,
          paymentid: 84305,
          msisdnid: 32372,
          paymenttypeid: 3,
          paymentstatus: 1,
          created: '2023-08-06T14:36:23.000000Z',
          paymentasaasid: 'pay_3565634251352039',
          invoiceurl: 'https://www.asaas.com/i/3565634251352039',
          paid: '2023-08-12 00:00:00',
          valuetopup: '59.90',
          tipo: 'Mensalidade_PF',
          adicionalid: null,
          planid: '3501',
          invoicenumber: null,
          nossonumero: null,
          netvalue: null,
          bankslipurl: null,
          split: null,
          transactionreceipturl: null,
          atualizadoem: null,
          save: '0',
          statussplitparceiro: null
        },
        {
          id: 5,
          paymentid: 91597,
          msisdnid: 32372,
          paymenttypeid: 3,
          paymentstatus: 1,
          created: '2023-09-05T15:34:58.000000Z',
          paymentasaasid: 'pay_3089584873796178',
          invoiceurl: 'https://www.asaas.com/i/3089584873796178',
          paid: '2023-09-22 00:00:00',
          valuetopup: '59.90',
          tipo: 'Mensalidade_PF',
          adicionalid: null,
          planid: '3501',
          invoicenumber: null,
          nossonumero: null,
          netvalue: null,
          bankslipurl: null,
          split: null,
          transactionreceipturl: null,
          atualizadoem: null,
          save: '0',
          statussplitparceiro: null
        },
        {
          id: 6,
          paymentid: 101741,
          msisdnid: 32372,
          paymenttypeid: 3,
          paymentstatus: 1,
          created: '2023-10-17T11:32:21.000000Z',
          paymentasaasid: 'pay_2084588439170595',
          invoiceurl: 'https://www.asaas.com/i/2084588439170595',
          paid: '2023-10-22 00:00:00',
          valuetopup: '59.90',
          tipo: 'Mensalidade_PF',
          adicionalid: null,
          planid: '3501',
          invoicenumber: '300372478',
          nossonumero: '168376377',
          netvalue: '57.96',
          bankslipurl: 'https://www.asaas.com/b/pdf/2084588439170595',
          split:
            '[{"id":"fd07c7cb-57ca-4502-98d9-8b6365b582bc","walletId":"1c43b85d-3ee5-4f8c-b77c-c0269f566b3b","fixedValue":16.19,"percentualValue":null,"totalValue":16.19,"refusalReason":null,"status":"PENDING"},{"id":"4cf93c70-feae-490f-aa77-c4e49301be77","walletId":"c3eec8b1-16b2-4638-96d4-2dd4c6a61e7d","fixedValue":35.01,"percentualValue":null,"totalValue":35.01,"refusalReason":null,"status":"PENDING"},{"id":"df46e362-a5c1-4412-b478-a5317e05b368","walletId":"76a46549-46bc-4dbb-9f75-1cdb2af3e42b","fixedValue":1,"percentualValue":null,"totalValue":1,"refusalReason":null,"status":"PENDING"}]',
          transactionreceipturl: null,
          atualizadoem: null,
          save: '0',
          statussplitparceiro: null
        },
        {
          id: 7,
          paymentid: 110750,
          msisdnid: 32372,
          paymenttypeid: 3,
          paymentstatus: 1,
          created: '2023-11-16T16:39:32.000000Z',
          paymentasaasid: 'pay_9725557766290415',
          invoiceurl: 'https://www.asaas.com/i/9725557766290415',
          paid: '2023-11-17 00:00:00',
          valuetopup: '59.90',
          tipo: 'Mensalidade_PF',
          adicionalid: null,
          planid: '3501',
          invoicenumber: '322125378',
          nossonumero: '174523480',
          netvalue: '57.96',
          bankslipurl: 'https://www.asaas.com/b/pdf/9725557766290415',
          split:
            '[{"id":"4ac85a9f-b50c-4b48-b60f-62fbd96bae51","walletId":"1c43b85d-3ee5-4f8c-b77c-c0269f566b3b","fixedValue":16.19,"percentualValue":null,"totalValue":16.19,"refusalReason":null,"status":"PENDING"},{"id":"40d5f9ba-5f7c-4e29-a944-1f7fbfc59fe2","walletId":"c3eec8b1-16b2-4638-96d4-2dd4c6a61e7d","fixedValue":35.01,"percentualValue":null,"totalValue":35.01,"refusalReason":null,"status":"PENDING"},{"id":"e2fabd45-e09c-4ef2-bb0e-37737396947a","walletId":"76a46549-46bc-4dbb-9f75-1cdb2af3e42b","fixedValue":1,"percentualValue":null,"totalValue":1,"refusalReason":null,"status":"PENDING"}]',
          transactionreceipturl: null,
          atualizadoem: null,
          save: '0',
          statussplitparceiro: null
        },
        {
          id: 8,
          paymentid: 115393,
          msisdnid: 32372,
          paymenttypeid: 1,
          paymentstatus: 1,
          created: '2023-12-01T12:15:01.000000Z',
          paymentasaasid: 'pay_0754783059381755',
          invoiceurl: 'https://www.asaas.com/i/0754783059381755',
          paid: '2023-12-18 08:33:38',
          valuetopup: '59.90',
          tipo: 'Mensalidade_PF',
          adicionalid: '37',
          planid: '3501',
          invoicenumber: '333830058',
          nossonumero: '177606770',
          netvalue: '57.96',
          bankslipurl: 'https://www.asaas.com/b/pdf/0754783059381755',
          split:
            '[{"id":"e9b315b4-c8cf-4b42-a413-f7daa1e3420a","walletId":"1c43b85d-3ee5-4f8c-b77c-c0269f566b3b","fixedValue":16.19,"percentualValue":null,"totalValue":16.19,"refusalReason":null,"status":"PENDING","externalReference":null},{"id":"4bac094d-b965-4239-8895-ddcba810b11a","walletId":"c3eec8b1-16b2-4638-96d4-2dd4c6a61e7d","fixedValue":35.01,"percentualValue":null,"totalValue":35.01,"refusalReason":null,"status":"PENDING","externalReference":null},{"id":"9b8630c4-aeee-49f8-b1b0-e96503220049","walletId":"76a46549-46bc-4dbb-9f75-1cdb2af3e42b","fixedValue":1,"percentualValue":null,"totalValue":1,"refusalReason":null,"status":"PENDING","externalReference":null}]',
          transactionreceipturl: null,
          atualizadoem: null,
          save: '0',
          statussplitparceiro: null
        },
        {
          id: 9,
          paymentid: 128066,
          msisdnid: 32372,
          paymenttypeid: 3,
          paymentstatus: 1,
          created: '2024-01-12T10:28:12.000000Z',
          paymentasaasid: 'pay_typog77lzhl1mo4y',
          invoiceurl: 'https://www.asaas.com/i/typog77lzhl1mo4y',
          paid: '2024-01-18 00:00:00',
          valuetopup: '59.90',
          tipo: 'Mensalidade_PF',
          adicionalid: null,
          planid: '3501',
          invoicenumber: '353777895',
          nossonumero: '187330535',
          netvalue: '57.96',
          bankslipurl: 'https://www.asaas.com/b/pdf/typog77lzhl1mo4y',
          split:
            '[{"id":"5071d039-7371-4a3c-8a4c-b7955e4cc265","walletId":"1c43b85d-3ee5-4f8c-b77c-c0269f566b3b","fixedValue":16.19,"percentualValue":null,"totalValue":16.19,"refusalReason":null,"status":"PENDING","externalReference":null},{"id":"dd961c63-0a86-41fd-8bb4-5b8e041483b2","walletId":"c3eec8b1-16b2-4638-96d4-2dd4c6a61e7d","fixedValue":35.01,"percentualValue":null,"totalValue":35.01,"refusalReason":null,"status":"PENDING","externalReference":null},{"id":"3e4fd810-8772-4314-a6bc-dd40cd9ce4ea","walletId":"76a46549-46bc-4dbb-9f75-1cdb2af3e42b","fixedValue":1,"percentualValue":null,"totalValue":1,"refusalReason":null,"status":"PENDING","externalReference":null},{"id":"3a4d6eac-10fb-4977-a89d-7a677dc2dcd4","walletId":"c7fdbb54-25a9-4c26-a71a-76aebdce5625","fixedValue":1,"percentualValue":null,"totalValue":1,"refusalReason":null,"status":"PENDING","externalReference":null}]',
          transactionreceipturl: null,
          atualizadoem: null,
          save: '0',
          statussplitparceiro: null
        },
        {
          id: 10,
          paymentid: 138347,
          msisdnid: 32372,
          paymenttypeid: 3,
          paymentstatus: 1,
          created: '2024-02-13T10:52:48.000000Z',
          paymentasaasid: 'pay_47649reitq7wfemp',
          invoiceurl: 'https://www.asaas.com/i/47649reitq7wfemp',
          paid: '2024-02-20 00:00:00',
          valuetopup: '59.90',
          tipo: 'Mensalidade_PF',
          adicionalid: null,
          planid: '3501',
          invoicenumber: '365431399',
          nossonumero: '195475060',
          netvalue: '57.96',
          bankslipurl: 'https://www.asaas.com/b/pdf/47649reitq7wfemp',
          split:
            '[{"id":"d1ced772-78b7-4bd8-a73e-8f067789d04f","walletId":"1c43b85d-3ee5-4f8c-b77c-c0269f566b3b","fixedValue":16.19,"percentualValue":null,"totalValue":16.19,"refusalReason":null,"status":"DONE","externalReference":null},{"id":"5e153e14-b3ca-46f8-9750-049d6db00634","walletId":"c3eec8b1-16b2-4638-96d4-2dd4c6a61e7d","fixedValue":35.01,"percentualValue":null,"totalValue":35.01,"refusalReason":null,"status":"DONE","externalReference":null},{"id":"70778493-95c7-439e-80da-7bbe7016a58c","walletId":"76a46549-46bc-4dbb-9f75-1cdb2af3e42b","fixedValue":1,"percentualValue":null,"totalValue":1,"refusalReason":null,"status":"DONE","externalReference":null},{"id":"3c5684ae-f4c0-4d0d-8d19-7e13278542de","walletId":"c7fdbb54-25a9-4c26-a71a-76aebdce5625","fixedValue":1,"percentualValue":null,"totalValue":1,"refusalReason":null,"status":"DONE","externalReference":null}]',
          transactionreceipturl: null,
          atualizadoem: null,
          save: '0',
          statussplitparceiro: 'DONE'
        }
      ]
    },
    {
      iccid: '8955170110322144245',
      faturas: [
        {
          id: 11,
          paymentid: 137097,
          msisdnid: 43079,
          paymenttypeid: 3,
          paymentstatus: 1,
          created: '2024-02-08T18:34:03.000000Z',
          paymentasaasid: 'pay_xs040kwldmxe73cx',
          invoiceurl: 'https://www.asaas.com/i/xs040kwldmxe73cx',
          paid: '2024-02-08 00:00:00',
          valuetopup: '69.90',
          tipo: 'Muda Plano',
          adicionalid: null,
          planid: '4001',
          invoicenumber: '364178383',
          nossonumero: '194700045',
          netvalue: '67.7',
          bankslipurl: 'https://www.asaas.com/b/pdf/xs040kwldmxe73cx',
          split:
            '[{"id":"154ab5d2-a75a-4299-b4f2-6903894e44ad","walletId":"1c43b85d-3ee5-4f8c-b77c-c0269f566b3b","fixedValue":19.06,"percentualValue":null,"totalValue":19.06,"refusalReason":null,"status":"DONE","externalReference":null},{"id":"6764638a-cefc-4fdb-b767-d0acc9598e76","walletId":"c3eec8b1-16b2-4638-96d4-2dd4c6a61e7d","fixedValue":40.01,"percentualValue":null,"totalValue":40.01,"refusalReason":null,"status":"DONE","externalReference":null},{"id":"f813a3ad-7be7-4d00-84e5-db4f5db4f96d","walletId":"76a46549-46bc-4dbb-9f75-1cdb2af3e42b","fixedValue":1,"percentualValue":null,"totalValue":1,"refusalReason":null,"status":"DONE","externalReference":null},{"id":"e77a32c3-341e-4101-9ea6-bc5d4ec7c60a","walletId":"c7fdbb54-25a9-4c26-a71a-76aebdce5625","fixedValue":1,"percentualValue":null,"totalValue":1,"refusalReason":null,"status":"DONE","externalReference":null}]',
          transactionreceipturl: null,
          atualizadoem: null,
          save: '0',
          statussplitparceiro: 'DONE'
        },
        {
          id: 12,
          paymentid: 128484,
          msisdnid: 43079,
          paymenttypeid: 1,
          paymentstatus: 1,
          created: '2024-01-15T00:21:06.000000Z',
          paymentasaasid: 'pay_gzrdb7o5ol1wgxkn',
          invoiceurl: 'https://www.asaas.com/i/gzrdb7o5ol1wgxkn',
          paid: '2024-02-16 00:00:00',
          valuetopup: '59.90',
          tipo: 'ATIVACAO',
          adicionalid: null,
          planid: '4001',
          invoicenumber: '354475464',
          nossonumero: null,
          netvalue: null,
          bankslipurl: null,
          split:
            '[{"id":"63e23011-2b73-4b59-a2b6-fc7bd4622a8d","walletId":"1c43b85d-3ee5-4f8c-b77c-c0269f566b3b","fixedValue":16.19,"percentualValue":null,"totalValue":16.19,"refusalReason":null,"status":"DONE","externalReference":null},{"id":"0340c079-b82f-4b84-a98a-a276040f401f","walletId":"c3eec8b1-16b2-4638-96d4-2dd4c6a61e7d","fixedValue":35.01,"percentualValue":null,"totalValue":35.01,"refusalReason":null,"status":"DONE","externalReference":null},{"id":"6435a70d-54e2-47b1-91fd-d958849a04b2","walletId":"76a46549-46bc-4dbb-9f75-1cdb2af3e42b","fixedValue":1,"percentualValue":null,"totalValue":1,"refusalReason":null,"status":"DONE","externalReference":null},{"id":"fef26797-fdf2-4dc9-b558-78db879fb383","walletId":"c7fdbb54-25a9-4c26-a71a-76aebdce5625","fixedValue":1,"percentualValue":null,"totalValue":1,"refusalReason":null,"status":"DONE","externalReference":null}]',
          transactionreceipturl: null,
          atualizadoem: null,
          save: '0',
          statussplitparceiro: 'DONE'
        }
      ]
    },
    {
      iccid: '8955170110322140516',
      faturas: [
        {
          id: 13,
          paymentid: 140376,
          msisdnid: 45001,
          paymenttypeid: 3,
          paymentstatus: 1,
          created: '2024-02-18T00:11:29.000000Z',
          paymentasaasid: 'pay_3vxrm2gm45qvpg8u',
          invoiceurl: 'https://www.asaas.com/i/3vxrm2gm45qvpg8u',
          paid: '2024-02-17 00:00:00',
          valuetopup: '59.90',
          tipo: 'ATIVACAO',
          adicionalid: null,
          planid: '3501',
          invoicenumber: '366912933',
          nossonumero: null,
          netvalue: null,
          bankslipurl: null,
          split:
            '[{"id":"60553c21-50bf-4c46-9fb1-d53578204c01","walletId":"1c43b85d-3ee5-4f8c-b77c-c0269f566b3b","fixedValue":16.19,"percentualValue":null,"totalValue":16.19,"refusalReason":null,"status":"DONE","externalReference":null},{"id":"68e5fbcc-080c-4abc-86b2-0a53fe8f7bb1","walletId":"c3eec8b1-16b2-4638-96d4-2dd4c6a61e7d","fixedValue":35.01,"percentualValue":null,"totalValue":35.01,"refusalReason":null,"status":"DONE","externalReference":null},{"id":"372bf318-f114-4a97-93ce-fcb445658292","walletId":"76a46549-46bc-4dbb-9f75-1cdb2af3e42b","fixedValue":1,"percentualValue":null,"totalValue":1,"refusalReason":null,"status":"DONE","externalReference":null},{"id":"26430de8-1e70-4e1e-832a-1be06f5b44fe","walletId":"c7fdbb54-25a9-4c26-a71a-76aebdce5625","fixedValue":1,"percentualValue":null,"totalValue":1,"refusalReason":null,"status":"DONE","externalReference":null}]',
          transactionreceipturl: null,
          atualizadoem: null,
          save: '0',
          statussplitparceiro: 'DONE'
        }
      ]
    }
  ]
}

// Buscar fatura pelo iccid
mock.onGet('/api/fatura/consulta').reply(config => {
  const { iccid } = config.params

  const fatura = data.faturasClientes.find(user => user.iccid === iccid)

  return fatura ? [200, fatura] : [404, { message: 'Fatura não encontrada' }]
})
