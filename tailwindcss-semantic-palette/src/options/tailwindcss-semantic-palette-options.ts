/**
 * @packageDocumentation
 *
 * This package is responsible for parsing the options object provided from TailwindCSS into a typed class that is
 * getting used for generating the palette.
 *
 * This package does the following things:
 *
 * ## No options provided
 *
 * If the user didn't provide any options, a default should be chosen containing a handful of useful color additions for
 * the palette. The user can simply go with the default palette by importing the plugin with no options provided like
 * the following:
 *
 * ```css
 * @import 'tailwindcss';
 * @plugin '@IlijazM/tailwindcss-semantic-palette';
 * ```
 *
 * This yields the default output which is defined in the const {@link DEFAULT_SEMANTIC_PALETTE} and looks like the
 * following:
 *
 * ```json
 * {
 *   "semanticPalette": {
 *     "brand": ["var(--color-blue-50)", "var(--color-blue-100)", ..., "var(--color-blue-950)"],
 *     "primary": ["var(--color-indigo-50)", "var(--color-indigo-100)", ..., "var(--color-indigo-950)"],
 *     ...
 *     "content": ["var(--color-neutral-50)", "var(--color-neutral-100)", ..., "var(--color-neutral-950)"],
 *   }
 * }
 * ```
 *
 * ## A sub-set of colors
 *
 * A user may select a sub-set of colors that get used. This is useful if said user only needs for example "primary" and
 * "brand". The user can select these two colors by prompting the sub-set of colors using the option "semantic-palette"
 * which looks like the following:
 *
 * ```css
 * @import 'tailwindcss';
 * @plugin '@IlijazM/tailwindcss-semantic-palette' {
 *   semantic-palette: primary, brand;
 * }
 * ```
 *
 * This yields a subset of the default output defined in the const {@link DEFAULT_SEMANTIC_PALETTE} and looks like the
 * following:
 *
 * ```json
 * {
 *   "semanticPalette": {
 *     "brand": ["var(--color-blue-50)", "var(--color-blue-100)", ..., "var(--color-blue-950)"],
 *     "primary": ["var(--color-indigo-50)", "var(--color-indigo-100)", ..., "var(--color-indigo-950)"],
 *   }
 * }
 * ```
 *
 * ## Custom color
 *
 * A user may define his custom colors. This is useful if there is a specific use case where a color should get assigned
 * a semantic meaning for example the user defined an ui that includes a kanban board. That kanban board should use a
 * semantic color for each column which includes "To Do", "In Progress", "Done". It needs these colors in different
 * shades because the background color, border color, text color, and button color changes based on the column. In this
 * case the user can define new colors by using the options "semantic-palette" and the options
 * "semantic-palette--<color_name>" which looks the following:
 *
 * ```css
 * @import 'tailwindcss';
 * @plugin '@IlijazM/tailwindcss-semantic-palette' {
 *   semantic-palette: "*", to-do, in-progress, done;
 *   semantic-palette--to-do: "#ecfbf3", "#c6f2da", "#a0eac1", "#7be1a9", "#55d990", "#2fd077", "#26aa62", "#1e844c", "#155f36", "#0d3921", "#04130b";
 *   semantic-palette--in-progress: "var(--color-sky-50)", "var(--color-sky-100)", "var(--color-sky-200)", "var(--color-sky-300)", "var(--color-sky-400)", "var(--color-sky-500)", "var(--color-sky-600)", "var(--color-sky-700)", "var(--color-sky-800)", "var(--color-sky-900)", "var(--color-sky-950)";
 *   semantic-palette--done: "hsl(260, 13%, 95%)", "hsl(262, 11%, 86%)", "hsl(260, 10%, 77%)", "hsl(260, 11%, 68%)", "hsl(261, 11%, 59%)", "hsl(261, 11%, 50%)", "hsl(261, 11%, 41%)", "hsl(263, 11%, 32%)", "hsl(263, 11%, 23%)", "hsl(263, 11%, 14%)", "hsl(260, 13%, 5%)"
 * }
 * ```
 *
 */

import { toColorArray } from '@src/options/to-color-array.ts';
import { TailwindcssOptionsObject } from '@src/options/tailwindcss-options-object.ts';

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
//
// export class TailwindcssSemanticPaletteOptions implements TailwindCssSemanticPaletteThemedOptionsType {
//   readonly semanticPalette: PaletteOptionsType;
//
//   get() {
//     return {};
//   }
//
//   constructor(options: any) {
//     this.semanticPalette = this.applyOptions(options);
//   }
//
//   private applyOptions(options: any): PaletteOptionsType {
//     if (options == null) {
//       return DEFAULT_SEMANTIC_PALETTE;
//     }
//
//     if (typeof options === 'object') {
//       const mergedOptions: PaletteOptionsType = { ...DEFAULT_SEMANTIC_PALETTE };
//     }
//
//     return {};
//   }
//
//   mergeOptions(options: any) {}
// }
