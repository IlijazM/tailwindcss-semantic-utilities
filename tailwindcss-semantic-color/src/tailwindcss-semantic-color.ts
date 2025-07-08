import plugin from 'tailwindcss/plugin';
import { colors } from './colors';

export default plugin.withOptions(
  (options) => {
    return ({ addBase, addUtilities }) => {
      const base = {};

      for (const [colorName, color] of Object.entries(colors)) {
        base[`--color-${colorName}`] = color;
      }

      addBase({
        ':root': base,
      });
    };
  },
  () => ({
    theme: {
      extend: {
        colors,
      },
    },
  }),
);
