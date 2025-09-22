import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Stories } from "../components/Stories";
import { PromotionModal } from "../components/PromotionModal";
import { RequestForm } from "../components/RequestForm";
import { 
  MapPin, 
  ArrowRight, 
  Calendar,
  Factory,
  Handshake,
  Shield,
  Phone,
  ChevronRight,
  Loader2
} from "lucide-react";
import { api } from "../services/api";
import { useCachedApi } from "../hooks/useApi";
import { advantages } from "../data/mock";

export const HomePage = () => {
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  
  // Загружаем данные через API
  const { data: complexes, loading: complexesLoading, error: complexesError } = useCachedApi(
    api.complexes.getComplexes, 
    'complexes'
  );
  
  const { data: promotions, loading: promotionsLoading, error: promotionsError } = useCachedApi(
    api.promotions.getPromotions, 
    'promotions'
  );

  // Отладочная информация
  useEffect(() => {
    console.log('HomePage - complexes:', complexes);
    console.log('HomePage - complexesLoading:', complexesLoading);
    console.log('HomePage - complexesError:', complexesError);
  }, [complexes, complexesLoading, complexesError]);

  const handlePromotionClick = (promotion) => {
    setSelectedPromotion(promotion);
  };

  const handleConsultation = () => {
    setSelectedPromotion(null);
    setShowRequestForm(true);
  };

  const handleStoriesPromotionClick = () => {
    document.getElementById('promotions-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const iconMap = {
    calendar: Calendar,
    factory: Factory,
    handshake: Handshake,
    shield: Shield
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - оптимизирован для мобильных */}
      <section className="relative px-4 py-12 md:py-20">
        <div className="max-w-md mx-auto md:max-w-4xl text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-3xl md:text-5xl font-bold text-[#4b4b4d] mb-4 leading-tight">
              Комфортное жилье в{" "}
              <span className="text-[#f69700] relative">
                Кемерово
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#f69700] opacity-30"></div>
              </span>
            </h1>
            <p className="text-lg text-[#4b4b4d]/70 mb-8 leading-relaxed px-4">
              15 лет создаем современные жилые комплексы с продуманной инфраструктурой
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center px-2">
              <Button 
                asChild
                size="lg" 
                className="bg-[#f69700] hover:bg-[#e8860a] text-white px-8 py-4 text-base btn-hover shadow-lg"
              >
                <Link to="/objects">
                  Выбрать квартиру
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setShowRequestForm(true)}
                className="border-2 border-[#f69700] text-[#f69700] hover:bg-[#f69700] hover:text-white px-8 py-4 text-base btn-hover"
              >
                <Phone className="mr-2" size={18} />
                Консультация
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Complexes Section - улучшенный дизайн */}
      <section className="py-16 bg-gradient-to-b from-gray-50/30 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-normal text-[#4b4b4d] mb-4">
              Наши жилые комплексы
            </h2>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">
              Три уникальных проекта в лучших районах Кемерово
            </p>
          </div>

          {complexesLoading || !complexes ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 size={40} className="animate-spin text-[#f69700]" />
              <span className="ml-2 text-gray-600">Загрузка комплексов...</span>
            </div>
          ) : complexesError ? (
            <div className="text-center py-16">
              <p className="text-red-500 text-lg">Ошибка загрузки данных</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {complexes?.map((complex, index) => (
                <Card 
                  key={complex.id} 
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-white rounded-2xl"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={complex.image} 
                      alt={complex.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/95 text-[#4b4b4d] border-0 backdrop-blur-sm font-medium px-3 py-1">
                        {complex.status}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-[#f69700]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                        от {complex.price_from} ₽
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-normal text-[#4b4b4d] mb-3 group-hover:text-[#f69700] transition-colors">
                      {complex.name}
                    </h3>
                    <div className="flex items-start text-[#4b4b4d]/70 mb-4">
                      <MapPin size={16} className="mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{complex.location}</span>
                    </div>
                    <p className="text-[#4b4b4d]/70 text-sm mb-6 leading-relaxed line-clamp-2">
                      {complex.description}
                    </p>
                    <Button 
                      asChild
                      className="w-full bg-[#f69700] hover:bg-[#e8860a] text-white font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <Link to={`/complex/${complex.id}`} className="flex items-center justify-center">
                        Подробнее о комплексе
                        <ChevronRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stories Section - премиальный дизайн */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#4b4b4d] mb-4">
              Наши проекты
            </h2>
            <p className="text-[#4b4b4d]/70 max-w-2xl mx-auto text-lg">
              Интерактивные истории о наших жилых комплексах
            </p>
          </div>
          
          <Stories onStoryClick={handleStoriesPromotionClick} />
        </div>
      </section>

      {/* Promotions Section - компактный для мобильных */}
      <section id="promotions-section" className="py-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#4b4b4d] mb-3">
              Актуальные акции
            </h2>
            <p className="text-[#4b4b4d]/70">
              Выгодные предложения для покупки квартиры
            </p>
          </div>

          <div className="max-w-md mx-auto md:max-w-5xl">
            {promotionsLoading || !promotions ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 size={32} className="animate-spin text-[#f69700]" />
                <span className="ml-2 text-gray-600">Загрузка акций...</span>
              </div>
            ) : promotionsError ? (
              <div className="text-center py-12">
                <p className="text-red-500">Ошибка загрузки акций</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-3">
                {promotions?.slice(0, 3).map((promotion, index) => (
                <Card 
                  key={promotion.id} 
                  className={`card-hover cursor-pointer border-0 shadow-sm animate-fade-in-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handlePromotionClick(promotion)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <Badge 
                        className={promotion.category === 'Основные' 
                          ? 'bg-[#f69700] text-white border-0' 
                          : 'bg-gray-100 text-[#4b4b4d] border-0'
                        }
                      >
                        {promotion.category}
                      </Badge>
                      <span className="text-xs text-[#4b4b4d]/50">до {promotion.deadline}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#4b4b4d] mb-2 leading-tight">
                      {promotion.title}
                    </h3>
                    <p className="text-[#4b4b4d]/60 text-sm leading-relaxed mb-4">
                      {promotion.shortDescription}
                    </p>
                    <div className="flex items-center text-[#f69700] text-sm font-medium group">
                      <span>Подробнее</span>
                      <ChevronRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
                ))}
              </div>
            )}

            <div className="text-center mt-8">
              <Button 
                asChild
                variant="outline"
                className="border-[#f69700] text-[#f69700] hover:bg-[#f69700] hover:text-white btn-hover"
              >
                <Link to="/promotions">Все акции</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section - компактный для мобильных */}
      <section className="py-12 bg-white">
        <div className="px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#4b4b4d] mb-3">
              Почему выбирают нас
            </h2>
          </div>
          
          <div className="max-w-md mx-auto md:max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {advantages.map((advantage, index) => {
                const Icon = iconMap[advantage.icon] || Shield;
                return (
                  <div 
                    key={advantage.id} 
                    className={`text-center animate-fade-in-up`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-[#f69700] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="font-bold text-[#4b4b4d] mb-1 text-sm md:text-base">
                      {advantage.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[#4b4b4d]/60 leading-relaxed">
                      {advantage.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-br from-[#f69700] to-[#ff8c00] text-white">
        <div className="px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Готовы найти свою квартиру?
          </h2>
          <p className="text-white/90 mb-6 max-w-md mx-auto">
            Оставьте заявку и получите персональную консультацию
          </p>
          <Button 
            onClick={() => setShowRequestForm(true)}
            size="lg"
            className="bg-white text-[#f69700] hover:bg-gray-100 font-semibold px-8 py-4 shadow-lg"
          >
            Получить консультацию
          </Button>
        </div>
      </section>

      {/* Modals */}
      {selectedPromotion && (
        <PromotionModal 
          promotion={selectedPromotion}
          onClose={() => setSelectedPromotion(null)}
          onConsultation={handleConsultation}
        />
      )}

      {showRequestForm && (
        <RequestForm 
          onClose={() => setShowRequestForm(false)}
          title="Получить консультацию"
          type="consultation"
        />
      )}

      {/* Bottom padding for mobile navigation */}
      <div className="h-16 md:h-0" />
    </div>
  );
};