import React, { useEffect, useRef } from 'react';
import { Calendar, MapPin, Clock, ChevronDown } from 'lucide-react';

const Hero = () => {
  const wheelRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (wheelRef.current) {
        const scrollPosition = window.scrollY;
        const rotation = scrollPosition * 0.5; // Adjust speed as needed
        wheelRef.current.style.transform = `rotate(${rotation}deg)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero-section min-h-screen flex items-center pt-24 pb-16 relative">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/82f46f64-4755-4cd4-a279-42457b2ca09a.png"
          alt="Blaze and the Monster Machines" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/70 to-blue-500/40 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-blue-100/70 backdrop-blur-sm"></div>
      </div>
      
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
        <div className="order-2 md:order-1 text-center md:text-left">
          <div className="inline-block bg-blaze-yellow px-4 py-1 rounded-full text-blaze-dark font-semibold mb-4 animate-bounce-slight">
            Convite especial!
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-blaze-dark">
            <span className="block">Hugo faz</span> 
            <span className="text-blaze-red inline-block transform -rotate-2">3 anos!</span>
          </h1>
          
          <p className="text-lg md:text-xl mb-6 text-blaze-dark/80 max-w-xl">
            Ei, pessoal! Eu sou o AJ, e estou a mil por hora pra convidar todo mundo para a festinha de 3 anos do Hugo! Venha acelerar com a gente e viver uma aventura cheia de diversão com o Blaze e os Monster Machines!
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start mb-8">
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-lg px-4 py-3 shadow-sm">
              <Calendar className="text-blaze-red h-5 w-5 mr-2" />
              <span className="font-medium">Domingo, 13 de abril de 2025</span>
            </div>
            
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-lg px-4 py-3 shadow-sm">
              <Clock className="text-blaze-red h-5 w-5 mr-2" />
              <span className="font-medium">A partir das 15h</span>
            </div>
          </div>
          
          <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-lg px-4 py-3 shadow-sm inline-block mb-8">
            <MapPin className="text-blaze-red h-5 w-5 mr-2" />
            <span className="font-medium">Salão Infantil, Condomínio Aquarela Carioca Clube</span>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8 md:mb-0">
            <a 
              href="#rsvp" 
              className="button-3d bg-blaze-red hover:bg-red-600 text-white font-bold rounded-full py-3 px-6 transition-all"
            >
              Confirmar Presença
            </a>
            <a 
              href="#location" 
              className="button-3d bg-blaze-blue hover:bg-blue-600 text-white font-bold rounded-full py-3 px-6 transition-all"
            >
              Ver Mapa
            </a>
            <a 
              href="#messages" 
              className="button-3d bg-blaze-yellow hover:bg-amber-500 text-blaze-dark font-bold rounded-full py-3 px-6 transition-all"
            >
              Enviar Mensagem
            </a>
          </div>
          
          {/* Versão mobile do embed do YouTube */}
          <div className="md:hidden w-full mt-16">
            <div className="photo-frame-stack relative z-20">
              <div className="photo-frame z-20 transform rotate-3 shadow-xl bg-white p-2">
                <div className="bg-blaze-red text-white py-1 px-3 absolute -top-2 -left-2 rounded-md transform -rotate-6 z-30 font-bold text-sm">
                  Vaaai, Blaze!
                </div>
                <div className="w-full overflow-hidden rounded-md">
                  <iframe
                    src="https://www.youtube.com/embed/0-9Ts01Frig?si=abX4WevoFy4nbjsR&autoplay=1&mute=1"
                    title="Blaze e as Monster Machines"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    className="w-full aspect-video rounded-md"
                    style={{ minHeight: "240px", width: "100%" }}
                  ></iframe>
                </div>
              </div>
              
              <div className="absolute top-4 -left-6 z-30 transform -rotate-3">
                <img 
                  src="/images/AJ-blaze.png"
                  alt="AJ do Blaze" 
                  className="w-24 h-auto object-contain"
                />
              </div>
              
              <div className="absolute -right-4 -bottom-4 w-20 h-20 z-30">
                <img 
                  src="/images/roda-blaze.png"
                  alt="Roda do Blaze" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Versão desktop do embed do YouTube */}
        <div className="order-1 md:order-2 relative hidden md:block">
          <div className="relative mx-auto w-full max-w-md">
            {/* Primeira roda removida */}
            
            <div className="absolute -right-12 -bottom-12 w-28 h-28 z-30">
              <img 
                src="/images/roda-blaze.png"
                alt="Roda do Blaze" 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="photo-frame-stack relative z-20">
              {/* Blaze theme photo on top */}
              <div className="photo-frame z-20 transform rotate-3 shadow-xl bg-white p-2">
                <div className="bg-blaze-red text-white py-1 px-3 absolute -top-2 -left-2 rounded-md transform -rotate-6 z-30 font-bold text-sm">
                  Vaaai, Blaze!
                </div>
                <div className="w-full overflow-hidden rounded-md">
                  <iframe
                    src="https://www.youtube.com/embed/0-9Ts01Frig?si=abX4WevoFy4nbjsR&autoplay=1&mute=1"
                    title="Blaze e as Monster Machines"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    className="w-full aspect-video rounded-md"
                    style={{ minHeight: "320px", width: "100%" }}
                  ></iframe>
                </div>
              </div>
              
              {/* Hugo's photo below */}
              <div className="absolute top-12 -left-24 z-30 transform -rotate-3">
                <img 
                  src="/images/AJ-blaze.png"
                  alt="AJ do Blaze" 
                  className="w-32 h-auto object-contain"
                />
              </div>
              
              {/* Additional theme decoration */}
              <div className="photo-frame absolute -bottom-4 -right-12 z-10 transform rotate-6 shadow-xl">
                {/* Elemento "Diversão!" removido */}
              </div>
            </div>
            
            <div 
              ref={wheelRef} 
              className="absolute -right-10 -top-16 w-16 h-16 z-30"
            >
              {/* Roda removida */}
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/80 to-transparent"></div>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center animate-bounce">
        <a 
          href="#photo-memory" 
          className="rounded-full bg-white/80 p-3 shadow-md backdrop-blur-sm"
        >
          <ChevronDown className="h-5 w-5 text-blaze-red" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
