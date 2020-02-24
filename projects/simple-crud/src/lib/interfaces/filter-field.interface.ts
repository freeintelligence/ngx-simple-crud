export interface FilterField {
  key: string;
  width?: string;
  type: 'select'|'input'|'date';
  placeholder?: string;
  value?: any;
  inputMask?: (field: FilterField) => any;
  valueMask?: (value: any) => any;

  typeSelect?: {
    options?: { value: any, description: string }[];
    multiple?: boolean;
  };

  typeInput?: {
    type?:
      'button'|
      'checkbox'|
      'color'|
      'date'|
      'datetime-local'|
      'email'|
      'file'|
      'hidden'|
      'image'|
      'month'|
      'number'|
      'password'|
      'radio'|
      'range'|
      'reset'|
      'search'|
      'submit'|
      'tel'|
      'text'|
      'time'|
      'url'|
      'week';
  };

  typeDate?: {

  };
}