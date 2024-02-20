// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const SchemaBloquearDesbloquearForm = z.object({
  voz: z.enum(['bloquear', 'desbloquear']),
  sms: z.enum(['bloquear', 'desbloquear']),
  dados: z.enum(['bloquear', 'desbloquear', 'reduzir'])
})

type BloquearDesbloquearFormData = z.infer<typeof SchemaBloquearDesbloquearForm>

const CardCustomBloqueioLinha = () => {
  // ** Hook
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<BloquearDesbloquearFormData>({
    resolver: zodResolver(SchemaBloquearDesbloquearForm)
  })

  async function handleSubmitBloquearDesbloquearForm(data: BloquearDesbloquearFormData) {
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log(data)
  }

  return (
    <Card>
      <CardHeader
        title='Bloquear / Desbloquar'
        titleTypographyProps={{
          sx: { lineHeight: '1 rem !important', letterSpacing: '0.15px !important' }
        }}
      />
      <CardContent
        sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}
        component='form'
        onSubmit={handleSubmit(handleSubmitBloquearDesbloquearForm)}
      >
        <Grid item xs={12}>
          <Typography variant='body2'>Voz - Origina</Typography>
          <RadioGroup row aria-label='voz' defaultValue='desbloquear'>
            <FormControlLabel
              value='bloquear'
              control={<Radio color='error' />}
              {...register('voz')}
              label='Bloquear'
            />
            <FormControlLabel
              value='desbloquear'
              control={<Radio color='success' />}
              {...register('voz')}
              label='Desbloquear'
            />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body2'>SMS</Typography>
          <RadioGroup row aria-label='sms' defaultValue='desbloquear'>
            <FormControlLabel
              value='bloquear'
              control={<Radio color='error' />}
              {...register('sms')}
              label='Bloquear'
            />
            <FormControlLabel
              value='desbloquear'
              control={<Radio color='success' />}
              {...register('sms')}
              label='Desbloquear'
            />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body2'>Dados</Typography>
          <RadioGroup row aria-label='dados' defaultValue='desbloquear'>
            <FormControlLabel
              value='bloquear'
              control={<Radio color='error' />}
              {...register('dados')}
              label='Bloquear'
            />
            <FormControlLabel
              value='desbloquear'
              control={<Radio color='success' />}
              {...register('dados')}
              label='Desbloquear'
            />
            <FormControlLabel
              value='reduzir'
              control={<Radio color='warning' />}
              {...register('dados')}
              label='Reduzir'
            />
          </RadioGroup>
        </Grid>
        <Button fullWidth variant='contained' sx={{ mt: 4 }} type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Atualizando...' : 'Atualizar'}
        </Button>
      </CardContent>
    </Card>
  )
}

export default CardCustomBloqueioLinha
