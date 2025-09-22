import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Checkbox } from "../components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Slider } from "../components/ui/slider";
import { MapPin, Home, Square, Ruble, Filter, X, Loader2 } from "lucide-react";
import { api } from "../services/api";
import { useCachedApi } from "../hooks/useApi";

export const ObjectsPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    complexes: [],
    type: "all",
    area: [20, 120],
    price: [1000000, 15000000]
  });
  const [sortBy, setSortBy] = useState("price-asc");
  const [showFilters, setShowFilters] = useState(false);
  
  // Загружаем данные через API
  const { data: complexes, loading: complexesLoading, error: complexesError } = useCachedApi(
    api.complexes.getComplexes, 
    'complexes'
  );
  
  const { data: apartments, loading: apartmentsLoading, error: apartmentsError } = useCachedApi(
    api.apartments.getApartments, 
    'apartments'
  );

  const handleComplexFilter = (complexId, checked) => {
    setFilters(prev => ({
      ...prev,
      complexes: checked 
        ? [...prev.complexes, complexId]
        : prev.complexes.filter(id => id !== complexId)
    }));
  };

  const handleTypeFilter = (type) => {
    setFilters(prev => ({ ...prev, type }));
  };

  const handleAreaFilter = (area) => {
    setFilters(prev => ({ ...prev, area }));
  };

  const handlePriceFilter = (price) => {
    setFilters(prev => ({ ...prev, price }));
  };

  const clearFilters = () => {
    setFilters({
      complexes: [],
      type: "all",
      area: [20, 120],
      price: [1000000, 15000000]
    });
  };

  const filteredAndSortedApartments = useMemo(() => {
    if (!apartments) return [];
    
    let filtered = apartments.filter(apt => {
      // Complex filter
      if (filters.complexes.length > 0 && !filters.complexes.includes(apt.complexId)) {
        return false;
      }

      // Type filter
      if (filters.type !== "all" && apt.type !== filters.type) {
        return false;
      }

      // Area filter
      if (apt.area < filters.area[0] || apt.area > filters.area[1]) {
        return false;
      }

      // Price filter
      if (apt.price < filters.price[0] || apt.price > filters.price[1]) {
        return false;
      }

      return true;
    });

    // Sorting
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "area-asc":
        filtered.sort((a, b) => a.area - b.area);
        break;
      case "area-desc":
        filtered.sort((a, b) => b.area - a.area);
        break;
      default:
        break;
    }

    return filtered;
  }, [apartments, filters, sortBy]);

  const getComplexName = (complexId) => {
    if (!complexes) return "";
    return complexes.find(c => c.id === complexId)?.name || "";
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  const getTypeLabel = (type) => {
    const labels = {
      "квартира": "Квартира",
      "парковка": "Парковка", 
      "кладовая": "Кладовая"
    };
    return labels[type] || type;
  };

  const FiltersPanel = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[#4b4b4d]">Фильтры</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearFilters}
          className="text-[#f69700] hover:text-[#e8860a]"
        >
          Сбросить
        </Button>
      </div>

      {/* Complex Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-[#4b4b4d] mb-3">Жилой комплекс</h4>
        <div className="space-y-2">
          {complexes?.map((complex) => (
            <div key={complex.id} className="flex items-center space-x-2">
              <Checkbox
                id={`complex-${complex.id}`}
                checked={filters.complexes.includes(complex.id)}
                onCheckedChange={(checked) => handleComplexFilter(complex.id, checked)}
              />
              <label 
                htmlFor={`complex-${complex.id}`}
                className="text-sm text-[#4b4b4d] cursor-pointer"
              >
                {complex.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-[#4b4b4d] mb-3">Тип недвижимости</h4>
        <Select value={filters.type} onValueChange={handleTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Все типы" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все типы</SelectItem>
            <SelectItem value="квартира">Квартиры</SelectItem>
            <SelectItem value="парковка">Парковки</SelectItem>
            <SelectItem value="кладовая">Кладовые</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Area Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-[#4b4b4d] mb-3">
          Площадь: {filters.area[0]} - {filters.area[1]} м²
        </h4>
        <Slider
          value={filters.area}
          onValueChange={handleAreaFilter}
          min={20}
          max={120}
          step={5}
          className="w-full"
        />
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-[#4b4b4d] mb-3">
          Цена: {formatPrice(filters.price[0])} - {formatPrice(filters.price[1])} ₽
        </h4>
        <Slider
          value={filters.price}
          onValueChange={handlePriceFilter}
          min={1000000}
          max={15000000}
          step={100000}
          className="w-full"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-[#4b4b4d] mb-4">
            Каталог объектов
          </h1>
          <p className="text-lg text-gray-600">
            {apartmentsLoading ? (
              "Загрузка предложений..."
            ) : (
              `Найдите свою идеальную квартиру среди ${apartments?.length || 0} предложений`
            )}
          </p>
        </div>

        {/* Mobile Filter Button */}
        <div className="md:hidden mb-4">
          <Button 
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-[#f69700] hover:bg-[#e8860a] text-white"
          >
            <Filter size={20} className="mr-2" />
            {showFilters ? "Скрыть фильтры" : "Показать фильтры"}
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <FiltersPanel />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <p className="text-[#4b4b4d]">
                Найдено <span className="font-semibold">{filteredAndSortedApartments.length}</span> объектов
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Сортировка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">По цене (возр.)</SelectItem>
                  <SelectItem value="price-desc">По цене (убыв.)</SelectItem>
                  <SelectItem value="area-asc">По площади (возр.)</SelectItem>
                  <SelectItem value="area-desc">По площади (убыв.)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Grid */}
            {apartmentsLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 size={32} className="animate-spin text-[#f69700]" />
              </div>
            ) : apartmentsError ? (
              <div className="text-center py-12">
                <p className="text-red-500">Ошибка загрузки квартир</p>
              </div>
            ) : filteredAndSortedApartments.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredAndSortedApartments.map((apartment) => (
                  <Card key={apartment.id} className="card-hover">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <Badge variant="outline" className="mb-2">
                            {getTypeLabel(apartment.type)}
                          </Badge>
                          <h3 className="text-lg font-bold text-[#4b4b4d]">
                            {apartment.type === "квартира" 
                              ? `${apartment.rooms}-комнатная` 
                              : getTypeLabel(apartment.type)
                            } № {apartment.number}
                          </h3>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#4b4b4d]">
                            {formatPrice(apartment.price)} ₽
                          </div>
                          {apartment.type === "квартира" && (
                            <div className="text-sm text-gray-500">
                              {Math.round(apartment.price / apartment.area).toLocaleString()} ₽/м²
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-600">
                          <MapPin size={16} className="mr-2" />
                          <span className="text-sm">{getComplexName(apartment.complexId)}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Square size={16} className="mr-2" />
                          <span className="text-sm">{apartment.area} м²</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Home size={16} className="mr-2" />
                          <span className="text-sm">
                            {apartment.floor > 0 ? `${apartment.floor} этаж` : "Подземный этаж"}, 
                            секция {apartment.section}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-[#f69700] hover:bg-[#e8860a] text-white btn-hover"
                          onClick={() => alert("Просмотр планировки (будет реализован)")}
                        >
                          Планировка
                        </Button>
                        <Button 
                          variant="outline"
                          className="flex-1 border-[#f69700] text-[#f69700] hover:bg-[#f69700] hover:text-white"
                          onClick={() => navigate(`/apartment/${apartment.id}`)}
                        >
                          Подробнее
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Home size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-[#4b4b4d] mb-2">
                  По вашему запросу ничего не найдено
                </h3>
                <p className="text-gray-600 mb-4">
                  Попробуйте изменить параметры поиска
                </p>
                <Button 
                  onClick={clearFilters}
                  className="bg-[#f69700] hover:bg-[#e8860a] text-white btn-hover"
                >
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom padding for mobile navigation */}
      <div className="h-20 md:h-8" />
    </div>
  );
};