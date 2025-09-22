import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { DataPreloader } from "./components/DataPreloader";
import { HomePage } from "./pages/HomePage";
import { ObjectsPage } from "./pages/ObjectsPage";
import { PromotionsPage } from "./pages/PromotionsPage";
import { MapPage } from "./pages/MapPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactsPage } from "./pages/ContactsPage";
import { ComplexDetailPage } from "./pages/ComplexDetailPage";
import { ApartmentDetailPage } from "./pages/ApartmentDetailPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <DataPreloader />
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
      </BrowserRouter>
    </div>
  );
}

export default App;