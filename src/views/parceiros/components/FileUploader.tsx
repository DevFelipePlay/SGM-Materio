// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'

interface FileProp {
  name: string
  type: string
  size: number
}

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 160
  }
}))

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

const FileUploader = () => {
  // ** State
  const [files, setFiles] = useState<File[]>([])

  // ** Hook
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })

  const img = files.map((file: FileProp) => (
    <img key={file.name} alt={file.name} className='single-file-image' src={URL.createObjectURL(file as any)} />
  ))

  return (
    <Box
      {...getRootProps({ className: 'dropzone' })}
      sx={files.length ? { height: 450 } : { display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <input {...getInputProps()} />
      {files.length ? (
        img
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: ['column', 'column', 'column'],
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Img alt='Upload img' src='/images/misc/upload.png' />
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'center'] }}>
            <HeadingTypography variant='h5'>
              {' '}
              Para inserir multiplos ICCID's faça p Upload de arquivos aqui!
            </HeadingTypography>

            <Typography color='textSecondary' sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}>
              Arraste um arquivo ou clique para subir uma nova lista de ICCID's
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default FileUploader
