import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { QrCode, Heart, ScanLine } from 'lucide-react'
import QRPage from './pages/QRPage'
import BarcodePage from './pages/BarcodePage'
import { cn } from './lib/utils'

function NavItem({ to, children }) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={cn(
        "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full",
        isActive
          ? "text-white bg-slate-900 shadow-lg shadow-slate-900/20"
          : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
      )}
    >
      {children}
    </Link>
  )
}

function Highlight() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-400/30 blur-[120px] animate-mesh-1 mix-blend-multiply" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[50%] rounded-full bg-indigo-400/30 blur-[120px] animate-mesh-2 mix-blend-multiply" />
      <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-blue-400/30 blur-[120px] animate-mesh-3 mix-blend-multiply" />
    </div>
  )
}

function App() {
  const year = new Date().getFullYear()

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col relative selection:bg-indigo-500/20 selection:text-indigo-900">
        <Highlight />

        <header className="sticky top-0 z-50 px-6 py-4">
          <div className="max-w-6xl mx-auto">
            <nav className="glass-panel mx-auto max-w-fit px-2 py-2 rounded-full flex items-center gap-1">
              <Link to="/" className="flex items-center gap-2 px-4 py-1.5 mr-2 font-bold text-slate-800">
                <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 p-1.5 rounded-lg text-white shadow-lg shadow-indigo-500/30">
                  <QrCode size={18} strokeWidth={2.5} />
                </div>
                <span className="tracking-tight">QR<span className="text-indigo-600">Pro</span></span>
              </Link>
              <div className="h-6 w-px bg-slate-200 mx-1" />
              <div className="flex items-center gap-1">
                <NavItem to="/">QR Code</NavItem>
                <NavItem to="/barcode">Barcode</NavItem>
              </div>
            </nav>
          </div>
        </header>

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<QRPage />} />
            <Route path="/barcode" element={<BarcodePage />} />
          </Routes>
        </main>

        <footer className="text-center py-8 text-slate-500 text-sm">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" /> by
            <a
              href="https://github.com/GreenHacker420"
              className="font-medium text-slate-700 hover:text-indigo-600 transition-colors"
            >
              GreenHacker
            </a>
          </p>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
