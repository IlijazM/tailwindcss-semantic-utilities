import { TAILWIND_COLORS_SHADES } from '@src/tailwindcss-color-shades.ts';
import { generateColorShades } from '@src/color-shades-generator/generate-color-shades.ts';

/**
 * Matches the following prefixes:
 *
 * * "--var(color-"
 * * "--color-"
 * * "color-"
 */
const PREFIX_REGEX = /^((var\()?--)?(color-)/;

/**
 * Matches to following suffixes:
 *
 * * ")"
 * * "*)"
 * * "-*)"
 * * "-*"
 */
const SUFFIX_REGEX = /-?\*\)?$|\)$/;

/**
 * Transforms a color variable from a name to an array containing all tailwind palette steps from 90 to 950.
 *
 * If a simple name is inputted this name will be wrapped the tailwind shades will be generated based on that color.
 * @see generate-color-shades.ts for more information about the generation of colors.
 *
 * If used with one of the following prefixes:
 *
 * * "--var(color-"
 * * "--color-"
 * * "color-"
 *
 * it will return an array with the desired color variable for each tailwind steps.
 *
 * The variable name may end with the following suffixes:
 *
 * * ")"
 * * "*)"
 * * "-*)"
 * * "-*"
 *
 * @example The input `white` yields an array with the different shades of gray.
 *
 * ```json
 * ["#f8f8f8", "#eeeeee", "#dedede", "#c4c4c4", "#a4a4a4", "#808080", "#636363", "#484848", "#2e2e2e", "#1b1b1b", "#070707"]
 * ```
 *
 * @example The input `var(--color-indigo-*) yields the following result
 *
 * ```
 * [
 *   "var(--color-indigo-50)",
 *   "var(--color-indigo-100)",
 *   "var(--color-indigo-200)",
 *   "var(--color-indigo-300)",
 *   "var(--color-indigo-400)",
 *   "var(--color-indigo-500)",
 *   "var(--color-indigo-600)",
 *   "var(--color-indigo-700)",
 *   "var(--color-indigo-800)",
 *   "var(--color-indigo-900)",
 *   "var(--color-indigo-950)"
 * ]
 * ```
 *
 * @see TAILWIND_COLORS_SHADES
 * @param variableName the name of the variable to transform into a color step array
 * @returns the color step array
 */
export function toColorArray(variableName: string): string[] {
  if (!PREFIX_REGEX.test(variableName)) {
    // single variable case
    return generateColorShades(variableName);
  }

  // multi variable case
  // example: "var(--color-indigo-*)" -> ["var(--color-indigo-50)", "var(--color-indigo-100)", ..., "var(--color-indigo-950)"]

  // Strip the prefix and suffix from the variable name and leave only the variable name
  const strippedVariableName = variableName.replace(PREFIX_REGEX, '').replace(SUFFIX_REGEX, '');
  return TAILWIND_COLORS_SHADES.map((steps) => `var(--color-${strippedVariableName}-${steps})`);
}
