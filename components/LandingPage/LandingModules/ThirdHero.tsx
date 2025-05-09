import { IconType } from "react-icons";

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

    const card = DataList.map((data)=>{

        const Icon = data.icon;

        return(
            <div key={data.title} className="flex flex-col justify-center items-center gap-5 mb-10" >
                <div className=" flex justify-center items-center w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#E49D6231]">
                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#E49D6241]">
                        <Icon size={45} className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-[#E49D62]"/>
                        <span className="absolute -top-2 -right-4 text-[#E49D62] text-xl font-bold">{data.number}</span>
                    </div>
                </div>
                <h3 className=" text-xl md:text-2xl text-center font-bold">{data.title}</h3>
                <p className="text-center">{data.description}</p>
            </div>
        )
    });

  return (
    <>
        <div className="flex flex-col items-center justify-center gap-20 pt-12 mb-30">
            <div className="flex flex-col items-center justify-center gap-6">
                <div className="py-2 px-5 w-50 text-center rounded-full bg-[#E49D6285] ">
                    <h3>Comment ça marche</h3>
                </div>
                <h1 className="text-2xl md:text-4xl text-center font-extrabold tracking-wider">Une approche simple et efficace</h1>
                <div className="md:w-200 text-center">
                    <p className="md:text-xl">AgriTrack a été conçu pour simplifier votre travail quotidien et vous aider à prendre les meilleures décisions pour votre exploitation.</p>
                </div>
            </div>
            <div className="grid grid-row-3 md:grid-cols-3 gaps-5 w-full">
                {card}
            </div>
        </div>
    </>
  )
}

export default ThirdHero