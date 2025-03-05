import { MatTableDataSource } from '@angular/material/table';

export interface ManagerReadParametersColumn {
  title: string;
  property: string;
  hidden?: boolean;
}

export interface ManagerReadParametersPagination {
  remote?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
}

export interface ManagerReadParametersServiceData {
  offset: number;
  to: number;
  pageSize: number;
  pageNumber: number;
}

export interface ManagerReadParametersServiceKeys {
  results?: string;
  count?: string;
}

export interface ManagerReadParametersService {
  url: (data: ManagerReadParametersServiceData) => string;
  body?: (data: ManagerReadParametersServiceData) => { [key: string]: unknown };
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  keys?: ManagerReadParametersServiceKeys;
}

export interface ManagerReadParameters {
  service: ManagerReadParametersService;
  columns: ManagerReadParametersColumn[];
  pagination?: ManagerReadParametersPagination;
  data?: unknown[];
  notFound?: {
    message: string;
  };
}
