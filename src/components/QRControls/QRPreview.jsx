import { Download, QrCode } from 'lucide-react'

export default function QRPreview({ qrCodeUrl, onDownload }) {
  return (
    <div className="lg:sticky lg:top-8 h-fit">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
        <div className="flex flex-col items-center space-y-6">
          <div className="p-6 bg-gray-50 rounded-lg">
            {qrCodeUrl ? (
              <img src={qrCodeUrl} alt="QR Code" className="max-w-full h-auto" />
            ) : (
              <div className="w-64 h-64 flex items-center justify-center text-gray-400">
                <QrCode className="w-32 h-32" />
              </div>
            )}
          </div>
          <button
            onClick={onDownload}
            disabled={!qrCodeUrl}
            className="w-full flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Download className="w-5 h-5 mr-2" />
            Download
          </button>
        </div>
      </div>
    </div>
  )
}
