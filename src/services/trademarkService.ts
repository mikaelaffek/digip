import { TrademarkResponse } from '../types/trademark';

/**
 * Fetches trademark data from the mock API (public/trademarks.json)
 * In a real application, this would be replaced with actual API calls
 */
export const fetchTrademarks = async (): Promise<TrademarkResponse> => {
  try {
    const response = await fetch('/trademarks.json');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch trademarks: ${response.status}`);
    }
    
    const data: TrademarkResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching trademarks:', error);
    throw error;
  }
};

/**
 * Filters trademarks by a search term
 * This is a client-side implementation for the code challenge
 * In a real application, this would likely be handled by the API
 */
export const filterTrademarks = (
  data: TrademarkResponse,
  searchTerm: string
): TrademarkResponse => {
  if (!searchTerm.trim()) {
    return data;
  }

  const term = searchTerm.toLowerCase();
  const filteredData = {
    ...data,
    data: data.data.filter((trademark) => {
      // Filter by display text
      if (trademark.properties.display_text?.toLowerCase().includes(term)) {
        return true;
      }
      
      // Filter by application number
      if (trademark.properties.application_no?.toLowerCase().includes(term)) {
        return true;
      }
      
      // Filter by status
      if (trademark.properties.status?.toLowerCase().includes(term)) {
        return true;
      }
      
      // Filter by region
      if (trademark.properties.region?.toLowerCase().includes(term)) {
        return true;
      }
      
      return false;
    }),
  };

  return filteredData;
};
