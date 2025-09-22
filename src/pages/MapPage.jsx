import { YandexMap } from "../components/YandexMap";

export const MapPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-4">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#4b4b4d] mb-2">
            Карта объектов
          </h1>
          <p className="text-[#4b4b4d]/70">
            Расположение жилых комплексов ГК «Атмосфера» в Кемерово
          </p>
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="h-[calc(100vh-200px)] min-h-[500px]">
            <YandexMap />
          </div>
        </div>

        {/* Complexes List */}
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="w-3 h-3 bg-[#f69700] rounded-full mb-2"></div>
            <h3 className="font-semibold text-[#4b4b4d] mb-1">ЖК «Парковый»</h3>
            <p className="text-sm text-[#4b4b4d]/70">пр. Молодежный</p>
            <p className="text-sm font-medium text-[#f69700] mt-2">от 5 900 000 ₽</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="w-3 h-3 bg-[#f69700] rounded-full mb-2"></div>
            <h3 className="font-semibold text-[#4b4b4d] mb-1">ЖК «Уютный квартал»</h3>
            <p className="text-sm text-[#4b4b4d]/70">ул. Терешковой</p>
            <p className="text-sm font-medium text-[#f69700] mt-2">от 6 100 000 ₽</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="w-3 h-3 bg-[#f69700] rounded-full mb-2"></div>
            <h3 className="font-semibold text-[#4b4b4d] mb-1">ЖК «Чемпион парк»</h3>
            <p className="text-sm text-[#4b4b4d]/70">ул. Институтская, 34</p>
            <p className="text-sm font-medium text-[#f69700] mt-2">от 7 200 000 ₽</p>
          </div>
        </div>
      </div>

      {/* Bottom padding for mobile navigation */}
      <div className="h-20 md:h-8" />
    </div>
  );
};