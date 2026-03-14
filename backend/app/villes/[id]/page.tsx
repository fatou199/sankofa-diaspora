"use client";

import Navbar from "@/app/components/Navbar";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import {
    MapPin,
    ArrowRight,
    ChevronRight,
    Utensils,
    Hotel,
    Mountain,
    Star,
    Clock,
    Banknote,
    Heart,
    ArrowLeft,
    Compass,
    Plus
} from "lucide-react";

interface Activity {
    id: number;
    name: string;
    description: string;
    price: number;
    openingHours: string;
    category: string;
    address: string;
}

interface Hotel {
    id: number;
    name: string;
    description: string;
    pricePerNight: number;
    comfortLevel: string;
}

interface Restaurant {
    id: number;
    name: string;
    description: string;
    cuisineType: string;
    averagePrice: number;
    openingHours: string;
    phone?: string;
}

interface City {
    id: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    country: {
        id: number;
        name: string;
        image: string;
        currency: string;
    };
    activities: Activity[];
    hotels: Hotel[];
    restaurants: Restaurant[];
}

const comfortLabels: Record<string, string> = {
    BASIC: "Économique",
    COMFORTABLE: "Confortable",
    LUXURY: "Luxe",
};

const categoryLabels: Record<string, string> = {
    NATURE: "Nature & Safari",
    CULTURE: "Culture & Histoire",
    GASTRONOMY: "Gastronomie",
    BEACH: "Plage & Détente",
    ADVENTURE: "Aventure",
    ART: "Artisanat & Marchés",
    PHOTOGRAPHY: "Photographie",
    RELAXATION: "Bien-être & Spa",
    SPORT: "Sport",
    LEISURE: "Loisirs",
    HISTORY: "Histoire",
    SHOPPING: "Shopping",
    OTHER: "Autre",
};

