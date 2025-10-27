import { useCallback, useRef } from 'react'
import {
  createQRCanvas,
  loadImage,
  calculateLogoDimensions,
  drawLogo,
  drawFrameText,
  drawBadge,
} from '../functions/qr'

export function useQRGenerator() {
  const canvasRef = useRef(null)

  const calculateDimensions = useCallback((qrCanvas, frame, scale) => {
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

    return { finalWidth, finalHeight, padding, badgeHeight, frameTextHeight }
  }, [])

  const setupCanvas = useCallback((canvas, ctx, width, height, frame) => {
    canvas.width = width
    canvas.height = height
    ctx.clearRect(0, 0, width, height)

    if (frame.style === 'card' || frame.style === 'frame') {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, width, height)
    }
  }, [])

  const renderQRCode = useCallback((ctx, qrCanvas, padding, frameTextHeight, frame) => {
    const qrY = padding + (frame.style === 'frame' && frame.frameText ? frameTextHeight / 2 : 0)
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(qrCanvas, padding, qrY)
    return qrY
  }, [])

  const renderLogo = useCallback(async (ctx, qrCanvas, padding, qrY, scale, logo) => {
    if (!logo) return

    const logoImg = await loadImage(logo)
    const maxLogoSize = qrCanvas.width * 0.25
    const { width, height } = calculateLogoDimensions(logoImg, maxLogoSize)
    
    const logoX = padding + (qrCanvas.width - width) / 2
    const logoY = qrY + (qrCanvas.height - height) / 2
    
    drawLogo(ctx, logoImg, logoX, logoY, width, height, scale)
  }, [])

  const renderFrameText = useCallback((ctx, finalWidth, frameTextHeight, scale, frame) => {
    if (frame.style === 'frame' && frame.frameText?.trim()) {
      drawFrameText(ctx, frame.frameText, frameTextHeight / 2, finalWidth, frame.frameTextSize, scale)
    }
  }, [])

  const renderBadge = useCallback((ctx, finalWidth, finalHeight, qrY, qrCanvas, badgeHeight, scale, frame) => {
    if (frame.style !== 'badge' || !frame.badgeText?.trim()) return

    ctx.font = `600 ${15 * scale}px system-ui, -apple-system, sans-serif`
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

    drawBadge(ctx, {
      text: frame.badgeText,
      x: pillX,
      y: pillY,
      width: pillW,
      height: pillH,
      bgColor: frame.badgeBg,
      textColor: frame.badgeTextColor,
      iconSize,
    }, scale)
  }, [])

  const generateQR = useCallback(async (text, options, logo, frame) => {
    const scale = Math.max(2, window.devicePixelRatio || 1)

    try {
      const qrCanvas = await createQRCanvas(text, options, scale)
      const { finalWidth, finalHeight, padding, badgeHeight, frameTextHeight } = 
        calculateDimensions(qrCanvas, frame, scale)

      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      setupCanvas(canvas, ctx, finalWidth, finalHeight, frame)

      const qrY = renderQRCode(ctx, qrCanvas, padding, frameTextHeight, frame)
      await renderLogo(ctx, qrCanvas, padding, qrY, scale, logo)
      renderFrameText(ctx, finalWidth, frameTextHeight, scale, frame)
      renderBadge(ctx, finalWidth, finalHeight, qrY, qrCanvas, badgeHeight, scale, frame)

      return canvas.toDataURL('image/png')
    } catch (error) {
      console.error('Error generating QR code:', error)
      return null
    }
  }, [calculateDimensions, setupCanvas, renderQRCode, renderLogo, renderFrameText, renderBadge])

  return { canvasRef, generateQR }
}
