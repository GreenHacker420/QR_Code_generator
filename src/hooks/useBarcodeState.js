import { useState, useCallback } from 'react'

export function useBarcodeState() {
  const [data, setData] = useState('012345678901')
  const [format, setFormat] = useState('CODE128')
  const [svgUrl, setSvgUrl] = useState('')
  const [options, setOptions] = useState({
    width: 2,
    height: 120,
    displayValue: true,
    fontSize: 18,
    margin: 10,
    background: '#ffffff',
    lineColor: '#000000',
  })

  const updateOption = useCallback((key, value) => {
    setOptions((prev) => ({ ...prev, [key]: value }))
  }, [])

  const download = useCallback(() => {
    if (!svgUrl) return
    const link = document.createElement('a')
    link.download = 'barcode.svg'
    link.href = svgUrl
    link.click()
  }, [svgUrl])

  return {
    data,
    setData,
    format,
    setFormat,
    options,
    updateOption,
    svgUrl,
    setSvgUrl,
    download,
  }
}
