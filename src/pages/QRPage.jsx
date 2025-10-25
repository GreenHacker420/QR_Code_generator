import React, { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'
import { Download, QrCode, Upload, Palette, Settings, BadgeCheck } from 'lucide-react'

export default function QRPage() {
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

  // Frame options
  const [frame, setFrame] = useState({
    style: 'none', // none | badge | card | frame
    badgeText: 'Scan me',
    badgePosition: 'bottom', // bottom | top | overlay
    badgeBg: '#2563eb',
    badgeTextColor: '#ffffff',
    cardPadding: 20,
    frameText: 'Scan to visit',
    frameTextSize: 16,
  })

  const canvasRef = useRef(null)

  useEffect(() => {
    generate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, options, logo, frame])

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setLogo(reader.result)
      setLogoPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const removeLogo = () => {
    setLogo(null)
    setLogoPreview(null)
  }

  const updateOption = (key, value) => {
    if (key === 'dark' || key === 'light') {
      setOptions((prev) => ({ ...prev, color: { ...prev.color, [key]: value } }))
    } else {
      setOptions((prev) => ({ ...prev, [key]: value }))
    }
  }

  const updateFrame = (key, value) => setFrame((prev) => ({ ...prev, [key]: value }))

  const generate = async () => {
    const scale = Math.max(2, window.devicePixelRatio || 1)

    const makeQrCanvas = async () => {
      const tmp = document.createElement('canvas')
      await QRCode.toCanvas(tmp, text || ' ', { ...options, width: options.width * scale })
      return tmp
    }

    try {
      const qrCanvas = await makeQrCanvas()

      // Calculate dimensions based on style
      let padding = 0
      let badgeHeight = 0
      let frameTextHeight = 0

      if (frame.style === 'card') {
        padding = frame.cardPadding * scale
      } else if (frame.style === 'frame') {
        padding = frame.cardPadding * scale
        frameTextHeight = frame.frameTextSize * scale * 2
      }

      if (frame.style === 'badge' && frame.badgePosition !== 'overlay') {
        badgeHeight = 56 * scale
      }

      const finalWidth = qrCanvas.width + padding * 2
      const finalHeight = qrCanvas.height + padding * 2 + badgeHeight + frameTextHeight

      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      canvas.width = finalWidth
      canvas.height = finalHeight

      // Clear canvas
      ctx.clearRect(0, 0, finalWidth, finalHeight)

      // Background for card/frame styles
      if (frame.style === 'card' || frame.style === 'frame') {
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, finalWidth, finalHeight)
      }

      // Draw QR code
      const qrY = padding + (frame.style === 'frame' && frame.frameText ? frameTextHeight / 2 : 0)
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(qrCanvas, padding, qrY)

      // Draw logo if present (preserve AR and quality)
      if (logo) {
        const logoImg = new Image()
        logoImg.crossOrigin = 'anonymous'
        await new Promise((res, rej) => {
          logoImg.onload = res
          logoImg.onerror = rej
          logoImg.src = logo
        })
        const maxLogoSize = qrCanvas.width * 0.25
        const nW = logoImg.naturalWidth || logoImg.width
        const nH = logoImg.naturalHeight || logoImg.height
        const ratio = nW / nH
        let lw, lh
        if (ratio > 1) {
          lw = Math.min(maxLogoSize, nW)
          lh = lw / ratio
        } else {
          lh = Math.min(maxLogoSize, nH)
          lw = lh * ratio
        }
        const logoX = padding + (qrCanvas.width - lw) / 2
        const logoY = qrY + (qrCanvas.height - lh) / 2
        
        // Add white background behind logo for better visibility
        const logoPad = 8 * scale
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(logoX - logoPad, logoY - logoPad, lw + logoPad * 2, lh + logoPad * 2)
        
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(logoImg, logoX, logoY, lw, lh)
      }

      // Frame text (top of QR)
      if (frame.style === 'frame' && frame.frameText?.trim()) {
        ctx.font = `bold ${frame.frameTextSize * scale}px system-ui, -apple-system, sans-serif`
        ctx.fillStyle = '#1f2937'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(frame.frameText, finalWidth / 2, frameTextHeight / 2)
      }

      // Badge rendering
      if (frame.style === 'badge' && frame.badgeText?.trim()) {
        ctx.font = `600 ${15 * scale}px system-ui, -apple-system, sans-serif`
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'left'
        const textMetrics = ctx.measureText(frame.badgeText)
        const textW = textMetrics.width
        const iconSize = 20 * scale
        const gap = 8 * scale
        const padX = 18 * scale
        const pillW = iconSize + gap + textW + padX * 2
        const pillH = 40 * scale

        let pillX = (finalWidth - pillW) / 2
        let pillY = 0
        if (frame.badgePosition === 'bottom') {
          pillY = finalHeight - badgeHeight / 2 - pillH / 2
        } else if (frame.badgePosition === 'overlay') {
          pillY = qrY + qrCanvas.height - pillH - 12 * scale
        }

        // Draw pill background with shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)'
        ctx.shadowBlur = 8 * scale
        ctx.shadowOffsetY = 2 * scale
        const r = pillH / 2
        ctx.fillStyle = frame.badgeBg
        roundRect(ctx, pillX, pillY, pillW, pillH, r)
        ctx.fill()
        ctx.shadowColor = 'transparent'

        // Draw QR icon
        ctx.fillStyle = frame.badgeTextColor
        const iconX = pillX + padX
        const iconY = pillY + (pillH - iconSize) / 2
        drawQRIcon(ctx, iconX, iconY, iconSize)

        // Draw text
        ctx.fillText(frame.badgeText, iconX + iconSize + gap, pillY + pillH / 2)
      }

      setQrCodeUrl(canvas.toDataURL('image/png'))
    } catch (e) {
      console.error(e)
    }
  }

  const download = () => {
    const a = document.createElement('a')
    a.download = 'qr.png'
    a.href = qrCodeUrl
    a.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <QrCode className="w-12 h-12 text-primary mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">QR Code Generator</h1>
          </div>
          <p className="text-gray-600">Customize colors, logo, and add a scan badge/frame</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Text or URL</label>
              <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text or URL"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none" rows={3} />
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Palette className="w-5 h-5 text-primary mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Colors</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Foreground</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={options.color.dark} onChange={(e) => updateOption('dark', e.target.value)} className="w-12 h-12 rounded border border-gray-300 cursor-pointer" />
                    <input type="text" value={options.color.dark} onChange={(e) => updateOption('dark', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Background</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={options.color.light} onChange={(e) => updateOption('light', e.target.value)} className="w-12 h-12 rounded border border-gray-300 cursor-pointer" />
                    <input type="text" value={options.color.light} onChange={(e) => updateOption('light', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Settings className="w-5 h-5 text-primary mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Error Correction</label>
                  <select value={options.errorCorrectionLevel} onChange={(e) => updateOption('errorCorrectionLevel', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    <option value="L">Low (7%)</option>
                    <option value="M">Medium (15%)</option>
                    <option value="Q">Quartile (25%)</option>
                    <option value="H">High (30%)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Size: {options.width}px</label>
                  <input type="range" min={200} max={600} step={50} value={options.width} onChange={(e) => updateOption('width', parseInt(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Margin: {options.margin}</label>
                  <input type="range" min={0} max={10} step={1} value={options.margin} onChange={(e) => updateOption('margin', parseInt(e.target.value))} className="w-full" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <BadgeCheck className="w-5 h-5 text-primary mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Frame & Badge</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
                  <select value={frame.style} onChange={(e) => updateFrame('style', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    <option value="none">None</option>
                    <option value="badge">Badge</option>
                    <option value="card">Card</option>
                    <option value="frame">Frame with Text</option>
                  </select>
                </div>

                {frame.style === 'badge' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Badge Text</label>
                        <input type="text" value={frame.badgeText} onChange={(e) => updateFrame('badgeText', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Scan me" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                        <select value={frame.badgePosition} onChange={(e) => updateFrame('badgePosition', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                          <option value="bottom">Bottom</option>
                          <option value="overlay">Overlay</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Background</label>
                        <input type="color" value={frame.badgeBg} onChange={(e) => updateFrame('badgeBg', e.target.value)} className="w-full h-10 border border-gray-300 rounded cursor-pointer" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
                        <input type="color" value={frame.badgeTextColor} onChange={(e) => updateFrame('badgeTextColor', e.target.value)} className="w-full h-10 border border-gray-300 rounded cursor-pointer" />
                      </div>
                    </div>
                  </>
                )}

                {frame.style === 'frame' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Frame Text</label>
                    <input type="text" value={frame.frameText} onChange={(e) => updateFrame('frameText', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Scan to visit" />
                  </div>
                )}

                {(frame.style === 'card' || frame.style === 'frame') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Padding: {frame.cardPadding}px</label>
                    <input type="range" min={10} max={40} value={frame.cardPadding} onChange={(e) => updateFrame('cardPadding', parseInt(e.target.value))} className="w-full" />
                  </div>
                )}
              </div>
            </div>

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
                  <button onClick={removeLogo} className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">Remove Logo</button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload logo</p>
                    <p className="text-xs text-gray-400">PNG, JPG, SVG</p>
                  </div>
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>

          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
              <div className="flex flex-col items-center space-y-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  {qrCodeUrl ? (
                    <img src={qrCodeUrl} alt="QR Code" className="max-w-full h-auto" />
                  ) : (
                    <div className="w-64 h-64 flex items-center justify-center text-gray-400">
                      <QrCode className="w-32 h-32" />
                    </div>
                  )}
                </div>
                <button onClick={download} disabled={!qrCodeUrl} className="w-full flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
                  <Download className="w-5 h-5 mr-2" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  )
}

function roundRect(ctx, x, y, w, h, r) {
  const min = Math.min(w, h)
  const radius = Math.min(r, min / 2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + w, y, x + w, y + h, radius)
  ctx.arcTo(x + w, y + h, x, y + h, radius)
  ctx.arcTo(x, y + h, x, y, radius)
  ctx.arcTo(x, y, x + w, y, radius)
  ctx.closePath()
}

function drawQRIcon(ctx, x, y, size) {
  const s = size / 5
  // Draw simplified QR icon (3 corner squares)
  ctx.fillRect(x, y, s * 2, s * 2)
  ctx.fillRect(x + s * 3, y, s * 2, s * 2)
  ctx.fillRect(x, y + s * 3, s * 2, s * 2)
  // Center dots
  ctx.fillRect(x + s * 3.5, y + s * 3.5, s, s)
}
