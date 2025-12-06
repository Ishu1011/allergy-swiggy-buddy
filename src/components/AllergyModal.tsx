import React, { useState, useEffect } from 'react';
import { X, Check, Plus } from 'lucide-react';
import { allergenList } from '@/hooks/useApi';
import { formatAllergenName } from '@/utils/allergenUtils';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface AllergyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAllergies: string[];
  onSave: (allergies: string[]) => void;
}

const AllergyModal: React.FC<AllergyModalProps> = ({
  isOpen,
  onClose,
  currentAllergies,
  onSave,
}) => {
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [customAllergen, setCustomAllergen] = useState('');

  useEffect(() => {
    setSelectedAllergies(currentAllergies);
  }, [currentAllergies, isOpen]);

  const toggleAllergy = (allergy: string) => {
    setSelectedAllergies((prev) =>
      prev.includes(allergy)
        ? prev.filter((a) => a !== allergy)
        : [...prev, allergy]
    );
  };

  const addCustomAllergen = () => {
    const trimmed = customAllergen.trim().toLowerCase().replace(/\s+/g, '_');
    if (trimmed && !selectedAllergies.includes(trimmed)) {
      setSelectedAllergies((prev) => [...prev, trimmed]);
      setCustomAllergen('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomAllergen();
    }
  };

  const handleSave = () => {
    onSave(selectedAllergies);
    onClose();
  };

  if (!isOpen) return null;

  // Separate known and custom allergies
  const knownAllergies = selectedAllergies.filter((a) => allergenList.includes(a));
  const customAllergies = selectedAllergies.filter((a) => !allergenList.includes(a));

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card w-full max-w-md rounded-t-2xl sm:rounded-2xl p-6 animate-slide-up max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Edit Allergies</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Allergy Chips */}
        <p className="text-sm text-muted-foreground mb-3">
          Select common allergens:
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {allergenList.map((allergy) => {
            const isSelected = knownAllergies.includes(allergy);
            return (
              <button
                key={allergy}
                onClick={() => toggleAllergy(allergy)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5',
                  isSelected
                    ? 'primary-gradient text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
                {formatAllergenName(allergy)}
              </button>
            );
          })}
        </div>

        {/* Custom Allergen Input */}
        <p className="text-sm text-muted-foreground mb-2">
          Or add a custom allergen:
        </p>
        <div className="flex gap-2 mb-4">
          <Input
            value={customAllergen}
            onChange={(e) => setCustomAllergen(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., kiwi, mustard..."
            className="flex-1"
          />
          <button
            onClick={addCustomAllergen}
            disabled={!customAllergen.trim()}
            className="btn-secondary px-3 disabled:opacity-50"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Custom Allergies Display */}
        {customAllergies.length > 0 && (
          <div className="mb-5">
            <p className="text-xs text-muted-foreground mb-2">Custom allergens:</p>
            <div className="flex flex-wrap gap-2">
              {customAllergies.map((allergy) => (
                <button
                  key={allergy}
                  onClick={() => toggleAllergy(allergy)}
                  className="px-3 py-1.5 rounded-full text-sm font-medium primary-gradient text-primary-foreground flex items-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" />
                  {formatAllergenName(allergy)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button onClick={onClose} className="btn-secondary flex-1">
            Cancel
          </button>
          <button onClick={handleSave} className="btn-primary flex-1">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllergyModal;
