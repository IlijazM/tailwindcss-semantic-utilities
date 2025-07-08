export class Options {
  private options: Object;

  constructor(options: unknown) {
    this.options = options ?? {};
  }

  get colors(): string[] {
    if (!('colors' in this.options)) {
      return ['brand', 'primary', 'secondary', 'tertiary', 'accent', 'info', 'success', 'warning', 'danger'];
    }

    if (this.options.colors == null) {
      throw new Error('colors must not null');
    }

    if (typeof this.options.colors === 'string') {
      return [this.options.colors];
    }

    if (this.options.colors instanceof Array) {
      return this.options.colors;
    }

    throw new Error('colors must be either a string or an array');
  }
}
