import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom'
import { QrCode, Heart } from 'lucide-react'
import QRPage from './pages/QRPage'
import BarcodePage from './pages/BarcodePage'

function App() {
  const year = new Date().getFullYear()

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
        <header className="bg-white/80 backdrop-blur border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 font-semibold text-gray-900">
              <QrCode className="w-6 h-6 text-primary" />
              QR Tools
            </Link>
            <nav className="flex items-center gap-3 text-sm">
              <NavLink to="/" end className={({isActive}) => `px-3 py-2 rounded-md ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>QR Generator</NavLink>
              <NavLink to="/barcode" className={({isActive}) => `px-3 py-2 rounded-md ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Barcode Generator</NavLink>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<QRPage />} />
            <Route path="/barcode" element={<BarcodePage />} />
          </Routes>
        </main>

        <footer className="text-center text-sm text-gray-500 py-8">
          Made with <Heart className="inline w-4 h-4 text-red-500 mx-1" /> by <span className="font-semibold"><a href="https://github.com/GreenHacker420">GreenHacker</a></span> • {year} All rights reserved.
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
