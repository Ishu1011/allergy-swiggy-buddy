import React from 'react';
import { Shield, ShieldOff } from 'lucide-react';
import { useAllergyMode } from '@/contexts/AllergyModeContext';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

const AllergyToggle: React.FC = () => {
  const { isAllergyModeOn, toggleAllergyMode } = useAllergyMode();

  return (
    <div className="mx-4 my-3">
      <div
        className={cn(
          'flex items-center justify-between p-4 rounded-xl transition-all duration-300',
          isAllergyModeOn
            ? 'bg-success/10 border-2 border-success/30'
            : 'bg-muted border-2 border-transparent'
        )}
      >
        <div className="flex items-center gap-3">
          {isAllergyModeOn ? (
            <Shield className="w-6 h-6 text-success" />
          ) : (
            <ShieldOff className="w-6 h-6 text-muted-foreground" />
          )}
          <div>
            <p className="font-semibold text-foreground">
              Allergy Detection {isAllergyModeOn ? 'ON' : 'OFF'}
            </p>
            <p className="text-xs text-muted-foreground">
              {isAllergyModeOn
                ? 'Showing allergen warnings on dishes'
                : 'Allergen warnings are hidden'}
            </p>
          </div>
        </div>
        <Switch
          checked={isAllergyModeOn}
          onCheckedChange={toggleAllergyMode}
          className="data-[state=checked]:bg-success"
        />
      </div>
    </div>
  );
};

export default AllergyToggle;
