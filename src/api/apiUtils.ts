import { ApiResponse } from '../types/api';

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
