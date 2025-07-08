export const colorSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

let _primitiveColors: string[] = ['base', 'surface', 'content', 'brand', 'primary', 'secondary', 'tertiary', 'accent', 'info', 'success', 'warning', 'danger'];
export const primitiveColors = {
  get() {
    return _primitiveColors;
  },
  set(value) {
    _primitiveColors = value;
  },
};

export const defaultPrimitiveColorMapping = {
  base: 'gray',
  surface: 'slate',
  content: 'neutral',
  brand: 'blue',
  primary: 'indigo',
  secondary: 'pink',
  tertiary: 'lime',
  accent: 'teal',
  info: 'cyan',
  success: 'green',
  warning: 'amber',
  danger: 'red',
};
