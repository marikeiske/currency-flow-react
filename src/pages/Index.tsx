import { useState, useEffect } from 'react';
import { CurrencyInput } from '@/components/CurrencyInput';
import { ExchangeRateCard } from '@/components/ExchangeRateCard';
import { ApiKeyInfo } from '@/components/ApiKeyInfo';
import { useCurrencyRates } from '@/hooks/useCurrencyRates';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const { data: rates, isLoading, error, refetch } = useCurrencyRates();
  const [brlValue, setBrlValue] = useState('');
  const [usdValue, setUsdValue] = useState('');
  const [eurValue, setEurValue] = useState('');
  const [lastChanged, setLastChanged] = useState<'BRL' | 'USD' | 'EUR' | null>(null);

  const parseValue = (value: string): number => {
    if (!value) return 0;
    return parseFloat(value.replace(',', '.')) || 0;
  };

  const formatValue = (value: number): string => {
    if (value === 0) return '';
    return value.toString().replace('.', ',');
  };

  useEffect(() => {
    if (!rates || !lastChanged) return;

    const brl = parseValue(brlValue);
    const usd = parseValue(usdValue);
    const eur = parseValue(eurValue);

    if (lastChanged === 'BRL') {
      if (brl > 0) {
        setUsdValue(formatValue(brl / rates.USD.buy));
        setEurValue(formatValue(brl / rates.EUR.buy));
      } else {
        setUsdValue('');
        setEurValue('');
      }
    } else if (lastChanged === 'USD') {
      if (usd > 0) {
        setBrlValue(formatValue(usd * rates.USD.buy));
        setEurValue(formatValue((usd * rates.USD.buy) / rates.EUR.buy));
      } else {
        setBrlValue('');
        setEurValue('');
      }
    } else if (lastChanged === 'EUR') {
      if (eur > 0) {
        setBrlValue(formatValue(eur * rates.EUR.buy));
        setUsdValue(formatValue((eur * rates.EUR.buy) / rates.USD.buy));
      } else {
        setBrlValue('');
        setUsdValue('');
      }
    }
  }, [brlValue, usdValue, eurValue, rates, lastChanged]);

  const handleBrlChange = (value: string) => {
    setBrlValue(value);
    setLastChanged('BRL');
  };

  const handleUsdChange = (value: string) => {
    setUsdValue(value);
    setLastChanged('USD');
  };

  const handleEurChange = (value: string) => {
    setEurValue(value);
    setLastChanged('EUR');
  };

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Cotações atualizadas",
      description: "As taxas de câmbio foram atualizadas com sucesso.",
    });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-destructive mb-4">Erro ao carregar cotações</h2>
          <p className="text-muted-foreground mb-6">
            Não foi possível conectar com a API da HG Brasil. Verifique sua conexão.
          </p>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Tentar novamente
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Conversor de Moedas
          </h1>
          <p className="text-lg text-muted-foreground">
            Conversão em tempo real entre Real, Dólar e Euro
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
            Demo com cotações simuladas • Baseado na API HG Brasil
          </div>
        </div>

        {/* Currency Converter */}
        <div className="grid md:grid-cols-3 gap-6">
          <CurrencyInput
            currency="BRL"
            value={brlValue}
            onChange={handleBrlChange}
            flag="🇧🇷"
            name="Real Brasileiro"
          />
          
          <CurrencyInput
            currency="USD"
            value={usdValue}
            onChange={handleUsdChange}
            flag="🇺🇸"
            name="Dólar Americano"
            disabled={isLoading}
          />
          
          <CurrencyInput
            currency="EUR"
            value={eurValue}
            onChange={handleEurChange}
            flag="🇪🇺"
            name="Euro"
            disabled={isLoading}
          />
        </div>

        {/* Exchange Rates */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Cotações Atuais</h2>
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-4">
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
            </div>
          ) : rates ? (
            <div className="grid md:grid-cols-2 gap-4">
              <ExchangeRateCard
                currency="USD"
                flag="🇺🇸"
                name="Dólar Americano"
                buy={rates.USD.buy}
                sell={rates.USD.sell}
                variation={rates.USD.variation}
              />
              <ExchangeRateCard
                currency="EUR"
                flag="🇪🇺"
                name="Euro"
                buy={rates.EUR.buy}
                sell={rates.EUR.sell}
                variation={rates.EUR.variation}
              />
            </div>
          ) : null}
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-gradient-card">
            <div className="text-center space-y-2">
              <h3 className="font-semibold">Como funciona?</h3>
              <p className="text-sm text-muted-foreground">
                Digite um valor em qualquer uma das moedas e veja a conversão automática para as demais.
                As cotações são simuladas para demonstração do funcionamento.
              </p>
            </div>
          </Card>
          
          <ApiKeyInfo />
        </div>
      </div>
    </div>
  );
};

export default Index;
