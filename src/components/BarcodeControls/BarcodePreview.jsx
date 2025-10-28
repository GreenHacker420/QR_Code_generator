import React from 'react'
import { Download } from 'lucide-react'

export default function BarcodePreview({ svgRef, svgUrl, onDownload }) {
  return (
    <div className="lg:sticky lg:top-8 h-fit">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
        <div className="flex flex-col items-center space-y-6">
          <div className="p-6 bg-gray-50 rounded-lg">
            <svg ref={svgRef}></svg>
          </div>
          <button
            onClick={onDownload}
            disabled={!svgUrl}
            className="w-full flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Download className="w-5 h-5 mr-2" />
            Download SVG
          </button>
        </div>
      </div>
    </div>
  )
}
