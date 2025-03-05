import { HttpResponse } from '@angular/common/http';
import { FormElement } from 'ngx-simple-forms';

export interface ManagerCreateParametersServiceData {
  value: {
    query: string;
    json: { [key: string]: unknown };
  };
}

export interface ManagerCreateParametersService {
  url: (data: ManagerCreateParametersServiceData) => string;
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

export interface ManagerCreateParameters {
  title: string;
  description?: string;
  color?: 'primary' | 'accent' | 'warn';
  service: ManagerCreateParametersService;
  fields?: { [key: string]: FormElement };
  buttons?: { [key: string]: FormElement };
}
