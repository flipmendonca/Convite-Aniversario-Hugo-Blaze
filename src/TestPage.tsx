import React, { useState } from 'react';
import { testSupabaseConnection, testAddRsvp, runTests } from './test-supabase';

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

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Teste de Conexão Supabase</h1>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <button 
          onClick={handleTestConnection}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          Testar Conexão
        </button>
        
        <button 
          onClick={handleTestAddRsvp}
          disabled={isLoading}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
        >
          Testar Adicionar RSVP
        </button>
        
        <button 
          onClick={handleRunAllTests}
          disabled={isLoading}
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50"
        >
          Executar Todos os Testes
        </button>
      </div>
      
      <div className="border border-gray-200 rounded-md p-4 bg-gray-50 min-h-[200px]">
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