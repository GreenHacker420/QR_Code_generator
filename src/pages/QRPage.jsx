import React, { useEffect } from 'react'
import { QrCode } from 'lucide-react'
import { useQRState } from '../hooks/useQRState'
import { useQRGenerator } from '../hooks/useQRGenerator'
import TextInput from '../components/QRControls/TextInput'
import ColorPicker from '../components/QRControls/ColorPicker'
import QRSettings from '../components/QRControls/QRSettings'
import FrameSettings from '../components/QRControls/FrameSettings'
import LogoUploader from '../components/QRControls/LogoUploader'
import QRPreview from '../components/QRControls/QRPreview'

export default function QRPage() {
  const {
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
  } = useQRState()

  const { canvasRef, generateQR } = useQRGenerator()

  useEffect(() => {
    const generate = async () => {
      const url = await generateQR(text, options, logo, frame)
      if (url) setQrCodeUrl(url)
    }
    generate()
  }, [text, options, logo, frame, generateQR, setQrCodeUrl])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ControlsPanel
            text={text}
            setText={setText}
            options={options}
            updateOption={updateOption}
            frame={frame}
            updateFrame={updateFrame}
            logoPreview={logoPreview}
            handleLogoUpload={handleLogoUpload}
            removeLogo={removeLogo}
          />
          <QRPreview qrCodeUrl={qrCodeUrl} onDownload={download} />
        </div>

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  )
}

function Header() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <QrCode className="w-12 h-12 text-primary mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">QR Code Generator</h1>
      </div>
      <p className="text-gray-600">Customize colors, logo, and add a scan badge/frame</p>
    </div>
  )
}

function ControlsPanel({
  text,
  setText,
  options,
  updateOption,
  frame,
  updateFrame,
  logoPreview,
  handleLogoUpload,
  removeLogo,
}) {
  return (
    <div className="space-y-6">
      <TextInput value={text} onChange={setText} />
      <ColorPicker colors={options.color} onColorChange={updateOption} />
      <QRSettings options={options} onOptionChange={updateOption} />
      <FrameSettings frame={frame} onFrameChange={updateFrame} />
      <LogoUploader
        logoPreview={logoPreview}
        onUpload={handleLogoUpload}
        onRemove={removeLogo}
      />
    </div>
  )
}
