import React, { useEffect } from 'react'
import { useBarcodeState } from '../hooks/useBarcodeState'
import { useBarcodeGenerator } from '../hooks/useBarcodeGenerator'
import { BarcodeInput, BarcodeSettings, BarcodePreview } from '../components/BarcodeControls'

export default function BarcodePage() {
  const {
    data,
    setData,
    format,
    setFormat,
    options,
    updateOption,
    svgUrl,
    setSvgUrl,
    download,
  } = useBarcodeState()

  const { svgRef, generate } = useBarcodeGenerator()

  useEffect(() => {
    const url = generate(data, format, options)
    if (url) setSvgUrl(url)
  }, [data, format, options, generate, setSvgUrl])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ControlsPanel
            data={data}
            setData={setData}
            format={format}
            setFormat={setFormat}
            options={options}
            updateOption={updateOption}
          />
          <BarcodePreview svgRef={svgRef} svgUrl={svgUrl} onDownload={download} />
        </div>
      </div>
    </div>
  )
}

function Header() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Barcode Generator</h1>
      <p className="text-gray-600">Generate common barcode formats</p>
    </div>
  )
}

function ControlsPanel({ data, setData, format, setFormat, options, updateOption }) {
  return (
    <div className="space-y-6">
      <BarcodeInput value={data} onChange={setData} />
      <BarcodeSettings
        format={format}
        setFormat={setFormat}
        options={options}
        updateOption={updateOption}
      />
    </div>
  )
}
