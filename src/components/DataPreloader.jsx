import { useEffect, useState } from 'react';
import { api } from '../services/api';

// Компонент для предзагрузки данных при инициализации приложения
export const DataPreloader = () => {
  const [isPreloading, setIsPreloading] = useState(true);

  useEffect(() => {
    // Предзагружаем основные данные
    const preloadData = async () => {
      try {
        console.log('Начинаем предзагрузку данных...');
        
        // Загружаем все данные параллельно
        await Promise.all([
          api.complexes.getComplexes(),
          api.apartments.getApartments(),
          api.promotions.getPromotions()
        ]);
        
        console.log('Данные предзагружены успешно');
        setIsPreloading(false);
      } catch (error) {
        console.warn('Ошибка при предзагрузке данных:', error);
        setIsPreloading(false);
      }
    };

    preloadData();
  }, []);

  // Показываем индикатор загрузки только если данные еще загружаются
  if (isPreloading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f69700] mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  return null; // Компонент не рендерит ничего после загрузки
};
