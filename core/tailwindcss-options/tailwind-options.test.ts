import { TailwindOption, TailwindOptionsWrapper, StronglyTypedTailwindOption } from './tailwind-options-wrapper';

describe("TailwindcssOptions", () => {
    it('empty options and empty default options', () => {
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

  it('should override the default options if an option is provided', () => {
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
    const defaultOptions = { foo: new StronglyTypedTailwindOption('Hello, world!') };

    const tailwindOptions = new TailwindOptionsWrapper({
      options: { foo: 10 },
      defaultOptions,
    });

    expect(Object.keys(tailwindOptions.getAll()).length).toBe(1);
    expect(tailwindOptions.get('foo')).toStrictEqual('Hello, world!');
  });

  //   it("empty options", () => {
  //     const tailwindOptions = new TailwindOptionsWrapper({
  //       options: {},
  //       defaultOptions: { foo: ['bar'] },
  //     }).getAll();
  //
  //     expect(tailwindOptions).toStrictEqual({ foo: ['bar'] });
  //   });
  //
  //   it("empty options", () => {
  //       const options = {};
  //       const defaultOptions = { foo: 'bar' };
  //
  //       const tailwindOptions  = new TailwindOptionsWrapper({
  //           options,
  //           defaultOptions,
  //       }).getAll();
  //
  //       expect(tailwindOptions).toStrictEqual(defaultOptions);
  //   });
  //
  //   it("selects single from object", () => {
  //       const tailwindOptions  = new TailwindOptionsWrapper({
  //           options: {color: ["red"]},
  //           defaultOptions: {color: {red: '#ff0000', green: '#00ff00', blue: '#0000ff'}},
  //       }).getAll();
  //
  //       expect(tailwindOptions).toStrictEqual({color: {red: '#ff0000'}});
  //   });
  //
  //   it("selects multiple from object", () => {
  //       const tailwindOptions  = new TailwindOptionsWrapper({
  //           options: {color: ["red", "blue"]},
  //           defaultOptions: {color: {red: '#ff0000', green: '#00ff00', blue: '#0000ff'}},
  //       }).getAll();
  //
  //       expect(tailwindOptions).toStrictEqual({color: {red: '#ff0000', blue: '#0000ff'}});
  //   });
  //
  //   it("selects none from object", () => {
  //       const tailwindOptions  = new TailwindOptionsWrapper({
  //           options: {color: []},
  //           defaultOptions: {color: {red: '#ff0000', green: '#00ff00', blue: '#0000ff'}},
  //       }).getAll();
  //
  //       expect(tailwindOptions).toStrictEqual({color: {red: '#ff0000', green: '#00ff00', blue: '#0000ff'}});
  //   });
  //
  //   it("selects non-existing from object", () => {
  //       const tailwindOptions  = new TailwindOptionsWrapper({
  //           options: {color: ["yellow"]},
  //           defaultOptions: {color: {red: '#ff0000', green: '#00ff00', blue: '#0000ff'}},
  //       }).getAll();
  //
  //       expect(tailwindOptions).toStrictEqual({color: {}});
  //   });
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