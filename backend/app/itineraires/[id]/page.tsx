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
    const timelineSteps = [
        {
            day: 1,
            title: "Arrivée à Dakar & Île de Gorée",
            activities: [
                {
                    time: "09:00",
                    title: "Arrivée Aéroport AIBD",
                    type: "Transport",
                    desc: "Accueil par votre guide local, transfert vers le centre de Dakar en véhicule climatisé.",
                    icon: <Bus size={18} />
                },
                {
                    time: "14:00",
                    title: "Visite de l'Île de Gorée",
                    type: "Culture",
                    desc: "Traversée en chaloupe pour visiter la Maison des Esclaves et flâner dans les ruelles colorées.",
                    icon: <Camera size={18} />
                }
            ]
        },
        {
            day: 2,
            title: "Dakar Panoramique & Départ Nord",
            activities: [
                {
                    time: "10:00",
                    title: "Monument de la Renaissance",
                    type: "Visite",
                    desc: "Vue imprenable sur la presqu'île du Cap-Vert depuis le plus haut monument d'Afrique.",
                    icon: <Camera size={18} />
                }
            ]
        }
    ];

    return (
        <div className="bg-[#050f05] min-h-screen text-white font-sans">
            <Navbar />

            {/* Header Info Banner */}
            <section className="relative h-[60vh] flex flex-col justify-end pb-12 px-6 md:px-12">
                <img
                    src="https://images.unsplash.com/photo-1596701062351-be4f6a45559c?q=80&w=2000&auto=format&fit=crop"
                    alt="Senegal Coast"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050f05] via-[#050f05]/60 to-black/20" />

                <div className="relative z-10 max-w-7xl mx-auto w-full space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="bg-[#00ed64] text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Aventure</span>
                        <span className="text-white/60 text-xs font-medium">Départ 12 Sept - 7 Jours</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-7xl font-black leading-tight">
                                Immersion Culturelle : <br />
                                Dakar à Saint-Louis
                            </h1>
                            <p className="text-[#a3b1a3] text-lg max-w-2xl font-medium">
                                Une traversée authentique du Sénégal, des marchés vibrants de Dakar aux dunes désertiques de Lompoul.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <button className="bg-[#00ed64] text-black px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,237,100,0.4)] transition-all">
                                <Pencil size={20} /> Modifier
                            </button>
                            <button className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-white/20 transition-all border border-white/10">
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
                            className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all"
                        />
                        <button className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl font-bold flex items-center gap-2 text-sm hover:bg-white/20">
                            <MapIcon size={18} /> Voir la carte
                        </button>
                    </div>

                    {/* Resume Card */}
                    <div className="bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] p-8 space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold">Résumé du voyage</h3>
                            <TrendingUp className="text-[#00ed64]" size={20} />
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#a3b1a3] font-medium uppercase tracking-widest text-[10px]">Coût Estimé</span>
                                <span className="font-bold text-lg text-[#00ed64]">1,200 €</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#a3b1a3] font-medium uppercase tracking-widest text-[10px]">Hébergement</span>
                                <span className="font-bold">6 Nuits</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#a3b1a3] font-medium uppercase tracking-widest text-[10px]">Transport</span>
                                <span className="font-bold">Mixte (Privé/Local)</span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/5">
                            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                                <div className="w-10 h-10 rounded-xl bg-[#00ed64]/10 flex items-center justify-center text-[#00ed64]">
                                    <LayoutGrid size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold">Score Authenticité</p>
                                    <div className="flex gap-1 mt-1">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <div key={i} className={`h-1 w-6 rounded-full ${i <= 4 ? 'bg-[#00ed64]' : 'bg-white/10'}`} />
                                        ))}
                                    </div>
                                </div>
                                <span className="ml-auto text-xs font-black">9/10</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Right Column: Timeline */}
                <div className="lg:col-span-2 space-y-12">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-black">Votre Itinéraire</h2>
                        <div className="flex items-center gap-2 text-xs font-bold text-[#a3b1a3]">
                            <Clock size={16} /> Durée Totale: 168h
                        </div>
                    </div>

                    <div className="space-y-16">
                        {timelineSteps.map((step, idx) => (
                            <div key={idx} className="relative pl-12 group">
                                {/* Timeline vertical bar */}
                                {idx !== timelineSteps.length - 1 && (
                                    <div className="absolute left-[20px] top-10 bottom-[-4rem] w-[2px] bg-gradient-to-b from-[#00ed64] to-transparent" />
                                )}

                                {/* Day indicator */}
                                <div className="absolute left-0 top-0 w-10 h-10 bg-[#00ed64] text-black flex items-center justify-center rounded-xl font-black shadow-[0_0_15px_rgba(0,237,100,0.3)] z-10 transition-transform group-hover:scale-110">
                                    {step.day}
                                </div>

                                <div className="space-y-8">
                                    <h3 className="text-2xl font-bold">{step.title}</h3>

                                    <div className="space-y-6">
                                        {step.activities.map((activity, aIdx) => (
                                            <div key={aIdx} className="bg-[#0c1a0c] border border-white/5 rounded-3xl p-6 flex flex-col md:flex-row gap-6 hover:border-[#00ed64]/30 transition-all group/card">
                                                <div className="flex md:flex-col items-center justify-between md:justify-start gap-4 shrink-0">
                                                    <span className="text-xl font-black text-white">{activity.time}</span>
                                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#a3b1a3] group-hover/card:text-[#00ed64] transition-colors">
                                                        {activity.icon}
                                                    </div>
                                                </div>
                                                <div className="space-y-2 flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] uppercase font-black tracking-widest text-[#00ed64] opacity-70">{activity.type}</span>
                                                    </div>
                                                    <h4 className="text-lg font-bold">{activity.title}</h4>
                                                    <p className="text-[#a3b1a3] text-sm leading-relaxed">{activity.desc}</p>
                                                </div>
                                                <button className="p-3 self-center md:self-start opacity-0 group-hover/card:opacity-100 transition-opacity">
                                                    <ChevronDown size={20} className="text-[#a3b1a3] hover:text-white" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Call to action at the bottom of itinerary */}
                    <div className="bg-[#0c1a0c] border border-[#00ed64]/10 rounded-[3rem] p-10 flex flex-col items-center text-center space-y-6">
                        <div className="w-16 h-16 rounded-full bg-[#00ed64]/10 flex items-center justify-center">
                            <Hotel size={30} className="text-[#00ed64]" />
                        </div>
                        <h3 className="text-2xl font-bold">Le voyage ne s'arrête pas là</h3>
                        <p className="text-[#a3b1a3] max-w-lg">Vous pouvez maintenant réserver vos hébergements ou contacter un guide local pour valider cet itinéraire.</p>
                        <button className="bg-white text-black px-10 py-5 rounded-2xl font-black flex items-center gap-3 hover:bg-[#00ed64] transition-all">
                            Réserver les étapes <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
