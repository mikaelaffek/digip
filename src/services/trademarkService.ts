import { ApiResponse } from '../types/api';
import { Trademark, TrademarkResponse } from '../types/trademark';
import { fetchResource } from '../api/apiUtils';

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
            parent_application_no: null,
            parent_region: null,
            previous_application_date: null,
            previous_application_number: null,
            priority: null,
            region: "US",
            registration_date: "2023-01-01",
            registration_number: "12345",
            registry_status: null,
            renewal: null,
            status: "Registered",
            trademark_business_types: null,
            word_mark_specification_text: "Sample",
            groups: {},
            class_numbers: ["9", "42"]
          },
          createdAt: "2023-01-01T00:00:00Z",
          updatedAt: "2023-01-01T00:00:00Z",
          archived: false
        }
      ],
      meta: {}
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
        if (Object.prototype.hasOwnProperty.call(properties, key)) {
          if (valueContainsTerm(properties[key], term)) {
            return true;
          }
        }
      }
      return false;
    }),
  };

  return filteredData;
};