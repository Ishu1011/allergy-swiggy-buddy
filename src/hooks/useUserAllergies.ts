import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const useUserAllergies = () => {
  const { token, isAuthenticated } = useAuth();
  const [allergies, setAllergies] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllergies = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    try {
      // Try to fetch from API
      const response = await fetch('https://your-api-base.com/api/user/allergies', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAllergies(data.allergies || data || []);
        return;
      }
    } catch (error) {
      // Fallback to localStorage for demo
      const stored = localStorage.getItem('user_allergies');
      if (stored) {
        setAllergies(JSON.parse(stored));
      }
    } finally {
      setIsLoading(false);
    }
  }, [token, isAuthenticated]);

  const saveAllergies = async (newAllergies: string[]) => {
    setIsLoading(true);
    try {
      // Try to save to API
      await fetch('https://your-api-base.com/api/user/allergies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ allergies: newAllergies }),
      });
    } catch (error) {
      // Fallback: save to localStorage for demo
    } finally {
      localStorage.setItem('user_allergies', JSON.stringify(newAllergies));
      setAllergies(newAllergies);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllergies();
  }, [fetchAllergies]);

  return { allergies, saveAllergies, isLoading, refetch: fetchAllergies };
};
