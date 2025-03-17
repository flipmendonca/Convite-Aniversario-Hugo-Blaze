import React, { useState, useEffect } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { messageService, MessageData } from '@/lib/supabase-services';

// Sample initial messages
const initialMessages = [
  {
    id: 1,
    author: 'Tia Carla',
    message: 'Parabéns, Hugo! Que seu dia seja cheio de alegria e diversão! Mal posso esperar para celebrar com você.',
    timestamp: new Date('2024-03-20T14:22:00'),
  },
  {
    id: 2,
    author: 'Família Silva',
    message: 'Hugo, estamos contando os dias para sua festa! Pedro está super empolgado com os Monster Trucks!',
    timestamp: new Date('2024-03-22T09:15:00'),
  },
];

const MessageWall = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [newMessage, setNewMessage] = useState<MessageData>({
    author: '',
    message: '',
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
      setNewMessage({ author: '', message: '' });
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
    <section id="messages" className="py-20 relative bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-blaze-dark">Mural de Mensagens</h2>
          <p className="text-lg text-blaze-dark/70 max-w-2xl mx-auto">
            Deixe uma mensagem especial para o Hugo! Ele vai adorar ler todas as mensagens de carinho.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="glass-card rounded-lg p-8 shadow-lg animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <MessageCircle className="h-6 w-6 text-blaze-blue" />
              </div>
              <h3 className="text-2xl font-bold text-blaze-dark">Deixe sua mensagem</h3>
            </div>
            
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
                    <span>Enviar mensagem</span>
                  </>
                )}
              </button>
            </form>
          </div>
          
          <div className="glass-card rounded-lg p-8 shadow-lg animate-slide-up opacity-0" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <MessageCircle className="h-6 w-6 text-blaze-blue" />
              </div>
              <h3 className="text-2xl font-bold text-blaze-dark">Mensagens</h3>
            </div>
            
            <div className="overflow-y-auto max-h-[500px] pr-2">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin h-8 w-8 border-4 border-blaze-blue border-t-transparent rounded-full"></div>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Nenhuma mensagem ainda. Seja o primeiro a deixar uma mensagem!</p>
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
