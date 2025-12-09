import React from 'react';
import { useAllergyMode } from '@/contexts/AllergyModeContext';
import { useUserAllergies } from '@/hooks/useUserAllergies';
import { checkDishSafety, AllergenSummary } from '@/utils/allergenUtils';
import AllergyBadge from './AllergyBadge';
import { UtensilsCrossed, Star } from 'lucide-react';

interface DishCardProps {
  id: number;
  name: string;
  description: string;
  price?: number;
  image?: string | null;
  rating?: number;
  allergenSummary: AllergenSummary | null;
  onClick?: () => void;
}

const DishCard: React.FC<DishCardProps> = ({
  name,
  description,
  price,
  image,
  rating,
  allergenSummary,
  onClick,
}) => {
  const { isAllergyModeOn } = useAllergyMode();
  const { allergies } = useUserAllergies();

  const checkResult = checkDishSafety(allergenSummary, allergies);

  const getRatingColor = (r: number) => {
    if (r >= 4) return 'bg-green-600';
    if (r >= 3) return 'bg-orange-500';
    return 'bg-red-500';
  };

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
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground text-base truncate max-w-[65%]">
            {name}
          </h3>
          {rating !== undefined && rating > 0 && (
            <div
              className={`flex items-center gap-1 text-white text-xs px-2 py-0.5 rounded-full ${getRatingColor(rating)}`}
            >
              <Star className="w-3 h-3 fill-current" />
              <span>{rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {description}
        </p>
        
        <div className="flex items-center justify-between mt-2">
          {price !== undefined && (
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
