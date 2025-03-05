export function addGetterSetter<T>(
  obj: any,
  path: string,
  callback: (oldValue: T, newValue: T) => void,
  deep: boolean = false
) {
  const parts = path.split('.');
  let current = obj;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!(part in current)) {
      return;
    }
    current = current[part];
  }

  const lastKey = parts[parts.length - 1];
  let value = current[lastKey];

  if (deep && typeof value === 'object' && value !== null) {
    for (const key of Object.keys(value)) {
      addGetterSetter(value, key, callback, deep);
    }
  }

  Object.defineProperty(current, lastKey, {
    get() {
      return value;
    },
    set(newValue) {
      const oldValue = value;
      value = newValue;
      callback(oldValue, newValue);

      if (deep && typeof newValue === 'object' && newValue !== null) {
        for (const key of Object.keys(newValue)) {
          addGetterSetter(newValue, key, callback, deep);
        }
      }
    },
    enumerable: true,
    configurable: true,
  });
}

export function getDeepValue<T = unknown>(
  object: unknown,
  keys?: string
): T | undefined {
  if (typeof object !== 'object' || object === null) {
    return undefined;
  }

  if (!keys) {
    return object as T;
  }

  return keys.split('.').reduce((obj, key) => {
    if (obj && typeof obj === 'object') {
      return (obj as Record<string, any>)[key];
    }
    return undefined;
  }, object) as T | undefined;
}
