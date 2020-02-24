import { FilterField } from './filter-field.interface';

export interface FilterButton {
  icon?: string;
  text?: string;
  type?: 'submit'|'button';
  color?: 'accent'|'primary'|'warn';
  tooltip?: string;
  handle?: (filters?: { [ key: string ]: FilterField }) => any;
  disabled?: (filters?: { [ key: string ]: FilterField }) => boolean;
  hidden?: (filters?: { [ key: string ]: FilterField }) => boolean;
}
