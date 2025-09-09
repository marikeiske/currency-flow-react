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
  // Usando API pública da HG Brasil (versão gratuita)
  const response = await fetch('https://api.hgbrasil.com/finance');
  
  if (!response.ok) {
    throw new Error('Falha ao buscar cotações');
  }
  
  const data: ApiResponse = await response.json();
  return data.results.currencies;
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