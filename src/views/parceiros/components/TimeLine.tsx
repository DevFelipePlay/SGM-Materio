// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Button } from '@mui/material'

// ** MUI Imports
import Avatar from '@mui/material/Avatar'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import CardHeader from '@mui/material/CardHeader'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'

// ** Types

// ** Demo Component Imports

//** Types

//** Components
// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import { useState } from 'react'
import PickersCallbacksActivities from './DatePicker'

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

// CardEditarApp

const Timeline = styled(MuiTimeline)<TimelineProps>(({ theme }) => ({
  margin: 0,
  padding: 0,
  marginLeft: theme.spacing(0.75),
  '& .MuiTimelineItem-root': {
    '&:before': {
      display: 'none'
    },
    '&:last-child': {
      minHeight: 60
    }
  }
}))

function TimelinePartner() {
  // ** States

  const [drawer, setDrawer] = useState(false)

  const handleClose = () => {
    setDrawer(false)
  }

  const handleOpen = () => {
    setDrawer(true)
  }
  const SendInvoiceDrawer = () => {
    return (
      <Drawer
        open={drawer}
        anchor='right'
        variant='temporary'
        onClose={handleClose}
        sx={{ '& .MuiDrawer-paper': { width: [300, 400] } }}
        ModalProps={{ keepMounted: true }}
      >
        <Header>
          <Typography variant='h6'>Adicionar Atividade</Typography>
          <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
            <Icon icon='mdi:close' fontSize={20} />
          </IconButton>
        </Header>
        <Box sx={{ p: 5 }}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField type='email' label='Assunto' variant='outlined' />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <PickersCallbacksActivities popperPlacement={undefined} />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField rows={10} multiline label='Descrição' type='textarea' variant='outlined' />
          </FormControl>
          <div>
            <Button size='large' variant='contained' onClick={handleClose} sx={{ mr: 4 }}>
              Adicionar
            </Button>
            <Button size='large' variant='outlined' color='error' onClick={handleClose}>
              Cancelar
            </Button>
          </div>
        </Box>
      </Drawer>
    )
  }

  return (
    <Card>
      <CardHeader title='Atividades' />
      <CardContent>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
          <Button variant='contained' onClick={() => handleOpen()}>
            Adicionar atividade
          </Button>
        </Box>
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='error' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Box
                sx={{
                  mb: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, color: 'text.primary' }}>
                  User login
                </Typography>
                <Typography variant='caption'>12 min ago</Typography>
              </Box>
              <Typography variant='body2'>User login at 2:12pm</Typography>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='primary' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Box
                sx={{
                  mb: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, color: 'text.primary' }}>
                  Meeting with John
                </Typography>
                <Typography variant='caption'>45 min ago</Typography>
              </Box>
              <Typography variant='body2' sx={{ mb: 2 }}>
                React Project meeting with John @10:15am
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar alt='Avatar' src='/images/avatars/2.png' sx={{ width: 40, height: 40, mr: 2 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Leona Watkins (Client)
                  </Typography>
                  <Typography variant='body2'>CEO of Watkins Group</Typography>
                </Box>
              </Box>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='info' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Box
                sx={{
                  mb: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, color: 'text.primary' }}>
                  Create a new react project for client
                </Typography>
                <Typography variant='caption'>2 day ago</Typography>
              </Box>
              <Typography variant='body2'>Add files to new design folder</Typography>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='success' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Box
                sx={{
                  mb: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, color: 'text.primary' }}>
                  Create invoices for client
                </Typography>
                <Typography variant='caption'>12 min ago</Typography>
              </Box>
              <Typography variant='body2'>Create new invoices and send to Leona Watkins</Typography>
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: 28, height: 'auto' }}>
                  <img width={28} height={28} alt='invoice.pdf' src='/images/icons/file-icons/pdf.png' />
                </Box>
                <Typography variant='subtitle2' sx={{ ml: 2, fontWeight: 600 }}>
                  invoice.pdf
                </Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </CardContent>
      <SendInvoiceDrawer />
    </Card>
  )
}

export default TimelinePartner
