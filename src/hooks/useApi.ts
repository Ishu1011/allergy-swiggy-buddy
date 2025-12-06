import { useAuth } from '@/contexts/AuthContext';

const API_BASE = 'https://your-api-base.com'; // Replace with actual API base

export const useApi = () => {
  const { token } = useAuth();

  const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  };

  return { fetchWithAuth };
};

// Mock data for development
export const mockDishes = [
  {
    id: 1,
    name: "Butter Chicken",
    description: "Creamy tomato-based curry with tender chicken pieces",
    price: 320,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop",
    restaurant_id: 1,
    allergen_summary: { egg: 0.0, soy: 0.0, fish: 0.0, milk: 0.95, wheat: 0.1, peanut: 0.0, sesame: 0.0, tree_nut: 0.15, shellfish: 0.0 }
  },
  {
    id: 2,
    name: "Paneer Tikka",
    description: "Grilled cottage cheese marinated in spices",
    price: 280,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop",
    restaurant_id: 1,
    allergen_summary: { egg: 0.0, soy: 0.0, fish: 0.0, milk: 0.98, wheat: 0.0, peanut: 0.0, sesame: 0.1, tree_nut: 0.0, shellfish: 0.0 }
  },
  {
    id: 3,
    name: "Vegetable Biryani",
    description: "Fragrant basmati rice with mixed vegetables and spices",
    price: 250,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
    restaurant_id: 2,
    allergen_summary: { egg: 0.0, soy: 0.0, fish: 0.0, milk: 0.2, wheat: 0.0, peanut: 0.0, sesame: 0.0, tree_nut: 0.3, shellfish: 0.0 }
  },
  {
    id: 4,
    name: "Chicken Momos",
    description: "Steamed dumplings filled with spiced chicken",
    price: 180,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop",
    restaurant_id: 3,
    allergen_summary: { egg: 0.3, soy: 0.6, fish: 0.0, milk: 0.0, wheat: 0.95, peanut: 0.0, sesame: 0.2, tree_nut: 0.0, shellfish: 0.0 }
  },
  {
    id: 5,
    name: "Fish Curry",
    description: "Traditional fish curry with coconut and spices",
    price: 350,
    image: "https://images.unsplash.com/photo-1626776877210-23fba9f19ec0?w=400&h=300&fit=crop",
    restaurant_id: 2,
    allergen_summary: { egg: 0.0, soy: 0.0, fish: 0.99, milk: 0.1, wheat: 0.0, peanut: 0.0, sesame: 0.0, tree_nut: 0.0, shellfish: 0.0 }
  },
  {
    id: 6,
    name: "Egg Fried Rice",
    description: "Wok-tossed rice with scrambled eggs and vegetables",
    price: 200,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
    restaurant_id: 3,
    allergen_summary: { egg: 0.99, soy: 0.8, fish: 0.0, milk: 0.0, wheat: 0.0, peanut: 0.0, sesame: 0.3, tree_nut: 0.0, shellfish: 0.0 }
  },
  {
    id: 7,
    name: "Naan Bread",
    description: "Soft leavened bread baked in tandoor",
    price: 60,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
    restaurant_id: 1,
    allergen_summary: { egg: 0.0, soy: 0.0, fish: 0.0, milk: 0.4, wheat: 0.99, peanut: 0.0, sesame: 0.0, tree_nut: 0.0, shellfish: 0.0 }
  },
  {
    id: 8,
    name: "Prawn Masala",
    description: "Succulent prawns in rich masala gravy",
    price: 420,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
    restaurant_id: 2,
    allergen_summary: { egg: 0.0, soy: 0.0, fish: 0.0, milk: 0.3, wheat: 0.0, peanut: 0.0, sesame: 0.0, tree_nut: 0.0, shellfish: 0.99 }
  },
  {
    id: 9,
    name: "Peanut Chutney Dosa",
    description: "Crispy dosa served with special peanut chutney",
    price: 150,
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop",
    restaurant_id: 4,
    allergen_summary: { egg: 0.0, soy: 0.0, fish: 0.0, milk: 0.0, wheat: 0.0, peanut: 0.95, sesame: 0.4, tree_nut: 0.0, shellfish: 0.0 }
  },
  {
    id: 10,
    name: "Almond Kheer",
    description: "Traditional rice pudding with almonds",
    price: 120,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",
    restaurant_id: 1,
    allergen_summary: { egg: 0.0, soy: 0.0, fish: 0.0, milk: 0.99, wheat: 0.0, peanut: 0.0, sesame: 0.0, tree_nut: 0.9, shellfish: 0.0 }
  },
  {
    id: 11,
    name: "Sesame Chicken",
    description: "Crispy chicken tossed in sesame sauce",
    price: 340,
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=300&fit=crop",
    restaurant_id: 3,
    allergen_summary: { egg: 0.2, soy: 0.85, fish: 0.0, milk: 0.0, wheat: 0.6, peanut: 0.0, sesame: 0.99, tree_nut: 0.0, shellfish: 0.0 }
  },
  {
    id: 12,
    name: "Plain Dosa",
    description: "Crispy South Indian crepe made from rice batter",
    price: 100,
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop",
    restaurant_id: 4,
    allergen_summary: { egg: 0.0, soy: 0.0, fish: 0.0, milk: 0.0, wheat: 0.0, peanut: 0.0, sesame: 0.0, tree_nut: 0.0, shellfish: 0.0 }
  },
];

export const mockRestaurants = [
  {
    id: 1,
    name: "Spice Garden",
    description: "Authentic North Indian cuisine",
    cuisine: "North Indian",
    rating: 4.3,
    delivery_time: "30-40 min",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Coastal Kitchen",
    description: "Fresh seafood and coastal delicacies",
    cuisine: "Coastal, Seafood",
    rating: 4.5,
    delivery_time: "35-45 min",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Dragon Wok",
    description: "Chinese and Asian fusion",
    cuisine: "Chinese, Asian",
    rating: 4.1,
    delivery_time: "25-35 min",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "South Spice",
    description: "Traditional South Indian flavors",
    cuisine: "South Indian",
    rating: 4.4,
    delivery_time: "20-30 min",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop",
  },
];

export const allergenList = [
  'egg',
  'soy',
  'fish',
  'milk',
  'wheat',
  'peanut',
  'sesame',
  'tree_nut',
  'shellfish',
];
