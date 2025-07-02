import { ApiResponse } from '../types/api';
import { Trademark, TrademarkResponse } from '../types/trademark';

// Sample data to use when fetch fails
const sampleData: TrademarkResponse = {
  status: true,
  message: "Sample trademark data",
  data: [
    {
      id: "sample-1",
      properties: {
        active: "true",
        applicant_city: "Stockholm",
        applicant_country: "Sweden",
        applicant_country_of_incorporation: null,
        applicant_euipo_identifier: null,
        applicant_first_name: null,
        applicant_last_name: null,
        applicant_legal_form: null,
        applicant_legal_name: "Sample Company AB",
        applicant_name_normalized: null,
        applicant_nationality: null,
        applicant_phone: null,
        applicant_street_address: "Sample Street 123",
        application_date: "2023-01-01",
        application_no: "12345678",
        brand: "SampleBrand",
        classes: "9, 42",
        designated_countries: ["US", "EU"],
        display_text: "Sample Brand",
        expiry_date: "2033-01-01",
        goods_and_services: "Software services",
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
        registration_date: "2023-02-01",
        registration_number: "REG12345",
        registry_status: null,
        renewal: null,
        status: "Registered",
        trademark_business_types: null,
        word_mark_specification_text: null,
        groups: {},
        class_numbers: ["9", "42"]
      },
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z",
      archived: false
    }
  ],
  meta: [],
  prev_page_query: null,
  next_page_query: null,
  path: "",
  current_page: 1,
  per_page: 10,
  pages: 1,
  to: 1,
  total: 1
};

/**
 * Generic function to fetch any resource from an API endpoint
 * @param url The API endpoint URL
 * @returns Promise with the API response
 */
export const fetchResource = async <T>(url: string): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store' // Prevent caching issues during development
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch resource: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data as ApiResponse<T>;
  } catch (error) {
    console.error('Error fetching resource:', error);
    throw error;
  }
};

/**
 * Fetches trademark data from the mock API (public/trademark-portfolio.json)
 * In a real application, this would be replaced with actual API calls
 */
export const fetchTrademarks = async (): Promise<TrademarkResponse> => {
  try {
    // Use the generic fetchResource function with Trademark as the resource type
    return await fetchResource<Trademark>('./trademark-portfolio.json');
  } catch (error) {
    console.error('Error in fetchTrademarks:', error);
    // Return sample data as fallback
    return sampleData;
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
