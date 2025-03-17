import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, Image } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import PhotoUpload from './PhotoUpload';
import { messageService, MessageData } from '@/lib/supabase-services';

// Sample initial messages
const initialMessages = [
  {
    id: 1,
    author: 'Tia Carla',
    message: 'Parabéns, Hugo! Que seu dia seja cheio de alegria e diversão! Mal posso esperar para celebrar com você.',
    timestamp: new Date('2024-03-20T14:22:00'),
    hasImage: false,
  },
  {
    id: 2,
    author: 'Família Silva',
    message: 'Hugo, estamos contando os dias para sua festa! Pedro está super empolgado com os Monster Trucks!',
    timestamp: new Date('2024-03-22T09:15:00'),
    hasImage: true,
    imageSrc: 'https://images.unsplash.com/photo-1536825211030-094de935f680?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
];

const MessageWall = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [newMessage, setNewMessage] = useState<MessageData>({
    author: '',
    message: '',
    imageSrc: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Carregar mensagens ao montar o componente
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const fetchedMessages = await messageService.getMessages();
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Erro ao carregar mensagens:', error);
        toast({
          title: "Erro ao carregar mensagens",
          description: "Não foi possível carregar as mensagens. Tente novamente mais tarde.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMessages();
  }, [toast]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewMessage(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageUpload = (imageDataUrl: string | null) => {
    setNewMessage(prev => ({ ...prev, imageSrc: imageDataUrl }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.author.trim() || !newMessage.message.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha seu nome e mensagem.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Enviar mensagem para o Supabase
      await messageService.addMessage(newMessage);
      
      // Atualizar a lista de mensagens
      const updatedMessages = await messageService.getMessages();
      setMessages(updatedMessages);
      
      // Limpar formulário
      setNewMessage({ author: '', message: '', imageSrc: null });
      setIsSubmitting(false);
      
      toast({
        title: "Mensagem enviada!",
        description: "Sua mensagem foi adicionada ao mural com sucesso!",
      });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setIsSubmitting(false);
      
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar sua mensagem. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="messages" className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-blaze-dark">Mural de mensagens e fotos</h2>
          <p className="text-lg text-blaze-dark/70 max-w-2xl mx-auto">
            Deixe uma mensagem carinhosa para o Hugo ou envie uma foto para nosso mural de lembranças!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="animate-slide-up opacity-0" style={{ animationDelay: '0.1s' }}>
            <div className="glass-card rounded-lg p-6 shadow-lg mb-6">
              <h3 className="text-xl font-bold mb-4 text-blaze-dark flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-blaze-red" />
                Deixe sua mensagem
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="author" className="block mb-2 font-medium text-blaze-dark">
                    Seu nome
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={newMessage.author}
                    onChange={handleChange}
                    placeholder="Como você quer ser identificado"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blaze-blue focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 font-medium text-blaze-dark">
                    Sua mensagem para o Hugo
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={newMessage.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Escreva sua mensagem aqui..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blaze-blue focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-medium text-blaze-dark flex items-center">
                    <Image className="h-5 w-5 mr-2 text-blaze-blue" />
                    Adicionar uma foto (opcional)
                  </label>
                  <PhotoUpload onImageUpload={handleImageUpload} currentImage={newMessage.imageSrc} />
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="button-3d bg-blaze-red text-white font-bold rounded-full py-3 px-6 flex items-center justify-center space-x-2 w-full disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Enviar mensagem</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
          
          <div className="animate-slide-up opacity-0" style={{ animationDelay: '0.3s' }}>
            <div className="glass-card rounded-lg p-6 shadow-lg h-full overflow-y-auto max-h-[600px]">
              <h3 className="text-xl font-bold mb-6 text-blaze-dark">Mensagens recebidas</h3>
              
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blaze-blue border-t-transparent"></div>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium">Nenhuma mensagem ainda</p>
                  <p>Seja o primeiro a deixar uma mensagem para o Hugo!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((msg, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-blaze-dark">{msg.author}</h4>
                        <span className="text-xs text-gray-500">
                          {msg.timestamp && new Intl.DateTimeFormat('pt-BR', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }).format(msg.timestamp)}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{msg.message}</p>
                      
                      {msg.imageSrc && (
                        <div className="mt-3">
                          <img 
                            src={msg.imageSrc} 
                            alt="Memória compartilhada" 
                            className="rounded-md w-full object-cover h-48"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessageWall;
