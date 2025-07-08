export const Preconditions = {
  notNullish(object: unknown, c: undefined | string | ((value: unknown) => void) = undefined): boolean {
    if (object == null) {
      if (typeof c === 'function') {
        c(object);
      } else {
        throw new Error(`Precondition: '${c || 'object'}' to not be nullish failed.`);
      }
      return false;
    }

    return true;
  },

  instanceofArray(object: unknown, c: undefined | string | ((value: unknown) => void) = undefined): boolean {
    if (!(object instanceof Array)) {
      if (typeof c === 'function') {
        c(object);
      } else {
        if (typeof c === 'string' && c.includes(' ')) {
          throw new Error(c);
        } else {
          throw new Error(`Precondition: '${c || 'object'}' to be an instance of an Array failed.`);
        }
      }
      return false;
    }

    return true;
  },
};
