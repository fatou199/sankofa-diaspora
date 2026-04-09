"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    MapPin,
    Search,
    Utensils,
    Hotel,
    Mountain,
    ChevronRight,
    Star,
    Globe2,
    Coffee,
    Camera,
    ShoppingBag,
    Leaf
} from "lucide-react";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

interface ExplorerItem {
    id: number;
    _type: 'hotel' | 'restaurant' | 'activity';
    name: string;
    description: string;
    image?: string;
    price?: number;
    pricePerNight?: number;
    averagePrice?: number;
    category?: string;
    comfortLevel?: string;
    cuisineType?: string;
    neighborhood?: string;
    establishmentType?: string;
    city: {
        name: string;
        country: {
            name: string;
        }
    }
}

export default function ExplorerPage() {
    const router = useRouter();
    const [items, setItems] = useState<ExplorerItem[]>([]);
    const [countries, setCountries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeType, setActiveType] = useState('all');
    const [activeCuisine, setActiveCuisine] = useState('all_cuisines');
    const [activeActivity, setActiveActivity] = useState('all_activities');
    const [activeCountry, setActiveCountry] = useState<number | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState("");

    const tabs = [
        { id: 'all', label: 'Tous les types', icon: <Search size={16} /> },
        { id: 'activity', label: 'Activités & Lieux', icon: <Mountain size={16} /> },
        { id: 'hotel', label: 'Hôtels', icon: <Hotel size={16} /> },
        { id: 'patisseries', label: 'Pâtisseries & Desserts', icon: <Coffee size={16} /> },
        { id: 'restaurant', label: 'Restaurants', icon: <Utensils size={16} /> },
    ];

    const cuisineFilters = [
        { id: 'all_cuisines', label: 'Toutes les cuisines' },
        { id: 'AFRICAN', label: 'Africaine' },
        { id: 'ASIAN', label: 'Asiatique' },
        { id: 'GRILL', label: 'Grillades' },
        { id: 'halal', label: 'Halal-friendly' },
        { id: 'INTERNATIONAL', label: 'International' },
        { id: 'LOCAL', label: 'Locale' },
        { id: 'SEAFOOD', label: 'Poissons & Mer' },
        { id: 'STREET_FOOD', label: 'Street Food' },
    ];

    const activityFilters = [
        { id: 'all_activities', label: 'Toutes les activités' },
        { id: 'art_shopping', label: 'Artisanat & Shopping' },
        { id: 'culture_history', label: 'Culture & Histoire' },
        { id: 'relaxation', label: 'Détente & Plage' },
        { id: 'nature', label: 'Nature & Plein air' },
        { id: 'sport_adventure', label: 'Sport & Aventure' },
    ];

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await fetch(`/api/countries?t=${Date.now()}`);
                const data = await res.json();
                if (!data.error) setCountries(data);
            } catch (err) {
                console.error("Erreur de récupération des pays", err);
            }
        };
        fetchCountries();
    }, []);

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            try {
                // To bypass caching and apply filters
                const countryParam = activeCountry !== 'all' ? `&countryId=${activeCountry}` : '';
                const res = await fetch(`/api/explorer?type=all${countryParam}&t=${Date.now()}`);
                const data = await res.json();
                if (data.items) {
                    setItems(data.items);
                }
            } catch (error) {
                console.error("Erreur de récupération:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [activeCountry]); // Fetch items when country changes. Type and Cuisine are filtered client-side!

    // Complex filtering logic
    const filteredItems = items.filter(item => {
        // 1. Text Search
        const searchMatches = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.city.country.name.toLowerCase().includes(searchQuery.toLowerCase());

        if (!searchMatches) return false;

        // 2. Type & Category Filters
        if (activeType === 'restaurant') {
            const isPatisserieOrCafe = (item as any).establishmentType === 'PATISSERIE' || (item as any).establishmentType === 'CAFE';
            if (item._type !== 'restaurant' || isPatisserieOrCafe) return false;
            
            if (activeCuisine !== 'all_cuisines') {
                const searchStr = `${item.cuisineType || ''} ${item.description || ''} ${item.name || ''} ${(item as any).cuisine || ''} ${(item as any).type || ''}`.toLowerCase();

                if (activeCuisine === 'halal') {
                    if (!searchStr.includes('halal') && item.cuisineType !== 'HALAL') return false;
                } else if (activeCuisine === 'GRILL') {
                    if (!searchStr.includes('grill') && !searchStr.includes('barbecue') && !searchStr.includes('braisé') && !searchStr.includes('feu de bois')) return false;
                } else if (activeCuisine === 'SEAFOOD') {
                    if (!searchStr.includes('poisson') && !searchStr.includes('mer') && !searchStr.includes('seafood') && !searchStr.includes('lagunaire')) return false;
                } else if (activeCuisine === 'LOCAL' || activeCuisine === 'AFRICAN') {
                    if (!searchStr.includes('local') && !searchStr.includes('ivoirien') && !searchStr.includes('afri') && item.cuisineType !== 'AFRICAN' && item.cuisineType !== 'LOCAL') return false;
                } else if (activeCuisine === 'STREET_FOOD') {
                    if (!searchStr.includes('street') && !searchStr.includes('allocodrome') && !searchStr.includes('maquis') && item.cuisineType !== 'STREET_FOOD') return false;
                } else if (activeCuisine === 'INTERNATIONAL' || activeCuisine === 'ASIAN') {
                    if (!searchStr.includes(activeCuisine.toLowerCase()) && item.cuisineType !== activeCuisine) return false;
                } else {
                    if (item.cuisineType !== activeCuisine) return false;
                }
            }
        } else if (activeType === 'patisseries') {
            const isPatisserieOrCafe = (item as any).establishmentType === 'PATISSERIE' || (item as any).establishmentType === 'CAFE';
            const searchStr = `${item.cuisineType || ''} ${item.description || ''} ${item.name || ''} ${(item as any).cuisine || ''} ${(item as any).type || ''}`.toLowerCase();
            const matchesKeyword = searchStr.includes('cafe') || searchStr.includes('bakery') || searchStr.includes('pâtisserie') || searchStr.includes('glace') || searchStr.includes('dessert');
            
            if (item._type !== 'restaurant' || (!isPatisserieOrCafe && !matchesKeyword)) return false;
        } else if (activeType === 'hotel') {
            if (item._type !== 'hotel') return false;
        } else if (activeType === 'activity') {
            if (item._type !== 'activity') return false;
            
            if (activeActivity !== 'all_activities') {
                if (activeActivity === 'culture_history') {
                    if (item.category !== 'CULTURE' && item.category !== 'HISTORY') return false;
                } else if (activeActivity === 'nature') {
                    if (item.category !== 'NATURE') return false;
                } else if (activeActivity === 'art_shopping') {
                    if (item.category !== 'ART' && item.category !== 'SHOPPING') return false;
                } else if (activeActivity === 'sport_adventure') {
                    if (item.category !== 'SPORT' && item.category !== 'ADVENTURE') return false;
                } else if (activeActivity === 'relaxation') {
                    if (item.category !== 'RELAXATION' && item.category !== 'BEACH') return false;
                }
            }
        }

        return true;
    }).sort((a, b) => a.name.localeCompare(b.name));

    const getTabCount = (tabId: string) => {
        if (tabId === 'all') return items.length;
        return items.filter(item => {
            if (tabId === 'restaurant') {
                const isPatisserieOrCafe = (item as any).establishmentType === 'PATISSERIE' || (item as any).establishmentType === 'CAFE';
                return item._type === 'restaurant' && !isPatisserieOrCafe;
            } else if (tabId === 'patisseries') {
                const isPatisserieOrCafe = (item as any).establishmentType === 'PATISSERIE' || (item as any).establishmentType === 'CAFE';
                const searchStr = `${item.cuisineType || ''} ${item.description || ''} ${item.name || ''} ${(item as any).cuisine || ''} ${(item as any).type || ''}`.toLowerCase();
                const matchesKeyword = searchStr.includes('cafe') || searchStr.includes('bakery') || searchStr.includes('pâtisserie') || searchStr.includes('glace') || searchStr.includes('dessert');
                return item._type === 'restaurant' && (isPatisserieOrCafe || matchesKeyword);
            } else if (tabId === 'hotel') {
                return item._type === 'hotel';
            } else if (tabId === 'activity') {
                return item._type === 'activity';
            }
            return false;
        }).length;
    };

    return (
        <div className="bg-[#050f05] min-h-screen text-white font-sans">
            <Navbar />

            {/* Hero Header */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0c1a0c] to-[#050f05]" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#00ed64]/5 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col items-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ed64]/10 border border-[#00ed64]/20 text-[#00ed64] text-[10px] font-black uppercase tracking-[0.3em]">
                        <Globe2 size={12} /> Découvertes & Expériences
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight mt-0">
                        Votre prochaine découverte<br />
                        <span className="text-[#00ed64]">commence ici.</span>
                    </h1>
                    <p className="text-[#a3b1a3] text-lg max-w-2xl mx-auto">
                        Parcourez les meilleures adresses, hôtels d'exception et expériences uniques à travers le continent.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-3xl mx-auto flex items-center bg-[#0c1a0c] border border-white/10 rounded-full p-2 mt-8 shadow-2xl relative z-20">
                        <div className="pl-6 w-full flex items-center gap-3">
                            <Search className="text-[#00ed64]" size={20} />
                            <input
                                type="text"
                                placeholder="Abidjan, Domaine Bini, Restaurant..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border-none outline-none text-white placeholder-white/40 h-10 font-medium"
                            />
                        </div>
                        <button className="bg-[#00ed64] text-black px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs hover:shadow-[0_0_20px_rgba(0,237,100,0.3)] transition-all">
                            Chercher
                        </button>
                    </div>
                </div>
            </section>

            {/* Filtres Type */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 sticky top-0 z-30 pt-4 pb-0 bg-[#050f05]/95 backdrop-blur-md">
                <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveType(tab.id); setActiveCuisine('all_cuisines'); setActiveActivity('all_activities'); }}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest whitespace-nowrap transition-all border ${activeType === tab.id
                                    ? "bg-[#0c1a0c] text-[#00ed64] border-[#00ed64]/40 shadow-[0_0_15px_rgba(0,237,100,0.1)]"
                                    : "bg-white/5 text-[#a3b1a3] border-transparent hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {tab.icon} {tab.label} <span className={`ml-1 px-2 py-0.5 rounded-md text-[10px] ${activeType === tab.id ? 'bg-[#00ed64]/10 text-[#00ed64]' : 'bg-white/10 text-white/50'}`}>{getTabCount(tab.id)}</span>
                        </button>
                    ))}
                </div>

                {/* Filtres Cuisine (Uniquement si type = restaurant) */}
                {activeType === 'restaurant' && (
                    <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide animate-in slide-in-from-top-2 duration-300">
                        {cuisineFilters.map(cuisine => (
                            <button
                                key={cuisine.id}
                                onClick={() => setActiveCuisine(cuisine.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all border ${activeCuisine === cuisine.id
                                        ? "bg-white/10 text-white border-white/30"
                                        : "bg-transparent text-[#a3b1a3] border-transparent hover:text-white"
                                    }`}
                            >
                                {cuisine.label}
                            </button>
                        ))}
                    </div>
                )}

                {/* Filtres Activités (Uniquement si type = activity) */}
                {activeType === 'activity' && (
                    <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide animate-in slide-in-from-top-2 duration-300">
                        {activityFilters.map(activity => (
                            <button
                                key={activity.id}
                                onClick={() => setActiveActivity(activity.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all border ${activeActivity === activity.id
                                        ? "bg-white/10 text-white border-white/30"
                                        : "bg-transparent text-[#a3b1a3] border-transparent hover:text-white"
                                    }`}
                            >
                                {activity.label}
                            </button>
                        ))}
                    </div>
                )}

                {/* Filtres Pays - Sélecteur déroulant (Scalable) */}
                <div className="flex items-center gap-4 pb-6 px-1">
                    <span className="text-sm font-bold text-[#a3b1a3] uppercase tracking-widest flex items-center gap-2 hidden md:flex">
                        <Globe2 size={16} /> Destination
                    </span>
                    <div className="relative group w-full md:w-auto">
                        <select
                            value={activeCountry}
                            onChange={(e) => setActiveCountry(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                            className="w-full md:w-64 bg-[#0c1a0c] border border-white/10 text-white text-sm font-bold rounded-xl px-5 py-3 outline-none appearance-none pr-12 cursor-pointer hover:border-white/30 focus:border-[#00ed64] focus:ring-1 focus:ring-[#00ed64]/30 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] truncate"
                        >
                            <option value="all">Explorer toute l'Afrique</option>
                            {countries.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#00ed64] group-hover:scale-110 transition-transform">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Grid */}
            <main className="max-w-7xl mx-auto px-6 md:px-12 pb-24 relative z-10 pt-4">
                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center space-y-4">
                        <div className="w-12 h-12 border-4 border-[#00ed64] border-t-transparent rounded-full animate-spin" />
                        <p className="text-[#a3b1a3] font-bold animate-pulse">Recherche des pépites...</p>
                    </div>
                ) : filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredItems.map(item => (
                            <div
                                key={`${item._type}-${item.id}`}
                                onClick={() => router.push(`/explorer/${item._type}/${item.id}`)}
                                className="bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-[#00ed64]/30 transition-all cursor-pointer flex flex-col h-[420px]"
                            >
                                <div className="h-56 w-full relative bg-white/5 shrink-0 overflow-hidden">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            {item._type === 'hotel' ? <Hotel className="text-[#00ed64]/20" size={32} /> : item._type === 'restaurant' ? <Utensils className="text-[#00ed64]/20" size={32} /> : <Mountain className="text-[#00ed64]/20" size={32} />}
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a0c] via-transparent to-transparent" />

                                    {/* Type Badge */}
                                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-xl flex items-center gap-1.5 text-white">
                                        {item._type === 'hotel' ? <Hotel size={12} className="text-[#00ed64]" /> : item._type === 'restaurant' ? <Utensils size={12} className="text-[#00ed64]" /> : <Mountain size={12} className="text-[#00ed64]" />}
                                        <span className="text-[9px] font-black uppercase tracking-widest">{item._type === 'hotel' ? 'Hébergement' : item._type === 'restaurant' ? 'Restaurant' : 'Activité'}</span>
                                    </div>

                                    {/* Note Badge Placeholder */}
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/10 flex items-center gap-1">
                                        <Star size={10} className="text-yellow-400" fill="currentColor" />
                                        <span className="text-[10px] font-bold text-white leading-none">4.8</span>
                                    </div>
                                </div>

                                <div className="p-6 pt-4 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest font-black mb-2">
                                        <MapPin size={10} className="text-[#00ed64]" />
                                        {item.city.name}, {item.city.country.name}
                                    </div>
                                    <h3 className="text-xl font-black group-hover:text-[#00ed64] transition-colors line-clamp-1">{item.name}</h3>
                                    <p className="text-[#a3b1a3] text-sm mt-2 line-clamp-2 leading-relaxed flex-1">{item.description}</p>

                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                                        {/* Price logic */}
                                        <div className="text-white font-black text-lg">
                                            {(item.price || item.pricePerNight || item.averagePrice)?.toLocaleString()} <span className="text-[10px] text-[#00ed64] uppercase ml-0.5">CFA</span>
                                        </div>
                                        <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#00ed64] group-hover:text-black transition-colors">
                                            <ChevronRight size={16} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-32 text-center">
                        <Search size={48} className="mx-auto text-white/10 mb-6" />
                        <h3 className="text-2xl font-black mb-2">Aucun résultat</h3>
                        <p className="text-[#a3b1a3]">Essayez de modifier vos filtres ou de chercher autre chose.</p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
