import { generatePalette } from '@src/palette/generate-palette.ts';
import { TailwindcssSemanticPaletteOptions } from './options/tailwindcss-semantic-palette-options.ts';
import { Palette } from '@src/palette/palette.js';

export class TailwindCssSemanticPalettePlugin {
  private readonly options: TailwindcssSemanticPaletteOptions;

  /**
   * Cached palette instance.
   *
   * @private
   */
  private _palette: Palette | null = null;

  public get palette() {
    if (this._palette === null) {
      return generatePalette(this.options);
    }
    return this._palette!;
  }

  constructor(options: unknown) {
    this.options = new TailwindcssSemanticPaletteOptions(options);
  }
}
