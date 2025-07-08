export type ColorValue = string;
export type Colors = { [colorName: ColorValue]: ColorValue };

export function generateColors(primitiveColorMapping: Record<string, string>, colorSteps: number[]): Colors {
  return Object.fromEntries(
    Object.keys(primitiveColorMapping).flatMap((primitiveColor) =>
      colorSteps.map((colorStep) => [`${primitiveColor}-${colorStep}`, `var(--color-${primitiveColorMapping[primitiveColor]}-${colorStep})`]),
    ),
  );
}
