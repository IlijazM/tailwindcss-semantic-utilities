import { Configuration, configuration, PrimitiveColors } from './configuration';

export interface Options {
  colors?: string[];
}

/**
 * Parses tailwind's options and mutates the configuration.
 *
 * @param options the options passed in by tailwind.
 */
export function optionParser(options: unknown): Configuration {
  if (options && typeof options === 'object' && 'colors' in options && options.colors !== undefined && options.colors instanceof Array) {
    const primitiveColors: PrimitiveColors = {};
    options.colors.forEach((color) => {
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

    configuration.primitiveColors = primitiveColors;
  }

  return configuration;
}
