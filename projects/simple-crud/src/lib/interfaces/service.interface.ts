import { Paginator } from './paginator.interface';
import { FilterField } from './field.interface';
import { FormGroup } from '@angular/forms';

export interface Service {
  list?: ServiceOperationList;
  create?: ServiceOperationCreate;
  read?: ServiceOperation;
  update?: ServiceOperation;
  delete?: ServiceOperation;
}

export interface ServiceOperation {
  url?: string;
  method?: 'post'|'POST'|'get'|'GET'|'patch'|'PATCH'|'put'|'PUT'|'delete'|'DELETE';
  handle?: (...params: any[]) => any;
}

export interface ServiceOperationList extends ServiceOperation {
  handle?: (pageIndex: number, pageSize: number, filters: { [key: string]: FilterField }) => Promise<Paginator>;
}

export interface ServiceOperationCreate extends ServiceOperation {
  title?: string;
  color?: 'warn'|'primary'|'accent',
  description?: string;
  successMessage?: string;
  errorMessage?: string;
  handle?: (form: FormGroup) => any;
}