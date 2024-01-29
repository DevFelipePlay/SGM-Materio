// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'
import { Controller, useController } from 'react-hook-form'

interface FileProp {
  name: string
  type: string
  size: number
}

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(15.75)
  },
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

const FileUploaderRestrictions = ({ control, nameInput = 'file' }: any) => {
  // ** State
  const [files, setFiles] = useState<File[]>([])

  // ** Hooks
  const { field } = useController({
    name: nameInput,
    control,
    defaultValue: []
  })
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/': ['.png', '.jpg', '.jpeg', '.webp']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
      field.onChange([...field.value, ...acceptedFiles])
    },
    onDropRejected: () => {
      toast.error('Arquivo não atendeu aos requisitos', {
        duration: 2000
      })
    }
  })

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />
    } else {
      return <Icon icon='mdi:file-document-outline' />
    }
  }

  const handleRemoveFile = (file: FileProp) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)
    setFiles([...filtered])
    field.onChange(filtered)
  }

  const fileList = files.map((file: FileProp) => (
    <ListItem key={file.name}>
      <div className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <Icon icon='mdi:close' fontSize={20} />
      </IconButton>
    </ListItem>
  ))

  return (
    <Fragment>
      <Controller
        name={nameInput}
        control={control}
        defaultValue=''
        render={({ field }) => (
          <div {...getRootProps({ className: 'dropzone', ...field })}>
            <input {...getInputProps()} />
            <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
              <Img alt='Upload img' src='/images/misc/upload.png' />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: ['center', 'center', 'inherit']
                }}
              >
                <HeadingTypography variant='h5'>
                  Arraste e solte o logotipo de sua empresa aqui, ou clique para selecionar
                </HeadingTypography>
                <Typography color='textSecondary'>Somente é permitido *.jpeg, *.jpg, *.png, *.webp</Typography>
                <Typography color='textSecondary'>Máximo de 1 arquivo</Typography>
              </Box>
            </Box>
          </div>
        )}
      />

      {files.length ? (
        <Fragment>
          <List>{fileList}</List>
        </Fragment>
      ) : null}
    </Fragment>
  )
}

export default FileUploaderRestrictions
