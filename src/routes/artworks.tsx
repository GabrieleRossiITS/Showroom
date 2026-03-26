import { createFileRoute } from '@tanstack/react-router'
import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/artworks')({
    component: ArtworkGallery,
    staticData: {
        title: 'Robert Doisneau - Opere',
    },
})

const artworks = [
    { id: 1, type: 'border-copper', size: 'w-72 h-[34rem]', y: '-translate-y-8', title: "Le Baiser de l'Hôtel de Ville", year: "1950" },
    { id: 2, type: 'border-copper', size: 'w-[28rem] h-[28rem]', y: 'translate-y-24', title: "Les Animaux Supérieurs", year: "1954" },
    { id: 3, type: 'border-copper', size: 'w-64 h-72', y: '-translate-y-16', title: "L'Enfer", year: "1952" },
    { id: 4, type: 'border-copper', size: 'w-80 h-[36rem]', y: 'translate-y-4', title: "Le Cadran Solaire", year: "1956" },
    { id: 5, type: 'border-copper', size: 'w-[22rem] h-[28rem]', y: '-translate-y-32', title: "Les Hélicoptères", year: "1972" },
    { id: 6, type: 'border-copper', size: 'w-[26rem] h-[32rem]', y: 'translate-y-12', title: "La Dame aux Caniches", year: "1942" },
    { id: 7, type: 'border-copper', size: 'w-72 h-[40rem]', y: '-translate-y-8', title: "La Voiture", year: "1948" },
    { id: 8, type: 'border-copper', size: 'w-[28rem] h-[30rem]', y: 'translate-y-16', title: "L'Accordéoniste de la Rue", year: "1951" },
    { id: 9, type: 'border-copper', size: 'w-64 h-[36rem]', y: '-translate-y-20', title: "Le Pont des Arts", year: "1953" },
    { id: 10, type: 'border-copper', size: 'w-72 h-[28rem]', y: 'translate-y-8', title: "Les Enfants de la Place", year: "1947" },
    { id: 11, type: 'border-copper', size: 'w-80 h-[38rem]', y: '-translate-y-12', title: "Le Manège de Monsieur", year: "1955" },
    { id: 12, type: 'border-copper', size: 'w-[24rem] h-[32rem]', y: 'translate-y-28', title: "Bistrot Parisien", year: "1949" },
    { id: 13, type: 'border-copper', size: 'w-72 h-[34rem]', y: '-translate-y-4', title: "La Concierge", year: "1945" },
    { id: 14, type: 'border-copper', size: 'w-[26rem] h-[28rem]', y: 'translate-y-12', title: "Le Photographe Ambulant", year: "1958" },
    { id: 15, type: 'border-copper', size: 'w-64 h-[40rem]', y: '-translate-y-24', title: "Un Chien Sur Les Quais", year: "1950" },
    { id: 16, type: 'border-copper', size: 'w-[30rem] h-[32rem]', y: 'translate-y-6', title: "Le Musicien Aveugle", year: "1946" },
    { id: 17, type: 'border-copper', size: 'w-72 h-[36rem]', y: '-translate-y-16', title: "L'Heure de Pointe", year: "1960" },
    { id: 18, type: 'border-copper', size: 'w-[22rem] h-[26rem]', y: 'translate-y-20', title: "Les Pigeons du Square", year: "1954" },
    { id: 19, type: 'border-copper', size: 'w-80 h-[34rem]', y: '-translate-y-10', title: "Le Marché aux Puces", year: "1957" },
    { id: 20, type: 'border-copper', size: 'w-[28rem] h-[38rem]', y: 'translate-y-14', title: "L'Amour à Paris", year: "1952" },
    { id: 21, type: 'border-copper', size: 'w-64 h-[30rem]', y: '-translate-y-28', title: "Le Vitrier", year: "1948" },
    { id: 22, type: 'border-copper', size: 'w-72 h-[32rem]', y: 'translate-y-8', title: "Les Amoureux du Métro", year: "1959" },
    { id: 23, type: 'border-copper', size: 'w-[26rem] h-[36rem]', y: '-translate-y-14', title: "Le Matin Calme", year: "1944" },
    { id: 24, type: 'border-copper', size: 'w-[30rem] h-[28rem]', y: 'translate-y-24', title: "Café de Flore", year: "1956" },
    { id: 25, type: 'border-copper', size: 'w-72 h-[40rem]', y: '-translate-y-6', title: "La Tour Eiffel sous la Brume", year: "1953" },
    { id: 26, type: 'border-copper', size: 'w-80 h-[32rem]', y: 'translate-y-10', title: "Les Petits Écoliers", year: "1949" },
    { id: 27, type: 'border-copper', size: 'w-[24rem] h-[34rem]', y: '-translate-y-20', title: "Le Chat Sur Le Toit", year: "1951" },
    { id: 28, type: 'border-copper', size: 'w-[28rem] h-[38rem]', y: 'translate-y-16', title: "Dimanche au Parc", year: "1955" },
    { id: 29, type: 'border-copper', size: 'w-64 h-[28rem]', y: '-translate-y-12', title: "Le Gardien de Nuit", year: "1962" },
    { id: 30, type: 'border-copper', size: 'w-72 h-[36rem]', y: 'translate-y-4', title: "La Fin du Jour", year: "1950" }
];

