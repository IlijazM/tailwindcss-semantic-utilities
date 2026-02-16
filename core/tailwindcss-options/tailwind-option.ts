export class TailwindOption<T> {
  public constructor(protected _value: T) {}

  public get value(): any {
    return this._value;
  }

  public apply({ value, relatedValues }: { value: any; relatedValues: any }) {
    // @ts-ignore
    this._value = value;
  }
}
