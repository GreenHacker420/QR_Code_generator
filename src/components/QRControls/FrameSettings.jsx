import { BadgeCheck } from 'lucide-react'

export default function FrameSettings({ frame, onFrameChange }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <BadgeCheck className="w-5 h-5 text-primary mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Frame & Badge</h2>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
          <select
            value={frame.style}
            onChange={(e) => onFrameChange('style', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="none">None</option>
            <option value="badge">Badge</option>
            <option value="card">Card</option>
            <option value="frame">Frame with Text</option>
          </select>
        </div>

        {frame.style === 'badge' && <BadgeOptions frame={frame} onFrameChange={onFrameChange} />}
        {frame.style === 'frame' && <FrameOptions frame={frame} onFrameChange={onFrameChange} />}
        {(frame.style === 'card' || frame.style === 'frame') && (
          <PaddingControl value={frame.cardPadding} onChange={(val) => onFrameChange('cardPadding', val)} />
        )}
      </div>
    </div>
  )
}

function BadgeOptions({ frame, onFrameChange }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Badge Text</label>
          <input
            type="text"
            value={frame.badgeText}
            onChange={(e) => onFrameChange('badgeText', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Scan me"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
          <select
            value={frame.badgePosition}
            onChange={(e) => onFrameChange('badgePosition', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="bottom">Bottom</option>
            <option value="overlay">Overlay</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Background</label>
          <input
            type="color"
            value={frame.badgeBg}
            onChange={(e) => onFrameChange('badgeBg', e.target.value)}
            className="w-full h-10 border border-gray-300 rounded cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
          <input
            type="color"
            value={frame.badgeTextColor}
            onChange={(e) => onFrameChange('badgeTextColor', e.target.value)}
            className="w-full h-10 border border-gray-300 rounded cursor-pointer"
          />
        </div>
      </div>
    </>
  )
}

function FrameOptions({ frame, onFrameChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Frame Text</label>
      <input
        type="text"
        value={frame.frameText}
        onChange={(e) => onFrameChange('frameText', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        placeholder="Scan to visit"
      />
    </div>
  )
}

function PaddingControl({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Padding: {value}px</label>
      <input
        type="range"
        min={10}
        max={40}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full"
      />
    </div>
  )
}
