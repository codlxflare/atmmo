import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { companyInfo } from "../data/mock";

export const Footer = () => {
  return (
    <footer className="bg-[#4b4b4d] text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <img 
              src="https://customer-assets.emergentagent.com/job_atmosfera-dev/artifacts/0gotjtt3_%D0%9B%D0%BE%D0%B3%D0%BE_%D0%90%D1%82%D0%BC%D0%BE%D1%81%D1%84%D0%B5%D1%80%D0%B0.png"
              alt="ГК Атмосфера"
              className="h-12 mb-4 brightness-0 invert"
            />
            <p className="text-gray-300 text-sm leading-relaxed">
              {companyInfo.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-[#f69700] transition-colors">Главная</Link></li>
              <li><Link to="/objects" className="text-gray-300 hover:text-[#f69700] transition-colors">Объекты</Link></li>
              <li><Link to="/promotions" className="text-gray-300 hover:text-[#f69700] transition-colors">Акции</Link></li>
              <li><Link to="/map" className="text-gray-300 hover:text-[#f69700] transition-colors">Карта</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-[#f69700] transition-colors">О компании</Link></li>
              <li><Link to="/contacts" className="text-gray-300 hover:text-[#f69700] transition-colors">Контакты</Link></li>
            </ul>
          </div>

          {/* Complexes */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Наши ЖК</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-300">ЖК «Парковый»</span></li>
              <li><span className="text-gray-300">ЖК «Уютный квартал»</span></li>
              <li><span className="text-gray-300">ЖК «Чемпион парк»</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-[#f69700]" />
                <a href={`tel:${companyInfo.phone}`} className="text-gray-300 hover:text-[#f69700] transition-colors">
                  {companyInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-[#f69700]" />
                <a href={`mailto:${companyInfo.email}`} className="text-gray-300 hover:text-[#f69700] transition-colors">
                  {companyInfo.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-[#f69700] mt-0.5" />
                <span className="text-gray-300 text-sm">{companyInfo.address}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={16} className="text-[#f69700] mt-0.5" />
                <span className="text-gray-300 text-sm">{companyInfo.workingHours}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 ГК «Атмосфера». Все права защищены.
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Проектные декларации на сайте наш.дом.рф
          </p>
        </div>
      </div>
    </footer>
  );
};