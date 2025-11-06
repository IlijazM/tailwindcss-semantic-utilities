import plugin from 'tailwindcss/plugin';
import type { PluginCreator } from 'tailwindcss/plugin';

import { TailwindCssSemanticPalettePlugin } from '@src/tailwindcss-semantic-palette.ts';

const tailwindcssSemanticPalettePlugin: PluginCreator = plugin.withOptions(
  (options) => {
    return ({ addBase }) => {
      const plugin = new TailwindCssSemanticPalettePlugin(options);

      addBase({
        ':root': plugin.palette.cssDeclarations,
      });
    };
  },

  (options) => {
    const plugin = new TailwindCssSemanticPalettePlugin(options);

    return {
      theme: {
        extend: {
          colors: plugin.palette.themeExtension,
        },
      },
    };
  },
);

export default tailwindcssSemanticPalettePlugin;
