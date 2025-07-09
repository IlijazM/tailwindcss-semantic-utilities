import { DEFAULT_COLORS } from './consts';
import { generateColors } from './generate-colors';
import { Options } from './options';

export type TailwindCssTheme = (path: string, defaultValue?: any) => any;

export const BASE_COLORS = ['base', 'surface', 'content'];

export class TailwindCssSemanticColorPlugin {
  private readonly options: Options;

  constructor(options: unknown, private theme: TailwindCssTheme) {
    this.options = new Options(options);
  }

  colors() {
    return generateColors(
      Object.fromEntries(this.options.colors.map((color) => [color, DEFAULT_COLORS[color] ?? 'neutral'])),
    );
  }
}
