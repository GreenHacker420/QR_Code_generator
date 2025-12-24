import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../../lib/utils"

const TabsContext = React.createContext({})

const Tabs = React.forwardRef(({ defaultValue, value, onValueChange, className, ...props }, ref) => {
    const [selected, setSelected] = React.useState(defaultValue)
    const current = value !== undefined ? value : selected

    const handleValueChange = (val) => {
        if (value === undefined) {
            setSelected(val)
        }
        onValueChange?.(val)
    }

    return (
        <TabsContext.Provider value={{ value: current, onValueChange: handleValueChange }}>
            <div ref={ref} className={cn("", className)} {...props} />
        </TabsContext.Provider>
    )
})
Tabs.displayName = "Tabs"

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "inline-flex h-12 items-center justify-center rounded-2xl bg-white/40 backdrop-blur border border-white/40 p-1 text-slate-500 shadow-sm",
            className
        )}
        {...props}
    />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef(({ className, value, children, ...props }, ref) => {
    const { value: selectedValue, onValueChange } = React.useContext(TabsContext)
    const isSelected = selectedValue === value

    return (
        <button
            ref={ref}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onValueChange(value)}
            className={cn(
                "relative inline-flex items-center justify-center whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 z-10",
                isSelected ? "text-slate-900" : "text-slate-500 hover:text-slate-700",
                className
            )}
            {...props}
        >
            {isSelected && (
                <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-xl bg-white shadow-sm border border-slate-100/50"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    style={{ zIndex: -1 }}
                />
            )}
            {children}
        </button>
    )
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef(({ className, value, children, ...props }, ref) => {
    const { value: selectedValue } = React.useContext(TabsContext)
    const isSelected = selectedValue === value

    if (!isSelected) return null

    return (
        <motion.div
            ref={ref}
            role="tabpanel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
                "mt-4 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    )
})
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
