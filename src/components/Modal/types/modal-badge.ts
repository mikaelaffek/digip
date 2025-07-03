export type ModalBadgeType = 'status' | 'country' | 'info' | 'warning' | 'error' | 'success';

export interface ModalBadgeProps {
  type?: ModalBadgeType;
  backgroundColor?: string;
  color?: string;
  children: React.ReactNode;
  className?: string;
}
