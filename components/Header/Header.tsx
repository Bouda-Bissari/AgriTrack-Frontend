'use client'

import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { ActiveLink } from "./activeLink";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <header className="w-full bg-[#16501F] py-2 px-5 mt-8 rounded-lg select-none">
                <div className="flex justify-between items-center max-w-[1200px] mx-auto text-white">
                    {/* Logo */}
                    <Link href="/">
                        <span className="font-bold text-[24px]">AgriTrack</span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-7">
                        <ActiveLink href="/">Accueil</ActiveLink>
                        <ActiveLink href="/a-propos">A propos</ActiveLink>
                        <div className="flex gap-2">
                            <Link href="/login">
                                <Button size="sm" variant="secondary">Se connecter</Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm" variant="default">S'inscrire</Button>
                            </Link>
                        </div>
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button onClick={() => setMenuOpen(true)} className="text-white">
                            <Menu size={28} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Overlay (semi-transparent fond noir) */}
            <div
                className={clsx(
                    "fixed top-0 right-0 w-full h-full bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300",
                    { "opacity-100 visible": menuOpen, "opacity-0 invisible": !menuOpen }
                )}
                onClick={() => setMenuOpen(false)}
            />

            {/* Drawer menu */}
            <div
                className={clsx(
                    "fixed top-0 right-0 h-full w-[250px] bg-[#16501F] text-white z-50 p-6 transform transition-transform duration-300",
                    {
                        "translate-x-0": menuOpen,
                        "translate-x-full": !menuOpen,
                    }
                )}
            >
                {/* Close button */}
                <div className="flex justify-end mb-4">
                    <button onClick={() => setMenuOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                {/* Menu content */}
                <nav className="flex flex-col space-y-6">
                    <Link href="/" onClick={() => setMenuOpen(false)}>Accueil</Link>
                    <Link href="/a-propos" onClick={() => setMenuOpen(false)}>A propos</Link>
                    <Link href="/login">
                        <Button size="sm" variant="secondary" className="w-full" onClick={() => setMenuOpen(false)}>
                            Se connecter
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button size="sm" variant="default" className="w-full" onClick={() => setMenuOpen(false)}>
                            S'inscrire
                        </Button>
                    </Link>
        

                </nav>
            </div>
        </>
    )
}

export default Header;
