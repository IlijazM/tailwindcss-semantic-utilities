import { TailwindCssSemanticColorsOptions } from '../tailwindcss-semantic-colors-options.ts';
import { Color } from '@src/colors/color-type.ts';
import { TAILWIND_COLORS_SHADES } from '@src/common.ts';

/**
 * Generates all colors.
 *
 * @param options a reference to the options object.
 * @returns the generated colors.
 */
export function generateColors(options: TailwindCssSemanticColorsOptions): Color[] {
  const colors: Color[] = [];

  const colorEntries = Object.entries(options.get('semanticColors'));
  for (const [semanticColorName, colorValues] of colorEntries) {
    if (colorValues.length !== TAILWIND_COLORS_SHADES.length) {
      throw new Error(
        `The number of color values for semantic color "${semanticColorName}" (${colorValues.length}) does not match the number of Tailwind color shades (${TAILWIND_COLORS_SHADES.length}).`,
      );
    }

    // TAILWIND_COLORS_SHADES.length === colorValues.length
    for (let i = 0; i < TAILWIND_COLORS_SHADES.length; i++) {
      const tailwindShade = TAILWIND_COLORS_SHADES[i]!;
      colors.push(new Color(semanticColorName, tailwindShade, colorValues[i]!));
    }
  }

  return colors;
}
