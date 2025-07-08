import plugin from 'tailwindcss/plugin';
import { TailwindCssSemanticColorPlugin } from './tailwindcss-semantic-color';

export default plugin.withOptions(
  (options) => {
    console.log(options);
    const parsedOptions = new TailwindCssSemanticColorPlugin(options);

    return ({ addBase, addUtilities }) => {
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
    console.log(options);

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
