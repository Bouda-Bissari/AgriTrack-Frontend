import Header from "../Header/Header"
import HeroTop from "./LandingModules/HeroTop"
import SecondHero from "./LandingModules/SecondHero"
import ThirdHero from "./LandingModules/ThirdHero"

const LandingPageView = () => {
  return (
    <>
        <div className=" bg-[#E8FCC2] px-20 flex flex-col justify-center items-center pb-8">
            <Header/>
            <HeroTop/>
            <SecondHero/>
            <ThirdHero/>
        </div>

    </>
  )
}

export default LandingPageView