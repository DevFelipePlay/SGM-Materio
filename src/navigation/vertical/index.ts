// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'mdi:home-outline'
    },
    {
      title: 'CRM',
      icon: 'mdi:monitor-dashboard',
      children: [
        {
          title: 'Parceiros',
          path: '/crm/parceiros'
        },

        {
          title: 'Enviar',
          path: '/crm/enviar'
        },
        {
          title: 'Aprovar',
          children: [
            {
              title: 'Envio de SMS',
              path: '/components/cards/basic'
            },

            {
              title: 'Envio de Push',
              path: '/components/cards/advanced'
            },
            {
              title: 'Troca de Chip',
              path: '/components/cards/advanced'
            }
          ]
        }
      ]
    },
    {
      title: 'Clientes',
      path: '/clientes',
      icon: 'mdi:account-group'
    },
    {
      title: 'Pós-Pago',
      icon: 'mdi:credit-card-outline',
      badgeColor: 'primary',
      children: [
        {
          title: 'Recargas',
          path: '/pos-pago/recargas'
        },
        {
          title: 'Faturas',
          path: '/pos-pago/faturas'
        }
      ]
    },
    {
      title: 'Ações',
      icon: 'mdi:cursor-default-click-outline',
      badgeColor: 'primary',
      children: [
        {
          title: 'Consulta de ICCID',
          path: '/acoes/consultar-iccid'
        },
        {
          title: 'Inserir ICCID',
          path: '/acoes/inserir-iccid'
        },
        {
          title: 'Enviar WhatsApp',
          path: '/acoes/enviar-whatsapp'
        },
        {
          title: 'Enviar SMS',
          path: '/acoes/enviar-sms'
        },
        {
          title: 'Enviar Push',
          path: '/acoes/enviar-push'
        },
        {
          title: 'Simulador',
          path: '/acoes/simulador'
        },
        {
          title: 'Troca de Chip',
          path: '/acoes/trocar-chip'
        }
      ]
    }

    // {
    //   title: 'Second Page',
    //   path: '/second-page',
    //   icon: 'mdi:email-outline'
    // },
    // {
    //   path: '/acl',
    //   action: 'read',
    //   subject: 'acl-page',
    //   title: 'Access Control',
    //   icon: 'mdi:shield-outline'
    // }
  ]
}

export default navigation
