"use client";

import Navbar from "@/app/components/Navbar";
import {
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
    Building2,
    Info,
    Calendar,
    Users,
    Sun,
    CloudRain,
    Thermometer,
    ShieldCheck,
    AlertTriangle,
    ExternalLink,
    Activity,
    Smartphone,
    Wallet,
    Bus,
    Plane,
    CheckSquare,
    Download,
    Map,
    Umbrella,
    PlaneLanding,
    MoveRight,
    ShieldAlert
} from "lucide-react";
import { useEffect, useState, use } from "react";
import Image from "next/image";

interface City {
    id: number;
    name: string;
    description: string;
    activities?: any[];
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
    const [travelDest, setTravelDest] = useState("centre");
    const [budgetProfile, setBudgetProfile] = useState("eco");
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showConverter, setShowConverter] = useState(false);
    const [cfaInput, setCfaInput] = useState("10000");
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const [currentWeather, setCurrentWeather] = useState<{ temp: number, condition: string, code: number } | null>(null);

    const [visaResult, setVisaResult] = useState<{ status: string; info: string } | null>(null);
    const [visaLoading, setVisaLoading] = useState(false);
    const [localTime, setLocalTime] = useState("");
    const [timeDiff, setTimeDiff] = useState("");

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

    // Effet pour l'heure locale et décalage
    useEffect(() => {
        const updateClock = () => {
            if (!country) return;

            // Mapping simplifié des offsets (CI/Sénégal = 0, Cameroun = 1, RSA = 2, etc.)
            const offsets: Record<string, number> = {
                "Côte d'Ivoire": 0, "Sénégal": 0, "Mali": 0, "Guinée": 0, "Burkina Faso": 0,
                "Ghana": 0, "Togo": 0, "Bénin": 1, "Nigeria": 1, "Cameroun": 1, "Gabon": 1,
                "Afrique du Sud": 2, "Kenya": 3, "Égypte": 2, "Maroc": 1
            };

            const targetOffset = offsets[country.name] ?? 0;
            const now = new Date();

            // Heure locale à destination
            const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
            const destTime = new Date(utc + (3600000 * targetOffset));
            setLocalTime(destTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

            // Décalage relatif
            const userOffset = -now.getTimezoneOffset() / 60;
            const diff = targetOffset - userOffset;
            setTimeDiff(diff === 0 ? "Pas de décalage" : `${diff > 0 ? '+' : ''}${diff}h vs vous`);
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, [country]);

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

    const tabs = [
        { label: "Aperçu", anchor: "apercu" },
        { label: "Préparer", anchor: "preparer" },
        { label: "Climat", anchor: "climat" },
        { label: "Villes", anchor: "villes" },
    ];

    const scrollToSection = (anchor: string, label: string) => {
        setActiveTab(label);
    };

    const climateData = [
        { month: "Jan", temp: 24, condition: "Sun", rain: 5 },
        { month: "Fév", temp: 25, condition: "Sun", rain: 5 },
        { month: "Mar", temp: 27, condition: "Sun", rain: 10 },
        { month: "Avr", temp: 29, condition: "Sun", rain: 15 },
        { month: "Mai", temp: 31, condition: "Cloud", rain: 20 },
        { month: "Juin", temp: 32, condition: "CloudRain", rain: 45 },
        { month: "Juil", temp: 30, condition: "CloudRain", rain: 80 },
        { month: "Août", temp: 29, condition: "CloudRain", rain: 85 },
        { month: "Sep", temp: 30, condition: "CloudRain", rain: 50 },
        { month: "Oct", temp: 31, condition: "Sun", rain: 20 },
        { month: "Nov", temp: 28, condition: "Sun", rain: 10 },
        { month: "Déc", temp: 25, condition: "Sun", rain: 5 },
    ];

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await fetch(`/api/countries/${id}?t=${Date.now()}`);
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

    useEffect(() => {
        if (!country?.capital) return;

        const fetchWeather = async () => {
            try {
                const res = await fetch(`/api/weather?city=${encodeURIComponent(country.capital)}`);
                const data = await res.json();
                if (!data.error) {
                    setCurrentWeather(data);
                }
            } catch (error) {
                console.error("Erreur chargement météo:", error);
            }
        };
        fetchWeather();
    }, [country]);

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
                        { icon: <Thermometer size={24} />, label: "Actuel", value: "28°C", sub: "Ciel dégagé" },
                        { icon: <Banknote size={24} />, label: "Devise", value: country.currency, sub: `Code: ${country.currency}` },
                        { icon: <Calendar size={24} />, label: "Meilleure Période", value: country.bestPeriod, sub: "Saison recommandée" },
                        { icon: <Clock size={24} />, label: "Heure Locale", value: localTime || "--:--", sub: timeDiff || "Calcul..." },
                    ].map((info, idx) => (
                        <div key={idx} className="bg-[#0c1a0c] border border-white/5 rounded-[2rem] p-8 space-y-4 hover:border-[#00ed64]/30 transition-all cursor-pointer" onClick={() => info.label === "Actuel" && setActiveTab("Climat")}>
                            <div className="text-[#00ed64]">{info.icon}</div>
                            <div>
                                <p className="text-[10px] uppercase font-bold tracking-widest text-[#a3b1a3] mb-1">{info.label}</p>
                                <p className="text-xl font-bold">{info.value}</p>
                                <p className="text-xs text-[#a3b1a3]">{info.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-full">
                    {/* Main Content: Full Width */}
                    <div className="space-y-16">
                        <nav className="flex gap-10 border-b border-white/5 pb-6 sticky top-0 bg-[#050f05]/80 backdrop-blur-xl z-30 -mt-4 pt-4">
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
                                                alt="Map"
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

                        {activeTab === "Préparer" && (
                            <div className="space-y-20 animate-in fade-in duration-700">
                                {/* Section: Passeport & Visa */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[#00ed64]/10 flex items-center justify-center shrink-0">
                                            <Smartphone size={24} className="text-[#00ed64]" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black">Passeport & Visa</h2>
                                            <p className="text-[#a3b1a3] text-sm font-medium">Conditions d'entrée essentielles.</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <div className="lg:col-span-2 bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] p-8 space-y-8">
                                            <div className="grid grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#a3b1a3]">Validité Passeport</p>
                                                    <p className="text-2xl font-black text-[#00ed64] flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 bg-[#00ed64] rounded-full" /> 6 Mois
                                                    </p>
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#a3b1a3]">Information Visa</p>
                                                    <p className={`text-2xl font-black ${selectedPassport && visaResult?.status === 'libre' ? 'text-[#00ed64]' : ''}`}>
                                                        {selectedPassport ? (visaLoading ? "..." : (visaResult?.status === 'libre' ? "Pas de Visa" : "Requis")) : "À choisir"}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={`bg-white/5 border-l-4 p-6 rounded-r-2xl transition-all ${selectedPassport && visaResult?.status === 'libre' ? 'border-[#00ed64]' : 'border-white/20'}`}>
                                                <div className="space-y-3">
                                                    <p className="text-sm text-[#a3b1a3] leading-relaxed">
                                                        {selectedPassport && visaResult ? visaResult.info : `Deux options s'offrent à vous : un e-Visa pré-approuvé en ligne (recommandé) ou un visa classique via l'ambassade du ${country.name} de votre pays.`}
                                                    </p>
                                                    {selectedPassport && (
                                                        <div className="flex items-center gap-2 text-[10px] font-black text-[#00ed64] uppercase tracking-widest animate-pulse">
                                                            <Activity size={12} /> Obligations santé mises à jour plus bas
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-4 pt-2">
                                                <div className="flex flex-col sm:flex-row gap-4 w-full">
                                                    {selectedPassport && visaResult?.status !== 'libre' && (
                                                        <>
                                                            {(visaResult?.status === 'evisa' || visaResult?.status === 'visa_arrivee' || !selectedPassport) && (
                                                                <button className="bg-[#00ed64] text-black px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] transition-all flex-1">
                                                                    {visaResult?.status === 'visa_arrivee' ? "Pré-enrôlement e-Visa" : "Demander e-Visa"} <ExternalLink size={14} />
                                                                </button>
                                                            )}
                                                            <button className={`${visaResult?.status === 'evisa' ? 'bg-white/5 border-white/10' : 'bg-[#00ed64] text-black'} border px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all flex-1`}>
                                                                Visa (Ambassade) <Building2 size={14} />
                                                            </button>
                                                        </>
                                                    )}
                                                    {selectedPassport && visaResult?.status === 'libre' && (
                                                        <div className="w-full py-4 px-6 bg-[#00ed64]/10 border border-[#00ed64]/20 rounded-2xl flex items-center justify-center gap-3">
                                                            <CheckCircle size={18} className="text-[#00ed64]" />
                                                            <span className="text-[10px] font-black uppercase text-[#00ed64] tracking-widest">Aucune démarche requise</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="w-full">
                                                    <select
                                                        value={selectedPassport}
                                                        onChange={(e) => setSelectedPassport(e.target.value)}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-[10px] text-white focus:outline-none focus:border-[#00ed64]/50 appearance-none cursor-pointer font-bold"
                                                    >
                                                        <option value="" disabled>🌍 Votre Passeport...</option>
                                                        {Object.entries(passportGroups).map(([group, countries]) => (
                                                            <optgroup key={group} label={group} className="bg-[#050f05]">
                                                                {countries.map((p) => (
                                                                    <option key={p} value={p} className="bg-[#0c1a0c]">{getFlag(p)} {p}</option>
                                                                ))}
                                                            </optgroup>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-[#00ed64]/5 border border-[#00ed64]/10 rounded-[2.5rem] p-8 space-y-6">
                                            <div className="flex items-center gap-2 text-[#00ed64]">
                                                <ShieldCheck size={18} />
                                                <p className="text-[10px] font-black uppercase tracking-widest">Conseil de sécurité</p>
                                            </div>
                                            <p className="text-sm text-[#a3b1a3] leading-relaxed">
                                                Gardez toujours une copie numérique de votre passeport sur un cloud sécurisé.
                                            </p>
                                            <div className="bg-black/40 rounded-xl p-4 border border-white/5">
                                                <p className="font-mono text-[10px] text-[#00ed64]/80 uppercase">Contact : +225 27 22 41 XX XX</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section: Santé & Vaccins */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-[#00ed64]/10 flex items-center justify-center shrink-0">
                                                <Activity size={24} className="text-[#00ed64]" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-black">Santé & Vaccins</h2>
                                                <p className="text-[#a3b1a3] text-sm font-medium">Conditions liées à la destination et votre provenance.</p>
                                            </div>
                                        </div>
                                        {selectedPassport && (
                                            <div className="bg-[#00ed64] text-black px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest animate-bounce">
                                                Actualisé
                                            </div>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <div className="lg:col-span-2 bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] p-8 space-y-8">
                                            <div className="flex items-center gap-2 text-orange-400">
                                                <AlertTriangle size={18} />
                                                <p className="text-xs font-black uppercase tracking-widest">Guide des Vaccinations</p>
                                            </div>
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" key={selectedPassport}>
                                                {(() => {
                                                    const isIvoryCoast = normalize(country.name) === "Côte d'Ivoire";
                                                    const isSenegal = normalize(country.name) === "Sénégal";
                                                    const isMali = normalize(country.name) === "Mali";

                                                    const endemicGroups = ["🌍 Afrique de l'Ouest", "🌍 Afrique Centrale", "🌍 Afrique de l'Est", "🌍 Afrique Australe"];
                                                    const isFromEndemicZone = Object.entries(passportGroups).some(([group, countries]) =>
                                                        endemicGroups.includes(group) && countries.includes(selectedPassport)
                                                    );

                                                    // Pour Mali et CI, c'est obligatoire pour tous. Pour le Sénégal, ça dépend de la provenance.
                                                    if (isIvoryCoast || isMali || (isSenegal && isFromEndemicZone)) {
                                                        return (
                                                            <li className="flex gap-4 group animate-in fade-in slide-in-from-left-2 transition-all">
                                                                <div className="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center shrink-0">
                                                                    <Activity size={18} className="text-red-500 animate-pulse" />
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <p className="text-sm text-white font-black leading-tight uppercase">Fièvre Jaune</p>
                                                                    <p className="text-[11px] text-red-400 font-bold">OBLIGATOIRE</p>
                                                                    <p className="text-[10px] text-[#a3b1a3] font-medium leading-relaxed">
                                                                        {isIvoryCoast || isMali
                                                                            ? "Carnet jaune strictement exigé à l'entrée."
                                                                            : "Requis car vous provenez d'une zone endémique."}
                                                                    </p>
                                                                </div>
                                                            </li>
                                                        );
                                                    }

                                                    return (
                                                        <li className="flex gap-4 group animate-in fade-in transition-all">
                                                            <div className="w-10 h-10 rounded-2xl bg-[#00ed64]/10 flex items-center justify-center shrink-0">
                                                                <CheckCircle size={18} className="text-[#00ed64]" />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <p className="text-sm text-white font-black leading-tight uppercase">Fièvre Jaune</p>
                                                                <p className="text-[11px] text-[#00ed64] font-bold">CONSEILLÉ</p>
                                                                <p className="text-[10px] text-[#a3b1a3] font-medium leading-relaxed">
                                                                    Non exigé pour votre provenance, mais recommandé.
                                                                </p>
                                                            </div>
                                                        </li>
                                                    );
                                                })()}

                                                <li className="flex gap-4 group">
                                                    <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0">
                                                        <ShieldCheck size={18} className="text-blue-400" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-sm text-white font-black leading-tight uppercase">Hépatites A & B</p>
                                                        <p className="text-[11px] text-blue-400 font-bold">RECOMMANDÉ</p>
                                                        <p className="text-[10px] text-[#a3b1a3] font-medium leading-relaxed">À faire au moins 15 jours avant le départ.</p>
                                                    </div>
                                                </li>

                                                <li className="flex gap-4 group">
                                                    <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center shrink-0">
                                                        <Activity size={18} className="text-orange-400" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-sm text-white font-black leading-tight uppercase">Typhoïde</p>
                                                        <p className="text-[11px] text-orange-400 font-bold">CONSEILLÉ</p>
                                                        <p className="text-[10px] text-[#a3b1a3] font-medium leading-relaxed">Particulièrement pour les séjours prolongés.</p>
                                                    </div>
                                                </li>

                                                <li className="flex gap-4 group">
                                                    <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                                                        <Info size={18} className="text-[#a3b1a3]" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-sm text-white font-black leading-tight uppercase">Méningite</p>
                                                        <p className="text-[11px] text-[#a3b1a3] font-bold">SELON SAISON</p>
                                                        <p className="text-[10px] text-[#a3b1a3] font-medium leading-relaxed">Recommandé de Décembre à Juin.</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="bg-[#00ed64]/5 border border-[#00ed64]/10 rounded-[2.5rem] p-8 space-y-6 flex flex-col justify-between">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-[#00ed64]">
                                                    <Activity size={18} />
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#00ed64]">Numéros d'urgence</p>
                                                </div>
                                                <div className="space-y-4">
                                                    {normalize(country.name) === "Côte d'Ivoire" ? (
                                                        <>
                                                            <div className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/5">
                                                                <span className="text-[10px] font-bold text-[#a3b1a3] uppercase">SAMU</span>
                                                                <span className="text-lg font-black text-white">185</span>
                                                            </div>
                                                            <div className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/5">
                                                                <span className="text-[10px] font-bold text-[#a3b1a3] uppercase">Police Secours</span>
                                                                <span className="text-lg font-black text-white">111 / 170</span>
                                                            </div>
                                                            <div className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/5">
                                                                <span className="text-[10px] font-bold text-[#a3b1a3] uppercase">Pompiers</span>
                                                                <span className="text-lg font-black text-white">180</span>
                                                            </div>
                                                        </>
                                                    ) : normalize(country.name) === "Mali" ? (
                                                        <>
                                                            <div className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/5">
                                                                <span className="text-[10px] font-bold text-[#a3b1a3] uppercase">Urgences</span>
                                                                <span className="text-lg font-black text-white">20 22 11 11</span>
                                                            </div>
                                                            <div className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/5">
                                                                <span className="text-[10px] font-bold text-[#a3b1a3] uppercase">Police</span>
                                                                <span className="text-lg font-black text-white">80 331</span>
                                                            </div>
                                                            <div className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/5">
                                                                <span className="text-[10px] font-bold text-[#a3b1a3] uppercase">Pompiers</span>
                                                                <span className="text-lg font-black text-white">80 00 12 01</span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/5">
                                                                <span className="text-[10px] font-bold text-[#a3b1a3] uppercase">SAMU</span>
                                                                <span className="text-lg font-black text-white">15</span>
                                                            </div>
                                                            <div className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/5">
                                                                <span className="text-[10px] font-bold text-[#a3b1a3] uppercase">Police</span>
                                                                <span className="text-lg font-black text-white">17</span>
                                                            </div>
                                                            <div className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/5">
                                                                <span className="text-[10px] font-bold text-[#a3b1a3] uppercase">Pompiers</span>
                                                                <span className="text-lg font-black text-white">18</span>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="bg-black/40 rounded-2xl p-6 border border-white/5 space-y-4">
                                                <p className="text-[10px] font-bold text-white/50 uppercase">Hôpital recommandé</p>
                                                <p className="text-sm font-black text-[#00ed64]">
                                                    {normalize(country.name) === "Côte d'Ivoire" ? "PISAM (Abidjan)" : normalize(country.name) === "Mali" ? "Clinique Pasteur / Golden Life" : "Clinique de la Madeleine"}
                                                </p>
                                                <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all">Appeler</button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Grid Prévention */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <div className="bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] p-8 space-y-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-orange-400/10 flex items-center justify-center"><AlertTriangle size={20} className="text-orange-400" /></div>
                                                <h3 className="font-black text-lg">Paludisme (Malaria)</h3>
                                            </div>
                                            <p className="text-xs text-[#a3b1a3] leading-relaxed">
                                                Risque présent toute l'année. Utilisez des répulsifs cutanés, portez des vêtements couvrants le soir et dormez sous moustiquaire imprégnée.
                                            </p>
                                            <div className="pt-2">
                                                <p className="text-[9px] font-black text-[#00ed64] uppercase tracking-widest mb-2">Chimioprophylaxie</p>
                                                <p className="text-[10px] text-[#a3b1a3] font-medium italic">Consultez votre médecin pour un traitement (Malarone, Doxycycline...).</p>
                                            </div>
                                        </div>

                                        <div className="bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] p-8 space-y-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-blue-400/10 flex items-center justify-center"><Thermometer size={20} className="text-blue-400" /></div>
                                                <h3 className="font-black text-lg">Hygiène & Eau</h3>
                                            </div>
                                            <p className="text-xs text-[#a3b1a3] leading-relaxed">
                                                Ne buvez jamais l'eau du robinet. Privilégiez l'eau minérale en bouteille capsulée. Évitez les glaçons et les jus de fruits frais non industriels.
                                            </p>
                                            <div className="pt-2">
                                                <p className="text-[9px] font-black text-[#00ed64] uppercase tracking-widest mb-2">Alimentation</p>
                                                <p className="text-[10px] text-[#a3b1a3] font-medium italic">Consommez les aliments bien cuits et pelez les fruits vous-même.</p>
                                            </div>
                                        </div>

                                        <div className="bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] p-8 space-y-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-teal-400/10 flex items-center justify-center"><Sun size={20} className="text-teal-400" /></div>
                                                <h3 className="font-black text-lg">Risques Locaux</h3>
                                            </div>
                                            <p className="text-xs text-[#a3b1a3] leading-relaxed">
                                                Évitez les baignades en eau douce (lacs, rivières) à cause de la Bilharziose. Méfiez-vous des animaux errants (risque de rage).
                                            </p>
                                            <div className="pt-2">
                                                <p className="text-[9px] font-black text-[#00ed64] uppercase tracking-widest mb-2">Protection Solaire</p>
                                                <p className="text-[10px] text-[#a3b1a3] font-medium italic">Le soleil est intense, crème solaire indice 50 indispensable.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section: Transport & Arrivée */}
                                <div className="space-y-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                                            <Plane size={24} className="text-blue-400" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black">Transport & Arrivée</h2>
                                            <p className="text-[#a3b1a3] text-sm font-medium">De l'aéroport à votre premier cocon.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        {/* Main Airport Card */}
                                        <div className="bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] p-8 space-y-8 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                                <PlaneLanding size={80} className="text-white" />
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-[10px] font-black uppercase text-[#00ed64] tracking-widest">Aéroport Principal</p>
                                                <h3 className="text-2xl font-black">
                                                    {normalize(country.name) === "Côte d'Ivoire" ? "Félix-Houphouët-Boigny" :
                                                        normalize(country.name) === "Sénégal" ? "Blaise-Diagne" :
                                                            normalize(country.name) === "Mali" ? "Modibo Keïta" : country.capital}
                                                </h3>
                                                <p className="inline-flex items-center gap-2 bg-white/5 px-3 py-1 rounded-lg text-lg font-mono font-black border border-white/10">
                                                    {normalize(country.name) === "Côte d'Ivoire" ? "ABJ" :
                                                        normalize(country.name) === "Sénégal" ? "DSS" :
                                                            normalize(country.name) === "Mali" ? "BKO" : "---"}
                                                </p>
                                            </div>

                                            {/* Simulateur de trajet */}
                                            <div className="space-y-4 pt-4 border-t border-white/5">
                                                <div className="space-y-2">
                                                    <label className="text-[9px] font-black text-white/40 uppercase tracking-widest">Estimer votre trajet vers :</label>
                                                    <select
                                                        value={travelDest}
                                                        onChange={(e) => setTravelDest(e.target.value)}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white outline-none focus:border-[#00ed64]/50 transition-all appearance-none cursor-pointer"
                                                    >
                                                        {normalize(country.name) === "Côte d'Ivoire" ? (
                                                            <>
                                                                <option value="centre" className="bg-[#0c1a0c]">Plateau (Business)</option>
                                                                <option value="cocody" className="bg-[#0c1a0c]">Cocody (Résidentiel)</option>
                                                                <option value="marcory" className="bg-[#0c1a0c]">Marcory (Zone 4)</option>
                                                                <option value="yopougon" className="bg-[#0c1a0c]">Yopougon (Populaire)</option>
                                                                <option value="koumassi" className="bg-[#0c1a0c]">Koumassi / Treichville</option>
                                                                <option value="bingerville" className="bg-[#0c1a0c]">Bingerville</option>
                                                                <option value="assinie" className="bg-[#0c1a0c]">Assinie (Plage - 80km)</option>
                                                                <option value="autre" className="bg-[#0c1a0c]">--- Autre destination ---</option>
                                                            </>
                                                        ) : normalize(country.name) === "Sénégal" ? (
                                                            <>
                                                                <option value="centre" className="bg-[#0c1a0c]">Dakar Plateau (Centre)</option>
                                                                <option value="almadies" className="bg-[#0c1a0c]">Les Almadies / Ngor</option>
                                                                <option value="saly" className="bg-[#0c1a0c]">Saly (Station - 30km)</option>
                                                                <option value="autre" className="bg-[#0c1a0c]">--- Autre destination ---</option>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <option value="centre" className="bg-[#0c1a0c]">ACI 2000 (Affaires)</option>
                                                                <option value="hippodrome" className="bg-[#0c1a0c]">Hippodrome</option>
                                                                <option value="badalabougou" className="bg-[#0c1a0c]">Badalabougou</option>
                                                                <option value="autre" className="bg-[#0c1a0c]">--- Autre destination ---</option>
                                                            </>
                                                        )}
                                                    </select>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                                        <p className="text-[8px] font-black text-[#a3b1a3] uppercase mb-1">Distance</p>
                                                        <p className="text-sm font-black">
                                                            {(() => {
                                                                if (travelDest === "autre") return "Variable";
                                                                if (normalize(country.name) === "Côte d'Ivoire") {
                                                                    switch (travelDest) {
                                                                        case "assinie": return "85 km";
                                                                        case "yopougon": return "32 km";
                                                                        case "bingerville": return "38 km";
                                                                        case "cocody": return "25 km";
                                                                        case "marcory": return "12 km";
                                                                        case "koumassi": return "8 km";
                                                                        default: return "18 km"; // Plateau
                                                                    }
                                                                }
                                                                if (normalize(country.name) === "Sénégal") {
                                                                    return travelDest === "saly" ? "35 km" : travelDest === "almadies" ? "65 km" : "55 km";
                                                                }
                                                                return travelDest === "hippodrome" ? "22 km" : "15 km";
                                                            })()}
                                                        </p>
                                                    </div>
                                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                                        <p className="text-[8px] font-black text-[#a3b1a3] uppercase mb-1">Temps</p>
                                                        <p className="text-sm font-black">
                                                            {(() => {
                                                                if (travelDest === "autre") return "---";
                                                                if (normalize(country.name) === "Côte d'Ivoire") {
                                                                    switch (travelDest) {
                                                                        case "assinie": return "1h 30m";
                                                                        case "yopougon": return "55m";
                                                                        case "bingerville": return "1h 05m";
                                                                        case "cocody": return "45m";
                                                                        case "marcory": return "25m";
                                                                        case "koumassi": return "20m";
                                                                        default: return "35m"; // Plateau
                                                                    }
                                                                }
                                                                if (normalize(country.name) === "Sénégal") {
                                                                    return travelDest === "saly" ? "45m" : travelDest === "almadies" ? "1h 15m" : "1h 05m";
                                                                }
                                                                return travelDest === "hippodrome" ? "45m" : "30m";
                                                            })()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 px-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                                                    <p className="text-[9px] text-orange-400 font-bold uppercase tracking-widest leading-tight">
                                                        {travelDest === "autre" ? "Vérifiez sur Yango/Heetch pour une estimation précise" : "Prévoyez +30m aux heures de pointe"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Arrival Guide Card */}
                                        <div className="lg:col-span-2 bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] p-8 space-y-8">
                                            <div className="flex items-center gap-2 text-blue-400">
                                                <MoveRight size={18} />
                                                <p className="text-[10px] font-black uppercase tracking-widest">Rejoindre votre destination</p>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-6">
                                                    <div className="space-y-3">
                                                        <h4 className="font-black flex items-center gap-2 text-[#00ed64]"><Smartphone size={16} /> Apps Recommandées</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {normalize(country.name) === "Côte d'Ivoire" ? ["Yango", "Heetch"].map(app => (
                                                                <span key={app} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black">{app}</span>
                                                            )) : normalize(country.name) === "Sénégal" ? ["Yango", "Heetch", "TER (Train)"].map(app => (
                                                                <span key={app} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black">{app}</span>
                                                            )) : ["Taxis Compteur", "Locations"].map(app => (
                                                                <span key={app} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black">{app}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-[10px] font-black text-[#a3b1a3] uppercase tracking-widest">Budget Taxi (Course simple)</p>
                                                        <p className="text-xl font-black">
                                                            {(() => {
                                                                if (travelDest === "autre") return "Comptez env. 500 CFA / 2km";
                                                                if (normalize(country.name) === "Côte d'Ivoire") {
                                                                    switch (travelDest) {
                                                                        case "assinie": return "35 000 - 45 000 CFA";
                                                                        case "yopougon": return "12 000 - 18 000 CFA";
                                                                        case "bingerville": return "12 000 - 15 000 CFA";
                                                                        case "cocody": return "8 000 - 12 000 CFA";
                                                                        case "marcory": return "4 000 - 6 000 CFA";
                                                                        case "koumassi": return "3 000 - 5 000 CFA";
                                                                        default: return "6 000 - 9 000 CFA"; // Plateau
                                                                    }
                                                                }
                                                                if (normalize(country.name) === "Sénégal") {
                                                                    return travelDest === "saly" ? "12 000 - 18 000 CFA" : travelDest === "almadies" ? "18 000 - 25 000 CFA" : "15 000 - 20 000 CFA";
                                                                }
                                                                return travelDest === "hippodrome" ? "7 000 - 10 000 CFA" : "5 000 - 8 000 CFA";
                                                            })()}
                                                        </p>
                                                        <p className="text-[10px] text-blue-400 font-bold">
                                                            Conseil : {normalize(country.name) === "Côte d'Ivoire" ? "Les taxis Yango sont les plus fiables à Abidjan." : normalize(country.name) === "Sénégal" ? "Le TER évite les bouchons interminables." : "Négociez toujours avant de monter."}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="bg-white/5 rounded-3xl p-6 space-y-4">
                                                    <div className="flex items-center gap-2 text-orange-400">
                                                        <ShieldAlert size={16} />
                                                        <p className="text-[10px] font-black uppercase tracking-widest">Protocoles d'Arrivée</p>
                                                    </div>
                                                    <ul className="space-y-3">
                                                        <li className="flex gap-3 text-[11px] text-[#a3b1a3] leading-relaxed">
                                                            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full shrink-0 mt-1.5" />
                                                            Porteurs : Un pourboire de 500-1000 CFA est d'usage.
                                                        </li>
                                                        <li className="flex gap-3 text-[11px] text-[#a3b1a3] leading-relaxed">
                                                            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full shrink-0 mt-1.5" />
                                                            Change : Évitez de changer de grosses sommes à l'aéroport.
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section: Monnaie & Budget */}
                                <div className="space-y-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                                            <Wallet size={24} className="text-orange-400" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black">Monnaie & Budget</h2>
                                            <p className="text-[#a3b1a3] text-sm font-medium">Gérez vos finances comme un local.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        {/* Currency & Rates Card */}
                                        <div className="bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] p-8 space-y-6">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black uppercase text-[#00ed64] tracking-widest">Devise Locale</p>
                                                <h3 className="text-3xl font-black italic">Franc CFA <span className="text-sm font-medium text-white/40 not-italic">(XOF)</span></h3>
                                            </div>
                                            <div className="bg-black/40 rounded-2xl p-6 border border-white/5 space-y-4">
                                                {!showConverter ? (
                                                    <div className="flex justify-between items-center text-xs">
                                                        <span className="text-[#a3b1a3] font-bold uppercase tracking-widest">Taux Fixe</span>
                                                        <span className="font-black text-white">1 € = 655.957 CFA</span>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => setCfaInput(v => String(Math.max(0, parseInt(v || "0") - 1000)))}
                                                                className="w-9 h-9 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-black text-lg hover:bg-white/10 hover:border-[#00ed64]/30 transition-all active:scale-90"
                                                            >−</button>
                                                            <div className="relative flex-1">
                                                                <input
                                                                    type="text"
                                                                    inputMode="numeric"
                                                                    value={parseInt(cfaInput || "0").toLocaleString()}
                                                                    onChange={(e) => {
                                                                        const raw = e.target.value.replace(/\D/g, "");
                                                                        setCfaInput(raw || "0");
                                                                    }}
                                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 pr-10 text-xs font-black outline-none focus:border-[#00ed64]/30 text-center"
                                                                />
                                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[8px] font-black text-white/20">CFA</span>
                                                            </div>
                                                            <button
                                                                onClick={() => setCfaInput(v => String(parseInt(v || "0") + 1000))}
                                                                className="w-9 h-9 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-black text-lg hover:bg-white/10 hover:border-[#00ed64]/30 transition-all active:scale-90"
                                                            >+</button>
                                                        </div>
                                                        <div className="flex justify-center">
                                                            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                                                                <ArrowRight size={10} className="rotate-90 text-[#00ed64]" />
                                                            </div>
                                                        </div>
                                                        <div className="relative">
                                                            <div className="w-full bg-[#00ed64]/10 border border-[#00ed64]/20 rounded-xl py-2 px-3 text-xs font-black text-[#00ed64]">
                                                                {(parseFloat(cfaInput || "0") / 655.957).toFixed(2)} €
                                                            </div>
                                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[8px] font-black text-[#00ed64]/40">EUR</span>
                                                        </div>
                                                    </div>
                                                )}
                                                <button
                                                    onClick={() => setShowConverter(!showConverter)}
                                                    className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${showConverter ? 'bg-white/5 text-[#a3b1a3]' : 'bg-[#00ed64] text-black hover:scale-[1.02]'}`}
                                                >
                                                    {showConverter ? "Fermer" : "Convertisseur Direct"}
                                                </button>
                                            </div>
                                            <div className="space-y-4">
                                                <p className="text-[10px] font-black text-[#a3b1a3] uppercase tracking-widest">Paiement Recommandé</p>
                                                <div className="flex gap-3">
                                                    <div className="flex-1 p-4 bg-white/5 rounded-2xl border border-white/5 text-center group hover:border-[#00ed64]/30 transition-all cursor-help">
                                                        <div className="w-8 h-8 rounded-full bg-blue-400/10 flex items-center justify-center mx-auto mb-2 text-blue-400 font-black text-xs italic">W</div>
                                                        <p className="text-[9px] font-black uppercase">Wave</p>
                                                    </div>
                                                    <div className="flex-1 p-4 bg-white/5 rounded-2xl border border-white/5 text-center group hover:border-[#00ed64]/30 transition-all cursor-help">
                                                        <div className="w-8 h-8 rounded-full bg-orange-400/10 flex items-center justify-center mx-auto mb-2 text-orange-400 font-black text-xs italic">OM</div>
                                                        <p className="text-[9px] font-black uppercase">Orange</p>
                                                    </div>
                                                </div>
                                                <p className="text-[10px] text-orange-400 font-bold italic leading-relaxed">
                                                    "Le Mobile Money est roi. Téléchargez Wave dès votre arrivée."
                                                </p>
                                            </div>
                                        </div>

                                        {/* Budget Estimator Card */}
                                        <div className="lg:col-span-2 bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] p-8 space-y-8">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-black uppercase text-blue-400 tracking-widest leading-none">Simulateur de Budget</p>
                                                    <h3 className="text-xl font-black">Combien prévoir par jour ?</h3>
                                                </div>
                                                <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 self-start">
                                                    {['eco', 'confort', 'luxe'].map((p) => (
                                                        <button
                                                            key={p}
                                                            onClick={() => setBudgetProfile(p)}
                                                            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${budgetProfile === p ? 'bg-[#00ed64] text-black shadow-lg shadow-[#00ed64]/20' : 'text-[#a3b1a3] hover:text-white'}`}
                                                        >
                                                            {p}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="bg-[#00ed64]/5 border border-[#00ed64]/10 rounded-[2.2rem] p-8 flex flex-col justify-center gap-2">
                                                    <p className="text-[10px] font-black text-[#00ed64] uppercase tracking-widest">Estimation Journalière</p>
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-4xl font-black">
                                                            {budgetProfile === 'eco' ? '15 000' : budgetProfile === 'confort' ? '45 000' : '120 000'}
                                                        </span>
                                                        <span className="text-sm font-bold text-white/50 italic">CFA / jour</span>
                                                    </div>
                                                    <p className="text-[10px] text-[#a3b1a3] font-medium leading-relaxed mt-2">
                                                        {budgetProfile === 'eco' ? 'Manger en maquis, transports locaux et expériences partagées.' :
                                                            budgetProfile === 'confort' ? 'Restos sympa, taxis privés et hôtels de gamme moyenne.' :
                                                                'Hôtels 5*, guides privés et expériences premium.'}
                                                    </p>
                                                </div>

                                                <div className="space-y-4">
                                                    <p className="text-[10px] font-black text-[#a3b1a3] uppercase tracking-widest">Coût de la vie locale</p>
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400"><Info size={14} /></div>
                                                                <span className="text-[11px] font-bold text-[#a3b1a3]">Bouteille d'eau (1.5L)</span>
                                                            </div>
                                                            <span className="text-xs font-black text-white">500 CFA</span>
                                                        </div>
                                                        <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400"><Activity size={14} /></div>
                                                                <span className="text-[11px] font-bold text-[#a3b1a3]">Repas Complet Maquis</span>
                                                            </div>
                                                            <span className="text-xs font-black text-white">3 000 CFA</span>
                                                        </div>
                                                        <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-lg bg-[#00ed64]/10 flex items-center justify-center text-[#00ed64]"><Smartphone size={14} /></div>
                                                                <span className="text-[11px] font-bold text-[#a3b1a3]">Carte SIM + Data (1Go)</span>
                                                            </div>
                                                            <span className="text-xs font-black text-white">2 500 CFA</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* Section: Incontournables */}
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-[#00ed64]/10 flex items-center justify-center shrink-0"><Star size={24} className="text-[#00ed64]" /></div>
                                            <h2 className="text-2xl font-black">Incontournables</h2>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {country?.cities?.flatMap(c => c.activities || []).slice(0, 3).map((sight: any, i: number) => (
                                            <div key={i} className="bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-[#00ed64]/30 transition-all cursor-pointer flex flex-col">
                                                <div className="h-48 bg-white/5 flex items-center justify-center relative overflow-hidden shrink-0">
                                                    {sight.image ? (
                                                        <img src={sight.image} alt={sight.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                    ) : (
                                                        <MapPin size={32} className="text-[#00ed64]/20" />
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a0c] via-transparent to-transparent" />
                                                    <span className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest text-[#00ed64] border border-white/10 shadow-lg">{sight.category || "DÉCOUVERTE"}</span>
                                                </div>
                                                <div className="p-6 pt-4 flex-1 flex flex-col">
                                                    <h4 className="font-black text-lg group-hover:text-[#00ed64] transition-colors line-clamp-1">{sight.name}</h4>
                                                    <p className="text-xs text-[#a3b1a3] mt-2 leading-relaxed line-clamp-2">{sight.description}</p>
                                                    <div className="mt-auto pt-4 flex items-center justify-between">
                                                        <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
                                                            Aperçu
                                                        </span>
                                                        <Star size={12} className="text-yellow-400" fill="currentColor" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {(!country?.cities || country.cities.flatMap(c => c.activities || []).length === 0) && (
                                            <div className="col-span-full py-10 text-center text-[#a3b1a3] italic">
                                                Les incontournables seront bientôt disponibles pour cette destination.
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Section: Liste de Préparation */}
                                <div className="bg-[#0c1a0c] border border-white/5 rounded-[3rem] p-10 space-y-10 relative overflow-hidden">
                                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-[#00ed64]/10 rounded-2xl flex items-center justify-center"><CheckSquare size={24} className="text-[#00ed64]" /></div>
                                            <div>
                                                <h3 className="text-xl font-black">Liste de Préparation</h3>
                                                <p className="text-xs text-[#a3b1a3] font-medium mt-1">Suivez vos progrès en temps réel.</p>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-64 space-y-2">
                                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                                <span className="text-[#a3b1a3]">Progression</span>
                                                <span className="text-[#00ed64]">
                                                    {Math.round((Object.values(checkedItems).filter(Boolean).length / 6) * 100)}%
                                                </span>
                                            </div>
                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[#00ed64] transition-all duration-500 ease-out"
                                                    style={{ width: `${(Object.values(checkedItems).filter(Boolean).length / 6) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 relative z-10">
                                        {[
                                            "Passeport valide (+6 mois)",
                                            "Demande d'e-Visa soumise",
                                            "Carnet de vaccination jaune",
                                            "Application transport installée",
                                            "Change espèces effectué",
                                            "Adaptateur universel"
                                        ].map((item, i) => (
                                            <div
                                                key={i}
                                                onClick={() => setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }))}
                                                className="flex items-center gap-4 group cursor-pointer py-2"
                                            >
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${checkedItems[item] ? 'bg-[#00ed64] border-[#00ed64]' : 'border-white/10 group-hover:border-[#00ed64]'}`}>
                                                    <CheckCircle size={10} className={`transition-all ${checkedItems[item] ? 'text-black opacity-100' : 'opacity-0'}`} />
                                                </div>
                                                <span className={`text-[12px] transition-all ${checkedItems[item] ? 'text-[#a3b1a3] line-through' : 'text-[#a3b1a3] group-hover:text-white'}`}>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Download Card */}
                                <div className="bg-[#0c1a0c] border border-white/5 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center"><Smartphone size={20} className="text-[#a3b1a3]" /></div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-[#00ed64]">Accès Hors Ligne</p>
                                            <p className="text-xs text-[#a3b1a3] font-medium">Télécharger le guide pour une utilisation sans connexion.</p>
                                        </div>
                                    </div>
                                    <button className="bg-[#00ed64] text-black px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2">TÉLÉCHARGER LE PDF <Download size={14} /></button>
                                </div>
                            </div>
                        )}

                        {activeTab === "Climat" && (
                            <section className="space-y-12 animate-in fade-in duration-500">
                                {/* Nouveau Bloc Climat & Météo Premium */}
                                <div className="bg-[#051105] border border-[#00ed64]/10 rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ed64]/5 rounded-full blur-[100px] -mr-32 -mt-32" />

                                    <div className="space-y-10 flex-1 relative z-10">
                                        <div className="space-y-4">
                                            <h2 className="text-4xl font-black">Climat & Météo</h2>
                                            <p className="text-[#a3b1a3] text-xl font-medium leading-relaxed max-w-xl">
                                                Le climat est tropical avec des températures moyennes entre <span className="text-white font-bold">24°C et 32°C</span>.
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-x-16 gap-y-8">
                                            <div className="flex items-center gap-5 group">
                                                <div className="w-12 h-12 rounded-2xl bg-[#00ed64]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <Sun className="text-[#00ed64]" size={28} />
                                                </div>
                                                <div>
                                                    <p className="text-lg font-black text-[#00ed64]">Saison Sèche</p>
                                                    <p className="text-sm font-bold text-[#a3b1a3]">Nov - Avr <span className="text-[#00ed64]/80 ml-1">(Idéal)</span></p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-5 group">
                                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <Umbrella className="text-[#a3b1a3]" size={28} />
                                                </div>
                                                <div>
                                                    <p className="text-lg font-black text-[#a3b1a3]">Saison des Pluies</p>
                                                    <p className="text-sm font-bold text-white/20">Mai - Oct</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-12 flex flex-col items-center justify-center min-w-[280px] relative z-10 shadow-2xl">
                                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#00ed64] rounded-full flex items-center justify-center animate-bounce duration-[3000ms]">
                                            {currentWeather?.condition === "CloudRain" ? (
                                                <CloudRain size={20} className="text-black" />
                                            ) : currentWeather?.condition === "Cloud" ? (
                                                <Sun size={20} className="text-black opacity-50" />
                                            ) : (
                                                <Sun size={20} className="text-black" />
                                            )}
                                        </div>
                                        {currentWeather ? (
                                            <p className="text-8xl font-black text-[#00ed64] tracking-tighter mb-2 drop-shadow-[0_0_20px_rgba(0,237,100,0.3)]">{currentWeather.temp}°</p>
                                        ) : (
                                            <div className="w-16 h-16 border-4 border-[#00ed64] border-t-transparent rounded-full animate-spin mb-6 mt-4" />
                                        )}
                                        <p className="text-xs font-black text-[#a3b1a3] uppercase tracking-[0.3em]">{country.capital} Aujourd'hui</p>
                                    </div>
                                </div>

                                {/* Historique Mensuel */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-black uppercase tracking-widest text-[#a3b1a3]">Moyennes Mensuelles</h3>
                                        <p className="text-xs font-bold text-[#a3b1a3]">Faible probabilité de précipitations en saison sèche</p>
                                    </div>
                                    <div className="flex overflow-x-auto gap-4 pt-4 pb-8 scroller-hide -mx-4 px-4 sticky-fader">
                                        {climateData.map((data, idx) => (
                                            <div key={idx} className={`min-w-[100px] flex-1 bg-[#0c1a0c] border border-white/5 rounded-3xl p-5 flex flex-col items-center gap-4 transition-all hover:border-[#00ed64]/30 ${new Date().getMonth() === idx ? 'ring-2 ring-[#00ed64]/50 border-[#00ed64]/30 bg-[#00ed64]/5' : ''}`}>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-[#a3b1a3]">{data.month}</p>
                                                <div className="text-[#00ed64]">
                                                    {data.condition === "Sun" && <Sun size={24} />}
                                                    {data.condition === "Cloud" && <Sun size={24} className="opacity-50" />}
                                                    {data.condition === "CloudRain" && <CloudRain size={24} />}
                                                </div>
                                                <p className="text-xl font-black tracking-tighter">{data.temp}°</p>
                                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${data.rain}%` }} />
                                                </div>
                                                <p className="text-[8px] font-bold text-white/30 uppercase tracking-[0.1em]">Pluie: {data.rain}%</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}

                        {activeTab === "Villes" && (
                            <section className="space-y-8 animate-in fade-in duration-300">
                                <h2 className="text-3xl font-black">Villes à Explorer</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {country.cities.length > 0 ? country.cities.map((city, idx) => (
                                        <a key={idx} href={`/villes/${city.id}`} className="bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-[#00ed64]/30 transition-all cursor-pointer">
                                            <div className="h-48 relative overflow-hidden bg-white/5 flex items-center justify-center">
                                                {city.activities && city.activities[0]?.image ? (
                                                    <img src={city.activities[0].image} alt={city.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" />
                                                ) : (
                                                    <MapPin size={48} className="text-[#00ed64]/20" />
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a0c] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                                            </div>
                                            <div className="p-6">
                                                <h4 className="text-lg font-bold group-hover:text-[#00ed64] transition-colors">{city.name}</h4>
                                                <p className="text-xs text-[#a3b1a3] leading-relaxed line-clamp-2">{city.description}</p>
                                            </div>
                                        </a>
                                    )) : (
                                        <p className="text-[#a3b1a3] italic">Bientôt d'autres villes...</p>
                                    )}
                                </div>
                            </section>
                        )}


                    </div>
                </div>
            </main>

            <footer className="border-t border-white/5 py-12 px-6 bg-[#0c1a0c]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-[#00ed64] rounded flex items-center justify-center">
                            <MapPin size={14} className="text-black" />
                        </div>
                        <span className="font-bold">Aliniosié © 2026</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
