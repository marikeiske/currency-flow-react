import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface ExchangeRateCardProps {
  currency: string;
  flag: string;
  name: string;
  buy: number;
  sell: number;
  variation: number;
}

export const ExchangeRateCard = ({
  currency,
  flag,
  name,
  buy,
  sell,
  variation
}: ExchangeRateCardProps) => {
  const isPositive = variation >= 0;
  
  return (
    <Card className="p-4 bg-gradient-card border border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-xl">{flag}</span>
          <div>
            <h3 className="font-semibold text-sm">{currency}</h3>
            <p className="text-xs text-muted-foreground">{name}</p>
          </div>
        </div>
        
        <div className="text-right space-y-1">
          <div className="text-sm">
            <span className="text-muted-foreground">Compra: </span>
            <span className="font-semibold">R$ {buy.toFixed(4)}</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Venda: </span>
            <span className="font-semibold">R$ {sell.toFixed(4)}</span>
          </div>
          <Badge 
            variant={isPositive ? "default" : "destructive"} 
            className="text-xs"
          >
            {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
            {variation > 0 ? '+' : ''}{variation.toFixed(2)}%
          </Badge>
        </div>
      </div>
    </Card>
  );
};