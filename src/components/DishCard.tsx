import React from 'react';
import { useAllergyMode } from '@/contexts/AllergyModeContext';
import { useUserAllergies } from '@/hooks/useUserAllergies';
import { checkDishSafety, AllergenSummary } from '@/utils/allergenUtils';
import AllergyBadge from './AllergyBadge';
import { UtensilsCrossed } from 'lucide-react';

interface DishCardProps {
  id: number;
  name: string;
  description: string;
  price?: number;
  image?: string | null;
  allergenSummary: AllergenSummary | null;
  onClick?: () => void;
}

const DishCard: React.FC<DishCardProps> = ({
  name,
  description,
  price,
  image,
  allergenSummary,
  onClick,
}) => {
  const { isAllergyModeOn } = useAllergyMode();
  const { allergies } = useUserAllergies();

  const checkResult = checkDishSafety(allergenSummary, allergies);

  return (
    <div
      className="dish-card p-4 flex gap-4 cursor-pointer"
      onClick={onClick}
    >
      {/* Dish Image */}
      <div className="flex-shrink-0 w-24 h-24 rounded-lg bg-muted overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            <UtensilsCrossed className="w-8 h-8 text-primary/40" />
          </div>
        )}
      </div>

      {/* Dish Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground text-base truncate">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {description}
        </p>
        
        <div className="flex items-center justify-between mt-2">
          {price && (
            <p className="font-semibold text-foreground">₹{price}</p>
          )}
          
          {/* Allergy Badge - only show when mode is ON */}
          {isAllergyModeOn && allergies.length > 0 && (
            <AllergyBadge checkResult={checkResult} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DishCard;
