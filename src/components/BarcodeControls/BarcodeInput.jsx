import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'
import { Sparkles } from 'lucide-react'

export default function BarcodeInput({ value, onChange }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600">
            <Sparkles size={18} />
          </div>
          Data Content
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Barcode Value</Label>
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="bg-white/50"
              placeholder="Enter barcode data"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
