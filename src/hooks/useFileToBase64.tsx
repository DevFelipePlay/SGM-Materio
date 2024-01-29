import { useState, useEffect } from 'react'

const useFileToBase64 = (file: File | null) => {
  const [base64, setBase64] = useState<string | null>(null)

  useEffect(() => {
    const reader = new FileReader()

    reader.onloadend = () => {
      // Remover a parte inicial da string
      const base64Data = (reader.result as string).split(',')[1]
      setBase64(base64Data)
    }

    if (file) {
      reader.readAsDataURL(file)
    } else {
      setBase64(null)
    }

    return () => {
      // Limpar recursos quando o componente é desmontado
      reader.onloadend = null
    }
  }, [file])

  return base64
}

export default useFileToBase64
