"use client";

import React, { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import {
    Users,
    MessageSquare,
    Share2,
    Heart,
    MapPin,
    Calendar,
    Search,
    Filter,
    ArrowRight,
    Play,
    Globe,
    CheckCircle2,
    Compass,
    Plus,
    ChevronDown,
    UserPlus
} from 'lucide-react';
import Image from 'next/image';
import Footer from '@/app/components/Footer';

const CommunityPage = () => {
    const [activeTab, setActiveTab] = useState('Feed');

    const feedPosts = [
        {
            id: 1,
            user: "Aissata K.",
            avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop",
            location: "Gorée, Sénégal",
            time: "Il y a 2h",
            content: "Quelle émotion de fouler le sol de l'Île de Gorée pour la première fois. Un voyage nécessaire pour comprendre mes racines. Si vous y allez, ne manquez pas le petit atelier d'artisanat près de l'église.",
            image: "https://images.unsplash.com/photo-1764377850160-d6250764116f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            likes: 124,
            comments: 18,
            tags: ["#RetourAuxSources", "#Sénégal", "#Diaspora"]
        },
        {
            id: 2,
            user: "Marc-Antoine D.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
            location: "Accra, Ghana",
            time: "Il y a 5h",
            content: "Le Year of Return n'était qu'un début. L'énergie créative à Accra en ce moment est juste incroyable ! Qui est dans le coin pour un verre ce soir à Osu ?",
            image: "https://images.unsplash.com/photo-1765217993868-ec400500c0bc?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            likes: 89,
            comments: 32,
            tags: ["#Ghana", "#AccraNightlife", "#BeyondTheReturn"]
        }
    ];

    const upcomingMeetups = [
        {
            title: "Dîner Networking Diaspora",
            date: "22 Mars",
            location: "Dakar, Sénégal",
            attendees: 12,
            image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&fit=crop"
        },
        {
            title: "Workshop Art & Patrimoine",
            date: "05 Avril",
            location: "Lomé, Togo",
            attendees: 8,
            image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ];

    const travelRequests = [
        {
            id: 1,
            user: "Amara K.",
            verified: true,
            trips: 42,
            avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop",
            badge: "LUXURY",
            destination: "Cape Town, South Africa",
            timeline: "Oct 12 - Oct 20, 2026",
            desc: "Looking for 2 more travel buddies to explore the Winelands and take a helicopter tour of the coast. Planning a mix of fine dining and nature hikes!",
            sought: 2,
            found: 1,
            foundAvatars: ["https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=50&h=50&fit=crop"]
        },
        {
            id: 2,
            user: "Kofi O.",
            verified: true,
            trips: 15,
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
            badge: "ADVENTURE",
            destination: "Mt. Kilimanjaro, Tanzania",
            timeline: "Nov 05 - Nov 15, 2026",
            desc: "Climbing the Machame route! Looking for a group of experienced hikers to tackle the peak. I have most of the gear, just need a solid team to share the experience.",
            sought: 4,
            found: 0,
            foundAvatars: []
        }
    ];

    const suggestedCompanions = [
        { name: "Jabari M.", tags: "Safari, Culture", avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=100&h=100&fit=crop" },
        { name: "Sarah T.", tags: "Backpacker, Solo", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
        { name: "Kwame B.", tags: "Luxury, Beaches", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    ];

    return (
        <div className="bg-[#050f05] min-h-screen text-white font-sans">
            <Navbar />

            {/* Hero Section */}
            <header className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(0,237,100,0.1)_0%,_transparent_70%)] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10 text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00ed64]/10 border border-[#00ed64]/20 text-[#00ed64] text-xs font-black uppercase tracking-widest animate-fade-in">
                        <Users size={14} /> La Communauté Aliniosié
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none">
                        Reconnecter les <br />
                        <span className="text-[#00ed64]">générations.</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-[#a3b1a3] text-lg font-medium">
                        Partagez vos histoires, trouvez des compagnons de voyage et échangez avec ceux qui ont déjà fait le grand saut du retour.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 pt-4">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="w-12 h-12 rounded-full border-4 border-[#050f05] overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <span className="font-black text-xl">+12,500</span>
                            <span className="text-[10px] text-[#a3b1a3] font-black uppercase tracking-widest">Membres Actifs</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Grid */}
            <main className="max-w-7xl mx-auto px-6 pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Left Sidebar - Navigation/Filters */}
                <aside className="lg:col-span-3 space-y-8 order-2 lg:order-1">
                    <div className="bg-[#0c1a0c] border border-white/5 rounded-[2rem] p-6 space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-xs font-black text-[#a3b1a3] uppercase tracking-[0.2em] px-2">Espaces</h3>
                            <nav className="space-y-1">
                                {[
                                    { name: 'Fil d\'actualité', icon: <Globe size={18} />, id: 'Feed' },
                                    { name: 'Recherche Co-voyage', icon: <Users size={18} />, id: 'Travel' },
                                    { name: 'Groupes par Pays', icon: <MapPin size={18} />, id: 'Groups' },
                                    { name: 'Rencontres', icon: <Calendar size={18} />, id: 'Meetups' },
                                    { name: 'Discussions', icon: <MessageSquare size={18} />, id: 'Chat' },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all font-bold text-sm ${activeTab === item.id ? 'bg-[#00ed64] text-black shadow-[0_0_20px_rgba(0,237,100,0.2)]' : 'hover:bg-white/5 text-[#a3b1a3] hover:text-white'}`}
                                    >
                                        {item.icon} {item.name}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="pt-6 border-t border-white/5 space-y-4">
                            <h3 className="text-xs font-black text-[#a3b1a3] uppercase tracking-[0.2em] px-2">Tags Populaires</h3>
                            <div className="flex flex-wrap gap-2 px-2">
                                {['#Diaspora', '#Entreprenariat', '#Roots', '#Culture'].map(tag => (
                                    <span key={tag} className="text-[10px] font-bold text-white/40 hover:text-[#00ed64] cursor-pointer transition-colors">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* App Promotion Card */}
                    <div className="bg-gradient-to-br from-[#00ed64] to-[#00b04a] rounded-[2rem] p-8 text-black relative overflow-hidden group">
                        <div className="relative z-10 space-y-4">
                            <h3 className="text-2xl font-black leading-tight italic">Gardez le contact mobile.</h3>
                            <p className="text-sm font-bold opacity-80">Recevez des notifications pour les rencontres près de chez vous.</p>
                            <button className="bg-black text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform active:scale-95">
                                Télécharger l'App
                            </button>
                        </div>
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-black/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                    </div>
                </aside>

                {/* Center Column - Feed */}
                <div className="lg:col-span-6 space-y-8 order-1 lg:order-2">
                    {/* Search & Post Bar */}
                    <div className="bg-[#0c1a0c] border border-white/5 rounded-[2rem] p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-white/5">
                            <img src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=100&h=100&fit=crop" alt="me" />
                        </div>
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Partagez votre voyage..."
                                className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-4 pr-10 text-sm focus:outline-none focus:border-[#00ed64]/30 focus:bg-white/10 transition-all font-medium"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20">
                                <Search size={18} />
                            </div>
                        </div>
                        <button className="bg-[#00ed64] text-black w-12 h-12 rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
                            <Play size={18} fill="currentColor" />
                        </button>
                    </div>

                    {/* Feed Tab Control Mobile */}
                    <div className="flex lg:hidden overflow-x-auto gap-4 py-2 scroller-hide">
                        {['Populaire', 'Récent', 'Suivis', 'Événements'].map(t => (
                            <button key={t} className="px-6 py-3 bg-white/5 rounded-full text-xs font-black uppercase tracking-widest border border-white/5 whitespace-nowrap">
                                {t}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'Travel' ? (
                        <div className="space-y-6">
                            {/* Travel Filters */}
                            <div className="flex flex-wrap gap-4 mb-8">
                                {[
                                    { icon: <MapPin size={16} />, label: "Destination" },
                                    { icon: <Calendar size={16} />, label: "Dates" },
                                    { icon: <Compass size={16} />, label: "Interests" }
                                ].map((filter, i) => (
                                    <button key={i} className="flex items-center gap-2 bg-[#0c1a0c] border border-white/10 px-5 py-3 rounded-xl hover:border-[#00ed64]/40 transition-all font-bold text-sm">
                                        <span className="text-[#a3b1a3]">{filter.icon}</span>
                                        {filter.label}
                                        <ChevronDown size={14} className="text-[#a3b1a3] ml-2" />
                                    </button>
                                ))}
                                <button className="ml-auto bg-[#00ed64] text-black px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,237,100,0.3)] transition-all">
                                    <Plus size={18} strokeWidth={3} /> Créer une annonce
                                </button>
                            </div>

                            {travelRequests.map(req => (
                                <div key={req.id} className="bg-[#0c1a0c] border border-white/5 rounded-3xl p-8 hover:border-[#00ed64]/20 transition-all">
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <img src={req.avatar} alt={req.user} className="w-14 h-14 rounded-full object-cover" />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-black text-xl">{req.user}</h3>
                                                    {req.verified && <CheckCircle2 size={16} className="text-[#00ed64]" fill="currentColor" stroke="black" />}
                                                </div>
                                                <p className="text-[#a3b1a3] text-sm font-medium">Nigeria • {req.trips} Trips</p>
                                            </div>
                                        </div>
                                        <span className="bg-[#00ed64]/10 text-[#00ed64] border border-[#00ed64]/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                            {req.badge}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                        <div>
                                            <p className="text-[10px] text-[#a3b1a3] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                                                <MapPin size={12} className="text-[#00ed64]" /> Destination
                                            </p>
                                            <p className="font-bold text-lg">{req.destination}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-[#a3b1a3] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                                                <Calendar size={12} className="text-[#00ed64]" /> Timeline
                                            </p>
                                            <p className="font-bold text-lg">{req.timeline}</p>
                                        </div>
                                    </div>

                                    <p className="text-[#a3b1a3] leading-relaxed font-medium mb-8 text-[15px]">
                                        {req.desc}
                                    </p>

                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="flex -space-x-3">
                                                <div className="w-8 h-8 rounded-full border-2 border-[#0c1a0c] bg-white/10 flex items-center justify-center relative z-10">
                                                    <UserPlus size={14} className="text-[#00ed64]" />
                                                </div>
                                                {req.foundAvatars.map((ava, idx) => (
                                                    <img key={idx} src={ava} className="w-8 h-8 rounded-full border-2 border-[#0c1a0c] object-cover relative" style={{ zIndex: 9 - idx }} />
                                                ))}
                                            </div>
                                            <span className="text-[#a3b1a3] text-sm font-medium">
                                                {req.sought} sought • {req.found} found
                                            </span>
                                        </div>

                                        <div className="flex gap-3">
                                            <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-6 py-3 rounded-xl font-bold transition-all text-sm">
                                                <MessageSquare size={16} className="text-[#00ed64]" /> Message
                                            </button>
                                            <button className="bg-[#00ed64] hover:bg-[#00cc55] text-black px-8 py-3 rounded-xl font-black transition-all text-sm flex items-center gap-2 hover:shadow-[0_0_15px_rgba(0,237,100,0.3)]">
                                                Join Trip
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : activeTab === 'Feed' ? (
                        <div className="space-y-8">
                            {feedPosts.map(post => (
                                <article key={post.id} className="bg-[#0c1a0c] border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-white/10 transition-all duration-500">
                                    <div className="p-8 space-y-6">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#00ed64]/20 p-0.5">
                                                    <img src={post.avatar} alt={post.user} className="w-full h-full rounded-full object-cover" />
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-white">{post.user}</h4>
                                                    <div className="flex items-center gap-2 text-[#a3b1a3] text-[10px] font-bold uppercase tracking-widest">
                                                        <MapPin size={10} className="text-[#00ed64]" /> {post.location} • {post.time}
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="text-white/20 hover:text-white transition-colors">
                                                <Share2 size={20} />
                                            </button>
                                        </div>

                                        <p className="text-[#a3b1a3] leading-relaxed font-medium">
                                            {post.content}
                                        </p>

                                        {post.image && (
                                            <div className="relative h-96 rounded-[2rem] overflow-hidden">
                                                <img src={post.image} alt="post content" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                            </div>
                                        )}

                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.map(tag => (
                                                <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-[#00ed64] bg-[#00ed64]/10 px-3 py-1.5 rounded-lg border border-[#00ed64]/10">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="pt-6 border-t border-white/5 flex items-center gap-8">
                                            <button className="flex items-center gap-2 text-white/40 hover:text-pink-500 transition-colors group/btn">
                                                <Heart size={20} className="group-hover/btn:fill-pink-500 transition-all" />
                                                <span className="text-xs font-black">{post.likes}</span>
                                            </button>
                                            <button className="flex items-center gap-2 text-white/40 hover:text-[#00ed64] transition-colors group/btn">
                                                <MessageSquare size={20} className="group-hover/btn:fill-[#00ed64]/20 transition-all" />
                                                <span className="text-xs font-black">{post.comments}</span>
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center border border-white/5 rounded-[2rem] bg-[#0c1a0c]">
                            <h3 className="text-xl font-bold text-white/40">Espace bientôt disponible</h3>
                        </div>
                    )}
                </div>

                {/* Right Sidebar */}
                <aside className="lg:col-span-3 space-y-8 order-3">
                    {activeTab === 'Travel' ? (
                        <div className="space-y-8">
                            {/* Suggested Companions */}
                            <div className="bg-[#0c1a0c] border border-white/5 rounded-[2rem] p-6">
                                <h3 className="flex items-center gap-2 text-sm font-black mb-6">
                                    <Users size={16} className="text-[#00ed64]" /> Suggested Companions
                                </h3>
                                <div className="space-y-5">
                                    {suggestedCompanions.map((comp, idx) => (
                                        <div key={idx} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <img src={comp.avatar} alt={comp.name} className="w-10 h-10 rounded-full object-cover" />
                                                <div>
                                                    <p className="font-bold text-sm">{comp.name}</p>
                                                    <p className="text-[#a3b1a3] text-[10px]">{comp.tags}</p>
                                                </div>
                                            </div>
                                            <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#00ed64] hover:bg-[#00ed64] hover:text-black transition-all">
                                                <UserPlus size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full py-3 mt-6 border border-white/10 rounded-xl text-xs font-black text-[#00ed64] hover:bg-white/5 transition-colors">
                                    View All Matches
                                </button>
                            </div>

                            {/* Recommended Card */}
                            <div className="bg-[#0c1a0c] rounded-[2rem] overflow-hidden relative group border border-white/5 cursor-pointer">
                                <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a0c] via-black/40 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <span className="text-[10px] text-[#00ed64] font-black uppercase tracking-widest mb-1 block">Recommended</span>
                                    <h4 className="font-bold leading-tight line-clamp-2">Serengeti Group Safari: 3 slots left for November!</h4>
                                </div>
                            </div>
                        </div>
                    ) : activeTab === 'Feed' ? (
                        <div className="space-y-8">
                            <div className="bg-[#0c1a0c] border border-white/5 rounded-[2rem] p-8 space-y-8">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xs font-black text-[#a3b1a3] uppercase tracking-[0.2em]">Meetups À Venir</h3>
                                    <button className="text-[#00ed64] hover:underline text-[10px] font-black uppercase tracking-widest">Tout voir</button>
                                </div>

                                <div className="space-y-6">
                                    {upcomingMeetups.map((meetup, idx) => (
                                        <div key={idx} className="group cursor-pointer space-y-3">
                                            <div className="relative h-32 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                                                <img src={meetup.image} alt={meetup.title} className="w-full h-full object-cover rounded-2xl" />
                                                <div className="absolute top-3 left-3 bg-[#00ed64] text-black px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">
                                                    {meetup.date}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-black text-white group-hover:text-[#00ed64] transition-colors line-clamp-1">{meetup.title}</h4>
                                                <div className="flex justify-between items-center mt-1">
                                                    <span className="text-[10px] text-[#a3b1a3] font-bold">{meetup.location}</span>
                                                    <span className="text-[10px] text-[#00ed64] font-black uppercase tracking-widest">{meetup.attendees} inscrits</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full py-4 border border-[#00ed64]/30 text-[#00ed64] rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#00ed64] hover:text-black transition-all">
                                    Créer un meetup
                                </button>
                            </div>

                            <div className="bg-[#0c1a0c] border border-white/5 rounded-[2rem] p-8 space-y-6">
                                <h3 className="text-xs font-black text-[#a3b1a3] uppercase tracking-[0.2em]">Top Contributeurs</h3>
                                <div className="space-y-4">
                                    {[1, 2].map(i => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                                                <img src={`https://i.pravatar.cc/100?u=contributor${i}`} alt="user" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-black italic">User_{i}45</p>
                                                <div className="w-full h-1 bg-white/5 rounded-full mt-1.5 overflow-hidden">
                                                    <div className="h-full bg-[#00ed64] rounded-full" style={{ width: `${90 - i * 15}%` }} />
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-black text-[#00ed64]">{1250 / i} XP</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="py-20 text-center border border-white/5 rounded-[2rem] bg-[#0c1a0c]">
                            <h3 className="text-xl font-bold text-white/40">Espace bientôt disponible</h3>
                        </div>
                    )}
                </aside>
            </main>
            <Footer />
        </div>
    );
};

export default CommunityPage;
