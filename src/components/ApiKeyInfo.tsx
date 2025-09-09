import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ApiKeyInfo = () => {
  return (
    <Card className="p-6 bg-gradient-card border border-border">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Informação sobre a API</h3>
          <Badge variant="outline" className="text-xs">Demo</Badge>
        </div>
        
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            Este conversor utiliza <strong>cotações simuladas</strong> para demonstração. 
            Os valores mudam a cada atualização para simular variações reais do mercado.
          </p>
          
          <div className="bg-secondary/50 p-3 rounded-lg">
            <p className="font-medium text-foreground mb-1">Para usar dados reais:</p>
            <p>
              Registre-se na <strong>HG Brasil</strong> e obtenha uma chave API gratuita 
              para acessar cotações em tempo real do mercado financeiro.
            </p>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => window.open('https://console.hgbrasil.com/keys/new_key_plan', '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Obter chave API gratuita
          </Button>
        </div>
      </div>
    </Card>
  );
};