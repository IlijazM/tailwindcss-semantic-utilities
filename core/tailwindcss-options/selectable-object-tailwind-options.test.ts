import { TailwindOptionsWrapper } from './tailwind-options-wrapper';
import { SelectableObjectTailwindOption } from './selectable-object-tailwind-options';

describe('SelectableObjectTailwindOption', () => {
  it('should select all options from a selectable object if no options', () => {
    const tailwindOptions = new TailwindOptionsWrapper({
      options: {},
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

  it('adds one default', () => {
    const tailwindOptions = new TailwindOptionsWrapper({
      options: { 'color--yellow': '#ffff00' },
      defaultOptions: {
        color: new SelectableObjectTailwindOption({ red: '#ff0000', green: '#00ff00', blue: '#0000ff' }),
      },
    }).getAll();

    expect(tailwindOptions).toStrictEqual({
      color: { red: '#ff0000', green: '#00ff00', blue: '#0000ff', yellow: '#ffff00' },
    });
  });

  it('change on of the defaults', () => {
    const tailwindOptions = new TailwindOptionsWrapper({
      options: { 'color--blue': '#00ffff' },
      defaultOptions: {
        color: new SelectableObjectTailwindOption({ red: '#ff0000', green: '#00ff00', blue: '#0000ff' }),
      },
    }).getAll();

    expect(tailwindOptions).toStrictEqual({
      color: { red: '#ff0000', green: '#00ff00', blue: '#00ffff' },
    });
  });

  it('adds multiple default', () => {
    const tailwindOptions = new TailwindOptionsWrapper({
      options: { 'color--yellow': '#ffff00', 'color--cyan': '#00ffff' },
      defaultOptions: {
        color: new SelectableObjectTailwindOption({ red: '#ff0000', green: '#00ff00', blue: '#0000ff' }),
      },
    }).getAll();

    expect(tailwindOptions).toStrictEqual({
      color: { red: '#ff0000', green: '#00ff00', blue: '#0000ff', yellow: '#ffff00', cyan: '#00ffff' },
    });
  });

  it('adds multiple and selects from default', () => {
    const tailwindOptions = new TailwindOptionsWrapper({
      options: { color: ['red', 'green'], 'color--yellow': '#ffff00', 'color--cyan': '#00ffff' },
      defaultOptions: {
        color: new SelectableObjectTailwindOption({ red: '#ff0000', green: '#00ff00', blue: '#0000ff' }),
      },
    }).getAll();

    expect(tailwindOptions).toStrictEqual({
      color: { red: '#ff0000', green: '#00ff00', yellow: '#ffff00', cyan: '#00ffff' },
    });
  });

  it('adds multiple and selects wildcard default', () => {
    const tailwindOptions = new TailwindOptionsWrapper({
      options: { color: ['*'], 'color--yellow': '#ffff00', 'color--cyan': '#00ffff' },
      defaultOptions: {
        color: new SelectableObjectTailwindOption({ red: '#ff0000', green: '#00ff00', blue: '#0000ff' }),
      },
    }).getAll();

    expect(tailwindOptions).toStrictEqual({
      color: { red: '#ff0000', green: '#00ff00', blue: '#0000ff', yellow: '#ffff00', cyan: '#00ffff' },
    });
  });
});
