import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { X, CheckCircle, Send, AlertCircle } from "lucide-react";
import { api } from "../services/api";
import { useFormApi } from "../hooks/useApi";

export const RequestForm = ({ onClose, title = "Заказать консультацию", type = "consultation" }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    complex: "",
    message: "",
    type: type
  });
  const [complexes, setComplexes] = useState([]);
  const { loading, error, success, submit, reset } = useFormApi(api.requests.createRequest);

  // Загружаем список ЖК при монтировании компонента
  useEffect(() => {
    const loadComplexes = async () => {
      try {
        const complexesData = await api.complexes.getComplexes();
        setComplexes(complexesData);
      } catch (err) {
        console.error("Ошибка загрузки ЖК:", err);
      }
    };
    loadComplexes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await submit(formData);
      // Автоматически закрыть форму через 3 секунды
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold text-[#4b4b4d]">{title}</h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#4b4b4d] mb-2">
                Заявка отправлена!
              </h3>
              <p className="text-[#4b4b4d]/70">
                Мы свяжемся с вами в ближайшее время
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Показываем ошибку если есть */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  <AlertCircle size={16} />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#4b4b4d] mb-2">
                  Имя *
                </label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ваше имя"
                  className="border-gray-200 focus:border-[#f69700] focus:ring-[#f69700]"
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
                  className="border-gray-200 focus:border-[#f69700] focus:ring-[#f69700]"
                />
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
                  className="border-gray-200 focus:border-[#f69700] focus:ring-[#f69700]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#4b4b4d] mb-2">
                  Интересующий ЖК
                </label>
                <Select value={formData.complex} onValueChange={(value) => handleInputChange('complex', value)}>
                  <SelectTrigger className="border-gray-200 focus:border-[#f69700] focus:ring-[#f69700]">
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
                  rows={3}
                  className="border-gray-200 focus:border-[#f69700] focus:ring-[#f69700]"
                />
              </div>

              <Button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#f69700] hover:bg-[#e8860a] text-white btn-hover disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Отправляем...
                  </div>
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    Отправить заявку
                  </>
                )}
              </Button>

              <p className="text-xs text-[#4b4b4d]/50 text-center">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <a href="#" className="text-[#f69700] hover:underline">
                  политикой обработки персональных данных
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};