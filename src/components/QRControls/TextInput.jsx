export default function TextInput({ value, onChange }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Text or URL</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter text or URL"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
        rows={3}
      />
    </div>
  )
}
