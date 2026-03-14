"use client";

import Navbar from "@/components/Navbar";
import { Country } from "@prisma/client";
import { MapPin, ArrowRight, Compass, Sparkles, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";


export default function Destinations() {

    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchCountries = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/countries");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching countries:", error);
        return [];
    }
    };

    useEffect(() => {
        const loadCountries = async () => {
            const countriesData = await fetchCountries();
            setCountries(countriesData);
            setLoading(false);
        };

        loadCountries();
    }, []);

    // faire la recherche côté client
    const filteredCountries = countries.filter((country) => 
        country.name?.toLowerCase().includes(searchQuery.toLowerCase())
    )


    return (
        <div className="relative min-h-screen bg-[#050f05] text-white selection:bg-[#00ed64]/30 overflow-x-hidden">
            <Navbar />

            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[10%] left-[-5%] w-[35%] h-[35%] bg-[#00ed64]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[-5%] w-[45%] h-[45%] bg-[#00ed64]/10 rounded-full blur-[150px]" />
            </div>

            <main className="relative z-10 pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ed64]/10 border border-[#00ed64]/20 text-[#00ed64] text-[10px] font-black uppercase tracking-[0.3em]">
                            <Compass size={12} /> Explorez le Continent
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic leading-tight">
                            Nos <span className="text-[#00ed64]">Destinations</span> <br />
                            Sacrées.
                        </h1>
                        <p className="text-lg text-white/50 max-w-xl font-medium leading-relaxed font-sans">
                            Choisissez votre point d'ancrage. Chaque pays est une porte ouverte sur une facette unique de votre héritage.
                        </p>
                    </div>

                    <div className="relative group max-w-md w-full">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Rechercher un pays..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-5 text-white outline-none focus:border-[#00ed64]/50 transition-all font-sans font-medium"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#00ed64] transition-colors" size={20} />
                    </div>
                </div>

                {/* Destinations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        <div className="col-span-full text-center py-20">
                            <p className="text-white/30 text-lg font-medium">Chargement des destinations...</p>
                        </div>
                    ) : countries.length === 0 ? (
                            <div className="col-span-full text-center py-20">
                                <p className="text-white/30 text-lg font-medium">Aucune destination disponible pour le moment. Veuillez réessayer plus tard.</p>
                            </div>
                        ) : (
                    filteredCountries.map((dest: Country, idx: number) => (
                            <Link
                                key={dest.id}
                                href={`/destinations/${dest.id}`}
                                className="group relative h-[500px] rounded-[2.5rem] overflow-hidden border border-white/5 transition-all hover:border-[#00ed64]/30 animate-in fade-in slide-in-from-bottom-12 duration-1000"
                                style={{ animationDelay: `${idx * 150}ms` }}
                            >
                                {/* Image Background */}
                                <div className="absolute inset-0">
                                    {dest.image && (
                                        <Image
                                            src={dest.image}
                                            alt={dest.name}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110 brightness-[0.6] group-hover:brightness-[0.4]"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 p-10 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div className="w-10 h-10 rounded-full bg-[#00ed64] text-black flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-[0_0_20px_rgba(0,237,100,0.4)]">
                                            <ArrowRight size={20} />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <h2 className="text-4xl font-black italic tracking-tight">
                                                {dest.name}
                                            </h2>
                                        </div>
                                        <p className="text-sm text-white/60 font-medium leading-relaxed font-sans line-clamp-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            {dest.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>

                {/* Bottom CTA */}
                <div className="mt-32 p-12 md:p-20 rounded-[3rem] bg-[#0c1a0c] border border-white/5 relative overflow-hidden text-center space-y-8 animate-in fade-in duration-1000">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ed64]/5 blur-[80px] rounded-full" />
                    <Sparkles className="mx-auto text-[#00ed64]/40" size={48} />
                    <h2 className="text-3xl md:text-5xl font-black italic max-w-2xl mx-auto">
                        Votre voyage est <span className="text-[#00ed64]">unique</span> comme votre ADN.
                    </h2>
                    <p className="text-white/40 text-lg max-w-xl mx-auto font-sans">
                        Si vous ne trouvez pas votre pays d'origine, nos guides experts peuvent créer un itinéraire sur mesure pour vous.
                    </p>
                    <button className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all border border-white/10">
                        Contactez un expert <ArrowRight size={16} />
                    </button>
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="py-12 border-t border-white/5 text-center px-6">
                <p className="text-white/10 text-[9px] font-black uppercase tracking-[0.5em]">
                    &copy; {new Date().getFullYear()} Sankofa Diaspora • Explorez votre héritage.
                </p>
            </footer>
        </div>
    );
}