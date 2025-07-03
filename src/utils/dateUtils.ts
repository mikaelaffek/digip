/**
 * Formats a date string to a human-readable format
 * @param dateString The date string to format
 * @returns Formatted date string or 'N/A' if input is null/invalid
 */
export const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('sv-se', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (e) {
    return dateString;
  }
};
