import { FormElement } from 'ngx-simple-forms';

export interface ManagerHeaderParameters {
  title: string;
  color?: string;
  leftElements?: { [key: string]: FormElement };
  rightElements?: { [key: string]: FormElement };
}
