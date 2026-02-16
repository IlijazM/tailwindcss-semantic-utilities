import { TailwindOptionsPropertyAccessor } from './tailwind-options-property-accessor';
import { TailwindOption } from './tailwind-option';
import { TailwindOptionsType } from './tailwind-options-type';

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
  constructor({ options, defaultOptions }: { options: any; defaultOptions: TailwindOptionsType<T> }) {
    super(TailwindOptionsWrapper.applyOptions({ options: options ?? {}, defaultOptions }));
  }

  private static applyOptions<T>({
    options,
    defaultOptions,
  }: {
    options: any;
    defaultOptions: TailwindOptionsType<T>;
  }): TailwindOptionsType<T> {
    let result = defaultOptions;

    options = Object.fromEntries(
      Object.entries(options).map(([key, value]) => [key.replace(/^"|^'|'$|"$/g, ""), value])
    )

    for (const optionKey of Object.keys(defaultOptions) as (keyof TailwindOptionsType<T>)[]) {
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
    defaultOptions: TailwindOptionsType<T>;
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
    throw new Error('The Tailwind option must be an array of strings.');
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
