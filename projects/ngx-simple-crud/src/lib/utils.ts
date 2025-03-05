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
  // Manejo de valores primitivos y null
  if (value === null || typeof value !== 'object') {
    return value;
  }

  // Evitar ciclos en estructuras circulares
  if (map.has(value)) {
    return map.get(value);
  }

  // Clonar funciones manteniendo su referencia
  if (typeof value === 'function') {
    const fn = value as Function;
    return fn.bind({}) as unknown as T;
  }

  // Clonar objetos Date
  if (value instanceof Date) {
    return new Date(value) as T;
  }

  // Clonar objetos RegExp
  if (value instanceof RegExp) {
    return new RegExp(value) as T;
  }

  // Clonar Map
  if (value instanceof Map) {
    const result = new Map();
    map.set(value, result);
    value.forEach((v, k) => {
      result.set(deepClone(k, map), deepClone(v, map));
    });
    return result as T;
  }

  // Clonar Set
  if (value instanceof Set) {
    const result = new Set();
    map.set(value, result);
    value.forEach((v) => {
      result.add(deepClone(v, map));
    });
    return result as T;
  }

  // Clonar Array
  if (Array.isArray(value)) {
    const result: any[] = [];
    map.set(value, result);
    value.forEach((item, index) => {
      result[index] = deepClone(item, map);
    });
    return result as T;
  }

  // Clonar objetos genéricos (incluye instancias de clases)
  const result = Object.create(Object.getPrototypeOf(value));
  map.set(value, result);

  Object.keys(value).forEach((key) => {
    (result as any)[key] = deepClone((value as any)[key], map);
  });

  return result as T;
}
