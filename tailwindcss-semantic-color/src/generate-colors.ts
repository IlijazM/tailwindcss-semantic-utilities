import { DEFAULT_COLORS } from './consts';

export type ColorValue = string;
export type Colors = { [colorName: ColorValue]: ColorValue };

const BASE_COLORS = ['base', 'surface', 'content'];

const STEPS = {
  '-low': 50,
  '': 100,
  '-high': 200,
  '-low-inverted': 950,
  '-inverted': 900,
  '-high-inverted': 800,
  '-light': 50,
  '-dark': 200,
  '-light-inverted': 800,
  '-dark-inverted': 950,
};

const COLOR_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

export function generateColors(primitiveColorMapping: Record<string, string>): Colors {
  return {
    ...Object.fromEntries(
      [...BASE_COLORS, ...Object.keys(primitiveColorMapping)].flatMap((primitiveColor) =>
        COLOR_STEPS.map((colorStep) => [`${primitiveColor}-${colorStep}`, `var(--color-${primitiveColorMapping[primitiveColor] ?? DEFAULT_COLORS[primitiveColor]}-${colorStep})`]),
      ),
    ),

    ...Object.fromEntries(Object.keys(primitiveColorMapping).map((primitiveColor) => [primitiveColor, `var(--color-${primitiveColor}-400)`])),

    'surface-lightest': 'white',
    'surface-light': 'var(--color-surface-50)',
    surface: 'var(--color-surface-100)',
    'surface-dark': 'var(--color-surface-200)',
    'surface-darkest': 'var(--color-surface-300)',

    'surface-lightest-inverted': 'var(--color-surface-700)',
    'surface-light-inverted': 'var(--color-surface-800)',
    'surface-inverted': 'var(--color-surface-900)',
    'surface-dark-inverted': 'var(--color-surface-950)',
    'surface-darkest-inverted': 'black',

    'surface-lowest': 'white',
    'surface-low': 'var(--color-surface-50)',
    'surface-high': 'var(--color-surface-200)',
    'surface-highest': 'var(--color-surface-300)',

    'surface-lowest-inverted': 'black',
    'surface-low-inverted': 'var(--color-surface-950)',
    'surface-high-inverted': 'var(--color-surface-800)',
    'surface-highest-inverted': 'var(--color-surface-700)',

    ...Object.fromEntries(
      Object.keys(primitiveColorMapping).flatMap((primitiveColor) =>
        Object.entries(STEPS).map(([step, stepValue]) => [`surface-${primitiveColor}${step}`, `var(--color-${primitiveColor}-${stepValue})`]),
      ),
    ),
  };
}
