'use client'

// icons
import { LuLandPlot } from "react-icons/lu";
import { LuCalendar } from "react-icons/lu";
import { LuTractor } from "react-icons/lu";

import { IconType } from "react-icons";
import { Button } from "../../ui/button";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Définir le type de chaque objet dans DataList
interface IDataItem {
  icon: IconType;
  title: string;
  description: string;
  secDescription: string;
}

const DataList: IDataItem[] = [
    {
        icon: LuLandPlot,
        title: "Gestion des parcelles",
        description: "Suivez facilement l'état de vos parcelles, de la plantation à la récolte.",
        secDescription:"Visualisez rapidement les informations clés de chaque parcelle : superficie, type de culture, date de plantation, etc.", 
    },
    {
        icon: LuCalendar,
        title: "Planification des interventions",
        description: "Organisez et enregistrez toutes vos interventions : semis, irrigation, fertilisation, etc.",
        secDescription:"Gardez une trace de toutes les actions menées sur vos parcelles et optimisez votre gestion.", 
    },
    {
        icon: LuTractor,
        title: "Analyse et suivi",
        description: "Analysez vos données et suivez l'évolution de vos cultures au fil du temps.",
        secDescription:"Obtenez des statistiques précises sur vos rendements, vos coûts et vos bénéfices.", 
    },
];

const SecondHero = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };
    
    const titleVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const card = DataList.map((data, index) => {
        const Icon = data.icon;

        const cardVariants = {
            hidden: { opacity: 0, y: 50 },
            visible: { 
                opacity: 1, 
                y: 0,
                transition: { 
                    duration: 0.6, 
                    ease: "easeOut",
                    delay: index * 0.2
                }
            }
        };

        return (
            <motion.div 
                key={data.title} 
                variants={cardVariants}
                whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                }}
                className="flex flex-col justify-center items-center overflow-hidden bg-[#16501F]/95 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
                <motion.div 
                    className="p-6 md:p-8"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <Icon size={52} className="text-[#E49D62]"/> 
                </motion.div>
                <div className="flex-grow p-6">
                    <h3 className="text-xl md:text-2xl text-center text-[#E8FCC2] font-bold mb-3">{data.title}</h3>
                    <p className="mt-2 text-center text-sm md:text-base text-[#E8FCC2] opacity-90">{data.description}</p>    
                    <p className="md:mt-3 mt-2 text-center text-[#E8FCC2] opacity-80 text-sm md:text-base">{data.secDescription}</p>
                </div>
            </motion.div>
        )
    });
    
    return (
        <motion.div 
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="flex flex-col gap-16 items-center justify-center py-20 mb-10 px-4"
        >
            <motion.div 
                className="text-center p-4 max-w-3xl"
                variants={titleVariants}
            >
                <motion.h1 
                    className="text-3xl md:text-5xl font-extrabold mb-8 tracking-wider text-[#16501F]"
                    variants={titleVariants}
                >
                    Pourquoi choisir <span className="text-[#E49D62]">AgriTrack</span> ?
                </motion.h1>
                <motion.p 
                    className="text-md md:text-xl text-gray-700"
                    variants={titleVariants}
                >
                    AgriTrack vous offre une solution complète pour la gestion de vos parcelles et interventions agricoles.
                </motion.p>
            </motion.div>
            
            <div className="w-full max-w-[1200px] grid md:grid-cols-3 grid-rows-1 gap-6 px-4" >
                {card}
            </div>

            <motion.div
                variants={titleVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Button className="px-8 py-6 text-base md:text-lg bg-[#E49D62] hover:bg-[#d08b4f] shadow-lg hover:shadow-xl transition-all duration-300">
                    Commencer à utiliser AgriTrack
                </Button>
            </motion.div>
        </motion.div>
    )
}

export default SecondHero;