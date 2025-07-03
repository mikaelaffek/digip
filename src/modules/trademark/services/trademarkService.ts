import { ApiResponse } from '../../../types/api';
import { Trademark, TrademarkResponse } from '../../../types/trademark';
import { fetchResource } from '../../../api/apiUtils';
import { valueContainsTerm } from '../helpers/trademarkHelpers';
import { en } from '../../../i18n/en';

/**
 * Fetches trademark data from the mock API (public/trademark-portfolio.json)
 */
export const fetchTrademarks = async (): Promise<TrademarkResponse> => {
  try {
    // Fix the path to include './public/' prefix for Next.js static files
    const response = await fetchResource<Trademark>('/trademark-portfolio.json');
    return response;
  } catch (error) {
    console.error('Error fetching trademarks:', error);
    throw new Error(en.errors.fetchFailed);
  }
};

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
    data: data.data.filter(trademark => {
      const properties = trademark.properties;
      for (const key in properties) {
        const propKey = key as keyof typeof trademark.properties;
        if (trademark.properties.hasOwnProperty(key) && 
            valueContainsTerm(trademark.properties[propKey], term)) {
          return true;
        }
      }
      return false;
    }),
  };

  return filteredData;
};