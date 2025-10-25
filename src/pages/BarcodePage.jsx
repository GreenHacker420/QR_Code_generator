import React, { useEffect, useRef, useState } from 'react'
import JsBarcode from 'jsbarcode'
import { Download, Settings } from 'lucide-react'

export default function BarcodePage() {
  const [data, setData] = useState('012345678901')
  const [format, setFormat] = useState('CODE128')
  const [options, setOptions] = useState({
    width: 2,
    height: 120,
    displayValue: true,
    fontSize: 18,
    margin: 10,
    background: '#ffffff',
    lineColor: '#000000',
  })
  const svgRef = useRef(null)
  const [svgUrl, setSvgUrl] = useState('')

  useEffect(() => {
    renderBarcode()
  }, [data, format, options])

  const renderBarcode = () => {
    try {
      const svg = svgRef.current
      JsBarcode(svg, data || ' ', {
        format,
        width: options.width,
        height: options.height,
        displayValue: options.displayValue,
        fontSize: options.fontSize,
        margin: options.margin,
        background: options.background,
        lineColor: options.lineColor,
      })
      const serializer = new XMLSerializer()
      const svgStr = serializer.serializeToString(svg)
      setSvgUrl('data:image/svg+xml;base64,' + btoa(svgStr))
    } catch (e) {
      console.error(e)
    }
  }

  const download = () => {
    const a = document.createElement('a')
    a.download = 'barcode.svg'
    a.href = svgUrl
    a.click()
  }

  const updateOption = (key, value) => setOptions((p) => ({ ...p, [key]: value }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Barcode Generator</h1>
          <p className="text-gray-600">Generate common barcode formats</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
              <input value={data} onChange={(e) => setData(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Settings className="w-5 h-5 text-primary mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                  <select value={format} onChange={(e) => setFormat(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    <option value="CODE128">CODE128</option>
                    <option value="EAN13">EAN-13</option>
                    <option value="EAN8">EAN-8</option>
                    <option value="UPC">UPC</option>
                    <option value="ITF14">ITF-14</option>
                    <option value="MSI">MSI</option>
                    <option value="pharmacode">Pharmacode</option>
                    <option value="codabar">Codabar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
                  <input type="range" min={1} max={4} value={options.width} onChange={(e) => updateOption('width', parseInt(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                  <input type="range" min={60} max={200} value={options.height} onChange={(e) => updateOption('height', parseInt(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                  <input type="range" min={10} max={28} value={options.fontSize} onChange={(e) => updateOption('fontSize', parseInt(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Line Color</label>
                  <input type="color" value={options.lineColor} onChange={(e) => updateOption('lineColor', e.target.value)} className="w-full h-10 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Background</label>
                  <input type="color" value={options.background} onChange={(e) => updateOption('background', e.target.value)} className="w-full h-10 border rounded" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
              <div className="flex flex-col items-center space-y-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <svg ref={svgRef}></svg>
                </div>
                <button onClick={download} className="w-full flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors">
                  <Download className="w-5 h-5 mr-2" />
                  Download SVG
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
