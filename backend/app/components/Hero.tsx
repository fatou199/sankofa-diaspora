"use client";

import { Search, ArrowRight, ArrowLeft, Map, ShieldCheck, Users2, Heart, Star, Facebook, Instagram, Twitter, Globe, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Footer from './Footer';

export default function Hero() {
    const router = useRouter();
    const [destinations, setDestinations] = useState<any[]>([]);
    const [showToast, setShowToast] = useState(false);

    const handleComingSoon = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('/api/countries');
                const data = await response.json();
                setDestinations(data);
            } catch (error) {
                console.error("Erreur chargement pays:", error);
            }
        };
        fetchCountries();
    }, []);

    return (
        <div className="relative flex flex-col w-full bg-[#050a05]">
            {/* --- SECTION 1: HERO --- */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-24 px-4 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 z-0 h-full">
                    <Image
                        src="/images/hero.png"
                        alt="African Landscape"
                        fill
                        className="object-cover brightness-[0.3]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081408] via-transparent to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-effect text-[10px] sm:text-xs font-bold tracking-widest uppercase text-white/90">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Le voyage réinventé
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
                        Explorez l'Afrique, <br />
                        <span className="text-primary italic">à votre façon.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                        Des itinéraires authentiques conçus pour les voyageurs du continent.
                        Découvrez la magie près de chez vous, sans frontières.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <button
                            onClick={() => router.push('/aventures')}
                            className="bg-primary hover:bg-primary-hover text-black px-12 py-5 rounded-full font-bold flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-primary/30"
                        >
                            Commencez votre aventure
                            <ArrowRight size={20} />
                        </button>
                    </div>

                    {/* <div className="flex flex-col items-center gap-3 pt-8">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#050a05] bg-zinc-800 overflow-hidden relative shadow-xl">
                                    <Image
                                        src={`https://i.pravatar.cc/100?u=${i + 15}`}
                                        alt="User"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        <p className="text-sm font-medium text-white/40 italic font-sans">
                            Rejoignez <span className="text-white font-bold not-italic">10,000+</span> voyageurs
                        </p>
                    </div> */}
                </div>
            </section>

            {/* --- SECTION 2: NOTRE PROMESSE (FOND VERT) --- */}
            <section className="w-full bg-[#081408] py-32 px-4 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <h2 className="uppercase text-primary font-bold tracking-[0.2em] text-[10px] sm:text-xs">
                                    Notre promesse
                                </h2>
                                <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-white">
                                    Pourquoi voyager <br />
                                    avec <span className="text-white/40">Aliniosié ?</span>
                                </h3>
                            </div>

                            <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-xl font-sans">
                                Nous simplifions l'exploration du continent avec des outils conçus spécifiquement pour les défis et les opportunités du voyage en Afrique.
                            </p>

                            <button 
                                onClick={handleComingSoon}
                                className="flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all group font-sans"
                            >
                                En savoir plus
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                {
                                    title: 'Itinéraires sur mesure',
                                    desc: 'Des plans de voyage générés par IA adaptés à votre style, votre budget et vos intérêts.',
                                    icon: <Map className="text-primary" size={24} />
                                },
                                {
                                    title: 'Expériences Authentiques',
                                    desc: 'Découvrez des expériences authentiques et des activités gérées directement par des locaux.',
                                    icon: <Heart className="text-primary" size={24} />
                                },
                                {
                                    title: 'Voyage sans tracas',
                                    desc: 'Informations à jour sur les visas et la sécurité pour tous les passeports africains.',
                                    icon: <ShieldCheck className="text-primary" size={24} />
                                },
                                {
                                    title: 'Communauté Active',
                                    desc: 'Échangez des conseils et trouvez des compagnons de voyage dans notre forum.',
                                    icon: <Users2 className="text-primary" size={24} />
                                }
                            ].map((item, i) => (
                                <div key={i} className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all duration-300 group">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-lg font-bold mb-3 text-white">
                                        {item.title}
                                    </h4>
                                    <p className="text-white/40 text-sm leading-relaxed font-sans">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 3: DESTINATIONS TENDANCE --- */}
            <section id="destinations" className="w-full bg-black py-32 px-4">
                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-6">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                                Destinations Tendance
                            </h2>
                            <p className="text-white/40 text-lg font-sans">
                                Les lieux préférés de notre communauté ce mois-ci.
                            </p>
                        </div>
                        <div className="hidden md:flex gap-4">
                            <button className="p-4 rounded-full border border-white/10 text-white hover:bg-white/10 transition-all active:scale-90">
                                <ArrowLeft size={24} />
                            </button>
                            <button className="p-4 rounded-full border border-white/10 text-white hover:bg-white/10 transition-all active:scale-90">
                                <ArrowRight size={24} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
                        {destinations.length > 0 ? destinations.slice(0, 3).map((country, idx) => (
                            <Link key={country.id} href={`/destinations/${country.id}`} className="group relative h-[480px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl">
                                <Image
                                    src={country.image || '/images/hero.png'}
                                    alt={country.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                                <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                                    <div className="space-y-1">
                                        <h3 className="text-3xl font-bold text-white tracking-tight">{country.name}</h3>
                                        <p className="text-white/50 text-sm font-medium font-sans">À partir de 450 €</p>
                                    </div>
                                    <div className="p-4 bg-primary rounded-full text-black opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 shadow-lg shadow-primary/20">
                                        <ArrowRight size={22} strokeWidth={3} />
                                    </div>
                                </div>
                            </Link>
                        )) : (
                            <div className="col-span-3 text-center py-20 text-white/20">
                                Chargement des destinations...
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* --- SECTION 4: NEWSLETTER --- */}
            <section className="w-full bg-[#050a05] py-24 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative rounded-[2.5rem] border border-white/10 bg-[#081408] p-8 md:p-20 overflow-hidden group">
                        {/* Decorative blob */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10 flex flex-col items-center text-center space-y-12 max-w-4xl mx-auto py-10">
    {/* Badge discret */}
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
        <Globe size={14} /> Le manifeste Aliniosié
    </div>
    
    {/* Titre fort */}
    <h2 className="text-4xl md:text-6xl font-black italic text-white leading-[1.1] tracking-tighter">
        Bâtir le premier pont numérique <br />
        <span className="text-primary">vers l'héritage africain.</span>
    </h2>
    
    {/* Texte de transition */}
    <p className="text-lg md:text-xl text-white/50 font-medium max-w-2xl leading-relaxed">
        Rejoignez la mission. Nous créons un outil pour que chaque retour sur le continent soit une retrouvaille authentique et simplifiée.
    </p>

    {/* Newsletter simplifiée pour le lancement */}
    <div className="w-full max-w-lg pt-4">
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 text-white outline-none focus:border-primary/50 transition-colors font-sans"
            />
            <button className="bg-primary hover:bg-primary-hover text-black font-black uppercase tracking-widest text-xs px-10 py-5 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20">
                Rejoindre
            </button>
        </div>
        <p className="text-white/20 text-[10px] mt-6 font-black uppercase tracking-[0.2em]">
            Soyez les premiers informés de l'ouverture d'Aliniosié
        </p>
    </div>
</div>

                    </div>
                </div>
            </section>

            <Footer />

            {/* Notification Toast pour les boutons de la page Hero */}
            {showToast && (
                <div className="fixed bottom-8 right-8 z-[200] animate-in fade-in slide-in-from-bottom-5 duration-500">
                    <div className="bg-primary text-black px-8 py-4 rounded-2xl font-black shadow-[0_20px_50px_rgba(0,237,100,0.3)] flex items-center gap-3 border border-white/20">
                        <Sparkles size={18} className="animate-pulse" />
                        <span className="text-[11px] uppercase tracking-[0.1em]">Bientôt disponible sur Aliniosié !</span>
                    </div>
                </div>
            )}
        </div>
    );
}
