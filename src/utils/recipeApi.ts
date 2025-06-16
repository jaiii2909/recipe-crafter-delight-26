
export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea?: string;
  strInstructions?: string;
}

export interface RecipeDetail {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strArea?: string;
  strCategory?: string;
  strSource?: string;
  strYoutube?: string;
  [key: string]: string | undefined;
}

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const searchRecipesByIngredients = async (ingredients: string): Promise<Recipe[]> => {
  try {
    // TheMealDB doesn't have ingredient-based search, so we'll search by main ingredient
    const mainIngredient = ingredients.split(',')[0].trim();
    const response = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(mainIngredient)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error searching recipes:', error);
    return [];
  }
};

export const getRecipeDetails = async (recipeId: string): Promise<RecipeDetail> => {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${recipeId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch recipe details');
    }
    
    const data = await response.json();
    
    if (!data.meals || data.meals.length === 0) {
      throw new Error('Recipe not found');
    }
    
    return data.meals[0];
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
};

export const searchRecipesByName = async (name: string): Promise<Recipe[]> => {
  try {
    const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(name)}`);
    
    if (!response.ok) {
      throw new Error('Failed to search recipes');
    }
    
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error searching recipes by name:', error);
    return [];
  }
};

export const getRandomRecipes = async (count: number = 10): Promise<Recipe[]> => {
  try {
    const promises = Array.from({ length: count }, () =>
      fetch(`${BASE_URL}/random.php`).then(res => res.json())
    );
    
    const results = await Promise.all(promises);
    return results
      .filter(result => result.meals && result.meals.length > 0)
      .map(result => result.meals[0]);
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    return [];
  }
};
