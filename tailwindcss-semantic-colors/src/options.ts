import { toColorArray } from '@src/options/to-color-array.ts';
import { TailwindcssOptionsObject } from './options/tailwindcss-options-object.ts';

export interface TailwindCssSemanticColorsThemedOptionsType {
  semanticColors: Record<string, string[]>;
  surfaceColors: Record<string, string[]>;
  contentColors: Record<string, string[]>;
  surfaceColorSteps: Record<string, any>;
}

export interface TailwindCssSemanticColorsOptionsType extends TailwindCssSemanticColorsThemedOptionsType {
  themes: string[];
  defaultTheme: string;
  themeOverrides: Record<string, Partial<TailwindCssSemanticColorsThemedOptionsType>>;
}

const DEFAULT_THEMES: string[] = ['light', 'dark'];

const DEFAULT_DEFAULT_THEME = 'light';

const DEFAULT_COLOR = toColorArray('var(--color-neutral-*)');

const DEFAULT_SEMANTIC_COLORS: Record<string, string[]> = {
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

const DEFAULT_SURFACE_COLORS: Record<string, string[]> = {
  surface: toColorArray('var(--color-gray-*)'),
  container: toColorArray('var(--color-slate-*)'),
};

const DEFAULT_CONTENT_COLORS: Record<string, string[]> = {
  content: DEFAULT_COLOR,
};

const DEFAULT_SURFACE_STEPS: Record<string, any> = {
  '': 100,
  '-light': 50,
  '-dark': 200,
};

export const DEFAULT_OPTIONS: TailwindCssSemanticColorsOptionsType = {
  themes: DEFAULT_THEMES,
  defaultTheme: DEFAULT_DEFAULT_THEME,
  semanticColors: DEFAULT_SEMANTIC_COLORS,
  surfaceColors: DEFAULT_SURFACE_COLORS,
  contentColors: DEFAULT_CONTENT_COLORS,
  surfaceColorSteps: DEFAULT_SURFACE_STEPS,
  themeOverrides: {},
};

export type COLOR_TYPES = 'semanticColors' | 'surfaceColors' | 'contentColors';

export const COLOR_TYPE_SEMANTIC: COLOR_TYPES = 'semanticColors';
export const COLOR_TYPE_SURFACE: COLOR_TYPES = 'surfaceColors';
export const COLOR_TYPE_CONTENT: COLOR_TYPES = 'contentColors';
export const ALL_COLOR_TYPES: COLOR_TYPES[] = [COLOR_TYPE_SEMANTIC, COLOR_TYPE_SURFACE, COLOR_TYPE_CONTENT];

export class TailwindCssSemanticColorsOptions extends TailwindcssOptionsObject<TailwindCssSemanticColorsOptionsType> {
  constructor(options: any) {
    super(options, DEFAULT_OPTIONS);
  }

  get themes() {
    return this.get('themes');
  }

  get defaultTheme() {
    return this.get('defaultTheme');
  }

  get semanticColors() {
    return this.get(COLOR_TYPE_SEMANTIC);
  }

  get surfaceColors() {
    return this.get(COLOR_TYPE_SURFACE);
  }

  get contentColors() {
    return this.get(COLOR_TYPE_CONTENT);
  }

  get themeOverrides() {
    return this.get('themeOverrides');
  }

  getThemeOverridesFor(colorTypes: COLOR_TYPES | COLOR_TYPES[]): string[] {
    let themeOverrides: string[] = [];

    for (const theme of this.themes) {
      const themeOverride = this.themeOverrides[theme];
      if (!themeOverride) {
        continue;
      }

      if (Array.isArray(colorTypes)) {
        for (const colorType of colorTypes) {
          if (colorType in themeOverride) {
            if (colorType in themeOverride) {
              themeOverrides.push(...Object.keys(themeOverride[colorType]!));
            }
          }
        }
      } else {
        if (colorTypes in themeOverride) {
          if (colorTypes in themeOverride) {
            themeOverrides.push(...Object.keys(themeOverride[colorTypes]!));
          }
        }
      }
    }

    return [...new Set(themeOverrides)];
  }
}
