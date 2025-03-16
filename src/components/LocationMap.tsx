
import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from './ui/button';

const LocationMap = () => {
  const address = "Rua do Bispo, 191, Rio Comprido, Rio de Janeiro";
  const encodedAddress = encodeURIComponent(address);
  const googleMapsUrl = `https://maps.google.com/?q=${encodedAddress}`;
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}`;
  
  const openGoogleMaps = () => {
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <section id="location" className="py-20 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-blaze-dark">Onde vai acontecer</h2>
          <p className="text-lg text-blaze-dark/70 max-w-2xl mx-auto">
            O Salão Infantil do Condomínio Aquarela Carioca Clube está pronto para receber a festa mais animada do ano!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="glass-card rounded-lg p-6 shadow-lg">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4 text-blaze-dark">Salão Infantil</h3>
              <p className="text-blaze-dark/70 mb-6">
                Um espaço amplo e seguro, decorado especialmente para o tema Blaze e os Monster Machines, 
                com muitas brincadeiras e diversão!
              </p>
              
              <div className="flex flex-col space-y-3 mb-6">
                <div className="flex items-start">
                  <MapPin className="text-blaze-red h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                  <span className="font-medium">
                    Rua do Bispo, 191 – Rio Comprido, Rio de Janeiro
                  </span>
                </div>
              </div>
              
              <Button 
                onClick={openGoogleMaps}
                className="w-full bg-blaze-blue hover:bg-blaze-blue/90 text-white rounded-full font-bold"
              >
                <Navigation className="h-5 w-5 mr-2" />
                <span>Como chegar (Google Maps)</span>
              </Button>
            </div>
          </div>
          
          <div className="overflow-hidden rounded-lg shadow-lg relative h-[400px]">
            <iframe 
              src={googleMapsEmbedUrl}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa da localização da festa"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
