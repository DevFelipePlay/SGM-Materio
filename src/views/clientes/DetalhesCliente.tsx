// ** MUI Imports
// import Box from '@mui/material/Box'
import { Icon } from '@iconify/react'
import { Box, Card, CardContent, Typography, styled } from '@mui/material'
import Grid from '@mui/material/Grid'
import MuiAvatar, { AvatarProps } from '@mui/material/Avatar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { DetalhesClienteType } from 'src/@fake-db/types'
import { maskCelular, maskCnpj, maskCpf } from 'src/utils/masks/masks'
import { format } from 'date-fns'
import { dadosFormatter } from 'src/utils/masks/dadosFormatter'

const DetalhesCliente = () => {
  const { query } = useRouter()
  const user = query.userID

  const [userDetails, setUserDetails] = useState<DetalhesClienteType | null>(null)

  async function getUserByCPF(cpf: string) {
    try {
      const response = await (await axios.get('/api/detalhescliente', { params: { cpf } })).data

      setUserDetails(response)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    //@ts-ignore
    getUserByCPF(user)
  }, [user])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6}>
        <CustomCardOverview
          color='primary'
          stats={userDetails?.tipoPlano}
          title='Tipo do Plano'
          icon={<Icon color='secondary' icon='mdi:credit-card-outline' />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomCardOverview
          color='primary'
          stats={userDetails?.operadora}
          title='Operadora'
          icon={<Icon color='secondary' icon='mdi:web' />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomCardOverview
          color='primary'
          stats={userDetails?.cpf.length === 14 ? maskCnpj(userDetails?.cpf) : maskCpf(userDetails?.cpf)}
          title={userDetails?.cpf.length === 14 ? 'CNPJ' : 'CPF'}
          icon={<Icon color='secondary' icon='mdi:card-account-details-outline' />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomCardOverview
          color='primary'
          stats={maskCelular(userDetails?.msisdn)}
          title='MSISDN'
          icon={<Icon color='secondary' icon='mdi:phone' />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomCardOverview
          color='primary'
          stats={userDetails?.iccid}
          title='ICCID'
          icon={<Icon color='secondary' icon='mdi:barcode-scan' />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomCardOverview
          color='primary'
          stats={userDetails?.portin}
          title='Portabilidade'
          icon={<Icon color='secondary' icon='mdi:swap-horizontal' />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomCardOverview
          color='primary'
          stats={userDetails?.plano}
          title='Plano'
          icon={<Icon color='secondary' icon='mdi:cellphone' />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomCardOverview
          color='primary'
          stats={userDetails?.statusplan}
          title='Status do Plano'
          icon={<Icon color='secondary' icon='mdi:magnify' />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomCardOverview
          color='primary'
          stats={userDetails?.criado && format(new Date(userDetails.criado), 'dd/MM/yyyy')}
          title='Ativação da Linha'
          icon={<Icon color='secondary' icon='mdi:calendar-start' />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomCardOverview
          color='primary'
          stats={userDetails?.fimplano && format(new Date(userDetails.fimplano), 'dd/MM/yyyy')}
          title='Vencimento do Plano'
          icon={<Icon color='secondary' icon='mdi:calendar-end' />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomCardOverview
          color='primary'
          stats={dadosFormatter(userDetails?.dados)}
          title='Dados'
          icon={<Icon color='secondary' icon='mdi:signal-cellular-3' />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomCardOverview
          color='primary'
          stats={userDetails?.minutos}
          title='Minutos'
          icon={<Icon color='secondary' icon='mdi:clock-outline' />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomCardOverview
          color='primary'
          stats={userDetails?.smsrestante}
          title='SMS'
          icon={<Icon color='secondary' icon='mdi:sms' />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomCardOverview
          color='primary'
          stats={userDetails?.revendedor ? userDetails.revendedor : 'Sem Revendedor'}
          title='Revendedor'
          icon={<Icon color='secondary' icon='mdi:account-circle-outline' />}
        />
      </Grid>
    </Grid>
  )
}

export default DetalhesCliente

const CustomCardOverview = (props: any) => {
  // ** Styled Avatar component
  const Avatar = styled(MuiAvatar)<AvatarProps>(({ theme }) => ({
    width: 44,
    height: 44,
    boxShadow: theme.shadows[2],
    marginRight: theme.spacing(2.75),
    backgroundColor: theme.palette.background.default,
    '& svg': {
      fontSize: '1.5rem'
    }
  }))

  // ** Props
  const { title, icon, stats, color = 'primary' } = props

  return (
    <Card
      sx={{
        boxShadow: theme => `${theme.shadows[6]} !important`
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar variant='rounded' sx={{ color: `${color}.main` }}>
            {icon}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>{title}</Typography>
            <Box sx={{ mt: 0.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <Typography sx={{ mr: 1, fontSize: '1rem', fontWeight: 600, lineHeight: 1.05 }}>{stats}</Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              ></Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
