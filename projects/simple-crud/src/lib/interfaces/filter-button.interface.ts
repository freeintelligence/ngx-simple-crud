import { FilterField } from './filter-field.interface';

export interface FilterButton {
  icon?: string;
  text?: string;
  type?: 'submit'|'button';
  color?: 'accent'|'primary'|'warn';
  tooltip?: string;
  handle?: (filters?: FilterField) => any;
  disabled?: (filters?: FilterField) => any;
  hidden?: (filters?: FilterField) => any;
}
