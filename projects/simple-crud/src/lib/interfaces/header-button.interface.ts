export interface HeaderButton {
  color?: 'warn'|'accent'|'primary',
  icon?: string;
  text?: string;
  handle: () => any;
}