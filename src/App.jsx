import React, { useState, useEffect, useRef } from 'react'
import QRCode from 'qrcode'
import { Download, QrCode, Upload, Palette, Settings } from 'lucide-react'

function App() {
  const [text, setText] = useState('https://example.com')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [options, setOptions] = useState({
    errorCorrectionLevel: 'H',
    width: 300,
    margin: 4,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  })
  const [logo, setLogo] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    generateQRCode()
  }, [text, options, logo])

  const generateQRCode = async () => {
    if (!text) return

    try {
      // If there's a logo, merge it with the QR code
      if (logo) {
        // Create a new image element for the logo
        const logoImg = new Image()
        logoImg.crossOrigin = 'anonymous'
        
        // Wait for logo to load before generating QR code
        logoImg.onload = async () => {
          // High-DPI rendering
          const scale = Math.max(2, window.devicePixelRatio || 1)

          // Generate QR code on a temporary canvas at high resolution
          const tempCanvas = document.createElement('canvas')
          await QRCode.toCanvas(tempCanvas, text, { ...options, width: options.width * scale })
          
          const canvas = canvasRef.current
          const ctx = canvas.getContext('2d')
          
          // Set canvas size to match QR code
          canvas.width = tempCanvas.width
          canvas.height = tempCanvas.height
          
          // Draw QR code (keep edges crisp)
          ctx.imageSmoothingEnabled = false
          ctx.drawImage(tempCanvas, 0, 0)
          
          // Calculate logo size maintaining aspect ratio (max 25% of QR code size)
          const maxLogoSize = canvas.width * 0.25
          const naturalW = logoImg.naturalWidth || logoImg.width
          const naturalH = logoImg.naturalHeight || logoImg.height
          const logoAspectRatio = naturalW / naturalH
          
          let logoWidth, logoHeight
          if (logoAspectRatio > 1) {
            // Landscape logo
            logoWidth = Math.min(maxLogoSize, naturalW)
            logoHeight = logoWidth / logoAspectRatio
          } else {
            // Portrait or square logo
            logoHeight = Math.min(maxLogoSize, naturalH)
            logoWidth = logoHeight * logoAspectRatio
          }
          
          const logoX = (canvas.width - logoWidth) / 2
          const logoY = (canvas.height - logoHeight) / 2
          
          // Add white padding around logo area to ensure QR code scannability
          const padding = 8
          ctx.fillStyle = '#FFFFFF'
          ctx.fillRect(
            logoX - padding, 
            logoY - padding, 
            logoWidth + padding * 2, 
            logoHeight + padding * 2
          )
          
          // Draw logo on top maintaining aspect ratio (preserves transparency)
          ctx.imageSmoothingEnabled = true
          ctx.imageSmoothingQuality = 'high'
          ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight)
          
          setQrCodeUrl(canvas.toDataURL('image/png'))
        }
        
        logoImg.onerror = () => {
          console.error('Error loading logo')
          // Generate QR code without logo on error
          generateQRCodeWithoutLogo()
        }
        
        logoImg.src = logo
      } else {
        generateQRCodeWithoutLogo()
      }
    } catch (err) {
      console.error('Error generating QR code:', err)
    }
  }

  const generateQRCodeWithoutLogo = async () => {
    try {
      const scale = Math.max(2, window.devicePixelRatio || 1)
      const tempCanvas = document.createElement('canvas')
      await QRCode.toCanvas(tempCanvas, text, { ...options, width: options.width * scale })

      // Ensure crisp QR output
      const canvas = document.createElement('canvas')
      canvas.width = tempCanvas.width
      canvas.height = tempCanvas.height
      const ctx = canvas.getContext('2d')
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(tempCanvas, 0, 0)

      setQrCodeUrl(canvas.toDataURL('image/png'))
    } catch (err) {
      console.error('Error generating QR code:', err)
    }
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogo(reader.result)
        setLogoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    setLogo(null)
    setLogoPreview(null)
  }

  const downloadQRCode = () => {
    const link = document.createElement('a')
    link.download = 'qrcode.png'
    link.href = qrCodeUrl
    link.click()
  }

  const updateOption = (key, value) => {
    if (key === 'dark' || key === 'light') {
      setOptions(prev => ({
        ...prev,
        color: {
          ...prev.color,
          [key]: value
        }
      }))
    } else {
      setOptions(prev => ({
        ...prev,
        [key]: value
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <QrCode className="w-12 h-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">QR Code Generator</h1>
          </div>
          <p className="text-lg text-gray-600">
            Create custom QR codes with colors, logos, and more
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            {/* Input Text Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text or URL
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text or URL to encode"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                rows="3"
              />
            </div>

            {/* Color Options Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Palette className="w-5 h-5 text-primary mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Colors</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Foreground
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={options.color.dark}
                      onChange={(e) => updateOption('dark', e.target.value)}
                      className="w-12 h-12 rounded border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={options.color.dark}
                      onChange={(e) => updateOption('dark', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={options.color.light}
                      onChange={(e) => updateOption('light', e.target.value)}
                      className="w-12 h-12 rounded border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={options.color.light}
                      onChange={(e) => updateOption('light', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Settings className="w-5 h-5 text-primary mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Error Correction Level
                  </label>
                  <select
                    value={options.errorCorrectionLevel}
                    onChange={(e) => updateOption('errorCorrectionLevel', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="L">Low (7%)</option>
                    <option value="M">Medium (15%)</option>
                    <option value="Q">Quartile (25%)</option>
                    <option value="H">High (30%)</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-500">
                    Higher levels allow more damage but create denser QR codes
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size: {options.width}px
                  </label>
                  <input
                    type="range"
                    min="200"
                    max="600"
                    step="50"
                    value={options.width}
                    onChange={(e) => updateOption('width', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Margin: {options.margin}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={options.margin}
                    onChange={(e) => updateOption('margin', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Logo Upload Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Upload className="w-5 h-5 text-primary mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Logo</h2>
              </div>
              {logoPreview ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                    <img src={logoPreview} alt="Logo preview" className="w-20 h-20 object-contain" />
                  </div>
                  <button
                    onClick={removeLogo}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Remove Logo
                  </button>
                </div>
              ) : (
                <div>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Click to upload logo</p>
                      <p className="text-xs text-gray-400">PNG, JPG, SVG (max 2MB)</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
              <div className="flex flex-col items-center space-y-6">
                <div className="p-8 bg-gray-50 rounded-lg">
                  {qrCodeUrl ? (
                    <img src={qrCodeUrl} alt="QR Code" className="max-w-full h-auto" />
                  ) : (
                    <div className="w-64 h-64 flex items-center justify-center text-gray-400">
                      <QrCode className="w-32 h-32" />
                    </div>
                  )}
                </div>
                <button
                  onClick={downloadQRCode}
                  disabled={!qrCodeUrl}
                  className="w-full flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download QR Code
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden canvas for logo merging */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  )
}

export default App
