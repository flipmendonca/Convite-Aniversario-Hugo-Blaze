import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'py-2 bg-white/90 backdrop-blur-sm shadow-md' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <img 
            src={import.meta.env.BASE_URL + "images/Blaze_and_the_Monster_Machines_logo.png"}
            alt="Blaze and the Monster Machines" 
            className="h-10"
          />
        </div>
        
        <div className="flex space-x-6 items-center">
          <button 
            onClick={() => scrollToSection('about')}
            className="text-blaze-dark hover:text-blaze-red transition-colors font-medium hidden md:block"
          >
            Festa
          </button>
          <button 
            onClick={() => scrollToSection('location')}
            className="text-blaze-dark hover:text-blaze-red transition-colors font-medium hidden md:block"
          >
            Local
          </button>
          <button 
            onClick={() => scrollToSection('messages')}
            className="text-blaze-dark hover:text-blaze-red transition-colors font-medium hidden md:block"
          >
            Mensagens
          </button>
          
          <button 
            onClick={() => scrollToSection('rsvp')}
            className="button-3d bg-blaze-red text-white font-semibold rounded-full py-2 px-5 hidden md:block"
          >
            Confirmar Presença
          </button>
          
          <div className="flex md:hidden">
            <button 
              onClick={() => scrollToSection('rsvp')}
              className="flex items-center space-x-1 bg-blaze-red text-white rounded-full py-2 px-4 text-sm"
            >
              <span>Menu</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
