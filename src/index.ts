/**
 * Base class for typed integers.
 */
export abstract class TypedInteger {
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

/**
 * Base class of the Unsigned Integer types. Contains all of the logic.
 */
export abstract class Uint extends TypedInteger {
  /**
   * Maximum value that the number is able to store.
   * No need for a minimum here since Uints are always greater than 0.
   */
  protected abstract readonly max: number;
  /**
   * Temporary value of the Uint. Used in bounding.
   */
  private _value: number = 0;
  /**
   * Initiate the Uint.
   * @param value The initial value of the Uint.
   */
  constructor(value?: number) {
    super();
    this.bound(value);
  }

  /**
   * Bound (clamp or wrap) the value, either from the
   * argument or current stored value.
   * @param v The value to bound
   * @returns The bounded value.
   */
  private bound(v?: number): number {
    this._value = v ?? this._value;
    if (this.clamp) {
      return (this._value = Math.max(0, Math.min(this.max, this._value)));
    } else {
      const modded = this._value % this.max;
      return (this._value = modded < 0 ? this.max + modded : modded);
    }
  }

  /**
   * The Uint's current value.
   */
  get value() {
    return this.bound();
  }

  set value(v: number) {
    this.bound(v);
  }
}

// Subclasses and other static values.
export namespace Uint {
  /**
   * Get the maximum value of the variable from the number
   * of bits it will be stored in.
   * @param bits The size in bits.
   * @returns The maximum value of a Uint with the given size.
   */
  export const maxValueFromBits = (bits: number): number =>
    Math.pow(2, bits) - 1;

  /**
   * Uint with 8 bits of storage.
   */
  export class Uint8 extends Uint {
    max = maxValueFromBits(8);
    clamp = false;
    TAG = "Uint8";
  }

  /**
   * Clamped Uint with 8 bits of storage.
   */
  export class Uint8Clamped extends Uint8 {
    clamp = true;
    TAG = "Uint8Clamped";
  }

  /**
   * Uint with 16 bits of storage.
   */
  export class Uint16 extends Uint {
    max = maxValueFromBits(16);
    clamp = false;
    TAG = "Uint16";
  }

  /**
   * Clamped Uint with 16 bits of storage.
   */
  export class Uint16Clamped extends Uint16 {
    clamp = true;
    TAG = "Uint16Clamped";
  }

  /**
   * Uint with 32 bits of storage.
   */
  export class Uint32 extends Uint {
    max = maxValueFromBits(32);
    clamp = false;
    TAG = "Uint32";
  }

  /**
   * Clamped Uint with 32 bits of storage.
   */
  export class Uint32Clamped extends Uint32 {
    clamp = true;
    TAG = "Uint32Clamped";
  }

  /**
   * Uint with 64 bits of storage.
   */
  export class Uint64 extends Uint {
    max = maxValueFromBits(64);
    clamp = false;
    TAG = "Uint64";
  }

  /**
   * Clamped Uint with 64 bits of storage.
   */
  export class Uint64Clamped extends Uint64 {
    clamp = true;
    TAG = "Uint64Clamped";
  }
}

/**
 * Base class of the Signed Integer types. Contains all of the logic.
 */
export abstract class Int extends TypedInteger {
  /**
   * [Minimum, maximum] value that the number is able to store.
   */
  protected abstract readonly bounds: [number, number];
  /**
   * Temporary value of the Int. Used in bounding.
   */
  private _value: number = 0;
  /**
   * Initiate the Int.
   * @param value The initial value of the Int.
   */
  constructor(value?: number) {
    super();
    this.bound(value);
  }

  /**
   * Bound (clamp or wrap) the value, either from the
   * argument or current stored value.
   * @param v The value to bound
   * @returns The bounded value.
   */
  private bound(v?: number): number {
    this._value = v ?? this._value;
    const range = this.bounds[1] - this.bounds[0];
    if (this.clamp) {
      return (this._value =
        Math.max(0, Math.min(range, this._value)) + this.bounds[0]);
    } else {
      const modded = (this._value - this.bounds[0]) % range;
      return (this._value =
        (modded < 0 ? range + modded : modded) + this.bounds[0]);
    }
  }

  /**
   * The Int's current value.
   */
  get value() {
    return this.bound();
  }

  set value(v: number) {
    this.bound(v);
  }
}

// Subclasses and other static values.
export namespace Int {
  /**
   * Get the maximum and minimum values of the variable from the number
   * of bits it will be stored in.
   * @param bits The size in bits.
   * @returns The maximum and minimum values of a Int with the given size.
   */
  export const valueLimitsFromBits = (bits: number): [number, number] => {
    const range = Math.pow(2, bits) - 1;
    return [-Math.floor(range / 2), Math.ceil(range / 2)];
  };

  /**
   * Int with 8 bits of storage.
   */
  export class Int8 extends Int {
    bounds = valueLimitsFromBits(8);
    clamp = false;
    TAG = "Int8";
  }

  /**
   * Clamped Int with 8 bits of storage.
   */
  export class Int8Clamped extends Int8 {
    clamp = true;
    TAG = "Int8Clamped";
  }

  /**
   * Int with 16 bits of storage.
   */
  export class Int16 extends Int {
    bounds = valueLimitsFromBits(16);
    clamp = false;
    TAG = "Int16";
  }

  /**
   * Clamped Int with 16 bits of storage.
   */
  export class Int16Clamped extends Int16 {
    clamp = true;
    TAG = "Int16Clamped";
  }

  /**
   * Int with 32 bits of storage.
   */
  export class Int32 extends Int {
    bounds = valueLimitsFromBits(32);
    clamp = false;
    TAG = "Int32";
  }

  /**
   * Clamped Int with 32 bits of storage.
   */
  export class Int32Clamped extends Int32 {
    clamp = true;
    TAG = "Int32Clamped";
  }

  /**
   * Int with 64 bits of storage.
   */
  export class Int64 extends Int {
    bounds = valueLimitsFromBits(64);
    clamp = false;
    TAG = "Int64";
  }

  /**
   * Clamped Int with 64 bits of storage.
   */
  export class Int64Clamped extends Int64 {
    clamp = true;
    TAG = "Int64Clamped";
  }
}
