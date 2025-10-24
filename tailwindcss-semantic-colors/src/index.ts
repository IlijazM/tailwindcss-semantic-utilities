import plugin from 'tailwindcss/plugin';
import type { PluginCreator } from 'tailwindcss/plugin';

import { TailwindCssSemanticColorPlugin } from '@src/tailwindcss-semantic-colors.ts';

const tailwindcssSemanticColorsPlugin: PluginCreator = plugin.withOptions(
  (options) => {
    return ({ addBase }) => {
      const plugin = new TailwindCssSemanticColorPlugin(options);

      addBase({
        ':root': plugin.colors.cssDeclarations,
      });
    };
  },

  (options) => {
    const plugin = new TailwindCssSemanticColorPlugin(options);

    return {
      theme: {
        extend: {
          colors: plugin.colors.themeExtension,
        },
      },
    };
  },
);

export default tailwindcssSemanticColorsPlugin;
