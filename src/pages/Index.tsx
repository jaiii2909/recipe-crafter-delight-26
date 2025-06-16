import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Heart, Clock, Users, Filter, History, Calendar, BarChart } from "lucide-react";
import RecipeCard from "@/components/RecipeCard";
import RecipeDetail from "@/components/RecipeDetail";
import SearchFilters from "@/components/SearchFilters";
import FavoritesList from "@/components/FavoritesList";
import MealPlanner from "@/components/MealPlanner";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import ThemeToggle from "@/components/ThemeToggle";
import { searchRecipesByIngredients, getRecipeDetails, Recipe, RecipeDetail as RecipeDetailType } from "@/utils/recipeApi";
import { getFavorites, addToFavorites, removeFromFavorites } from "@/utils/localStorage";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetailType | null>(null);
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    cuisine: "",
    dietary: "",
    maxTime: ""
  });
  const [sortBy, setSortBy] = useState("name");
  const { toast } = useToast();

  useEffect(() => {
    const savedFavorites = getFavorites();
    setFavorites(savedFavorites);
    
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    try {
      const results = await searchRecipesByIngredients(searchTerm);
      setRecipes(results);
      
      // Update search history
      const newHistory = [searchTerm, ...searchHistory.filter(term => term !== searchTerm)].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
      
      toast({
        title: "Search Complete",
        description: `Found ${results.length} recipes matching your ingredients!`,
      });
    } catch (error) {
      toast({
        title: "Search Error",
        description: "Failed to fetch recipes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecipeClick = async (recipeId: string) => {
    try {
      const details = await getRecipeDetails(recipeId);
      setSelectedRecipe(details);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load recipe details.",
        variant: "destructive",
      });
    }
  };

  const handleFavoriteToggle = (recipe: Recipe) => {
    const isFavorite = favorites.some(fav => fav.idMeal === recipe.idMeal);
    
    if (isFavorite) {
      removeFromFavorites(recipe.idMeal);
      setFavorites(favorites.filter(fav => fav.idMeal !== recipe.idMeal));
      toast({
        title: "Removed from Favorites",
        description: `${recipe.strMeal} removed from your favorites.`,
      });
    } else {
      addToFavorites(recipe);
      setFavorites([...favorites, recipe]);
      toast({
        title: "Added to Favorites",
        description: `${recipe.strMeal} added to your favorites!`,
      });
    }
  };

  const filteredAndSortedRecipes = recipes
    .filter(recipe => {
      if (filters.cuisine && recipe.strArea !== filters.cuisine) return false;
      if (filters.dietary) {
        // Basic dietary filtering based on recipe name/ingredients
        const dietaryKeywords = {
          vegetarian: ['vegetarian', 'veggie'],
          vegan: ['vegan'],
          'gluten-free': ['gluten-free', 'gluten free']
        };
        const keywords = dietaryKeywords[filters.dietary as keyof typeof dietaryKeywords] || [];
        const hasKeyword = keywords.some(keyword => 
          recipe.strMeal.toLowerCase().includes(keyword) ||
          recipe.strInstructions?.toLowerCase().includes(keyword)
        );
        if (!hasKeyword) return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.strMeal.localeCompare(b.strMeal);
        case "time":
          // Simulate cooking time based on instruction length
          const timeA = a.strInstructions?.length || 0;
          const timeB = b.strInstructions?.length || 0;
          return timeA - timeB;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8 relative">
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">Recipe Finder</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Discover delicious recipes based on your ingredients</p>
        </header>

        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Search
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Favorites ({favorites.length})
            </TabsTrigger>
            <TabsTrigger value="planner" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Meal Planner
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            {/* Search Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Search by Ingredients
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter ingredients (e.g., chicken, rice, tomato)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="flex-1"
                  />
                  <Button onClick={handleSearch} disabled={isLoading}>
                    {isLoading ? "Searching..." : "Search"}
                  </Button>
                </div>

                {/* Search History */}
                {searchHistory.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <History className="w-4 h-4" />
                      Recent Searches:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {searchHistory.map((term, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-900"
                          onClick={() => setSearchTerm(term)}
                        >
                          {term}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Filters and Sorting */}
            <SearchFilters 
              filters={filters}
              setFilters={setFilters}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

            {/* Recipe Results */}
            {filteredAndSortedRecipes.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.idMeal}
                    recipe={recipe}
                    isFavorite={favorites.some(fav => fav.idMeal === recipe.idMeal)}
                    onFavoriteToggle={() => handleFavoriteToggle(recipe)}
                    onClick={() => handleRecipeClick(recipe.idMeal)}
                  />
                ))}
              </div>
            )}

            {recipes.length === 0 && !isLoading && (
              <Card className="text-center py-12">
                <CardContent>
                  <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">Start Your Recipe Search</h3>
                  <p className="text-gray-500 dark:text-gray-500">Enter some ingredients above to find delicious recipes!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="favorites">
            <FavoritesList
              favorites={favorites}
              onFavoriteToggle={handleFavoriteToggle}
              onRecipeClick={handleRecipeClick}
            />
          </TabsContent>

          <TabsContent value="planner">
            <MealPlanner />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>

        {/* Recipe Detail Modal */}
        {selectedRecipe && (
          <RecipeDetail
            recipe={selectedRecipe}
            isOpen={!!selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
            isFavorite={favorites.some(fav => fav.idMeal === selectedRecipe.idMeal)}
            onFavoriteToggle={() => {
              const recipeData: Recipe = {
                idMeal: selectedRecipe.idMeal,
                strMeal: selectedRecipe.strMeal,
                strMealThumb: selectedRecipe.strMealThumb,
                strArea: selectedRecipe.strArea,
                strInstructions: selectedRecipe.strInstructions
              };
              handleFavoriteToggle(recipeData);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
