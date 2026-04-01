import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import Button from "#/components/ui/Button";
import { MoveLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { GlobalLoader } from "#/components/GlobalLoader";
import { useEffect, useState } from "react";
import type { Quote } from "public/types";

export const Route = createFileRoute("/artists")({
    component: Artists,
    pendingComponent: GlobalLoader,
    pendingMs: 0,
    staticData: {
        title: "Gli artisti",
        breadcrumb: "nav.artist",
    },
});

const artistsData = [
    {
        id: "robert-doisneau",
        firstName: "Robert",
        lastName: "Doisneau",
        tag: "Fotografia Umanista",
        life: "1912 - 1994",
        nationality: "Francese",
        movement: "Realismo Poetico",
        famousWork: "Le Baiser de l'Hôtel de Ville",
        activity: "1929 - 1994",
        style: "Spontaneo, Ironico, Romantico",
        subject: "Vita parigina, Bambini, Amore",
        originsTitle: "Il Poeta della Strada",
        originsP1: "Nato a Gentilly, Doisneau ha trasformato le strade di Parigi nel suo palcoscenico. Dopo una formazione come litografo, ha trovato la sua vera voce catturando i momenti fugaci di bellezza nella vita quotidiana della classe operaia.",
        originsP2: "La sua capacità di trovare l'incanto nell'ordinario lo ha reso il pilastro della fotografia umanista francese, celebrando l'umanità con uno sguardo benevolo e mai cinico.",
        keyProjectTitle: "Parigi nel Cuore",
        keyProjectP1: "Attraverso migliaia di scatti, ha documentato la trasformazione di Parigi. La sua opera non è solo cronaca, ma una narrazione visiva che fonde realtà e una sottile messa in scena poetica.",
        keyProjectP2: "Il celebre scatto 'Il bacio' è diventato il simbolo universale del romanticismo parigino, incarnando la capacità di Doisneau di cristallizzare l'emozione pura in un istante.",
        philosophyTitle: "Lo Sguardo Curioso",
        philosophyDesc: "Per Doisneau, fotografare non era un atto meccanico, ma una ricerca di 'piccole luci' nel buio della routine. Credeva che il mondo fosse pieno di miracoli quotidiani pronti per essere scoperti.",
        iconTitle: "Un'Eredità Immortale",
        iconDesc: "Ha lasciato oltre 450.000 negativi che raccontano un'epoca di speranza e semplicità, influenzando generazioni di fotografi di strada in tutto il mondo.",
        iconDate: "Hôtel de Ville, 1950",
        legacyTitle: "Il Fascino dell'Effimero",
        legacyP1: "Le sue immagini continuano a definire l'immaginario collettivo di Parigi. Doisneau non cercava la perfezione tecnica, ma la verità emotiva nascosta in un sorriso o in un gioco di bambini.",
        legacyP2: "La sua eredità risiede nella gentilezza del suo sguardo, un promemoria costante che la bellezza risiede nella semplicità degli incontri umani.",
    },
    {
        id: "olivia-arthur",
        firstName: "Olivia",
        lastName: "Arthur",
        tag: "Documentaria",
        life: "1980 - Presente",
        nationality: "Britannica",
        movement: "Fotografia Contemporanea",
        famousWork: "Jeddah Diary",
        activity: "2003 - Presente",
        style: "Intimo, Concettuale",
        subject: "Identità, Confini, Donne",
        originsTitle: "Oltre i Confini",
        originsP1: "Matematica di formazione, Arthur applica un rigore analitico a narrazioni profondamente umane. Il suo lavoro esplora le intersezioni tra culture, con un focus particolare sulla vita privata delle donne.",
        originsP2: "La sua carriera l'ha portata dall'Europa dell'Est all'Arabia Saudita, cercando sempre di superare le barriere visive per mostrare mondi spesso inaccessibili.",
        keyProjectTitle: "Jeddah Diary",
        keyProjectP1: "In 'Jeddah Diary', documenta la vita delle giovani donne in Arabia Saudita. In un contesto dove la fotografia è spesso proibita, usa il flash e le ombre per proteggere i soggetti svelando la loro realtà.",
        keyProjectP2: "Il progetto è una meditazione sulla visibilità e sul potere del non detto, ridefinendo i canoni del fotogiornalismo tradizionale attraverso un approccio artistico.",
        philosophyTitle: "Empatia e Struttura",
        philosophyDesc: "Il suo lavoro colma il divario tra documento e arte, concentrandosi sulle implicazioni personali dei confini geografici e culturali e sull'evoluzione tecnologica del corpo umano.",
        iconTitle: "Magnum Photos",
        iconDesc: "Membro di Magnum dal 2013, Arthur continua a spingere il mezzo documentario verso nuove forme espressive, inclusi esperimenti con AI e robotica.",
        iconDate: "Magnum Photos, 2013",
        legacyTitle: "Nuove Narrazioni",
        legacyP1: "Attraverso il suo spazio 'Fishbar' a Londra e i suoi progetti globali, supporta una visione della fotografia che sia sia analitica che vulnerabile.",
        legacyP2: "Resta una voce fondamentale nel definire come l'immagine possa raccontare la complessità dell'identità moderna nell'era della globalizzazione.",
    },
    {
        id: "seiichi-furuya",
        firstName: "Seiichi",
        lastName: "Furuya",
        tag: "Autobiografica",
        life: "1950 - Presente",
        nationality: "Giapponese",
        movement: "Archivio Personale",
        famousWork: "Mémoires",
        activity: "1973 - Presente",
        style: "Frammentato, Malinconico",
        subject: "Memoria, Perdita, Storia",
        originsTitle: "L'Eterno Viaggiatore",
        originsP1: "Lasciato il Giappone nel 1973, Furuya ha attraversato l'Europa fermandosi in Austria. Il suo lavoro è un ponte tra la cultura orientale e l'estetica documentaria europea della Guerra Fredda.",
        originsP2: "La sua fotografia è diventata un diario di vita nel momento in cui ha iniziato a ritrarre ossessivamente la moglie Christine, creando un archivio d'amore e dolore.",
        keyProjectTitle: "Mémoires",
        keyProjectP1: "Dopo la morte di Christine, Furuya ha dedicato la vita a rielaborare le foto scattate insieme. 'Mémoires' non è solo un omaggio, ma un processo catartico di ricostruzione della memoria.",
        keyProjectP2: "Le immagini mescolano la tragedia personale con i cambiamenti storici dell'Europa, rendendo il dolore individuale un'esperienza collettiva universale.",
        philosophyTitle: "Il Tempo che Resta",
        philosophyDesc: "La fotografia per Furuya è l'unico strumento per combattere l'oblio. Le sue immagini cambiano significato ogni volta che vengono riordinate, riflettendo la natura mutevole del ricordo.",
        iconTitle: "L'Arte del Libro",
        iconDesc: "I suoi fotolibri sono capolavori di editing, dove ogni accostamento tra passato e presente crea nuovi strati di verità emotiva.",
        iconDate: "Mémoires, 1989-2010",
        legacyTitle: "Custode del Ricordo",
        legacyP1: "Furuya ha ridefinito la fotografia autobiografica, mostrando come l'archivio personale possa diventare una forma d'arte potente e straziante.",
        legacyP2: "Il suo lavoro insegna che la fotografia non ferma il tempo, ma ci permette di dialogare con ciò che abbiamo perduto.",
    },
    {
        id: "stefanie-moshammer",
        firstName: "Stefanie",
        lastName: "Moshammer",
        tag: "Post-Documentaria",
        life: "1988 - Presente",
        nationality: "Austriaca",
        movement: "Fotografia Concettuale",
        famousWork: "Vegas and She",
        activity: "2013 - Presente",
        style: "Saturato, Grafico, Ibrido",
        subject: "Sottoculture, Illusioni, Spazio",
        originsTitle: "Visioni Cromatiche",
        originsP1: "Con un passato nel Graphic Design, Moshammer crea immagini che esplodono di colore e composizione. La sua visione si allontana dal realismo per esplorare la superficie e l'illusione.",
        originsP2: "Le sue narrazioni visive sono ibride, mescolando realtà catturata e costruzione estetica per interrogare il modo in cui percepiamo i luoghi e le persone.",
        keyProjectTitle: "Vegas and She",
        keyProjectP1: "In questo progetto, Las Vegas non è una città, ma un miraggio. Moshammer esplora le promesse del sogno americano attraverso ritratti vibranti e dettagli urbani quasi astratti.",
        keyProjectP2: "Il suo uso del colore saturo trasforma il quotidiano in qualcosa di alieno, rivelando la solitudine e la bellezza artificiale dei contesti marginali.",
        philosophyTitle: "L'Estetica dell'Incertezza",
        philosophyDesc: "Indaga come l'ambiente modelli l'identità. Per lei, la fotografia non è una prova di verità, ma un mezzo per creare nuove realtà cariche di tensione emotiva e grafica.",
        iconTitle: "Sperimentazione Visiva",
        iconDesc: "Premiata come FOAM Talent, rappresenta la nuova avanguardia che fonde fotografia, moda e critica sociale in un linguaggio visivo unico.",
        iconDate: "I Can Be Her, 2018",
        legacyTitle: "Il Futuro dell'Immagine",
        legacyP1: "Moshammer sfida la staticità del genere documentario, invitando lo spettatore a perdersi in un mondo dove il confine tra vero e falso è volutamente sfumato.",
        legacyP2: "La sua opera è una testimonianza della vitalità della fotografia contemporanea nel reinventare costantemente il proprio sguardo sul mondo.",
    }
];

function Artists() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [quote, setQuote] = useState<string>('');

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.8 },
    };

    useEffect(() => {
        fetch("http://localhost:3000/api/quotes.json")
            .then((res: Response) => res.json())
            .then((data: Quote[]) => {
                if (data.length > 0) {
                    const randomIndex = Math.floor(Math.random() * data.length);
                    setQuote(data[randomIndex].text);
                }
            })
            .catch(console.error);
    }, []);

    return (
        <main className="page-wrap px-6 md:px-12 relative pb-32 overflow-x-hidden">
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-(--burnished-copper)/5 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-(--parisian-stone)/5 blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto pt-24">
                <div className="mb-16">
                    <Button
                        onClick={() => navigate({ to: "/" })}
                        variant="ghost"
                        size="sm"
                        rounded="full"
                        className="gap-2 text-(--parisian-stone-dark) hover:text-(--deep-charcoal) transition-transform hover:-translate-x-1"
                    >
                        <MoveLeft className="w-4 h-4" />
                        {t("artist.backHome")}
                    </Button>
                </div>

                <div className="space-y-10">
                    {artistsData.map((artist, index) => (
                        <div key={artist.id} className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-12 lg:gap-24 items-start pb-10 border-b border-b-red-(--deep-charcoal)">

                            <div className="lg:sticky lg:top-32 space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="relative aspect-square w-full rounded-[3rem] bg-(--vintage-sepia-light)/40 backdrop-blur-3xl border border-(--line) shadow-xl flex flex-col items-center justify-center p-8 text-center"
                                >
                                    <div className="relative w-32 h-32 mb-8">
                                        <div className="absolute inset-0 border-2 border-dashed border-(--burnished-copper)/30 rounded-full animate-[spin_15s_linear_infinite]" />
                                        <div className="absolute inset-3 border border-solid border-(--deep-charcoal)/10 rounded-full flex items-center justify-center">
                                            <span className="text-2xl font-serif italic text-(--deep-charcoal) opacity-50">
                                                {artist.firstName[0]}{artist.lastName[0]}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-serif font-bold text-(--deep-charcoal) mb-2">Visual ID</h3>
                                    <p className="text-(--parisian-stone-dark) text-xs uppercase tracking-widest">{artist.id.replace('-', ' ')}</p>
                                </motion.div>

                                <motion.div {...fadeIn} className="p-8 rounded-[2.5rem] bg-(--deep-charcoal) text-(--vintage-sepia) shadow-lg">
                                    <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] mb-4 opacity-50">{t("artist.bioSummary")}</h4>
                                    <div className="space-y-3 text-xs">
                                        <div className="flex justify-between border-b border-white/5 pb-2"><span className="opacity-50">Periodo</span><span>{artist.life}</span></div>
                                        <div className="flex justify-between border-b border-white/5 pb-2"><span className="opacity-50">Origine</span><span>{artist.nationality}</span></div>
                                        <div className="flex justify-between"><span className="opacity-50">Opera</span><span className="text-right italic">{artist.famousWork}</span></div>
                                    </div>
                                </motion.div>

                                <motion.div {...fadeIn} className="p-8 rounded-[2.5rem] bg-white/50 backdrop-blur-md border border-(--line)">
                                    <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] mb-4 text-(--deep-charcoal)/50">Stile & Focus</h4>
                                    <div className="space-y-3 text-xs text-(--deep-charcoal)">
                                        <div className="flex justify-between border-b border-(--line) pb-2"><span>Mood</span><span className="font-bold text-right">{artist.style}</span></div>
                                        <div className="flex justify-between"><span>Soggetti</span><span className="font-bold text-right">{artist.subject}</span></div>
                                    </div>
                                </motion.div>
                            </div>

                            <div className="space-y-12">
                                <motion.section
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className="bg-(--vintage-sepia-light)/60 backdrop-blur-xl p-10 md:p-16 rounded-[4rem] border border-(--line)"
                                >
                                    <span className="inline-block px-3 py-1 rounded-full bg-(--burnished-copper)/10 text-(--burnished-copper-deep) text-[10px] font-bold uppercase tracking-widest mb-6">
                                        {artist.tag}
                                    </span>
                                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-(--deep-charcoal) mb-8 leading-[0.9]">
                                        {artist.firstName} <br />
                                        <span className="text-(--burnished-copper)">{artist.lastName}</span>
                                    </h1>
                                    {index === 0 && quote && (
                                        <p className="text-xl md:text-2xl text-(--parisian-stone-dark) font-serif italic border-l-2 border-(--burnished-copper) pl-6 py-2">
                                            "{quote}"
                                        </p>
                                    )}
                                </motion.section>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <motion.div {...fadeIn} className="p-10 rounded-[3rem] bg-white/40 border border-(--line)">
                                        <h2 className="text-xl font-serif font-bold text-(--deep-charcoal) mb-4 flex items-center gap-3">
                                            <span className="text-(--burnished-copper) opacity-30 italic">01.</span> {artist.originsTitle}
                                        </h2>
                                        <p className="text-(--parisian-stone-dark) leading-relaxed text-sm">{artist.originsP1}</p>
                                    </motion.div>
                                    <motion.div {...fadeIn} className="p-10 rounded-[3rem] bg-white/40 border border-(--line)">
                                        <h2 className="text-xl font-serif font-bold text-(--deep-charcoal) mb-4 flex items-center gap-3">
                                            <span className="text-(--burnished-copper) opacity-30 italic">02.</span> {artist.keyProjectTitle}
                                        </h2>
                                        <p className="text-(--parisian-stone-dark) leading-relaxed text-sm">{artist.keyProjectP1}</p>
                                    </motion.div>
                                </div>

                                <motion.div {...fadeIn} className="relative overflow-hidden rounded-[3.5rem] bg-(--deep-charcoal) p-12 md:p-16 text-(--vintage-sepia)">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-(--burnished-copper)/20 blur-3xl rounded-full" />
                                    <h2 className="text-3xl font-serif font-bold mb-6 italic">{artist.philosophyTitle}</h2>
                                    <p className="text-lg opacity-80 leading-relaxed max-w-2xl">{artist.philosophyDesc}</p>
                                    <div className="mt-12 flex items-center gap-4">
                                        <div className="h-px w-12 bg-(--burnished-copper)" />
                                        <span className="text-xs font-mono uppercase tracking-widest text-(--burnished-copper)">{artist.iconDate}</span>
                                    </div>
                                </motion.div>

                                <motion.div {...fadeIn} className="p-10 md:p-14 bg-white/20 backdrop-blur-sm border border-white/40 rounded-[3.5rem]">
                                    <h2 className="text-2xl font-serif font-bold text-(--deep-charcoal) mb-6">{artist.legacyTitle}</h2>
                                    <p className="text-(--parisian-stone-dark) text-sm leading-relaxed">{artist.legacyP1}</p>
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Artists;