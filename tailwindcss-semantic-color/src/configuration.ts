import { Colors, generateColors } from './generate-colors';

export type PrimitiveColors = Colors;

export interface Configuration {
  primitiveColors: PrimitiveColors;
  colors: () => Colors;
}

export const configuration: Configuration = {
  primitiveColors: {
    base: 'gray',
    surface: 'slate',
    content: 'neutral',
    brand: 'blue',
    primary: 'indigo',
    secondary: 'pink',
    tertiary: 'lime',
    accent: 'teal',
    info: 'cyan',
    success: 'green',
    warning: 'amber',
    danger: 'red',
  },

  colors() {
    return generateColors(this.primitiveColors, colorSteps);
  },
};

export const colorSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
