import { FilterField } from './interfaces/field.interface';

export class Utils {

  static filterFieldsToObject(filterFields: FilterField[]): { [key: string]: FilterField } {
    const obj = {};

    if (filterFields instanceof Array) {
      filterFields.forEach(filter => obj[filter.key] = filter);
    }

    return obj;
  }

  static filterFieldsToValues(filterFields: FilterField[]): { [key: string]: string } {
    const obj = {};

    if (filterFields instanceof Array) {
      filterFields.forEach(filter => {
        if (typeof filter.value === 'undefined' || filter.value === null) {
          return;
        }

        obj[filter.key] = filter.value
      });
    }

    return obj;
  }

}
