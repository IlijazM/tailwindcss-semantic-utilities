import plugin from 'tailwindcss/plugin';
import { TailwindCssSemanticColorPlugin } from './tailwindcss-semantic-colors';

export default plugin.withOptions(
  (options) => {
    return ({ addBase, addUtilities, theme }) => {
      const parsedOptions = new TailwindCssSemanticColorPlugin(options, theme);

      const base = {};

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
