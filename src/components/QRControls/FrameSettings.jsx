import { BadgeCheck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card.jsx"
import { Label } from "../ui/Label.jsx"
import { Input } from "../ui/Input.jsx"
import { cn } from "../../lib/utils"

export default function FrameSettings({ frame, onFrameChange }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BadgeCheck className="w-5 h-5 text-blue-500" />
          Frame & Badge
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Style</Label>
          <select
            value={frame.style}
            onChange={(e) => onFrameChange('style', e.target.value)}
            className="flex h-11 w-full rounded-xl border border-slate-200 bg-white/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all hover:bg-white/80"
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
      </CardContent>
    </Card>
  )
}

function BadgeOptions({ frame, onFrameChange }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Badge Text</Label>
          <Input
            type="text"
            value={frame.badgeText}
            onChange={(e) => onFrameChange('badgeText', e.target.value)}
            placeholder="Scan me"
          />
        </div>
        <div>
          <Label>Position</Label>
          <select
            value={frame.badgePosition}
            onChange={(e) => onFrameChange('badgePosition', e.target.value)}
            className="flex h-11 w-full rounded-xl border border-slate-200 bg-white/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all hover:bg-white/80"
          >
            <option value="bottom">Bottom</option>
            <option value="overlay">Overlay</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Background</Label>
          <div className="flex gap-2 items-center">
            <Input
              type="color"
              value={frame.badgeBg}
              onChange={(e) => onFrameChange('badgeBg', e.target.value)}
              className="w-12 h-11 p-1 cursor-pointer"
            />
            <div className="text-xs text-slate-500">{frame.badgeBg}</div>
          </div>
        </div>
        <div>
          <Label>Text Color</Label>
          <div className="flex gap-2 items-center">
            <Input
              type="color"
              value={frame.badgeTextColor}
              onChange={(e) => onFrameChange('badgeTextColor', e.target.value)}
              className="w-12 h-11 p-1 cursor-pointer"
            />
            <div className="text-xs text-slate-500">{frame.badgeTextColor}</div>
          </div>
        </div>
      </div>
    </>
  )
}

function FrameOptions({ frame, onFrameChange }) {
  return (
    <div>
      <Label>Frame Text</Label>
      <Input
        type="text"
        value={frame.frameText}
        onChange={(e) => onFrameChange('frameText', e.target.value)}
        placeholder="Scan to visit"
      />
    </div>
  )
}

function PaddingControl({ value, onChange }) {
  return (
    <div>
      <Label>Padding: {value}px</Label>
      <input
        type="range"
        min={10}
        max={60}
        step={5}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
    </div>
  )
}
