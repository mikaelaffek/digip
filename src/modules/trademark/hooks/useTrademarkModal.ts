import { useState } from 'react';
import { Trademark } from '@/types/trademark';

export interface UseTrademarkModalReturn {
  selectedTrademark: Trademark | null;
  handleViewClick: (trademark: Trademark) => void;
  handleCloseModal: () => void;
}

export const useTrademarkModal = (): UseTrademarkModalReturn => {
  const [selectedTrademark, setSelectedTrademark] = useState<Trademark | null>(null);

  const handleViewClick = (trademark: Trademark) => {
    setSelectedTrademark(trademark);
  };

  const handleCloseModal = () => {
    setSelectedTrademark(null);
  };

  return {
    selectedTrademark,
    handleViewClick,
    handleCloseModal
  };
};
