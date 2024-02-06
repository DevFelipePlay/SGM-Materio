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
import { forwardRef, useState } from 'react'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { Icon } from '@iconify/react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface PickerProps {
  start: Date | number
  end: Date | number
}

const BloqueioDeLinha = () => {
  // ** States
  const [endDate, setEndDate] = useState<DateType>(null)
  const [startDate, setStartDate] = useState<DateType>(null)

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
              <Icon icon='mdi:bell-outline' />
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

  const handleOnChange = (dates: any) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CardCustomBloqueioLinha />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Agendamento de Bloqueio' />
          <CardContent>
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
                <FormControlLabel label='Seg' control={<Checkbox name='segunda' />} />
                <FormControlLabel label='Ter' control={<Checkbox name='terca' />} />
                <FormControlLabel label='Qua' control={<Checkbox name='quarta' />} />
                <FormControlLabel label='Qui' control={<Checkbox name='quinta' />} />
                <FormControlLabel label='Sex' control={<Checkbox name='sexta' />} />
                <FormControlLabel label='Sab' control={<Checkbox name='sabado' />} />
                <FormControlLabel label='Dom' control={<Checkbox name='domingo' />} />
              </FormGroup>
            </Box>

            <DatePickerWrapper>
              <DatePicker
                selectsRange
                endDate={endDate}
                id='apexchart-area'
                selected={startDate}
                startDate={startDate}
                onChange={handleOnChange}
                placeholderText='Selecione uma data'
                customInput={<CustomInput start={startDate as Date | number} end={endDate as Date | number} />}
                locale={ptBR}
              />
            </DatePickerWrapper>

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

export default BloqueioDeLinha
