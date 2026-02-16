import { TailwindOption } from './tailwind-option';

/**
 * overrides the apply method from tailwind options with a typechecker that asserts proper usage.
 */
export class TypeSafeTailwindOption<T> extends TailwindOption<T> {
  public constructor(value: T) {
    super(value);
  }

  public override get value(): T {
    return this._value;
  }

  public override apply({ value, relatedValues }: { value: any; relatedValues?: any }) {
    if (typeof value !== typeof this._value) {
      throw `Failed to apply option. Types do not match. Expected type: '${typeof this._value}'. Actual type: '${typeof value}'.`;
    }
    if (Array.isArray(value) && !Array.isArray(this._value)) {
      throw `Failed to apply option. Types do not match. Expected type: '${Array.isArray(this._value) ? 'Array' : 'Not an array'}'. Actual type: '${Array.isArray(value) ? 'Array' : 'Not an array'}'.`;
    }
    this._value = value;
  }
}
