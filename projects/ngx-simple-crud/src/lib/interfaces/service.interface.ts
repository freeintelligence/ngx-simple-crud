import { Paginator } from './paginator.interface';
import { FilterField } from './field.interface';
import { FormGroup } from '@angular/forms';

type PropertyFunction<T> = (...args: any[]) => T;

export interface Service {
  list?: ServiceOperationList;
  create?: ServiceOperationCreate;
  update?: ServiceOperationUpdate;
  delete?: ServiceOperationDelete;
}

export interface ServiceOperation {
  url?: PropertyFunction<string> | string;
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

export interface ServiceOperationUpdate extends ServiceOperation {
  url?: (element: any) => string;
  title?: string;
  color?: 'warn'|'primary'|'accent',
  description?: string;
  successMessage?: string;
  errorMessage?: string;
  handle?: (element: any, form: FormGroup) => any;
}

export interface ServiceOperationDelete extends ServiceOperation {
  url?: (element: any) => string;
  title?: string;
  color?: 'warn'|'primary'|'accent',
  description?: string;
  successMessage?: string;
  errorMessage?: string;
  submitButtonText?: string;
  SubmitButtonIcon?: string;
  handle?: (element: any) => any;
}
