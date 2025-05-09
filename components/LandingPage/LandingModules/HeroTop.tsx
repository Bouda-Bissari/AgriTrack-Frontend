'use client'

import Image from 'next/image';
import { Button } from '../../ui/button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const HeroTop = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    return (
        <motion.section 
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="min-h-screen flex justify-center items-center px-4 md:px-10 py-20 md:py-28 mt-16"
        >
            <div className="flex flex-col md:flex-row justify-between items-center gap-10 lg:gap-16 w-full max-w-7xl">
                <HeroLeft />
                <HeroRight />
            </div>
        </motion.section>
    )
}

const HeroLeft = () => {
    const router = useRouter();
    
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return(
        <motion.div 
            variants={itemVariants}
            className="flex-1 flex flex-col space-y-7 select-none text-center md:text-left"
        >
            <motion.h1 
                variants={itemVariants}
                className="font-bold font-poetsen text-4xl sm:text-5xl md:text-6xl leading-tight text-[#16501F]"
            >
                La plateforme pour les agriculteurs <span className="text-[#E49D62] font-poetsen">modernes</span>
            </motion.h1>
            
            <motion.p 
                variants={itemVariants}
                className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-700"
            >
                Simplifiez la gestion de votre exploitation agricole avec notre plateforme intuitive et complète. Suivez vos parcelles, planifiez vos interventions et optimisez votre rendement.
            </motion.p>
            
            <motion.div 
                variants={itemVariants}
                className='h-[48px] flex justify-center md:justify-start'
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button 
                        className='h-full px-6 py-4 text-base bg-[#E49D62] hover:bg-[#d08b4f] shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer' 
                        onClick={() => router.push("/register")}
                    >
                        Commencer maintenant <ArrowRight className="ml-2"/>
                    </Button>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

const HeroRight = () => {
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };
    
    return(
        <motion.div 
            variants={imageVariants}
            className="flex-1 w-full grid grid-cols-2 grid-rows-3 gap-4 p-4"
        >
            <motion.div 
                className="row-span-2 rounded-lg bg-[#CFF877] overflow-hidden order-1 shadow-md"
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            >   
                <div className="relative w-full h-full">
                    <Image 
                        src="/images/agri1.jpg"
                        alt="Agriculture moderne"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg hover:scale-110 transition-transform duration-700"                    
                    />
                </div>
            </motion.div>
            
            <motion.div 
                className="w-full h-30 order-2 rounded-lg bg-[#CFF877] overflow-hidden shadow-md"
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            >
                <div className="relative w-full h-full">
                    <Image 
                        src="/images/agri7.jpeg"
                        alt="Agriculture de précision"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg hover:scale-110 transition-transform duration-700"                    
                    />
                </div>
            </motion.div>
            
            <motion.div 
                className="row-span-2 rounded-lg bg-[#CFF877] order-3 overflow-hidden shadow-md"
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            >
                <div className="relative w-full h-full">
                    <Image 
                        src="/images/agri3.jpeg"
                        alt="Gestion agricole"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg hover:scale-110 transition-transform duration-700"                    
                    />
                </div>
            </motion.div>
            
            <motion.div 
                className="rounded-lg bg-[#CFF877] order-4 overflow-hidden shadow-md"
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            >
                <div className="relative w-full h-full">
                    <Image 
                        src="/images/agri6.jpeg"
                        alt="Technologies agricoles"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg hover:scale-110 transition-transform duration-700"                    
                    />
                </div>
            </motion.div>
        </motion.div>
    )
}

export default HeroTop;