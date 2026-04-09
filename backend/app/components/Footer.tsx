"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Facebook, Twitter, Instagram, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
    const [showToast, setShowToast] = useState(false);

    const handleComingSoon = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <footer className="w-full bg-[#050a05] pt-24 pb-12 px-6 border-t border-white/5 relative">
            <div className="max-w-7xl mx-auto">
                {/* 3-Column Grid for perfect centering of Aide/Legal */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-8 mb-20 items-start">
                    
                    {/* Column 1: Logo (Left) */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center">
                                <Search size={22} className="text-black stroke-[3px]" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white italic uppercase">Aliniosié</span>
                        </div>
                        <p className="text-white/40 text-base font-sans leading-relaxed max-w-xs">
                            La première plateforme de planification de voyages dédiée aux explorateurs africains. Authenticité, simplicité et découverte.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram].map((Icon, i) => (
                                <Link 
                                    key={i} 
                                    href="#" 
                                    onClick={handleComingSoon}
                                    className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/30 transition-all font-sans"
                                >
                                    <Icon size={20} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Aide (Centered) */}
                    <div className="space-y-6 ">
                        <h4 className="text-white font-bold text-lg">Aide</h4>
                        <ul className="space-y-4 text-white/40 font-sans text-sm">
                            <li><Link href="#" onClick={handleComingSoon} className="hover:text-primary transition-colors">Centre d'aide</Link></li>
                            <li><Link href="#" onClick={handleComingSoon} className="hover:text-primary transition-colors">Sécurité</Link></li>
                            <li><Link href="#" onClick={handleComingSoon} className="hover:text-primary transition-colors">Politique d'annulation</Link></li>
                            <li><Link href="#" onClick={handleComingSoon} className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Légal (Right, but close to center if text is centered) */}
                    <div className="space-y-6">
                        <h4 className="text-white font-bold text-lg">Légal</h4>
                        <ul className="space-y-4 text-white/40 font-sans text-sm">
                            <li><Link href="#" onClick={handleComingSoon} className="hover:text-primary transition-colors">Conditions d'utilisation</Link></li>
                            <li><Link href="#" onClick={handleComingSoon} className="hover:text-primary transition-colors">Politique de confidentialité</Link></li>
                            <li><Link href="#" onClick={handleComingSoon} className="hover:text-primary transition-colors">Mentions légales</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-xs font-sans uppercase tracking-widest">
                    <p>© {new Date().getFullYear()} Aliniosié Inc. Tous droits réservés.</p>
                    <p className="flex items-center gap-1">Fait avec <Heart size={10} className="fill-primary text-primary" /> en Afrique</p>
                </div>
            </div>

            {/* Notification Toast */}
            {showToast && (
                <div className="fixed bottom-8 right-8 z-[200] animate-in fade-in slide-in-from-bottom-5 duration-500">
                    <div className="bg-primary text-black px-8 py-4 rounded-2xl font-black shadow-[0_20px_50px_rgba(0,237,100,0.3)] flex items-center gap-3 border border-white/20">
                        <Sparkles size={18} className="animate-pulse" />
                        <span className="text-[11px] uppercase tracking-[0.1em]">Bientôt disponible sur Aliniosié !</span>
                    </div>
                </div>
            )}
        </footer>
    );
}
