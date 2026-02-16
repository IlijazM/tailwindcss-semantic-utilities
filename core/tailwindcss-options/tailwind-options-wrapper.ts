import { INVALID_OPTION_TYPE } from './tailwindcss-options-errors.ts';
import { TailwindOptionsPropertyAccessor } from './tailwind-options-property-accessor';

export type OptionsType<T> = {
  [K in keyof T]: TailwindOption<T[K]>;
};

export class TailwindOption<T> {
  public constructor(protected _value: T) {}

  public get value(): any {
    return this._value;
  }

  public apply({ value, relatedValues }: { value: any; relatedValues: any }) {
    // @ts-ignore
    this._value = value;
  }
}

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

export class SelectableObjectTailwindOption<T> extends TailwindOption<Record<string, T>> {
  public constructor(
    _value: Record<string, T>,
    private onAdd: (key: string, value: T) => [string, T] = (key: string, value: T) => [key, value],
  ) {
    super(_value);
  }

  public override get value(): Record<string, T> {
    return this._value;
  }

  public override apply({ value, relatedValues }: { value: any; relatedValues?: any }) {
    this.selectValues({ value });
    this.addValues({ relatedValues });
  }

  private selectValues({ value }: { value: any }) {
    if (value == null) {
      return;
    }
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      value = [value.toString()];
    }
    if (!Array.isArray(value)) {
      throw new Error(`Unable to apply selectable object tailwind option with value: ${value}`);
    }
    if (value.includes('*')) {
      return;
    }
    this._value = Object.fromEntries(Object.entries(this._value).filter(([key]) => value.includes(key)));
  }

  private addValues({ relatedValues }: { relatedValues?: any }) {
    Object.assign(
      this._value,
      Object.fromEntries(Object.entries(relatedValues).map(([key, value]) => this.onAdd(key, value as T))),
    );
  }
}

/**
 * responsible for parsing the options object provided from Tailwind CSS into a type-safe class and merging options together in a way to maximize ease of extendability whiles fully maintaining flexibility.
 *
 * # Why is that class needed?
 *
 * For the following reasons:
 *
 * 1. This wrapper around the unsafe Tailwind CSS options provides a type-safe interface to interact with Tailwind CSS options.
 * 2. The merge strategy used needs proper implementation.
 */
export class TailwindOptionsWrapper<T> extends TailwindOptionsPropertyAccessor<T> {
  constructor({ options, defaultOptions }: { options: any; defaultOptions: OptionsType<T> }) {
    super(TailwindOptionsWrapper.applyOptions({ options, defaultOptions }));
  }

  private static applyOptions<T>({
    options,
    defaultOptions,
  }: {
    options: any;
    defaultOptions: OptionsType<T>;
  }): OptionsType<T> {
    let result = defaultOptions;

    for (const optionKey of Object.keys(defaultOptions) as (keyof OptionsType<T>)[]) {
      result[optionKey] = TailwindOptionsWrapper.overrideDefaultOption({
        options,
        defaultOptions,
        optionKey,
      });
    }

    return result;
  }

  private static overrideDefaultOption<T, K extends keyof T>({
    options,
    defaultOptions,
    optionKey,
  }: {
    options: any;
    defaultOptions: OptionsType<T>;
    optionKey: K;
  }): TailwindOption<T[K]> {
    const relatedValues = TailwindOptionsWrapper.getAllRelatedValues({ options, optionKey });

    // If no option is provided, return the default option for that key.
    if (
      (!options[optionKey] || (Array.isArray(options[optionKey]) && options[optionKey].length === 0)) &&
      Object.keys(relatedValues).length == 0
    ) {
      return defaultOptions[optionKey];
    }

    try {
      defaultOptions[optionKey].apply({
        value: options[optionKey],
        relatedValues,
      });
    } catch (err) {
      console.warn(`Failed to apply option '${optionKey.toString()}': ${err}`);
    }

    return defaultOptions[optionKey];
  }

  // private static applySingleOptionObject<T, U extends OptionsType<T>>({
  //   options,
  //   defaultOptions,
  //   optionKey,
  // }: {
  //   options: any;
  //   defaultOptions: U;
  //   optionKey: string;
  // }): U {
  //   const selections = TailwindOptionsWrapper.getStringArrayFromOption({ options, optionKey });
  //
  //   if (selections.includes('*')) {
  //     return defaultOptions[optionKey];
  //   }
  //
  //   return Object.fromEntries(Object.entries(defaultOptions[optionKey]).filter(([key, _]) => selections.includes(key)));
  // }

  private static getStringArrayFromOption({ options, optionKey }: { options: any; optionKey: string }): string[] {
    const option = options[optionKey];

    // This case happens when there is only one option provided in the .css file. In this case the string should just be
    // treated as an array with one element.
    //
    // For example:
    //
    // ```css
    // @import 'tailwindcss';
    // @plugin '@IlijazM/tailwindcss-semantic-palette' {
    //   semantic-palette: primary;
    // }
    // ```
    if (typeof option === 'string') {
      return [option];
    }

    if (typeof option === 'boolean') {
      return [option.toString()];
    }

    // This is a special case where the user provides a number instead of a string. This can happen when the user
    // provides a number option name without quotes in the .css file. I'm not sure why someone would do that, but just in
    // case. In this case the number should be treated as an array with the number as string as the only element.
    //
    // For example:
    //
    // ```css
    // @import 'tailwindcss';
    // @plugin '@IlijazM/tailwindcss-semantic-typography' {
    //   semantic-typography: 100;
    // }
    // ```
    if (typeof option === 'number') {
      return [option.toString()];
    }

    // This case happens when there is a list of options provided in the .css file.
    //
    // For example:
    //
    // ```css
    // @import 'tailwindcss';
    // @plugin '@IlijazM/tailwindcss-semantic-typography' {
    //   semantic-typography: primary, brand;
    // }
    // ```
    if (Array.isArray(option)) {
      return option;
    }

    // If the option is not a string, number, or array, throw an error. I'm not sure how this would happen,
    // but just in case.
    throw INVALID_OPTION_TYPE;
  }

  private static getAllRelatedValues({
    options,
    optionKey,
  }: {
    options: any;
    optionKey: string | number | symbol;
  }): Record<string, any> {
    const customColorKeys: Record<string, any> = [];

    const prefix = `${optionKey.toString()}--`;

    for (const [potentialCustomColorKey] of Object.entries(options)) {
      if (!potentialCustomColorKey.startsWith(prefix)) {
        continue;
      }

      const customColorKey = potentialCustomColorKey.replace(new RegExp(`^${prefix}`), '');
      customColorKeys[customColorKey] = options[potentialCustomColorKey];
    }

    return customColorKeys;
  }
}
