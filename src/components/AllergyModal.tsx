import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { allergenList } from '@/hooks/useApi';
import { formatAllergenName } from '@/utils/allergenUtils';
import { cn } from '@/lib/utils';

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

  const handleSave = () => {
    onSave(selectedAllergies);
    onClose();
  };

  if (!isOpen) return null;

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
        <p className="text-sm text-muted-foreground mb-4">
          Select the allergens you want to be warned about:
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {allergenList.map((allergy) => {
            const isSelected = selectedAllergies.includes(allergy);
            return (
              <button
                key={allergy}
                onClick={() => toggleAllergy(allergy)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2',
                  isSelected
                    ? 'primary-gradient text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                {isSelected && <Check className="w-4 h-4" />}
                {formatAllergenName(allergy)}
              </button>
            );
          })}
        </div>

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
