// icons
import { LuLandPlot } from "react-icons/lu";
import { LuCalendar } from "react-icons/lu";
import { LuTractor } from "react-icons/lu";

import { IconType } from "react-icons";
import { Button } from "../../ui/button";

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

    const card = DataList.map((data) =>{

        const Icon = data.icon;

        return (
            <div key={data.title} className="flex flex-col justify center items-center overflow-hidden">
                <div className="p-3 md:p-6"><Icon size={46} className="text-[#E49D62]"/> </div>
                <div className="flex-grow p-6">
                    <h3 className="text-xl md:text-2xl text-center text-[#E8FCC2] font-bold">{data.title}</h3>
                    <p className="mt-2 text-center text-sm md:text-base text-[#E8FCC2]">{data.description}</p>    
                    <p className="md:mt-2 mt-1 text-center text-[#E8FCC2]">{data.secDescription}</p>
                </div>
            </div>
        )
    });
    
  return (
    <>
        <div className="flex flex-col gap-10 items-center justify-center mb-30">
            <div className=" text-center p-8">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-8 tracking-wider">Pourquoi choisir AgriTrack ?</h1>
                <p className="text-md md:text-xl">AgriTrack vous offre une solution complète pour la gestion de vos parcelles et interventions agricoles.</p>
            </div>
            
            <div className="w-full max-w-[1200px] grid md:grid-cols-3 grid-row-3 p-3 rounded-lg gap-5 bg-[#16501F]" >
                {card}
            </div>

            <div>
                <Button className="px-6 py-3 text-base md:text-lg">Commencer à utiliser AgriTrack</Button>
            </div>
        </div>
    </>
  )
}

export default SecondHero