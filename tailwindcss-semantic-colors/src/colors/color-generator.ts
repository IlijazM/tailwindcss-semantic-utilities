import { ColorType, TailwindCssSemanticColorsOptions } from '@src/options.ts';

export type ColorValue = string;
export type Colors = { [colorName: ColorValue]: ColorValue };

/**
 * An abstract class for generating a cross product of colors and color variants while respecting theme overrides.
 *
 * ## Color variants
 *
 * Color variants are a list of variants that map to a specific color. As an example,
 * let's assume the variants "default", "muted", and "emphasis" for text colors and their respected mappings:
 *
 * ```
 * default  -> color-content-900
 * muted    -> color-content-800
 * emphasis -> color-black
 * ```
 *
 * ## Theme overrides
 */
export abstract class ColorGenerator {
  static readonly THEME_PREFIX = `--theme`;

  /**
   * A readonly reference to the options object.
   */
  protected get options() {
    return this._options;
  }

  constructor(private _options: TailwindCssSemanticColorsOptions) {}

  /**
   * Entrypoint for generating all colors.
   *
   * Iterates over all color type and generates the respected color for that type.
   *
   * @returns all colors.
   */
  public generate(): Colors {
    return Object.assign({}, ...this.colorTypes.map((colorType) => this.generateFromColorType(colorType)));
  }

  /**
   * @see ColorType
   * @returns all color types.
   */
  protected abstract get colorTypes(): ColorType[];

  /**
   * @returns a list of all color variants.
   */
  protected abstract get colorVariants(): string[];

  /**
   * Iterates over all colors in a color type and outputs the generated css rules.
   *
   * @param colorType the color type
   * @returns the generated css rules.
   */
  private generateFromColorType(colorType: ColorType): Colors {
    const colors = this.options.get(colorType);
    return Object.assign(
      {},
      ...Object.entries(colors).map(([colorVarname, _]) => this.generateCssVariablesFromColor(colorType, colorVarname)),
    );
  }

  private get themeOverrides() {
    return this.options.getThemeOverridesFor(this.colorTypes);
  }

  /**
   * Generates css variables from the inputted colorVarname and colorValues.
   *
   * Iterates over all color variants and delegates the generation for the css variable.
   *
   * @param colorType the type of the color.
   * @param colorVarname the name of the css color variable.
   * @returns the generated css variables.
   */
  private generateCssVariablesFromColor(colorType: ColorType, colorVarname: string): Colors {
    return Object.assign(
      {},
      ...this.colorVariants.map((colorVariant) =>
        this.generateCssVariablesFromColorAndColorVariant(colorType, colorVarname, colorVariant),
      ),
    );
  }

  private generateCssVariablesFromColorAndColorVariant(
    colorType: ColorType,
    colorVarname: string,
    colorVariant: string,
  ) {
    // TODO: check for color variant in theme overrides too
    if (this.themeOverrides.includes(colorVarname)) {
      return Object.assign({}, this.generateThemeCssColorVariables(colorType, colorVarname, colorVariant));
    } else {
      return Object.assign({}, this.generateUnthemedCssColorVariable(colorType, colorVarname, colorVariant));
    }
  }

  /**
   * Generates all css theme variables for each theme as well was the color variable.
   *
   * This method should only be called if there is a
   *
   * @see ColorGenerator#generateThemeOverridesOfCssColorVariable
   * @see ColorGenerator#generateThemedCssColorVariable
   * @param colorType the type of the color.
   * @param colorVarname the name of the css color variable.
   * @param step the tailwindcss step value that is in between 90 and 950.
   * @returns the generated theme and color variables.
   */
  private generateThemeCssColorVariables(colorType: ColorType, colorVarname: string, step: CM): Colors {
    return Object.assign(
      {},
      this.generateThemeOverridesOfCssColorVariable(colorType, colorVarname, step),
      this.generateThemedCssColorVariable(colorType, colorVarname, step),
    );
  }

