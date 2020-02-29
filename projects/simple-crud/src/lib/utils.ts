import { Field } from 'ngx-simple-forms';

export class Utils {

  static filterFieldsToObject(filterFields: Field[]): { [key: string]: Field } {
    const obj = {};

    if (filterFields instanceof Array) {
      filterFields.forEach(filter => obj[filter.key] = filter);
    }

    return obj;
  }

}
