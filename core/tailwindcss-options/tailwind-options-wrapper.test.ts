import { TailwindOptionsWrapper } from './tailwind-options-wrapper';
import { TailwindOption } from './tailwind-option';

describe('TailwindOptionsWrapper', () => {
  it('should return nothing with empty options and empty default options', () => {
    const options = {};
    const defaultOptions = {};

    const tailwindOptions = new TailwindOptionsWrapper({
      options,
      defaultOptions,
    }).getAll();

    expect(tailwindOptions).toStrictEqual(defaultOptions);
  });

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

  it('should still work with single quoted keys in the options', () => {
    const defaultOptions = { foo: new TailwindOption('Hello, world!') };

    const tailwindOptions = new TailwindOptionsWrapper({
      options: { "'foo'": 'bar' },
      defaultOptions,
    });

    expect(Object.keys(tailwindOptions.getAll()).length).toBe(1);
    expect(tailwindOptions.get('foo')).toStrictEqual('bar');
  });

  it('should still work with double quoted keys in the options', () => {
    const defaultOptions = { foo: new TailwindOption('Hello, world!') };

    const tailwindOptions = new TailwindOptionsWrapper({
      options: { '"foo"': 'bar' },
      defaultOptions,
    });

    expect(Object.keys(tailwindOptions.getAll()).length).toBe(1);
    expect(tailwindOptions.get('foo')).toStrictEqual('bar');
  });

});
