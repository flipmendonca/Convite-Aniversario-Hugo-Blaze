import { supabase } from './lib/supabase';
import { rsvpService, RsvpData } from './lib/supabase-services';

// Função para testar a inserção direta na tabela rsvps
async function testDirectInsert() {
  console.log('Testando inserção direta na tabela rsvps...');
  
  try {
    const testData = {
      name: 'Teste Direto',
      phone: '21999999999',
      number_of_guests: 2,
      message: 'Este é um teste de inserção direta'
    };
    
    const { data, error } = await supabase
      .from('rsvps')
      .insert({
        name: testData.name,
        phone: testData.phone,
        number_of_guests: testData.number_of_guests,
        message: testData.message
      })
      .select();
    
    if (error) {
      console.error('Erro ao inserir diretamente:', error);
      return false;
    }
    
    console.log('Inserção direta bem-sucedida:', data);
    return true;
  } catch (error) {
    console.error('Erro ao testar inserção direta:', error);
    return false;
  }
}

// Função para testar o serviço de RSVP
async function testRsvpService() {
  console.log('Testando serviço de RSVP...');
  
  try {
    const testData: RsvpData = {
      name: 'Teste Serviço',
      phone: '21888888888',
      numberOfGuests: 3,
      message: 'Este é um teste do serviço de RSVP'
    };
    
    const id = await rsvpService.addRsvp(testData);
    
    if (id) {
      console.log('RSVP adicionado com sucesso via serviço! ID:', id);
      return true;
    } else {
      console.error('Falha ao adicionar RSVP via serviço');
      return false;
    }
  } catch (error) {
    console.error('Erro ao testar serviço de RSVP:', error);
    return false;
  }
}

// Função para verificar as permissões da tabela
async function checkTablePermissions() {
  console.log('Verificando permissões da tabela rsvps...');
  
  try {
    // Verificar se a tabela existe
    const { data: tableData, error: tableError } = await supabase
      .from('rsvps')
      .select('id')
      .limit(1);
    
    if (tableError) {
      console.error('Erro ao acessar tabela rsvps:', tableError);
      return false;
    }
    
    console.log('Tabela rsvps acessível:', tableData);
    
    // Verificar políticas de segurança
    const { data: policiesData, error: policiesError } = await supabase
      .rpc('get_policies', { table_name: 'rsvps' })
      .select();
    
    if (policiesError) {
      if (policiesError.message.includes('function') || policiesError.message.includes('not found')) {
        console.log('Função get_policies não existe, isso é normal em alguns projetos Supabase');
      } else {
        console.error('Erro ao verificar políticas:', policiesError);
        return false;
      }
    } else {
      console.log('Políticas da tabela rsvps:', policiesData);
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao verificar permissões:', error);
    return false;
  }
}

// Função para listar todos os RSVPs
async function listAllRsvps() {
  console.log('Listando todos os RSVPs...');
  
  try {
    const { data, error } = await supabase
      .from('rsvps')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Erro ao listar RSVPs:', error);
      return false;
    }
    
    console.log('RSVPs encontrados:', data.length);
    console.log('Dados:', data);
    return true;
  } catch (error) {
    console.error('Erro ao listar RSVPs:', error);
    return false;
  }
}

// Executar todos os testes
async function runAllTests() {
  console.log('=== INICIANDO TESTES DE RSVP ===');
  
  // Verificar permissões primeiro
  const permissionsOk = await checkTablePermissions();
  console.log('Permissões OK?', permissionsOk);
  
  // Listar RSVPs existentes
  await listAllRsvps();
  
  // Testar inserção direta
  const directInsertOk = await testDirectInsert();
  console.log('Inserção direta OK?', directInsertOk);
  
  // Testar serviço
  const serviceOk = await testRsvpService();
  console.log('Serviço OK?', serviceOk);
  
  // Listar RSVPs novamente para confirmar inserções
  await listAllRsvps();
  
  console.log('=== TESTES CONCLUÍDOS ===');
}

// Adicionar as funções ao objeto window apenas no navegador
if (typeof window !== 'undefined') {
  (window as any).testRsvp = {
    testDirectInsert,
    testRsvpService,
    checkTablePermissions,
    listAllRsvps,
    runAllTests
  };
}

export { testDirectInsert, testRsvpService, checkTablePermissions, listAllRsvps, runAllTests }; 