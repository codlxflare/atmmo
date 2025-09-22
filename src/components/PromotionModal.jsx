import { X } from "lucide-react";
import { Button } from "./ui/button";

export const PromotionModal = ({ promotion, onClose, onConsultation }) => {
  if (!promotion) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#4b4b4d]">{promotion.title}</h2>
            <div className="flex items-center gap-4 mt-1">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                promotion.category === 'Основные' 
                  ? 'bg-[#f69700] text-white' 
                  : 'bg-gray-200 text-[#4b4b4d]'
              }`}>
                {promotion.category}
              </span>
              <span className="text-sm text-gray-600">до {promotion.deadline}</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Objects */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#4b4b4d] mb-2">Объекты применения</h3>
            <div className="flex flex-wrap gap-2">
              {promotion.complexes.map((complex, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-[#4b4b4d] rounded-lg text-sm"
                >
                  {complex}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#4b4b4d] mb-2">Описание акции</h3>
            <p className="text-[#4b4b4d] leading-relaxed">{promotion.fullDescription}</p>
          </div>

          {/* Conditions */}
          {promotion.conditions && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#4b4b4d] mb-2">Условия</h3>
              <p className="text-[#4b4b4d] leading-relaxed">{promotion.conditions}</p>
            </div>
          )}

          {/* Example */}
          {promotion.example && (
            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-semibold text-[#4b4b4d] mb-2">Пример расчета</h3>
              <pre className="text-[#4b4b4d] text-sm whitespace-pre-wrap leading-relaxed">
                {promotion.example}
              </pre>
            </div>
          )}

          {/* CTA Button */}
          <div className="text-center mb-6">
            <Button 
              onClick={onConsultation}
              className="bg-[#f69700] hover:bg-[#e8860a] text-white px-8 py-3 text-lg btn-hover"
            >
              Получить консультацию
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-gray-500 leading-relaxed border-t pt-4">
            {promotion.disclaimer}
          </div>
        </div>
      </div>
    </div>
  );
};