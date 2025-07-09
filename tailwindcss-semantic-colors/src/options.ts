const DEFAULT_SEMANTIC_COLORS = [
  'brand',
  'primary',
  'secondary',
  'tertiary',
  'accent',
  'info',
  'success',
  'warning',
  'danger',
];
const DEFAULT_SURFACE_COLORS = ['surface'];
const DEFAULT_CONTENT_COLORS = ['content'];

type ColorType = 'semantic-colors' | 'surface-colors' | 'content-colors';

/**
 * A data wrapper for the options inputted to tailwindcss.
 */
export class Options {
  private options: Object;

  constructor(options: unknown) {
    this.options = options ?? {};
  }

  get semanticColors(): string[] {
    return this.getColors('semantic-colors', DEFAULT_SEMANTIC_COLORS);
  }

  get surfaceColors(): string[] {
    return this.getColors('semantic-colors', DEFAULT_SURFACE_COLORS);
  }

  get contentColors(): string[] {
    return this.getColors('semantic-colors', DEFAULT_CONTENT_COLORS);
  }

  private getColors(colorType: ColorType, defaultValue: string[]): string[] {
    if (!(colorType in this.options)) {
      return defaultValue;
    }

    if (this.options[colorType] == null) {
      throw new Error(`${colorType} must not null`);
    }

    if (this.options[colorType] === '*') {
      return defaultValue;
    }

    if (typeof this.options[colorType] === 'string') {
      return [this.options[colorType]];
    }

    if (this.options[colorType] instanceof Array) {
      if (this.options[colorType].includes('*')) {
        return [...this.options[colorType].filter((color) => color !== '*'), ...defaultValue];
      }
      return this.options[colorType];
    }

    throw new Error('colors must be either a string or an array');
  }
}
