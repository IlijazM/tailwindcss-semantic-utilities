import { toColorArray } from '@src/options/to-color-array.ts';
import { TailwindcssOptionsObject } from './options/tailwindcss-options-object.ts';

export interface TailwindCssSemanticPaletteThemedOptionsType {
  semanticPalette: Record<string, string[]>;
}

export const DEFAULT_SEMANTIC_PALETTE: Record<string, string[]> = {
  brand: toColorArray('var(--color-blue-*)'),
  primary: toColorArray('var(--color-indigo-*)'),
  secondary: toColorArray('var(--color-pink-*)'),
  tertiary: toColorArray('var(--color-lime-*)'),
  accent: toColorArray('var(--color-teal-*)'),
  info: toColorArray('var(--color-cyan-*)'),
  success: toColorArray('var(--color-green-*)'),
  warning: toColorArray('var(--color-amber-*)'),
  danger: toColorArray('var(--color-red-*)'),
  surface: toColorArray('var(--color-gray-*)'),
  container: toColorArray('var(--color-slate-*)'),
  content: toColorArray('var(--color-neutral-*)'),
};

const DEFAULT_OPTIONS: TailwindCssSemanticPaletteThemedOptionsType = {
  semanticPalette: DEFAULT_SEMANTIC_PALETTE,
};

export class TailwindcssSemanticPaletteOptions extends TailwindcssOptionsObject<TailwindCssSemanticPaletteThemedOptionsType> {
  constructor(options: any) {
    super(options, DEFAULT_OPTIONS);
  }
}
