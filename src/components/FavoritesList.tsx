
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import RecipeCard from "./RecipeCard";
import { Recipe } from "@/utils/recipeApi";

interface FavoritesListProps {
  favorites: Recipe[];
  onFavoriteToggle: (recipe: Recipe) => void;
  onRecipeClick: (recipeId: string) => void;
}

const FavoritesList = ({ favorites, onFavoriteToggle, onRecipeClick }: FavoritesListProps) => {
  if (favorites.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <Heart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Favorites Yet</h3>
          <p className="text-gray-500">
            Start adding recipes to your favorites by clicking the heart icon on any recipe!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Favorite Recipes</h2>
        <p className="text-gray-600">You have {favorites.length} saved recipes</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            isFavorite={true}
            onFavoriteToggle={() => onFavoriteToggle(recipe)}
            onClick={() => onRecipeClick(recipe.idMeal)}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
