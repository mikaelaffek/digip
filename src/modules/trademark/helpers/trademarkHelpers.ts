import { Trademark, TrademarkResponse } from '../../../types/trademark';

/**
 * Helper to check if a value contains the search term
 */
export const valueContainsTerm = (value: any, term: string): boolean => {
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
