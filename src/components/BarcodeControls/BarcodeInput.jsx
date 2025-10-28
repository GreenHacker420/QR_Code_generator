import React from 'react'

export default function BarcodeInput({ value, onChange }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        placeholder="Enter barcode data"
      />
    </div>
  )
}
