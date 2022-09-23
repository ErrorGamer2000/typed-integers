import TypedInteger from "./TypedNum";

/**
 * Base class of the Unsigned Integer types. Contains all of the logic.
 */
abstract class Uint extends TypedInteger {
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
namespace Uint {
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

export default Uint;
