import { TailwindOption } from './tailwind-option';

export class SelectableObjectTailwindOption<T> extends TailwindOption<Record<string, T>> {
  public constructor(
    _value: Record<string, T>,
    private onAdd: (key: string, value: null | any) => [string, null | T] = (key: string, value: T) => [key, value],
  ) {
    super(_value);
  }

  public override get value(): Record<string, T> {
    return this._value;
  }

  public override apply({ value, relatedValues }: { value: any; relatedValues?: any }) {
    this.selectValues({ value });

    const unusedValues = Object.fromEntries(Object.keys(this._value).filter((key) => !(value ?? []).includes(key)).map(key => [key, null]));
    relatedValues = { ...unusedValues, ...relatedValues };

    this.addValues({ relatedValues });
  }

  private selectValues({ value }: { value: any }) {
    if (value == null) {
      return;
    }
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      value = [value.toString()];
    }
    if (!Array.isArray(value)) {
      throw new Error(`Unable to apply selectable object tailwind option with value: ${value}`);
    }
    if (value.includes('*')) {
      return;
    }
    this._value = Object.fromEntries(Object.entries(this._value).filter(([key]) => value.includes(key)));
  }

  private addValues({ relatedValues }: { relatedValues?: any }) {
    Object.assign(
      this._value,
      Object.fromEntries(
        Object.entries(relatedValues)
          .map(([key, value]) => this.onAdd(key, value as T))
          .filter(([key, value]) => value != null),
      ),
    );
  }
}