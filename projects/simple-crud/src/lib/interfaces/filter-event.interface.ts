import { FilterField } from './filter-field.interface';

export interface FilterEvent {
  pageIndex: number;
  pageSize: number;
  filterFields: { [key: string]: FilterField };
}