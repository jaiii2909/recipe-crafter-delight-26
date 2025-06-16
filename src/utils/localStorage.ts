
import { Recipe } from "./recipeApi";

const FAVORITES_KEY = "recipeFinder_favorites";
const SEARCH_HISTORY_KEY = "recipeFinder_searchHistory";

export const getFavorites = (): Recipe[] => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites from localStorage:', error);
    return [];
  }
};

export const addToFavorites = (recipe: Recipe): void => {
  try {
    const favorites = getFavorites();
    const isAlreadyFavorite = favorites.some(fav => fav.idMeal === recipe.idMeal);
    
    if (!isAlreadyFavorite) {
      const updatedFavorites = [...favorites, recipe];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    }
  } catch (error) {
    console.error('Error adding to favorites:', error);
  }
};

export const removeFromFavorites = (recipeId: string): void => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(fav => fav.idMeal !== recipeId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Error removing from favorites:', error);
  }
};

export const isFavorite = (recipeId: string): boolean => {
  try {
    const favorites = getFavorites();
    return favorites.some(fav => fav.idMeal === recipeId);
  } catch (error) {
    console.error('Error checking if recipe is favorite:', error);
    return false;
  }
};

export const getSearchHistory = (): string[] => {
  try {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting search history:', error);
    return [];
  }
};

export const addToSearchHistory = (searchTerm: string, maxItems: number = 5): void => {
  try {
    const history = getSearchHistory();
    const updatedHistory = [
      searchTerm,
      ...history.filter(term => term !== searchTerm)
    ].slice(0, maxItems);
    
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Error adding to search history:', error);
  }
};

export const clearSearchHistory = (): void => {
  try {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing search history:', error);
  }
};

export const clearFavorites = (): void => {
  try {
    localStorage.removeItem(FAVORITES_KEY);
  } catch (error) {
    console.error('Error clearing favorites:', error);
  }
};
