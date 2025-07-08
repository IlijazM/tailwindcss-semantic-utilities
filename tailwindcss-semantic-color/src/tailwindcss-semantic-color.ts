import { DEFAULT_COLORS } from './consts';
import { generateColors } from './generate-colors';
import { Options } from './options';

export class TailwindCssSemanticColorPlugin {
  private readonly options: Options;

  constructor(options: unknown) {
    this.options = new Options(options);
  }

  colors() {
    return generateColors(Object.fromEntries(this.options.colors.map((color) => [color, DEFAULT_COLORS[color] ?? 'neutral'])));
  }
}
