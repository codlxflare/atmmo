import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { ObjectsPage } from "./pages/ObjectsPage";
import { PromotionsPage } from "./pages/PromotionsPage";
import { MapPage } from "./pages/MapPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactsPage } from "./pages/ContactsPage";
import { ComplexDetailPage } from "./pages/ComplexDetailPage";
import { ApartmentDetailPage } from "./pages/ApartmentDetailPage";
import { api } from "./services/api";

function App() {
  // Предзагружаем данные при инициализации приложения
  useEffect(() => {
    const preloadData = async () => {
      try {
        console.log('App: Начинаем предзагрузку данных...');
        
        // Загружаем все данные параллельно
        await Promise.all([
          api.complexes.getComplexes(),
          api.apartments.getApartments(),
          api.promotions.getPromotions()
        ]);
        
        console.log('App: Данные предзагружены успешно');
      } catch (error) {
        console.warn('App: Ошибка при предзагрузке данных:', error);
      }
    };

    preloadData();
  }, []);

  return (
    <div className="App">
      <HashRouter>
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/objects" element={<ObjectsPage />} />
            <Route path="/complex/:complexId" element={<ComplexDetailPage />} />
            <Route path="/apartment/:apartmentId" element={<ApartmentDetailPage />} />
            <Route path="/promotions" element={<PromotionsPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
          </Routes>
        </main>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;