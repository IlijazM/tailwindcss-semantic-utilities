import { configuration, PrimitiveColors } from './configuration';
import { generateColors } from './generate-colors';
import { Preconditions } from './Preconditions';

export class Options {
  private options: Object;

  constructor(options: unknown) {
    this.options = options ?? {};
  }

  colors() {
    if (!('colors' in this.options)) {
      return this.getDefaultColors();
    }

    Preconditions.notNullish(this.options.colors, 'colors must not null');

    const optionColors = typeof this.options.colors === 'string' ? [this.options.colors] : this.options.colors;

    Preconditions.instanceofArray(optionColors, 'colors must be an array');

    const primitiveColors: PrimitiveColors = {};

    (optionColors as string[]).forEach((color) => {
      let colorName: string;
      let colorValue: string | null;

      if (color.includes(':')) {
        [colorName, colorValue] = color.split(':').map((e) => e.trim());
      } else {
        colorName = color;
        colorValue = null;
      }

      if (colorValue === null && colorName in configuration.primitiveColors) {
        colorValue = configuration.primitiveColors[colorName];
      }

      primitiveColors[colorName] = colorValue ?? 'neutral';
    });

    return generateColors(primitiveColors);
  }

  private getDefaultColors() {
    return generateColors(configuration.primitiveColors);
  }
}
