import { useEffect } from 'react'
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
    <div className="space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <BarcodeInput value={data} onChange={setData} />
          <BarcodeSettings
            format={format}
            setFormat={setFormat}
            options={options}
            updateOption={updateOption}
          />
        </div>

        <div className="lg:col-span-5 relative">
          <div className="sticky top-24">
            <BarcodePreview svgRef={svgRef} svgUrl={svgUrl} onDownload={download} />
          </div>
        </div>
      </div>
    </div>
  )
}


