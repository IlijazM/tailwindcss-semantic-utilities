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
 * ## Custom colors
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
 * ## Customize colors
 *
 * A user may select, add, and customize colors
 *
 */

import { toColorArray } from '@src/options/to-color-array.ts';
import {
  INVALID_AMOUNT_OF_COLORS_ERROR,
  INVALID_CUSTOM_SEMANTIC_COLOR_TYPE,
  INVALID_SEMANTIC_PALETTE_TYPE,
  INVALID_TAILWINDCSS_OPTIONS_TYPE,
} from '@src/options/tailwindcss-semantic-palette-options-errors.ts';

type PaletteOptionsType = Record<string, string[]>;

export interface TailwindCssSemanticPaletteThemedOptionsType {
  semanticPalette: PaletteOptionsType;
}

export const DEFAULT_SEMANTIC_PALETTE_COLOR_SHADES = toColorArray('var(--color-neutral-*)');

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

export class TailwindcssSemanticPaletteOptions implements TailwindCssSemanticPaletteThemedOptionsType {
  readonly semanticPalette: PaletteOptionsType;

  constructor(options: unknown) {
    this.semanticPalette = this.applyOptions(options);
  }

  private applyOptions(options: unknown): PaletteOptionsType {
    if (options == null) {
      return DEFAULT_SEMANTIC_PALETTE;
    }

    if (typeof options !== 'object') {
      throw INVALID_TAILWINDCSS_OPTIONS_TYPE;
    }

    return this.applyAllSemanticPaletteOptions(options);
  }

  private applyAllSemanticPaletteOptions(options: any): PaletteOptionsType {
    let semanticPalette: PaletteOptionsType = {};

    semanticPalette = this.applySemanticPaletteOption(options);
    semanticPalette = this.applySemanticPaletteCustomColorsOption(semanticPalette, options);

    return semanticPalette;
  }

  private applySemanticPaletteOption(options: any): PaletteOptionsType {
    // If no semantic palette option is provided, return the default semantic palette.
    if (!('semantic-palette' in options)) {
      return DEFAULT_SEMANTIC_PALETTE;
    }

    const semanticPaletteOption = options['semantic-palette'];

    // This case happens when there is only on color provided in the .css file. In this case the string should just be
    // treated as an array with one element.
    //
    // For example:
    //
    // ```css
    // @import 'tailwindcss';
    // @plugin '@IlijazM/tailwindcss-semantic-palette' {
    //   semantic-palette: primary;
    // }
    // ```
    if (typeof semanticPaletteOption === 'string') {
      return this.mergeSemanticPaletteOptions([semanticPaletteOption]);
    }

    // This is a special case where the user provides a number instead of a string. This can happen when the user
    // provides a number color name without quotes in the .css file. I'm not sure why someone would do that, but just in
    // case. In this case the number should be treated as an array with the number as string as the only element.
    //
    // For example:
    //
    // ```css
    // @import 'tailwindcss';
    // @plugin '@IlijazM/tailwindcss-semantic-palette' {
    //   semantic-palette: 100;
    // }
    // ```
    if (typeof semanticPaletteOption === 'number') {
      return this.mergeSemanticPaletteOptions([semanticPaletteOption.toString()]);
    }

    // This case happens when there is a list of colors provided in the .css file.
    //
    // For example:
    //
    // ```css
    // @import 'tailwindcss';
    // @plugin '@IlijazM/tailwindcss-semantic-palette' {
    //   semantic-palette: primary, brand;
    // }
    // ```
    if (Array.isArray(semanticPaletteOption)) {
      return this.mergeSemanticPaletteOptions(semanticPaletteOption);
    }

    // If the semantic palette option is not a string, number, or array, throw an error. I'm not sure how this would
    // happen, but just in case.
    throw INVALID_SEMANTIC_PALETTE_TYPE;
  }

  private mergeSemanticPaletteOptions(semanticPaletteOption: string[]): PaletteOptionsType {
    const semanticPalette: PaletteOptionsType = {};

    for (const colorName of semanticPaletteOption) {
      if (colorName === '*') {
        Object.assign(semanticPalette, DEFAULT_SEMANTIC_PALETTE);
      } else if (colorName in DEFAULT_SEMANTIC_PALETTE) {
        semanticPalette[colorName] = DEFAULT_SEMANTIC_PALETTE[colorName]!;
      } else {
        semanticPalette[colorName] = DEFAULT_SEMANTIC_PALETTE_COLOR_SHADES;
      }
    }

    return semanticPalette;
  }

  private applySemanticPaletteCustomColorsOption(
    semanticPalette: PaletteOptionsType,
    options: any,
  ): PaletteOptionsType {
    const customColorKeys: string[] = this.getAllCustomColorNames(options);

    for (const customColorKey of customColorKeys) {
      if (!(customColorKey in semanticPalette)) {
        // Potentially warn the user that they defined a custom color that is not in the semantic palette.
        continue;
      }

      const option = this.getCustomSemanticPalette(options, customColorKey);

      if (option.length === 1) {
        semanticPalette[customColorKey] = toColorArray(option[0]!);
      } else if (option.length === 11) {
        semanticPalette[customColorKey] = option;
      } else {
        throw INVALID_AMOUNT_OF_COLORS_ERROR;
      }
    }

    return semanticPalette;
  }

  private getCustomSemanticPalette(options: any, colorName: string): string[] {
    const option = options['semantic-palette--' + colorName];

    if (typeof option === 'string') {
      return [option];
    } else if (Array.isArray(option)) {
      return option;
    } else {
      throw INVALID_CUSTOM_SEMANTIC_COLOR_TYPE;
    }
  }

  private getAllCustomColorNames(options: any): string[] {
    const customColorKeys: string[] = [];

    for (const [potentialCustomColorKey] of Object.entries(options)) {
      if (!potentialCustomColorKey.startsWith('semantic-palette--')) {
        continue;
      }

      const customColorKey = potentialCustomColorKey.replace(/^semantic-palette--/, '');
      customColorKeys.push(customColorKey);
    }

    return customColorKeys;
  }
}
