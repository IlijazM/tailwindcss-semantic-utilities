import { TailwindColorShade } from '@src/common.ts';

export class Color {
  constructor(
    public readonly colorName: string,
    public readonly shade: TailwindColorShade,
    public readonly colorValue: string,
  ) {}
}
