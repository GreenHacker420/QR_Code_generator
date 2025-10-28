import { useRef, useCallback } from 'react'
import { generateBarcode } from '../functions/barcode'

export function useBarcodeGenerator() {
  const svgRef = useRef(null)

  const generate = useCallback((data, format, options) => {
    if (!svgRef.current) return null
    return generateBarcode(svgRef.current, data, format, options)
  }, [])

  return { svgRef, generate }
}
