
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Heart, Search, Calendar } from "lucide-react";
import { getFavorites, getSearchHistory } from "@/utils/localStorage";

interface Analytics {
  totalFavorites: number;
  totalSearches: number;
  topCuisines: { name: string; count: number }[];
  searchTrends: { term: string; count: number }[];
  mealPlanStats: { totalPlannedMeals: number; daysWithMeals: number };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<Analytics>({
    totalFavorites: 0,
    totalSearches: 0,
    topCuisines: [],
    searchTrends: [],
    mealPlanStats: { totalPlannedMeals: 0, daysWithMeals: 0 }
  });

  useEffect(() => {
    const calculateAnalytics = () => {
      const favorites = getFavorites();
      const searchHistory = getSearchHistory();
      const mealPlan = JSON.parse(localStorage.getItem('mealPlan') || '{}');

      // Calculate cuisine distribution
      const cuisineCount: { [key: string]: number } = {};
      favorites.forEach(recipe => {
        const cuisine = recipe.strArea || 'Unknown';
        cuisineCount[cuisine] = (cuisineCount[cuisine] || 0) + 1;
      });

      const topCuisines = Object.entries(cuisineCount)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Calculate search trends
      const searchCount: { [key: string]: number } = {};
      searchHistory.forEach(term => {
        searchCount[term] = (searchCount[term] || 0) + 1;
      });

      const searchTrends = Object.entries(searchCount)
        .map(([term, count]) => ({ term, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Calculate meal plan stats
      const totalPlannedMeals = Object.values(mealPlan).reduce((total: number, meals: any) => total + meals.length, 0);
      const daysWithMeals = Object.keys(mealPlan).filter(date => mealPlan[date].length > 0).length;

      setAnalytics({
        totalFavorites: favorites.length,
        totalSearches: searchHistory.length,
        topCuisines,
        searchTrends,
        mealPlanStats: { totalPlannedMeals, daysWithMeals }
      });
    };

    calculateAnalytics();
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Analytics Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400">Insights about your recipe preferences and usage</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Favorites</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalFavorites}</div>
            <p className="text-xs text-muted-foreground">Saved recipes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Searches</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalSearches}</div>
            <p className="text-xs text-muted-foreground">Search queries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planned Meals</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.mealPlanStats.totalPlannedMeals}</div>
            <p className="text-xs text-muted-foreground">Across {analytics.mealPlanStats.daysWithMeals} days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Cuisine</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.topCuisines[0]?.name || 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              {analytics.topCuisines[0]?.count || 0} recipes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Cuisines</CardTitle>
          </CardHeader>
          <CardContent>
            {analytics.topCuisines.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.topCuisines}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-500">
                No cuisine data available yet
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Search Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {analytics.searchTrends.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.searchTrends}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {analytics.searchTrends.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-500">
                No search data available yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Search Terms */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Search Terms</CardTitle>
        </CardHeader>
        <CardContent>
          {analytics.searchTrends.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {analytics.searchTrends.map((trend, index) => (
                <Badge key={trend.term} variant="secondary">
                  {trend.term} ({trend.count})
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No search history available yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
