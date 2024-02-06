// ** MUI Imports
// import Box from '@mui/material/Box'
import { Icon } from '@iconify/react'
import { Box, Card, CardContent, Typography, styled } from '@mui/material'
import Grid from '@mui/material/Grid'
import MuiAvatar, { AvatarProps } from '@mui/material/Avatar'

const DetalhesCliente = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6}>
        <CustomCardOverview
          color='primary'
          stats='Pré-Pago'
          title='Tipo do Plano'
          icon={<Icon color='secondary' icon='mdi:credit-card-outline' />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomCardOverview
          color='primary'
          stats='8955170110114501412'
          title='ICCID'
          icon={<Icon color='secondary' icon='mdi:barcode-scan' />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomCardOverview
          color='primary'
          stats='PLAY MÓVEL'
          title='Operadora'
          icon={<Icon color='secondary' icon='mdi:web' />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomCardOverview
          color='primary'
          stats='Portabilidade não ocorreu'
          title='Portabilidade'
          icon={<Icon color='secondary' icon='mdi:swap-horizontal' />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomCardOverview
          color='primary'
          stats='(Start) 6Gb + 100 Minutos + 60 sms'
          title='Plano'
          icon={<Icon color='secondary' icon='mdi:cellphone' />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomCardOverview
          color='primary'
          stats='ATIVO'
          title='Status do Plano'
          icon={<Icon color='secondary' icon='mdi:magnify' />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomCardOverview
          color='primary'
          stats='22/07/2023'
          title='Ativação da Linha'
          icon={<Icon color='secondary' icon='mdi:calendar-start' />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomCardOverview
          color='primary'
          stats='16/02/2024'
          title='Vencimento do Plano'
          icon={<Icon color='secondary' icon='mdi:calendar-end' />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomCardOverview
          color='primary'
          stats='5.84 GB'
          title='Dados'
          icon={<Icon color='secondary' icon='mdi:signal-cellular-3' />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomCardOverview
          color='primary'
          stats='198'
          title='Minutos'
          icon={<Icon color='secondary' icon='mdi:clock' />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomCardOverview color='primary' stats='120' title='SMS' icon={<Icon color='secondary' icon='mdi:sms' />} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomCardOverview
          color='primary'
          stats='Sem Revendedor'
          title='Revendedor'
          icon={<Icon color='secondary' icon='mdi:account-circle' />}
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
