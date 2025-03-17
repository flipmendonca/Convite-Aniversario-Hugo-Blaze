import React, { useState } from 'react';
import { testSupabaseConnection, testAddRsvp, runTests } from './test-supabase';
import { 
  testDirectInsert, 
  testRsvpService, 
  checkTablePermissions, 
  listAllRsvps, 
  runAllTests as runAllRsvpTests 
} from './test-rsvp';

const TestPage: React.FC = () => {
  const [results, setResults] = useState<Array<{ message: string; isError: boolean }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Função para adicionar mensagem aos resultados
  const addResult = (message: string, isError = false) => {
    setResults(prev => [...prev, { message, isError }]);
  };

  // Limpar resultados anteriores
  const clearResults = () => {
    setResults([]);
  };

  // Testar conexão
  const handleTestConnection = async () => {
    clearResults();
    setIsLoading(true);
    addResult('Testando conexão com o Supabase...');
    
    try {
      const result = await testSupabaseConnection();
      if (result) {
        addResult('✅ Conexão com o Supabase estabelecida com sucesso!');
      } else {
        addResult('❌ Falha ao conectar com o Supabase', true);
      }
    } catch (error) {
      addResult(`❌ Erro: ${error instanceof Error ? error.message : String(error)}`, true);
    } finally {
      setIsLoading(false);
    }
  };

  // Testar adição de RSVP
  const handleTestAddRsvp = async () => {
    clearResults();
    setIsLoading(true);
    addResult('Testando adição de RSVP...');
    
    try {
      const result = await testAddRsvp();
      if (result) {
        addResult('✅ RSVP de teste adicionado com sucesso!');
      } else {
        addResult('❌ Falha ao adicionar RSVP de teste', true);
      }
    } catch (error) {
      addResult(`❌ Erro: ${error instanceof Error ? error.message : String(error)}`, true);
    } finally {
      setIsLoading(false);
    }
  };

  // Executar todos os testes
  const handleRunAllTests = async () => {
    clearResults();
    setIsLoading(true);
    addResult('Executando todos os testes...');
    
    try {
      await runTests();
      addResult('✅ Testes concluídos!');
    } catch (error) {
      addResult(`❌ Erro: ${error instanceof Error ? error.message : String(error)}`, true);
    } finally {
      setIsLoading(false);
    }
  };

  // Testar permissões da tabela RSVP
  const handleCheckRsvpPermissions = async () => {
    clearResults();
    setIsLoading(true);
    addResult('Verificando permissões da tabela RSVP...');
    
    try {
      const result = await checkTablePermissions();
      if (result) {
        addResult('✅ Tabela RSVP acessível e permissões OK!');
      } else {
        addResult('❌ Problema com permissões da tabela RSVP', true);
      }
    } catch (error) {
      addResult(`❌ Erro: ${error instanceof Error ? error.message : String(error)}`, true);
    } finally {
      setIsLoading(false);
    }
  };

  // Testar inserção direta na tabela RSVP
  const handleTestDirectInsert = async () => {
    clearResults();
    setIsLoading(true);
    addResult('Testando inserção direta na tabela RSVP...');
    
    try {
      const result = await testDirectInsert();
      if (result) {
        addResult('✅ Inserção direta na tabela RSVP bem-sucedida!');
      } else {
        addResult('❌ Falha na inserção direta na tabela RSVP', true);
      }
    } catch (error) {
      addResult(`❌ Erro: ${error instanceof Error ? error.message : String(error)}`, true);
    } finally {
      setIsLoading(false);
    }
  };

  // Testar serviço de RSVP
  const handleTestRsvpService = async () => {
    clearResults();
    setIsLoading(true);
    addResult('Testando serviço de RSVP...');
    
    try {
      const result = await testRsvpService();
      if (result) {
        addResult('✅ Serviço de RSVP funcionando corretamente!');
      } else {
        addResult('❌ Falha no serviço de RSVP', true);
      }
    } catch (error) {
      addResult(`❌ Erro: ${error instanceof Error ? error.message : String(error)}`, true);
    } finally {
      setIsLoading(false);
    }
  };

  // Listar todos os RSVPs
  const handleListAllRsvps = async () => {
    clearResults();
    setIsLoading(true);
    addResult('Listando todos os RSVPs...');
    
    try {
      const result = await listAllRsvps();
      if (result) {
        addResult('✅ RSVPs listados com sucesso! Verifique o console para detalhes.');
      } else {
        addResult('❌ Falha ao listar RSVPs', true);
      }
    } catch (error) {
      addResult(`❌ Erro: ${error instanceof Error ? error.message : String(error)}`, true);
    } finally {
      setIsLoading(false);
    }
  };

  // Executar todos os testes de RSVP
  const handleRunAllRsvpTests = async () => {
    clearResults();
    setIsLoading(true);
    addResult('Executando todos os testes de RSVP...');
    
    try {
      await runAllRsvpTests();
      addResult('✅ Testes de RSVP concluídos! Verifique o console para detalhes.');
    } catch (error) {
      addResult(`❌ Erro: ${error instanceof Error ? error.message : String(error)}`, true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Teste de Conexão Supabase</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border border-gray-200 rounded-md p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Testes Gerais</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <button 
              onClick={handleTestConnection}
              disabled={isLoading}
              className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 text-sm"
            >
              Testar Conexão
            </button>
            
            <button 
              onClick={handleTestAddRsvp}
              disabled={isLoading}
              className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 text-sm"
            >
              Testar Adicionar RSVP
            </button>
            
            <button 
              onClick={handleRunAllTests}
              disabled={isLoading}
              className="px-3 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50 text-sm"
            >
              Executar Todos
            </button>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-md p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Testes de RSVP</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <button 
              onClick={handleCheckRsvpPermissions}
              disabled={isLoading}
              className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 text-sm"
            >
              Verificar Permissões
            </button>
            
            <button 
              onClick={handleTestDirectInsert}
              disabled={isLoading}
              className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 text-sm"
            >
              Inserção Direta
            </button>
            
            <button 
              onClick={handleTestRsvpService}
              disabled={isLoading}
              className="px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:opacity-50 text-sm"
            >
              Testar Serviço
            </button>
            
            <button 
              onClick={handleListAllRsvps}
              disabled={isLoading}
              className="px-3 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 disabled:opacity-50 text-sm"
            >
              Listar RSVPs
            </button>
            
            <button 
              onClick={handleRunAllRsvpTests}
              disabled={isLoading}
              className="px-3 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50 text-sm"
            >
              Executar Todos
            </button>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-md p-4 bg-gray-50 min-h-[300px]">
        <h2 className="text-lg font-semibold mb-4">Resultados</h2>
        {results.length === 0 ? (
          <p className="text-gray-500">Os resultados dos testes aparecerão aqui...</p>
        ) : (
          <div className="space-y-2">
            {results.map((result, index) => (
              <p 
                key={index} 
                className={result.isError ? "text-red-500" : "text-green-600"}
              >
                {result.message}
              </p>
            ))}
          </div>
        )}
        
        {isLoading && (
          <div className="flex items-center justify-center mt-4">
            <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full mr-2"></div>
            <span>Processando...</span>
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <a 
          href="/" 
          className="text-blue-500 hover:underline"
        >
          ← Voltar para a página principal
        </a>
      </div>
    </div>
  );
};

export default TestPage; 