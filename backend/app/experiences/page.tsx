"use client";

import React, { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import {
    Star,
    MapPin,
    Clock,
    Users,
    ChevronRight,
    Heart,
    Play,
    ArrowRight,
    Camera,
    Utensils,
    Compass,
    Mountain
} from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

const ExperiencesPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('Tous');

    const categories = [
        { name: 'Tous', icon: <Compass size={16} /> },
        { name: 'Gastronomie', icon: <Utensils size={16} /> },
        { name: 'Culture', icon: <Star size={16} /> },
        { name: 'Nature', icon: <Mountain size={16} /> },
        { name: 'Photo', icon: <Camera size={16} /> },
    ];

    const experiences = [
        {
            id: 1,
            title: "Coucher de soleil & Thé au Lac Rose",
            location: "Sénégal",
            category: "Nature",
            rating: 4.9,
            reviews: 128,
            duration: "4h",
            price: 35,
            image: "https://images.unsplash.com/photo-1596701062351-be4f6a45559c?w=800&fit=crop",
            featured: true
        },
        {
            id: 2,
            title: "Workshop Percussions & Rythmes Sabar",
            location: "Dakar",
            category: "Culture",
            rating: 5.0,
            reviews: 84,
            duration: "3h",
            price: 25,
            image: "https://images.unsplash.com/photo-1541517548505-99d2b1737718?w=800&fit=crop",
            featured: false
        },
        {
            id: 3,
            title: "Safari Gastronomique : Marché Kermel",
            location: "Dakar",
            category: "Gastronomie",
            rating: 4.8,
            reviews: 215,
            duration: "5h",
            price: 45,
            image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&fit=crop",
            featured: false
        },
        {
            id: 4,
            title: "Exploration des ruines de Grand-Bassam",
            location: "Côte d'Ivoire",
            category: "Culture",
            rating: 4.7,
            reviews: 56,
            duration: "6h",
            price: 40,
            image: "https://images.unsplash.com/photo-1581333100576-b73bbe923b91?w=800&fit=crop",
            featured: false
        }
    ];

    return (
        <div className="bg-[#050f05] min-h-screen text-white font-sans">
            <Navbar />

            {/* Hero Header */}
            <header className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-20 px-6 md:px-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2000&auto=format&fit=crop"
                        alt="Experience background"
                        className="w-full h-full object-cover scale-110 blur-[2px] opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050f05] via-[#050f05]/80 to-transparent" />
                </div>

                <div className="relative z-10 max-w-4xl space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                    <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-[#00ed64]/10 border border-[#00ed64]/20 text-[#00ed64] text-[10px] font-black uppercase tracking-[0.2em]">
                        <Star size={12} fill="currentColor" /> Expériences Uniques
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter leading-[0.9] uppercase">
                        Vivez <br />
                        <span className="text-transparent border-b-4 border-[#00ed64]" style={{ WebkitTextStroke: '1px white' }}>L'Afrique</span> <br />
                        <span className="text-[#00ed64]">Autrement.</span>
                    </h1>

                    <p className="text-[#a3b1a3] text-xl font-medium max-w-xl leading-relaxed">
                        Oubliez les circuits touristiques classiques. Immergez-vous dans le quotidien, apprenez les savoir-faire ancestraux et créez des souvenirs impérissables avec les locaux.
                    </p>

                    {/* <div className="flex flex-wrap gap-4 pt-4">
                        <button className="bg-[#00ed64] text-black px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,237,100,0.3)] group">
                            Découvrir le catalogue <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="bg-white/5 backdrop-blur-md px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-white/10 transition-all border border-white/5">
                            <Play size={18} fill="currentColor" /> Voir le trailer
                        </button>
                    </div> */}
                </div>

                {/* Floating Stats */}
                <div className="absolute bottom-12 right-12 hidden lg:flex gap-12 text-right animate-in fade-in duration-1000 delay-500">
                    <div>
                        <p className="text-4xl font-black italic text-[#00ed64]">500+</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#a3b1a3]">Hôtes Locaux</p>
                    </div>
                    <div>
                        <p className="text-4xl font-black italic text-[#00ed64]">2.5k</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#a3b1a3]">Aventures Vécues</p>
                    </div>
                </div>
            </header>

            {/* Filter Section */}
            <section className="sticky top-[72px] z-40 bg-[#050f05]/80 backdrop-blur-xl border-b border-white/5 px-6 md:px-20 py-6 overflow-x-auto scroller-hide">
                <div className="max-w-7xl mx-auto flex items-center gap-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#a3b1a3] shrink-0 mr-4">Filtrer par :</span>
                    {categories.map((cat) => {
                        const count = cat.name === 'Tous' ? experiences.length : experiences.filter(e => e.category === cat.name).length;
                        return (
                            <button
                                key={cat.name}
                                onClick={() => setSelectedCategory(cat.name)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border ${selectedCategory === cat.name ? 'bg-[#00ed64] text-black border-[#00ed64] shadow-[0_0_20px_rgba(0,237,100,0.2)]' : 'bg-white/5 border-white/5 text-white/50 hover:border-white/20'}`}
                            >
                                {cat.icon} {cat.name} <span className={`ml-1 px-2 py-0.5 rounded-md text-[10px] ${selectedCategory === cat.name ? 'bg-black/20' : 'bg-white/10'}`}>{count}</span>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* Content Section */}
            <main className="max-w-7xl mx-auto px-6 md:px-20 py-20 space-y-32">

                {/* Featured Experience */}
                <div className="group relative aspect-[21/9] rounded-[3rem] overflow-hidden border border-white/5 cursor-pointer">
                    <img
                        src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2000&auto=format&fit=crop"
                        alt="Featured"
                        className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-4">
                            <span className="bg-[#00ed64] text-black px-4 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.2em]">Expérience de la semaine</span>
                            <h2 className="text-4xl md:text-6xl font-black italic uppercase leading-none">Nuit sous les <br /> étoiles de Lompoul</h2>
                            <div className="flex items-center gap-6 text-[#a3b1a3]">
                                <span className="flex items-center gap-2 text-sm font-bold"><MapPin size={16} className="text-[#00ed64]" /> Désert de Lompoul, Sénégal</span>
                                <span className="flex items-center gap-2 text-sm font-bold"><Clock size={16} /> 2 Jours</span>
                            </div>
                        </div>
                        <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white w-20 h-20 rounded-full flex items-center justify-center hover:bg-[#00ed64] hover:text-black transition-all group-hover:scale-110 active:scale-95">
                            <ArrowRight size={32} strokeWidth={3} />
                        </button>
                    </div>
                </div>

                {/* Grid of Experiences */}
                <div className="space-y-12">
                    <div className="flex items-end justify-between border-b border-white/5 pb-8">
                        <div className="space-y-2">
                            <h3 className="text-4xl font-black tracking-tighter italic uppercase">Les Incontournables</h3>
                            <p className="text-[#a3b1a3] font-medium">Les expériences les plus prisées par notre communauté ce mois-ci.</p>
                        </div>
                        {/* <Link href="#" className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#00ed64] hover:underline">
                            Voir tout le catalogue <ChevronRight size={14} />
                        </Link> */}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {experiences
                            .filter(ex => selectedCategory === 'Tous' || ex.category === selectedCategory)
                            .map((exp) => (
                                <div key={exp.id} className="group flex flex-col bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-[#00ed64]/30 transition-all duration-500">
                                    <div className="h-64 relative overflow-hidden">
                                        <img
                                            src={exp.image}
                                            alt={exp.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <span className="bg-[#050f05]/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest">
                                                {exp.category}
                                            </span>
                                        </div>
                                        <button className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-black/40 backdrop-blur-md flex items-center justify-center text-white/40 hover:text-pink-500 transition-colors">
                                            <Heart size={18} />
                                        </button>
                                    </div>
                                    <div className="p-8 flex flex-col flex-1 space-y-6">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center gap-1.5 text-[10px] font-black text-[#00ed64] uppercase"><Star size={12} fill="currentColor" /> {exp.rating} <span className="text-[#a3b1a3]">({exp.reviews})</span></span>
                                                <span className="flex items-center gap-1.5 text-[10px] font-black text-[#a3b1a3] uppercase"><Clock size={12} /> {exp.duration}</span>
                                            </div>
                                            <h4 className="text-xl font-black leading-tight italic group-hover:text-[#00ed64] transition-colors line-clamp-2 uppercase min-h-[56px]">{exp.title}</h4>
                                            <p className="flex items-center gap-1.5 text-[#a3b1a3] text-sm font-bold">
                                                <MapPin size={14} className="text-[#00ed64]" /> {exp.location}
                                            </p>
                                        </div>
                                        <div className="pt-6 border-t border-white/5 mt-auto flex items-center justify-between">
                                            <div>
                                                <span className="text-[10px] font-black text-[#a3b1a3] uppercase block mb-1">À partir de</span>
                                                <span className="text-2xl font-black italic">{exp.price}€</span>
                                            </div>
                                            <button className="bg-white/5 hover:bg-[#00ed64] text-white hover:text-black w-14 h-14 rounded-full flex items-center justify-center transition-all active:scale-90 border border-white/5">
                                                <ArrowRight size={24} strokeWidth={3} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Newsletter / CTA */}
                <section className="bg-gradient-to-br from-[#0c1a0c] to-[#050f05] rounded-[4rem] p-12 md:p-24 border border-white/5 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(0,237,100,0.1)_0%,_transparent_50%)]" />
                    <div className="relative z-10 space-y-10 max-w-3xl mx-auto">
                        <Users size={64} className="mx-auto text-[#00ed64] opacity-20" />
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">Devenez un hôte Aliniosié et <span className="text-[#00ed64]">partagez votre culture.</span></h2>
                        <p className="text-[#a3b1a3] text-lg font-medium">Vous habitez le continent et souhaitez faire découvrir les joyaux cachés de votre région ? Rejoignez nos guides locaux.</p>
                        {/* <div className="flex flex-wrap justify-center gap-4">
                            <button className="bg-white text-black px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">S'inscrire comme hôte</button>
                            <button className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all">En savoir plus</button>
                        </div> */}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ExperiencesPage;
