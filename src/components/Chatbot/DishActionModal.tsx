import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, MapPin, X, Check } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';

interface Dish {
  id: number;
  name: string;
  description: string;
  rating?: number;
  price: number;
  image_url?: string;
  restaurant_id: number;
}

interface DishActionModalProps {
  dish: Dish | null;
  onClose: () => void;
}

const DishActionModal: React.FC<DishActionModalProps> = ({ dish, onClose }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);

  if (!dish) return null;

  const handleAddToCart = () => {
    addToCart({
      id: dish.id,
      name: dish.name,
      description: dish.description,
      price: dish.price,
      image_url: dish.image_url,
      restaurant_id: dish.restaurant_id,
    });
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 1200);
  };

  const handleGoToRestaurant = () => {
    onClose();
    navigate(`/restaurant/${dish.restaurant_id}`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          'relative bg-card rounded-2xl p-5 w-full max-w-xs swiggy-shadow animate-scale-in',
          showSuccess && 'pointer-events-none'
        )}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4 text-foreground" />
        </button>

        {/* Success Animation */}
        {showSuccess ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 rounded-full bg-success flex items-center justify-center mb-4 animate-bounce">
              <Check className="w-8 h-8 text-success-foreground" />
            </div>
            <p className="font-semibold text-foreground">Added to Cart!</p>
          </div>
        ) : (
          <>
            {/* Dish Name */}
            <h3 className="font-bold text-foreground text-lg pr-8 mb-4">
              {dish.name}
            </h3>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center gap-3 p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Add to Cart</p>
                  <p className="text-xs text-muted-foreground">₹{dish.price}</p>
                </div>
              </button>

              <button
                onClick={handleGoToRestaurant}
                className="w-full flex items-center gap-3 p-4 rounded-xl bg-secondary hover:bg-muted transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent-foreground" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Go to Restaurant</p>
                  <p className="text-xs text-muted-foreground">View full menu</p>
                </div>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DishActionModal;
