import { generateColors } from '@/src/colors/generate-colors.ts';
import { TailwindCssSemanticColorsOptions } from './tailwindcss-semantic-colors-options.ts';
import { Colors } from '@src/colors/colors.js';

export class TailwindCssSemanticColorPlugin {
  private readonly options: TailwindCssSemanticColorsOptions;

  /**
   * Cached colors instance.
   *
   * @private
   */
  private _colors: Colors | null = null;

  public get colors() {
    if (this._colors === null) {
      return generateColors(this.options);
    }
    return this._colors!;
  }

  constructor(options: unknown) {
    this.options = new TailwindCssSemanticColorsOptions(options);
  }
}
