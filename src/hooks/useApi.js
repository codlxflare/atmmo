import { useState, useEffect, useCallback } from 'react';
import { ApiError } from '../services/api';

// Хук для работы с API запросами
export const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Произошла ошибка при загрузке данных';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, dependencies);

  return { data, loading, error, execute };
};

// Хук для работы с формами
export const useFormApi = (apiFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submit = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const result = await apiFunction(data);
      setSuccess(true);
      return result;
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Произошла ошибка при отправке данных';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
    setLoading(false);
  }, []);

  return { loading, error, success, submit, reset };
};

// Хук для кэширования данных
export const useCachedApi = (apiFunction, cacheKey, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);

  const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

  const fetchData = useCallback(async (forceRefresh = false) => {
    // Проверяем кэш
    if (!forceRefresh && data && lastFetch && Date.now() - lastFetch < CACHE_DURATION) {
      return data;
    }

    setLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction();
      setData(result);
      setLastFetch(Date.now());
      
      // Сохраняем в localStorage для персистентности
      if (cacheKey) {
        localStorage.setItem(cacheKey, JSON.stringify({
          data: result,
          timestamp: Date.now()
        }));
      }
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Произошла ошибка при загрузке данных';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, dependencies);

  // Загружаем данные из кэша при инициализации
  useEffect(() => {
    if (cacheKey) {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          const { data: cachedData, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setData(cachedData);
            setLastFetch(timestamp);
            return;
          }
        } catch (e) {
          // Игнорируем ошибки парсинга кэша
        }
      }
    }
    
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};
