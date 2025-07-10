type ColorType = 'semantic-colors' | 'surface-colors' | 'content-colors';

/**
 * A data wrapper for the options inputted to tailwindcss.
 */
export class Options {
  //#region consts

  private static readonly DEFAULT_COLOR = Options.toColorArray('var(--color-neutral-*)');

  private static readonly DEFAULT_SEMANTIC_COLORS = {
    brand: Options.toColorArray('var(--color-blue-*)'),
    primary: Options.toColorArray('var(--color-indigo-*)'),
    secondary: Options.toColorArray('var(--color-pink-*)'),
    tertiary: Options.toColorArray('var(--color-lime-*)'),
    accent: Options.toColorArray('var(--color-teal-*)'),
    info: Options.toColorArray('var(--color-cyan-*)'),
    success: Options.toColorArray('var(--color-green-*)'),
    warning: Options.toColorArray('var(--color-amber-*)'),
    danger: Options.toColorArray('var(--color-red-*)'),
  };

  private static readonly DEFAULT_SURFACE_COLORS = {
    surface: Options.toColorArray('var(--color-gray-*)'),
    container: Options.toColorArray('var(--color-slate-*)'),
  };

  private static readonly DEFAULT_CONTENT_COLORS = {
    content: Options.DEFAULT_COLOR,
  };

  //#endregion

  private options: Object;

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

  private static toColorArray(variableName: string): string[] {
    if (/^((var\()?--)?(color-)/.test(variableName) === false) {
      return [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((_) => variableName);
    }

    variableName = variableName
      // replaces "--var(color-" and "--color-", and "color-".
      .replace(/^((var\()?--)?(color-)/, '')

      // replaces ")", "*)", "-*)", "-*"
      .replace(/-?\*\)?$|\)$/, '');

    return [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
      (steps) => `var(--color-${variableName}-${steps})`,
    );
  }

  private static parseColor(color: string): Record<string, string[]> {
    if (color.includes(':')) {
      // expect the content to be of the form `<colorName>: <colorValue>`.
      // spaces are allowed because they get trimmed.
      const colorSplit = color.split(':').map((e) => e.trim());

      Options.colorSplitValidation(colorSplit);

      const [colorName, colorValue] = colorSplit;

      if (Options.isColorValueArray(colorValue)) {
        return { [colorName]: Options.colorArrayParsingAndValidation(colorValue) };
      } else {
        return { [colorName]: Options.toColorArray(colorValue) };
      }
    } else {
      return { [color]: Options.DEFAULT_COLOR };
    }
  }

  private static colorSplitValidation(colorSplit: string[]): void {
    if (colorSplit.length > 2) {
      throw new Error(`Expected color to be of form "<colorName>: <colorValue>", but found multiple ":".`);
    }

    if (colorSplit[0].length === 0) {
      throw new Error(`Expected color to be of form "<colorName>: <colorValue>", but left hand side is empty.`);
    }

    if (colorSplit[1].length === 0) {
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
