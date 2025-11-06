import { TailwindCssSemanticColorsOptions } from '../tailwindcss-semantic-colors-options.ts';
import { Colors } from '@src/colors/colors.ts';
import { TAILWIND_COLORS_SHADES } from '@src/tailwindcss-color-shades.ts';

/**
 * Generates all palette.
 *
 * @param options a reference to the options object.
 * @returns the generated palette.
 */
export function generateColors(options: TailwindCssSemanticColorsOptions): Colors {
  const colors = new Colors();

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
      colors.addColor({
        name: semanticColorName,
        shade: tailwindShade,
        value: colorValues[i]!,
      });
    }
  }

  return colors;
}
