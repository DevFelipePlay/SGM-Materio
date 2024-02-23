// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 200,
  height: 200,
  padding: '1rem',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.primary.main}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))

const PartnerProfileHeader = () => {
  const designationIcon = 'mdi:briefcase-outline'

  return (
    <Card>
      <CardMedia
        component='img'
        alt='profile-header'
        image={'/images/pages/profile-banner.png'}
        sx={{
          height: { xs: 150, md: 250 }
        }}
      />
      <CardContent
        sx={{
          pt: 0,
          mt: -30,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: { xs: 'center', md: 'center' }
        }}
      >
        <ProfilePicture src={'/images/icon.png'} alt='profile-picture' />
        <Typography variant='h5' sx={{ my: 4 }}>
          Play Móvel
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',

            // flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: ['wrap', 'nowrap']
          }}
        >
          <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'center'] }}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: ['center', 'flex-start']
              }}
            >
              <Box sx={{ mr: 5, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon={designationIcon} />
                <Typography sx={{ ml: 1, color: 'text.secondary', fontWeight: 600 }}>MVNO</Typography>
              </Box>
              <Box sx={{ mr: 5, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='mdi:map-marker-outline' />
                <Typography sx={{ ml: 1, color: 'text.secondary', fontWeight: 600 }}>Brasilia - DF</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='mdi:calendar-blank' />
                <Typography sx={{ ml: 1, color: 'text.secondary', fontWeight: 600 }}>01/01/2000</Typography>
              </Box>
            </Box>
          </Box>
          <Button variant='contained' startIcon={<Icon icon='mdi:account-check-outline' fontSize={20} />}>
            Editar
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default PartnerProfileHeader
