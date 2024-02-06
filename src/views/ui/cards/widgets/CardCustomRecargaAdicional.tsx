// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Divider } from '@mui/material'

interface CardCustomRecargaAdicionalProps {
  nomeRecarga: string
  valorRecarga: string
}

const CardCustomRecargaAdicional = ({ nomeRecarga, valorRecarga }: CardCustomRecargaAdicionalProps) => {
  // ** Hook

  return (
    <Card>
      <CardHeader
        title={nomeRecarga}
        titleTypographyProps={{
          sx: { lineHeight: '1 rem !important', letterSpacing: '0.15px !important' }
        }}
      />
      <Divider sx={{ width: '85%', mx: 'auto' }} />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ mr: 4 }}>
            R$ {valorRecarga}
          </Typography>
        </Box>
        <Button fullWidth variant='contained'>
          Recarregar
        </Button>
      </CardContent>
    </Card>
  )
}

export default CardCustomRecargaAdicional
