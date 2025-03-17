import { supabase, RsvpRow, MessageRow } from './supabase';

// Interfaces para os dados
export interface RsvpData {
  name: string;
  phone: string;
  numberOfGuests: number;
  message?: string;
  timestamp?: Date;
}

export interface MessageData {
  author: string;
  message: string;
  imageSrc?: string | null;
  timestamp?: Date;
}

// Serviço para confirmações de presença
export const rsvpService = {
  // Adicionar nova confirmação
  async addRsvp(data: RsvpData): Promise<string> {
    try {
      const { data: insertedData, error } = await supabase
        .from('rsvps')
        .insert({
          name: data.name,
          phone: data.phone,
          number_of_guests: data.numberOfGuests,
          message: data.message || null
        })
        .select();

      if (error) throw error;
      
      return insertedData?.[0]?.id?.toString() || '';
    } catch (error) {
      console.error('Erro ao adicionar confirmação:', error);
      throw error;
    }
  },
  
  // Obter todas as confirmações
  async getRsvps(): Promise<RsvpData[]> {
    try {
      const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return (data || []).map((row: RsvpRow) => ({
        name: row.name,
        phone: row.phone,
        numberOfGuests: row.number_of_guests,
        message: row.message,
        timestamp: row.created_at ? new Date(row.created_at) : undefined
      }));
    } catch (error) {
      console.error('Erro ao obter confirmações:', error);
      throw error;
    }
  }
};

// Serviço para mensagens e fotos
export const messageService = {
  // Adicionar nova mensagem
  async addMessage(data: MessageData): Promise<string> {
    try {
      let imageUrl = null;
      
      // Se tiver imagem, fazer upload primeiro
      if (data.imageSrc && data.imageSrc.startsWith('data:image')) {
        const fileExt = data.imageSrc.split(';')[0].split('/')[1];
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `message-images/${fileName}`;
        
        // Remover o prefixo data:image/xxx;base64, para obter apenas os dados
        const base64Data = data.imageSrc.split(',')[1];
        
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, Buffer.from(base64Data, 'base64'), {
            contentType: `image/${fileExt}`
          });
          
        if (uploadError) throw uploadError;
        
        // Obter a URL pública da imagem
        const { data: publicUrlData } = supabase.storage
          .from('images')
          .getPublicUrl(filePath);
          
        imageUrl = publicUrlData.publicUrl;
      }
      
      // Adicionar documento ao Supabase
      const { data: insertedData, error } = await supabase
        .from('messages')
        .insert({
          author: data.author,
          message: data.message,
          image_url: imageUrl
        })
        .select();
        
      if (error) throw error;
      
      return insertedData?.[0]?.id?.toString() || '';
    } catch (error) {
      console.error('Erro ao adicionar mensagem:', error);
      throw error;
    }
  },
  
  // Obter todas as mensagens
  async getMessages(messageLimit = 50): Promise<MessageData[]> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(messageLimit);
        
      if (error) throw error;
      
      return (data || []).map((row: MessageRow) => ({
        author: row.author,
        message: row.message,
        imageSrc: row.image_url,
        timestamp: row.created_at ? new Date(row.created_at) : undefined
      }));
    } catch (error) {
      console.error('Erro ao obter mensagens:', error);
      throw error;
    }
  }
}; 