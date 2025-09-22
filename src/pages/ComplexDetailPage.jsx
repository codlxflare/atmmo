import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  Loader2,
  ArrowLeft,
  MapPin,
  Wifi,
  Car,
  TreePine,
  Shield,
  Phone,
  Mail
} from "lucide-react";
import { api } from "../services/api";
import { useCachedApi } from "../hooks/useApi";

export const ComplexDetailPage = () => {
  const { complexId } = useParams();
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [showApartmentModal, setShowApartmentModal] = useState(false);

  // Загружаем данные о комплексе
  const { data: complexes, loading: complexesLoading, error: complexesError } = useCachedApi(
    api.complexes.getComplexes, 
    'complexes'
  );

  // Загружаем квартиры
  const { data: apartments, loading: apartmentsLoading, error: apartmentsError } = useCachedApi(
    api.apartments.getApartments,
    'apartments'
  );

  const complex = complexes?.find(c => c.id === parseInt(complexId));

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  const getTypeLabel = (type) => {
    const labels = {
      'квартира': 'Квартира',
      'студия': 'Студия',
      'паркинг': 'Паркинг',
      'кладовка': 'Кладовка'
    };
    return labels[type] || type;
  };

  const openApartmentModal = (apartment) => {
    setSelectedApartment(apartment);
    setShowApartmentModal(true);
  };

  const closeApartmentModal = () => {
    setSelectedApartment(null);
    setShowApartmentModal(false);
  };

  if (complexesLoading || apartmentsLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-[#f69700]" />
      </div>
    );
  }

  if (complexesError || apartmentsError || !complex) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Ошибка загрузки данных</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={complex.image} 
          alt={complex.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20 rounded-full p-3 backdrop-blur-sm"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={20} />
          </Button>
        </div>

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-normal text-white mb-4">
              {complex.name}
            </h1>
            <p className="text-white/90 text-lg flex items-center justify-center">
              <MapPin size={20} className="mr-2" />
              {complex.location}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Description */}
        <div className="mb-16 text-center">
          <div className="bg-gradient-to-r from-[#f69700]/5 to-[#e8860a]/5 rounded-2xl p-8 max-w-4xl mx-auto">
            <p className="text-gray-700 leading-relaxed text-lg">
              {complex.description}
            </p>
          </div>
        </div>

        {/* Apartments Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-normal text-[#4b4b4d] mb-4">
              Доступные квартиры
            </h2>
            <p className="text-gray-600">
              {apartments?.length || 0} вариантов
            </p>
          </div>

          {apartments && apartments.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apartments.map((apartment) => (
                <Card key={apartment.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-white rounded-2xl">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={apartment.image || complex.image} 
                      alt={`${apartment.rooms}-комнатная квартира`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-[#f69700]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {formatPrice(apartment.price)} ₽
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <h3 className="text-xl font-normal text-[#4b4b4d] mb-3 group-hover:text-[#f69700] transition-colors">
                        {apartment.rooms}-комнатная
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {apartment.area} м² • {apartment.floor > 0 ? `${apartment.floor} этаж` : "Подземный этаж"}
                      </p>
                      <Button 
                        onClick={() => window.location.href = `/apartment/${apartment.id}`}
                        className="w-full bg-[#f69700] hover:bg-[#e8860a] text-white font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        Подробнее
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Квартиры не найдены</p>
            </div>
          )}
        </div>


      </div>

      {/* Apartment Modal */}
      {showApartmentModal && selectedApartment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <Badge className="bg-[#f69700] text-white mb-2">
                    {getTypeLabel(selectedApartment.type)}
                  </Badge>
                  <h3 className="text-2xl font-bold text-[#4b4b4d]">
                    {selectedApartment.type === "квартира" 
                      ? `${selectedApartment.rooms}-комнатная` 
                      : getTypeLabel(selectedApartment.type)
                    } № {selectedApartment.number}
                  </h3>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={closeApartmentModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-lg font-semibold text-[#4b4b4d] mb-3">Характеристики</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Площадь:</span>
                      <span className="font-semibold">{selectedApartment.area} м²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Этаж:</span>
                      <span className="font-semibold">
                        {selectedApartment.floor > 0 ? `${selectedApartment.floor}` : "Подземный"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Секция:</span>
                      <span className="font-semibold">{selectedApartment.section}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#4b4b4d] mb-3">Стоимость</h4>
                  <div className="text-3xl font-bold text-[#f69700] mb-2">
                    {formatPrice(selectedApartment.price)} ₽
                  </div>
                  {selectedApartment.type === "квартира" && (
                    <div className="text-gray-600">
                      {Math.round(selectedApartment.price / selectedApartment.area).toLocaleString()} ₽/м²
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-[#f69700] hover:bg-[#e8860a] text-white py-3 rounded-xl"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Связаться
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1 border-[#f69700] text-[#f69700] hover:bg-[#f69700] hover:text-white py-3 rounded-xl"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Написать
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};