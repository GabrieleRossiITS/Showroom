import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/artist")({
    component: Artist,
    staticData: {
        title: "Artista",
    },
});

function Artist() {
    return (
        <main className="page-wrap px-6 md:px-12 relative min-h-screen overflow-hidden">
            <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/10 blur-[120px] animate-pulse pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-400/10 blur-[120px] animate-pulse pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_2fr] gap-16 relative z-10 w-full max-w-[1600px] mx-auto">
                <div className="relative h-[60vh] lg:h-[85vh] w-full lg:sticky lg:top-40 z-20 group perspective-2000">
                    <div className="w-full h-full rounded-4xl bg-white/15 backdrop-blur-2xl border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] overflow-hidden flex flex-col items-center justify-center transition-all duration-700">
                        <div className="w-48 h-48 mb-10 border-4 border-dashed border-(--parisian-stone)/40 rounded-full animate-[spin_12s_linear_infinite] flex items-center justify-center text-(--parisian-stone)">
                            <div className="w-36 h-36 border-2 border-solid border-(--parisian-stone)/30 rounded-full animate-[spin_6s_linear_infinite_reverse] flex items-center justify-center backdrop-blur-md bg-white/5">
                                <span className="text-2xl font-black tracking-[0.2em] text-(--deep-charcoal) opacity-80">
                                    3D
                                </span>
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-(--deep-charcoal) mb-4 text-center px-6">
                            Robert Doisneau
                            <br />
                            <span className="text-xl font-medium opacity-60">
                                Digital Reconstruction
                            </span>
                        </h3>
                        <p className="text-(--parisian-stone) text-base text-center px-12 max-w-sm leading-relaxed opacity-80">
                            Spazio riservato per l'integrazione di Three.js. Il
                            modello 3D interattivo verrà renderizzato qui.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-10">
                    <section className="rounded-4xl p-10 md:p-14 bg-white/25 backdrop-blur-2xl border border-white/40 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
                        <p className="island-kicker mb-4 text-sm uppercase tracking-[0.3em] text-slate-500 font-semibold opacity-70">
                            L'Umanista della Strada
                        </p>
                        <h1 className="display-title mb-8 text-6xl md:text-7xl font-black bg-clip-text text-transparent bg-linear-to-br from-slate-900 via-slate-800 to-slate-400 leading-tight">
                            Robert Doisneau
                        </h1>
                        <p className="m-0 text-xl md:text-2xl leading-relaxed text-slate-800 font-medium opacity-90">
                            "Quello che cercavo di mostrare era un mondo dove mi
                            sarei sentito bene, dove le persone sarebbero state
                            gentili, dove avrei trovato la tenerezza che speravo
                            di ricevere. Le mie foto erano come una prova che
                            questo mondo può esistere."
                        </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <section className="rounded-4xl p-10 bg-white/20 backdrop-blur-xl border border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                                <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
                                Origini
                            </h2>
                            <p className="text-slate-700 leading-relaxed text-lg mb-6">
                                Nato nel 1912 a Gentilly, Doisneau crebbe in un
                                ambiente piccolo-borghese che segnò
                                profondamente la sua visione del mondo. Rimasto
                                orfano in tenera età, trovò rifugio nel disegno
                                e successivamente nella tecnica dell'incisione
                                presso l'École Estienne.
                            </p>
                            <p className="text-slate-700 leading-relaxed text-lg">
                                La sua timidezza iniziale lo portò a fotografare
                                prima i ciottoli delle strade, poi gli oggetti,
                                e solo molto più tardi le persone, sviluppando
                                quella pazienza infinita che sarebbe diventata
                                il suo marchio di fabbrica nel catturare
                                "l'attimo cercato".
                            </p>
                        </section>

                        <section className="rounded-4xl p-10 bg-white/20 backdrop-blur-xl border border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                                <span className="w-8 h-1 bg-purple-500 rounded-full"></span>
                                Gli Anni Renault
                            </h2>
                            <p className="text-slate-700 leading-relaxed text-lg mb-6">
                                Nel 1934 iniziò a lavorare come fotografo
                                industriale per la Renault a Billancourt. Questa
                                esperienza fu fondamentale per comprendere la
                                disciplina tecnica, ma il lavoro ripetitivo e
                                l'ambiente di fabbrica lo soffocarono.
                            </p>
                            <p className="text-slate-700 leading-relaxed text-lg">
                                Fu licenziato nel 1939 per i suoi continui
                                ritardi, un evento che lui stesso definì come
                                l'inizio della sua vera libertà. Da quel
                                momento, le strade di Parigi divennero il suo
                                unico ufficio e la sua eterna ispirazione.
                            </p>
                        </section>
                    </div>

                    <section className="rounded-4xl p-10 md:p-14 bg-white/25 backdrop-blur-2xl border border-white/40 shadow-[0_4px_24px_rgba(0,0,0,0.03)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/30 rounded-full blur-[80px] pointer-events-none"></div>
                        <h2 className="text-4xl font-black text-slate-900 mb-8">
                            Resistenza e Liberazione
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12">
                            <p className="text-slate-700 leading-relaxed text-lg">
                                Durante l'occupazione nazista, Doisneau mise le
                                sue abilità di incisore al servizio della
                                Resistenza francese, falsificando documenti
                                d'identità e passaporti per aiutare chi era
                                perseguitato. Non smise mai di scattare,
                                documentando clandestinamente la vita sotto il
                                giogo dell'occupante.
                            </p>
                            <p className="text-slate-700 leading-relaxed text-lg">
                                Nel 1944 fu tra i primi a scendere in strada per
                                immortalare la Liberazione di Parigi. Le sue
                                foto di quei giorni non celebrano solo la
                                vittoria militare, ma la rinascita della gioia,
                                i baci rubati tra le barricate e il ritorno
                                della libertà nel cuore dei parigini.
                            </p>
                        </div>
                    </section>

                    <section className="rounded-4xl p-10 md:p-14 bg-white/25 backdrop-blur-2xl border border-white/40 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
                        <h2 className="text-4xl font-black text-slate-900 mb-8">
                            La Filosofia dell'Imperfetto
                        </h2>
                        <p className="text-slate-700 leading-relaxed text-xl mb-10 italic">
                            "Non fotografo la vita così com'è, ma la vita come
                            vorrei che fosse."
                        </p>
                        <div className="flex flex-col gap-8">
                            <div className="bg-slate-900/5 p-8 rounded-3xl border border-slate-900/10">
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                                    La Fotografia Umanista
                                </h3>
                                <p className="text-slate-700 leading-relaxed text-lg">
                                    Insieme a Henri Cartier-Bresson e Willy
                                    Ronis, Doisneau è il pilastro della
                                    fotografia umanista. Mentre Cartier-Bresson
                                    cercava il "momento decisivo" con rigore
                                    geometrico, Doisneau cercava il "momento di
                                    grazia", l'istante in cui l'ordinario
                                    diventa straordinario grazie a un gesto, uno
                                    sguardo o una coincidenza buffa.
                                </p>
                            </div>
                            <div className="bg-slate-900/5 p-8 rounded-3xl border border-slate-900/10">
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                                    L'Enigmatismo Quotidiano
                                </h3>
                                <p className="text-slate-700 leading-relaxed text-lg">
                                    Prediligeva le periferie, i bistrot, i
                                    bambini che giocano per strada. La sua
                                    Parigi non è quella dei monumenti
                                    cartolineschi, ma quella dei lavoratori,
                                    degli innamorati e dei sognatori. Ogni
                                    scatto è una piccola narrazione, un
                                    frammento di un film che lo spettatore è
                                    invitato a completare.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-4xl p-10 md:p-14 bg-white/25 backdrop-blur-2xl border border-white/40 shadow-[0_4px_24px_rgba(0,0,0,0.03)] relative overflow-hidden group">
                        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-100/30 rounded-full blur-[100px] pointer-events-none"></div>
                        <h2 className="text-4xl font-black text-slate-900 mb-8 relative z-10">
                            L'Icona: Le Baiser de l'Hôtel de Ville
                        </h2>
                        <p className="text-slate-700 leading-relaxed text-lg mb-8 relative z-10">
                            Scattata nel 1950 per la rivista LIFE, questa
                            immagine è diventata il manifesto mondiale del
                            romanticismo parigino. Per anni fu considerata un
                            perfetto scatto rubato, finché non si scoprì che
                            Doisneau aveva chiesto a due giovani attori,
                            Françoise Bornet e Jacques Carteaud, di posare per
                            lui.
                        </p>
                        <div className="bg-white/40 backdrop-blur-2xl p-8 rounded-3xl border border-white/60 relative z-10 shadow-sm">
                            <p className="text-slate-800 leading-relaxed text-lg font-medium italic">
                                "Perché dovrei vergognarmene? Avevo intravisto
                                il potenziale di quel momento e l'ho messo in
                                scena per assicurarmi di catturarne l'essenza.
                                La verità di una foto non sta nel modo in cui è
                                stata scattata, ma nel sentimento che evoca."
                            </p>
                        </div>
                    </section>

                    <section className="rounded-4xl p-10 md:p-14 bg-white/30 backdrop-blur-2xl border border-white/50 shadow-[0_10px_40px_rgba(0,0,0,0.04)] mb-20">
                        <h2 className="text-4xl font-black text-slate-900 mb-8">
                            Eredità Spirituale
                        </h2>
                        <p className="text-slate-700 leading-relaxed text-lg mb-6">
                            Robert Doisneau ha lasciato un archivio di circa
                            450.000 negativi, una miniera d'oro di memoria
                            collettiva. Ha ricevuto i massimi onori, tra cui il
                            Prix Niépce nel 1956 e la Legion d'Onore nel 1984,
                            ma è sempre rimasto quel "pescatore di immagini"
                            umile e curioso.
                        </p>
                        <p className="text-slate-700 leading-relaxed text-lg">
                            Oggi il suo lavoro continua ad essere esposto nei
                            più grandi musei del mondo, dal MoMA di New York al
                            Centre Pompidou di Parigi, ricordandoci che la
                            bellezza non va cercata lontano, ma si nasconde
                            proprio dietro l'angolo della nostra strada
                            quotidiana.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
