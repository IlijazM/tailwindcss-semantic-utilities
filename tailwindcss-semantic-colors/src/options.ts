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
  themeOverrides: Record<string, TailwindCssSemanticColorsThemedOptionsType>;
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

export class TailwindCssSemanticColorsOptions extends TailwindcssOptionsObject<TailwindCssSemanticColorsOptionsType> {
  constructor(options: any) {
    super(options, DEFAULT_OPTIONS);
  }
}
