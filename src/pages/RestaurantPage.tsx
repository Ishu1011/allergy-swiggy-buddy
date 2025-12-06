import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, MapPin } from 'lucide-react';
import DishCard from '@/components/DishCard';
import BottomNavbar from '@/components/BottomNavbar';
import { mockRestaurants, mockDishes } from '@/hooks/useApi';

const RestaurantPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const restaurantId = parseInt(id || '0');
  const restaurant = mockRestaurants.find((r) => r.id === restaurantId);
  const dishes = mockDishes.filter((d) => d.restaurant_id === restaurantId);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">Restaurant not found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-primary font-medium hover:underline"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary/30 to-primary/10">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center swiggy-shadow"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Restaurant Info */}
      <div className="px-4 -mt-6 relative z-10">
        <div className="bg-card rounded-xl p-4 swiggy-shadow">
          <h1 className="text-2xl font-bold text-foreground">{restaurant.name}</h1>
          <p className="text-muted-foreground mt-1">{restaurant.cuisine}</p>
          
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-warning fill-warning" />
              <span className="font-semibold text-foreground">{restaurant.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{restaurant.delivery_time}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">2.5 km</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <section className="px-4 mt-6">
        <h2 className="text-lg font-bold text-foreground mb-4">
          Menu ({dishes.length} items)
        </h2>
        
        {dishes.length === 0 ? (
          <div className="bg-card rounded-xl p-8 text-center">
            <p className="text-muted-foreground">No dishes available</p>
          </div>
        ) : (
          <div className="space-y-3">
            {dishes.map((dish) => (
              <DishCard
                key={dish.id}
                id={dish.id}
                name={dish.name}
                description={dish.description}
                price={dish.price}
                image={dish.image}
                allergenSummary={dish.allergen_summary}
              />
            ))}
          </div>
        )}
      </section>

      <BottomNavbar />
    </div>
  );
};

export default RestaurantPage;
