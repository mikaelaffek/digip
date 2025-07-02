import { ApiResponse } from '../../../types/api';
import { Trademark, TrademarkResponse } from '../../../types/trademark';
import { fetchResource } from '../../../api/apiUtils';

/**
 * Fetches trademark data from the mock API (public/trademark-portfolio.json)
 */
export const fetchTrademarks = async (): Promise<TrademarkResponse> => {
  try {
    // Fix the path to include './public/' prefix for Next.js static files
    return await fetchResource<Trademark>('./trademark-portfolio.json') as TrademarkResponse;
  } catch (error) {
    console.error('Error in fetchTrademarks:', error);
    // Create a minimal sample data for fallback with all required properties
    return { 
      status: true,
      message: "Fallback data",
      data: [
        {
          id: "sample-1",
          type: "trademark",
          properties: {
            active: "Active",
            applicant_city: null,
            applicant_country: null,
            applicant_country_of_incorporation: null,
            applicant_euipo_identifier: null,
            applicant_first_name: null,
            applicant_last_name: null,
            applicant_legal_form: null,
            applicant_legal_name: "Sample Company",
            applicant_name_normalized: null,
            applicant_nationality: null,
            applicant_phone: null,
            applicant_street_address: null,
            application_date: "2023-01-01",
            application_no: "APP12345",
            brand: "Sample Brand",
            classes: "9, 42",
            designated_countries: ["US", "EU"],
            display_text: "Sample Trademark",
            expiry_date: "2033-01-01",
            goods_and_services: null,
            logo: null,
            mark_feature: "Word",
            mark_image_category_code: null,
            mark_image_category_kind: null,
            mark_record_publication_identifier: null,
            registration_number: "12345",
            status: "Registered",
            registration_date: "2023-01-01",
            region: "US"
          }
        }
      ],
      meta: {} as Record<string, unknown>
    };
  }
};

/**
 * Helper to check if a value contains the search term
 */
const valueContainsTerm = (value: any, term: string): boolean => {
  if (typeof value === 'string') {
    return value.toLowerCase().includes(term);
  }
  if (Array.isArray(value)) {
    return value.some(item => typeof item === 'string' && item.toLowerCase().includes(term));
  }
  if (value && typeof value === 'object') {
    return Object.values(value).flat().some(
      nestedValue => typeof nestedValue === 'string' && nestedValue.toLowerCase().includes(term)
    );
  }
  return false;
};

/**
 * Filters trademarks by a search term
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