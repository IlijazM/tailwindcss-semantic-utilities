import { TAILWIND_COLORS_SHADES } from '@src/common.ts';

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
 * Transforms a color variable from a name to an array containing all tailwind colors steps from 90 to 950.
 *
 * If a simple name is inputted this name will be wrapped into an array eleven times.
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
 * @example The input `white` yields an array with the value `white` present eleven times.
 *
 * ```json
 * ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white"]
 * ```
 *
 * @example The input `var(--color-indigo-*) yields the following result
 *
 * ```
 * [
 *   "var(--color-indigo-50",
 *   "var(--color-indigo-100",
 *   "var(--color-indigo-200",
 *   "var(--color-indigo-300",
 *   "var(--color-indigo-400",
 *   "var(--color-indigo-500",
 *   "var(--color-indigo-600",
 *   "var(--color-indigo-700",
 *   "var(--color-indigo-800",
 *   "var(--color-indigo-900",
 *   "var(--color-indigo-950"
 * ]
 * ```
 *
 * @see TAILWIND_COLORS_SHADES
 * @param variableName the name of the variable to transform into a color step array
 * @returns the color step array
 */
export function toColorArray(variableName: string): string[] {
  if (PREFIX_REGEX.test(variableName) === false) {
    // single variable case
    // example: "white" -> ["white", "white", ..., "white"]
    return TAILWIND_COLORS_SHADES.map(() => variableName);
  }

  // multi variable case
  // example: "var(--color-indigo-*)" -> ["var(--color-indigo-50)", "var(--color-indigo-100)", ..., "var(--color-indigo-950)"]

  // Strip the prefix and suffix from the variable name and leave only the variable name
  const strippedVariableName = variableName.replace(PREFIX_REGEX, '').replace(SUFFIX_REGEX, '');
  return TAILWIND_COLORS_SHADES.map((steps) => `var(--color-${strippedVariableName}-${steps})`);
}
