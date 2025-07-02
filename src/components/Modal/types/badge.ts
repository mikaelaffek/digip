export type BadgeType = 'status' | 'country' | 'info' | 'warning' | 'error' | 'success';

export interface BadgeProps {
  type?: BadgeType;
  backgroundColor?: string;
  color?: string;
  children: React.ReactNode;
  className?: string;
}
