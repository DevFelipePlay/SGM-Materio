// ** MUI Imports
import Grid from '@mui/material/Grid'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import ConsumoClienteChart from 'src/views/charts/apex-charts/ConsumoClienteChart'

const seriesDados = [
  {
    name: 'Download',
    data: [100, 120, 90, 170, 130, 160, 140, 240, 220, 180, 270, 280, 375]
  },
  {
    name: 'Upload',
    data: [60, 80, 70, 110, 80, 100, 90, 180, 160, 140, 200, 220, 275]
  }
]

const seriesMinutos = [
  {
    name: 'Minutos',
    data: [100, 120, 90, 170, 130, 160, 140, 240, 220, 180, 270, 280, 375]
  }
]

const seriesSMS = [
  {
    name: 'Minutos',
    data: [100, 120, 90, 170, 130, 160, 140, 240, 220, 180, 270, 280, 375]
  }
]

const ConsumoCliente = () => {
  return (
    <ApexChartWrapper>
      <DatePickerWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ConsumoClienteChart title='Dados Móveis' series={seriesDados} />
          </Grid>
          <Grid item xs={12}>
            <ConsumoClienteChart title='Minutos' series={seriesMinutos} />
          </Grid>
          <Grid item xs={12}>
            <ConsumoClienteChart title='SMS' series={seriesSMS} />
          </Grid>
        </Grid>
      </DatePickerWrapper>
    </ApexChartWrapper>
  )
}

export default ConsumoCliente
