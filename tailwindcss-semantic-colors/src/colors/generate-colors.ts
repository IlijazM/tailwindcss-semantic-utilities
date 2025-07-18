import { TailwindCssSemanticColorsOptions } from '../options.ts';
import { GenerateContentColors } from './generate-content-colors.ts';
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
    ...new GenerateContentColors(options).generate(),
  };
}
