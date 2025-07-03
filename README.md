# Trademark Portfolio Table

A Next.js application that displays trademark data in a sortable and filterable table. Built with TypeScript, React Query, and modern best practices.

## Features

- **Modular Architecture**: Domain-driven design with feature modules
- **Custom React Hooks**: Separation of concerns with focused, reusable hooks
- **Generic Table Component**: Reusable table component that can be used with any data type
- **Sorting and Filtering**: Sort by clicking column headers and filter with search, date, and status filters
- **Modal Details**: Click on any row to see detailed information about the trademark
- **Internationalization**: Multi-language support with i18n system
- **Path Aliases**: Clean imports using TypeScript path aliases
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Works on mobile and desktop devices

## Project Structure

```
src/
  components/
    Modal/                       # Reusable modal components
    Table/                       # Generic, reusable table components
  config/
    constants.ts                 # Application-wide constants
  i18n/                          # Internationalization system
    en.ts                        # English translations
    TranslationProvider.tsx      # Context provider for translations
    index.ts                     # Export of translation functions
  modules/
    trademark/                   # Trademark domain module
      components/                # Trademark-specific components
        TrademarkTable.tsx       # Main trademark table component
        TrademarkTableFilters.tsx # Search and filter controls
        TrademarkTableModals.tsx # Modal for displaying trademark details
        TrademarkTableColumns.tsx # Column definitions for the table
        TrademarkDetailsModal/   # Components for the details modal
      hooks/                     # Trademark-specific hooks
        useTrademarkFilters.ts   # Hook for managing filters
        useTrademarkModal.ts     # Hook for managing modal state
        useTrademarkSorting.ts   # Hook for managing sorting
        useTrademarkTable.ts     # Main hook combining all functionality
        useTrademarks.ts         # Hook for fetching trademark data
        usePagination.ts         # Hook for pagination
      services/                  # Trademark-specific services
        trademarkService.ts      # API/data fetching for trademarks
  types/                         # TypeScript type definitions
    api.ts                       # API response types
    trademark.d.ts               # Trademark data types
    table.d.ts                   # Table component types
  styles/                        # CSS modules
  utils/                         # Utility functions
  app/                           # Next.js App Router
    trademark/                   # Trademark route
      page.tsx                   # Trademark page component
    page.tsx                     # Root page (redirects to /trademark)
  public/
    trademark-portfolio.json     # Mock API data
```

## Getting Started

### Installation

```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Design Choices

### Component Architecture

The project uses a modular component architecture with a clear separation of concerns:

- **Generic vs. Specific Components**: The Table component is designed to be reusable across different data types, while the TrademarkTable component implements the specific UI and behavior for trademark data.

- **Custom Hooks**: The `useTrademarks` hook encapsulates all the data fetching, sorting, and filtering logic, making the components cleaner and more focused on rendering.

### State Management

- **React Query**: Used for data fetching, caching, and managing loading/error states.
- **Local State**: Component-specific state is managed with React's useState and useMemo hooks.

### TypeScript

TypeScript is used throughout the application to provide type safety and better developer experience. The types are defined in dedicated files to keep the code organized and maintainable.

### Styling

CSS Modules are used for styling to ensure component-scoped styles without conflicts. The styles are organized by component for better maintainability.

## Future Improvements

- Add pagination for large datasets
- Implement more advanced filtering options
- Add unit and integration tests
- Add more accessibility features
- Implement real API integration
