import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface CurrencyInputProps {
  currency: string;
  value: string;
  onChange: (value: string) => void;
  flag: string;
  name: string;
  disabled?: boolean;
}

export const CurrencyInput = ({ 
  currency, 
  value, 
  onChange, 
  flag, 
  name,
  disabled = false 
}: CurrencyInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Permite apenas números, vírgulas e pontos
    if (/^[\d.,]*$/.test(inputValue) || inputValue === '') {
      onChange(inputValue);
    }
  };

  return (
    <Card className="p-6 bg-gradient-card border border-border shadow-card hover:shadow-elegant transition-all duration-300">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{flag}</span>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">{currency}</Label>
            <p className="text-xs text-muted-foreground">{name}</p>
          </div>
        </div>
        
        <div className="relative">
          <Input
            type="text"
            value={value}
            onChange={handleChange}
            disabled={disabled}
            placeholder="0,00"
            className="text-2xl font-bold bg-transparent border-muted focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
    </Card>
  );
};