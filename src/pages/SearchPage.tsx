import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import DishCard from '@/components/DishCard';
import BottomNavbar from '@/components/BottomNavbar';
import { mockDishes } from '@/hooks/useApi';
import { Search } from 'lucide-react';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const filteredDishes = useMemo(() => {
    if (!searchQuery.trim()) {
      return mockDishes;
    }
    
    const query = searchQuery.toLowerCase();
    return mockDishes.filter(
      (dish) =>
        dish.name.toLowerCase().includes(query) ||
        dish.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search for dishes..."
      />

      {/* Results */}
      <div className="px-4 py-4">
        {searchQuery && (
          <p className="text-sm text-muted-foreground mb-4">
            {filteredDishes.length} result{filteredDishes.length !== 1 ? 's' : ''} for "{searchQuery}"
          </p>
        )}

        {filteredDishes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Search className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No dishes found
            </h3>
            <p className="text-muted-foreground text-center">
              Try searching with different keywords
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredDishes.map((dish) => (
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
      </div>

      <BottomNavbar />
    </div>
  );
};

export default SearchPage;
