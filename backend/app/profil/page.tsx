"use client";

import {
    Home,
    Map as MapIcon,
    Bookmark,
    User as UserIcon,
    LogOut,
    Plus,
    Calendar,
    MoreHorizontal,
    Share2,
    Trash2,
    Diamond,
    MapPin,
    ChevronRight,
    ChevronLeft,
    LayoutDashboard,
    Users,
    Search,
    ChevronDown,
    Menu,
    X
} from "lucide-react";
import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { User } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";

function ProfilContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState("À venir"); // For the Trips internal tabs
    const [activeSection, setActiveSection] = useState("Accueil"); // Main Sidebar sections

    // Sync with query params for navigation from mobile menu
    useEffect(() => {
        const section = searchParams.get('section');
        if (section) {
            setActiveSection(section);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [searchParams]);

    const [user, setUser] = useState<User | any>(null);
    const [voyages, setVoyages] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState<any>(null);
    const [wizardStep, setWizardStep] = useState(0);
    const [planningCountry, setPlanningCountry] = useState("");
    const [planningCityIds, setPlanningCityIds] = useState<(number | string)[]>([]);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [countries, setCountries] = useState<any[]>([]);

    // Logistique State
    const [travelStartDate, setTravelStartDate] = useState("");
    const [travelEndDate, setTravelEndDate] = useState("");
    const [isFlexible, setIsFlexible] = useState(false);
    const [adultCount, setAdultCount] = useState(2);
    const [childCount, setChildCount] = useState(0);
    const [calendarViewDate, setCalendarViewDate] = useState(new Date()); // Date actuelle par défaut

    const fetchCountries = async () => {
        try {
            const response = await fetch("/api/countries");
            if (!response.ok) {
                throw new Error("Failed to fetch countries");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching countries:", error);
            return [];
        }
    };

    useEffect(() => {
        const loadCountries = async () => {
            const data = await fetchCountries();
            setCountries(data);
        };
        loadCountries();
    }, []);


    const countriesList = countries.map(c => ({ name: c.name, code: c.code }));

    const toggleInterest = (interest: string) => {
        setSelectedInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("/api/users/me", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.status === 401) {
                localStorage.removeItem("token");
                router.push("/login");
                return;
            }
            if (!response.ok) {
                throw new Error("Not authenticated");
            }
            const data = await response.json();
            setUser(data);
            setEditedUser(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }
        fetchUserData();
    }, []);


    const fetchVoyages = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("/api/itineraries", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch voyages");
            }
            const data = await response.json();
            setVoyages(data);
            console.log("Voyages récupérés:", data);
        } catch (error) {
            console.error("Erreur lors de la récupération des voyages:", error);
        }
    }

    useEffect(() => {
        fetchVoyages();
    }, []);


    const logout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    }

    // Dynamic Logic
    const now = new Date();
    const completedTrips = voyages.filter(v => new Date(v.endDate) < now).length;
    const totalTrips = voyages.length;
    const countriesVisited = user?.origins?.length || 0;

    const nextTrip = voyages
        .filter(v => new Date(v.startDate) > now && v.cityIds && v.cityIds.length > 0)
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())[0];

    const filteredVoyages = voyages.filter(v => {
        const start = new Date(v.startDate);
        const end = new Date(v.endDate);
        const isCompleted = end < now;
        const isDraft = !v.isGenerated; // Utilisation d'un flag plus fiable si disponible, sinon on garde la logique précédente

        if (activeTab === "Brouillons") return !v.title || v.title.toLowerCase().includes("draft") || !v.isGenerated;
        if (activeTab === "À venir") return start > now;
        if (activeTab === "Historique") return isCompleted;
        return true;
    });

    const handleSaveTrip = async () => {
        if (!travelStartDate || !travelEndDate || !planningCountry) {
            alert("Veuillez sélectionner un pays et vos dates de voyage.");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            // Trouver l'ID du pays
            const countryId = countries.find(c => c.name === planningCountry)?.id || 1;

            const response = await fetch("/api/generate-itinerary", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    startDate: travelStartDate,
                    endDate: travelEndDate,
                    budget: 1500,
                    adults: adultCount,
                    children: childCount,
                    interests: selectedInterests,
                    countryId: countryId,
                    cityIds: planningCityIds
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Détails de l'erreur API:", errorData);
                throw new Error(errorData.error || "Erreur de sauvegarde de l'itinéraire");
            }

            const result = await response.json();

            // Refresh list
            await fetchVoyages();

            // Navigation
            setActiveSection("Voyages enregistrés");
            setActiveTab("À venir");
            resetWizard();

            if (result.data?.id) {
                router.push(`/itineraires/${result.data.id}`);
            }

        } catch (error: any) {
            console.error("Erreur saveTrip:", error);
            alert(error.message || "Une erreur est survenue lors de l'enregistrement.");
        }
    };

    const handleSaveProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("/api/users/me", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    firstName: editedUser.firstName,
                    lastName: editedUser.lastName,
                    email: editedUser.email,
                    diasporaCountry: editedUser.diasporaCountry
                })
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la mise à jour");
            }

            const updatedUser = await response.json();
            setUser(updatedUser);
            setEditedUser(updatedUser);
            setIsEditing(false);
            alert("Profil mis à jour avec succès !");
        } catch (error) {
            console.error("Erreur save profile:", error);
            alert("Une erreur est survenue lors de la sauvegarde.");
        }
    };

    const nextWizardStep = () => setWizardStep(prev => prev + 1);
    const resetWizard = () => {
        setWizardStep(0);
        setPlanningCountry("");
        setPlanningCityIds([]);
        setSelectedInterests([]);
        setTravelStartDate("");
        setTravelEndDate("");
        setIsFlexible(false);
        setAdultCount(2);
        setChildCount(0);
    };

    // Logic for Calendar
    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const renderCalendarDays = () => {
        const year = calendarViewDate.getFullYear();
        const month = calendarViewDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = (getFirstDayOfMonth(year, month) + 6) % 7;

        const days = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="w-9 h-9" />);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const currentLoopDate = new Date(year, month, i);
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const isStart = travelStartDate === dateStr;
            const isEnd = travelEndDate === dateStr;
            const isInRange = travelStartDate && travelEndDate && dateStr > travelStartDate && dateStr < travelEndDate;
            const isPast = currentLoopDate < today;

            days.push(
                <button
                    key={i}
                    disabled={isPast}
                    onClick={() => {
                        if (isPast) return;
                        if (!travelStartDate || (travelStartDate && travelEndDate)) {
                            setTravelStartDate(dateStr);
                            setTravelEndDate("");
                        } else if (dateStr > travelStartDate) {
                            setTravelEndDate(dateStr);
                        } else {
                            setTravelStartDate(dateStr);
                        }
                    }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center mx-auto text-sm transition-all relative ${isPast ? "text-white/20 cursor-not-allowed" :
                        isStart || isEnd
                            ? "bg-primary text-black font-black z-10 shadow-primary/20"
                            : isInRange
                                ? "bg-primary/20 text-primary"
                                : "hover:bg-white/10"
                        }`}
                >
                    {i}
                </button>
            );
        }
        return days;
    };

    const changeMonth = (offset: number) => {
        setCalendarViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + offset, 1));
    };

    const handleCreateTrip = () => {
        setActiveSection("Planifier un voyage");
        setWizardStep(0);
    };

    const handleActionPlaceholder = (action: string) => {
        alert(`Action "${action}" bientôt disponible !`);
    };

    const handleDeleteVoyage = async (id: number) => {
        if (confirm("Voulez-vous vraiment supprimer ce voyage ?")) {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`/api/itineraries/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Erreur lors de la suppression du voyage");
                }

            } catch (error: any) {
                console.error("Erreur suppression:", error);
                alert(error.message || "Une erreur est survenue lors de la suppression.");
            }
        }
    };

    return (
        <div className="bg-background min-h-screen text-white font-sans selection:bg-primary/30">
            <Navbar />

            {/* MOBILE ONLY GREETING (Shown before everything else on small screens) */}
            <div className="lg:hidden bg-[#050f05] pt-32 pb-8 border-b border-white/5 px-6">
                <div className="flex items-center gap-2 text-primary mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Tableau de Bord</p>
                </div>
                <h1 className="text-3xl font-black italic tracking-tight">Bon retour, {user?.firstName} 👋</h1>
            </div>

            <div className="flex flex-col lg:flex-row lg:h-screen lg:pt-20">
                <aside className="hidden lg:flex w-80 bg-[#0c1a0c] border-r border-white/5 flex-col p-8 gap-12 sticky top-0 h-screen overflow-y-auto">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <LayoutDashboard className="text-primary" size={20} />
                        </div>
                        <h1 className="text-xl font-black italic">Dashboard</h1>
                    </div>

                    <nav className="space-y-2 flex-1">
                        {[
                            { icon: <Home size={20} />, label: "Accueil" },
                            { icon: <MapIcon size={20} />, label: "Planifier un voyage" },
                            { icon: <Bookmark size={20} />, label: "Voyages enregistrés" },
                            { icon: <UserIcon size={20} />, label: "Profil & Paramètres" },
                        ].map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveSection(item.label)}
                                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${activeSection === item.label
                                    ? 'bg-primary/10 text-primary border border-primary/20 font-bold'
                                    : 'text-[#a3b1a3] hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {item.icon}
                                <span className="text-sm">{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    <button onClick={logout} className="mt-auto flex items-center gap-4 px-4 py-3.5 text-[#a3b1a3] hover:text-red-400 transition-colors">
                        <LogOut size={20} />
                        <span className="text-sm font-bold">Déconnexion</span>
                    </button>
                </aside>

                <main className="flex-1 overflow-y-auto px-4 md:px-12 py-8 md:py-10">
                    {/* DESKTOP ONLY HEADER */}
                    <div className="hidden lg:block mb-10">
                        <h1 className="text-4xl font-black tracking-tight mb-2 italic">Bon retour, {user?.firstName} 👋</h1>
                        <p className="text-[#a3b1a3] font-medium opacity-60">Heureux de vous revoir sur votre espace personnel. Prête pour une nouvelle mission ?</p>
                    </div>

                    {/* MOBILE NAVIGATION PILLS */}
                    <div className="lg:hidden grid grid-cols-2 gap-3 mb-10">
                        {[
                            { label: "Accueil", icon: <Home size={18} /> },
                            { label: "Voyages", icon: <Bookmark size={18} />, target: "Voyages enregistrés" },
                            { label: "Planifier", icon: <MapIcon size={18} />, target: "Planifier un voyage" },
                            { label: "Paramètres", icon: <UserIcon size={18} />, target: "Profil & Paramètres" }
                        ].map((item) => {
                            const target = item.target || item.label;
                            const isActive = activeSection === target;
                            return (
                                <button
                                    key={item.label}
                                    onClick={() => setActiveSection(target)}
                                    className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${isActive
                                            ? 'bg-primary/10 border-primary/30 text-primary shadow-primary/20'
                                            : 'bg-white/5 border-white/5 text-white/50'
                                        }`}
                                >
                                    <div className={isActive ? 'text-primary' : ''}>{item.icon}</div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Conditional Rendering based on activeSection */}

                    {activeSection === "Accueil" && (
                        <div className="space-y-12 animate-in fade-in duration-700">
                            {/* Profile Card & Widgets Grid */}
                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-12">

                                {/* Main Profile Card */}
                                <div className="xl:col-span-8 bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center gap-10">
                                    <div className="relative">
                                        <div className="w-32 h-32 rounded-full border-4 border-primary p-1">
                                            <img
                                                src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop"
                                                alt="Profile Avatar"
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-primary text-black text-[9px] font-black px-2 py-0.5 rounded-full border-2 border-[#0c1a0c] uppercase">
                                            LVL 3
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-6 text-center md:text-left">
                                        <div className="space-y-1">
                                            <h2 className="text-3xl font-black">{user?.firstName} {user?.lastName}</h2>
                                            <p className="text-[#a3b1a3] font-bold">Exploratrice passionnée</p>
                                            <div className="flex items-center justify-center md:justify-start gap-1 text-[#a3b1a3] text-sm">
                                                <MapPin size={14} className="text-primary" /> Dakar, Sénégal
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-12 pt-4 border-t border-white/5">
                                            {[
                                                { val: completedTrips.toString(), label: "VOYAGES TERMINÉS" },
                                                { val: (totalTrips - completedTrips).toString(), label: "BROUILLONS / À VENIR" },
                                                { val: countriesVisited.toString(), label: "PAYS VISITÉS" },
                                            ].map((stat, i) => (
                                                <div key={i} className="space-y-1">
                                                    <p className="text-3xl font-black leading-none">{stat.val}</p>
                                                    <p className="text-[9px] font-black text-[#a3b1a3] tracking-[0.2em]">{stat.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Sidebar Widget: Map */}
                                <div className="xl:col-span-4 space-y-8">
                                    <div className="bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] p-8 flex flex-col gap-6 relative overflow-hidden group">
                                        <div className="flex justify-between items-start relative z-10">
                                            <h3 className="text-lg font-black">Votre Carte de <br /> Voyage</h3>
                                            <button
                                                onClick={() => handleActionPlaceholder("Voir la carte en grand")}
                                                className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1 hover:underline"
                                            >
                                                Voir en grand <ChevronRight size={10} />
                                            </button>
                                        </div>

                                        <div className="h-32 w-full rounded-2xl bg-white/5 overflow-hidden relative border border-white/5">
                                            <img
                                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=200&fit=crop"
                                                className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"
                                            />
                                        </div>

                                        <div className="flex items-center gap-3 relative z-10">
                                            <div className="flex-1 bg-[#0b2b0b] border border-primary/20 rounded-xl p-3 flex items-center justify-between">
                                                <span className="text-[10px] font-black text-[#a3b1a3] uppercase">Visités</span>
                                                <span className="flex items-center gap-1.5 text-sm font-black">
                                                    <div className="w-2 h-2 rounded-full bg-primary" /> {countriesVisited}
                                                </span>
                                            </div>
                                            <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between">
                                                <span className="text-[10px] font-black text-[#a3b1a3] uppercase">Souhaités</span>
                                                <span className="flex items-center gap-1.5 text-sm font-black text-white/40">
                                                    <div className="w-2 h-2 rounded-full bg-white/20" /> 8
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Summary Widget */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-[#0c1a0c] p-8 rounded-[2rem] border border-white/5 space-y-4">
                                    <Diamond size={32} className="text-primary" />
                                    <h3 className="text-xl font-black">Points Privilège</h3>
                                    <p className="text-4xl font-black">1,250 <span className="text-sm text-[#a3b1a3] font-bold">XP</span></p>
                                    <p className="text-xs text-[#a3b1a3]">Expert Voyageur (Niveau 3)</p>
                                </div>
                                <div className="bg-[#0c1a0c] p-8 rounded-[2rem] border border-white/5 space-y-4">
                                    <Calendar size={32} className="text-primary" />
                                    <h3 className="text-xl font-black">Prochain voyage</h3>
                                    <p className="text-2xl font-black">{nextTrip ? (nextTrip.preferences || "Voyage sans titre") : "Aucun départ"}</p>
                                    <p className="text-xs text-[#a3b1a3]">
                                        {nextTrip
                                            ? `${Math.ceil((new Date(nextTrip.startDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))} jours • ${new Date(nextTrip.startDate).toLocaleDateString('fr-FR')}`
                                            : "Planifiez votre prochain voyage !"}
                                    </p>
                                </div>
                                <div className="bg-primary p-8 rounded-[2rem] text-black space-y-4 relative overflow-hidden group cursor-pointer">
                                    <Share2 size={32} />
                                    <h3 className="text-xl font-black">Parrainez un ami</h3>
                                    <p className="text-sm font-bold">Gagnez 500 XP pour chaque ami qui s'inscrit.</p>
                                    <button
                                        onClick={() => handleActionPlaceholder("Parrainage")}
                                        className="bg-black text-white text-[10px] font-black uppercase px-4 py-2 rounded-lg"
                                    >
                                        Inviter
                                    </button>
                                </div>
                            </div>

                            {/* Recent Activity or Suggestions */}
                            <div className="bg-[#0c1a0c] p-8 rounded-[2.5rem] border border-white/5">
                                <h3 className="text-2xl font-black mb-6">Conseils personnalisés</h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-white/5 rounded-2xl flex items-center gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black">!</div>
                                        <p className="text-sm">Votre visa pour le **Ghana** est-il prêt ? Pensez à vérifier les délais.</p>
                                    </div>
                                    <div className="p-4 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 font-black">?</div>
                                    <p className="text-sm">Découvrez les **joyaux cachés de Gorée** dans notre dernier guide.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === "Planifier un voyage" && (
                        <div className="bg-[#0c1a0c] border border-white/5 rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in duration-300 min-h-[750px] flex flex-col">

                            {/* Modern Progress Bar */}
                            <div className="flex h-1.5 w-full bg-white/5">
                                <div
                                    className="bg-primary transition-all duration-700 shadow-[0_0_15px_rgba(0,237,100,0.5)]"
                                    style={{ width: `${(wizardStep + 1) * 25}%` }}
                                />
                            </div>

                            {wizardStep === 0 ? (
                                <div className="flex flex-col md:flex-row flex-1">
                                    {/* Left Side (Visual) */}
                                    <div className="md:w-[40%] relative overflow-hidden hidden md:block group">
                                        <img
                                            src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80"
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[20s] group-hover:scale-110"
                                            alt="Africa Landscape"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a0c] via-[#0c1a0c]/20 to-transparent" />
                                        <div className="absolute bottom-12 left-10 right-10 space-y-6">
                                            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
                                                <MapIcon size={32} className="text-black" />
                                            </div>
                                            <h2 className="text-5xl font-black leading-tight italic">Votre héritage vous attend.</h2>
                                            <p className="text-[#a3b1a3] font-medium text-lg leading-relaxed">
                                                Reconnectez avec les terres de vos ancêtres à travers un itinéraire conçu sur mesure par notre IA experte.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right Side (Form) */}
                                    <div className="w-full md:w-[60%] p-10 md:p-16 flex flex-col justify-between animate-in fade-in duration-300">
                                        <div className="space-y-10">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-[10px] text-primary uppercase font-black tracking-[0.3em] mb-2">Étape 01</p>
                                                    <h3 className="text-3xl font-black">Choisissez votre destination</h3>
                                                </div>
                                                <button onClick={() => setActiveSection("Accueil")} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                                                    <Plus size={24} className="rotate-45" />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                                                {countries.map((c) => {
                                                    const isAvailable = c.id === 1 || c.name === "Côte d'Ivoire";
                                                    return (
                                                        <button
                                                            key={c.name}
                                                            disabled={!isAvailable}
                                                            onClick={() => {
                                                                if (!isAvailable) return;
                                                                setPlanningCountry(c.name);
                                                                setPlanningCityIds([]);
                                                            }}
                                                            className={`text-left p-6 rounded-[2rem] border transition-all relative overflow-hidden group/card ${!isAvailable ? "opacity-40 grayscale cursor-not-allowed" :
                                                                planningCountry === c.name
                                                                    ? "bg-primary/10 border-primary/40"
                                                                    : "bg-white/5 border-transparent hover:border-white/10 hover:bg-white/[0.08]"
                                                                }`}
                                                        >
                                                            <div className="flex items-center gap-4 relative z-10">
                                                                <span className="text-3xl filter grayscale group-hover/card:grayscale-0 transition-all">{c.flag || "🌍"}</span>
                                                                <div>
                                                                    <span className="font-black text-lg block">{c.name}</span>
                                                                    <span className="text-[10px] text-[#a3b1a3] font-bold uppercase tracking-widest leading-none">
                                                                        {isAvailable ? `${c.cities?.length || 0} destinations` : "Bientôt disponible"}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            {planningCountry === c.name && (
                                                                <div className="absolute right-6 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_rgba(0,237,100,0.8)]" />
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            {/* City Selection Overlay/Section */}
                                            {planningCountry && (
                                                <div className="space-y-6 pt-6 animate-in fade-in slide-in-from-top-4 duration-500 border-t border-white/5">
                                                    <div className="flex justify-between items-center text-white/40">
                                                        <div className="flex items-center gap-2">
                                                            <MapPin size={16} className="text-primary" />
                                                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Escales recommandées au {planningCountry}</span>
                                                        </div>
                                                        <span className="text-[10px] font-black bg-white/5 px-3 py-1 rounded-full text-white/60 uppercase">
                                                            MAX 3 VILLES
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-3">
                                                        {countries.find(c => c.name === planningCountry)?.cities?.map((city: any) => {
                                                            const isSelected = planningCityIds.some(id => String(id) === String(city.id));
                                                            return (
                                                                <button
                                                                    key={city.id}
                                                                    onClick={() => {
                                                                        setPlanningCityIds(prev => {
                                                                            if (isSelected) return prev.filter(id => String(id) !== String(city.id));
                                                                            if (prev.length >= 3) return prev;
                                                                            return [...prev, city.id];
                                                                        });
                                                                    }}
                                                                    className={`px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all border ${isSelected
                                                                        ? 'bg-primary text-black font-black shadow-primary/30'
                                                                        : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30 hover:text-white'
                                                                        }`}
                                                                >
                                                                    {city.name}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            disabled={!planningCountry || (planningCityIds?.length || 0) === 0}
                                            onClick={nextWizardStep}
                                            className="mt-12 bg-primary text-black w-full py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-sm hover:shadow-[0_0_50px_rgba(0,237,100,0.4)] disabled:opacity-20 disabled:grayscale transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                                        >
                                            Étape Suivante <ChevronRight size={22} strokeWidth={3} />
                                        </button>
                                    </div>
                                </div>
                            ) : wizardStep === 1 ? (
                                <div className="flex flex-col md:flex-row flex-1">
                                    {/* Left Side: Interactive Calendar */}
                                    <div className="w-full md:w-[40%] bg-[#050f05] p-10 md:p-16 flex flex-col justify-center border-r border-white/5 space-y-10 relative overflow-hidden">
                                        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

                                        <div className="space-y-4 relative z-10">
                                            <p className="text-[10px] text-primary uppercase font-black tracking-[0.3em]">Étape 02</p>
                                            <h3 className="text-4xl font-black italic">Logistique & Dates</h3>
                                            <p className="text-[#a3b1a3] font-medium leading-relaxed">
                                                Définissez la temporalité de votre mission et la composition de votre délégation.
                                            </p>
                                        </div>

                                        <div className="w-full max-w-sm bg-[#0c1a0c] border border-white/10 rounded-[2.5rem] p-8 space-y-8 shadow-2xl relative z-10 group">
                                            <div className="flex justify-between items-center text-white/60">
                                                <button onClick={() => changeMonth(-1)} className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors">
                                                    <ChevronLeft size={20} strokeWidth={3} />
                                                </button>
                                                <h4 className="font-black italic text-lg uppercase tracking-widest text-primary">
                                                    {calendarViewDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                                                </h4>
                                                <button onClick={() => changeMonth(1)} className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors">
                                                    <ChevronRight size={20} strokeWidth={3} />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-black text-[#a3b1a3] uppercase tracking-widest mb-4">
                                                {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => <div key={day}>{day}</div>)}
                                            </div>

                                            <div className="grid grid-cols-7 gap-y-1.5 gap-x-1 text-center min-h-[200px]">
                                                {renderCalendarDays()}
                                            </div>

                                            <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                                                <div className="space-y-1">
                                                    <p className="text-[9px] font-black text-[#a3b1a3] uppercase tracking-widest">Durée</p>
                                                    <p className="font-black text-primary text-xl italic">
                                                        {travelStartDate && travelEndDate
                                                            ? `${Math.ceil((new Date(travelEndDate).getTime() - new Date(travelStartDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} JOURS`
                                                            : "--"}
                                                    </p>
                                                </div>
                                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                                                    <Calendar size={24} className="text-primary" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side: Travelers & Flexibility */}
                                    <div className="w-full md:w-[60%] p-10 md:p-16 flex flex-col justify-between bg-[#0c1a0c]">
                                        <div className="space-y-12">
                                            <div className="flex items-center gap-4">
                                                <button onClick={() => setWizardStep(0)} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors group">
                                                    <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                                                </button>
                                                <h3 className="text-2xl font-black italic uppercase tracking-wider">Configuration Voyageurs</h3>
                                            </div>

                                            <div className="space-y-6">
                                                {/* Adults Counter */}
                                                <div className="bg-white/[0.03] border border-white/5 p-8 rounded-[2rem] flex items-center justify-between group hover:border-primary/20 transition-all shadow-lg">
                                                    <div className="flex items-center gap-6">
                                                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                                            <UserIcon size={32} />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-xl font-black italic">Adultes</h4>
                                                            <p className="text-[10px] text-[#a3b1a3] font-bold uppercase tracking-wider">À partir de 18 ans</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-6">
                                                        <button
                                                            onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                                                            className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-white/40 hover:text-white"
                                                        >
                                                            <Plus size={20} className="rotate-45" />
                                                        </button>
                                                        <span className="text-3xl font-black min-w-[2.5rem] text-center">{adultCount}</span>
                                                        <button
                                                            onClick={() => setAdultCount(adultCount + 1)}
                                                            className="w-12 h-12 rounded-xl bg-primary text-black flex items-center justify-center hover:shadow-[0_0_20px_rgba(0,237,100,0.4)] transition-all"
                                                        >
                                                            <Plus size={20} strokeWidth={3} />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Children Counter */}
                                                <div className="bg-white/[0.03] border border-white/5 p-8 rounded-[2rem] flex items-center justify-between group hover:border-primary/20 transition-all shadow-lg">
                                                    <div className="flex items-center gap-6">
                                                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-[#a3b1a3] group-hover:text-primary group-hover:bg-primary/10 transition-all">
                                                            <Users size={32} />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-xl font-black italic">Enfants</h4>
                                                            <p className="text-[10px] text-[#a3b1a3] font-bold uppercase tracking-wider">Moins de 18 ans</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-6">
                                                        <button
                                                            onClick={() => setChildCount(Math.max(0, childCount - 1))}
                                                            className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-white/40 hover:text-white"
                                                        >
                                                            <Plus size={20} className="rotate-45" />
                                                        </button>
                                                        <span className="text-3xl font-black min-w-[2.5rem] text-center">{childCount}</span>
                                                        <button
                                                            onClick={() => setChildCount(childCount + 1)}
                                                            className="w-12 h-12 rounded-xl bg-primary text-black flex items-center justify-center hover:shadow-[0_0_20px_rgba(0,237,100,0.4)] transition-all"
                                                        >
                                                            <Plus size={20} strokeWidth={3} />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div
                                                    onClick={() => setIsFlexible(!isFlexible)}
                                                    className={`p-8 rounded-[2rem] border transition-all cursor-pointer flex items-center justify-between group overflow-hidden relative ${isFlexible ? "bg-primary/10 border-primary/40" : "bg-white/[0.02] border-white/5 hover:border-white/10"}`}
                                                >
                                                    <div className="flex items-center gap-6 relative z-10">
                                                        <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${isFlexible ? "bg-primary border-primary" : "border-white/20 group-hover:border-white/40"}`}>
                                                            {isFlexible && <Plus size={18} className="text-black rotate-45" strokeWidth={3} />}
                                                        </div>
                                                        <span className="font-black text-sm uppercase tracking-widest text-[#a3b1a3] group-hover:text-white transition-colors">Mes dates sont flexibles (+/- 3 jours)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={nextWizardStep}
                                            disabled={!travelStartDate || !travelEndDate}
                                            className="mt-12 bg-primary text-black w-full py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-sm hover:shadow-[0_0_50px_rgba(0,237,100,0.4)] disabled:opacity-20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                                        >
                                            Suivant <ChevronRight size={22} strokeWidth={3} />
                                        </button>
                                    </div>
                                </div>
                            ) : wizardStep === 2 ? (
                                <div className="flex flex-col md:flex-row flex-1 w-full overflow-hidden">
                                    {/* Left Side: Inspiration */}
                                    <div className="md:w-[40%] relative overflow-hidden hidden md:block border-r border-white/5">
                                        <img
                                            src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=800&q=80"
                                            className="absolute inset-0 w-full h-full object-cover"
                                            alt="African Art"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a0c] via-transparent to-[#0c1a0c]/40" />
                                        <div className="absolute top-12 left-10 p-4 bg-primary text-black rounded-2xl transform -rotate-12 shadow-xl">
                                            <Diamond size={32} fill="currentColor" />
                                        </div>
                                        <div className="absolute bottom-12 left-10 right-10">
                                            <h2 className="text-4xl font-black leading-tight italic mb-4">Affinez votre expérience.</h2>
                                            <p className="text-[#a3b1a3] font-medium leading-relaxed">
                                                Vos centres d'intérêt nous permettent de sculpter un voyage qui résonne avec votre âme.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right Side: Interests Selection */}
                                    <div className="w-full md:w-[60%] p-10 md:p-16 flex flex-col justify-between bg-[#0c1a0c]">
                                        <div className="space-y-12">
                                            <div className="flex items-center gap-4">
                                                <button onClick={() => setWizardStep(1)} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors group">
                                                    <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                                                </button>
                                                <div>
                                                    <p className="text-[10px] text-primary uppercase font-black tracking-[0.3em]">Étape 03</p>
                                                    <h3 className="text-3xl font-black italic">Centres d'Intérêt</h3>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {[
                                                    { id: "CULTURE", label: "Culture & Artisanat", desc: "Héritage et marchés", icon: "🗿", color: "text-amber-600" },
                                                    { id: "GASTRONOMY", label: "Gastronomie", desc: "Saveurs locales", icon: "🍴", color: "text-orange-400" },
                                                    { id: "NATURE", label: "Nature", desc: "Terres sauvages", icon: "🦁", color: "text-emerald-500" },
                                                    { id: "BEACH", label: "Relaxation", desc: "Sérénité lagunaire", icon: "🌴", color: "text-blue-400" },
                                                    { id: "ADVENTURE", label: "Aventure", desc: "Exploration intense", icon: "🤠", color: "text-cyan-400" },
                                                    { id: "PHOTOGRAPHY", label: "Photographie", desc: "Spots visuels", icon: "📸", color: "text-pink-400" }
                                                ].map((item) => (
                                                    <button
                                                        key={item.id}
                                                        onClick={() => toggleInterest(item.id)}
                                                        className={`group flex flex-col items-center text-center p-8 rounded-[2.5rem] border transition-all duration-500 relative overflow-hidden ${selectedInterests.includes(item.id)
                                                            ? "bg-primary/10 border-primary/30 scale-[1.02] shadow-2xl shadow-[#00ed64]/5"
                                                            : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.05]"
                                                            }`}
                                                    >
                                                        <div className={`text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-500 ${selectedInterests.includes(item.id) ? "filter-none" : "grayscale opacity-50"}`}>
                                                            {item.icon}
                                                        </div>
                                                        <div className="relative z-10">
                                                            <h4 className={`font-black text-lg ${selectedInterests.includes(item.id) ? "text-primary" : "text-white/80"}`}>{item.label}</h4>
                                                            <p className="text-[10px] text-[#a3b1a3] font-bold uppercase tracking-widest mt-1">{item.desc}</p>
                                                        </div>
                                                        {selectedInterests.includes(item.id) && (
                                                            <div className="absolute top-6 right-6 w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_rgba(0,237,100,0.8)]" />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex pt-12 border-t border-white/5">
                                            <button
                                                onClick={nextWizardStep}
                                                disabled={selectedInterests.length === 0}
                                                className="bg-primary text-black w-full py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-sm hover:shadow-[0_0_50px_rgba(0,237,100,0.4)] disabled:opacity-20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                                            >
                                                Finaliser l'analyse <ChevronRight size={22} strokeWidth={3} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                                    {/* Success View - Immersive image */}
                                    <div className="md:w-[40%] relative overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80"
                                            className="absolute inset-0 w-full h-full object-cover animate-pulse-slow"
                                            alt="Baobab trees"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a0c] via-transparent to-transparent" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-32 h-32 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/30 flex items-center justify-center animate-bounce-slow">
                                                <Diamond size={48} className="text-primary" fill="currentColor" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 p-12 md:p-20 flex flex-col justify-center space-y-12 bg-[#0c1a0c] relative">
                                        <div className="space-y-6 relative z-10">
                                            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-4">
                                                Mission Configurée avec Succès
                                            </div>
                                            <h2 className="text-5xl font-black leading-tight italic">Prêt pour l'aventure, <br /><span className="text-primary">{user?.firstName}</span> !</h2>
                                            <p className="text-[#a3b1a3] text-xl font-medium leading-relaxed max-w-lg">
                                                Votre profil est synchronisé. Nos algorithmes préparent un itinéraire sur mesure pour votre retour aux sources.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                                            <div className="bg-[#050f05]/80 backdrop-blur-md border border-white/5 rounded-[2.5rem] p-8 space-y-6 hover:border-primary/20 transition-all group">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                                        <MapPin size={24} />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-bold text-[#a3b1a3] uppercase tracking-widest leading-none mb-1">Destination</p>
                                                        <p className="text-lg font-black text-white italic">{planningCountry}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {countries.find(c => c.name === planningCountry)?.cities
                                                        ?.filter((ct: any) => planningCityIds.some(id => String(id) === String(ct.id)))
                                                        ?.map((ct: any) => (
                                                            <span key={ct.id} className="px-3 py-1 bg-white/5 rounded-lg text-[9px] font-bold uppercase text-white/40 tracking-widest">{ct.name}</span>
                                                        ))
                                                    }
                                                </div>
                                            </div>

                                            <div className="bg-[#050f05]/80 backdrop-blur-md border border-white/5 rounded-[2.5rem] p-8 space-y-6 hover:border-primary/20 transition-all group">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                                        <Calendar size={24} />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-bold text-[#a3b1a3] uppercase tracking-widest leading-none mb-1">Temporalité</p>
                                                        <p className="text-lg font-black text-white italic">
                                                            {travelStartDate ? new Date(travelStartDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : '...'} - {travelEndDate ? new Date(travelEndDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : '...'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-[9px] font-black uppercase tracking-widest">
                                                        {adultCount} Adulte{adultCount > 1 ? 's' : ''}
                                                    </span>
                                                    {childCount > 0 && (
                                                        <span className="px-3 py-1 bg-white/5 text-white/40 rounded-lg text-[9px] font-black uppercase tracking-widest">
                                                            {childCount} Enfant{childCount > 1 ? 's' : ''}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-6 relative z-10">
                                            <button
                                                onClick={handleSaveTrip}
                                                className="w-full bg-primary text-black py-6 rounded-3xl font-black uppercase tracking-[0.3em] text-sm flex items-center justify-center gap-3 hover:shadow-[0_0_60px_rgba(0,237,100,0.4)] transition-all active:scale-[0.98]"
                                            >
                                                Sauvegarder la Mission <ChevronRight size={22} strokeWidth={3} />
                                            </button>
                                            <button
                                                onClick={() => setWizardStep(2)}
                                                className="w-full text-[#a3b1a3] font-bold text-[10px] uppercase tracking-[0.2em] hover:text-white transition-colors"
                                            >
                                                Ajuster les préférences
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeSection === "Voyages enregistrés" && (
                        <section className="space-y-12 animate-in fade-in duration-1000">
                            {/* Header Section */}
                            <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-white/5 pb-12">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 text-primary mb-2">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Archive des Missions</p>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black italic tracking-tight">Vos Récits de Voyage.</h2>
                                </div>
                                <nav className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar flex-nowrap pb-2">
                                    {["À venir", "Brouillons", "Historique"].map((tab) => {
                                        const count = tab === "À venir" ? voyages.filter(v => new Date(v.startDate) > now).length
                                            : tab === "Brouillons" ? voyages.filter(v => !v.isGenerated).length
                                                : voyages.filter(v => new Date(v.endDate) < now).length;
                                        return (
                                            <button
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                className={`group relative py-2 px-1 text-[10px] md:text-xs font-black tracking-widest uppercase transition-all whitespace-nowrap ${activeTab === tab ? "text-white" : "text-[#a3b1a3] hover:text-white"
                                                    }`}
                                            >
                                                <span className="relative z-10 flex items-center gap-2">
                                                    {tab}
                                                    <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold transition-all ${activeTab === tab ? "bg-primary text-black" : "bg-white/5 text-[#a3b1a3]"}`}>
                                                        {count}
                                                    </span>
                                                </span>
                                                {activeTab === tab && (
                                                    <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary shadow-primary/30" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </nav>
                            </div>

                            {/* Trips Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                {filteredVoyages.length > 0 ? filteredVoyages.map((v) => (
                                    <div key={v.id} className="group relative bg-[#050f05] border border-white/5 rounded-[3rem] overflow-hidden flex flex-col md:flex-row h-auto md:h-[320px] hover:border-primary/20 transition-all duration-700">
                                        {/* Image Section */}
                                        <div className="w-full md:w-[45%] relative h-64 md:h-full overflow-hidden">
                                            <img
                                                src={v.country?.image || "https://images.unsplash.com/photo-1596701062351-be4f6a45559c?w=600&fit=crop"}
                                                alt={v.title || "Voyage"}
                                                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#050f05] hidden md:block" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#050f05] via-transparent to-transparent md:hidden" />

                                            <div className="absolute top-6 left-6">
                                                <div className="px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${new Date(v.endDate) < now ? "bg-white/20" : "bg-primary shadow-[0_0_10px_rgba(0,237,100,0.5)]"}`} />
                                                    <span className="text-[9px] font-black text-white uppercase tracking-widest">
                                                        {new Date(v.endDate) < now ? "ARCHIVE" : v.isGenerated ? "CONFIRMÉ" : "BROUILLON"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Info Section */}
                                        <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
                                            <div className="space-y-4">
                                                <h4 className="text-3xl font-black italic text-white leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                                    {v.country?.name ? `${v.country.name}` : "Nouvelle Mission"}
                                                </h4>
                                                <div className="flex flex-wrap gap-2 opacity-60">
                                                    {v.cities?.slice(0, 3).map((city: any, idx: number) => (
                                                        <span key={idx} className="text-[10px] font-bold uppercase tracking-widest border-r border-white/20 pr-2 last:border-0 last:pr-0">
                                                            {city.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6 pt-6 border-t border-white/5">
                                                <div className="space-y-1 min-w-0">
                                                    <p className="text-[9px] font-black text-[#a3b1a3] uppercase tracking-[0.2em]">Départ</p>
                                                    <p className="text-sm font-black flex items-center gap-1.5 whitespace-nowrap">
                                                        <Calendar size={13} className="text-primary shrink-0" />
                                                        {new Date(v.startDate).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                                                    </p>
                                                </div>
                                                <div className="w-px h-8 bg-white/5" />
                                                <div className="space-y-1 min-w-0">
                                                    <p className="text-[9px] font-black text-[#a3b1a3] uppercase tracking-[0.2em]">Retour</p>
                                                    <p className="text-sm font-black whitespace-nowrap">
                                                        {new Date(v.endDate).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                                                    </p>
                                                </div>
                                                <div className="w-px h-8 bg-white/5" />
                                                <div className="space-y-1 min-w-0">
                                                    <p className="text-[9px] font-black text-[#a3b1a3] uppercase tracking-[0.2em]">Budget</p>
                                                    <p className="text-sm font-black text-primary whitespace-nowrap">{v.budget || "1500"}€</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 mt-8">
                                                <button
                                                    onClick={() => router.push(`/itineraires/${v.id}`)}
                                                    className="flex-1 bg-white/5 border border-white/10 hover:bg-primary hover:text-black hover:border-primary py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 group/btn active:scale-95"
                                                >
                                                    VOIR LE RÉCIT <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteVoyage(v.id)}
                                                    className="w-14 h-14 rounded-2xl border border-white/5 flex items-center justify-center text-white/10 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/20 transition-all active:scale-90"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-span-full py-32 text-center space-y-8 bg-white/[0.01] border border-dashed border-white/5 rounded-[4rem]">
                                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                                            <Bookmark size={40} className="text-white/10" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-black italic">Archive Vide</h3>
                                            <p className="text-[#a3b1a3] font-medium max-w-xs mx-auto text-sm">Votre histoire reste à écrire. Commencez par définir votre prochaine destination.</p>
                                        </div>
                                        <button onClick={() => setActiveSection("Planifier un voyage")} className="bg-primary text-black px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-[0_10px_30px_rgba(0,237,100,0.2)] hover:shadow-[0_20px_40px_rgba(0,237,100,0.4)] transition-all">
                                            LANCER UNE MISSION
                                        </button>
                                    </div>
                                )}

                                {/* Modern "Add Trip" Card */}
                                <button
                                    onClick={() => setActiveSection("Planifier un voyage")}
                                    className="group relative h-auto md:h-[320px] bg-white/[0.02] border-2 border-dashed border-white/5 rounded-[3.5rem] p-10 flex items-center justify-center overflow-hidden hover:bg-white/[0.04] hover:border-primary/20 transition-all duration-700"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#00ed64]/0 via-[#00ed64]/0 to-[#00ed64]/5 group-hover:to-[#00ed64]/10 transition-all" />
                                    <div className="relative z-10 flex flex-col items-center gap-6">
                                        <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center group-hover:bg-primary group-hover:rotate-12 transition-all duration-500 group-hover:shadow-[0_15px_30px_rgba(0,237,100,0.3)]">
                                            <Plus size={40} className="text-white/20 group-hover:text-black transition-colors" strokeWidth={3} />
                                        </div>
                                        <div className="text-center">
                                            <h4 className="text-2xl font-black italic mb-2 tracking-tight">Nouvelle Exploration</h4>
                                            <p className="text-[#a3b1a3] text-[10px] font-black uppercase tracking-[0.2em]">Ouvrez un nouveau chapitre</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </section>
                    )}

                    {activeSection === "Profil & Paramètres" && (
                        <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-700 pb-20">
                            {/* Hero Settings Section */}
                            <div className="flex flex-col md:flex-row items-end gap-8 mb-4">
                                <div className="relative group">
                                    <div className="w-40 h-40 rounded-3xl border-2 border-primary p-1.5 bg-[#050f05] shadow-[0_0_30px_rgba(0,237,100,0.1)]">
                                        <img
                                            src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop"
                                            alt="Profile Preview"
                                            className="w-full h-full rounded-2xl object-cover"
                                        />
                                        <button className="absolute -bottom-3 -right-3 w-10 h-10 bg-primary text-black rounded-xl flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                                            <Plus size={20} strokeWidth={3} />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-1">
                                    <h2 className="text-4xl font-black tracking-tight">{user?.firstName} {user?.lastName}</h2>
                                    <p className="text-[#a3b1a3] font-bold text-lg">Gérer les préférences de votre mission Aliniosié</p>
                                </div>
                                <div className="flex gap-3">
                                    {!isEditing ? (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all"
                                        >
                                            Modifier le profil
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => { setIsEditing(false); setEditedUser(user); }}
                                                className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all"
                                            >
                                                Annuler
                                            </button>
                                            <button
                                                onClick={handleSaveProfile}
                                                className="bg-primary text-black px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,237,100,0.4)] transition-all"
                                            >
                                                Sauvegarder
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Left Side: Account Info */}
                                <div className="lg:col-span-2 space-y-8">
                                    <div className="bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] p-10 space-y-10 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 opacity-5">
                                            <UserIcon size={120} />
                                        </div>

                                        <div className="space-y-4 relative z-10">
                                            <h3 className="text-xl font-black italic uppercase tracking-widest text-primary">Identité Personnelle</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] uppercase font-black text-[#a3b1a3] ml-1 tracking-widest">Prénom</label>
                                                    <input
                                                        type="text"
                                                        value={isEditing ? editedUser?.firstName : user?.firstName || ""}
                                                        onChange={(e) => setEditedUser({ ...editedUser, firstName: e.target.value })}
                                                        readOnly={!isEditing}
                                                        className={`w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none transition-all ${!isEditing ? "cursor-not-allowed text-white/40" : "focus:border-primary/50 focus:bg-white/[0.08]"}`}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] uppercase font-black text-[#a3b1a3] ml-1 tracking-widest">Nom de famille</label>
                                                    <input
                                                        type="text"
                                                        value={isEditing ? editedUser?.lastName : user?.lastName || ""}
                                                        onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })}
                                                        readOnly={!isEditing}
                                                        className={`w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none transition-all ${!isEditing ? "cursor-not-allowed text-white/40" : "focus:border-primary/50 focus:bg-white/[0.08]"}`}
                                                    />
                                                </div>
                                                <div className="space-y-2 md:col-span-2">
                                                    <label className="text-[10px] uppercase font-black text-[#a3b1a3] ml-1 tracking-widest">Adresse Email</label>
                                                    <input
                                                        type="email"
                                                        value={isEditing ? editedUser?.email : user?.email || ""}
                                                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                                                        readOnly={!isEditing}
                                                        className={`w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none transition-all ${!isEditing ? "cursor-not-allowed text-white/40" : "focus:border-primary/50 focus:bg-white/[0.08]"}`}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4 relative z-10 pt-4 border-t border-white/5">
                                            <h3 className="text-xl font-black italic uppercase tracking-widest text-primary">Localisation</h3>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase font-black text-[#a3b1a3] ml-1 tracking-widest">Pays de résidence (Diaspora)</label>
                                                <select
                                                    value={isEditing ? editedUser?.diasporaCountry : user?.diasporaCountry || ""}
                                                    onChange={(e) => setEditedUser({ ...editedUser, diasporaCountry: e.target.value })}
                                                    disabled={!isEditing}
                                                    className={`w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none appearance-none transition-all ${!isEditing ? "cursor-not-allowed text-white/40" : "focus:border-primary/50 focus:bg-white/[0.08]"}`}
                                                >
                                                    <option value="" disabled className="bg-[#0c1a0c]">Sélectionnez votre pays</option>
                                                    {countriesList.map((c) => (
                                                        <option key={c.code} value={c.name} className="bg-[#0c1a0c]">{c.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Security & Preferences */}
                                <div className="space-y-8">
                                    <div className="bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] p-10 space-y-8 h-full">
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4 text-primary">
                                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                                    <Diamond size={20} />
                                                </div>
                                                <h3 className="text-lg font-black italic uppercase tracking-widest">Sécurité</h3>
                                            </div>
                                            <p className="text-[#a3b1a3] text-sm leading-relaxed">
                                                Protégez votre compte en changeant régulièrement votre mot de passe.
                                            </p>
                                            <button
                                                onClick={() => handleActionPlaceholder("Changement de mot de passe")}
                                                className="w-full bg-white/5 border border-white/10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                                            >
                                                Modifier le mot de passe
                                            </button>
                                        </div>

                                        <div className="pt-8 border-t border-white/5 space-y-6">
                                            <div className="flex items-center gap-4 text-primary">
                                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                                    <Share2 size={20} />
                                                </div>
                                                <h3 className="text-lg font-black italic uppercase tracking-widest">Préférences</h3>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-bold text-white/60">Profil Public</span>
                                                    <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                                                        <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full shadow-lg" />
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-bold text-white/60">Newsletter Voyage</span>
                                                    <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer">
                                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white/20 rounded-full" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={logout}
                                            className="w-full mt-10 text-red-400 group flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest hover:text-red-300 transition-colors"
                                        >
                                            <LogOut size={16} /> Quitter la session
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </main>
            </div>
        </div>

    );
}

export default function ProfilPage() {
    return (
        <Suspense fallback={
            <div className="bg-[#050f05] min-h-screen text-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        }>
            <ProfilContent />
        </Suspense>
    );
}
