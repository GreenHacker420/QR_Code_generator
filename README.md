# QR Code & Barcode Generator

A modern, feature-rich QR code and barcode generator with extensive customization options, logo embedding, and support for 22+ barcode formats. Built with React and a clean, modular architecture.

## ✨ Features

### QR Code Generator
- 🎨 **Customizable Colors** - Full control over foreground and background colors
- 📏 **Adjustable Size** - Scale QR codes from 200px to 600px
- 🛡️ **Error Correction** - Four levels: Low (7%), Medium (15%), Quartile (25%), High (30%)
- 🖼️ **Logo Embedding** - Add custom logos with automatic aspect ratio preservation
- 🎨 **Frame Styles** - Choose from Badge, Card, or Frame with Text
- 🏷️ **Custom Badges** - Add "Scan me" badges with customizable text, colors, and positions
- 💾 **PNG Export** - Download high-quality QR codes
- 🎯 **Real-time Preview** - See changes instantly
- � **Responsive Design** - Works on all devices

### Barcode Generator
- 📊 **22+ Barcode Formats** - Support for all major barcode types
- 🎨 **Customizable Appearance** - Adjust width, height, colors, margins
- 📝 **Smart Defaults** - Automatic valid data for each format
- ℹ️ **Format Hints** - Real-time guidance on format requirements
- 💾 **SVG Export** - Download scalable vector graphics
- 🎯 **Live Preview** - Instant barcode generation
- ✅ **Validation** - Built-in format validation with helpful warnings

## 🎯 Supported Barcode Formats

### Most Common
- CODE128 (Auto, A, B, C variants)

### Retail & Product Codes
- EAN-13, EAN-8, EAN-5, EAN-2
- UPC, UPC-E

### Industrial & Logistics
- CODE39
- ITF-14, ITF (Interleaved 2 of 5)

### Medical & Specialized
- MSI (Standard, Mod 10, Mod 11, Mod 1010, Mod 1110)
- Pharmacode

### Other
- Codabar
- Generic Barcode

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🏗️ Project Structure

```
src/
├── pages/
│   ├── QRPage.jsx          # QR code generator page (102 lines)
│   └── BarcodePage.jsx     # Barcode generator page (69 lines)
├── components/
│   ├── QRControls/         # QR code UI components
│   │   ├── TextInput.jsx
│   │   ├── ColorPicker.jsx
│   │   ├── QRSettings.jsx
│   │   ├── FrameSettings.jsx
│   │   ├── LogoUploader.jsx
│   │   └── QRPreview.jsx
│   └── BarcodeControls/    # Barcode UI components
│       ├── BarcodeInput.jsx
│       ├── BarcodeSettings.jsx
│       └── BarcodePreview.jsx
├── hooks/
│   ├── useQRState.js       # QR state management
│   ├── useQRGenerator.js   # QR generation logic
│   ├── useBarcodeState.js  # Barcode state management
│   └── useBarcodeGenerator.js # Barcode generation logic
├── functions/
│   ├── qr.js              # QR utility functions
│   └── barcode.js         # Barcode utility functions
└── App.jsx                # Main app with routing
```

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **QRCode.js** - QR code generation library
- **JsBarcode** - Barcode generation library
- **Lucide React** - Beautiful icon library

## 🎨 Architecture Highlights

- **Modular Design** - Clean separation of concerns
- **Custom Hooks** - Reusable state and logic
- **Component Library** - Self-contained, reusable components
- **Pure Functions** - Testable utility functions
- **100-150 Lines** - Each page component is concise and maintainable

## 📖 Usage Examples

### QR Code with Logo
1. Enter your URL or text
2. Upload a logo (PNG, JPG, SVG)
3. Customize colors and size
4. Add a badge or frame
5. Download as PNG

### Professional Barcode
1. Select format (e.g., EAN-13)
2. Enter valid data (format hints provided)
3. Adjust appearance settings
4. Download as SVG

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes
