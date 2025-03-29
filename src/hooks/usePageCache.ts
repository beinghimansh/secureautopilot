import { useState, useEffect } from 'react';

// Simple cache for storing page data
const pageCache: Record<string, any> = {};

/**
 * A custom hook for caching page data to improve loading performance
 * 
 * @param key - The unique key for this data
 * @param fetchFn - The function to fetch data if not in cache
 * @param ttl - Time to live in milliseconds (default: 5 minutes)
 * @returns The cached data and loading state
 */
export function usePageCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl: number = 5 * 60 * 1000
): { data: T | null; isLoading: boolean; refetch: () => Promise<T> } {
  const [data, setData] = useState<T | null>(pageCache[key]?.data || null);
  const [isLoading, setIsLoading] = useState<boolean>(!pageCache[key]);

  const fetchData = async (force: boolean = false) => {
    // If we have cached data and it's not expired, use it
    const cachedItem = pageCache[key];
    if (!force && cachedItem && cachedItem.expiry > Date.now()) {
      setData(cachedItem.data);
      setIsLoading(false);
      return cachedItem.data;
    }

    // Otherwise fetch new data
    setIsLoading(true);
    try {
      const result = await fetchFn();
      
      // Store in cache with expiry time
      pageCache[key] = {
        data: result,
        expiry: Date.now() + ttl
      };
      
      setData(result);
      return result;
    } catch (error) {
      console.error(`Error fetching data for key ${key}:`, error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!pageCache[key]) {
      fetchData();
    }
  }, [key]);

  // Function to force a refresh of the data
  const refetch = () => fetchData(true);

  return { data, isLoading, refetch };
}
