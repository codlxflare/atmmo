import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  MapPin, 
  Home, 
  Square, 
  Loader2,
  Camera,
  Users,
  Car,
  TreePine,
  Wifi,
  Shield,
  Phone,
  Mail,
  ChevronRight,
  Star,
  ArrowLeft,
  ArrowRight,
  Maximize2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  X
} from "lucide-react";
import { api } from "../services/api";
import { useCachedApi } from "../hooks/useApi";

export const ApartmentDetailPage = () => {
  const { apartmentId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [is3DViewerOpen, setIs3DViewerOpen] = useState(false);
  const [is3DPlaying, setIs3DPlaying] = useState(false);

  // Загружаем данные о квартирах
  const { data: apartments, loading: apartmentsLoading, error: apartmentsError } = useCachedApi(
    api.apartments.getApartments,
    'apartments'
  );

  const apartment = apartments?.find(a => a.id === parseInt(apartmentId));

  // Моковые данные для галереи
  const apartmentImages = apartment ? [
    apartment.image || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop"
  ] : [];

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % apartmentImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + apartmentImages.length) % apartmentImages.length);
  };

  const openGallery = (index = 0) => {
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const open3DViewer = () => {
    setIs3DViewerOpen(true);
  };

  const close3DViewer = () => {
    setIs3DViewerOpen(false);
    setIs3DPlaying(false);
  };

  const toggle3DPlay = () => {
    setIs3DPlaying(!is3DPlaying);
  };

  if (apartmentsLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-[#f69700]" />
      </div>
    );
  }

  if (apartmentsError || !apartment) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Квартира не найдена</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={apartmentImages[currentImageIndex]} 
          alt={`${apartment.rooms}-комнатная квартира`}
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

        {/* Gallery Button */}
        <div className="absolute top-6 right-6">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20 rounded-full p-3 backdrop-blur-sm"
            onClick={() => openGallery(currentImageIndex)}
          >
            <Maximize2 size={20} />
          </Button>
        </div>

        {/* Image Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-2">
            {apartmentImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-normal text-white mb-2">
              {apartment.rooms}-комнатная
            </h1>
            <p className="text-white/90 text-sm">
              {apartment.area} м² • {apartment.floor > 0 ? `${apartment.floor} этаж` : "Подземный этаж"}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Price Section */}
        <div className="mb-12 text-center">
          <div className="bg-gradient-to-r from-[#f69700] to-[#e8860a] rounded-2xl p-6 text-white max-w-xl mx-auto">
            <div className="text-3xl font-normal mb-2">
              {formatPrice(apartment.price)} ₽
            </div>
            {apartment.type === "квартира" && (
              <div className="text-sm opacity-90 mb-4">
                {Math.round(apartment.price / apartment.area).toLocaleString()} ₽/м²
              </div>
            )}
            <Button 
              className="bg-white text-[#f69700] hover:bg-gray-100 px-6 py-2 rounded-lg font-medium"
            >
              Связаться с нами
            </Button>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mb-12">
          <h2 className="text-xl font-normal text-[#4b4b4d] mb-4 text-center">
            Галерея
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {apartmentImages.map((image, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-lg cursor-pointer group shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => openGallery(index)}
              >
                <img
                  src={image}
                  alt={`Фото ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="mb-12">
          <h2 className="text-xl font-normal text-[#4b4b4d] mb-6 text-center">
            Характеристики
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-[#f69700]/10 to-[#e8860a]/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-normal text-[#4b4b4d] mb-1">{apartment.area}</div>
              <div className="text-gray-600 text-sm">м²</div>
            </div>
            <div className="bg-gradient-to-br from-[#f69700]/10 to-[#e8860a]/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-normal text-[#4b4b4d] mb-1">
                {apartment.floor > 0 ? apartment.floor : "П"}
              </div>
              <div className="text-gray-600 text-sm">этаж</div>
            </div>
            <div className="bg-gradient-to-br from-[#f69700]/10 to-[#e8860a]/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-normal text-[#4b4b4d] mb-1">{apartment.rooms}</div>
              <div className="text-gray-600 text-sm">комнат</div>
            </div>
            <div className="bg-gradient-to-br from-[#f69700]/10 to-[#e8860a]/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-normal text-[#4b4b4d] mb-1">
                {Math.round(apartment.price / apartment.area).toLocaleString()}
              </div>
              <div className="text-gray-600 text-sm">₽/м²</div>
            </div>
          </div>
        </div>


      </div>

      {/* Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={apartmentImages[currentImageIndex]}
              alt={`Фото ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Close Button */}
            <Button
              variant="ghost"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={closeGallery}
            >
              <X size={24} />
            </Button>
            
            {/* Navigation */}
            <Button
              variant="ghost"
              className="absolute left-4 text-white hover:bg-white/20"
              onClick={prevImage}
            >
              <ArrowLeft size={24} />
            </Button>
            <Button
              variant="ghost"
              className="absolute right-4 text-white hover:bg-white/20"
              onClick={nextImage}
            >
              <ArrowRight size={24} />
            </Button>
            
            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
              {currentImageIndex + 1} / {apartmentImages.length}
            </div>
          </div>
        </div>
      )}

      {/* 3D Viewer Modal */}
      {is3DViewerOpen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-32 h-32 bg-[#f69700] rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                  <RotateCcw size={48} />
                </div>
                <h3 className="text-2xl font-bold mb-4">3D Тур по квартире</h3>
                <p className="text-gray-300 mb-8">Интерактивный просмотр в 360°</p>
                
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={toggle3DPlay}
                    className="bg-[#f69700] hover:bg-[#e8860a] text-white px-6 py-3 rounded-xl"
                  >
                    {is3DPlaying ? <Pause size={20} className="mr-2" /> : <Play size={20} className="mr-2" />}
                    {is3DPlaying ? 'Пауза' : 'Запуск'}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black px-6 py-3 rounded-xl"
                  >
                    <ZoomIn size={20} className="mr-2" />
                    Увеличить
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Close Button */}
            <Button
              variant="ghost"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={close3DViewer}
            >
              <X size={24} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
