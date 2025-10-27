import { Upload } from 'lucide-react'

export default function LogoUploader({ logoPreview, onUpload, onRemove }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <Upload className="w-5 h-5 text-primary mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Logo</h2>
      </div>
      {logoPreview ? (
        <div className="space-y-3">
          <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
            <img src={logoPreview} alt="Logo preview" className="w-20 h-20 object-contain" />
          </div>
          <button
            onClick={onRemove}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Remove Logo
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Click to upload logo</p>
            <p className="text-xs text-gray-400">PNG, JPG, SVG</p>
          </div>
          <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
        </label>
      )}
    </div>
  )
}
