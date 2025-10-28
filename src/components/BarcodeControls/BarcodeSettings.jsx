import { Settings } from 'lucide-react'
import { BARCODE_FORMATS, getFormatInfo } from '../../functions/barcode'

export default function BarcodeSettings({ format, setFormat, options, updateOption }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <Settings className="w-5 h-5 text-primary mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
      </div>
      <div className="space-y-4">
        <FormatSelect value={format} onChange={setFormat} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RangeInput
            label="Width"
            min={1}
            max={4}
            value={options.width}
            onChange={(val) => updateOption('width', val)}
          />
          <RangeInput
            label="Height"
            min={60}
            max={200}
            value={options.height}
            onChange={(val) => updateOption('height', val)}
          />
          <RangeInput
            label="Font Size"
            min={10}
            max={28}
            value={options.fontSize}
            onChange={(val) => updateOption('fontSize', val)}
          />
          <RangeInput
            label="Margin"
            min={0}
            max={30}
            value={options.margin}
            onChange={(val) => updateOption('margin', val)}
          />
          <ColorInput
            label="Line Color"
            value={options.lineColor}
            onChange={(val) => updateOption('lineColor', val)}
          />
          <ColorInput
            label="Background"
            value={options.background}
            onChange={(val) => updateOption('background', val)}
          />
        </div>
      </div>
    </div>
  )
}

function FormatSelect({ value, onChange }) {
  const formatInfo = getFormatInfo(value)
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      >
        {BARCODE_FORMATS.map((format) => (
          <option key={format.value} value={format.value}>
            {format.label}
          </option>
        ))}
      </select>
      {formatInfo && (
        <p className="mt-1 text-xs text-gray-500 italic">
          ℹ️ {formatInfo}
        </p>
      )}
    </div>
  )
}

function RangeInput({ label, min, max, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}: {value}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full"
      />
    </div>
  )
}

function ColorInput({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 border rounded cursor-pointer"
      />
    </div>
  )
}
