/**
 * Trademark Module Barrel Export
 * This file exports all components, hooks, services, and types from the trademark module
 * for easier importing throughout the application.
 */

// Components
export { default as TrademarkTable } from './components/TrademarkTable';
export { default as TrademarkTableFilters } from './components/TrademarkTableFilters';
export { default as TrademarkModal } from './components/TrademarkTableModals';
export { getTrademarkColumns } from './components/TrademarkTableColumns';

// Hooks
export { useTrademarks } from './hooks/useTrademarks';

// Services
export { fetchTrademarks, filterTrademarks } from './services/trademarkService';
