import { TailwindcssSemanticPaletteOptions } from '../tailwindcss-semantic-palette-options.ts';
import { Palette } from '@src/palette/palette.ts';
import { TAILWIND_COLORS_SHADES } from '@src/tailwindcss-color-shades.ts';

/**
 * Generates all palette.
 *
 * @param options a reference to the options object.
 * @returns the generated palette.
 */
export function generatePalette(options: TailwindcssSemanticPaletteOptions): Palette {
  const palette = new Palette();

  const paletteEntries = Object.entries(options.get('semanticPalette'));
  for (const [semanticColorName, colorValues] of paletteEntries) {
    if (colorValues.length !== TAILWIND_COLORS_SHADES.length) {
      throw new Error(
        `The number of color values for semantic color "${semanticColorName}" (${colorValues.length}) does not match the number of Tailwind color shades (${TAILWIND_COLORS_SHADES.length}).`,
      );
    }

    // TAILWIND_COLORS_SHADES.length === colorValues.length
    for (let i = 0; i < TAILWIND_COLORS_SHADES.length; i++) {
      const tailwindShade = TAILWIND_COLORS_SHADES[i]!;
      palette.addColor({
        name: semanticColorName,
        shade: tailwindShade,
        value: colorValues[i]!,
      });
    }
  }

  return palette;
}
