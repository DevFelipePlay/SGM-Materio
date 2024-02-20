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
  InputAdornment,
  TextField,
  Typography
} from '@mui/material'
import Grid from '@mui/material/Grid'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import CardCustomBloqueioLinha from 'src/views/ui/cards/widgets/CardCustomBloqueioLinha'
import DatePicker from 'react-datepicker'
import { forwardRef } from 'react'
import { Icon } from '@iconify/react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form'

interface PickerProps {
  start: Date | number
  end: Date | number
}

// ** Zod

const SchemaAgendamentoBloqueioForm = z.object({
  segunda: z.boolean(),
  terca: z.boolean(),
  quarta: z.boolean(),
  quinta: z.boolean(),
  sexta: z.boolean(),
  sabado: z.boolean(),
  domingo: z.boolean(),
  data: z.any()
})

type AgendamentoBloqueioFormData = z.infer<typeof SchemaAgendamentoBloqueioForm>

const BloqueioDeLinha = () => {
  const CustomInput = forwardRef((props: PickerProps, ref) => {
    const startDate = props.start !== null ? format(props.start, 'dd/MM/yyyy') : ''
    const endDate = props.end !== null ? ` - ${format(props.end, 'dd/MM/yyyy')}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return (
      <TextField
        {...props}
        fullWidth
        value={value}
        inputRef={ref}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Icon icon='mdi:calendar-range' />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <Icon icon='mdi:chevron-down' />
            </InputAdornment>
          )
        }}
      />
    )
  })

  // ** Hooks
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting }
  } = useForm<AgendamentoBloqueioFormData>()

  async function handleSubmitAgendamentoBloqueio(data: AgendamentoBloqueioFormData) {
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log(data)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CardCustomBloqueioLinha />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Agendamento de Bloqueio' />
          <CardContent component='form' onSubmit={handleSubmit(handleSubmitAgendamentoBloqueio)}>
            <Box
              sx={{
                mb: {
                  xs: 4,
                  sm: 6
                }
              }}
            >
              <Typography variant='body2'>Dias</Typography>
              <FormGroup row>
                <FormControlLabel label='Seg' control={<Checkbox name='segunda' />} {...register('segunda')} />
                <FormControlLabel label='Ter' control={<Checkbox name='terca' />} {...register('terca')} />
                <FormControlLabel label='Qua' control={<Checkbox name='quarta' />} {...register('quarta')} />
                <FormControlLabel label='Qui' control={<Checkbox name='quinta' />} {...register('quinta')} />
                <FormControlLabel label='Sex' control={<Checkbox name='sexta' />} {...register('sexta')} />
                <FormControlLabel label='Sab' control={<Checkbox name='sabado' />} {...register('sabado')} />
                <FormControlLabel label='Dom' control={<Checkbox name='domingo' />} {...register('domingo')} />
              </FormGroup>
            </Box>

            <Controller
              control={control}
              name='data'
              render={({ field }) => (
                <DatePickerWrapper>
                  <DatePicker
                    selectsRange
                    endDate={field.value ? field.value[1] : null}
                    id='apexchart-area'
                    selected={field.value ? field.value[0] : null}
                    startDate={field.value ? field.value[0] : null}
                    onChange={dates => field.onChange(dates)}
                    placeholderText='Selecione uma data'
                    customInput={
                      <CustomInput
                        start={field.value ? field.value[0] : null}
                        end={field.value ? field.value[1] : null}
                      />
                    }
                    locale={ptBR}
                  />
                </DatePickerWrapper>
              )}
            />

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
                },
                mt: {
                  xs: 0,
                  sm: 2
                }
              }}
            >
              <Button fullWidth variant='contained' sx={{ mt: 4 }} type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Ativando...' : 'Ativar Agendamento'}
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

export default BloqueioDeLinha
