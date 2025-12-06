import React from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showLocation?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search for dishes...',
  showLocation = false,
}) => {
  return (
    <div className="sticky top-0 z-40 bg-card px-4 py-3 border-b border-border">
      {showLocation && (
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm font-semibold text-foreground">Home</p>
            <p className="text-xs text-muted-foreground">Mumbai, Maharashtra</p>
          </div>
        </div>
      )}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="input-swiggy pl-10"
        />
      </div>
    </div>
  );
};

export default SearchBar;
