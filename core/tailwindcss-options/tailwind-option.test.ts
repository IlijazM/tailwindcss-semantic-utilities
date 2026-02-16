import { TailwindOptionsWrapper } from './tailwind-options-wrapper';
import { TailwindOption } from './tailwind-option';

describe('TailwindOption', () => {
  it('should keep the default options if no options are provided', () => {
    const tailwindOptions = new TailwindOptionsWrapper({
      options: {},
      defaultOptions: { foo: new TailwindOption('Hello, world!') },
    });

    expect(Object.keys(tailwindOptions.getAll()).length).toBe(1);
    expect(tailwindOptions.get('foo')).toStrictEqual('Hello, world!');
  });

  it('should override the default option if the respected option is provided', () => {
    const defaultOptions = { foo: new TailwindOption('Hello, world!') };

    const tailwindOptions = new TailwindOptionsWrapper({
      options: { foo: 'bar' },
      defaultOptions,
    });

    expect(Object.keys(tailwindOptions.getAll()).length).toBe(1);
    expect(tailwindOptions.get('foo')).toStrictEqual('bar');
  });

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
