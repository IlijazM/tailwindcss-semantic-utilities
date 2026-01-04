import plugin from 'tailwindcss/plugin';
import type { PluginCreator } from 'tailwindcss/plugin';

import { TailwindCssSemanticTypographyPlugin } from '@src/tailwindcss-semantic-typography.ts';

const tailwindcssSemanticTypographyPlugin: PluginCreator = plugin.withOptions(
  (options) => {
    return ({ addUtilities }) => {
      const plugin = new TailwindCssSemanticTypographyPlugin(options);

      addUtilities(plugin.cssDeclarations);
    };
  },

  (options) => {
    const plugin = new TailwindCssSemanticTypographyPlugin(options);

    return {
      theme: {
        extend: {
          colors: plugin.themeExtension,
        },
      },
    };
  },
);

export default tailwindcssSemanticTypographyPlugin;
