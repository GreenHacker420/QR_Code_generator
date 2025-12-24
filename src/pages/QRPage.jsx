import { useEffect } from 'react'
import { useQRState } from '../hooks/useQRState'
import { useQRGenerator } from '../hooks/useQRGenerator'
import { ConfigurationPanel } from '../components/qr/ConfigurationPanel'
import { DesignControls } from '../components/qr/DesignControls'
import { PreviewPanel } from '../components/qr/PreviewPanel'
import FrameSettings from '../components/QRControls/FrameSettings'
import SEO from '../components/SEO'

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
    // Debounce generation slightly to avoid lag on color drag
    const timer = setTimeout(() => {
      const generate = async () => {
        const url = await generateQR(text, options, logo, frame)
        if (url) setQrCodeUrl(url)
      }
      generate()
    }, 50)
    return () => clearTimeout(timer)
  }, [text, options, logo, frame, generateQR, setQrCodeUrl])

  return (
    <div className="space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
      <SEO
        title="Free QR Code Generator | Create Custom QR Codes with Logos"
        description="Generate unlimited custom QR codes with colors, logos, and advanced frames. High-quality SVG & PNG download. 100% Free, no sign-up required."
        canonical="https://qr.greenhacker.in/"
      />
      <h1 className="sr-only">Free Online QR Code Generator with Logo Support</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          <ConfigurationPanel
            text={text}
            onTextChange={setText}
          />

          <DesignControls
            options={options}
            updateOption={updateOption}
            logoPreview={logoPreview}
            handleLogoUpload={handleLogoUpload}
            removeLogo={removeLogo}
          />

          <FrameSettings
            frame={frame}
            onFrameChange={updateFrame}
          />
        </div>

        {/* Right Preview Column (Sticky) */}
        <div className="lg:col-span-5 relative">
          <PreviewPanel
            qrCodeUrl={qrCodeUrl}
            onDownload={download}
          />
        </div>
      </div>

      {/* Hidden Canvas for generation */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}
