/**
 * English language translations
 */
export const en = {
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    noData: 'No data available',
  },
  trademark: {
    portfolio: {
      title: 'Trademark Portfolio',
      total: 'Total: {{count}} trademarks',
      filteredResults: 'Showing {{count}} filtered results',
      search: {
        placeholder: 'Search trademarks...',
        button: 'Search',
        clear: 'Clear',
      },
      filters: {
        date: 'Date filters',
        status: 'Status filters',
      },
      table: {
        noResults: 'No trademarks found',
      },
    },
    details: {
      title: 'Trademark Details',
      close: 'Close',
      regions: 'Regions',
      classes: 'Classes',
      status: 'Status',
      dates: {
        application: 'Application Date',
        registration: 'Registration Date',
        expiry: 'Expiry Date',
      },
    },
  },
  errors: {
    fetchFailed: 'Failed to fetch trademark data',
  },
};

export default en;
