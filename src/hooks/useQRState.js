import { useState, useCallback } from 'react'
import { readFileAsDataURL } from '../functions/qr'

export function useQRState() {
  const [text, setText] = useState('https://example.com')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [options, setOptions] = useState({
    errorCorrectionLevel: 'H',
    width: 300,
    margin: 4,
    color: { dark: '#000000', light: '#FFFFFF' },
  })
  const [logo, setLogo] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const [frame, setFrame] = useState({
    style: 'none',
    badgeText: 'Scan me',
    badgePosition: 'bottom',
    badgeBg: '#2563eb',
    badgeTextColor: '#ffffff',
    cardPadding: 20,
    frameText: 'Scan to visit',
    frameTextSize: 16,
  })

  const handleLogoUpload = useCallback(async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    try {
      const dataUrl = await readFileAsDataURL(file)
      setLogo(dataUrl)
      setLogoPreview(dataUrl)
    } catch (error) {
      console.error('Error uploading logo:', error)
    }
  }, [])

  const removeLogo = useCallback(() => {
    setLogo(null)
    setLogoPreview(null)
  }, [])

  const updateOption = useCallback((key, value) => {
    if (key === 'dark' || key === 'light') {
      setOptions((prev) => ({ ...prev, color: { ...prev.color, [key]: value } }))
    } else {
      setOptions((prev) => ({ ...prev, [key]: value }))
    }
  }, [])

  const updateFrame = useCallback((key, value) => {
    setFrame((prev) => ({ ...prev, [key]: value }))
  }, [])

  const download = useCallback(() => {
    if (!qrCodeUrl) return
    const link = document.createElement('a')
    link.download = 'qr-code.png'
    link.href = qrCodeUrl
    link.click()
  }, [qrCodeUrl])

  return {
    text,
    setText,
    qrCodeUrl,
    setQrCodeUrl,
    options,
    updateOption,
    logo,
    logoPreview,
    handleLogoUpload,
    removeLogo,
    frame,
    updateFrame,
    download,
  }
}
