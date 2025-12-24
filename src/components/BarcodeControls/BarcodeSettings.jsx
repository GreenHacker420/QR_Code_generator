import { Settings, Info } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'
import { Label } from '../ui/Label'
import { Input } from '../ui/Input'
import { BARCODE_FORMATS, getFormatInfo } from '../../functions/barcode'

export default function BarcodeSettings({ format, setFormat, options, updateOption }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600">
            <Settings size={18} />
          </div>
          Configuration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <FormatSelect value={format} onChange={setFormat} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
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
      </CardContent>
    </Card>
  )
}

function FormatSelect({ value, onChange }) {
  const formatInfo = getFormatInfo(value)

  return (
    <div className="space-y-3">
      <Label>Format</Label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-11 appearance-none bg-white/50 border border-slate-200 rounded-xl px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all cursor-pointer hover:bg-white/80"
        >
          {BARCODE_FORMATS.map((format) => (
            <option key={format.value} value={format.value}>
              {format.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>
      {formatInfo && (
        <p className="flex items-start gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
          <Info className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
          {formatInfo}
        </p>
      )}
    </div>
  )
}

function RangeInput({ label, min, max, value, onChange }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-slate-600">{label}</Label>
        <span className="text-xs font-mono font-medium text-slate-900 bg-slate-100 px-2 py-1 rounded">
          {value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      />
    </div>
  )
}

function ColorInput({ label, value, onChange }) {
  return (
    <div className="space-y-3">
      <Label className="text-slate-600">{label}</Label>
      <div className="flex gap-3">
        <div className="relative">
          <div
            className="w-11 h-11 rounded-xl border border-slate-200 shadow-sm transition-transform active:scale-95"
            style={{ backgroundColor: value }}
          />
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="font-mono uppercase"
          maxLength={7}
        />
      </div>
    </div>
  )
}
