// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useRouter } from 'next/router'

const Cliente = () => {
  const { query } = useRouter()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Detalhes'></CardHeader>
          <CardContent>
            <Typography>Cliente: {query.cliente}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Cliente
