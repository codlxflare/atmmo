import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { PromotionModal } from "../components/PromotionModal";
import { Calendar, Tag, Loader2 } from "lucide-react";
import { api } from "../services/api";
import { useCachedApi } from "../hooks/useApi";

export const PromotionsPage = () => {
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [filter, setFilter] = useState("Все");
  
  // Загружаем данные через API
  const { data: promotions, loading: promotionsLoading, error: promotionsError } = useCachedApi(
    api.promotions.getPromotions, 
    'promotions'
  );

  const handlePromotionClick = (promotion) => {
    setSelectedPromotion(promotion);
  };

  const handleConsultation = () => {
    setSelectedPromotion(null);
    alert("Форма заказа консультации (будет реализована)");
  };

  const filteredPromotions = filter === "Все" 
    ? promotions || []
    : (promotions || []).filter(promo => promo.category === filter);

  const categories = ["Все", "Основные", "Дополнительные"];

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-[#4b4b4d] mb-4">
            Актуальные акции
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Воспользуйтесь выгодными предложениями для покупки квартиры в наших жилых комплексах
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              className={filter === category 
                ? "bg-[#f69700] hover:bg-[#e8860a] text-white" 
                : "border-[#f69700] text-[#f69700] hover:bg-[#f69700] hover:text-white"
              }
            >
              <Tag size={16} className="mr-2" />
              {category}
            </Button>
          ))}
        </div>

        {/* Promotions Grid */}
        {promotionsLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 size={32} className="animate-spin text-[#f69700]" />
          </div>
        ) : promotionsError ? (
          <div className="text-center py-12">
            <p className="text-red-500">Ошибка загрузки акций</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredPromotions.map((promotion) => (
            <Card 
              key={promotion.id} 
              className="card-hover cursor-pointer h-full"
              onClick={() => handlePromotionClick(promotion)}
            >
              <CardContent className="p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <Badge 
                    className={promotion.category === 'Основные' 
                      ? 'bg-[#f69700] text-white' 
                      : 'bg-gray-200 text-[#4b4b4d]'
                    }
                  >
                    {promotion.category}
                  </Badge>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar size={14} className="mr-1" />
                    до {promotion.deadline}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#4b4b4d] mb-3 leading-tight">
                  {promotion.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                  {promotion.shortDescription}
                </p>

                {/* Complexes */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {promotion.complexes.slice(0, 2).map((complex, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-[#4b4b4d] rounded text-xs"
                      >
                        {complex.length > 20 ? `${complex.substring(0, 20)}...` : complex}
                      </span>
                    ))}
                    {promotion.complexes.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-[#4b4b4d] rounded text-xs">
                        +{promotion.complexes.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <span className="text-[#f69700] font-semibold text-sm hover:underline">
                    Подробнее →
                  </span>
                </div>
              </CardContent>
            </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredPromotions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Tag size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-[#4b4b4d] mb-2">
              Акций в данной категории пока нет
            </h3>
            <p className="text-gray-600">
              Попробуйте выбрать другую категорию или вернитесь позже
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-[#4b4b4d] mb-4">
            Не нашли подходящую акцию?
          </h2>
          <p className="text-gray-600 mb-6">
            Наши специалисты помогут подобрать оптимальные условия для покупки квартиры
          </p>
          <Button 
            className="bg-[#f69700] hover:bg-[#e8860a] text-white px-8 py-3 text-lg btn-hover"
            onClick={() => alert("Форма консультации (будет реализована)")}
          >
            Получить консультацию
          </Button>
        </div>
      </div>

      {/* Promotion Modal */}
      {selectedPromotion && (
        <PromotionModal 
          promotion={selectedPromotion}
          onClose={() => setSelectedPromotion(null)}
          onConsultation={handleConsultation}
        />
      )}

      {/* Bottom padding for mobile navigation */}
      <div className="h-20 md:h-8" />
    </div>
  );
};