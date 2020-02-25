import { FilterField } from './interfaces/filter-field.interface';

export class Utils {

  static filterFieldsToObject(filterFields: FilterField[]): { [key: string]: FilterField } {
    const obj = {};

    if (filterFields instanceof Array) {
      filterFields.forEach(filter => obj[filter.key] = filter);
    }

    return obj;
  }

}
