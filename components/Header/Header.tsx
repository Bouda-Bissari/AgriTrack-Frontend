'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ActiveLink } from "./activeLink";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    return (
        <>
            <motion.header 
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={clsx(
                    "fixed top-0 w-[80%] py-3 px-5 z-30 transition-all duration-300", 
                    scrolled ? "bg-[#16501F]/95 backdrop-blur-sm shadow-lg" : "bg-[#16501F] mt-8 rounded-lg"
                )}
            >
                <div className="flex justify-between items-center max-w-[1200px] mx-auto text-white">
                    {/* Logo */}
                    <Link href="/">
                        <motion.span 
                            className="font-bold text-2xl md:text-3xl uppercase"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            AgriTrack
                        </motion.span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-7">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                            className="flex items-center gap-7"
                        >
                            <motion.div whileHover={{ y: -2 }} transition={{ type: "spring" }}>
                                <ActiveLink href="/">Accueil</ActiveLink>
                            </motion.div>
                            <motion.div whileHover={{ y: -2 }} transition={{ type: "spring" }}>
                                <ActiveLink href="/a-propos">A propos</ActiveLink>
                            </motion.div>
                        </motion.div>
                        
                        <motion.div 
                            className="flex gap-3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Link href="/login">
                                <Button 
                                    size="sm" 
                                    variant="secondary"
                                    className="transition-all hover:shadow-md"
                                >
                                    Se connecter
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button 
                                    size="sm" 
                                    variant="default"
                                    className="bg-[#E49D62] hover:bg-[#d08b4f] transition-all hover:shadow-md"
                                >
                                    S'inscrire
                                </Button>
                            </Link>
                        </motion.div>
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <motion.button 
                            onClick={() => setMenuOpen(true)} 
                            className="text-white p-1"
                            whileTap={{ scale: 0.9 }}
                        >
                            <Menu size={28} />
                        </motion.button>
                    </div>
                </div>
            </motion.header>

            {/* Overlay (semi-transparent dark background) */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-0 right-0 w-full h-full bg-black/50 backdrop-blur-sm z-40"
                        onClick={() => setMenuOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Drawer menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 20 }}
                        className="fixed top-0 right-0 h-full w-[280px] bg-[#16501F] text-white z-50 p-6 shadow-xl"
                    >
                        {/* Close button */}
                        <div className="flex justify-end mb-8">
                            <motion.button 
                                onClick={() => setMenuOpen(false)}
                                whileTap={{ scale: 0.9 }}
                            >
                                <X size={24} />
                            </motion.button>
                        </div>

                        {/* Menu content */}
                        <nav className="flex flex-col space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Link 
                                    href="/" 
                                    onClick={() => setMenuOpen(false)}
                                    className="text-lg font-medium hover:text-[#CFF877] transition-colors"
                                >
                                    Accueil
                                </Link>
                            </motion.div>
                            
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Link 
                                    href="/a-propos" 
                                    onClick={() => setMenuOpen(false)}
                                    className="text-lg font-medium hover:text-[#CFF877] transition-colors"
                                >
                                    A propos
                                </Link>
                            </motion.div>
                            
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Link href="/login">
                                    <Button 
                                        size="sm" 
                                        variant="secondary" 
                                        className="w-full mb-4" 
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Se connecter
                                    </Button>
                                </Link>
                            </motion.div>
                            
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Link href="/register">
                                    <Button 
                                        size="sm" 
                                        variant="default" 
                                        className="w-full bg-[#E49D62] hover:bg-[#d08b4f]" 
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        S'inscrire
                                    </Button>
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Header;