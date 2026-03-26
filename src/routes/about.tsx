import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/about')({
    component: About,
    staticData: {
        title: 'Contatti',
    },
})

function About() {
    return (
        <>
            <div className="fixed inset-0 pointer-events-none z-0 bg-(--vintage-sepia)" />
            
            <div className="relative z-10 flex flex-col min-h-screen px-6 md:px-12 pt-32 pb-16 max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl"
                >
                    <h1 className="text-5xl md:text-7xl font-black text-(--deep-charcoal) mb-12 font-serif drop-shadow-sm">
                        L'Autore & Contatti
                    </h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-2xl font-bold text-(--burnished-copper-deep) mb-6">Biografia</h2>
                            <p className="text-lg text-(--parisian-stone-dark) leading-relaxed mb-6">
                                Robert Doisneau (Gentilly, 14 aprile 1912 – Montrouge, 1º aprile 1994) è stato un fotografo francese, pioniere del fotogiornalismo e della fotografia umanista. Insieme a Henri Cartier-Bresson ed altri, è considerato uno dei padri fondatori della fotografia di strada.
                            </p>
                            <p className="text-lg text-(--parisian-stone-dark) leading-relaxed">
                                Le sue opere si distinguono per un approccio poetico e un tocco di umorismo, catturando un mondo che lui stesso definiva d'invenzione, dove la bellezza del quotidiano veniva messa in risalto.
                            </p>
                        </div>
                        
                        <div>
                            <h2 className="text-2xl font-bold text-(--burnished-copper-deep) mb-6">Informazioni</h2>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-sm font-mono text-(--parisian-stone-dark) uppercase tracking-widest mb-1">Archivio Ufficiale</p>
                                    <p className="text-xl text-(--deep-charcoal) font-medium">Atelier Robert Doisneau</p>
                                </div>
                                <div>
                                    <p className="text-sm font-mono text-(--parisian-stone-dark) uppercase tracking-widest mb-1">Indirizzo</p>
                                    <p className="text-xl text-(--deep-charcoal) font-medium">46, Place Jules-Ferry<br/>92120 Montrouge, France</p>
                                </div>
                                <div>
                                    <p className="text-sm font-mono text-(--parisian-stone-dark) uppercase tracking-widest mb-1">Email</p>
                                    <a href="mailto:contact@robert-doisneau.com" className="text-xl text-(--deep-charcoal) font-medium hover:text-(--burnished-copper) transition-colors border-b border-transparent hover:border-(--burnished-copper)">
                                        contact@robert-doisneau.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    )
}
