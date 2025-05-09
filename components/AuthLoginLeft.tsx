import React from "react";
import { TextLoop } from "./motion-primitives/text-loop";

const AuthLeftLogin = () => {
  return (
    <div
      className="bg-green-500 rounded-lg hidden bg-center object-fill md:flex-3 h-full relative overflow-hidden md:grid place-content-center"
      // style={{ backgroundImage: "url('/images/photo5.webp')" }}
    >
      <img src='/images/photo3.jpg' alt="" className="absolute inset-0"/>
      <div className="bg-black/60 absolute inset-0 z-10"></div>
      <div className="w-36 h-10 rounded-lg bg-background-light uppercase font-bold text-black absolute z-50 grid place-content-center top-3 left-3">AgriTrack</div>

      <p className="inline-flex whitespace-pre-wrap text-white text-2xl font-bold uppercase z-50 font-clash">
        Des outils modernes pour{" "}
        <TextLoop
          className="overflow-y-clip"
          transition={{
            type: "spring",
            stiffness: 900,
            damping: 80,
            mass: 10,
          }}
          variants={{
            initial: {
              y: 20,
              rotateX: 90,
              opacity: 0,
              filter: "blur(4px)",
            },
            animate: {
              y: 0,
              rotateX: 0,
              opacity: 1,
              filter: "blur(0px)",
            },
            exit: {
              y: -20,
              rotateX: -90,
              opacity: 0,
              filter: "blur(4px)",
            },
          }}
        >
          <span>les agriculteurs</span>
          <span>les gestionnaires</span>
          <span>les techniciens agricoles</span>
          <span>les ingénieurs agronomes</span>
        </TextLoop>
      </p>
    </div>
  );
};

export default AuthLeftLogin;
