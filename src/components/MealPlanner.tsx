
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Plus, X } from "lucide-react";
import { Recipe } from "@/utils/recipeApi";
import { getFavorites } from "@/utils/localStorage";
import { format, startOfWeek, addDays } from "date-fns";

interface MealPlan {
  [key: string]: Recipe[];
}

const MealPlanner = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [mealPlan, setMealPlan] = useState<MealPlan>({});
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const savedFavorites = getFavorites();
    setFavorites(savedFavorites);

    const savedMealPlan = localStorage.getItem('mealPlan');
    if (savedMealPlan) {
      setMealPlan(JSON.parse(savedMealPlan));
    }
  }, []);

  const saveMealPlan = (newPlan: MealPlan) => {
    setMealPlan(newPlan);
    localStorage.setItem('mealPlan', JSON.stringify(newPlan));
  };

  const addRecipeToDate = (recipe: Recipe, date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const newPlan = {
      ...mealPlan,
      [dateKey]: [...(mealPlan[dateKey] || []), recipe]
    };
    saveMealPlan(newPlan);
    setShowFavorites(false);
  };

  const removeRecipeFromDate = (recipeId: string, date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const newPlan = {
      ...mealPlan,
      [dateKey]: (mealPlan[dateKey] || []).filter(r => r.idMeal !== recipeId)
    };
    saveMealPlan(newPlan);
  };

  const getWeekDays = () => {
    const start = startOfWeek(selectedDate);
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Meal Planner</h2>
        <p className="text-gray-600 dark:text-gray-400">Plan your weekly meals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Select Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Week of {format(startOfWeek(selectedDate), 'MMM d, yyyy')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
                {getWeekDays().map((day) => {
                  const dateKey = format(day, 'yyyy-MM-dd');
                  const dayMeals = mealPlan[dateKey] || [];

                  return (
                    <div key={dateKey} className="border rounded-lg p-3 space-y-2">
                      <div className="text-sm font-medium text-center">
                        {format(day, 'EEE')}
                        <br />
                        {format(day, 'MMM d')}
                      </div>
                      
                      <div className="space-y-1 min-h-[100px]">
                        {dayMeals.map((recipe) => (
                          <div key={recipe.idMeal} className="relative group">
                            <Badge 
                              variant="outline" 
                              className="w-full text-xs p-1 cursor-pointer"
                              title={recipe.strMeal}
                            >
                              <span className="truncate">{recipe.strMeal}</span>
                              <button
                                onClick={() => removeRecipeFromDate(recipe.idMeal, day)}
                                className="ml-1 opacity-0 group-hover:opacity-100 hover:text-red-500"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          </div>
                        ))}
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => setShowFavorites(true)}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add Meal
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {showFavorites && (
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Add Recipe from Favorites
              <Button variant="outline" size="sm" onClick={() => setShowFavorites(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {favorites.length === 0 ? (
              <p className="text-gray-500 text-center">No favorite recipes yet. Add some recipes to your favorites first!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favorites.map((recipe) => (
                  <div key={recipe.idMeal} className="border rounded-lg p-3 space-y-2">
                    <img 
                      src={recipe.strMealThumb} 
                      alt={recipe.strMeal}
                      className="w-full h-32 object-cover rounded"
                    />
                    <h3 className="font-medium text-sm">{recipe.strMeal}</h3>
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => addRecipeToDate(recipe, selectedDate)}
                    >
                      Add to {format(selectedDate, 'MMM d')}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MealPlanner;
