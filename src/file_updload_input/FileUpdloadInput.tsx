import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import SendIcon from '@mui/icons-material/Send';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ChangeEvent, useState } from 'react'

// Configuración de tu bucket S3
const S3_BUCKET: string | undefined = process.env.REACT_APP_AWS_S3_BUCKET_NAME ?? "" 
const REGION: string | undefined = process.env.REACT_APP_AWS_S3_REGION ?? "" // Cambia esto a tu región
const accessKeyId: string | undefined = process.env.REACT_APP_AWS_S3_ACCESS_KEY ?? "" 
const secretAccessKey: string | undefined = process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY ?? ""

// Configura el cliente de S3 con tus credenciales de IAM
const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  },
})

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
})

export const FileUploadInput = () => {

  const [progress, setProgress] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState('');

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
  
    if (e.currentTarget.files === null) return
    else
      setSelectedFile(e.currentTarget.files[0])
      setFileName(e.currentTarget.files[0].name)
      setProgress('');
  }

  const updloadFile = async () => {
    
    if (!selectedFile) return
    else {
      const params = {
        Bucket: S3_BUCKET,
        Key: selectedFile.name,
        Body: selectedFile,
        ContentType: selectedFile.type,
  
      }
      setProgress('Archivo subiendo...');
  
      try {
        // Ejecuta el comando de subida a S3
        await s3Client.send(new PutObjectCommand(params));
        setProgress('Archivo subido con éxito.');
      } catch (error) {
        setProgress('Error al subir el archivo.');
        console.error('Error al subir el archivo:', error);
      } finally {
        setSelectedFile(null);
      }
    }
  }

  return (
    <>
      <div className='progressContainer'>
        <p>Upload Progress: {progress}</p>
      </div>

      <Button
        color="success"
        component="label"
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload file { fileName }
        <VisuallyHiddenInput type="file" onChange={handleFileInput} />
      </Button>

      <Button variant="contained" onClick={updloadFile} endIcon={<SendIcon />}>
        Send
      </Button>
    </>
  )
}