export default function VillePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [city, setCity] = useState<City | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("Activités");

    const tabs = ["Activités", "Hôtels", "Restaurants"];

    useEffect(() => {
        const fetchCity = async () => {
            try {
                const res = await fetch(`/api/cities/${id}`);
                const data = await res.json();
                if (!data.error) setCity(data);
            } catch (e) {
                console.error("Erreur chargement ville:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchCity();
    }, [id]);

    const handleCreateAventure = () => {
        if (!city) return;
        // Pré-remplissage via localStorage
        const pending = {
            countryId: String(city.country.id),
            cityIds: [city.id],
            startDate: "",
            endDate: "",
            budget: 50,
            interests: [],
            adults: 2,
            children: 0,
            isFlexible: false
        };
        localStorage.setItem("pendingItinerary", JSON.stringify(pending));
        router.push("/aventures");
    };

    if (loading) {
        return (
            <div className="bg-[#050f05] min-h-screen text-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#00ed64] border-t-transparent rounded-full animate-spin" />
                    <p className="font-bold animate-pulse">Chargement de la ville...</p>
                </div>
            </div>
        );
    }

    if (!city) {
        return (
            <div className="bg-[#050f05] min-h-screen text-white flex items-center justify-center">
                <p>Ville introuvable.</p>
            </div>
        );
    }

    return (
        <div className="bg-[#050f05] min-h-screen text-white font-sans">
            <Navbar />

            {/* Hero */}
            <section className="relative min-h-[60vh] flex items-end overflow-hidden pb-16 pt-32">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0c1a0c] via-[#050f05] to-[#00ed64]/5" />
                {/* Decorative circles */}
                <div className="absolute top-20 right-20 w-96 h-96 bg-[#00ed64]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00ed64]/3 rounded-full blur-3xl" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-[#a3b1a3] text-xs font-bold uppercase tracking-widest mb-8">
                        <button onClick={() => router.back()} className="flex items-center gap-1 hover:text-[#00ed64] transition-colors">
                            <ArrowLeft size={14} /> Retour
                        </button>
                        <ChevronRight size={12} />
                        <span>{city.country.name}</span>
                        <ChevronRight size={12} />
                        <span className="text-white">{city.name}</span>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                        <div className="space-y-6 max-w-2xl">
                            <div className="inline-flex items-center gap-2 bg-[#00ed64]/10 border border-[#00ed64]/20 text-[#00ed64] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                                <MapPin size={12} /> {city.country.name}
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black leading-[1.05]">
                                {city.name}
                            </h1>
                            <p className="text-[#a3b1a3] text-lg leading-relaxed max-w-xl">
                                {city.description}
                            </p>

                            {/* Quick stats */}
                            <div className="flex flex-wrap gap-6 pt-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <Mountain size={16} className="text-[#00ed64]" />
                                    <span className="font-bold">{city.activities.length}</span>
                                    <span className="text-[#a3b1a3]">activité{city.activities.length > 1 ? 's' : ''}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Hotel size={16} className="text-[#00ed64]" />
                                    <span className="font-bold">{city.hotels.length}</span>
                                    <span className="text-[#a3b1a3]">hôtel{city.hotels.length > 1 ? 's' : ''}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Utensils size={16} className="text-[#00ed64]" />
                                    <span className="font-bold">{city.restaurants.length}</span>
                                    <span className="text-[#a3b1a3]">restaurant{city.restaurants.length > 1 ? 's' : ''}</span>
                                </div>
                            </div>
                        </div>

                        {/* CTA Card */}
                        <div className="bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] p-8 w-full lg:w-80 space-y-6 shrink-0">
                            <div className="w-14 h-14 rounded-2xl bg-[#00ed64]/10 flex items-center justify-center">
                                <Compass size={28} className="text-[#00ed64]" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#00ed64] mb-2">Prêt à explorer ?</p>
                                <h3 className="text-xl font-black leading-tight">Créez votre aventure à {city.name}</h3>
                                <p className="text-[#a3b1a3] text-sm mt-2">Votre ville sera pré-remplie automatiquement.</p>
                            </div>
                            <button
                                onClick={handleCreateAventure}
                                className="w-full bg-[#00ed64] text-black py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,237,100,0.4)] transition-all hover:scale-[1.02] active:scale-95"
                            >
                                Créer mon aventure <ArrowRight size={18} strokeWidth={3} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-12">

                {/* Tabs */}
                <nav className="flex gap-2 bg-[#0c1a0c] border border-white/5 rounded-2xl p-1.5 w-fit">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${activeTab === tab
                                    ? "bg-[#00ed64] text-black shadow-[0_0_20px_rgba(0,237,100,0.3)]"
                                    : "text-[#a3b1a3] hover:text-white"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>

                {/* Tab: Activités */}
                {activeTab === "Activités" && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        {city.activities.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {city.activities.map((act) => (
                                    <div key={act.id} className="bg-[#0c1a0c] border border-white/5 rounded-[2rem] p-6 space-y-4 hover:border-[#00ed64]/30 transition-all group">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-[#00ed64]/10 flex items-center justify-center shrink-0">
                                                <Mountain size={22} className="text-[#00ed64]" />
                                            </div>
                                            <span className="text-[9px] font-black uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[#a3b1a3]">
                                                {categoryLabels[act.category] || act.category}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black group-hover:text-[#00ed64] transition-colors">{act.name}</h3>
                                            <p className="text-[#a3b1a3] text-sm mt-1 leading-relaxed line-clamp-2">{act.description}</p>
                                        </div>
                                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                            <div className="flex items-center gap-1.5 text-xs text-[#a3b1a3]">
                                                <Clock size={12} className="text-[#00ed64]" />
                                                <span>{act.openingHours}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-sm font-black text-[#00ed64]">
                                                <Banknote size={14} />
                                                <span>{act.price}€</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center space-y-4">
                                <Mountain size={48} className="mx-auto text-white/10" />
                                <p className="text-[#a3b1a3] font-bold">Aucune activité disponible pour l'instant.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Tab: Hôtels */}
                {activeTab === "Hôtels" && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        {city.hotels.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {city.hotels.map((hotel) => (
                                    <div key={hotel.id} className="bg-[#0c1a0c] border border-white/5 rounded-[2rem] p-6 space-y-4 hover:border-[#00ed64]/30 transition-all group">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-[#00ed64]/10 flex items-center justify-center shrink-0">
                                                <Hotel size={22} className="text-[#00ed64]" />
                                            </div>
                                            <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${hotel.comfortLevel === "LUXURY"
                                                    ? "text-yellow-400 border-yellow-400/30 bg-yellow-400/10"
                                                    : hotel.comfortLevel === "COMFORTABLE"
                                                        ? "text-[#00ed64] border-[#00ed64]/30 bg-[#00ed64]/10"
                                                        : "text-[#a3b1a3] border-white/10 bg-white/5"
                                                }`}>
                                                {comfortLabels[hotel.comfortLevel] || hotel.comfortLevel}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black group-hover:text-[#00ed64] transition-colors">{hotel.name}</h3>
                                            <p className="text-[#a3b1a3] text-sm mt-1 leading-relaxed line-clamp-2">{hotel.description}</p>
                                        </div>
                                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                            <span className="text-[10px] text-[#a3b1a3] font-bold uppercase tracking-widest">Par nuit</span>
                                            <span className="text-lg font-black text-[#00ed64]">{hotel.pricePerNight}€</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center space-y-4">
                                <Hotel size={48} className="mx-auto text-white/10" />
                                <p className="text-[#a3b1a3] font-bold">Aucun hôtel disponible pour l'instant.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Tab: Restaurants */}
                {activeTab === "Restaurants" && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        {city.restaurants.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {city.restaurants.map((resto) => (
                                    <div key={resto.id} className="bg-[#0c1a0c] border border-white/5 rounded-[2rem] p-6 space-y-4 hover:border-[#00ed64]/30 transition-all group">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-[#00ed64]/10 flex items-center justify-center shrink-0">
                                                <Utensils size={22} className="text-[#00ed64]" />
                                            </div>
                                            <span className="text-[9px] font-black uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[#a3b1a3]">
                                                {resto.cuisineType}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black group-hover:text-[#00ed64] transition-colors">{resto.name}</h3>
                                            <p className="text-[#a3b1a3] text-sm mt-1 leading-relaxed line-clamp-2">{resto.description}</p>
                                        </div>
                                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                            <div className="flex items-center gap-1.5 text-xs text-[#a3b1a3]">
                                                <Clock size={12} className="text-[#00ed64]" />
                                                <span>{resto.openingHours}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-sm font-black text-[#00ed64]">
                                                <Banknote size={14} />
                                                <span>~{resto.averagePrice}€</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center space-y-4">
                                <Utensils size={48} className="mx-auto text-white/10" />
                                <p className="text-[#a3b1a3] font-bold">Aucun restaurant disponible pour l'instant.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Bottom CTA */}
                <div className="bg-gradient-to-br from-[#00ed64] to-[#008f3c] rounded-[3rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-black/60 mb-2">Prochaine étape</p>
                        <h3 className="text-3xl font-black text-black leading-tight">Construire votre aventure<br />à {city.name} ?</h3>
                    </div>
                    <button
                        onClick={handleCreateAventure}
                        className="bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center gap-3 hover:scale-105 transition-all whitespace-nowrap shrink-0 hover:shadow-[0_0_30px_rgba(0,0,0,0.4)]"
                    >
                        Générer mon itinéraire <ArrowRight size={20} strokeWidth={3} />
                    </button>
                </div>
            </main>
        </div>
    );
}
