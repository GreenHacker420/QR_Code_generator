import JsBarcode from 'jsbarcode'

/**
 * Generates a barcode SVG and returns it as a data URL
 */
export const generateBarcode = (svgElement, data, format, options) => {
  try {
    // Validate input data
    if (!data || data.trim() === '') {
      data = getDefaultDataForFormat(format)
    }

    JsBarcode(svgElement, data, {
      format,
      width: options.width,
      height: options.height,
      displayValue: options.displayValue,
      fontSize: options.fontSize,
      margin: options.margin,
      background: options.background,
      lineColor: options.lineColor,
      valid: (valid) => {
        if (!valid) {
          console.warn(`Invalid data for format ${format}: ${data}`)
        }
      }
    })
    
    const serializer = new XMLSerializer()
    const svgStr = serializer.serializeToString(svgElement)
    return 'data:image/svg+xml;base64,' + btoa(svgStr)
  } catch (error) {
    console.error('Error generating barcode:', error)
    return null
  }
}

/**
 * Gets default valid data for each barcode format
 */
export const getDefaultDataForFormat = (format) => {
  const defaults = {
    'CODE128': '012345678901',
    'CODE128A': 'HELLO',
    'CODE128B': 'Hello123',
    'CODE128C': '12345678',
    'EAN13': '1234567890128',
    'EAN8': '12345670',
    'EAN5': '12345',
    'EAN2': '12',
    'UPC': '123456789012',
    'UPCE': '123456',
    'CODE39': 'CODE39',
    'ITF14': '12345678901231',
    'ITF': '123456',
    'MSI': '1234567890',
    'MSI10': '1234567890',
    'MSI11': '1234567890',
    'MSI1010': '1234567890',
    'MSI1110': '1234567890',
    'pharmacode': '1234',
    'codabar': 'A1234A',
    'GenericBarcode': '1234567890',
  }
  return defaults[format] || '012345678901'
}

/**
 * Gets format requirements and hints
 */
export const getFormatInfo = (format) => {
  const info = {
    'CODE128': 'Accepts any ASCII character',
    'CODE128A': 'Uppercase letters, numbers, and control characters',
    'CODE128B': 'All ASCII characters',
    'CODE128C': 'Even number of digits (0-9)',
    'EAN13': 'Exactly 12 or 13 digits',
    'EAN8': 'Exactly 7 or 8 digits',
    'EAN5': 'Exactly 5 digits',
    'EAN2': 'Exactly 2 digits',
    'UPC': 'Exactly 11 or 12 digits',
    'UPCE': 'Exactly 6, 7, or 8 digits',
    'CODE39': 'Letters (A-Z), digits (0-9), and -. $/:+%',
    'ITF14': 'Exactly 13 or 14 digits',
    'ITF': 'Even number of digits',
    'MSI': 'Digits (0-9) only',
    'MSI10': 'Digits (0-9) only',
    'MSI11': 'Digits (0-9) only',
    'MSI1010': 'Digits (0-9) only',
    'MSI1110': 'Digits (0-9) only',
    'pharmacode': 'Number from 3 to 131070',
    'codabar': 'Digits and characters A B C D + - : . / $',
    'GenericBarcode': 'Any characters',
  }
  return info[format] || 'No specific requirements'
}

/**
 * Downloads a data URL as a file
 */
export const downloadFile = (dataUrl, filename) => {
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  link.click()
}

/**
 * Barcode format options
 * All formats supported by JsBarcode library
 */
export const BARCODE_FORMATS = [
  // Most Common Formats
  { value: 'CODE128', label: 'CODE128 (Auto)' },
  { value: 'CODE128A', label: 'CODE128 A' },
  { value: 'CODE128B', label: 'CODE128 B' },
  { value: 'CODE128C', label: 'CODE128 C' },
  
  // Retail & Product Codes
  { value: 'EAN13', label: 'EAN-13 (13 digits)' },
  { value: 'EAN8', label: 'EAN-8 (8 digits)' },
  { value: 'EAN5', label: 'EAN-5 (5 digits)' },
  { value: 'EAN2', label: 'EAN-2 (2 digits)' },
  { value: 'UPC', label: 'UPC (12 digits)' },
  { value: 'UPCE', label: 'UPC-E (6 digits)' },
  
  // Industrial & Logistics
  { value: 'CODE39', label: 'CODE39' },
  { value: 'ITF14', label: 'ITF-14 (14 digits)' },
  { value: 'ITF', label: 'ITF (Interleaved 2 of 5)' },
  
  // Medical & Specialized
  { value: 'MSI', label: 'MSI' },
  { value: 'MSI10', label: 'MSI Mod 10' },
  { value: 'MSI11', label: 'MSI Mod 11' },
  { value: 'MSI1010', label: 'MSI Mod 1010' },
  { value: 'MSI1110', label: 'MSI Mod 1110' },
  { value: 'pharmacode', label: 'Pharmacode' },
  
  // Other Formats
  { value: 'codabar', label: 'Codabar' },
  { value: 'GenericBarcode', label: 'Generic Barcode' },
]
