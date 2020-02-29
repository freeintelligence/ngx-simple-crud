import { Field } from 'ngx-simple-forms';

export interface FilterButton {
  icon?: string;
  text?: string;
  type?: 'submit'|'button';
  color?: 'accent'|'primary'|'warn';
  tooltip?: string;
  handle?: (filters?: { [ key: string ]: Field }) => any;
  disabled?: (filters?: { [ key: string ]: Field }) => boolean;
  hidden?: (filters?: { [ key: string ]: Field }) => boolean;
}
