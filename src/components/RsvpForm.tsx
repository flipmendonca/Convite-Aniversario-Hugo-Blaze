import React, { useState } from 'react';
import { Calendar, Send, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { rsvpService, RsvpData } from '@/lib/supabase-services';

const RsvpForm = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState<RsvpData>({
    name: '',
    phone: '',
    numberOfGuests: 1,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ 
      ...prev, 
      [name]: name === 'numberOfGuests' ? parseInt(value) : value 
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log('Enviando RSVP:', formState);
    
    try {
      console.log('Chamando rsvpService.addRsvp...');
      const id = await rsvpService.addRsvp(formState);
      console.log('RSVP adicionado com sucesso, ID:', id);
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast({
        title: "Confirmação enviada!",
        description: "Obrigado por confirmar sua presença na festa do Hugo!",
      });
      
      // Reset form
      setFormState({
        name: '',
        phone: '',
        numberOfGuests: 1,
        message: '',
      });
    } catch (error) {
      console.error('Erro ao enviar confirmação:', error);
      setIsSubmitting(false);
      
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar sua confirmação. Tente novamente.",
        variant: "destructive",
      });
    }
  };
  
  const openWhatsApp = () => {
    const text = `Olá! Gostaria de confirmar minha presença na festa de aniversário do Hugo.`;
    window.open(`https://wa.me/5521984456820?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="rsvp" className="py-20 relative bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-blaze-dark">Confirme sua presença</h2>
          <p className="text-lg text-blaze-dark/70 max-w-2xl mx-auto">
            Por favor, confirme até dia 10 de abril para garantirmos que tudo esteja perfeito!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
          <div className="glass-card rounded-lg p-8 shadow-lg md:order-2 animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium text-blaze-dark">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Seu nome e sobrenome"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blaze-blue focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block mb-2 font-medium text-blaze-dark">
                    Telefone/WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blaze-blue focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="numberOfGuests" className="block mb-2 font-medium text-blaze-dark">
                    Número de convidados
                  </label>
                  <select
                    id="numberOfGuests"
                    name="numberOfGuests"
                    value={formState.numberOfGuests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blaze-blue focus:border-transparent transition-all"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'pessoa' : 'pessoas'}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 font-medium text-blaze-dark">
                    Mensagem (opcional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Alguma observação adicional?"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blaze-blue focus:border-transparent transition-all"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button-3d w-full bg-blaze-red text-white font-bold text-lg rounded-full py-3 px-6 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Confirmar presença</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                  <CheckCircle className="h-10 w-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-blaze-dark">Confirmação recebida!</h3>
                <p className="text-gray-600 mb-6">
                  Muito obrigado por confirmar sua presença na festa do Hugo!
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="button-3d bg-blaze-blue text-white font-semibold rounded-full py-2 px-4"
                >
                  Enviar outra confirmação
                </button>
              </div>
            )}
          </div>
          
          <div className="md:order-1 animate-slide-up opacity-0" style={{ animationDelay: '0s' }}>
            <div className="glass-card rounded-lg p-6 shadow-lg flex items-center space-x-4 mb-6">
              <div className="bg-blaze-yellow/20 rounded-full p-3">
                <Calendar className="h-6 w-6 text-blaze-yellow" />
              </div>
              <div>
                <h3 className="font-semibold text-blaze-dark">Prazo para confirmação</h3>
                <p className="text-blaze-dark/70">Até 10 de abril de 2025</p>
              </div>
            </div>
            
            <div className="glass-card rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-blaze-dark">Também pode confirmar por WhatsApp</h3>
              <p className="text-blaze-dark/70 mb-6">
                Se preferir, também pode confirmar sua presença enviando uma mensagem diretamente para:
              </p>
              
              <button
                onClick={openWhatsApp}
                className="button-3d w-full bg-green-500 hover:bg-green-600 text-white font-bold rounded-full py-3 px-6 flex items-center justify-center space-x-2 mb-4"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>Confirmar via WhatsApp</span>
              </button>
              
              <div className="text-center mt-4">
                <p className="font-medium text-blaze-dark">21 98445-6820</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RsvpForm;
