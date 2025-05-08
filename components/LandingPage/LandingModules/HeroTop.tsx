'use client'

import Image from 'next/image';
import { Button } from '../../ui/button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from "next/navigation";



const HeroTop = () => {
    

  return (
        <section className="h-[clac(100% - 60px)] flex justify-center items-center px-4 md:px-10 ">
            <div className="flex flex-col md:flex-row justify-between items-center gap-5 py-17 w-full max-w-7xl">
                <HeroLeft />
                <HeroRight />
            </div>
        </section>

  )
}

const HeroLeft = () => {
    const router = useRouter();

    return(
        <div className="max-w-160 flex flex-col space-y-5 select-none text-center md:text-left">
            <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl">
                La plateforme pour les agriculteurs modernes
            </h1>
            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-600">
                Simplifiez la gestion de votre exploitation agricole avec notre plateforme intuitive et complète. Suivez vos parcelles, planifiez vos interventions et optimisez votre rendement.
            </p>
            <div className='h-[40px] flex justify-center md:justify-start'>
                <Button className='h-full  cursor-pointer' onClick={()=> router.push("/register")}>
                    Commencer maintenant <ArrowRight/>
                </Button>
            </div>
        </div>
    )
}

const HeroRight = () => {
    return(
        <div className="md:w-200 w-full grid grid-cols-2 grid-rows-3 gap-4 p-8 sm:p-4">
            <div className=" row-span-2 rounded-lg bg-[#CFF877] order-1">   
                <div className=" relative w-full h-full " >
                    <Image src="/images/agri1.jpg"
                        alt="ma photo"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"                    
                    />
                </div>
            </div>
            <div className="w-full h-30  order-2 rounded-lg bg-[#CFF877]">
                <div className=" relative w-full h-full " >
                    <Image src="/images/agri7.jpeg"
                        alt="ma photo"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"                    
                    />
                </div>
            </div>
            <div className="row-span-2 rounded-lg bg-[#CFF877] order-3">
                <div className=" relative w-full h-full " >
                    <Image src="/images/agri3.jpeg"
                        alt="ma photo"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"                    
                    />
                </div>
            </div>
            <div className="rounded-lg bg-[#CFF877] order-4">
                <div className=" relative w-full h-full " >
                    <Image src="/images/agri6.jpeg"
                        alt="ma photo"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"                    
                    />
                </div>
            </div>
        </div>
    )
}


export default HeroTop;