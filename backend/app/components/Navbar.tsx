"use client";

import Link from 'next/link';
import { Search, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Init state check
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        setMounted(true);
    }, []);

    const navLinks = [
        { name: 'À propos', href: '/about' },
        { name: 'Destinations', href: '/destinations' },
        { name: 'Expériences', href: '#' },
        { name: 'Communauté', href: '#' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/40 backdrop-blur-xl border-b border-white/5">
            <div className="flex items-center gap-2">
                <div className="bg-[#00ed64] p-1.5 rounded-lg flex items-center justify-center">
                    <Search size={18} className="text-black stroke-[3px]" />
                </div>
                <Link href="/" className="flex items-center space-x-3">
                    <span className="text-xl font-black tracking-tighter text-white uppercase italic">Sankofa</span>
                </Link>
            </div>

            <div className="hidden md:flex items-center gap-10">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group ${isActive ? 'text-white' : 'text-white/50 hover:text-[#00ed64]'}`}
                        >
                            {link.name}
                            {isActive && <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#00ed64] rounded-full" />}
                        </Link>
                    );
                })}
            </div>

            <div className="flex items-center gap-6">
                {mounted ? (
                    <>
                        {/* Le bouton Nouveau Voyage a été retiré pour éviter la redondance */}
                        <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-black text-white/40 cursor-pointer hover:text-white transition-colors">
                            <span>FR</span>
                            <ChevronDown size={12} />
                        </div>
                        {isLoggedIn ? (
                            <Link href="/profil" className="flex items-center gap-2 bg-[#0c1a0c] hover:bg-white/10 text-white pl-2 pr-4 py-1.5 rounded-full transition-all border border-white/10 group">
                                <div className="w-7 h-7 rounded-full bg-[#00ed64] flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                                    {/* Minimalist user icon or initial */}
                                    <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <span className="text-[11px] font-black uppercase tracking-wider">Mon Profil</span>
                            </Link>
                        ) : (
                            <Link href="/login" className="bg-white/5 hover:bg-white/10 text-white px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all border border-white/10">
                                Connexion
                            </Link>
                        )}
                    </>
                ) : (
                    <div className="w-[84px] h-[36px] bg-white/5 rounded-xl animate-pulse" />
                )}
            </div>
        </nav >
    );
}
