"use client";

import Link from 'next/link';
import { Search, ChevronDown, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Init state check
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        setMounted(true);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    const navLinks = [
        { name: 'Accueil', href: '/' },
        { name: 'À propos', href: '/about' },
        { name: 'Destinations', href: '/destinations' },
        { name: 'Explorer', href: '/explorer' },
        // { name: 'Communauté', href: '/communaute' },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-4 bg-black/40 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center">
                        <Search size={18} className="text-black stroke-[3px]" />
                    </div>
                    <Link href="/" className="flex items-center space-x-3">
                        <span className="text-xl font-black tracking-tighter text-white uppercase italic">Aliniosié</span>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-10">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group ${isActive ? 'text-white' : 'text-white/50 hover:text-primary'}`}
                            >
                                {link.name}
                                {isActive && <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary rounded-full" />}
                            </Link>
                        );
                    })}
                </div>

                <div className="flex items-center gap-4 md:gap-6">
                    {mounted && (
                        <>
                            <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-black text-white/40 cursor-pointer hover:text-white transition-colors">
                                <span>FR</span>
                                <ChevronDown size={12} />
                            </div>
                            {isLoggedIn ? (
                                <Link href="/profil" className="flex items-center gap-2 bg-[#0c1a0c] hover:bg-white/10 text-white pl-2 pr-4 py-1.5 rounded-full transition-all border border-white/10 group">
                                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                                        <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <span className="hidden xs:block text-[11px] font-black uppercase tracking-wider">Profil</span>
                                </Link>
                            ) : (
                                <Link href="/login" className="bg-white/5 hover:bg-white/10 text-white px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all border border-white/10">
                                    Connexion
                                </Link>
                            )}

                            {/* Mobile Hamburger Button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl text-white hover:bg-white/10 transition-all border border-white/5"
                            >
                                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </>
                    )}
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-[90] bg-[#050f05]/98 backdrop-blur-2xl transition-all duration-500 lg:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                <div className="flex flex-col h-full pt-32 px-10 space-y-8 overflow-y-auto pb-20">

                    {/* Dashboard specific links ONLY if on /profil */}
                    {pathname === '/profil' && (
                        <div className="space-y-6 pb-6 border-b border-white/5 animate-in slide-in-from-top-4 duration-500">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Ma Mission</p>
                            <div className="flex flex-col gap-5">
                                {[
                                    { label: "Accueil", href: "/profil?section=Accueil" },
                                    { label: "Planifier un voyage", href: "/profil?section=Planifier un voyage" },
                                    { label: "Voyages enregistrés", href: "/profil?section=Voyages enregistrés" },
                                    { label: "Paramètres", href: "/profil?section=Profil & Paramètres" }
                                ].map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="text-2xl font-black italic tracking-tighter text-white/90 hover:text-primary transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">Navigation</p>
                    <div className="flex flex-col gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-2xl font-black italic tracking-tighter ${pathname === link.href ? 'text-primary' : 'text-white/40'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="pt-8 border-t border-white/5 space-y-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">Action</p>
                        <div className="flex flex-col gap-4">
                            {isLoggedIn ? (
                                <Link href="/profil" className="text-xl font-black italic text-white flex items-center gap-3">
                                    Mon Espace Personnel <ChevronDown className="-rotate-90 text-primary" size={20} />
                                </Link>
                            ) : (
                                <Link href="/login" className="text-xl font-black italic text-primary">
                                    Se connecter
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
