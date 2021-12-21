import { FilterField } from './interfaces/field.interface';

export class Utils {

  static filterFieldsToObject(filterFields: FilterField[] | { [key: string]: FilterField}): { [key: string]: FilterField } {
    let obj = {};

    if (filterFields instanceof Array) {
      filterFields.forEach(filter => (obj as any)[filter.key] = filter);
    } else if (typeof filterFields === 'object' && filterFields !== null) {
      obj = filterFields;
    }

    return obj;
  }

  static filterFieldsToValues(filterFields: FilterField[] | { [key: string]: FilterField}): { [key: string]: string } {
    const obj = {};

    if (typeof filterFields === 'object' && filterFields !== null) {
      for (const key in filterFields) {
        const filter: FilterField = (filterFields as any)[key];

        if (typeof filter.value === 'undefined' || filter.value === null) {
          continue;
        }

        (obj as any)[filter.key] = filter.value;
      }
    }

    return obj;
  }

}
