import { TailwindOptionsWrapper } from './tailwind-options-wrapper';
import { TypeSafeTailwindOption } from './type-safe-tailwind-option';

describe('TypeSafeTailwindOption', () => {
  it('should not override the default options if types mismatch and strongly typed options are used', () => {
    const defaultOptions = { foo: new TypeSafeTailwindOption('Hello, world!') };

    const tailwindOptions = new TailwindOptionsWrapper({
      options: { foo: 10 },
      defaultOptions,
    });

    expect(Object.keys(tailwindOptions.getAll()).length).toBe(1);
    expect(tailwindOptions.get('foo')).toStrictEqual('Hello, world!');
  });
});
