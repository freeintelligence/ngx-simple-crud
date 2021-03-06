import { Button } from 'ngx-simple-forms';
import { FilterField } from './field.interface';

export interface FilterButton extends Button {
  handle?: (filters: { [key: string]: FilterField }) => any;
}

export interface ItemButton extends Button {
  handle?: (element: any) => any;
}