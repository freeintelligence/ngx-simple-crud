import { FormElement } from 'ngx-simple-forms';

export interface ManagerReadParametersColumn {
  title: string;
  property: string;
  hidden?: boolean;
  styles?: Partial<CSSStyleDeclaration>;
  elements?: { [key: string]: FormElement };
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
  filters: {
    query: string;
    json: { [key: string]: unknown };
  };
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

export interface ManagerReadParametersFilters {
  submitOn?: 'change' | 'submit';
  debounceTime?: number;
  elements?: { [key: string]: FormElement };
}

export interface ManagerReadParameters {
  service: ManagerReadParametersService;
  filters?: ManagerReadParametersFilters;
  columns: ManagerReadParametersColumn[];
  pagination?: ManagerReadParametersPagination;
  data?: unknown[];
  notFound?: {
    message: string;
  };
}
