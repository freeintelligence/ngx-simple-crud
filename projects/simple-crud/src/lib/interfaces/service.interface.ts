import { Paginator } from './paginator.interface';
import { FilterField } from './field.interface';

export interface Service {
  list?: ServiceOperationList;
  create?: ServiceOperation;
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