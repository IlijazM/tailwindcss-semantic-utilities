export type ColorValue = string;
export type Colors = { [colorName: ColorValue]: ColorValue };

const COLOR_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

export function generateColors(primitiveColorMapping: Record<string, string>): Colors {
  return Object.fromEntries(
    Object.keys(primitiveColorMapping).flatMap((primitiveColor) =>
      COLOR_STEPS.map((colorStep) => [`${primitiveColor}-${colorStep}`, `var(--color-${primitiveColorMapping[primitiveColor]}-${colorStep})`]),
    ),
  );
}
