import { COLOR_TYPE_CONTENT, ColorType } from '../options.ts';
import { ColorGenerator } from './color-generator.ts';

export class GenerateContentColors extends ColorGenerator {
  protected get colorVariants(): ContentColorMapping[] {
    return [
      { variant: '', mapping: 900 },
      { variant: '-muted', mapping: 800 },
      { variant: '-emphasis', mapping: 'var(--color-black)' },
    ];
  }

  protected get colorTypes(): ColorType[] {
    return [COLOR_TYPE_CONTENT];
  }

  protected generateCssColorVarname(_colorType: ColorType, colorVarname: string, step: ContentColorMapping): string {
    return `--color-${colorVarname}${step.variant}`;
  }

  protected generateCssColorValue(
    _colorType: ColorType,
    colorVarname: string,
    _colorValues: string[],
    step: ContentColorMapping,
  ): string {
    if (typeof step.mapping === 'string') {
      return step.mapping;
    } else {
      return `var(--color-${colorVarname}-${step.mapping})`;
    }
  }

  protected generateThemedCssColorValue(
    _colorType: ColorType,
    _colorVarname: string,
    _colorValues: string[],
    _step: ContentColorMapping,
    _theme: string,
  ): string | undefined {
    return undefined;
  }
}
