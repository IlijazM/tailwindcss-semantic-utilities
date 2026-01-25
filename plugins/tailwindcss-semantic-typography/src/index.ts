import plugin from 'tailwindcss/plugin';
import type { PluginCreator } from 'tailwindcss/plugin';

import { TailwindCssSemanticTypographyPlugin } from '@src/tailwindcss-semantic-typography.ts';

const tailwindcssSemanticTypographyPlugin: PluginCreator = plugin.withOptions(
  (options) => {
    return ({ addBase, addUtilities }) => {
      const plugin = new TailwindCssSemanticTypographyPlugin(options);

      addBase(plugin.base)
      addUtilities(plugin.utilities);
    };
  },

  (options) => {
    const plugin = new TailwindCssSemanticTypographyPlugin(options);

    return {
      theme: {
        extend: {
          ...plugin.themeExtension,
        },
      },
    };
  },
);

export default tailwindcssSemanticTypographyPlugin;
