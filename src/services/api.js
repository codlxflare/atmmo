// API Service для демо-версии с моковыми данными
import { complexes, promotions, apartments, companyInfo } from '../data/mock';

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// Базовый класс для API запросов (демо-версия)
class ApiService {
  constructor() {
    this.baseURL = '/api';
  }

  // Имитация задержки сети
  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async request(endpoint, options = {}) {
    console.log('Demo API Request:', { endpoint, options });
    
    // Имитируем задержку сети
    await this.delay();
    
    try {
      const result = await this.handleRequest(endpoint, options);
      console.log('Demo API Success:', result);
      return result;
    } catch (error) {
      console.error('Demo API Error:', error);
      throw error;
    }
  }

  async handleRequest(endpoint, options) {
    const method = options.method || 'GET';
    
    switch (endpoint) {
      case '/api/complexes':
        return complexes;
        
      case '/api/promotions':
        const category = options.params?.category;
        if (category) {
          return promotions.filter(p => p.category === category);
        }
        return promotions;
        
      case '/api/apartments':
        return this.filterApartments(options.params || {});
        
      case '/api/requests':
        if (method === 'POST') {
          return { success: true, message: 'Заявка успешно отправлена (демо-режим)' };
        }
        return [];
        
      case '/api/status':
        if (method === 'POST') {
          return { success: true, message: 'Статус проверки создан (демо-режим)' };
        }
        return [];
        
      default:
        throw new ApiError('Endpoint not found', 404, { endpoint });
    }
  }

  filterApartments(filters) {
    let filteredApartments = apartments;
    
    // Исключаем объекты с 0 комнат (парковки, кладовые)
    filteredApartments = filteredApartments.filter(apt => apt.rooms > 0);
    
    if (filters.complexes && filters.complexes.length > 0) {
      filteredApartments = filteredApartments.filter(apt => 
        filters.complexes.includes(apt.complexId)
      );
    }
    
    if (filters.type && filters.type !== 'all') {
      filteredApartments = filteredApartments.filter(apt => 
        apt.type === filters.type
      );
    }
    
    if (filters.area && filters.area.length === 2) {
      filteredApartments = filteredApartments.filter(apt => 
        apt.area >= filters.area[0] && apt.area <= filters.area[1]
      );
    }
    
    if (filters.price && filters.price.length === 2) {
      filteredApartments = filteredApartments.filter(apt => 
        apt.price >= filters.price[0] && apt.price <= filters.price[1]
      );
    }
    
    return filteredApartments;
  }

  // GET запрос
  async get(endpoint, params = {}) {
    return this.request(endpoint, { params });
  }

  // POST запрос
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT запрос
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE запрос
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

// Создаем экземпляр API сервиса
const apiService = new ApiService();

// API методы для заявок
export const requestsApi = {
  // Создание новой заявки
  async createRequest(requestData) {
    return apiService.post('/api/requests', requestData);
  },

  // Получение списка заявок
  async getRequests(filters = {}) {
    return apiService.get('/api/requests', filters);
  },
};

// API методы для жилых комплексов
export const complexesApi = {
  // Получение списка всех ЖК
  async getComplexes() {
    return apiService.get('/api/complexes');
  },
};

// API методы для акций
export const promotionsApi = {
  // Получение списка акций
  async getPromotions(category = null) {
    const params = category ? { category } : {};
    return apiService.get('/api/promotions', params);
  },
};

// API методы для квартир
export const apartmentsApi = {
  // Получение списка квартир с фильтрацией
  async getApartments(filters = {}) {
    return apiService.get('/api/apartments', filters);
  },
};

// API методы для статуса
export const statusApi = {
  // Создание статус проверки
  async createStatusCheck(clientName) {
    return apiService.post('/api/status', { client_name: clientName });
  },

  // Получение статус проверок
  async getStatusChecks() {
    return apiService.get('/api/status');
  },
};

// Экспортируем основной API сервис и класс ошибки
export { apiService, ApiError };

// Экспортируем все API методы в одном объекте
export const api = {
  requests: requestsApi,
  complexes: complexesApi,
  promotions: promotionsApi,
  apartments: apartmentsApi,
  status: statusApi,
};

export default api;