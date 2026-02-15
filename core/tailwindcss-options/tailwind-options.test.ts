import { TailwindOption, TailwindOptionsWrapper, TypeSafeTailwindOption, SelectableObjectTailwindOption } from './tailwind-options-wrapper';

describe("TailwindcssOptions", () => {
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

  it('should override the default options even if the types mismatch', () => {
    const defaultOptions = { foo: new TailwindOption('Hello, world!') };

    const tailwindOptions = new TailwindOptionsWrapper({
      options: { foo: 10 },
      defaultOptions,
    });

    expect(Object.keys(tailwindOptions.getAll()).length).toBe(1);
    expect(tailwindOptions.get('foo')).toStrictEqual(10);
  });

  it('should not override the default options if types mismatch and strongly typed options are used', () => {
    const defaultOptions = { foo: new TypeSafeTailwindOption('Hello, world!') };

    const tailwindOptions = new TailwindOptionsWrapper({
      options: { foo: 10 },
      defaultOptions,
    });

    expect(Object.keys(tailwindOptions.getAll()).length).toBe(1);
    expect(tailwindOptions.get('foo')).toStrictEqual('Hello, world!');
  });

  it('should select all options from a selectable object if no options', () => {
    const tailwindOptions = new TailwindOptionsWrapper({
      options: { },
      defaultOptions: {
        color: new SelectableObjectTailwindOption({ red: '#ff0000', green: '#00ff00', blue: '#0000ff' }),
      },
    }).getAll();

    expect(tailwindOptions).toStrictEqual({ color: { red: '#ff0000', green: '#00ff00', blue: '#0000ff' } });
  });

  it('should select all options from a selectable object if the respected option provided is an empty array', () => {
    const tailwindOptions = new TailwindOptionsWrapper({
      options: { color: [] },
      defaultOptions: {
        color: new SelectableObjectTailwindOption({ red: '#ff0000', green: '#00ff00', blue: '#0000ff' }),
      },
    }).getAll();

    expect(tailwindOptions).toStrictEqual({ color: { red: '#ff0000', green: '#00ff00', blue: '#0000ff' } });
  });

    it('should select a single option from a selectable object properly', () => {
      const tailwindOptions = new TailwindOptionsWrapper({
        options: { color: ['red'] },
        defaultOptions: {
          color: new SelectableObjectTailwindOption({ red: '#ff0000', green: '#00ff00', blue: '#0000ff' }),
        },
      }).getAll();

      expect(tailwindOptions).toStrictEqual({ color: { red: '#ff0000' } });
    });

    it('should select a multiple option from a selectable object', () => {
      const tailwindOptions = new TailwindOptionsWrapper({
        options: { color: ['red', 'blue'] },
        defaultOptions: {
          color: new SelectableObjectTailwindOption({ red: '#ff0000', green: '#00ff00', blue: '#0000ff' }),
        },
      }).getAll();

      expect(tailwindOptions).toStrictEqual({ color: { red: '#ff0000', blue: '#0000ff' } });
    });

  it('should select no options from a selectable object if the respected option contains an option that is not present in the default options', () => {
    const tailwindOptions = new TailwindOptionsWrapper({
      options: { color: ['yellow'] },
      defaultOptions: {
        color: new SelectableObjectTailwindOption({ red: '#ff0000', green: '#00ff00', blue: '#0000ff' }),
      },
    }).getAll();

    expect(tailwindOptions).toStrictEqual({ color: {} });
  });

  it('should select all options from a selectable object if the respected option contains a wildcard', () => {
    const tailwindOptions = new TailwindOptionsWrapper({
      options: { color: ['*'] },
      defaultOptions: {
        color: new SelectableObjectTailwindOption({ red: '#ff0000', green: '#00ff00', blue: '#0000ff' }),
      },
    }).getAll();

    expect(tailwindOptions).toStrictEqual({ color: { red: '#ff0000', green: '#00ff00', blue: '#0000ff' } });
  });
  //
  // it('adds one default', () => {
  //   const tailwindOptions = new TailwindOptionsWrapper({
  //     options: { 'color--yellow': '#ffff00' },
  //     defaultOptions: { color: { red: '#ff0000', green: '#00ff00', blue: '#0000ff' } },
  //   }).getAll();
  //
  //   expect(tailwindOptions).toStrictEqual({ color: { yellow: '#ffff00' } });
  // });
  //
  // it('adds multiple default', () => {
  //   const tailwindOptions = new TailwindOptionsWrapper({
  //     options: { 'color--yellow': '#ffff00', 'color--cyan': '#00ffff' },
  //     defaultOptions: { color: { red: '#ff0000', green: '#00ff00', blue: '#0000ff' } },
  //   }).getAll();
  //
  //   expect(tailwindOptions).toStrictEqual({ color: { yellow: '#ffff00', cyan: '#00ffff' } });
  // });
  //
  // it('adds multiple and selects from default', () => {
  //   const tailwindOptions = new TailwindOptionsWrapper({
  //     options: { color: ['red', 'green'], 'color--yellow': '#ffff00', 'color--cyan': '#00ffff' },
  //     defaultOptions: { color: { red: '#ff0000', green: '#00ff00', blue: '#0000ff' } },
  //   }).getAll();
  //
  //   expect(tailwindOptions).toStrictEqual({
  //     color: { red: '#ff0000', green: '#00ff00', yellow: '#ffff00', cyan: '#00ffff' },
  //   });
  // });
  //
  // it('adds multiple and selects wildcard default', () => {
  //   const tailwindOptions = new TailwindOptionsWrapper({
  //     options: { color: ['*'], 'color--yellow': '#ffff00', 'color--cyan': '#00ffff' },
  //     defaultOptions: { color: { red: '#ff0000', green: '#00ff00', blue: '#0000ff' } },
  //   }).getAll();
  //
  //   expect(tailwindOptions).toStrictEqual({
  //     color: { red: '#ff0000', green: '#00ff00', blue: '#0000ff', yellow: '#ffff00', cyan: '#00ffff' },
  //   });
  // });
})