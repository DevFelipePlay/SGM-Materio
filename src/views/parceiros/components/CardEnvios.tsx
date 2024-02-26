import { Button, Card, CardContent, Link, TextField } from '@mui/material'
import React, { useEffect } from 'react'

// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** Next Import

// ** MUI Imports
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import CustomDataGrid from 'src/components/CustomDataGrid/CustomDataGrid'
import { GridColDef } from '@mui/x-data-grid'
import { getInitials } from 'src/utils/get-initials'
import { maskCpf } from 'src/utils/masks/masks'
import router from 'next/router'
import axios from 'axios'
import { ClientsType } from 'src/@fake-db/types'

const LinkStyled = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

const renderClient = (row: ClientsType) => {
  if (row.avatar.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 30, height: 30 }} />
  } else {
    return (
      <CustomAvatar skin='light' color={'primary'} sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}>
        {getInitials(row.name ? row.name : 'John Doe')}
      </CustomAvatar>
    )
  }
}

interface CellType {
  row: ClientsType
}
type NewType = CellType

export const columns: GridColDef[] = [
  {
    flex: 1,
    field: 'name',
    headerName: 'Clientes',
    renderCell: ({ row }: NewType) => {
      const { name, cpf } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <LinkStyled href='/apps/user/view/overview/'>{name}</LinkStyled>
            <Typography noWrap variant='caption'>
              {`CPF: ${maskCpf(cpf)}`}
            </Typography>
          </Box>
        </Box>
      )
    }
  }
]

export default function CardEnvios() {
  //** States
  const [activeTab, setActiveTab] = useState<string>('sms')
  const [loading, setLoading] = useState(false)
  const [clients, setClients] = useState([])

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

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  useEffect(() => {
    setLoading(true)
    axios.get('/users/list').then(response => {
      setClients(response.data)
      setLoading(false)
      console.log(response.data)
    })
  }, [])

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography sx={{ mb: 6.5, fontWeight: 600 }}>Envios de notificações para usuários</Typography>
        <TabContext value={activeTab}>
          <TabList
            variant='scrollable'
            scrollButtons='auto'
            onChange={handleChange}
            aria-label='forced scroll tabs example'
          >
            <Tab
              value='sms'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                  <Icon fontSize={20} icon='mdi:send-variant-outline' />
                  Envio de SMS
                </Box>
              }
            />
            <Tab
              value='push'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                  <Icon fontSize={20} icon='mdi:bell-outline' />
                  Envio de Push
                </Box>
              }
            />
          </TabList>
          <Box sx={{ mt: 4 }}>
            <>
              <TabPanel sx={{ p: 0 }} value='sms'>
                <Typography sx={{ mb: 2 }}>Menssagem para SMS:</Typography>
                <TextField
                  rows={5}
                  multiline
                  label='Digite sua menssagem'
                  type='textarea'
                  variant='outlined'
                  fullWidth
                />
                <Box sx={{ p: 2 }}>
                  <CustomDataGrid
                    columns={columns}
                    checkboxSelection
                    rows={clients}
                    loading={loading}
                    onCellClick={e => router.push(`parceiros/teste/${e.row.id}`)}
                    hasButton={false}
                    hasExport={false}
                  />
                  <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button variant='contained'>Enviar SMS</Button>
                  </Box>
                </Box>
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value='push'>
                <Typography sx={{ mb: 2 }}> Push Notification:</Typography>
                <TextField
                  multiline
                  label='Titulo da notificação'
                  type='textarea'
                  variant='outlined'
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  rows={5}
                  multiline
                  label='Digite sua menssagem'
                  type='textarea'
                  variant='outlined'
                  fullWidth
                />
                <Box sx={{ p: 2 }}>
                  <CustomDataGrid
                    columns={columns}
                    checkboxSelection
                    rows={clients}
                    loading={loading}
                    onCellClick={e => router.push(`parceiros/teste/${e.row.id}`)}
                    hasButton={false}
                    hasExport={false}
                  />
                </Box>
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Button variant='contained'>Enviar Push</Button>
                </Box>
              </TabPanel>
            </>
          </Box>
        </TabContext>
      </CardContent>
    </Card>
  )
}
