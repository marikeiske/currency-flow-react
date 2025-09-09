import { useQuery } from '@tanstack/react-query';

export interface CurrencyRates {
  USD: {
    name: string;
    buy: number;
    sell: number;
    variation: number;
  };
  EUR: {
    name: string;
    buy: number;
    sell: number;
    variation: number;
  };
}

export interface ApiResponse {
  by: string;
  valid_key: boolean;
  results: {
    currencies: CurrencyRates;
  };
}

const fetchCurrencyRates = async (): Promise<CurrencyRates> => {
  // Simulação de dados reais para demonstração 
  // Em produção, você precisaria de uma chave API da HG Brasil
  console.log('🔄 Buscando cotações simuladas...');
  
  // Simula delay da API real
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Dados simulados baseados em cotações reais típicas
  const baseUSD = 5.45 + (Math.random() - 0.5) * 0.10; // Variação realista
  const baseEUR = 5.95 + (Math.random() - 0.5) * 0.12;
  
  const mockData: CurrencyRates = {
    USD: {
      name: "Dollar",
      buy: parseFloat(baseUSD.toFixed(4)),
      sell: parseFloat((baseUSD + 0.05).toFixed(4)),
      variation: parseFloat(((Math.random() - 0.5) * 2).toFixed(2))
    },
    EUR: {
      name: "Euro", 
      buy: parseFloat(baseEUR.toFixed(4)),
      sell: parseFloat((baseEUR + 0.06).toFixed(4)),
      variation: parseFloat(((Math.random() - 0.5) * 1.8).toFixed(2))
    }
  };
  
  console.log('✅ Cotações simuladas carregadas:', mockData);
  return mockData;
};

export const useCurrencyRates = () => {
  return useQuery({
    queryKey: ['currency-rates'],
    queryFn: fetchCurrencyRates,
    refetchInterval: 60000, // Atualiza a cada minuto
    staleTime: 30000, // Considera dados válidos por 30 segundos
    retry: 3,
  });
};