function ArtworkGallery() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = scrollContainerRef.current
        if (!el) return

        const onWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

            if (e.deltaY === 0) return;

            e.preventDefault();

            el.scrollLeft += e.deltaY * 1;
        }

        el.addEventListener('wheel', onWheel, { passive: false })
        return () => el.removeEventListener('wheel', onWheel)
    }, [])

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;
        const scrollAmount = window.innerWidth * 0.4;
        scrollContainerRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    }

    return (
        <>
            <div className="absolute inset-0 pointer-events-none z-0 bg-(--deep-charcoal)">
                <div className="absolute top-[-10%] left-[-5%] w-[120vw] h-[70vh] bg-(--burnished-copper-deep) rounded-[40%_60%_70%_30%/40%_40%_60%_50%] origin-center rotate-[-5deg] shadow-2xl" />
                <div className="absolute bottom-[-15%] left-[30vw] w-screen h-[80vh] bg-(--burnished-copper) rounded-[30%_70%_50%_50%/50%_30%_70%_50%] origin-center rotate-[5deg] shadow-2xl" />
                <div className="absolute top-[20%] left-[80vw] w-screen h-screen bg-(--burnished-copper-deep) rounded-[50%_50%_30%_70%/60%_40%_60%_40%] origin-center rotate-15 shadow-2xl" />
            </div>

            <div className="absolute inset-0 pointer-events-none z-50 p-12 flex flex-col justify-between">
                <div className="flex justify-between items-end h-full pb-10">
                    <button
                        onClick={() => scroll('left')}
                        className="w-14 h-14 rounded-full bg-(--parisian-stone)/10 hover:bg-(--parisian-stone)/30 border border-(--parisian-stone)/20 flex items-center justify-center backdrop-blur-md transition-all text-(--vintage-sepia) pointer-events-auto cursor-pointer active:scale-90"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="w-14 h-14 rounded-full bg-(--parisian-stone)/10 hover:bg-(--parisian-stone)/30 border border-(--parisian-stone)/20 flex items-center justify-center backdrop-blur-md transition-all text-(--vintage-sepia) pointer-events-auto cursor-pointer active:scale-90"
                    >
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                className="relative z-10 h-[80vh] flex items-center overflow-x-auto overflow-y-hidden no-scrollbar gap-16"
            >
                {artworks.map((art) => {
                    const isCopper = art.type === 'border-copper';
                    const borderColor = isCopper ? 'bg-(--burnished-copper)' : 'bg-(--deep-charcoal)';
                    const shadowColor = 'shadow-(--burnished-copper)/50';

                    return (
                        <motion.div
                            key={art.id}
                            className={`shrink-0 ${art.size} ${art.y} transition-transform hover:scale-102 duration-500 cursor-pointer group`}
                        >
                            <div className={`w-full h-full rounded-[4rem] p-3 ${borderColor} shadow-2xl ${shadowColor} relative overflow-hidden flex items-center justify-center`}>

                                <div className="w-full h-full rounded-[3.2rem] bg-(--deep-charcoal) overflow-hidden relative shadow-[inset_0_20px_40px_rgba(0,0,0,0.8)] border border-(--line)">

                                    <div className="absolute inset-0 bg-(--deep-charcoal) flex items-center justify-center group-hover:scale-110 transition-transform duration-[2s] ease-out">
                                        <div className="text-(--inset-glint)/5 text-9xl font-black">{art.id}</div>
                                    </div>
                                    <div className="absolute inset-0 bg-linear-to-t from-(--deep-charcoal)/90 via-(--deep-charcoal)/10 to-transparent pointer-events-none" />

                                    <div className="absolute bottom-10 left-8 right-8 pointer-events-none translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                        <p className="text-(--vintage-sepia-light) font-bold text-2xl leading-tight mb-2 drop-shadow-md">{art.title}</p>
                                        <p className="text-(--burnished-copper) font-mono tracking-widest text-sm drop-shadow-md">{art.year}</p>
                                    </div>
                                </div>

                                <div className="absolute inset-0 rounded-[4rem] border border-(--inset-glint)/20 mix-blend-overlay pointer-events-none" />
                            </div>
                        </motion.div>
                    )
                })}

                <div className="shrink-0 w-[10vw] h-full" />
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </>
    )
}