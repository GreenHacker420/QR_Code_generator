import { Palette } from 'lucide-react'

export default function ColorPicker({ colors, onColorChange }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <Palette className="w-5 h-5 text-primary mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Colors</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ColorInput
          label="Foreground"
          value={colors.dark}
          onChange={(value) => onColorChange('dark', value)}
        />
        <ColorInput
          label="Background"
          value={colors.light}
          onChange={(value) => onColorChange('light', value)}
        />
      </div>
    </div>
  )
}

function ColorInput({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-12 rounded border border-gray-300 cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>
    </div>
  )
}
