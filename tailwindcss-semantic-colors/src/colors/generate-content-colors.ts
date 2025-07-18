import { COLOR_TYPE_CONTENT, ColorType } from '../options.ts';
import { ColorMapping, GenerateColors } from './abstract-generate-colors.ts';

interface ContentColorMapping extends ColorMapping {
  leftSide: string;
  rightSide: string | number;
}

export class GenerateContentColors extends GenerateColors<ContentColorMapping> {
  protected get mapping(): ContentColorMapping[] {
    return [
      { leftSide: '', rightSide: 900 },
      { leftSide: '-muted', rightSide: 800 },
      { leftSide: '-emphasis', rightSide: 'var(--color-black)' },
    ];
  }

  protected get colorTypes(): ColorType[] {
    return [COLOR_TYPE_CONTENT];
  }

  protected generateCssColorVarname(_colorType: ColorType, colorVarname: string, step: ContentColorMapping): string {
    return `--color-${colorVarname}${step.leftSide}`;
  }

  protected generateCssColorValue(
    _colorType: ColorType,
    colorVarname: string,
    _colorValues: string[],
    step: ContentColorMapping,
  ): string {
    if (typeof step.rightSide === 'string') {
      return step.rightSide;
    } else {
      return `var(--color-${colorVarname}-${step.rightSide})`;
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
