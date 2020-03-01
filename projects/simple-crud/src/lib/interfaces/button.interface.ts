import { Button, Field } from 'ngx-simple-forms';

export interface FilterButton extends Button {
  handle?: (filters: { [key: string]: Field }) => any;
}