import { motion } from "framer-motion";

export function GlobalLoader() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-(--bg-base) backdrop-blur-md overflow-hidden"
        >
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute inset-0 bg-(--burnished-copper) blur-[120px] pointer-events-none"
            />

            <div className="relative flex flex-col items-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute -inset-12 border border-(--line) rounded-full opacity-40"
                />

                <div className="relative w-32 h-32 flex items-center justify-center">
                    <motion.div
                        animate={{
                            scale: [1, 0.9, 1],
                            opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="w-16 h-16 rounded-full bg-(--burnished-copper) shadow-[0_0_40px_rgba(196,132,100,0.4)]"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-12 text-center space-y-2 uppercase tracking-[0.4em] text-xs font-mono font-bold"
                >
                    <span className="block text-(--deep-charcoal) opacity-40">
                        Esposizione in corso
                    </span>
                    <span className="block text-(--burnished-copper) animate-pulse">
                        Sviluppo pellicola...
                    </span>
                </motion.div>
            </div>

            <div className="absolute bottom-12 left-0 w-full text-center">
                <span className="font-serif italic text-sm text-(--parisian-stone-dark) opacity-60">
                    Robert Doisneau | Showroom
                </span>
            </div>
        </motion.div>
    );
}
