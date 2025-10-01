import { TailwindCssSemanticColorsOptions } from '../options.ts';
import { Colors } from '@src/colors/color-type.js';

/**
 * Generates all colors.
 *
 * @param options a reference to the options object.
 * @returns the generated colors.
 */
export function generateColors(options: TailwindCssSemanticColorsOptions): Colors {
  console.log(options);
  return {};
}
