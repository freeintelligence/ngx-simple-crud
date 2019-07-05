/**
 *
 */
export class Utils {

  /**
   * Remove empty values into object (return a new object)
   * @param data object to clean
   */
  public static cleanObject(data: any) {
    const result = {};

    for (const i in data) {
      if (data[i] === null || data[i] === undefined || (typeof data[i] === 'number' && isNaN(data[i]))) {
        continue;
      }

      result[i] = data[i];
    }

    return result;
  }

}
