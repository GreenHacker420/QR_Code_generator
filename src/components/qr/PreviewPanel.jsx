import { Download, Share2 } from "lucide-react"
import { Button } from "../ui/Button.jsx"
import { Card } from "../ui/Card.jsx"

export function PreviewPanel({ qrCodeUrl, onDownload }) {
    return (
        <div className="sticky top-24">
            <Card className="overflow-hidden border-0 shadow-2xl shadow-indigo-500/20 bg-gradient-to-br from-white/80 to-indigo-50/80 backdrop-blur-xl">
                <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
                    {qrCodeUrl ? (
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative z-10 transition-transform duration-300 group-hover:scale-[1.02]">
                                <img src={qrCodeUrl} alt="QR Code" className="w-64 h-64 object-contain mix-blend-multiply" />
                            </div>
                        </div>
                    ) : (
                        <div className="w-64 h-64 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 animate-pulse">
                            Generating...
                        </div>
                    )}

                    <div className="mt-8 flex gap-3 w-full max-w-xs">
                        <Button onClick={onDownload} className="flex-1 gap-2 shadow-blue-500/20">
                            <Download size={18} />
                            Download PNG
                        </Button>
                        <Button variant="outline" className="px-3">
                            <Share2 size={18} />
                        </Button>
                    </div>
                </div>
                <div className="bg-slate-50/50 p-4 text-center text-xs text-slate-500 border-t border-slate-100">
                    High quality QR code ready for printing
                </div>
            </Card>
        </div>
    )
}
