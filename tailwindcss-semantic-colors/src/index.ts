import plugin from 'tailwindcss/plugin';
import type { PluginCreator } from 'tailwindcss/plugin';

import { TailwindCssSemanticColorPlugin } from '@src/tailwindcss-semantic-colors.ts';

const tailwindcssSemanticColorsPlugin: PluginCreator = plugin.withOptions(
  (options) => {
    return ({ addBase, addUtilities, theme }) => {
      const parsedOptions = new TailwindCssSemanticColorPlugin(options, theme);

      const base: Record<string, string> = {};

      for (const [colorName, color] of Object.entries(parsedOptions.colors())) {
        base[`--color-${colorName}`] = color;
      }

      addBase({
        ':root': base,
      });
    };
  },

  (options) => {
    const parsedOptions = new TailwindCssSemanticColorPlugin(options, () => null);

    return {
      theme: {
        extend: {
          colors: parsedOptions.colors(),
        },
      },
    };
  },
);

export default tailwindcssSemanticColorsPlugin;
