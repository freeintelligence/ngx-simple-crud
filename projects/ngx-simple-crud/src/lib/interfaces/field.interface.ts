import { Field } from 'ngx-simple-forms';

export interface FilterField extends Field {
  value?: any;
}

export interface ControlField extends Field {
  hidden?: (action: string, element?: any) => boolean;
}
