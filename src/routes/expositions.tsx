import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

export const Route = createFileRoute('/expositions')({
    component: Expositions,
    staticData: {
        title: 'Mostre',
    },
})

const expositions = [
    { year: "2024", title: "Robert Doisneau: La lenteur", location: "Palazzo Roverella, Rovigo", status: "In corso" },
    { year: "2023", title: "Parigi, la vita!", location: "Museo dell'Ara Pacis, Roma", status: "Passata" },
    { year: "2022", title: "Les Halles: Il ventre di Parigi", location: "Forum des Halles, Paris", status: "Passata" },
    { year: "2021", title: "Il bacio e altre storie", location: "Camera - Centro Italiano per la Fotografia, Torino", status: "Passata" },
    { year: "2019", title: "Pescatore di immagini", location: "Palazzo Ducale, Genova", status: "Passata" },
]

function Expositions() {
    return (
        <>
            <div className="fixed inset-0 pointer-events-none z-0 bg-(--vintage-sepia)" />
            
            <div className="relative z-10 flex flex-col min-h-screen px-6 md:px-12 pt-32 pb-16 max-w-5xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-black text-(--deep-charcoal) mb-16 font-serif drop-shadow-sm">
                        Mostre
                    </h1>
                    
                    <div className="space-y-6">
                        {expositions.map((exp, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                                className="group relative bg-(--deep-charcoal) p-8 rounded-[2.5rem] overflow-hidden hover:scale-[1.02] transition-transform duration-500 cursor-pointer shadow-xl shadow-(--burnished-copper)/10"
                            >
                                <div className="absolute inset-0 border border-(--inset-glint)/20 rounded-[2.5rem] pointer-events-none" />
                                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex items-start md:items-center gap-6 md:gap-8 flex-col md:flex-row">
                                        <span className="text-4xl md:text-5xl font-black text-(--burnished-copper) font-mono">{exp.year}</span>
                                        <div>
                                            <h3 className="text-2xl font-bold text-(--vintage-sepia-light) mb-2 group-hover:text-white transition-colors">{exp.title}</h3>
                                            <p className="text-(--parisian-stone) font-medium text-lg flex items-center gap-2">
                                                <MapPin className="w-5 h-5 shrink-0" />
                                                {exp.location}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="shrink-0 flex self-start md:self-auto">
                                        <span className={`px-5 py-2 rounded-full text-sm font-bold tracking-widest uppercase ${
                                            exp.status === 'In corso' 
                                                ? 'bg-(--burnished-copper) text-(--vintage-sepia)' 
                                                : 'bg-(--vintage-sepia)/10 text-(--vintage-sepia)/60'
                                        }`}>
                                            {exp.status}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </>
    )
}
