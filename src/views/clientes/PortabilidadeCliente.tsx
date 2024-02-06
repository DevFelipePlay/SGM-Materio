// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import AlertTitle from '@mui/material/AlertTitle'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { FormControlLabel, Switch } from '@mui/material'
import { useState } from 'react'
import { Icon } from '@iconify/react'

const PortabilidadeCliente = () => {
  // ** States
  const [showInputInserirOperadora, setShowInputInserirOperadora] = useState<boolean>(false)

  function handleShowInputInserirOperadora() {
    setShowInputInserirOperadora(showInputInserirOperadora === false ? true : false)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Alert icon={false} severity='info' sx={{ mb: 4 }}>
              <AlertTitle sx={{ fontWeight: 600, mb: theme => `${theme.spacing(1)} !important` }}>
                Status da portabilidade: Não solicitada
              </AlertTitle>
              <ul>
                <li>Número Antigo: (61) 98339-8676</li>
                <li>Número Novo: (61) 92004-6246</li>
                <li>Solicitado em: 5 de fevereiro de 2024 às 16:03</li>
                <li>Encerra em: 5 de fevereiro de 2024 às 16:03</li>
              </ul>
            </Alert>

            <form onSubmit={e => e.preventDefault()}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <FormControl fullWidth size='medium'>
                    <InputLabel htmlFor='numero-a-portar'>Número a portar</InputLabel>
                    <OutlinedInput
                      label='Número a portar'
                      id='numero-a-portar'
                      placeholder='(00) 0 0000-0000'
                      startAdornment={<Icon icon='mdi:phone' style={{ marginRight: '0.5rem' }} fontSize={24} />}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Switch />}
                    label='Inserir operadora manualmente'
                    onChange={handleShowInputInserirOperadora}
                  />
                </Grid>

                {showInputInserirOperadora && (
                  <Grid item xs={12}>
                    <FormControl fullWidth size='medium'>
                      <InputLabel htmlFor='operadora'>Código da Operadora (RN1)</InputLabel>
                      <OutlinedInput label='Código da Operadora (RN1)' id='operadora' placeholder='Ex: 55306' />
                    </FormControl>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Button type='submit' variant='contained'>
                    Solicitar Portabilidade
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PortabilidadeCliente
