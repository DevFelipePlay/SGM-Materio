// ** React Imports
import { SyntheticEvent, useState, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import CircularProgress from '@mui/material/CircularProgress'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'
import ConsumoCliente from '../clientes/ConsumoCliente'
import RecargaAdicionalCliente from '../clientes/RecargaAdicionalCliente'
import PortabilidadeCliente from '../clientes/PortabilidadeCliente'
import FaturasCliente from '../clientes/FaturasCliente'
import BloqueioDeLinha from '../clientes/BloqueioDeLinha'
import AdicionarProtocoloCliente from '../clientes/AdicionarProtocoloCliente'
import Gerenciar from './Details/Gerenciar'

interface Props {
  tab: string
  invoiceData: InvoiceType[]
  userID: string
}

// ** Styled Tab component
const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minWidth: 65,
    minHeight: 40,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('md')]: {
      minWidth: 130
    }
  }
}))

const TabDatails = ({ tab, invoiceData, userID }: Props) => {
  // ** State
  const [activeTab, setActiveTab] = useState<string>('gerenciar')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // ** Hooks
  const router = useRouter()

  const handleChange = (event: SyntheticEvent, value: string) => {
    setIsLoading(true)
    setActiveTab(value)
    router
      .push({
        pathname: `/crm/parceiros/detalhes/${value.toLowerCase()}/${userID}`
      })
      .then(() => setIsLoading(false))
  }

  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  useEffect(() => {
    if (invoiceData) {
      setIsLoading(false)
    }
  }, [invoiceData])

  return (
    <TabContext value={activeTab}>
      <TabList
        variant='scrollable'
        scrollButtons='auto'
        onChange={handleChange}
        aria-label='forced scroll tabs example'
      >
        <Tab
          value='gerenciar'
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
              <Icon fontSize={20} icon='mdi:account-outline' />
              Gerenciar
            </Box>
          }
        />
        <Tab
          value='usuarios'
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
              <Icon fontSize={20} icon='mdi:chart-pie' />
              Usuários
            </Box>
          }
        />
        <Tab
          value='planos'
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
              <Icon fontSize={20} icon='mdi:plus-circle' />
              Planos
            </Box>
          }
        />
        <Tab
          value='planos'
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
              <Icon fontSize={20} icon='mdi:plus-circle' />
              Pós-pago
            </Box>
          }
        />
        <Tab
          value='financeiro'
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
              <Icon fontSize={20} icon='mdi:swap-horizontal' />
              Financeiro
            </Box>
          }
        />
        <Tab
          value='relatorio'
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
              <Icon fontSize={20} icon='material-symbols:paid' /> Relatório
            </Box>
          }
        />
      </TabList>
      <Box sx={{ mt: 4 }}>
        {isLoading ? (
          <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <CircularProgress sx={{ mb: 4 }} />
            <Typography>Carregando...</Typography>
          </Box>
        ) : (
          <>
            <TabPanel sx={{ p: 0 }} value='gerenciar'>
              <Gerenciar />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='consumo'>
              <ConsumoCliente />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='recargaadicional'>
              <RecargaAdicionalCliente />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='portabilidade'>
              <PortabilidadeCliente />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='cobrancas'>
              <FaturasCliente />
            </TabPanel>
            {/* <TabPanel sx={{ p: 0 }} value='recorrencia'>
              <UserViewConnection />
            </TabPanel> */}
            <TabPanel sx={{ p: 0 }} value='bloqueio'>
              <BloqueioDeLinha />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='addprotocolo'>
              <AdicionarProtocoloCliente />
            </TabPanel>
          </>
        )}
      </Box>
    </TabContext>
  )
}

export default TabDatails
