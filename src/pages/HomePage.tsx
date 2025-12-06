import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import AllergyToggle from '@/components/AllergyToggle';
import DishCard from '@/components/DishCard';
import RestaurantCard from '@/components/RestaurantCard';
import BottomNavbar from '@/components/BottomNavbar';
import { mockDishes, mockRestaurants } from '@/hooks/useApi';
import { ChevronRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search for dishes or restaurants..."
        showLocation
      />

      {/* Allergy Toggle */}
      <AllergyToggle />

      {/* Popular Dishes Section */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Popular Dishes</h2>
          <button
            onClick={() => navigate('/search')}
            className="flex items-center gap-1 text-primary text-sm font-medium"
          >
            See all <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Horizontal Scroll */}
        <div className="overflow-x-auto hide-scrollbar -mx-4 px-4">
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {mockDishes.slice(0, 8).map((dish) => (
              <div key={dish.id} className="w-72 flex-shrink-0">
                <DishCard
                  id={dish.id}
                  name={dish.name}
                  description={dish.description}
                  price={dish.price}
                  image={dish.image}
                  allergenSummary={dish.allergen_summary}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants Section */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Restaurants Near You</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {mockRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.name}
              description={restaurant.description}
              cuisine={restaurant.cuisine}
              rating={restaurant.rating}
              deliveryTime={restaurant.delivery_time}
              image={restaurant.image}
            />
          ))}
        </div>
      </section>

      {/* More Dishes Section */}
      <section className="px-4 mb-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Explore More</h2>
        <div className="space-y-3">
          {mockDishes.slice(8).map((dish) => (
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
      </section>

      <BottomNavbar />
    </div>
  );
};

export default HomePage;
