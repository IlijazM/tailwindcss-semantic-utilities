import { ColorType, TailwindCssSemanticColorsOptions } from '@src/options.ts';

export type ColorValue = string;
export type Colors = { [colorName: ColorValue]: ColorValue };

export interface ColorMapping {
  leftSide: string | number;
  rightSide: string | number;
}

export abstract class GenerateColors<CM extends ColorMapping> {
  static readonly THEME_PREFIX = `--theme`;

  protected options: TailwindCssSemanticColorsOptions;

  constructor(options: TailwindCssSemanticColorsOptions) {
    this.options = options;
  }

  protected abstract get mapping(): CM[];

  /**
   * Generates all colors.
   *
   * @returns all colors.
   */
  generate(): Colors {
    return Object.assign({}, ...this.colorTypes.map((colorType) => this.generateFromColorType(colorType)));
  }

  private get themeOverrides() {
    return this.options.getThemeOverridesFor(this.colorTypes);
  }

  protected abstract get colorTypes(): ColorType[];

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
      ...Object.entries(colors).map(([colorVarname, colorValues]) =>
        this.generateCssVariablesFromColor(colorType, colorVarname, colorValues),
      ),
    );
  }

  /**
   * Generates css variables from the inputted colorVarname and colorValues.
   *
   * Decides if theme variables must be generated based on if there are themeOverrides for the given color.
   *
   * Also iterates over the tailwindcss color steps which range from 90 to 950.
   *
   * @param colorType the type of the color.
   * @param colorVarname the name of the css color variable.
   * @param colorValues the values of the color variable in shades from 90 to 950.
   * @returns the generated css variables.
   */
  private generateCssVariablesFromColor(colorType: ColorType, colorVarname: string, colorValues: string[]): Colors {
    if (this.themeOverrides.includes(colorVarname)) {
      return Object.assign(
        {},
        ...this.mapping.map((step) => this.generateThemeCssColorVariables(colorType, colorVarname, colorValues, step)),
      );
    } else {
      return Object.assign(
        {},
        ...this.mapping.map((step) =>
          this.generateUnthemedCssColorVariable(colorType, colorVarname, colorValues, step),
        ),
      );
    }
  }

  /**
   * Generates all css theme variables for each theme as well was the color variable.
   *
   * This method should only be called if there is a
   *
   * @see GenerateColors#generateThemeOverridesOfCssColorVariable
   * @see GenerateColors#generateThemedCssColorVariable
   * @param colorType the type of the color.
   * @param colorVarname the name of the css color variable.
   * @param colorValues the values of the color variable in shades from 90 to 950.
   * @param step the tailwindcss step value that is in between 90 and 950.
   * @returns the generated theme and color variables.
   */
  private generateThemeCssColorVariables(
    colorType: ColorType,
    colorVarname: string,
    colorValues: string[],
    step: CM,
  ): Colors {
    return Object.assign(
      {},
      this.generateThemeOverridesOfCssColorVariable(colorType, colorVarname, colorValues, step),
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
   * @param colorValues the values of the color variable in shades from 90 to 950.
   * @param step the tailwindcss step value that is in between 90 and 950.
   * @returns the generated theme variables.
   */
  protected generateThemeOverridesOfCssColorVariable(
    colorType: ColorType,
    colorVarname: string,
    colorValues: string[],
    step: CM,
  ): Colors {
    return Object.assign(
      {},
      ...this.options.themes.map((theme) => ({
        [`${GenerateColors.THEME_PREFIX}-${theme}${this.generateCssColorVarname(colorType, colorVarname, step)}`]:
          this.generateThemedCssColorValue(colorType, colorVarname, colorValues, step, theme) ??
          this.generateCssColorValue(colorType, colorVarname, colorValues, step),
      })),
    );
  }

  protected abstract generateThemedCssColorValue(
    _colorType: ColorType,
    _colorVarname: string,
    _colorValues: string[],
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
    return { [cssColorVarname]: `var({${GenerateColors.THEME_PREFIX}${cssColorVarname}})` };
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
   * @param colorValues the values of the color variable in shades from 90 to 950.
   * @param step the tailwindcss step value that is in between 90 and 950.
   * @returns the generated color.
   */
  private generateUnthemedCssColorVariable(
    colorType: string,
    colorVarname: string,
    colorValues: string[],
    step: CM,
  ): Colors {
    return {
      [this.generateCssColorVarname(colorType, colorVarname, step)]: this.generateCssColorValue(
        colorType,
        colorVarname,
        colorValues,
        step,
      ),
    };
  }

  protected abstract generateCssColorVarname(_colorType: string, _colorVarname: string, _step: CM): string;

  protected abstract generateCssColorValue(
    _colorType: string,
    _colorVarname: string,
    _colorValues: string[],
    _step: CM,
  ): string;
}
