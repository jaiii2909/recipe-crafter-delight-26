
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, Clock, Users, MapPin, ExternalLink } from "lucide-react";
import { RecipeDetail as RecipeDetailType } from "@/utils/recipeApi";

interface RecipeDetailProps {
  recipe: RecipeDetailType;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

const RecipeDetail = ({ recipe, isOpen, onClose, isFavorite, onFavoriteToggle }: RecipeDetailProps) => {
  // Extract ingredients and measurements
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}` as keyof RecipeDetailType];
    const measure = recipe[`strMeasure${i}` as keyof RecipeDetailType];
    
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() || ""
      });
    }
  }

  const estimatedTime = Math.floor(Math.random() * 45) + 15;
  const estimatedServings = Math.floor(Math.random() * 6) + 2;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <DialogTitle className="text-2xl font-bold pr-4">{recipe.strMeal}</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              className={`${isFavorite ? "text-red-500" : "text-gray-500"}`}
              onClick={onFavoriteToggle}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image and Basic Info */}
          <div className="space-y-4">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-64 object-cover rounded-lg"
            />
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>{estimatedTime} minutes</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-gray-500" />
                <span>{estimatedServings} servings</span>
              </div>
              {recipe.strArea && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <Badge variant="secondary">{recipe.strArea}</Badge>
                </div>
              )}
            </div>

            {recipe.strCategory && (
              <Badge variant="outline" className="w-fit">
                {recipe.strCategory}
              </Badge>
            )}

            {(recipe.strSource || recipe.strYoutube) && (
              <div className="space-y-2">
                <Separator />
                <div className="flex gap-2">
                  {recipe.strSource && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={recipe.strSource} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Recipe Source
                      </a>
                    </Button>
                  )}
                  {recipe.strYoutube && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Watch Video
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Ingredients and Instructions */}
          <div className="space-y-6">
            {/* Ingredients */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
              <ul className="space-y-2">
                {ingredients.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">
                      <strong>{item.measure}</strong> {item.ingredient}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Instructions */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Instructions</h3>
              <div className="prose prose-sm">
                {recipe.strInstructions.split('\n').filter(line => line.trim()).map((step, index) => (
                  <p key={index} className="mb-3 text-sm leading-relaxed">
                    <span className="font-medium text-orange-600">Step {index + 1}:</span> {step.trim()}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetail;
