import Navbar from "@/components/Navbar";
import { History, Compass, Heart, Globe, ArrowDown, MapPin, Sparkles, BookOpen } from "lucide-react";
import Link from "next/link";

export default function About() {
    return (
        <div className="relative min-h-screen bg-[#050f05] text-white selection:bg-[#00ed64]/30 overflow-x-hidden">
            <Navbar />

            {/* Guiding Story Line */}
            <div className="fixed left-1/2 top-40 bottom-0 w-[1px] bg-gradient-to-b from-[#00ed64]/40 via-[#00ed64]/10 to-transparent hidden lg:block -translate-x-1/2 z-0" />

            {/* Background Atmosphere */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[20%] left-[-5%] w-[35%] h-[35%] bg-[#00ed64]/3 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[-5%] w-[45%] h-[45%] bg-[#00ed64]/5 rounded-full blur-[130px]" />
            </div>

            <main className="relative z-10">
                {/* Chapter I : The Awakening */}
                <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 text-center">
                    <div className="space-y-6 max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00ed64]/10 border border-[#00ed64]/20 text-[#00ed64] text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                            <Sparkles size={14} /> Chapitre I : L'Éveil
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight italic">
                            Un Voyage au-delà <br />
                            <span className="text-[#00ed64]">des Frontières.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/50 font-medium max-w-2xl mx-auto leading-relaxed">
                            "On ne sait pas où l'on va si l'on ne sait pas d'où l'on vient." <br />
                            Tout a commencé par un besoin de vérité.
                        </p>
                        <div className="pt-12 animate-bounce">
                            <ArrowDown className="text-[#00ed64]/40 mx-auto" size={32} strokeWidth={1} />
                        </div>
                    </div>
                </section>

                {/* Chapter II : The Symbol */}
                <section className="py-24 px-6 flex flex-col items-center">
                    <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative flex justify-center lg:justify-end">
                            <div className="w-64 h-64 md:w-[400px] md:h-[400px] relative">
                                <div className="absolute inset-0 bg-[#00ed64]/10 rounded-full blur-3xl" />
                                <div className="absolute inset-0 border-2 border-[#00ed64]/20 rounded-full animate-[spin_20s_linear_infinite]" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
                                    <History size={100} className="text-[#00ed64] opacity-80" strokeWidth={1} />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-8 bg-black/20 p-8 md:p-12 rounded-[3.5rem] border border-white/5 backdrop-blur-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-[2px] bg-[#00ed64]" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#a3b1a3]">L'Origine du Nom</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black italic text-white">Sankofa : <br />Le Passé Éclairé.</h2>
                            <p className="text-base md:text-lg text-white/60 leading-relaxed font-medium">
                                Dans la tradition Akan, l'Oiseau Sankofa vole vers l'avant tout en regardant vers l'arrière, tenant un œuf précieux dans son bec.
                                <br /><br />
                                Ce n'est pas une simple icône. C'est une philosophie : <span className="text-white font-bold italic">récupérer ce qui a été oublié</span> pour fertiliser le présent. Sankofa Diaspora est né de cette sagesse ancienne.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Chapter III : The Manifesto (Why) */}
                <section className="py-24 px-6 bg-[#0c1a0c]/20">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <div className="text-center space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00ed64]/10 border border-[#00ed64]/20 text-[#00ed64] text-[10px] font-black uppercase tracking-[0.3em]">
                                Chapitre III : Le Manifeste
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black italic">Pourquoi ?</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="glass-effect p-8 rounded-[2.5rem] border-white/5 space-y-4">
                                <h4 className="text-[#00ed64] font-black italic text-lg uppercase tracking-widest">Le Constat</h4>
                                <p className="text-white/60 leading-relaxed text-base">
                                    Venir sur le continent est un défi. Les informations sont dispersées, les itinéraires souvent trop "touristiques". Le sentiment de déconnexion peut être intimidant.
                                </p>
                            </div>
                            <div className="glass-effect p-8 rounded-[2.5rem] border-[#00ed64]/20 bg-[#00ed64]/5 space-y-4">
                                <h4 className="text-[#00ed64] font-black italic text-lg uppercase tracking-widest">L'Engagement</h4>
                                <p className="text-white/60 leading-relaxed text-base">
                                    Nous l'avons créée pour que personne ne se sente étranger sur sa propre terre.
                                    Notre mission est de démocratiser le retour aux racines en offrant un compagnon intelligent pour votre reconnexion.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Chapter IV : The Bridge */}
                <section className="py-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16 space-y-4">
                            <h3 className="text-[10px] font-black text-[#00ed64] uppercase tracking-[0.4em]">Chapitre IV</h3>
                            <h2 className="text-4xl md:text-6xl font-black italic">Bâtir le Pont.</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                            {/* Horizontal connection line for desktop */}
                            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/5 hidden lg:block -translate-y-1/2 z-0" />

                            {[
                                {
                                    icon: Globe,
                                    title: "Le Désir",
                                    desc: "Des millions de personnes cherchent à se reconnecter à leur héritage, mais ne savent pas par où commencer."
                                },
                                {
                                    icon: Compass,
                                    title: "La Route",
                                    desc: "Une technologie intelligente qui trace un itinéraire sur mesure : culture, généalogie et aventure."
                                },
                                {
                                    icon: Heart,
                                    title: "L'Arrivée",
                                    desc: "Le sentiment d'être 'enfin chez soi'. En tant qu'enfant légitime du continent africain."
                                }
                            ].map((step, idx) => (
                                <div key={idx} className="relative z-10 bg-[#0c1a0c] border border-white/5 p-8 rounded-[2.5rem] group hover:border-[#00ed64]/30 hover:-translate-y-2 transition-all duration-500">
                                    <div className="w-14 h-14 rounded-2xl bg-[#00ed64]/10 border border-[#00ed64]/10 flex items-center justify-center text-[#00ed64] mb-6 group-hover:scale-110 transition-transform duration-500">
                                        <step.icon size={28} />
                                    </div>
                                    <h4 className="text-xl font-black italic mb-3">{step.title}</h4>
                                    <p className="text-white/40 text-sm leading-relaxed font-medium font-sans">
                                        {step.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Chapter V : The Legacy */}
                <section className="py-32 px-6 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none scale-150">
                        <MapPin size={600} strokeWidth={0.5} className="text-[#00ed64]" />
                    </div>

                    <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">
                            <BookOpen size={14} /> Chapitre V : L'Héritage Vivant
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic leading-tight">
                            Le voyage ne se finit <br />
                            <span className="text-[#00ed64]">jamais vraiment.</span>
                        </h2>
                        <div className="text-lg md:text-xl text-white/50 font-medium space-y-6 leading-relaxed italic">
                            <p>
                                "Nous sommes les plumes de l'Oiseau Sankofa."
                            </p>
                            <p className="font-sans not-italic text-base opacity-80">
                                Chaque itinéraire généré et chaque racine retrouvée ajoute une plume à cette force collective. Nous documentons une reconnexion historique.
                            </p>
                        </div>
                        <div className="pt-8">
                            <Link href="/register" className="group relative inline-flex items-center gap-3 bg-[#00ed64] text-black px-12 py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-sm overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
                                <span className="relative z-10 flex items-center gap-3">
                                    Écrire votre histoire <ArrowDown className="-rotate-90" size={18} />
                                </span>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Narrative Footer */}
            <footer className="py-16 border-t border-white/5 bg-[#0c1a0c]/50 text-center px-6">
                <div className="max-w-7xl mx-auto space-y-8">
                    <div className="text-[#00ed64] font-black text-xl tracking-tighter italic">Sankofa Diaspora</div>
                    <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em] max-w-lg mx-auto leading-loose">
                        Un héritage à protéger. Un futur à explorer.
                    </p>
                    <div className="pt-6 text-white/10 text-[9px] font-bold uppercase tracking-widest">
                        &copy; {new Date().getFullYear()} • Votre histoire commence ici.
                    </div>
                </div>
            </footer>
        </div>
    );
}