'use client'

import { IconType } from "react-icons";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// icons
import { LuSettings } from "react-icons/lu";
import { LuChartLine } from "react-icons/lu";
import { LuTractor } from "react-icons/lu";

interface IDataItem {
    icon: IconType;
    number: string;
    title: string;
    description: string;
}

const DataList: IDataItem[] = [
    {
        icon: LuTractor,
        number: '01',
        title: "Enregistrez vos parcelles",
        description: "Créez votre exploitation virtuelle en ajoutant toutes vos parcelles avec leurs caractéristiques spécifiques.",
    },
    {
        icon: LuSettings,
        number: '02',
        title: "Suivez vos interventions",
        description: "Documentez chaque intervention agricole que vous effectuez, du semis à la récolte.",
    },
    {
        icon: LuChartLine,
        number: '03',
        title: "Analysez vos données",
        description: "Obtenez des insights précieux grâce à des rapports et des statistiques avancées sur votre activité.",
    },
];
    
const ThirdHero = () => {
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
            hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
            visible: { 
                opacity: 1, 
                x: 0,
                transition: { 
                    duration: 0.7, 
                    ease: "easeOut",
                    delay: index * 0.2
                }
            }
        };

        return (
            <motion.div 
                key={data.title} 
                variants={cardVariants}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex flex-col justify-center items-center gap-5 px-4 h-auto mb-8"
            >
                <div className="flex justify-center items-center w-28 h-28 md:w-32 md:h-32 rounded-full bg-[#E49D6231] shadow-lg">
                    <motion.div 
                        className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#E49D6241] flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    >
                        <Icon size={50} className="text-[#E49D62]"/>
                        <motion.span 
                            className="absolute -top-2 -right-4 text-[#E49D62] text-2xl font-bold"
                            whileHover={{ scale: 1.2 }}
                        >
                            {data.number}
                        </motion.span>
                    </motion.div>
                </div>
                <h3 className="text-xl md:text-2xl text-center font-bold text-[#16501F] mt-2">{data.title}</h3>
                <p className="text-center text-gray-700 mb-4">{data.description}</p>
            </motion.div>
        );
    });

    return (
        <motion.div 
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="flex flex-col items-center justify-center gap-16 py-16 px-4 bg-gray-50 "
        >
            <motion.div 
                className="flex flex-col items-center justify-center gap-6"
                variants={containerVariants}
            >
                <motion.div 
                    className="py-2 px-6 text-center rounded-full bg-[#E49D6285] shadow-md"
                    variants={titleVariants}
                    whileHover={{ scale: 1.05 }}
                >
                    <h3 className="font-medium">Comment ça marche</h3>
                </motion.div>
                <motion.h1 
                    className="text-3xl md:text-5xl text-center font-extrabold tracking-wider text-[#16501F]"
                    variants={titleVariants}
                >
                    Une approche <span className="text-[#E49D62]">simple et efficace</span>
                </motion.h1>
                <motion.div 
                    className="max-w-2xl text-center"
                    variants={titleVariants}
                >
                    <p className="md:text-xl text-gray-700">AgriTrack a été conçu pour simplifier votre travail quotidien et vous aider à prendre les meilleures décisions pour votre exploitation.</p>
                </motion.div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 w-full max-w-[1200px]">
                {card}
            </div>
        </motion.div>
    );
}

export default ThirdHero;