// ** MUI Imports
import { Icon } from '@iconify/react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import Grid from '@mui/material/Grid'

const AdicionarProtocoloCliente = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={
              <Box display='flex' alignItems='center' gap={2}>
                <Typography variant='h6'>Adicionar Protocolo Manual</Typography>
                <Tooltip
                  title='Para selecionar o serviço é preciso digitar o telefone do cliente.
'
                >
                  <Icon cursor='pointer' icon='mdi:information-outline' fontSize={18} />
                </Tooltip>
              </Box>
            }
          />
          <CardContent>
            <form onSubmit={e => e.preventDefault()}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size='medium'>
                    <InputLabel htmlFor='telefone-cliente'>Telefone Cliente*</InputLabel>
                    <OutlinedInput label='Telefone Cliente*' id='telefone-cliente' placeholder='(00) 0 0000-0000' />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='mvno-select'>MVNO*</InputLabel>
                    <Select
                      fullWidth
                      id='mvno-select'
                      label='MVNO*'
                      labelId='mvno-select'
                      inputProps={{ placeholder: 'Selecione o Tipo de Cliente' }}
                    >
                      <MenuItem value='playmovel'>PLAY MÓVEL</MenuItem>
                      <MenuItem value='tegg'>TEGG</MenuItem>
                      <MenuItem value='infotec'>INFOTEC</MenuItem>
                      <MenuItem value='infotec'>INFOTEC</MenuItem>
                      <MenuItem value='opuscell'>OPUSCELL</MenuItem>
                      <MenuItem value='plus'>PLUS</MenuItem>
                      <MenuItem value='seuchip'>SEUCHIP</MenuItem>
                      <MenuItem value='skymovel'>SKYMOVEL</MenuItem>
                      <MenuItem value='sucesso'>SUCESSO</MenuItem>
                      <MenuItem value='sumtel'>SUMTEL</MenuItem>
                      <MenuItem value='uaisat'>UAI SAT</MenuItem>
                      <MenuItem value='ubernetmovel'>UBERNET MÓVEL</MenuItem>
                      <MenuItem value='wipi'>WIPI</MenuItem>
                      <MenuItem value='agil'>AGIL</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='servico-select'>Serviço*</InputLabel>
                    <Select
                      fullWidth
                      id='servico-select'
                      label='Serviço*'
                      labelId='servico-select'
                      inputProps={{ placeholder: 'Selecione o Tipo de Cliente' }}
                    >
                      <MenuItem value='1'>AJUSTE DE BENEFICIOS (DADOS, VOZ E SMS)</MenuItem>
                      <MenuItem value='2'>ATIVAÇÃO DE CHIP</MenuItem>
                      <MenuItem value='3'>BLOQUEIO/DESBLOQUEIO DE CHIP</MenuItem>
                      <MenuItem value='4'>ERRO DE PORTABILIDADE</MenuItem>
                      <MenuItem value='5'>TROCA DE CHIP</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField multiline maxRows={4} label='Descrição' id='descricao' />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size='medium'>
                    <InputLabel htmlFor='numero-spec'>Número Spec</InputLabel>
                    <OutlinedInput label='Número Spec' id='numero-spec' placeholder='Número do Spec da Surf' />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size='medium'>
                    <InputLabel htmlFor='link-surf'>Link Surf</InputLabel>
                    <OutlinedInput label='Link Surf' id='link-surf' placeholder='Link do Spec da Surf' />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button type='submit' variant='contained'>
                    Adicionar
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

export default AdicionarProtocoloCliente
