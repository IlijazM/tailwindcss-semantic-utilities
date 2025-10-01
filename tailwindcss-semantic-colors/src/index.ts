import plugin from 'tailwindcss/plugin';
import type { PluginCreator } from 'tailwindcss/plugin';

import { TailwindCssSemanticColorPlugin } from '@src/tailwindcss-semantic-colors.ts';

const tailwindcssSemanticColorsPlugin: PluginCreator = plugin.withOptions(
  (options) => {
    return ({ addBase }) => {
      const plugin = new TailwindCssSemanticColorPlugin(options);

      const base: Record<string, string> = {};

      for (const [colorName, color] of Object.entries(plugin.colors())) {
        base[colorName] = color;
      }

      addBase({
        ':root': base,
      });
    };
  },

  (options) => {
    const plugin = new TailwindCssSemanticColorPlugin(options);

    return {
      theme: {
        extend: {
          colors: plugin.colors(),
        },
      },
    };
  },
);

export default tailwindcssSemanticColorsPlugin;
