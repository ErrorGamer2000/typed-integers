/**
 * Base class for typed integers.
 */
export default abstract class TypedInteger {
  /**
   * The name of the class, used to format `Object.toString`.
   */
  protected abstract readonly TAG: string;
  /**
   * Whether or not to clamp the values rather than wrap them.
   */
  protected abstract readonly clamp: boolean;
  /**
   * The TypedInteger's current value.
   */
  abstract get value(): number;
  abstract set value(v: number);
  valueOf() {
    return this.value;
  }

  toString() {
    return this[Symbol.toStringTag]() + `(${this.value})`;
  }

  [Symbol.toStringTag]() {
    return this.TAG;
  }
}
