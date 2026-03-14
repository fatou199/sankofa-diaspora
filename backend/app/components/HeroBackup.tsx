"use client";

import { Search, Calendar, ArrowRight, ArrowLeft, Map, ShieldCheck, Users2, Heart, Star, Facebook, Instagram, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
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

                    <div className="max-w-3xl mx-auto p-2 rounded-2xl md:rounded-full glass-effect flex flex-col md:flex-row items-center gap-2 group hover:ring-1 hover:ring-primary/20 transition-all duration-300">
                        <div className="flex-1 flex items-center gap-3 w-full px-6 py-3 md:py-0">
                            <Search className="text-white/40 group-hover:text-primary transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Où souhaitez-vous aller ?"
                                className="bg-transparent border-none outline-none text-white placeholder:text-white/40 w-full text-sm font-sans"
                            />
                        </div>
                        <div className="hidden md:block w-px h-8 bg-white/10" />
                        <div className="flex-1 flex items-center gap-3 w-full px-6 py-3 md:py-0">
                            <Calendar className="text-white/40" size={20} />
                            <input
                                type="text"
                                placeholder="Dates de voyage"
                                className="bg-transparent border-none outline-none text-white placeholder:text-white/40 w-full text-sm font-sans"
                            />
                        </div>
                        <button className="w-full md:w-auto bg-primary hover:bg-primary-hover text-black px-10 py-4 rounded-xl md:rounded-full font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-primary/20">
                            Rechercher
                            <ArrowRight size={18} />
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
                                    avec <span className="text-white/40">Sankofa ?</span>
                                </h3>
                            </div>

                            <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-xl font-sans">
                                Nous simplifions l'exploration du continent avec des outils conçus spécifiquement pour les défis et les opportunités du voyage en Afrique.
                            </p>

                            <button className="flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all group font-sans">
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
                                    desc: 'Découvrez des logements uniques et des activités gérés directement par des locaux.',
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
            <section className="w-full bg-black py-32 px-4">
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
                        <div className="flex gap-4">
                            <button className="p-4 rounded-full border border-white/10 text-white hover:bg-white/10 transition-all active:scale-90">
                                <ArrowLeft size={24} />
                            </button>
                            <button className="p-4 rounded-full border border-white/10 text-white hover:bg-white/10 transition-all active:scale-90">
                                <ArrowRight size={24} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
                        {[
                            { name: 'Sénégal', img: '/images/senegal.png' },
                            { name: 'Côte d’Ivoire', img: '/images/abidjan.jpg' },
                            { name: 'Mali', img: '/images/mali.png' }
                        ].map((country, idx) => (
                            <div key={idx} className="group relative h-[480px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl">
                                <Image
                                    src={country.img}
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
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECTION 4: NEWSLETTER --- */}
            <section className="w-full bg-[#050a05] py-24 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative rounded-[2.5rem] border border-white/10 bg-[#081408] p-8 md:p-20 overflow-hidden group">
                        {/* Decorative blob */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-8">
                                <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                    Prêt pour votre prochaine <br className="hidden md:block" /> aventure ?
                                </h3>
                                <p className="text-white/60 text-lg max-w-md font-sans leading-relaxed text-balance">
                                    Inscrivez-vous à notre newsletter pour recevoir des astuces de voyage exclusives, des alertes de prix et de l'inspiration hebdomadaire.
                                </p>

                                <div className="flex flex-col sm:flex-row items-stretch gap-3 max-w-md">
                                    <input
                                        type="email"
                                        placeholder="Votre adresse email"
                                        className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary/50 transition-colors font-sans"
                                    />
                                    <button className="bg-primary hover:bg-primary-hover text-black font-bold px-8 py-4 rounded-2xl transition-all active:scale-95 whitespace-nowrap">
                                        S'inscrire
                                    </button>
                                </div>
                                <p className="text-white/30 text-xs font-sans">
                                    Nous respectons votre vie privée. Désabonnement à tout moment.
                                </p>
                            </div>

                            {/* Testimonial Card */}
                            <div className="relative hidden lg:block">
                                <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />
                                <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] space-y-6 shadow-2xl overflow-hidden group/card max-w-sm ml-auto">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full bg-orange-200/20 relative overflow-hidden border border-white/10">
                                            <Image
                                                src="https://i.pravatar.cc/150?u=amara"
                                                alt="Amara Diop"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg">Amara Diop</h4>
                                            <p className="text-primary text-sm font-bold tracking-wide uppercase">Voyageur Frequent</p>
                                        </div>
                                    </div>
                                    <p className="text-white/80 italic font-sans leading-relaxed">
                                        "AfriVoyage a complètement changé ma façon de voir notre continent. J'ai découvert des perles au Sénégal que je ne soupçonnais même pas !"
                                    </p>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} size={16} className="fill-yellow-500 text-yellow-500" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 5: FOOTER --- */}
            <footer className="w-full bg-[#050a05] pt-24 pb-12 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="flex items-center gap-2">
                                <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center">
                                    <Search size={22} className="text-black stroke-[3px]" />
                                </div>
                                <span className="text-2xl font-bold tracking-tight text-white">Sankofa Diaspora</span>
                            </div>
                            <p className="text-white/40 text-base max-w-xs font-sans leading-relaxed">
                                La première plateforme de planification de voyages dédiée aux explorateurs africains. Authenticité, simplicité et découverte.
                            </p>
                            <div className="flex gap-4">
                                {[Facebook, Twitter, Instagram].map((Icon, i) => (
                                    <Link key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/30 transition-all">
                                        <Icon size={20} />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-white font-bold text-lg">Entreprise</h4>
                            <ul className="space-y-4 text-white/40 font-sans text-sm">
                                <li><Link href="#" className="hover:text-primary transition-colors">À propos</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">Carrières</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">Presse</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-white font-bold text-lg">Support</h4>
                            <ul className="space-y-4 text-white/40 font-sans text-sm">
                                <li><Link href="#" className="hover:text-primary transition-colors">Centre d'aide</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">Sécurité</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">Annulation</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">Signaler un souci</Link></li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-white font-bold text-lg">Légal</h4>
                            <ul className="space-y-4 text-white/40 font-sans text-sm">
                                <li><Link href="#" className="hover:text-primary transition-colors">Conditions d'utilisation</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">Politique de confidentialité</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">Mentions légales</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-xs font-sans uppercase tracking-widest">
                        <p>© 2026 Sankofa Diaspora Inc. Tous droits réservés.</p>
                        <p className="flex items-center gap-1">Fait avec <Heart size={10} className="fill-primary text-primary" /> en Afrique</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
