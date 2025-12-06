import React from 'react';
import { Shield, ShieldOff, Sun, Moon, Monitor } from 'lucide-react';
import { useAllergyMode } from '@/contexts/AllergyModeContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const SettingsPanel: React.FC = () => {
  const { isAllergyModeOn, toggleAllergyMode } = useAllergyMode();
  const { theme, setTheme } = useTheme();

  return (
    <div className="mx-4 my-3">
      <div className="bg-card rounded-xl swiggy-shadow p-3 flex gap-3">
        {/* Allergy Detection Toggle */}
        <button
          onClick={toggleAllergyMode}
          className={cn(
            'flex-1 flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200',
            isAllergyModeOn
              ? 'bg-success/15 border-2 border-success/40'
              : 'bg-muted/50 border-2 border-transparent'
          )}
        >
          {isAllergyModeOn ? (
            <Shield className="w-6 h-6 text-success" />
          ) : (
            <ShieldOff className="w-6 h-6 text-muted-foreground" />
          )}
          <div className="text-center">
            <p className="text-xs font-semibold text-foreground">
              Allergy
            </p>
            <p className={cn(
              "text-[10px] font-medium",
              isAllergyModeOn ? "text-success" : "text-muted-foreground"
            )}>
              {isAllergyModeOn ? 'ON' : 'OFF'}
            </p>
          </div>
        </button>

        {/* Theme Toggles */}
        <div className="flex-1 flex gap-1">
          <button
            onClick={() => setTheme('light')}
            className={cn(
              'flex-1 flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200',
              theme === 'light'
                ? 'bg-primary/15 border-2 border-primary/40'
                : 'bg-muted/50 border-2 border-transparent hover:bg-muted'
            )}
          >
            <Sun className={cn(
              "w-5 h-5",
              theme === 'light' ? "text-primary" : "text-muted-foreground"
            )} />
            <p className={cn(
              "text-[10px] font-medium",
              theme === 'light' ? "text-primary" : "text-muted-foreground"
            )}>
              Light
            </p>
          </button>

          <button
            onClick={() => setTheme('dark')}
            className={cn(
              'flex-1 flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200',
              theme === 'dark'
                ? 'bg-primary/15 border-2 border-primary/40'
                : 'bg-muted/50 border-2 border-transparent hover:bg-muted'
            )}
          >
            <Moon className={cn(
              "w-5 h-5",
              theme === 'dark' ? "text-primary" : "text-muted-foreground"
            )} />
            <p className={cn(
              "text-[10px] font-medium",
              theme === 'dark' ? "text-primary" : "text-muted-foreground"
            )}>
              Dark
            </p>
          </button>

          <button
            onClick={() => setTheme('system')}
            className={cn(
              'flex-1 flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200',
              theme === 'system'
                ? 'bg-primary/15 border-2 border-primary/40'
                : 'bg-muted/50 border-2 border-transparent hover:bg-muted'
            )}
          >
            <Monitor className={cn(
              "w-5 h-5",
              theme === 'system' ? "text-primary" : "text-muted-foreground"
            )} />
            <p className={cn(
              "text-[10px] font-medium",
              theme === 'system' ? "text-primary" : "text-muted-foreground"
            )}>
              Auto
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
