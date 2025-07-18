import { TailwindCssSemanticColorsOptions } from '../options.ts';
import { GenerateSemanticColors } from './generate-semantic-colors.ts';
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
    ...new GenerateSemanticColors(options).generate(),
    ...new GenerateSurfaceColors(options).generate(),
    ...generateContentColors(options),
  };
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
