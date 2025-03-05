import { HttpResponse } from '@angular/common/http';
import { FormElement } from 'ngx-simple-forms';

export interface ManagerUpdateParametersServiceData {
  form: {
    query: string;
    json: { [key: string]: unknown };
  };
  item?: { [key: string]: unknown };
}

export interface ManagerUpdateParametersService {
  url: (data: ManagerUpdateParametersServiceData) => string;
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body: (value: { [key: string]: unknown }) => { [key: string]: unknown };
  success: {
    when?: (response: HttpResponse<Object>) => boolean;
    message: string;
  };
  error: {
    message: string;
  };
}

export interface ManagerUpdateParameters {
  base: unknown;
  title: string;
  description?: string;
  color?: 'primary' | 'accent' | 'warn';
  service: ManagerUpdateParametersService;
  fields?: { [key: string]: FormElement };
  buttons?: { [key: string]: FormElement };
}
