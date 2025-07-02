# Trademark Portfolio Table

A Next.js application that displays trademark data in a sortable and filterable table. Built with TypeScript, React Query, and modern best practices.

## Features

- **Generic Table Component**: Reusable table component that can be used with any data type
- **Trademark-specific Table**: Implementation of the generic table for trademark data
- **Sorting and Filtering**: Sort by clicking column headers and filter with the search box
- **Modal Details**: Click on any row to see detailed information about the trademark
- **React Query Integration**: Efficient data fetching and caching
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Works on mobile and desktop devices

## Project Structure

```
src/
  components/
    Table/                        # Generic, reusable table components
      Table.tsx                   # Main table component
    TrademarkTable/               # Specific table for trademarks
      TrademarkTable.tsx          # Trademark-specific table implementation
      TrademarkTableFilters.tsx   # Search and filter controls
      TrademarkTableModals.tsx    # Modal for displaying trademark details
  services/
    trademarkService.ts           # API/data fetching for trademarks
  hooks/
    useTrademarks.ts              # Custom hook for React Query and trademark data
  types/
    trademark.d.ts                # TypeScript interfaces for trademark data
    table.d.ts                    # TypeScript interfaces for table components
  styles/
    Table.module.css              # Styles for generic table
    TrademarkTable.module.css     # Styles for trademark-specific components
  public/
    trademarks.json               # Mock API data
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
