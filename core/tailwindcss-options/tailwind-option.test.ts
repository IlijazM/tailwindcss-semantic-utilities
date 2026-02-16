import { TailwindOptionsWrapper } from './tailwind-options-wrapper';
import { TailwindOption } from './tailwind-option';

describe('TailwindOption', () => {
  it('should override the default options even if the types mismatch', () => {
    const defaultOptions = { foo: new TailwindOption('Hello, world!') };

    const tailwindOptions = new TailwindOptionsWrapper({
      options: { foo: 10 },
      defaultOptions,
    });

    expect(Object.keys(tailwindOptions.getAll()).length).toBe(1);
    expect(tailwindOptions.get('foo')).toStrictEqual(10);
  });
});
