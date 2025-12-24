import { Download } from 'lucide-react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

export default function BarcodePreview({ svgRef, svgUrl, onDownload }) {
  return (
    <div className="h-full">
      <Card className="h-full border-0 shadow-2xl shadow-indigo-500/10 bg-white/60 backdrop-blur-xl ring-1 ring-white/50">
        <div className="p-8 flex flex-col items-center justify-center min-h-[400px] gap-8">

          <div className="relative group w-full flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative z-10 p-8 bg-white rounded-xl shadow-lg ring-1 ring-black/5 w-full flex justify-center overflow-hidden">
              <svg ref={svgRef} className="max-w-full h-auto" />
            </div>
          </div>

          <div className="flex gap-4 w-full">
            <Button
              onClick={onDownload}
              disabled={!svgUrl}
              className="flex-1 h-12 text-base shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download SVG
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
