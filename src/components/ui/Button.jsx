import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95"

    const variants = {
        default: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-700 hover:to-indigo-700 border border-transparent",
        outline: "border-2 border-slate-200 bg-white/50 backdrop-blur-sm hover:bg-white/80 text-slate-700 hover:border-slate-300 shadow-sm",
        ghost: "hover:bg-slate-100/50 text-slate-600 hover:text-slate-900",
        secondary: "bg-white text-slate-900 shadow-sm border border-slate-100 hover:bg-slate-50",
        destructive: "bg-red-500 text-white shadow-lg shadow-red-500/25 hover:bg-red-600",
    }

    const sizes = {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-14 rounded-2xl px-8 text-base",
        icon: "h-11 w-11",
    }

    const Comp = motion.button

    return (
        <Comp
            ref={ref}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            whileTap={{ scale: 0.97 }}
            {...props}
        >
            {children}
        </Comp>
    )
})
Button.displayName = "Button"

export { Button }
