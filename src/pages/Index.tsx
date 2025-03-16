import React, { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import LocationMap from '@/components/LocationMap';
import RsvpForm from '@/components/RsvpForm';
import MessageWall from '@/components/MessageWall';
import { ArrowUp, Calendar, Clock, MapPin, Truck, Camera, GalleryHorizontal } from 'lucide-react';

const Index = () => {
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative">
      <NavBar />
      
      <main>
        <Hero />
        
        {/* Dobra de cor para a seção "about" */}
        <div className="h-16 bg-gradient-to-r from-blaze-red/20 via-blaze-yellow/20 to-blaze-blue/20 transform -skew-y-2"></div>
        
        <section id="about" className="py-20 bg-white relative overflow-hidden">
          <div className="absolute inset-0 moving-clouds opacity-20 pointer-events-none"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-blaze-dark">Venha comemorar com a gente!</h2>
              <div className="h-1 w-20 bg-blaze-yellow mx-auto mb-6"></div>
              <p className="text-lg text-blaze-dark/70 max-w-3xl mx-auto">
                Traga sua energia para curtir com o Hugo e seus amigos monster trucks!
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="glass-card rounded-lg p-6 shadow-lg text-center animate-slide-up opacity-0" style={{ animationDelay: '0s' }}>
                <div className="bg-blaze-red/10 p-3 rounded-full mx-auto mb-4 inline-block">
                  <Calendar className="h-8 w-8 text-blaze-red" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-blaze-dark">Domingo, 13 de abril</h3>
                <p className="text-blaze-dark/70">
                  A partir das 15h, vamos celebrar o aniversário de 3 anos do Hugo!
                </p>
              </div>
              
              <div className="glass-card rounded-lg p-6 shadow-lg text-center animate-slide-up opacity-0" style={{ animationDelay: '0.1s' }}>
                <div className="bg-blaze-blue/10 p-3 rounded-full mx-auto mb-4 inline-block">
                  <MapPin className="h-8 w-8 text-blaze-blue" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-blaze-dark">Salão Infantil</h3>
                <p className="text-blaze-dark/70">
                  Condomínio Aquarela Carioca Clube<br />
                  Rua do Bispo, 191 – Rio Comprido
                </p>
              </div>
              
              <div className="glass-card rounded-lg p-6 shadow-lg text-center animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
                <div className="bg-blaze-yellow/10 p-3 rounded-full mx-auto mb-4 inline-block">
                  <Truck className="h-8 w-8 text-blaze-yellow" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-blaze-dark">Tema da Festa</h3>
                <p className="text-blaze-dark/70">
                  Blaze e os Monster Machines, com muita diversão e aventuras para toda a criançada!
                </p>
              </div>
            </div>
            
            <div className="text-center mt-16 animate-slide-up opacity-0" style={{ animationDelay: '0.3s' }}>
              <p className="text-xl font-medium text-blaze-dark mb-8">
                Confirme sua presença até o dia 10 de abril
              </p>
              
              <a 
                href="#rsvp" 
                className="button-3d inline-block bg-blaze-red hover:bg-red-600 text-white font-bold rounded-full py-3 px-8 transition-all"
              >
                Confirmar agora
              </a>
            </div>
          </div>
        </section>
        
        {/* Dobra de cor para a seção de memórias */}
        <div className="h-16 bg-gradient-to-r from-blaze-blue/20 via-blaze-yellow/20 to-blaze-red/20 transform skew-y-2"></div>
        
        {/* Photo memory section for Hugo */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="glass-card rounded-lg p-8 shadow-lg">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-1/3">
                    <div className="aspect-square rounded-lg overflow-hidden border-4 border-white shadow-xl bg-gray-100">
                      <img 
                        src="/images/Hugo.jpg"
                        alt="Foto do Hugo" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="w-full md:w-2/3 text-center md:text-left">
                    <h2 className="text-3xl font-bold mb-4 text-blaze-dark">
                      Hugo está fazendo <span className="text-blaze-red">3 anos</span>!
                    </h2>
                    <p className="text-lg text-blaze-dark/70 mb-6">
                      Nosso pequeno aventureiro é apaixonado por velocidade e brincadeiras cheias de energia, e mal pode esperar para dividir esse momento especial com você. Prepare-se para muita diversão no universo dos Monster Trucks e venha celebrar com a gente esse dia inesquecível!
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                      <a 
                        href="#messages" 
                        className="button-3d bg-blaze-blue text-white font-bold rounded-full py-3 px-6 transition-all"
                      >
                        Deixar mensagem
                      </a>
                      <a 
                        href="#rsvp" 
                        className="button-3d bg-blaze-yellow text-blaze-dark font-bold rounded-full py-3 px-6 transition-all"
                      >
                        Confirmar presença
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Dobra de cor para o mapa de localização */}
        <div className="h-16 bg-gradient-to-r from-blaze-yellow/20 via-blaze-red/20 to-blaze-blue/20 transform -skew-y-2"></div>
        
        <LocationMap />
        
        {/* Dobra de cor para o formulário RSVP */}
        <div className="h-16 bg-gradient-to-r from-blaze-red/20 via-blaze-blue/20 to-blaze-yellow/20 transform skew-y-2"></div>
        
        <RsvpForm />
        
        {/* Dobra de cor para o mural de mensagens */}
        <div className="h-16 bg-gradient-to-r from-blaze-blue/20 via-blaze-yellow/20 to-blaze-red/20 transform -skew-y-2"></div>
        
        <MessageWall />
      </main>
      
      <footer className="bg-blaze-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Hugo faz 3 anos!</h2>
            <p className="text-lg mb-8 text-white/80 max-w-2xl mx-auto">
              Obrigado por fazer parte deste momento especial com a gente!
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-10">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blaze-red" />
                <span>Domingo, 13 de abril de 2025</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blaze-yellow" />
                <span>A partir das 15h</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-blaze-blue" />
                <span>Condomínio Aquarela Carioca Clube</span>
              </div>
            </div>
            
            <div className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} - Festa de aniversário do Hugo
            </div>
          </div>
        </div>
      </footer>
      
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blaze-red p-3 rounded-full shadow-lg text-white transition-all hover:bg-red-600 z-50 animate-fade-in"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default Index;
