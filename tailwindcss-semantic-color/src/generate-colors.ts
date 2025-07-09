import { DEFAULT_COLORS } from './consts';

import { parse, converter, formatHsl } from 'culori';
import { TailwindCssTheme } from './tailwindcss-semantic-color';

export type ColorValue = string;
export type Colors = { [colorName: ColorValue]: ColorValue };

const BASE_COLORS = ['base', 'surface', 'content'];

const SEMANTIC_COLOR_STEPS = {
  '-low': 300,
  '': 400,
  '-high': 500,
  '-low-inverted': 700,
  '-inverted': 600,
  '-high-inverted': 500,
  '-light': 300,
  '-dark': 500,
  '-light-inverted': 500,
  '-dark-inverted': 700,
};

const SURFACE_STEPS = {
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

const SURFACE_STEPS_EXTRA = {
  ...SURFACE_STEPS,
  '-lowest': 'white',
  '-highest': 300,
  '-lowest-inverted': 'black',
  '-highest-inverted': 700,
  '-lightest': 'white',
  '-darkest': 300,
  '-lightest-inverted': 700,
  '-darkest-inverted': 'black',
};

const COLOR_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

export function generateColors(theme: TailwindCssTheme, primitiveColorMapping: Record<string, string>): Colors {
  return {
    ...getPrimitives(primitiveColorMapping),
    ...getSemanticColors(primitiveColorMapping),
    ...getSurfaceColors(primitiveColorMapping),
  };
}

function getPrimitives(colorMapping: Record<string, string>): Colors {
  const result: Colors = {};

  const colors = [...BASE_COLORS, ...Object.keys(colorMapping)];

  for (const color of colors) {
    for (const step of COLOR_STEPS) {
      const targetColor = colorMapping[color] ?? DEFAULT_COLORS[color];
      result[`${color}-${step}`] = `var(--color-${targetColor}-${step})`;
    }
  }

  return result;
}

function getSemanticColors(colorMapping: Record<string, string>): Colors {
  const result: Colors = {};

  const colors = Object.keys(colorMapping);

  for (const color of colors) {
    for (const [sourceStep, targetStep] of Object.entries(SEMANTIC_COLOR_STEPS)) {
      result[`${color}${sourceStep}`] = `var(--color-${color}-${targetStep})`;
    }
  }

  return result;
}

function getSurfaceColors(colorMapping: Record<string, string>): Colors {
  const result: Colors = {};

  const colors = ['surface', ...Object.keys(colorMapping)];

  for (const color of colors) {
    if (color === 'surface') {
      for (const [sourceStep, targetStep] of Object.entries(SURFACE_STEPS_EXTRA)) {
        const value = typeof targetStep === 'string' ? targetStep : `var(--color-${color}-${targetStep})`;
        result[`${color}${sourceStep}`] = value;
      }
    } else {
      for (const [sourceStep, targetStep] of Object.entries(SURFACE_STEPS)) {
        result[`surface-${color}${sourceStep}`] = `var(--color-${color}-${targetStep})`;
      }
    }
  }

  return result;
}
