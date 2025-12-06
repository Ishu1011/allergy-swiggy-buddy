export interface AllergenSummary {
  egg: number;
  soy: number;
  fish: number;
  milk: number;
  wheat: number;
  peanut: number;
  sesame: number;
  tree_nut: number;
  shellfish: number;
}

export interface AllergenCheckResult {
  isSafe: boolean;
  unsafeAllergens: Array<{
    name: string;
    probability: number;
  }>;
  highestRisk: {
    name: string;
    probability: number;
  } | null;
}

export const checkDishSafety = (
  allergenSummary: AllergenSummary | null,
  userAllergies: string[]
): AllergenCheckResult => {
  if (!allergenSummary || userAllergies.length === 0) {
    return {
      isSafe: true,
      unsafeAllergens: [],
      highestRisk: null,
    };
  }

  const unsafeAllergens: Array<{ name: string; probability: number }> = [];

  for (const allergy of userAllergies) {
    const normalizedAllergy = allergy.toLowerCase().replace(' ', '_');
    const probability = allergenSummary[normalizedAllergy as keyof AllergenSummary];
    
    if (probability !== undefined && probability >= 0.5) {
      unsafeAllergens.push({
        name: allergy,
        probability: probability,
      });
    }
  }

  // Sort by probability (highest first)
  unsafeAllergens.sort((a, b) => b.probability - a.probability);

  return {
    isSafe: unsafeAllergens.length === 0,
    unsafeAllergens,
    highestRisk: unsafeAllergens[0] || null,
  };
};

export const formatAllergenName = (name: string): string => {
  return name
    .replace('_', ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const formatProbability = (probability: number): string => {
  return `${Math.round(probability * 100)}%`;
};
