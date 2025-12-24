import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card.jsx"
import { Label } from "../ui/Label.jsx"
import { Input } from "../ui/Input.jsx"
import { Button } from "../ui/Button.jsx"
import { cn } from "../../lib/utils"

const COLORS = [
    '#000000', '#2563eb', '#9333ea', '#dc2626', '#16a34a', '#d97706'
]

const SHAPES = [
    { id: 'square', label: 'Square' },
    { id: 'dots', label: 'Dots' },
    { id: 'rounded', label: 'Rounded' },
    { id: 'classy', label: 'Classy' },
    { id: 'extra-rounded', label: 'Soft' },
    { id: 'diamond', label: 'Diamond' },
]

const EYES = [
    { id: 'square', label: 'Square' },
    { id: 'circle', label: 'Circle' },
    { id: 'rounded', label: 'Rounded' },
]

export function DesignControls({ options, updateOption, logoPreview, handleLogoUpload, removeLogo }) {
    return (
        <div className="space-y-6 mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Design & Colors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">

                    {/* Colors */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label>Foreground Color</Label>
                            <Input
                                type="color"
                                value={options.color.dark}
                                onChange={(e) => updateOption('dark', e.target.value)}
                                className="w-12 h-8 p-1 rounded-md cursor-pointer"
                            />
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {COLORS.map(c => (
                                <button
                                    key={c}
                                    onClick={() => updateOption('dark', c)}
                                    className={cn(
                                        "w-8 h-8 rounded-full border-2 transition-transform hover:scale-110",
                                        options.color.dark === c ? "border-slate-400 scale-110 shadow-sm" : "border-transparent"
                                    )}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <input
                                type="checkbox"
                                id="useGradient"
                                checked={!!options.gradient}
                                onChange={(e) => updateOption('useGradient', e.target.checked)}
                                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <Label htmlFor="useGradient" className="mb-0">Use Gradient</Label>
                        </div>
                        {options.gradient && (
                            <div className="flex items-center justify-between pl-6 border-l-2 border-slate-100 mt-2">
                                <Label className="mb-0 text-xs">To Color</Label>
                                <Input
                                    type="color"
                                    value={options.gradient?.to || options.color.dark}
                                    onChange={(e) => updateOption('gradientTo', e.target.value)}
                                    className="w-12 h-8 p-1 rounded-md cursor-pointer"
                                />
                            </div>
                        )}
                    </div>

                    <div className="h-px bg-slate-100" />

                    {/* Shapes */}
                    <div className="space-y-3">
                        <Label>Pattern Style</Label>
                        <div className="grid grid-cols-3 gap-2">
                            {SHAPES.map(shape => (
                                <button
                                    key={shape.id}
                                    onClick={() => updateOption('style', shape.id)}
                                    className={cn(
                                        "px-3 py-2 text-sm rounded-lg border transition-all",
                                        options.style === shape.id
                                            ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                                            : "border-slate-200 text-slate-600 hover:border-slate-300"
                                    )}
                                >
                                    {shape.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Eye Style */}
                    <div className="space-y-3">
                        <Label>Eye Style</Label>
                        <div className="grid grid-cols-3 gap-2">
                            {EYES.map(eye => (
                                <button
                                    key={eye.id}
                                    onClick={() => updateOption('eyeStyle', eye.id)}
                                    className={cn(
                                        "px-3 py-2 text-sm rounded-lg border transition-all",
                                        options.eyeStyle === eye.id
                                            ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                                            : "border-slate-200 text-slate-600 hover:border-slate-300"
                                    )}
                                >
                                    {eye.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-slate-100" />

                    {/* Logo */}
                    <div className="space-y-3">
                        <Label>Logo</Label>
                        <div className="flex items-center gap-4">
                            {logoPreview ? (
                                <div className="relative group">
                                    <img src={logoPreview} alt="Logo" className="w-16 h-16 object-contain rounded-lg border border-slate-200 bg-white p-1" />
                                    <button onClick={removeLogo} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                                </div>
                            ) : (
                                <div className="w-16 h-16 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 bg-slate-50">
                                    <span className="text-xs">None</span>
                                </div>
                            )}
                            <div className="flex-1">
                                {/* Hidden file input styled as button */}
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoUpload}
                                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-0 h-auto py-2"
                                />
                            </div>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}
