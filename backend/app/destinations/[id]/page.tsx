"use client";

import Navbar from "@/app/components/Navbar";
import {
    Cloud,
    Banknote,
    MapPin,
    Clock,
    Languages,
    CheckCircle,
    Star,
    Plus,
    Share2,
    Heart,
    ArrowRight,
    ChevronRight,
    Info,
    Calendar,
    Users
} from "lucide-react";
import { useEffect, useState, use } from "react";
import Image from "next/image";

interface City {
    id: number;
    name: string;
    description: string;
}

interface Country {
    id: number;
    name: string;
    image: string;
    imageMap: string;
    description: string;
    currency: string;
    capital: string;
    isoCode: string;
    officialLanguages: string;
    population: string;
    bestPeriod: string;
    visaRequiredFR: boolean;
    cities: City[];
}

export default function DestinationDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [country, setCountry] = useState<Country | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("Aperçu");
    const [selectedPassport, setSelectedPassport] = useState("");

    const [visaResult, setVisaResult] = useState<{ status: string; info: string } | null>(null);
    const [visaLoading, setVisaLoading] = useState(false);

    // Normalisation des apostrophes typographiques en droites
    const normalize = (str: string) => str.replace(/’/g, "'");

    // Effet pour appeler l'API de visa quand le passeport change
    useEffect(() => {
        const fetchVisa = async () => {
            if (!selectedPassport || !country) {
                setVisaResult(null);
                return;
            }

            setVisaLoading(true);
            try {
                // Logique CEDEAO conservée pour la clarté "Libre circulation"
                const cedeaoMembers = [
                    "Bénin", "Burkina Faso", "Cabo Verde", "Côte d'Ivoire",
                    "Gambie", "Ghana", "Guinée", "Guinée-Bissau", "Libéria",
                    "Mali", "Mauritanie", "Niger", "Nigeria", "Sénégal", "Sierra Leone", "Togo"
                ];

                if (cedeaoMembers.includes(normalize(selectedPassport)) && cedeaoMembers.includes(normalize(country.name))) {
                    setVisaResult({ status: "libre", info: "Libre circulation CEDEAO : accès sans visa entre les pays membres. Durée variable selon l'accord bilatéral." });
                    setVisaLoading(false);
                    return;
                }

                const res = await fetch(`/api/visa-check?passport=${encodeURIComponent(selectedPassport)}&destination=${encodeURIComponent(country.name)}`);
                const data = await res.json();

                if (data.error) {
                    setVisaResult({ status: "inconnu", info: "Données indisponibles pour le moment." });
                } else {
                    setVisaResult({ status: data.status, info: data.info });
                }
            } catch (err) {
                setVisaResult({ status: "inconnu", info: "Erreur lors de la vérification du visa." });
            } finally {
                setVisaLoading(false);
            }
        };

        fetchVisa();
    }, [selectedPassport, country]);

    // Génère un emoji drapeau depuis un code ISO 2 lettres (ex: "FR" -> "🇫🇷")
    const flagFromISO = (iso: string) =>
        String.fromCodePoint(...[...iso.toUpperCase()].map(c => c.charCodeAt(0) + 0x1F1A5));

    const countryISO: Record<string, string> = {
        // Europe / Amérique
        "France": "FR", "Belgique": "BE", "Canada": "CA",
        "Royaume-Uni": "GB", "Suisse": "CH", "États-Unis": "US",
        // Afrique
        "Afrique du Sud": "ZA", "Algérie": "DZ", "Angola": "AO",
        "Bénin": "BJ", "Botswana": "BW", "Burkina Faso": "BF",
        "Burundi": "BI", "Cabo Verde": "CV", "Cameroun": "CM",
        "Centrafrique": "CF", "Comores": "KM", "Congo (Brazzaville)": "CG",
        "Congo (RDC)": "CD", "Côte d'Ivoire": "CI", "Djibouti": "DJ",
        "Égypte": "EG", "Érythrée": "ER", "Eswatini": "SZ",
        "Éthiopie": "ET", "Gabon": "GA", "Gambie": "GM",
        "Ghana": "GH", "Guinée": "GN", "Guinée-Bissau": "GW",
        "Guinée équatoriale": "GQ", "Kenya": "KE", "Lesotho": "LS",
        "Libéria": "LR", "Libye": "LY", "Madagascar": "MG",
        "Malawi": "MW", "Mali": "ML", "Maroc": "MA",
        "Maurice": "MU", "Mauritanie": "MR", "Mozambique": "MZ",
        "Namibie": "NA", "Niger": "NE", "Nigeria": "NG",
        "Ouganda": "UG", "Rwanda": "RW", "São Tomé-et-Príncipe": "ST",
        "Sénégal": "SN", "Seychelles": "SC", "Sierra Leone": "SL",
        "Somalie": "SO", "Soudan": "SD", "Soudan du Sud": "SS",
        "Tanzanie": "TZ", "Tchad": "TD", "Togo": "TG",
        "Tunisie": "TN", "Zambie": "ZM", "Zimbabwe": "ZW",
    };
    const getFlag = (name: string) => countryISO[name] ? flagFromISO(countryISO[name]) : "";

    const passportGroups: Record<string, string[]> = {
        "🇪🇺 Europe": ["Belgique", "France", "Royaume-Uni", "Suisse"],
        "🇺🇸 Amérique du Nord": ["Canada", "États-Unis"],
        "🌍 Afrique du Nord": ["Algérie", "Égypte", "Libye", "Maroc", "Mauritanie", "Tunisie"],
        "🌍 Afrique de l'Ouest": ["Bénin", "Burkina Faso", "Cabo Verde", "Côte d'Ivoire", "Gambie", "Ghana", "Guinée", "Guinée-Bissau", "Guinée équatoriale", "Libéria", "Mali", "Niger", "Nigeria", "Sénégal", "Sierra Leone", "Togo"],
        "🌍 Afrique Centrale": ["Cameroun", "Centrafrique", "Congo (Brazzaville)", "Congo (RDC)", "Djibouti", "Gabon", "São Tomé-et-Príncipe", "Tchad"],
        "🌍 Afrique de l'Est": ["Burundi", "Comores", "Érythrée", "Éthiopie", "Kenya", "Madagascar", "Malawi", "Maurice", "Mozambique", "Ouganda", "Rwanda", "Seychelles", "Somalie", "Soudan", "Soudan du Sud", "Tanzanie"],
        "🌍 Afrique Australe": ["Afrique du Sud", "Angola", "Botswana", "Eswatini", "Lesotho", "Namibie", "Zambie", "Zimbabwe"],
    };


    const statusConfig = {
        libre: { color: "text-[#00ed64]", bg: "bg-[#00ed64]/10 border-[#00ed64]/20", label: "Sans visa ✅", icon: "✅" },
        evisa: { color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20", label: "eVisa disponible 🌐", icon: "🌐" },
        visa: { color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/20", label: "Visa requis 📋", icon: "📋" },
        libéral: { color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20", label: "Conditions spéciales ⚠️", icon: "⚠️" },
        inconnu: { color: "text-[#a3b1a3]", bg: "bg-white/5 border-white/10", label: "Non répertorié ❓", icon: "❓" },
    };
    const tabs = [
        { label: "Aperçu", anchor: "apercu" },
        { label: "Villes", anchor: "villes" },
        { label: "Conseils", anchor: "conseils" },
    ];

    const scrollToSection = (anchor: string, label: string) => {
        setActiveTab(label);
    };

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await fetch(`/api/countries/${id}`);
                const data = await response.json();
                if (data.error) {
                    console.error(data.error);
                } else {
                    setCountry(data);
                }
            } catch (error) {
                console.error("Erreur chargement pays:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCountry();
    }, [id]);

    if (loading) {
        return (
            <div className="bg-[#050f05] min-h-screen text-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#00ed64] border-t-transparent rounded-full animate-spin" />
                    <p className="font-bold animate-pulse">Chargement de l'aventure...</p>
                </div>
            </div>
        );
    }

    if (!country) {
        return (
            <div className="bg-[#050f05] min-h-screen text-white flex items-center justify-center">
                <p>Destination introuvable.</p>
            </div>
        );
    }

    return (
        <div className="bg-[#050f05] min-h-screen text-white font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden py-20">
                <img
                    src={country.image || "https://images.unsplash.com/photo-1596701062351-be4f6a45559c?q=80&w=2000"}
                    alt={country.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050f05] via-[#050f05]/40 to-black/30" />

                <div className="relative z-10 text-center space-y-6 max-w-4xl px-4 mt-20">
                    <div className="inline-flex items-center gap-2 bg-[#00ed64] text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                        <span className="w-2 h-2 bg-black rounded-full animate-pulse" /> {country.name}
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-[1.1]">
                        {country.name} : {country.capital} et au-delà
                    </h1>
                    <p className="text-[#a3b1a3] text-base md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                        {country.description}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
                        <button className="bg-[#00ed64] text-black px-10 py-5 rounded-2xl font-black text-lg flex items-center gap-3 hover:shadow-[0_0_30px_rgba(0,237,100,0.4)] transition-all hover:scale-105 active:scale-95">
                            Sauvegarder l'itinéraire <Plus size={22} strokeWidth={3} />
                        </button>
                        <button className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-5 rounded-2xl font-black text-lg flex items-center gap-3 hover:bg-white/20 transition-all">
                            <Share2 size={22} /> Partager
                        </button>
                    </div>
                </div>
            </section>

            {/* Content Body */}
            <main className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 pb-20 pt-12">

                {/* Quick Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 relative z-20">
                    {[
                        { icon: <Cloud size={24} />, label: "Météo", value: "28°C", sub: "Climat tropical" },
                        { icon: <Banknote size={24} />, label: "Devise", value: country.currency, sub: `Code: ${country.currency}` },
                        { icon: <Calendar size={24} />, label: "Meilleure Période", value: country.bestPeriod, sub: "Saison recommandée" },
                        { icon: <Users size={24} />, label: "Population", value: country.population, sub: "Estimation" },
                    ].map((info, idx) => (
                        <div key={idx} className="bg-[#0c1a0c] border border-white/5 rounded-[2rem] p-8 space-y-4 hover:border-[#00ed64]/30 transition-all">
                            <div className="text-[#00ed64]">{info.icon}</div>
                            <div>
                                <p className="text-[10px] uppercase font-bold tracking-widest text-[#a3b1a3] mb-1">{info.label}</p>
                                <p className="text-xl font-bold">{info.value}</p>
                                <p className="text-xs text-[#a3b1a3]">{info.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Narrative */}
                    <div className="lg:col-span-2 space-y-16">

                        {/* Visa Section - Vérificateur interactif */}
                        <div className="bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] p-8 md:p-10 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[#00ed64]/10 flex items-center justify-center shrink-0">
                                    <Info size={22} className="text-[#00ed64]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black">Formalités de Visa</h3>
                                    <p className="text-[#a3b1a3] text-sm">Sélectionnez votre passeport pour connaître les conditions d'entrée.</p>
                                </div>
                            </div>

                            <select
                                value={selectedPassport}
                                onChange={(e) => setSelectedPassport(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-sm text-white focus:outline-none focus:border-[#00ed64]/50 transition-all appearance-none cursor-pointer"
                            >
                                <option value="" disabled>🌍 Choisissez votre passeport...</option>
                                {Object.entries(passportGroups).map(([group, countries]) => {
                                    // Filtrer pour ne pas afficher le pays de destination comme passeport
                                    const filteredCountries = countries.filter(p => !country || normalize(p) !== normalize(country.name));
                                    if (filteredCountries.length === 0) return null; // Ne pas afficher un groupe vide

                                    return (
                                        <optgroup key={group} label={group}>
                                            {filteredCountries.map((p) => (
                                                <option key={p} value={p} className="bg-[#0c1a0c]">
                                                    {getFlag(p)} {p}
                                                </option>
                                            ))}
                                        </optgroup>
                                    );
                                })}
                            </select>

                            {/* Résultat */}
                            {/* Loader ou Résultat */}
                            {selectedPassport && (
                                visaLoading ? (
                                    <div className="rounded-2xl border border-white/10 p-5 flex items-center justify-center gap-3">
                                        <div className="w-5 h-5 border-2 border-[#00ed64] border-t-transparent rounded-full animate-spin" />
                                        <span className="text-sm font-bold text-[#a3b1a3] animate-pulse">Vérification dans la base internationale...</span>
                                    </div>
                                ) : visaResult && (() => {
                                    const cfg: any = {
                                        libre: { color: "text-[#00ed64]", bg: "bg-[#00ed64]/10 border-[#00ed64]/20", label: "Accès favorisé", icon: "✅" },
                                        evisa: { color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20", label: "eVisa disponible", icon: "🌐" },
                                        visa: { color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/20", label: "Visa obligatoire", icon: "📋" },
                                        visa_arrivee: { color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20", label: "Visa à l'arrivée", icon: "🛬" },
                                        inconnu: { color: "text-[#a3b1a3]", bg: "bg-white/5 border-white/10", label: "Non répertorié", icon: "❓" },
                                    };
                                    const s = cfg[visaResult.status] ?? cfg.inconnu;
                                    return (
                                        <div className={`rounded-2xl border p-5 flex items-start gap-4 animate-in fade-in duration-300 ${s.bg}`}>
                                            <span className="text-2xl mt-0.5">{s.icon}</span>
                                            <div className="space-y-1">
                                                <p className={`font-black text-sm ${s.color}`}>{s.label}</p>
                                                <p className="text-xs text-[#a3b1a3] leading-relaxed">{visaResult.info}</p>
                                            </div>
                                        </div>
                                    );
                                })()
                            )}

                            <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest">
                                * Données indicatives. Vérifiez toujours auprès de l'ambassade officielle avant votre voyage.
                            </p>
                        </div>

                        <nav className="flex gap-10 border-b border-white/5 pb-4">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.label}
                                    onClick={() => scrollToSection(tab.anchor, tab.label)}
                                    className={`text-sm font-bold transition-colors pb-1 border-b-2 -mb-[1px] ${activeTab === tab.label
                                        ? 'text-[#00ed64] border-[#00ed64]'
                                        : 'text-[#a3b1a3] border-transparent hover:text-white'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>

                        {/* Tab Content */}
                        {activeTab === "Aperçu" && (
                            <section className="space-y-8 animate-in fade-in duration-300">
                                <h2 className="text-3xl font-black">L'authenticité du {country.name}</h2>
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="flex-1 space-y-6 text-[#a3b1a3] text-lg leading-relaxed">
                                        <p>
                                            Découvrez {country.name}, une destination où chaque coin de rue raconte une histoire millénaire. De sa capitale {country.capital} aux régions plus reculées, laissez-vous porter par l'hospitalité légendaire et la richesse culturelle unique de ce pays.
                                        </p>
                                        <p>
                                            Les langues officielles sont le {country.officialLanguages}. Préparez-vous à une immersion totale au cœur de l'Afrique vibrante.
                                        </p>
                                        <button className="flex items-center gap-2 text-[#00ed64] font-bold group">
                                            En savoir plus sur les traditions <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                    <div className="w-full md:w-64 space-y-4">
                                        <div className="relative rounded-3xl overflow-hidden aspect-[4/5] group">
                                            <img
                                                src={country.imageMap || country.image}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/40" />
                                            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-[#00ed64]">Géographie</p>
                                                <p className="font-bold">Cartographie Dorée</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {activeTab === "Villes" && (
                            <section className="space-y-8 animate-in fade-in duration-300">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-3xl font-black">Villes à Explorer</h2>
                                    <p className="text-[#a3b1a3] text-sm">Cliquez sur une ville pour explorer ses activités</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {country.cities.length > 0 ? country.cities.map((city, idx) => (
                                        <a key={idx} href={`/villes/${city.id}`} className="bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-[#00ed64]/30 transition-all cursor-pointer">
                                            <div className="h-48 relative overflow-hidden bg-white/5 flex items-center justify-center">
                                                <MapPin size={48} className="text-[#00ed64]/20" />
                                                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/10">
                                                    <Star size={12} fill="#00ed64" className="text-[#00ed64]" />
                                                    <span className="text-xs font-bold">4.{idx + 7}</span>
                                                </div>
                                                {/* Hover Overlay */}
                                                <div className="absolute inset-0 bg-[#00ed64]/0 group-hover:bg-[#00ed64]/10 transition-all flex items-center justify-center">
                                                    <span className="opacity-0 group-hover:opacity-100 transition-all bg-[#00ed64] text-black text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full">
                                                        Explorer →
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <h4 className="text-lg font-bold group-hover:text-[#00ed64] transition-colors">{city.name}</h4>
                                                <p className="text-[#a3b1a3] text-sm mb-4">Destination Phare</p>
                                                <p className="text-xs text-[#a3b1a3] leading-relaxed line-clamp-2">{city.description}</p>
                                            </div>
                                        </a>
                                    )) : (
                                        <p className="text-[#a3b1a3] italic">Bientôt d'autres villes...</p>
                                    )}
                                </div>
                            </section>
                        )}

                        {activeTab === "Conseils" && (
                            <section className="space-y-8 animate-in fade-in duration-300">
                                <h2 className="text-3xl font-black">Conseils de la communauté</h2>
                                <div className="space-y-6">
                                    {[
                                        { name: "Amadou M.", origin: "Voyageur", avatar: "A", text: `Le ${country.name} est ma destination préférée sur le continent !` },
                                        { name: "Sonia P.", origin: "Exploratrice", avatar: "S", text: `Ne manquez pas les marchés artisanaux de ${country.capital}.` },
                                        { name: "Kofi A.", origin: "Globe-trotteur", avatar: "K", text: `Goûtez absolument la cuisine locale, chaque région a ses spécialités uniques.` },
                                    ].map((review, idx) => (
                                        <div key={idx} className="bg-[#0c1a0c] border border-white/5 rounded-[2rem] p-6 space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold">
                                                    {review.avatar}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold">{review.name}</p>
                                                    <p className="text-[10px] text-[#a3b1a3] uppercase font-bold tracking-widest">{review.origin}</p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-[#a3b1a3] leading-relaxed italic">"{review.text}"</p>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full py-4 rounded-2xl border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all">
                                    + Ajouter un conseil
                                </button>
                            </section>
                        )}
                    </div>

                    {/* Right Column: Interaction */}
                    <div className="space-y-8">
                        {/* Visual Map Preview */}
                        <div className="bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] overflow-hidden aspect-square relative group">
                            <img
                                src={country.imageMap || "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=400&fit=crop"}
                                className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-[#00ed64] rounded-full animate-ping opacity-20 absolute" />
                                    <div className="w-12 h-12 bg-[#00ed64] rounded-full flex items-center justify-center border-4 border-[#0c1a0c] relative z-10">
                                        <MapPin size={24} className="text-black" />
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10">
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#00ed64] mb-1">Explorer interactivement</p>
                                <p className="text-sm font-bold">Ouvrir la carte du {country.name}</p>
                            </div>
                        </div>

                        {/* Reviews Card */}
                        <div id="conseils" className="bg-[#0c1a0c] border border-white/5 rounded-[3rem] p-10 space-y-8 scroll-mt-32">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-black">Communauté</h3>
                                <span className="text-[#00ed64] text-sm font-bold">Voir tout</span>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { name: "Amadou M.", origin: "Voyageur", avatar: "A", text: `Le ${country.name} est ma destination préférée sur le continent !` },
                                    { name: "Sonia P.", origin: "Exploratrice", avatar: "S", text: `Ne manquez pas les marchés artisanaux de ${country.capital}.` }
                                ].map((review, idx) => (
                                    <div key={idx} className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold">
                                                {review.avatar}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold">{review.name}</p>
                                                <p className="text-[10px] text-[#a3b1a3] uppercase font-bold tracking-widest">{review.origin}</p>
                                            </div>
                                        </div>
                                        <p className="text-xs text-[#a3b1a3] leading-relaxed italic">"{review.text}"</p>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full py-4 rounded-2xl border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all">
                                + Ajouter un conseil
                            </button>
                        </div>

                        {/* Promo Card Inspired by design */}
                        <div className="bg-gradient-to-br from-[#00ed64] to-[#008f3c] rounded-[3rem] p-10 text-black space-y-6">
                            <div className="w-14 h-14 bg-black/10 rounded-2xl flex items-center justify-center">
                                <ArrowRight size={28} />
                            </div>
                            <h3 className="text-2xl font-black leading-tight">Prêt pour le {country.name} ?</h3>
                            <p className="text-black/70 font-bold">Générez votre itinéraire optimisé en moins de 30 secondes.</p>
                            <button className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all">
                                C'est parti
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer simple for the page */}
            <footer className="border-t border-white/5 py-12 px-6 bg-[#0c1a0c]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-[#00ed64] rounded flex items-center justify-center">
                            <MapPin size={14} className="text-black" />
                        </div>
                        <span className="font-bold">Sankofa Diaspora © 2026</span>
                    </div>
                    <div className="flex gap-8 text-xs font-bold text-[#a3b1a3] uppercase tracking-widest">
                        <a href="#" className="hover:text-white transition-colors">À propos</a>
                        <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
                        <a href="#" className="hover:text-white transition-colors">Conditions</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
