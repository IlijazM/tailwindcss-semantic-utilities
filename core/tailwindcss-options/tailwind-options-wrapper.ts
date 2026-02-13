import { INVALID_OPTION_TYPE } from './tailwindcss-options-errors.ts';
import { TailwindOptionsPropertyAccessor } from './tailwind-options-property-accessor';

export type OptionsType<T> = {
  [K in keyof T]: TailwindOption<T[K]>;
};

export class TailwindOption<T> {
  constructor(protected _value: T) {}

  get value() {
    return this._value;
  }

  set value(value: T) {
    this._value = value;
  }
}

export class StronglyTypedTailwindOption<T> extends TailwindOption<T> {
  constructor(value: T) {
    super(value);
  }

  get value() {
    return this._value;
  }

  set value(value: T) {
    if (typeof value !== typeof this._value) {
      throw `Failed to apply option. Types do not match. Expected type: '${typeof this._value}'. Actual type: '${typeof value}'.`;
    }
    if (Array.isArray(value) && !Array.isArray(this._value)) {
      throw `Failed to apply option. Types do not match. Expected type: '${Array.isArray(this._value) ? 'Array' : 'Not an array'}'. Actual type: '${Array.isArray(value) ? 'Array' : 'Not an array'}'.`;
    }
    this._value = value;
  }
}

export abstract class TailwindSelectableObjectOption<T> extends TailwindOption<Record<string, T>> {
  constructor(_value: Record<string, T>) {
    super(_value);
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

  private static applyOptions<T, U extends OptionsType<T>>({
    options,
    defaultOptions,
  }: {
    options: any;
    defaultOptions: U;
  }): U {
    if (options == null) {
      return defaultOptions;
    }

    let result = {} as OptionsType<T>;

    for (const optionKey of Object.keys(defaultOptions) as (keyof OptionsType<T>)[]) {
      // const additionalOptions = TailwindOptionsWrapper.getAllCustomTextStyleNames({ options, optionKey });

      result[optionKey] = TailwindOptionsWrapper.applySingleOption({
        options,
        defaultOptions,
        optionKey,
      });


      // for (const additionalOption of additionalOptions) {
      //   if (!(optionKey in result)) {
      //     result[optionKey] = {};
      //   }
      //   result[optionKey][additionalOption] = options[`${optionKey}--${additionalOption}`];
      // }
    }

    return result as U;
  }

  private static applySingleOption<T, K extends keyof T>({
    options,
    defaultOptions,
    optionKey,
  }: {
    options: any,
    defaultOptions: OptionsType<T>;
    optionKey: K;
  }): TailwindOption<T[K]> {
    // If no option is provided, return the default option for that key.
    if (!options[optionKey] || (Array.isArray(options[optionKey]) && options[optionKey].length === 0)) {
      return defaultOptions[optionKey];
    }

    if (defaultOptions[optionKey] instanceof TailwindSelectableObjectOption) {
      throw "not implemented";
      // return { [optionKey]: TailwindOptionsWrapper.applySingleOptionObject({ options, defaultOptions, optionKey }) };
    } else {
      try {
        defaultOptions[optionKey].value = options[optionKey];
      } catch (err) {
        console.warn(`Failed to apply option '${optionKey.toString()}': ${err}`);
      }
      return defaultOptions[optionKey];
    }
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

  private static getAllCustomTextStyleNames({ options, optionKey }: { options: any; optionKey: string }): string[] {
    const customColorKeys: string[] = [];

    const prefix = optionKey + '--';

    for (const [potentialCustomColorKey] of Object.entries(options)) {
      if (!potentialCustomColorKey.startsWith(prefix)) {
        continue;
      }

      const customColorKey = potentialCustomColorKey.replace(new RegExp(`^${prefix}`), '');
      customColorKeys.push(customColorKey);
    }

    return customColorKeys;
  }
}
