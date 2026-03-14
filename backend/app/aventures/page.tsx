"use client";

import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  Compass,
  Sparkles,
  Map,
  Heart,
  MapPin,
  Search,
  Calendar,
  Users,
  TreePalm,
  Tent,
  ShoppingBag,
  Utensils,
  History,
  Mountain,
  Music,
  Flower2,
  Camera,
  Info,
  ChevronLeft,
  ChevronRight,
  Plus
} from "lucide-react";

export default function Aventures() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    countryId: "",
    cityIds: [] as (number | string)[], // Liste des villes sélectionnées
    startDate: "",
    endDate: "",
    budget: 50,
    interests: [] as string[],
    adults: 2,
    children: 0,
    isFlexible: false
  })

  // Charger les données sauvegardées au montage du composant
  useEffect(() => {
    const savedData = localStorage.getItem("pendingItinerary");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Si les anciennes données ne contiennent pas cityIds, on initialise un tableau vide
        if (parsed && !parsed.cityIds) {
          parsed.cityIds = parsed.cityId ? [parsed.cityId] : [];
        }
        setFormData(parsed);
        // On reste à l'étape 1 par défaut pour que l'utilisateur voit son choix
        setStep(1);
      } catch (e) {
        console.error("Erreur lors de la restauration de l'itinéraire", e);
      }
    }
  }, []);

  // Sauvegarder les données à chaque changement
  useEffect(() => {
    // On ne sauvegarde que si les données ne sont pas vides (état initial)
    if (formData.countryId || formData.interests.length > 0) {
      localStorage.setItem("pendingItinerary", JSON.stringify(formData));
    }
  }, [formData]);

  const [calendarViewDate, setCalendarViewDate] = useState(new Date());

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const changeMonth = (offset: number) => {
    setCalendarViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + offset, 1));
  };

  const renderCalendarDays = () => {
    const year = calendarViewDate.getFullYear();
    const month = calendarViewDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = (getFirstDayOfMonth(year, month) + 6) % 7; // Adjust to start with Monday

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-9 h-9 sm:w-10 sm:h-10" />);
    }

    const todayStr = new Date().toISOString().split('T')[0];

    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const isPast = dateStr < todayStr;
      const isStart = formData.startDate === dateStr;
      const isEnd = formData.endDate === dateStr;
      const isInRange = formData.startDate && formData.endDate && dateStr > formData.startDate && dateStr < formData.endDate;

      days.push(
        <button
          key={i}
          type="button"
          disabled={isPast}
          onClick={() => {
            if (isPast) return;
            if (!formData.startDate || (formData.startDate && formData.endDate)) {
              updateField('startDate', dateStr);
              updateField('endDate', "");
            } else if (dateStr > formData.startDate) {
              updateField('endDate', dateStr);
            } else {
              updateField('startDate', dateStr);
            }
          }}
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mx-auto text-xs sm:text-sm transition-all relative ${isStart || isEnd
            ? "bg-[#00ed64] text-black font-black z-10 shadow-[0_0_15px_rgba(0,237,100,0.4)]"
            : isInRange
              ? "bg-[#00ed64]/20 text-[#00ed64]"
              : isPast
                ? "opacity-10 cursor-not-allowed"
                : "hover:bg-white/10"
            }`}
        >
          {i}
        </button>
      );
    }
    return days;
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  };

  const toggleInterest = (id: string) => {
    const current = formData.interests;
    const isSelected = current.includes(id);

    const next = isSelected
      ? current.filter(item => item !== id)
      : [...current, id]

    updateField("interests", next)
  }

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('/api/countries');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Erreur chargement pays:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);


  const selectCountry = (id: string) => {
    updateField("countryId", id);
    updateField("cityIds", []); // Réinitialiser les villes si on change de pays
  };


  const interests = [
    { id: 'NATURE', icon: <Mountain size={24} />, label: "Nature & Safari" },
    { id: 'CULTURE', icon: <History size={24} />, label: "Culture & Histoire" },
    { id: 'GASTRONOMY', icon: <Utensils size={24} />, label: "Gastronomie" },
    { id: 'BEACH', icon: <TreePalm size={24} />, label: "Plage & Détente" },
    { id: 'ADVENTURE', icon: <Tent size={24} />, label: "Aventure" },
    { id: 'ART', icon: <ShoppingBag size={24} />, label: "Artisanat & Marchés" },
    { id: 'PHOTOGRAPHY', icon: <Camera size={24} />, label: "Photographie" },
    { id: 'RELAXATION', icon: <Flower2 size={24} />, label: "Bien-être & Spa" },
  ];

  const getBudgetLabel = () => {
    if (formData.budget < 33) return "Économique";
    if (formData.budget < 66) return "Modéré";
    return "Luxe";
  };

  const nextStep = () => {
    if (step === 1 && (!formData.countryId || formData.cityIds.length === 0)) {
      alert("Veuillez sélectionner une destination et au moins une ville avant de continuer.");
      return;
    }
    if (step === 2 && (!formData.startDate || !formData.endDate)) {
      alert("Veuillez sélectionner vos dates de voyage avant de continuer.");
      return;
    }
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };
  const prevStep = () => step > 1 && setStep(step - 1);

  const handleGenerate = async () => {
    if (!formData.countryId || formData.cityIds.length === 0 || !formData.startDate || !formData.endDate || formData.interests.length === 0) {
      alert("Veuillez remplir toutes les étapes (y compris au moins une ville) avant de générer votre itinéraire.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        // Sauvegarder une dernière fois pour être sûr
        localStorage.setItem("pendingItinerary", JSON.stringify(formData));
        alert("Veuillez vous connecter pour enregistrer votre itinéraire. Vos choix ont été sauvegardés !");
        router.push("/login?redirect=/aventures");
        return;
      }

      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          cityId: formData.cityIds[0], // On envoie la première ville pour la compatibilité backend (ou tout le tableau si le backend l'accepte)
          cityIds: formData.cityIds
        })
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          alert("Votre session a expiré ou est invalide. Veuillez vous reconnecter.");
          router.push("/login");
          return;
        }
        throw new Error(result.error || "Erreur lors de la génération de l'itinéraire");
      }

      alert("Génial ! Ton aventure est enregistrée !");
      localStorage.removeItem("pendingItinerary"); // Nettoyer après succès
      router.push("/profil"); // Redirection vers le profil pour voir ses itinéraires

    } catch (error: any) {
      alert(error.message || "Une erreur est survenue lors de la génération");
    }

    // Ici, vous pouvez envoyer formData à votre backend pour générer l'itinéraire
    console.log("Données du formulaire:", formData);
  }

  return (
    <div className="bg-[#050f05] min-h-screen text-white font-sans selection:bg-[#00ed64]/30">
      <Navbar />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-4">
            <span className="text-[10px] md:text-xs font-black tracking-[0.2em] text-[#a3b1a3] uppercase">
              Préférences de voyage
            </span>
            <span className="text-[10px] md:text-xs font-semibold text-[#a3b1a3]">
              Étape {step} sur {totalSteps}
            </span>
          </div>
          <div className="h-[4px] w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00ed64] transition-all duration-700 ease-out shadow-[0_0_15px_rgba(0,237,100,0.5)]"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-8">
          {step === 1 && (
            <section className="bg-[#0c1a0c] border border-white/5 rounded-[2rem] p-6 md:p-10 space-y-6">
              <div className="flex items-center gap-3">
                <MapPin className="text-[#00ed64]" size={22} />
                <h2 className="text-xl font-bold">Où souhaitez-vous aller ?</h2>
              </div>

              {/* Search Bar */}
              {/* <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#00ed64] transition-colors" size={18} />
                  <input
                    type="text"
                    placeholder="Rechercher un pays, une région ou une ville (ex: Tanzanie, Le Cap...)"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#00ed64]/50 focus:ring-4 focus:ring-[#00ed64]/10 transition-all"
                  />
                </div> */}

              {/* Country Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {loading ? (
                  // Skeleton loading
                  [1, 2, 3].map((i) => (
                    <div key={i} className="h-44 rounded-[1.5rem] bg-white/5 animate-pulse" />
                  ))
                ) : (
                  countries.map((country) => (
                    <button
                      key={country.id}
                      onClick={() => selectCountry(country.id)}
                      className={`relative h-44 rounded-[1.5rem] overflow-hidden border-2 transition-all duration-300 group ${formData.countryId == country.id ? 'border-[#00ed64]' : 'border-white/5 hover:border-white/20'
                        }`}
                    >
                      <img
                        src={country.imageMap}
                        alt={country.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Subtle overlay */}
                      <div className={`absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors ${formData.countryId == country.id ? 'opacity-20' : 'opacity-40'}`} />

                      <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <span className="text-base font-bold tracking-tight">{country.name}</span>
                      </div>

                      {/* Radio-style circle at bottom right */}
                      <div className={`absolute bottom-6 right-6 w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${formData.countryId == country.id ? 'bg-[#00ed64] border-[#00ed64] shadow-[0_0_10px_rgba(0,237,100,0.5)]' : 'border-white/30 bg-black/20'
                        }`}>
                        {formData.countryId == country.id && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
                      </div>
                    </button>
                  ))
                )}

                {/* <button className="h-44 rounded-[1.5rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-all text-white/40 hover:text-white/60">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                      <MapPinPlusInside size={20} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider">Explorer partout</span>
                  </button> */}
              </div>

              {/* City Selection - Appears once a country is selected */}
              {formData.countryId && (
                <div className="space-y-4 pt-4 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="flex justify-between items-center text-white/40">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span className="text-xs font-black uppercase tracking-widest leading-none">Villes de destination</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${(formData.cityIds?.length || 0) === 3 ? 'text-[#00ed64] border-[#00ed64]/30 bg-[#00ed64]/10' : 'text-white/20 border-white/5'}`}>
                      {(formData.cityIds?.length || 0)}/3 sélectionnés
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {countries.find(c => c.id == formData.countryId)?.cities?.map((city: any) => {
                      const isSelected = formData.cityIds.some(id => String(id) === String(city.id));
                      return (
                        <button
                          key={city.id}
                          type="button"
                          onClick={() => {
                            const current = formData.cityIds || [];
                            const next = isSelected
                              ? current.filter(id => String(id) !== String(city.id))
                              : current.length < 3
                                ? [...current, city.id]
                                : current;
                            updateField("cityIds", next);
                          }}
                          className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all border ${isSelected
                            ? 'bg-[#00ed64] text-black border-[#00ed64] shadow-[0_0_20px_rgba(0,237,100,0.3)]'
                            : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20 hover:bg-white/10'
                            }`}
                        >
                          {city.name}
                        </button>
                      );
                    })}
                    {(!countries.find(c => c.id == formData.countryId)?.cities || countries.find(c => c.id == formData.countryId)?.cities.length === 0) && (
                      <p className="text-sm text-white/30 italic">Bientôt d'autres villes...</p>
                    )}
                  </div>
                  {formData.cityIds.length === 3 && (
                    <p className="text-[9px] text-[#00ed64] font-bold uppercase tracking-widest italic animate-pulse">Maximum 3 villes par itinéraire</p>
                  )}
                </div>
              )}
            </section>
          )}
          {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] p-8 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500 h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="text-[#00ed64]" size={22} />
                    <h2 className="text-xl font-black">Quand partez-vous ?</h2>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => changeMonth(-1)} className="p-2 hover:text-[#00ed64] transition-colors"><ChevronLeft size={20} strokeWidth={3} /></button>
                    <button onClick={() => changeMonth(1)} className="p-2 hover:text-[#00ed64] transition-colors"><ChevronRight size={20} strokeWidth={3} /></button>
                  </div>
                </div>

                <div className="space-y-6 flex-1">
                  <div className="text-center">
                    <p className="text-[10px] text-[#00ed64] uppercase font-black tracking-[0.3em] mb-1">
                      {calendarViewDate.toLocaleDateString('fr-FR', { year: 'numeric' })}
                    </p>
                    <h4 className="font-black italic text-2xl uppercase tracking-widest text-white">
                      {calendarViewDate.toLocaleDateString('fr-FR', { month: 'long' })}
                    </h4>
                  </div>

                  <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-black text-[#a3b1a3] uppercase tracking-widest">
                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(day => <div key={day}>{day}</div>)}
                  </div>

                  <div className="grid grid-cols-7 gap-y-2 gap-x-2 text-center">
                    {renderCalendarDays()}
                  </div>

                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Date sélectionnée</p>
                      <p className="text-xs font-black italic text-[#00ed64]">
                        {formData.startDate ? new Date(formData.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : '...'}
                        {formData.endDate ? ` — ${new Date(formData.endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}` : ''}
                      </p>
                    </div>
                    {formData.startDate && formData.endDate && (
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Durée</p>
                        <p className="text-sm font-black italic text-white">
                          {Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} jours
                        </p>
                      </div>
                    )}
                  </div>

                  {/* <label className="flex items-center gap-3 cursor-pointer group bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-all mt-auto">
                    <input
                      type="checkbox"
                      checked={formData.isFlexible}
                      onChange={(e) => updateField('isFlexible', e.target.checked)}
                      className="w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-[#00ed64] transition-all"
                    />
                    <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors">Mes dates sont flexibles (+/- 3 jours)</span>
                  </label> */}
                </div>
              </section>

              <section className="bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 h-full flex flex-col">
                <div className="flex items-center gap-3">
                  <Users className="text-[#00ed64]" size={22} />
                  <h2 className="text-xl font-black">Voyageurs</h2>
                </div>
                <div className="space-y-6 flex-1">
                  {[
                    { label: "Adultes", sub: "18 ans et plus", field: "adults", count: formData.adults },
                    { label: "Enfants", sub: "0 - 17 ans", field: "children", count: formData.children }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/5 p-6 rounded-[2rem] flex items-center justify-between group hover:border-white/10 transition-all">
                      <div>
                        <h4 className="text-lg font-black italic leading-none mb-1">{item.label}</h4>
                        <p className="text-[10px] text-[#a3b1a3] font-bold uppercase tracking-wider">{item.sub}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => updateField(item.field, Math.max(item.field === 'adults' ? 1 : 0, item.count - 1))}
                          className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-white/40 hover:text-white"
                        >
                          <Plus size={18} className="rotate-45" />
                        </button>
                        <span className="text-2xl font-black min-w-[2rem] text-center">{item.count}</span>
                        <button
                          onClick={() => updateField(item.field, item.count + 1)}
                          className="w-10 h-10 rounded-xl bg-[#00ed64] text-black flex items-center justify-center hover:scale-105 transition-all shadow-[0_0_15px_rgba(0,237,100,0.2)]"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-[#00ed64]/5 border border-[#00ed64]/10 rounded-[2rem] p-6 space-y-2 mt-auto">
                  <p className="text-[10px] text-[#00ed64] uppercase font-black tracking-widest italic">Note de l'Assistant</p>
                  <p className="text-xs text-white/60 leading-relaxed italic">
                    Pour les familles, nous sélectionnons des logements avec des équipements adaptés aux enfants.
                  </p>
                </div>
              </section>
            </div>
          )}

          {step === 3 && (
            <>
              <section className="bg-[#0c1a0c] border border-white/5 rounded-[2rem] p-6 md:p-10 space-y-8">
                <div className="flex items-center gap-3">
                  <Heart className="text-[#00ed64]" size={22} fill="#00ed64" />
                  <h2 className="text-xl font-bold">Qu'est-ce qui vous fait vibrer ?</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {interests.map((interest) => (
                    <button onClick={() => toggleInterest(interest.id)} key={interest.id}

                      className={`bg-white/5 border ${formData.interests.includes(interest.id) ? 'border-[#00ed64]' : 'border-white/5'} rounded-2xl p-6 flex flex-col items-center justify-center gap-4  hover:border-[#00ed64]/30 hover:bg-[#00ed64]/5 transition-all group}`}>
                      <div className="text-white/40 group-hover:text-[#00ed64] transition-colors">{interest.icon}</div>
                      <span className="text-xs font-semibold text-white/60 group-hover:text-white transition-colors">{interest.label}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="bg-[#0c1a0c] border border-white/5 rounded-[2rem] p-6 md:p-10 space-y-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sparkles className="text-[#00ed64]" size={22} />
                    <h2 className="text-xl font-bold">Quel est votre budget ?</h2>
                  </div>
                  <span className="text-[#00ed64] font-bold text-sm tracking-wide">{getBudgetLabel()}</span>
                </div>

                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.budget}
                    onChange={(e) => updateField('budget', parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#00ed64]"
                  />
                  <div className="flex justify-between mt-4 text-[10px] uppercase tracking-widest font-black text-white/20">
                    <span>Économique</span>
                    <span>Modéré</span>
                    <span>Luxe</span>
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-5 flex gap-4 border border-white/5">
                  <div className="w-10 h-10 rounded-full bg-[#00ed64]/10 flex items-center justify-center shrink-0">
                    <Info className="text-[#00ed64]" size={18} />
                  </div>
                  <p className="text-xs text-[#a3b1a3] leading-relaxed">
                    Un budget modéré inclut généralement des hôtels 3-4 étoiles, des activités guidées et des repas dans des restaurants locaux de qualité.
                  </p>
                </div>
              </section>
            </>
          )}

          {/* FOOTER BUTTONS */}
          <div className="pt-8 flex gap-4">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="px-10 py-5 rounded-2xl font-bold bg-white/5 text-white/60 hover:bg-white/10 transition-all active:scale-95">
                Retour
              </button>
            )}

            <button
              onClick={step === 3 ? handleGenerate : nextStep}
              className="flex-1 bg-[#00ed64] text-[#050f05] py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(0,237,100,0.4)] transition-all hover:scale-[1.02] active:scale-95 group">
              {step === 3 ? "Générer mon itinéraire" : "Suivant"}
              <ArrowRight size={22} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}