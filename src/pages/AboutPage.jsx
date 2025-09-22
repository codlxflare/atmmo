import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  Shield, 
  Award, 
  Users, 
  CheckCircle,
  Building,
  Calendar,
  Star,
  TrendingUp
} from "lucide-react";
import { companyInfo, advantages } from "../data/mock";

export const AboutPage = () => {
  const iconMap = {
    shield: Shield,
    award: Award,
    users: Users,
    'check-circle': CheckCircle
  };

  const stats = [
    { icon: Calendar, number: "15+", label: "лет на рынке" },
    { icon: Building, number: "25+", label: "реализованных проектов" },
    { icon: Users, number: "5000+", label: "довольных клиентов" },
    { icon: Star, number: "4.8", label: "средняя оценка" }
  ];

  const values = [
    {
      title: "Качество",
      description: "Мы используем только проверенные материалы и работаем с надежными подрядчиками",
      icon: Award
    },
    {
      title: "Надежность", 
      description: "Все наши проекты реализуются в срок с полным соблюдением договорных обязательств",
      icon: Shield
    },
    {
      title: "Инновации",
      description: "Внедряем современные технологии строительства и управления недвижимостью",
      icon: TrendingUp
    },
    {
      title: "Клиентоориентированность",
      description: "Каждый клиент получает индивидуальный подход и полное сопровождение сделки",
      icon: Users
    }
  ];

  const milestones = [
    { year: "2010", event: "Основание компании ГК «Атмосфера»" },
    { year: "2012", event: "Первый жилой комплекс «Уютный Квартал»" },
    { year: "2015", event: "Запуск проекта «Чемпион Парк»" },
    { year: "2018", event: "Получение статуса надежного застройщика" },
    { year: "2020", event: "Начало строительства ЖК «Парковый»" },
    { year: "2023", event: "Внедрение цифровых технологий в продажи" },
    { year: "2025", event: "Расширение присутствия в регионе" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-[#4b4b4d] mb-6">
            О компании ГК «Атмосфера»
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {companyInfo.description}
          </p>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center card-hover">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-[#f69700] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="text-3xl font-bold text-[#4b4b4d] mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#4b4b4d] mb-6">
                Наша миссия
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Создавать комфортную городскую среду, где люди чувствуют себя как дома. 
                Мы строим не просто дома — мы формируем сообщества, где каждая семья 
                может реализовать свои мечты о качественном жилье.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Наша цель — быть лидером в сфере жилищного строительства, 
                предлагая инновационные решения и безупречное качество на каждом этапе.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop"
                alt="Наша миссия"
                className="w-full rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#4b4b4d] mb-4">
              Наши ценности
            </h2>
            <p className="text-lg text-gray-600">
              Принципы, которые определяют нашу работу
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#f69700] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#4b4b4d] mb-2">
                          {value.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Advantages Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#4b4b4d] mb-4">
              Почему выбирают нас
            </h2>
            <p className="text-lg text-gray-600">
              Преимущества работы с ГК «Атмосфера»
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage) => {
              const Icon = iconMap[advantage.icon] || Shield;
              return (
                <Card key={advantage.id} className="text-center card-hover">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-[#f69700] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon size={32} className="text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-[#4b4b4d] mb-2">
                      {advantage.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {advantage.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#4b4b4d] mb-4">
              История развития
            </h2>
            <p className="text-lg text-gray-600">
              Ключевые этапы нашего пути
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#f69700] transform md:-translate-x-1/2" />
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} pl-12 md:pl-0`}>
                    <Card className="card-hover">
                      <CardContent className="p-4">
                        <Badge className="bg-[#f69700] text-white mb-2">
                          {milestone.year}
                        </Badge>
                        <p className="text-[#4b4b4d] leading-relaxed">
                          {milestone.event}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#f69700] rounded-full transform md:-translate-x-1/2 -translate-y-1/2 top-1/2" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white rounded-2xl p-8 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-[#4b4b4d] mb-4">
            Готовы стать частью нашей истории?
          </h2>
          <p className="text-gray-600 mb-6">
            Найдите свою идеальную квартиру в одном из наших жилых комплексов
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-[#f69700] hover:bg-[#e8860a] text-white px-8 py-3 rounded-lg font-semibold btn-hover"
              onClick={() => window.location.href = '/objects'}
            >
              Выбрать квартиру
            </button>
            <button 
              className="border border-[#f69700] text-[#f69700] hover:bg-[#f69700] hover:text-white px-8 py-3 rounded-lg font-semibold btn-hover"
              onClick={() => alert("Форма консультации (будет реализована)")}
            >
              Получить консультацию
            </button>
          </div>
        </section>
      </div>

      {/* Bottom padding for mobile navigation */}
      <div className="h-20 md:h-8" />
    </div>
  );
};