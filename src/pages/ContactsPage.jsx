import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle,
  Send,
  CheckCircle
} from "lucide-react";
import { companyInfo, complexes } from "../data/mock";

export const ContactsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    complex: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет обработка формы
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const offices = [
    {
      id: 1,
      name: "Главный офис",
      address: companyInfo.address,
      phone: companyInfo.phone,
      email: companyInfo.email,
      hours: companyInfo.workingHours,
      coordinates: [55.354968, 86.087314] // Примерные координаты Кемерово
    },
    {
      id: 2,
      name: "Офис продаж ЖК «Уютный Квартал»",
      address: "г. Кемерово, ул. Первомайская, 150",
      phone: "+7 (383) 555-01-24",
      email: "uyutniy@atmosgr.ru",
      hours: "Ежедневно: 9:00-20:00",
      coordinates: [55.040204, 82.930430]
    },
    {
      id: 3,
      name: "Офис продаж ЖК «Чемпион Парк»",
      address: "г. Кемерово, ул. Калинина, 45",
      phone: "+7 (383) 555-01-25",
      email: "champion@atmosgr.ru", 
      hours: "Ежедневно: 9:00-20:00",
      coordinates: [55.020204, 82.910430]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-[#4b4b4d] mb-4">
            Контакты
          </h1>
          <p className="text-lg text-gray-600">
            Свяжитесь с нами удобным способом
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-[#4b4b4d] mb-6">
                  Обратная связь
                </h2>
                
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-[#4b4b4d] mb-2">
                      Сообщение отправлено!
                    </h3>
                    <p className="text-gray-600">
                      Мы свяжемся с вами в ближайшее время
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#4b4b4d] mb-2">
                          Имя *
                        </label>
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Ваше имя"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#4b4b4d] mb-2">
                          Телефон *
                        </label>
                        <Input
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+7 (___) ___-__-__"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#4b4b4d] mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#4b4b4d] mb-2">
                        Интересующий ЖК
                      </label>
                      <Select value={formData.complex} onValueChange={(value) => handleInputChange('complex', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите жилой комплекс" />
                        </SelectTrigger>
                        <SelectContent>
                          {complexes.map((complex) => (
                            <SelectItem key={complex.id} value={complex.name}>
                              {complex.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#4b4b4d] mb-2">
                        Сообщение
                      </label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Расскажите о ваших потребностях..."
                        rows={4}
                      />
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-[#f69700] hover:bg-[#e8860a] text-white btn-hover"
                    >
                      <Send size={20} className="mr-2" />
                      Отправить сообщение
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      Нажимая кнопку, вы соглашаетесь с{" "}
                      <a href="#" className="text-[#f69700] hover:underline">
                        политикой обработки персональных данных
                      </a>
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Contact */}
          <div className="space-y-6">
            {/* Main Contact */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#4b4b4d] mb-4">
                  Связаться с нами
                </h3>
                <div className="space-y-4">
                  <a 
                    href={`tel:${companyInfo.phone}`}
                    className="flex items-center gap-3 p-3 bg-[#f69700] text-white rounded-xl hover:bg-[#e8860a] transition-colors"
                  >
                    <Phone size={20} />
                    <span className="font-semibold">{companyInfo.phone}</span>
                  </a>
                  <a 
                    href={`mailto:${companyInfo.email}`}
                    className="flex items-center gap-3 p-3 bg-gray-100 text-[#4b4b4d] rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    <Mail size={20} />
                    <span>{companyInfo.email}</span>
                  </a>
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
              </CardContent>
            </Card>

            {/* Working Hours */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock size={20} className="text-[#f69700]" />
                  <h3 className="text-lg font-semibold text-[#4b4b4d]">
                    Режим работы
                  </h3>
                </div>
                <p className="text-gray-600">{companyInfo.workingHours}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Offices */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#4b4b4d] mb-8 text-center">
            Наши офисы
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {offices.map((office) => (
              <Card key={office.id} className="card-hover">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[#4b4b4d] mb-4">
                    {office.name}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-[#f69700] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{office.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-[#f69700]" />
                      <a 
                        href={`tel:${office.phone}`}
                        className="text-sm text-gray-600 hover:text-[#f69700] transition-colors"
                      >
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-[#f69700]" />
                      <a 
                        href={`mailto:${office.email}`}
                        className="text-sm text-gray-600 hover:text-[#f69700] transition-colors"
                      >
                        {office.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-[#f69700]" />
                      <span className="text-sm text-gray-600">{office.hours}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Map Placeholder */}
          <Card>
            <CardContent className="p-0">
              <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f69700]/10 to-[#f69700]/5" />
                <div className="text-center z-10">
                  <MapPin size={48} className="text-[#f69700] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#4b4b4d] mb-2">
                    Интерактивная карта
                  </h3>
                  <p className="text-gray-600">
                    Карта с офисами будет интегрирована с Яндекс.Картами
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Bottom padding for mobile navigation */}
      <div className="h-20 md:h-8" />
    </div>
  );
};