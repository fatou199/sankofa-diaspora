"use client";

import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, User, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            localStorage.setItem("token", data.token);

            // Gestion de la redirection après connexion
            const searchParams = new URLSearchParams(window.location.search);
            const redirectPath = searchParams.get("redirect") || "/profil";

            router.push(redirectPath);
        } catch (error: any) {
            setError(error.message || "Erreur de connexion");
        }
    }

    return (
        <div className="min-h-screen w-full flex font-sans overflow-hidden bg-[#050f05]">

            {/* Left Side - Visual Hero (Mirrored from Register) */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-center p-24 bg-[#0c1a0c]">
                <Link href="/" className="absolute top-12 left-12 z-20 text-white/70 hover:text-[#00ed64] transition-all group drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                    <ArrowLeft size={32} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
                </Link>
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2071&auto=format&fit=crop"
                        alt="African Landscape"
                        fill
                        className="object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#050f05] via-[#050f05]/90 to-transparent" />
                </div>

                <div className="relative z-10 space-y-12">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#00ed64] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,237,100,0.5)] transform rotate-6">
                            <div className="w-5 h-5 bg-black rounded-sm rotate-45" />
                        </div>
                        <span className="text-2xl font-black text-white tracking-tighter uppercase italic">Aliniosié</span>
                    </div>

                    <div className="space-y-6 max-w-lg">
                        <h1 className="text-6xl md:text-7xl font-black text-white leading-tight">
                            Bon retour <br /> parmi nous.
                        </h1>
                        <p className="text-xl text-[#a3b1a3] font-medium leading-relaxed">
                            Poursuivez votre exploration là où vous l'avez laissée. Votre prochain carnet de voyage vous attend.
                        </p>
                    </div>

                    <div className="flex items-center gap-6 pt-10">
                        <div className="flex -space-x-4">
                            {[4, 5, 6].map((i) => (
                                <div key={i} className="w-12 h-12 rounded-full border-4 border-[#050f05] bg-white/10 relative overflow-hidden shadow-xl">
                                    <img
                                        src={`https://i.pravatar.cc/100?u=${i + 20}`}
                                        alt="Member"
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="space-y-1">
                            <p className="text-white font-black text-lg">Prêt à explorer ?</p>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-[#00ed64] animate-pulse" />
                                <span className="text-[10px] font-black text-[#00ed64] uppercase tracking-widest">Membre vérifié</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-12 left-24 z-10">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
                        © 2026 Aliniosié.
                    </p>
                </div>
            </div>

            {/* Right Side - Form (Login Version) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
                <div className="w-full max-w-[500px] space-y-10">
                    <div className="space-y-2 text-center lg:text-left">
                        <h2 className="text-4xl font-black text-white tracking-tight">Espace Client</h2>
                        <p className="text-[#a3b1a3] font-medium">Entrez vos identifiants pour accéder à votre profil.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] uppercase tracking-widest font-black text-[#a3b1a3] ml-1">Adresse E-mail</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#00ed64] transition-colors" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nom@exemple.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#00ed64]/50 focus:ring-4 focus:ring-[#00ed64]/10 transition-all placeholder:text-white/10"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[10px] uppercase tracking-widest font-black text-[#a3b1a3]">Mot de passe</label>
                                {/* <Link href="#" className="text-[10px] font-black text-[#00ed64] hover:text-white transition-all underline decoration-[#00ed64]/30 underline-offset-4">Oublié ?</Link> */}
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#00ed64] transition-colors" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-12 text-sm text-white focus:outline-none focus:border-[#00ed64]/50 focus:ring-4 focus:ring-[#00ed64]/10 transition-all placeholder:text-white/10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <button className="w-full bg-[#00ed64] text-black py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,237,100,0.4)] transition-all hover:scale-[1.02] active:scale-95 group shadow-xl">
                            Se connecter <ArrowRight size={18} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="space-y-8 pt-4">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                            <div className="relative flex justify-center"><span className="bg-[#050f05] px-4 text-[10px] font-black text-[#a3b1a3] uppercase tracking-[0.2em]">Où via vos réseaux</span></div>
                        </div>

                        <div className="flex justify-center gap-6">
                            {[
                                {
                                    name: "google",
                                    paths: [
                                        "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
                                        "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
                                        "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z",
                                        "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    ]
                                },
                                {
                                    name: "facebook",
                                    paths: ["M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"]
                                },
                                {
                                    name: "apple",
                                    paths: ["M12.152 6.896c-.548 0-1.411-.516-2.438-.516-1.357 0-2.714.787-3.447 2.067-1.472 2.541-.375 6.324 1.055 8.356.697.986 1.54 2.094 2.628 2.053 1.04-.041 1.432-.67 2.686-.67 1.253 0 1.625.67 2.721.65 1.116-.021 1.838-1 2.53-2.016.799-1.166 1.134-2.296 1.15-2.35-.027-.013-2.213-.852-2.24-3.37-.024-2.106 1.713-3.111 1.79-3.16-.982-1.442-2.515-1.608-3.058-1.642-1.458-.094-2.28.514-2.877.514zm1.187-2.618c.616-.745 1.018-1.785.899-2.822-.882.036-1.954.59-2.587 1.332-.572.658-1.077 1.722-.942 2.741.977.076 1.996-.481 2.63-1.251z"]
                                }
                            ].map((social) => (
                                <button key={social.name} className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all hover:scale-110 active:scale-90 shadow-xl group">
                                    <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
                                        {social.paths.map((p, i) => (
                                            <path key={i} d={p} />
                                        ))}
                                    </svg>
                                </button>
                            ))}
                        </div>

                        <div className="text-center pt-2">
                            <p className="text-xs text-[#a3b1a3] font-medium">
                                Nouveau sur Aliniosié ?{" "}
                                <Link href="/register" className="text-[#00ed64] font-black hover:underline tracking-tight">
                                    Créer un profil membre
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
