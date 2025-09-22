import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { YandexMap } from "./YandexMap";
import { RequestForm } from "./RequestForm";
import { 
  Menu, 
  Phone, 
  Home, 
  Filter, 
  Map, 
  MessageCircle,
  X
} from "lucide-react";
import { companyInfo } from "../data/mock";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Главная", path: "/" },
    { name: "Объекты", path: "/objects" },
    { name: "Акции", path: "/promotions" },
    { name: "Карта", path: "/map" },
    { name: "О компании", path: "/about" },
    { name: "Контакты", path: "/contacts" }
  ];

  const ContactModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-[#4b4b4d]">Связаться с нами</h3>
          <button 
            onClick={() => setShowContactModal(false)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        <div className="space-y-3">
          <a 
            href={`tel:${companyInfo.phone}`}
            className="flex items-center gap-3 p-3 bg-[#f69700] text-white rounded-xl hover:bg-[#e8860a] transition-colors"
          >
            <Phone size={20} />
            <span>Позвонить</span>
          </a>
          <button 
            onClick={() => {
              setShowContactModal(false);
              setShowRequestForm(true);
            }}
            className="flex items-center gap-3 p-3 bg-gray-100 text-[#4b4b4d] rounded-xl hover:bg-gray-200 transition-colors w-full"
          >
            <Phone size={20} />
            <span>Заказать звонок</span>
          </button>
          <a 
            href="https://wa.me/+73835550123"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
          >
            <MessageCircle size={20} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );

  const MapModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl h-[600px] mx-auto flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-semibold text-[#4b4b4d]">Карта объектов</h3>
          <button 
            onClick={() => setShowMapModal(false)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 p-6">
          <YandexMap />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex bg-white shadow-sm sticky top-0 z-40 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_atmosfera-dev/artifacts/0gotjtt3_%D0%9B%D0%BE%D0%B3%D0%BE_%D0%90%D1%82%D0%BC%D0%BE%D1%81%D1%84%D0%B5%D1%80%D0%B0.png"
              alt="ГК Атмосфера"
              className="h-10"
            />
          </Link>

          {/* Menu */}
          <div className="flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-[#f69700] ${
                  location.pathname === item.path ? 'text-[#f69700]' : 'text-[#4b4b4d]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Contact Info */}
          <div className="flex items-center space-x-4">
            <a 
              href={`tel:${companyInfo.phone}`}
              className="text-[#4b4b4d] font-semibold hover:text-[#f69700] transition-colors"
            >
              {companyInfo.phone}
            </a>
            <Button 
              className="bg-[#f69700] hover:bg-[#e8860a] text-white btn-hover"
              onClick={() => setShowRequestForm(true)}
            >
              Заказать звонок
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Top Bar */}
        <nav className="bg-white shadow-sm sticky top-0 z-40 border-b">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu size={24} className="text-[#4b4b4d]" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="mt-6">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_atmosfera-dev/artifacts/0gotjtt3_%D0%9B%D0%BE%D0%B3%D0%BE_%D0%90%D1%82%D0%BC%D0%BE%D1%81%D1%84%D0%B5%D1%80%D0%B0.png"
                    alt="ГК Атмосфера"
                    className="h-10 mb-8"
                  />
                  <nav className="space-y-4">
                    {menuItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`block py-2 px-4 rounded-lg transition-colors ${
                          location.pathname === item.path 
                            ? 'bg-[#f69700] text-white' 
                            : 'text-[#4b4b4d] hover:bg-gray-100'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-8 pt-8 border-t">
                    <p className="text-[#4b4b4d] font-semibold mb-2">{companyInfo.phone}</p>
                    <Button 
                      className="w-full bg-[#f69700] hover:bg-[#e8860a] text-white"
                      onClick={() => {
                        setIsOpen(false);
                        setShowRequestForm(true);
                      }}
                    >
                      Заказать звонок
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Link to="/" className="flex items-center">
              <img 
                src="https://customer-assets.emergentagent.com/job_atmosfera-dev/artifacts/0gotjtt3_%D0%9B%D0%BE%D0%B3%D0%BE_%D0%90%D1%82%D0%BC%D0%BE%D1%81%D1%84%D0%B5%D1%80%D0%B0.png"
                alt="ГК Атмосфера"
                className="h-8"
              />
            </Link>

            <Button 
              size="sm" 
              className="bg-[#f69700] hover:bg-[#e8860a] text-white"
              onClick={() => setShowRequestForm(true)}
            >
              Звонок
            </Button>
          </div>
        </nav>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-40">
          <div className="grid grid-cols-4 h-16">
            <Link 
              to="/" 
              className="flex flex-col items-center justify-center space-y-1 hover:bg-gray-50 transition-colors"
            >
              <Home size={20} className={location.pathname === "/" ? "text-[#f69700]" : "text-[#4b4b4d]"} />
              <span className={`text-xs ${location.pathname === "/" ? "text-[#f69700]" : "text-[#4b4b4d]"}`}>
                Главная
              </span>
            </Link>
            <Link 
              to="/objects" 
              className="flex flex-col items-center justify-center space-y-1 hover:bg-gray-50 transition-colors"
            >
              <Filter size={20} className={location.pathname === "/objects" ? "text-[#f69700]" : "text-[#4b4b4d]"} />
              <span className={`text-xs ${location.pathname === "/objects" ? "text-[#f69700]" : "text-[#4b4b4d]"}`}>
                Фильтр
              </span>
            </Link>
            <button 
              onClick={() => window.location.href = '/map'}
              className="flex flex-col items-center justify-center space-y-1 hover:bg-gray-50 transition-colors"
            >
              <Map size={20} className={location.pathname === "/map" ? "text-[#f69700]" : "text-[#4b4b4d]"} />
              <span className={`text-xs ${location.pathname === "/map" ? "text-[#f69700]" : "text-[#4b4b4d]"}`}>Карта</span>
            </button>
            <button 
              onClick={() => setShowContactModal(true)}
              className="flex flex-col items-center justify-center space-y-1 hover:bg-gray-50 transition-colors"
            >
              <MessageCircle size={20} className="text-[#4b4b4d]" />
              <span className="text-xs text-[#4b4b4d]">Связь</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && <ContactModal />}
      
      {/* Map Modal */}
      {showMapModal && <MapModal />}
      
      {/* Request Form */}
      {showRequestForm && (
        <RequestForm 
          onClose={() => setShowRequestForm(false)}
          title="Заказать звонок"
          type="callback"
        />
      )}
    </>
  );
};