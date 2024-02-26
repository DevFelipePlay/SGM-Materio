import { Box, Button, Card, CardContent, Divider, TextField, Typography } from '@mui/material'
import React from 'react'
import FileUploader from './FileUploader'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

export default function CardInserirICCID() {
  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography sx={{ mb: 6.5, fontWeight: 600 }}>Inserir ICCID</Typography>
        <Typography sx={{ mb: 2 }} variant='subtitle2'>
          Para inserir um único ICCID use o campo abaixo:
        </Typography>
        <TextField label='ICCID que deseja inserir' fullWidth />
        <Divider sx={{ my: 5 }} />
        <Typography sx={{ mb: 2 }} variant='subtitle2'>
          Para inserir múltiplos ICCID's use o campo abaixo:
        </Typography>
        <DropzoneWrapper sx={{ mt: 5 }}>
          <FileUploader />
        </DropzoneWrapper>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', mt: 2 }}>
          <Button variant='contained'>Inserir</Button>
        </Box>
      </CardContent>
    </Card>
  )
}
