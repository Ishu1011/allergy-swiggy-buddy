import React from 'react';
import { UtensilsCrossed, Star } from 'lucide-react';

interface Dish {
  id: number;
  name: string;
  description: string;
  rating?: number;
  price: number;
  image_url?: string;
  restaurant_id: number;
}

interface ChatDishResultsProps {
  dishes: Dish[];
  onDishClick: (dish: Dish) => void;
}

const ChatDishResults: React.FC<ChatDishResultsProps> = ({ dishes, onDishClick }) => {
  if (!dishes || dishes.length === 0) return null;

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'bg-green-600';
    if (rating >= 3) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-2 mt-2">
      {dishes.map((dish) => (
        <div
          key={dish.id}
          onClick={() => onDishClick(dish)}
          className="bg-card/80 backdrop-blur-sm rounded-xl p-3 flex gap-3 cursor-pointer hover:bg-card transition-colors swiggy-shadow"
        >
          {/* Image */}
          <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden flex-shrink-0">
            {dish.image_url ? (
              <img
                src={dish.image_url}
                alt={dish.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/10">
                <UtensilsCrossed className="w-6 h-6 text-primary/40" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-semibold text-foreground text-sm truncate">
                {dish.name}
              </h4>
              {dish.rating && (
                <div
                  className={`flex items-center gap-0.5 text-white text-xs px-1.5 py-0.5 rounded-full ${getRatingColor(dish.rating)}`}
                >
                  <Star className="w-2.5 h-2.5 fill-current" />
                  <span>{dish.rating.toFixed(1)}</span>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
              {dish.description}
            </p>
            <p className="font-bold text-foreground text-sm mt-1">₹{dish.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatDishResults;
