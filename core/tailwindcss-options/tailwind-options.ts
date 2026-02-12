import {
  INVALID_CUSTOM_SEMANTIC_COLOR_TYPE,
  INVALID_OPTION_TYPE,
  INVALID_TAILWINDCSS_OPTIONS_TYPE,
} from './tailwindcss-options-errors.ts';
import { attemptParseValueArray } from './attempt-parse-value-array.ts';
import { TailwindOptionsPropertyAccessor } from './tailwind-options-property-accessor';
import { ConfigurableOptions } from './configurable';

export interface OptionsType {
  [key: string]: string[];
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
export class TailwindOptions<T extends Record<string, any>> extends TailwindOptionsPropertyAccessor<T> {
  constructor({ options, defaultOptions }: { options: any; defaultOptions: T }) {
    super(TailwindOptions.applyOptions({ options, defaultOptions }));
  }

  private static applyOptions<T extends Record<string, any>>({
    options,
    defaultOptions,
  }: {
    options: any;
    defaultOptions: T;
  }): T {
    if (options == null) {
      return defaultOptions;
    }

    let result: Record<string, any> = {};

    for (const optionKey of Object.keys(defaultOptions)) {
      const additionalOptions = TailwindOptions.getAllCustomTextStyleNames({ options, optionKey });

      Object.assign(
        result,
        TailwindOptions.applySingleOption({
          options,
          defaultOptions,
          optionKey,
          allPerDefault: additionalOptions.length === 0,
        }),
      );

      for (const additionalOption of additionalOptions) {
        if (!(optionKey in result)) {
          result[optionKey] = {};
        }
        result[optionKey][additionalOption] = options[`${optionKey}--${additionalOption}`];
      }
    }

    return result as T;
  }

  private static applySingleOption<T extends Record<string, any>>({
    options,
    defaultOptions,
    optionKey,
    allPerDefault,
  }: {
    options: any;
    defaultOptions: T;
    optionKey: string;
    allPerDefault: boolean;
  }): Object {
    // If no option is provided, return the default option for that key.
    if (!options[optionKey] || (Array.isArray(options[optionKey]) && options[optionKey].length === 0)) {
      if (!allPerDefault) {
        return {};
      }
      return { [optionKey]: defaultOptions[optionKey] };
    }

    if (typeof defaultOptions[optionKey] === 'object') {
      return { [optionKey]: TailwindOptions.applySingleOptionObject({ options, defaultOptions, optionKey }) };
    } else {
      throw 'not implemented yet';
    }
  }

  private static applySingleOptionObject<T extends Record<string, any>>({
    options,
    defaultOptions,
    optionKey,
  }: {
    options: any;
    defaultOptions: T;
    optionKey: string;
  }): Object {
    const selections = TailwindOptions.getStringArrayFromOption({ options, optionKey });

    if (selections.includes("*")) {
      return defaultOptions[optionKey];
    }

    return Object.fromEntries(Object.entries(defaultOptions[optionKey]).filter(([key, _]) => selections.includes(key)));
  }

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
