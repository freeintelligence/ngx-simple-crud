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

export interface ManagerReadParametersService {
  url: (data: {
    offset: number;
    to: number;
    limit: number;
    pageSize: number;
    pageNumber: number;
  }) => string;
}

export interface ManagerReadParameters {
  service: ManagerReadParametersService;
  columns: ManagerReadParametersColumn[];
  pagination?: ManagerReadParametersPagination;
  data: unknown[];
  notFound?: {
    message: string;
  };
}
