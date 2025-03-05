import { HttpResponse } from '@angular/common/http';
import { FormElement } from 'ngx-simple-forms';

export interface ManagerDeleteParametersServiceData {
  form: {
    query: string;
    json: { [key: string]: unknown };
  };
  item?: { [key: string]: unknown };
}

export interface ManagerDeleteParametersService {
  url: (data: ManagerDeleteParametersServiceData) => string;
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

export interface ManagerDeleteParameters {
  base: unknown;
  title: string;
  description?: string;
  color?: 'primary' | 'accent' | 'warn';
  service: ManagerDeleteParametersService;
  buttons?: { [key: string]: FormElement };
}
