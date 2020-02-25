export interface ItemButton {
  color?: 'primary'|'warn'|'accent';
  tooltip?: string;
  icon?: string;
  text?: string;
  handle: (element: any) => any;
  disabled?: (element: any) => boolean;
  hidden?: (element: any) => boolean;
}