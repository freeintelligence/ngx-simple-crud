import { FormElement } from 'ngx-simple-forms';

export interface ManagerFiltersParameters {
  submitOn?: 'change' | 'custom';
  elements?: { [key: string]: FormElement };
}
