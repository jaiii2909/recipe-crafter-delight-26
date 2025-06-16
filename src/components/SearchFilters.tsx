
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, SortAsc } from "lucide-react";

interface SearchFiltersProps {
  filters: {
    cuisine: string;
    dietary: string;
    maxTime: string;
  };
  setFilters: (filters: any) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

const SearchFilters = ({ filters, setFilters, sortBy, setSortBy }: SearchFiltersProps) => {
  const cuisines = [
    "American", "British", "Canadian", "Chinese", "Croatian", "Dutch", "Egyptian", 
    "French", "Greek", "Indian", "Irish", "Italian", "Jamaican", "Japanese", 
    "Malaysian", "Mexican", "Moroccan", "Polish", "Portuguese", "Russian", 
    "Spanish", "Thai", "Turkish", "Vietnamese"
  ];

  const dietaryOptions = [
    { value: "vegetarian", label: "Vegetarian" },
    { value: "vegan", label: "Vegan" },
    { value: "gluten-free", label: "Gluten-Free" }
  ];

  const clearFilters = () => {
    setFilters({ cuisine: "", dietary: "", maxTime: "" });
  };

  const hasActiveFilters = filters.cuisine || filters.dietary || filters.maxTime;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters & Sorting
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Cuisine Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Cuisine</label>
            <Select
              value={filters.cuisine}
              onValueChange={(value) => setFilters({ ...filters, cuisine: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any cuisine" />
              </SelectTrigger>
              <SelectContent>
                {cuisines.map(cuisine => (
                  <SelectItem key={cuisine} value={cuisine}>{cuisine}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dietary Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Dietary</label>
            <Select
              value={filters.dietary}
              onValueChange={(value) => setFilters({ ...filters, dietary: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any dietary need" />
              </SelectTrigger>
              <SelectContent>
                {dietaryOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Max Time Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Max Time</label>
            <Select
              value={filters.maxTime}
              onValueChange={(value) => setFilters({ ...filters, maxTime: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <SortAsc className="w-4 h-4" />
              Sort By
            </label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="time">Cooking Time</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium">Active filters:</span>
            {filters.cuisine && (
              <Badge variant="secondary">
                Cuisine: {filters.cuisine}
              </Badge>
            )}
            {filters.dietary && (
              <Badge variant="secondary">
                {dietaryOptions.find(opt => opt.value === filters.dietary)?.label}
              </Badge>
            )}
            {filters.maxTime && (
              <Badge variant="secondary">
                Max: {filters.maxTime} min
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
