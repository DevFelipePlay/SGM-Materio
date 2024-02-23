// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Switch, TextField, styled } from '@mui/material'

function CardEditarApp() {
  const Img = styled('img')({
    right: 7,
    bottom: 0,
    height: 300,
    position: 'absolute'
  })

  return (
    <Card sx={{ overflow: 'visible', position: 'relative' }}>
      <CardContent>
        <Typography sx={{ mb: 6.5, fontWeight: 600 }}>Editar App</Typography>
        <Box
          sx={{ mb: 1.5, rowGap: 1, width: '55%', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 4 }}
        >
          <TextField fullWidth label={'Versão'} />
          <TextField type='color' fullWidth label='Cor primaria do app' />
          <TextField type='color' fullWidth label='Cor de fundo do app' />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Switch />
            <Typography variant='subtitle2'>Habilitar Dark Mode</Typography>
          </Box>
        </Box>
        <Img src={'/images/cards/pose_m1.png'} alt={'teste'} />
      </CardContent>
    </Card>
  )
}

export default CardEditarApp
