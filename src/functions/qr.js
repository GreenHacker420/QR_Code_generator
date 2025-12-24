import QRCode from 'qrcode'

/**
 * Creates a QR code canvas with advanced styling options
 */
export const createQRCanvas = async (text, options, scale) => {
  const {
    width = 300,
    margin = 2,
    color = { dark: '#000000', light: '#ffffff' },
    style = 'square', // square, dots, rounded, extra-rounded, classy, diamond
    eyeStyle = 'square', // square, circle, rounded
    gradient = null // { type: 'linear', from: '#...', to: '#...' }
  } = options

  // 1. Generate QR Matrix
  const qrData = QRCode.create(text || ' ', {
    errorCorrectionLevel: options.errorCorrectionLevel || 'M',
    version: options.version
  })

  const moduleCount = qrData.modules.size
  const tileSize = (width / moduleCount) * scale
  const offset = (margin * tileSize) // Margin in pixels
  const canvasSize = (width * scale) + (offset * 2)

  const canvas = document.createElement('canvas')
  canvas.width = canvasSize
  canvas.height = canvasSize
  const ctx = canvas.getContext('2d')

  // 2. Draw Background
  if (color.light && color.light !== 'transparent') {
    ctx.fillStyle = color.light
    ctx.fillRect(0, 0, canvasSize, canvasSize)
  }

  // 3. Setup Fill Style (Solid or Gradient)
  let fillStyle = color.dark
  if (gradient) {
    const grd = ctx.createLinearGradient(0, 0, canvasSize, canvasSize)
    grd.addColorStop(0, gradient.from || color.dark)
    grd.addColorStop(1, gradient.to || color.dark)
    fillStyle = grd
  }
  ctx.fillStyle = fillStyle

  // Helper to check if a module is an eye zone
  const isEye = (r, c) => {
    if (r < 7 && c < 7) return true // Top Left
    if (r < 7 && c >= moduleCount - 7) return true // Top Right
    if (r >= moduleCount - 7 && c < 7) return true // Bottom Left
    return false
  }

  // 4. Draw Modules
  for (let r = 0; r < moduleCount; r++) {
    for (let c = 0; c < moduleCount; c++) {
      if (!qrData.modules.data[r * moduleCount + c]) continue
      if (isEye(r, c)) continue

      const x = offset + c * tileSize
      const y = offset + r * tileSize
      const w = tileSize
      const h = tileSize

      ctx.beginPath()
      switch (style) {
        case 'dots':
          ctx.arc(x + w / 2, y + h / 2, w / 2, 0, Math.PI * 2)
          break
        case 'rounded':
          ctx.roundRect(x, y, w, h, w * 0.35)
          break
        case 'extra-rounded':
          ctx.roundRect(x, y, w, h, w * 0.5)
          break
        case 'classy':
          ctx.roundRect(x, y, w, h, [
            (r + c) % 2 === 0 ? w * 0.5 : 0,
            (r + c) % 2 !== 0 ? w * 0.5 : 0,
            (r + c) % 2 === 0 ? w * 0.5 : 0,
            (r + c) % 2 !== 0 ? w * 0.5 : 0
          ])
          break
        case 'diamond':
          ctx.moveTo(x + w / 2, y)
          ctx.lineTo(x + w, y + h / 2)
          ctx.lineTo(x + w / 2, y + h)
          ctx.lineTo(x, y + h / 2)
          break
        case 'square':
        default:
          ctx.rect(x, y, w, h)
      }
      ctx.fill()
    }
  }

  // 5. Draw Eyes
  const drawEye = (rOffset, cOffset) => {
    const x = offset + cOffset * tileSize
    const y = offset + rOffset * tileSize
    const size = 7 * tileSize

    // Outer Frame
    ctx.beginPath()
    if (eyeStyle === 'circle') {
      ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2)
      ctx.arc(x + size / 2, y + size / 2, size / 2 - tileSize, 0, Math.PI * 2, true)
    } else if (eyeStyle === 'rounded') {
      ctx.roundRect(x, y, size, size, tileSize * 2)
      ctx.roundRect(x + tileSize, y + tileSize, size - 2 * tileSize, size - 2 * tileSize, tileSize * 1.5)
    } else {
      ctx.rect(x, y, size, size)
      ctx.rect(x + tileSize, y + tileSize, size - 2 * tileSize, size - 2 * tileSize)
    }
    ctx.fill("evenodd")

    // Inner Dot (3x3)
    const innerX = x + 2 * tileSize
    const innerY = y + 2 * tileSize
    const innerSize = 3 * tileSize

    ctx.beginPath()
    if (eyeStyle === 'circle') {
      ctx.arc(innerX + innerSize / 2, innerY + innerSize / 2, innerSize / 2, 0, Math.PI * 2)
    } else if (eyeStyle === 'rounded') {
      ctx.roundRect(innerX, innerY, innerSize, innerSize, tileSize)
    } else {
      ctx.rect(innerX, innerY, innerSize, innerSize)
    }
    ctx.fill()
  }

  drawEye(0, 0) // TL
  drawEye(0, moduleCount - 7) // TR
  drawEye(moduleCount - 7, 0) // BL

  return canvas
}

/**
 * Reads a file and returns it as a data URL
 */
export const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * Loads an image and returns it as an Image element
 */
export const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    if (!src) resolve(null)
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

/**
 * Calculates dimensions for the logo maintaining aspect ratio
 */
export const calculateLogoDimensions = (logoImg, maxLogoSize) => {
  const nW = logoImg.naturalWidth || logoImg.width
  const nH = logoImg.naturalHeight || logoImg.height
  const ratio = nW / nH

  let width, height
  if (ratio > 1) {
    width = Math.min(maxLogoSize, nW)
    height = width / ratio
  } else {
    height = Math.min(maxLogoSize, nH)
    width = height * ratio
  }

  return { width, height }
}

/**
 * Draws a logo on the canvas with a white background
 */
export const drawLogo = (ctx, logoImg, x, y, width, height, scale) => {
  const padding = 8 * scale

  ctx.save()

  // Create circular or rounded rect clip for logo background
  ctx.beginPath()
  ctx.roundRect(x - padding, y - padding, width + padding * 2, height + padding * 2, 8 * scale)
  ctx.fillStyle = '#ffffff'
  ctx.shadowColor = 'rgba(0,0,0,0.1)'
  ctx.shadowBlur = 10 * scale
  ctx.fill()

  ctx.restore()

  // Draw logo
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(logoImg, x, y, width, height)
}

/**
 * Draws frame text at the top
 */
export const drawFrameText = (ctx, text, y, width, textSize, scale) => {
  ctx.font = `bold ${textSize * scale}px system-ui, -apple-system, sans-serif`
  ctx.fillStyle = '#1f2937'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, width / 2, y)
}

/**
 * Draws a badge with text and icon
 */
export const drawBadge = (ctx, config, scale) => {
  const { text, x, y, width, height, bgColor, textColor, iconSize } = config

  // Draw pill background with shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.1)'
  ctx.shadowBlur = 8 * scale
  ctx.shadowOffsetY = 2 * scale

  const radius = height / 2
  ctx.fillStyle = bgColor

  ctx.beginPath()
  ctx.roundRect(x, y, width, height, radius)
  ctx.closePath()

  ctx.fill()
  ctx.shadowColor = 'transparent'

  ctx.fillStyle = textColor
  ctx.font = `600 ${15 * scale}px system-ui`
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.fillText(text, x + width / 2, y + height / 2)
}