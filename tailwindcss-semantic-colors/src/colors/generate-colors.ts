import { TailwindCssSemanticColorsOptions } from '../options.ts';
import { GenerateSurfaceColors } from './generate-surface-colors.ts';
import { GenerateUtilityColors } from './generate-utility-colors.ts';

export type ColorValue = string;
export type Colors = { [colorName: ColorValue]: ColorValue };

/**
 * Generates all colors.
 *
 * @param options a reference to the options object.
 * @returns the generated colors.
 */
export function generateColors(options: TailwindCssSemanticColorsOptions): Colors {
  return {
    ...new GenerateUtilityColors(options).generate(),
    ...generateSemanticColors(options),
    ...new GenerateSurfaceColors(options).generate(),
    ...generateContentColors(options),
  };
}

/**
 * Generates all semantic colors.
 *
 * Semantic colors are intended to be used for buttons, highlights text, strong backgrounds, etc.
 *
 * Semantic colors are all colors with the following format: `--color-<semanticColorName>-<semanticColorSteps>`.
 * E.g. `--color-primary`, `--color-secondary-light`, `--color-tertiary-dark`, etc.
 *
 * `semanticColorName` includes all semantic colors included in `semanticColorMapping`.
 * These are e.g. `primary`, `secondary`, `info`, etc.
 *
 * `semanticColorStep` are defined in the constant variable `SEMANTIC_COLOR_STEPS`.
 *
 * @example
 * Given the semantic color mapping `primary` and `secondary` the result would look like this:
 *
 * ```json
 * {
 *   "primary": "var(--color-primary-600)",
 *   "primary-light": "var(--color-primary-500)",
 *   "primary-dark": "var(--color-primary-700)",
 *   "secondary": "var(--color-secondary-600)",
 *   "secondary-light": "var(--color-secondary-500)",
 *   "secondary-dark": "var(--color-secondary-700)"
 * }
 * ```
 *
 * @see SEMANTIC_COLOR_STEPS
 * @param options a reference to the options object.
 * @returns the generated semantic colors.
 */
function generateSemanticColors(options: TailwindCssSemanticColorsOptions): Colors {
  const SEMANTIC_COLOR_STEPS = { '': 600, '-light': 500, '-dark': 700 };

  const result: Colors = {};

  const colors = Object.keys(options.get('semanticColors'));

  // Generate cross product between colors and color steps.
  for (const color of colors) {
    for (const [sourceStep, targetStep] of Object.entries(SEMANTIC_COLOR_STEPS)) {
      result[`--color-${color}${sourceStep}`] = `var(--color-${color}-${targetStep})`;
    }
  }

  return result;
}

/**
 * Generates all content colors.
 *
 * Content colors are intended to be used for text.
 * Text comes in three different emphasis-levels: muted, default, and emphasis.
 *
 * Content colors are all colors with the following format `--<contentColorName>-<contentStep>.
 *
 * `contentColorName` includes all content colors included in `contentColorMapping`.
 * These are e.g. `content`.
 *
 * `contentStep` are defined in the constant variable `CONTENT_STEPS`.
 *
 * @example
 * Given the content color mapping `content` the result would look like this:
 *
 * ```json
 * {
 *   "content": "var(--color-content-900)",
 *   "content-muted": "var(--color-content-800)",
 *   "content-emphasis": "var(--color-black)",
 * }
 * ```
 *
 * @see CONTENT_STEPS
 * @param options a reference to the options object.
 * @returns the generated content colors.
 */
function generateContentColors(options: TailwindCssSemanticColorsOptions): Colors {
  const CONTENT_STEPS = { '': 900, '-muted': 800, '-emphasis': 'black' };

  const result: Colors = {};

  const colors = Object.keys(options.get('contentColors'));

  // Generate cross product between semantic colors and color steps.
  for (const color of colors) {
    for (const [sourceStep, targetStep] of Object.entries(CONTENT_STEPS)) {
      const value =
        typeof targetStep === 'string' ? `var(--color-${targetStep})` : `var(--color-${color}-${targetStep})`;
      result[`--color-${color}${sourceStep}`] = value;
    }
  }

  return result;
}
