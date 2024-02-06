// ** MUI Imports
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography
} from '@mui/material'
import Grid from '@mui/material/Grid'

const AdicionarProtocoloCliente = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Agendamento de Bloqueio' />
          <CardContent>
            <Typography variant='body2'>Dias</Typography>
            <FormGroup row>
              <FormControlLabel label='Seg' control={<Checkbox name='segunda' />} />
              <FormControlLabel label='Ter' control={<Checkbox defaultChecked name='terca' />} />
              <FormControlLabel label='Qua' control={<Checkbox defaultChecked name='quarta' />} />
              <FormControlLabel label='Qui' control={<Checkbox defaultChecked name='quinta' />} />
              <FormControlLabel label='Sex' control={<Checkbox defaultChecked name='sexta' />} />
              <FormControlLabel label='Sab' control={<Checkbox defaultChecked name='sabado' />} />
              <FormControlLabel label='Dom' control={<Checkbox defaultChecked name='domingo' />} />
            </FormGroup>
            <Box
              display='flex'
              sx={{
                flexDirection: {
                  xs: 'column',
                  sm: 'row'
                },
                gap: {
                  xs: 0,
                  sm: 4
                }
              }}
            >
              <Button fullWidth variant='contained' sx={{ mt: 4 }}>
                Ativar Agendamento
              </Button>
              <Button fullWidth variant='outlined' color='error' sx={{ mt: 4 }}>
                Desativar Agendamento
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AdicionarProtocoloCliente
