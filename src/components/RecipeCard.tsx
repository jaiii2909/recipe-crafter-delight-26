
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Clock, Users, MapPin } from "lucide-react";
import { Recipe } from "@/utils/recipeApi";

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onClick: () => void;
}

const RecipeCard = ({ recipe, isFavorite, onFavoriteToggle, onClick }: RecipeCardProps) => {
  // Simulate prep time and servings based on recipe complexity
  const estimatedTime = Math.floor(Math.random() * 45) + 15; // 15-60 minutes
  const estimatedServings = Math.floor(Math.random() * 6) + 2; // 2-8 servings

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group">
      <div onClick={onClick}>
        <div className="relative">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <Button
              variant="ghost"
              size="sm"
              className={`bg-white/90 hover:bg-white ${
                isFavorite ? "text-red-500" : "text-gray-500"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteToggle();
              }}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>
        
        <CardHeader className="pb-2">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-orange-600 transition-colors">
            {recipe.strMeal}
          </h3>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{estimatedTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{estimatedServings} servings</span>
            </div>
          </div>
          
          {recipe.strArea && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-gray-500" />
              <Badge variant="secondary" className="text-xs">
                {recipe.strArea}
              </Badge>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export default RecipeCard;
