import { useEffect, useRef } from 'react';

export const YandexMap = ({ complexes, onClose }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.ymaps || !mapRef.current) return;

    window.ymaps.ready(() => {
      const map = new window.ymaps.Map(mapRef.current, {
        center: [55.354968, 86.087314], // Центр Кемерово
        zoom: 11
      });

      // Добавляем метки для каждого ЖК в Кемерово
      const complexesWithCoords = [
        {
          id: 1,
          name: "ЖК «Парковый»",
          coords: [55.364968, 86.097314],
          address: "Кемерово, пр. Молодежный",
          price: "от 5 900 000 ₽"
        },
        {
          id: 2,
          name: "ЖК «Уютный квартал»", 
          coords: [55.344968, 86.077314],
          address: "Кемерово, ул. Терешковой",
          price: "от 6 100 000 ₽"
        },
        {
          id: 3,
          name: "ЖК «Чемпион парк»",
          coords: [55.374968, 86.107314],
          address: "Кемерово, ул. Институтская, 34",
          price: "от 7 200 000 ₽"
        }
      ];

      complexesWithCoords.forEach(complex => {
        const placemark = new window.ymaps.Placemark(complex.coords, {
          balloonContentHeader: complex.name,
          balloonContentBody: `
            <div style="padding: 12px;">
              <p style="margin: 0 0 8px 0; color: #4b4b4d; font-size: 14px;">${complex.address}</p>
              <p style="margin: 0 0 16px 0; font-weight: bold; color: #f69700; font-size: 18px;">${complex.price}</p>
              <button 
                onclick="window.location.href='/objects'" 
                style="
                  background: #f69700; 
                  color: white; 
                  border: none; 
                  padding: 10px 20px; 
                  border-radius: 8px; 
                  cursor: pointer;
                  font-weight: 600;
                  font-size: 14px;
                "
              >
                Смотреть квартиры
              </button>
            </div>
          `,
          balloonContentFooter: '',
          hintContent: complex.name
        }, {
          preset: 'islands#orangeCircleDotIcon'
        });

        map.geoObjects.add(placemark);
      });

      // Настройки карты
      map.controls.remove('geolocationControl');
      map.controls.remove('searchControl');
      map.controls.remove('trafficControl');
      map.controls.remove('typeSelector');
      map.controls.remove('fullscreenControl');
      map.controls.remove('rulerControl');
    });
  }, []);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg"
      style={{ minHeight: '400px' }}
    />
  );
};