import { supabase } from './lib/supabase';
import { rsvpService } from './lib/supabase-services';

// Função para testar a conexão com o Supabase
async function testSupabaseConnection() {
  console.log('Testando conexão com o Supabase...');
  
  try {
    // Testar conexão básica
    const { data, error } = await supabase.from('rsvps').select('count').single();
    
    if (error) {
      console.error('Erro ao conectar com o Supabase:', error);
      return false;
    }
    
    console.log('Conexão com o Supabase estabelecida com sucesso!');
    console.log('Contagem de RSVPs:', data?.count);
    
    return true;
  } catch (error) {
    console.error('Erro ao testar conexão:', error);
    return false;
  }
}

// Função para testar a adição de um RSVP
async function testAddRsvp() {
  console.log('Testando adição de RSVP...');
  
  try {
    const testData = {
      name: 'Teste Conexão',
      phone: '21999999999',
      numberOfGuests: 1,
      message: 'Este é um teste de conexão'
    };
    
    const id = await rsvpService.addRsvp(testData);
    
    if (id) {
      console.log('RSVP de teste adicionado com sucesso! ID:', id);
      return true;
    } else {
      console.error('Falha ao adicionar RSVP de teste');
      return false;
    }
  } catch (error) {
    console.error('Erro ao adicionar RSVP de teste:', error);
    return false;
  }
}

// Executar os testes
async function runTests() {
  const connectionOk = await testSupabaseConnection();
  
  if (connectionOk) {
    await testAddRsvp();
  }
}

// Exportar as funções para uso no console do navegador
window.testSupabase = {
  testConnection: testSupabaseConnection,
  testAddRsvp: testAddRsvp,
  runAllTests: runTests
};

// Adicionar tipos ao objeto window
declare global {
  interface Window {
    testSupabase: {
      testConnection: () => Promise<boolean>;
      testAddRsvp: () => Promise<boolean>;
      runAllTests: () => Promise<void>;
    };
  }
}

export { testSupabaseConnection, testAddRsvp, runTests }; 