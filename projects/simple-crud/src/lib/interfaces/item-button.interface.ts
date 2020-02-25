export interface ItemButton {
  color?: 'primary'|'warn'|'accent';
  toolTip?: string;
  icon?: string;
  text?: string;
  handle: (element: any) => any;
  disabled?: (element: any) => boolean;
  hidden?: (element: any) => boolean;
}