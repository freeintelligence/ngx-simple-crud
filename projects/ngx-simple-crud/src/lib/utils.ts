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

export function deepClone<T>(value: T, map = new WeakMap<object, any>()): T {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (map.has(value)) {
    return map.get(value);
  }

  if (typeof value === 'function') {
    const fn = value as Function;
    return fn.bind({}) as unknown as T;
  }

  if (value instanceof Date) {
    return new Date(value) as T;
  }

  if (value instanceof RegExp) {
    return new RegExp(value) as T;
  }

  if (value instanceof Map) {
    const result = new Map();
    map.set(value, result);
    value.forEach((v, k) => {
      result.set(deepClone(k, map), deepClone(v, map));
    });
    return result as T;
  }

  if (value instanceof Set) {
    const result = new Set();
    map.set(value, result);
    value.forEach((v) => {
      result.add(deepClone(v, map));
    });
    return result as T;
  }

  if (Array.isArray(value)) {
    const result: any[] = [];
    map.set(value, result);
    value.forEach((item, index) => {
      result[index] = deepClone(item, map);
    });
    return result as T;
  }

  const result = Object.create(Object.getPrototypeOf(value));
  map.set(value, result);

  Object.keys(value).forEach((key) => {
    (result as any)[key] = deepClone((value as any)[key], map);
  });

  return result as T;
}

export function deepMerge<T extends object>(target: T, source: T): T {
  if (target === source) return target;

  if (
    typeof target !== 'object' ||
    target === null ||
    typeof source !== 'object' ||
    source === null
  ) {
    return source;
  }

  if (Array.isArray(target) && Array.isArray(source)) {
    return [...target, ...source] as T;
  }

  if (target instanceof Date && source instanceof Date) {
    return new Date(Math.max(target.getTime(), source.getTime())) as T;
  }

  if (target instanceof Map && source instanceof Map) {
    return new Map([...target, ...source]) as T;
  }

  if (target instanceof Set && source instanceof Set) {
    return new Set([...target, ...source]) as T;
  }

  const merged: Record<string | symbol, any> = { ...target };

  for (const key of Reflect.ownKeys(source)) {
    const targetValue = (target as Record<string | symbol, any>)[key];
    const sourceValue = (source as Record<string | symbol, any>)[key];

    if (typeof sourceValue === 'function') {
      merged[key] = sourceValue;
    } else if (sourceValue instanceof Date) {
      merged[key] = new Date(sourceValue.getTime());
    } else if (sourceValue instanceof Map) {
      merged[key] = new Map(sourceValue);
    } else if (sourceValue instanceof Set) {
      merged[key] = new Set(sourceValue);
    } else if (typeof sourceValue === 'object' && sourceValue !== null) {
      merged[key] = deepMerge(targetValue, sourceValue);
    } else {
      merged[key] = sourceValue;
    }
  }

  return merged as T;
}
