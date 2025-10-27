import { Settings } from 'lucide-react'

export default function QRSettings({ options, onOptionChange }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <Settings className="w-5 h-5 text-primary mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Error Correction</label>
          <select
            value={options.errorCorrectionLevel}
            onChange={(e) => onOptionChange('errorCorrectionLevel', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="L">Low (7%)</option>
            <option value="M">Medium (15%)</option>
            <option value="Q">Quartile (25%)</option>
            <option value="H">High (30%)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Size: {options.width}px</label>
          <input
            type="range"
            min={200}
            max={600}
            step={50}
            value={options.width}
            onChange={(e) => onOptionChange('width', parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Margin: {options.margin}</label>
          <input
            type="range"
            min={0}
            max={10}
            step={1}
            value={options.margin}
            onChange={(e) => onOptionChange('margin', parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}
