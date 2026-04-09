"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { ArrowLeft, Clock, MapPin, Mountain, Star, Calendar, Banknote, Share2, Heart } from "lucide-react";

interface Activity {
    id: number;
    name: string;
    description: string;
    price: number;
    openingHours: string;
    category: string;
    address: string;
    image?: string;
    neighborhood?: string;
    terrainLogic?: string;
    city: {
        id: number;
        name: string;
        country: {
            name: string;
            currency: string;
        }
    };
}

export default function ActivityDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [activity, setActivity] = useState<Activity | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const res = await fetch(`/api/activities/${id}`);
                const data = await res.json();
                if (!data.error) setActivity(data);
            } catch (e) {
                console.error("Erreur:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchActivity();
    }, [id]);

    if (loading) {
        return (
            <div className="bg-[#050f05] min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#00ed64] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!activity) {
        return (
            <div className="bg-[#050f05] min-h-screen text-white flex flex-col items-center justify-center space-y-4">
                <Mountain size={48} className="text-white/20" />
                <p>Activité introuvable.</p>
                <button onClick={() => router.back()} className="text-[#00ed64] hover:underline">Retour</button>
            </div>
        );
    }

    return (
        <div className="bg-[#050f05] min-h-screen text-white font-sans">
            <Navbar />

            {/* Hero Image */}
            <div className="relative w-full h-[60vh] mt-20">
                {activity.image ? (
                    <img src={activity.image} alt={activity.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-[#0c1a0c] flex items-center justify-center">
                        <Mountain size={64} className="text-[#00ed64]/20" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050f05] via-[#050f05]/50 to-transparent" />
                
                {/* Back Button */}
                <button 
                    onClick={() => router.back()}
                    className="absolute top-8 left-6 md:left-12 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-[#00ed64] hover:text-black transition-all text-sm font-bold border border-white/10"
                >
                    <ArrowLeft size={16} /> Retour
                </button>

                <div className="absolute top-8 right-6 md:right-12 flex items-center gap-3">
                    <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#00ed64] hover:text-black hover:border-transparent transition-all">
                        <Share2 size={16} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-pink-500 hover:text-white hover:border-transparent transition-all">
                        <Heart size={16} />
                    </button>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 md:px-12 pb-32 -mt-32 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left content */}
                    <div className="lg:col-span-8 space-y-8">
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-[#00ed64]/10 text-[#00ed64] rounded-full text-[10px] font-black uppercase tracking-widest border border-[#00ed64]/20">
                                    {activity.category}
                                </span>
                                {activity.city?.name && (
                                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#a3b1a3]">
                                        <MapPin size={12} /> {activity.city.name}{activity.city.country?.name ? `, ${activity.city.country.name}` : ''}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                                {activity.name}
                            </h1>
                            <p className="text-lg text-[#a3b1a3] leading-relaxed">
                                {activity.description}
                            </p>
                        </div>

                        {/* Info boxes */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-[#0c1a0c] border border-white/5 rounded-3xl p-6 space-y-2">
                                <Clock className="text-[#00ed64]" size={24} />
                                <p className="text-[10px] uppercase font-black tracking-widest text-[#a3b1a3]">Horaires</p>
                                <p className="font-bold">{activity.openingHours || 'Non spécifié'}</p>
                            </div>
                            <div className="bg-[#0c1a0c] border border-white/5 rounded-3xl p-6 space-y-2">
                                <MapPin className="text-[#00ed64]" size={24} />
                                <p className="text-[10px] uppercase font-black tracking-widest text-[#a3b1a3]">Quartier</p>
                                <p className="font-bold">{activity.neighborhood || 'Non spécifié'}</p>
                            </div>
                            <div className="col-span-2 md:col-span-1 bg-[#0c1a0c] border border-white/5 rounded-3xl p-6 space-y-2">
                                <Star className="text-[#00ed64]" size={24} />
                                <p className="text-[10px] uppercase font-black tracking-widest text-[#a3b1a3]">Avis (4.5/5)</p>
                                <p className="font-bold">128 témoignages</p>
                            </div>
                        </div>


                        {activity.terrainLogic && (
                            <div className="bg-[#00ed64]/5 border border-[#00ed64]/20 rounded-3xl p-8 italic text-[#a3b1a3] leading-relaxed">
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#00ed64] not-italic mb-2">Logique de terrain</p>
                                "{activity.terrainLogic}"
                            </div>
                        )}
                        
                        <div className="space-y-4">
                            <h3 className="text-2xl font-black">Adresse</h3>
                            <div className="bg-[#0c1a0c] border border-white/5 rounded-3xl p-6 flex items-center justify-between">
                                <span className="font-bold">{activity.address || 'Adresse exacte sur réservation'}</span>
                                <button className="text-[10px] font-black uppercase tracking-widest text-[#00ed64] hover:underline">Voir sur la carte</button>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel / Booking */}
                    <div className="lg:col-span-4">
                        <div className="bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] p-8 sticky top-32 space-y-8">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#a3b1a3] mb-2">À partir de</p>
                                <div className="flex items-end gap-2">
                                    <span className="text-4xl font-black">{activity.price.toLocaleString()}</span>
                                    <span className="text-sm font-bold text-[#00ed64] uppercase mb-1">CFA / Personne</span>
                                </div>
                            </div>
                            
                            <hr className="border-white/5" />

                            <div className="space-y-4">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-[#a3b1a3]">Date prévue</label>
                                <div className="relative">
                                    <input type="date" className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:border-[#00ed64] [color-scheme:dark]" />
                                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={18} />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-[#a3b1a3]">Participants</label>
                                <div className="flex items-center justify-between bg-white/5 border border-white/5 rounded-2xl p-4">
                                    <span className="font-bold text-sm">Adultes</span>
                                    <div className="flex items-center gap-4">
                                        <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-black">-</button>
                                        <span className="font-bold">2</span>
                                        <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-black">+</button>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full bg-[#00ed64] text-black py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:shadow-[0_0_30px_rgba(0,237,100,0.4)] transition-all hover:scale-[1.02] active:scale-95">
                                Réserver mon créneau
                            </button>
                            
                            <p className="text-[10px] text-center text-white/40 font-medium pt-2">
                                Vous ne serez pas débité avant confirmation.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
