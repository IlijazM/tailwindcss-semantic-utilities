import { TailwindCssSemanticColorsOptions } from '../options.ts';
import { ColorGenerator } from './color-generator.ts';
import { GenerateContentColors } from './generate-content-colors.ts';
import { GenerateSemanticColors } from './generate-semantic-colors.ts';
import { GenerateSurfaceColors } from './generate-surface-colors.ts';
import { GenerateUtilityColors } from './generate-utility-colors.ts';

export type ColorValue = string;
export type Colors = { [colorName: ColorValue]: ColorValue };

const colorsGenerators: ((_: TailwindCssSemanticColorsOptions) => ColorGenerator<any>)[] = [
  (options) => new GenerateUtilityColors(options),
  (options) => new GenerateSemanticColors(options),
  (options) => new GenerateSurfaceColors(options),
  (options) => new GenerateContentColors(options),
];

/**
 * Generates all colors.
 *
 * @param options a reference to the options object.
 * @returns the generated colors.
 */
export function generateColors(options: TailwindCssSemanticColorsOptions): Colors {
  return Object.assign({} as Colors, ...colorsGenerators.map((colorGenerator) => colorGenerator(options).generate()));
}
