import plugin from 'tailwindcss/plugin';
import type { PluginCreator } from 'tailwindcss/plugin';

import { TailwindCssSemanticColorPlugin } from '@src/tailwindcss-semantic-colors.ts';

const tailwindcssSemanticColorsPlugin: PluginCreator = plugin.withOptions(
  (options) => {
    return ({ addBase }) => {
      const parsedOptions = new TailwindCssSemanticColorPlugin(options);

      const base: Record<string, string> = {};

      for (const [colorName, color] of Object.entries(parsedOptions.colors())) {
        base[colorName] = color;
      }

      addBase({
        ':root': base,
      });
    };
  },

  (options) => {
    const parsedOptions = new TailwindCssSemanticColorPlugin(options);

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
