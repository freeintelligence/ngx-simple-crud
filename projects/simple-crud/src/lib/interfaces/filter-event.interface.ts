import { Field } from 'ngx-simple-forms';

export interface FilterEvent {
  pageIndex: number;
  pageSize: number;
  filterFields: { [key: string]: Field };
}