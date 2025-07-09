import { DEFAULT_COLORS } from './consts';

const COLORS_DEFAULT_VALUE = ['brand', 'primary', 'secondary', 'tertiary', 'accent', 'info', 'success', 'warning', 'danger'];

export class Options {
  private options: Object;

  constructor(options: unknown) {
    this.options = options ?? {};
  }

  get colors(): string[] {
    if (!('colors' in this.options)) {
      return COLORS_DEFAULT_VALUE;
    }

    if (this.options.colors == null) {
      throw new Error('colors must not null');
    }

    if (this.options.colors === '*') {
      return COLORS_DEFAULT_VALUE;
    }

    if (typeof this.options.colors === 'string') {
      return [this.options.colors];
    }

    if (this.options.colors instanceof Array) {
      if (this.options.colors.includes('*')) {
        return [...this.options.colors.filter((color) => color !== '*'), ...COLORS_DEFAULT_VALUE];
      }
      return this.options.colors;
    }

    throw new Error('colors must be either a string or an array');
  }
}
