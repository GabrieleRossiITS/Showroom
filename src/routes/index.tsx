import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/')({
    component: App,
    staticData: {
        title: 'Robert Doisneau',
    },
})

function App() {
    return (
        <>
            <div className="fixed inset-0 pointer-events-none z-0 bg-(--vintage-sepia)" />
            
            <div className="relative z-10 flex flex-col min-h-screen px-6 sm:px-12 pt-32 pb-16 max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl"
                >
                    <h1 className="text-6xl md:text-8xl font-black text-(--deep-charcoal) mb-8 font-serif drop-shadow-sm leading-tight">
                        Robert<br/>Doisneau
                    </h1>
                    <p className="text-xl md:text-2xl text-(--parisian-stone-dark) leading-relaxed mb-12">
                        Pioniere della fotografia umanista, le sue immagini catturano la poesia della vita quotidiana nelle strade di Parigi.
                    </p>
                    <div className="flex flex-wrap gap-6">
                        <Link 
                            to="/artworks" 
                            className="px-8 py-4 rounded-full bg-(--deep-charcoal) text-(--vintage-sepia) hover:bg-(--burnished-copper) transition-colors font-medium text-lg shadow-lg hover:shadow-xl"
                        >
                            Esplora le Opere
                        </Link>
                        <Link 
                            to="/expositions" 
                            className="px-8 py-4 rounded-full border-2 border-(--deep-charcoal) text-(--deep-charcoal) hover:bg-(--deep-charcoal)/5 transition-colors font-medium text-lg"
                        >
                            Le Mostre
                        </Link>
                    </div>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-auto pt-24"
                >
                    <div className="w-full h-px bg-(--line) mb-8" />
                    <div className="flex justify-between items-center text-(--parisian-stone-dark) text-sm font-mono tracking-widest uppercase">
                        <span>1912 - 1994</span>
                        <span>Paris, France</span>
                    </div>
                </motion.div>
            </div>
        </>
    )
}
