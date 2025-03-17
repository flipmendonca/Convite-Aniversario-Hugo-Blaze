import { db, storage } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  Timestamp,
  limit
} from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

// Tipos
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
      const docRef = await addDoc(collection(db, 'rsvps'), {
        ...data,
        timestamp: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error('Erro ao adicionar confirmação:', error);
      throw error;
    }
  },
  
  // Obter todas as confirmações
  async getRsvps(): Promise<RsvpData[]> {
    try {
      const q = query(collection(db, 'rsvps'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          timestamp: data.timestamp?.toDate(),
        } as RsvpData;
      });
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
      // Se tiver imagem, fazer upload primeiro
      let imageUrl = null;
      if (data.imageSrc && data.imageSrc.startsWith('data:image')) {
        const storageRef = ref(storage, `message-images/${Date.now()}`);
        await uploadString(storageRef, data.imageSrc, 'data_url');
        imageUrl = await getDownloadURL(storageRef);
      }
      
      // Adicionar documento ao Firestore
      const docRef = await addDoc(collection(db, 'messages'), {
        author: data.author,
        message: data.message,
        imageSrc: imageUrl,
        timestamp: Timestamp.now()
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Erro ao adicionar mensagem:', error);
      throw error;
    }
  },
  
  // Obter todas as mensagens
  async getMessages(messageLimit = 50): Promise<MessageData[]> {
    try {
      const q = query(
        collection(db, 'messages'), 
        orderBy('timestamp', 'desc'),
        limit(messageLimit)
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          timestamp: data.timestamp?.toDate(),
        } as MessageData;
      });
    } catch (error) {
      console.error('Erro ao obter mensagens:', error);
      throw error;
    }
  }
}; 