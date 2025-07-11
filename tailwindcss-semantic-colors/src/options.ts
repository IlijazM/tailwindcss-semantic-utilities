import { toColorArray } from '@/src/options/to-color-array.ts';
import { attemptToParseColorValueArray } from './options/color-value-array.ts';

type ColorType = 'semantic-colors' | 'surface-colors' | 'content-colors';

/**
 * A data wrapper for the options inputted to tailwindcss.
 */
export class Options {
  //#region consts

  private static readonly DEFAULT_COLOR = toColorArray('var(--color-neutral-*)');

  private static readonly DEFAULT_SEMANTIC_COLORS = {
    brand: toColorArray('var(--color-blue-*)'),
    primary: toColorArray('var(--color-indigo-*)'),
    secondary: toColorArray('var(--color-pink-*)'),
    tertiary: toColorArray('var(--color-lime-*)'),
    accent: toColorArray('var(--color-teal-*)'),
    info: toColorArray('var(--color-cyan-*)'),
    success: toColorArray('var(--color-green-*)'),
    warning: toColorArray('var(--color-amber-*)'),
    danger: toColorArray('var(--color-red-*)'),
  };

  private static readonly DEFAULT_SURFACE_COLORS = {
    surface: toColorArray('var(--color-gray-*)'),
    container: toColorArray('var(--color-slate-*)'),
  };

  private static readonly DEFAULT_CONTENT_COLORS = {
    content: Options.DEFAULT_COLOR,
  };

  //#endregion

  private options: Record<string, any>;

  constructor(options: unknown) {
    this.options = options ?? {};
  }

  get semanticColors(): Record<string, string[]> {
    return this.getColors('semantic-colors', Options.DEFAULT_SEMANTIC_COLORS);
  }

  get surfaceColors(): Record<string, string[]> {
    return this.getColors('semantic-colors', Options.DEFAULT_SURFACE_COLORS);
  }

  get contentColors(): Record<string, string[]> {
    return this.getColors('semantic-colors', Options.DEFAULT_CONTENT_COLORS);
  }

  private getColors(colorType: ColorType, defaultValue: Record<string, string[]>): Record<string, string[]> {
    if (!(colorType in this.options)) {
      return defaultValue;
    }

    const colorOptions = this.options[colorType];

    if (colorOptions == null) {
      throw new Error(`${colorType} must not null`);
    }

    if (colorOptions === '*') {
      return defaultValue;
    }

    if (typeof colorOptions === 'string') {
      return Options.parseColor(colorOptions);
    }

    if (colorOptions instanceof Array) {
      let colors: Record<string, string[]> = {};
      for (const c of colorOptions) {
        colors = { ...colors, ...Options.parseColor(c) };
      }
      return colors;
    }

    throw new Error('colors must be either a string or an array');
  }

  private static parseColor(color: string): Record<string, string[]> {
    if (color.includes(':')) {
      // expect the content to be of the form `<colorName>: <colorValue>`.
      // spaces are allowed because they get trimmed.
      const colorSplit = color.split(':').map((e) => e.trim());

      Options.colorSplitValidation(colorSplit);

      const [colorName, colorValue] = colorSplit;

      const colorValueArray = attemptToParseColorValueArray(colorValue!);

      if (colorValueArray !== false) {
        return { [colorName!]: colorValueArray };
      } else {
        return { [colorName!]: toColorArray(colorValue!) };
      }
    } else {
      return { [color]: Options.DEFAULT_COLOR };
    }
  }

  private static colorSplitValidation(colorSplit: string[]): void {
    if (colorSplit.length > 2) {
      throw new Error(`Expected color to be of form "<colorName>: <colorValue>", but found multiple ":".`);
    }

    if (colorSplit[0]!.length === 0) {
      throw new Error(`Expected color to be of form "<colorName>: <colorValue>", but left hand side is empty.`);
    }

    if (colorSplit[1]!.length === 0) {
      throw new Error(`Expected color to be of form "<colorName>: <colorValue>", but right hand side is empty.`);
    }
  }

  private static isColorValueArray(colorValue: string): boolean {
    return colorValue.startsWith('[') && colorValue.endsWith(']');
  }

  private static colorArrayParsingAndValidation(colorValue: string): string[] {
    const json = Options.colorArrayParsing(colorValue);

    if (!(json instanceof Array)) {
      throw new Error(
        `Expected color to be of form "<colorName>: [<colorValues>], but right hand side is not a valid json.`,
      );
    }

    return json;
  }

  private static colorArrayParsing(colorValue: string): any {
    try {
      return JSON.parse(colorValue);
    } catch (error) {
      throw new Error(
        `Expected color to be of form "<colorName>: [<colorValues>], but right hand side is not a valid json.`,
      );
    }
  }
}
