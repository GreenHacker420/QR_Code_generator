import QRCode from 'qrcode'

/**
 * Creates a QR code canvas element
 */
export const createQRCanvas = async (text, options, scale) => {
  const canvas = document.createElement('canvas')
  await QRCode.toCanvas(canvas, text || ' ', { 
    ...options, 
    width: options.width * scale 
  })
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
 * Draws a rounded rectangle on a canvas context
 */
export const drawRoundedRect = (ctx, x, y, w, h, r) => {
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

/**
 * Draws a simplified QR icon (3 corner squares)
 */
export const drawQRIcon = (ctx, x, y, size) => {
  const s = size / 5
  // Draw 3 corner squares
  ctx.fillRect(x, y, s * 2, s * 2)
  ctx.fillRect(x + s * 3, y, s * 2, s * 2)
  ctx.fillRect(x, y + s * 3, s * 2, s * 2)
  // Center dot
  ctx.fillRect(x + s * 3.5, y + s * 3.5, s, s)
}

/**
 * Loads an image and returns it as an Image element
 */
export const loadImage = (src) => {
  return new Promise((resolve, reject) => {
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
  
  // Add white background behind logo
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(x - padding, y - padding, width + padding * 2, height + padding * 2)
  
  // Draw logo with high quality
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
  drawRoundedRect(ctx, x, y, width, height, radius)
  ctx.fill()
  ctx.shadowColor = 'transparent'
  
  // Draw icon and text
  ctx.fillStyle = textColor
  const iconX = x + 18 * scale
  const iconY = y + (height - iconSize) / 2
  drawQRIcon(ctx, iconX, iconY, iconSize)
  
  // Draw text
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'left'
  ctx.fillText(text, iconX + iconSize + 8 * scale, y + height / 2)
}