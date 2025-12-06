import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, ChefHat } from 'lucide-react';

interface RestaurantCardProps {
  id: number;
  name: string;
  description: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  image?: string | null;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  description,
  cuisine,
  rating,
  deliveryTime,
  image,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="restaurant-card cursor-pointer"
      onClick={() => navigate(`/restaurant/${id}`)}
    >
      {/* Restaurant Image */}
      <div className="h-36 bg-muted overflow-hidden relative">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/30 to-primary/10">
            <ChefHat className="w-12 h-12 text-primary/50" />
          </div>
        )}
        {/* Rating Badge */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-card/95 backdrop-blur-sm px-2 py-1 rounded-md">
          <Star className="w-4 h-4 text-warning fill-warning" />
          <span className="text-sm font-semibold text-foreground">{rating}</span>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="p-3">
        <h3 className="font-semibold text-foreground text-base truncate">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground truncate mt-0.5">
          {cuisine}
        </p>
        <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{deliveryTime}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
