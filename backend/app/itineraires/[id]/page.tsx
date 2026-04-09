"use client";

import Navbar from "@/app/components/Navbar";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    MapPin,
    Clock,
    Map as MapIcon,
    Bus,
    Hotel,
    Camera,
    Utensils,
    Calendar,
    Pencil,
    Share2,
    ChevronDown,
    ArrowRight,
    TrendingUp,
    LayoutGrid
} from "lucide-react";

export default function ItineraryDetails({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const [itinerary, setItinerary] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItinerary = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`/api/itineraries/${resolvedParams.id}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (!res.ok) throw new Error("Failed to load itinerary");
                const data = await res.json();
                setItinerary(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchItinerary();
    }, [resolvedParams.id]);
    return (
        <div className="bg-[#050f05] min-h-screen text-white font-sans">
            <Navbar />

            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-pulse text-[#00ed64] font-black tracking-widest uppercase">Initialisation de la mission...</div>
                </div>
            ) : !itinerary ? (
                <div className="flex flex-col items-center justify-center h-screen gap-6">
                    <p className="text-white/40 font-bold uppercase tracking-widest">Itinéraire introuvable</p>
                    <button onClick={() => router.push('/profil')} className="text-[#00ed64] font-black underline">Retour au profil</button>
                </div>
            ) : (
                <>
                    {/* Header Info Banner */}
                    <section className="relative h-[60vh] flex flex-col justify-end pb-12 px-6 md:px-12">
                        <img
                            src={itinerary.country?.image || "https://images.unsplash.com/photo-1596701062351-be4f6a45559c?q=80&w=2000&auto=format&fit=crop"}
                            alt={itinerary.country?.name || "Afrique"}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050f05] via-[#050f05]/60 to-black/20" />

                        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-6">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="bg-[#00ed64] text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Aventure Confirmée</span>
                                <span className="text-white/60 text-xs font-medium">Départ le {new Date(itinerary.startDate).toLocaleDateString('fr-FR')} - {Math.ceil((new Date(itinerary.endDate).getTime() - new Date(itinerary.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} Jours</span>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                                <div className="space-y-4">
                                    <h1 className="text-4xl md:text-7xl font-black leading-tight">
                                        Expérience : <br />
                                        {itinerary.country?.name || "Nouvelle Destination"}
                                    </h1>
                                    <p className="text-[#a3b1a3] text-lg max-w-2xl font-medium italic">
                                        Votre mission personnalisée à travers les merveilles du {itinerary.country?.name}. Reconnectez avec votre héritage.
                                    </p>
                                </div>

                                <div className="flex gap-4">
                                    <button className="bg-[#00ed64] text-black px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,237,100,0.4)] transition-all">
                                        <Share2 size={20} /> Partager
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Main Content */}
                    <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Left Column: Summary and Stats */}
                        <aside className="space-y-8">
                            {/* Map Widget */}
                            <div className="bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] p-4 group relative overflow-hidden aspect-video md:aspect-square flex items-center justify-center">
                                <img
                                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=400&fit=crop"
                                    className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all shadow-2xl"
                                />
                                <button className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl font-bold flex items-center gap-2 text-sm hover:bg-white/20">
                                    <MapIcon size={18} /> Voir la localisation
                                </button>
                            </div>

                            {/* Resume Card */}
                            <div className="bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] p-8 space-y-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold italic tracking-tight">Détails de la mission</h3>
                                    <TrendingUp className="text-[#00ed64]" size={20} />
                                </div>

                                <div className="space-y-6">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-[#a3b1a3] font-black uppercase tracking-widest text-[9px]">Budget</span>
                                        <span className="font-black text-lg text-[#00ed64]">{itinerary.budget || 1500} €</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-[#a3b1a3] font-black uppercase tracking-widest text-[9px]">Destination</span>
                                        <span className="font-black italic">{itinerary.country?.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-[#a3b1a3] font-black uppercase tracking-widest text-[9px]">Voyageurs</span>
                                        <span className="font-black">{itinerary.adults} Adultes {itinerary.children > 0 ? `• ${itinerary.children} Enfants` : ''}</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <div className="w-10 h-10 rounded-xl bg-[#00ed64]/10 flex items-center justify-center text-[#00ed64]">
                                            <LayoutGrid size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest">Précision IA</p>
                                            <div className="flex gap-1 mt-1">
                                                {[1, 2, 3, 4, 5].map(i => (
                                                    <div key={i} className={`h-1.5 w-6 rounded-full ${i <= 5 ? 'bg-[#00ed64]' : 'bg-white/10'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <span className="ml-auto text-xs font-black">10/10</span>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Right Column: Timeline */}
                        <div className="lg:col-span-2 space-y-12">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-black italic">Chronologie Aliniosié</h2>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#a3b1a3]">
                                    <Clock size={16} /> Rapport d'exploration généré
                                </div>
                            </div>

                            <div className="space-y-16">
                                {itinerary.details?.sort((a: any, b: any) => a.day - b.day).map((dayDetail: any, idx: number) => (
                                    <div key={idx} className="relative pl-12 group">
                                        {/* Timeline vertical bar */}
                                        {idx !== (itinerary.details?.length || 0) - 1 && (
                                            <div className="absolute left-[20px] top-10 bottom-[-4rem] w-[2px] bg-gradient-to-b from-[#00ed64] to-transparent" />
                                        )}

                                        {/* Day indicator */}
                                        <div className="absolute left-0 top-0 w-10 h-10 bg-[#00ed64] text-black flex items-center justify-center rounded-xl font-black shadow-[0_0_15px_rgba(0,237,100,0.3)] z-10 transition-transform group-hover:scale-110">
                                            {dayDetail.day}
                                        </div>

                                        <div className="space-y-8">
                                            <h3 className="text-2xl font-black italic tracking-tight">Journée {dayDetail.day} : {dayDetail.activities?.[0]?.activity?.city?.name || dayDetail.restaurants?.[0]?.restaurant?.city?.name || "Exploration"}</h3>

                                            <div className="space-y-6">
                                                {/* Activities */}
                                                {dayDetail.activities?.map((item: any, aIdx: number) => (
                                                    <div key={`act-${aIdx}`} className="bg-[#0c1a0c] border border-white/5 rounded-3xl p-6 flex flex-col md:flex-row gap-6 hover:border-[#00ed64]/30 transition-all group/card shadow-xl relative overflow-hidden">
                                                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ed64]/5 blur-3xl -z-0" />
                                                        <div className="flex md:flex-col items-center justify-between md:justify-start gap-4 shrink-0 relative z-10 text-center">
                                                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#a3b1a3] group-hover/card:text-[#00ed64] group-hover/card:scale-110 transition-all border border-white/5 font-black">
                                                                <Camera size={24} />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2 flex-1 relative z-10">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[9px] uppercase font-black tracking-[0.2em] text-[#00ed64] bg-[#00ed64]/10 px-2 py-0.5 rounded-md">Activité</span>
                                                                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{item.activity?.city?.name}</span>
                                                            </div>
                                                            <h4 className="text-xl font-bold italic tracking-tight">{item.activity?.name}</h4>
                                                            <p className="text-[#a3b1a3] text-sm leading-relaxed max-w-xl">{item.activity?.description}</p>
                                                        </div>
                                                        <button className="p-3 self-center md:self-start bg-white/5 rounded-xl hover:bg-[#00ed64]/20 transition-all border border-white/5">
                                                            <ChevronDown size={20} className="text-[#a3b1a3] group-hover/card:text-white" />
                                                        </button>
                                                    </div>
                                                ))}

                                                {/* Restaurants */}
                                                {dayDetail.restaurants?.map((item: any, rIdx: number) => (
                                                    <div key={`res-${rIdx}`} className="bg-[#0c1a0c]/40 border border-[#00ed64]/10 rounded-3xl p-6 flex flex-col md:flex-row gap-6 hover:border-[#00ed64]/50 transition-all group/card shadow-xl relative overflow-hidden">
                                                        <div className="flex md:flex-col items-center justify-between md:justify-start gap-4 shrink-0 relative z-10 text-center">
                                                            <div className="w-14 h-14 rounded-2xl bg-[#00ed64]/10 flex items-center justify-center text-[#00ed64] group-hover/card:scale-110 transition-all border border-[#00ed64]/20 font-black">
                                                                <Utensils size={24} />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2 flex-1 relative z-10">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[9px] uppercase font-black tracking-[0.2em] text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md">Gastronomie</span>
                                                                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{item.restaurant?.city?.name}</span>
                                                            </div>
                                                            <h4 className="text-xl font-bold italic tracking-tight">{item.restaurant?.name}</h4>
                                                            <p className="text-[#a3b1a3] text-sm leading-relaxed max-w-xl">{item.restaurant?.description}</p>
                                                        </div>
                                                        <button className="p-3 self-center md:self-start bg-white/5 rounded-xl hover:bg-amber-500/20 transition-all border border-white/5">
                                                            <ChevronDown size={20} className="text-[#a3b1a3] group-hover/card:text-white" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Call to action at the bottom of itinerary */}
                            <div className="bg-gradient-to-br from-[#0c1a0c] to-black border border-[#00ed64]/10 rounded-[3rem] p-12 flex flex-col items-center text-center space-y-8 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-[#00ed64] shadow-[0_0_30px_rgba(0,237,100,0.5)]" />
                                <div className="w-20 h-20 rounded-2xl bg-[#00ed64]/10 flex items-center justify-center border border-[#00ed64]/30">
                                    <Bus size={40} className="text-[#00ed64]" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-black italic uppercase tracking-widest">Le voyage commence ici</h3>
                                    <p className="text-[#a3b1a3] max-w-md font-medium text-lg italic">Votre itinéraire est gravé. Nos partenaires locaux sont prêts à transformer ces plans en souvenirs inoubliables.</p>
                                </div>
                                <button className="bg-[#00ed64] text-black px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] flex items-center gap-3 hover:shadow-[0_0_50px_rgba(0,237,100,0.4)] transition-all transform hover:scale-105 active:scale-95">
                                    RÉSERVER TOUTES LES ÉTAPES <ArrowRight size={22} strokeWidth={3} />
                                </button>
                            </div>
                        </div>
                    </main>
                </>
            )}
        </div>
    );
}