  /**
   * Generates all css theme variables for each theme.
   *
   * For that it checks if there is a theme override defined in the options and if not default to the default theme.
   *
   * The generated theme variables will have the following format: `--theme-{theme}-color-{colorVarname}-{step}`.
   *
   * @example This example demonstrates
   *
   * ```ts
   * this.generateThemeOverridesOfCssColorVariable(
   *   SEMANTIC_COLORS_KEY,
   *   "primary",
   *   ["var(--color-indigo-50)", "var(--color-indigo-100)", ..., "var(--color-indigo-950)"],
   *   TAILWINDCSS_STEP_200,
   * );
   * ```
   *
   * Assuming that the themes configured are "light" and "dark", this yields the following results:
   *
   * ```json
   * {
   *   "--theme-light-color-primary-200": "var(--color-indigo-200)",
   *   "--theme-dark-color-primary-200": "var(--color-indigo-200)"
   * }
   * ```
   *
   * @param colorType the type of the color.
   * @param colorVarname the name of the css color variable.
   * @param step the tailwindcss step value that is in between 90 and 950.
   * @returns the generated theme variables.
   */
  protected generateThemeOverridesOfCssColorVariable(colorType: ColorType, colorVarname: string, step: CM): Colors {
    return Object.assign(
      {},
      ...this.options.themes.map((theme) => ({
        [`${ColorGenerator.THEME_PREFIX}-${theme}${this.generateCssColorVarname(colorType, colorVarname, step)}`]:
          this.generateThemedCssColorValue(colorType, colorVarname, step, theme) ??
          this.generateCssColorValue(colorType, colorVarname, colorValues, step),
      })),
    );
  }

  protected abstract generateThemedCssColorValue(
    _colorType: ColorType,
    _colorVarname: string,
    _step: CM,
    _theme: string,
  ): string | undefined;

  /**
   * Generates a themed css color variable.
   *
   * The generated color variable will have the following format: `--color-{colorVarname}-{step}`
   *
   * @example The following example demonstrates a typical use case.
   *
   * ```ts
   * this.generateUnthemedColor(`primary`, TAILWINDCSS_STEP_200);
   * ```
   *
   * Assuming that the default theme is set to `light`, this yields the following result:
   *
   * ```json
   * {
   *   "--color-primary-50": "var(--theme-light-primary-50)"
   * }
   * ```
   *
   * @see GenerateUtilityColors#generateUnthemedCssColorVariable
   * @param colorVarname the name of the css color variable.
   * @param step the tailwindcss step value that is in between 90 and 950.
   * @returns the generated color variable.
   */
  protected generateThemedCssColorVariable(colorType: string, colorVarname: string, step: CM): Colors {
    const cssColorVarname = this.generateCssColorVarname(colorType, colorVarname, step);
    return { [cssColorVarname]: `var({${ColorGenerator.THEME_PREFIX}${cssColorVarname}})` };
  }

  /**
   * Generates an unthemed css color variable.
   *
   * The opposite of an unthemed variable is a themed one.
   * The difference between a themed and an unthemed variable is
   * that the themed color variable's color is set via a proxy theme variable that hold the color value.
   * Unthemed color variable's set the color directly.
   *
   * A themed variable looks like this example:
   *
   * ```css
   * --color-primary-50: var(--theme-light-color-primary-50);
   * ```
   *
   * An unthemed variable looks like this example:
   *
   * ```css
   * --color-primary-50: var(--color-indigo-50);
   * ```
   *
   * The generated color variable will have the following format: `--color-{colorVarname}-{step}`
   *
   * @example The following example demonstrates a typical use case.
   *
   * ```ts
   * this.generateUnthemedColor(`primary`, ["var(--color-indigo-50)", "var(--color-indigo-100)", ..., "var(--color-indigo-950)"], TAILWINDCSS_STEP_200);
   * ```
   *
   * This yields the following result:
   *
   * ```json
   * {
   *   "--color-primary-50": "var(--color-indigo-100)"
   * }
   * ```
   *
   * @see GenerateUtilityColors#generateThemedCssColorVariable
   * @param colorVarname the name of the css color variable.
   * @param colorVariant the tailwindcss step value that is in between 90 and 950.
   * @returns the generated color.
   */
  private generateUnthemedCssColorVariable(colorType: string, colorVarname: string, colorVariant: string): Colors {
    return {
      [this.generateCssColorVarname({ colorType, colorVarname, colorVariant })]: this.generateCssColorValue({
        colorType,
        colorVarname,
        colorVariant,
      }),
    };
  }

  /**
   * Generates a css color varname given the color type, color varname, and color variant.
   *
   * @param _arg0 contains the color type, color varname, and color variant.
   * @returns the generated css color varname.
   */
  protected abstract generateCssColorVarname(_arg0: {
    colorType: string;
    colorVarname: string;
    colorVariant: string;
  }): string;

  /**
   * Generates a css color value given the color type, color varname, and color variant.
   *
   * @param _arg0 contains the color type, color varname, and color variant.
   * @returns the generated css color value.
   */
  protected abstract generateCssColorValue(_arg0: {
    colorType: string;
    colorVarname: string;
    colorVariant: string;
  }): string;
}
