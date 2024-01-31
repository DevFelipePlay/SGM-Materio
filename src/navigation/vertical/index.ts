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
      badgeColor: 'success',
      children: [
        {
          title: 'Parceiros',
          path: '/crm/parceiros'
        }

        // {
        //   title: 'Cards',
        //   children: [
        //     {
        //       title: 'Basic',
        //       path: '/components/cards/basic'
        //     },
        //     {
        //       title: 'Advanced',
        //       path: '/components/cards/advanced'
        //     }
        //   ]
        // },
      ]
    },
    {
      title: 'Clientes',
      path: '/clientes',
      icon: 'mdi:account-group'
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
