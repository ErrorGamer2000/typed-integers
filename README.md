# typed-integers

A system used to manage integers with specific memory sizes.

# Provided Exports

## `TypedInteger`

This is the base class for Both the `Uint` and `Int` classes. It includes basic
functionality that includes formatting when `toString` and `Symbol.toStringTag`
are called.

### Instance Properties

#### `readonly TAG: string`

The name of the class, used to format `Object.toString`.

#### `readonly clamp: boolean`

Whether or not to clamp the values rather than wrap them.

#### `value: number`

This is the numerical value of the instance. Setting this will automatically fix
the value within the instance's bounds.

## `Uint`

Extends `TypedInteger`.

Base class of the Unsigned Integer types.

### Instance properties

#### `readonly max: number`

The maximum value that the `Uint` can store.

### Static Methods

#### `maxValueFromBits(bits: number): number`

Get the maximum value of the variable from the number
of bits it will be stored in.

**Parameters**:

- `bits: number` - The size in bits.

**Returns**: The maximum value of a Uint with the given size.

### SubClasses

- `Uint.Uint8` - `Uint` with 8 bits of storage.
- `Uint.Uint8Clamped` - Clamped `Uint` with 8 bits of storage.
- `Uint.Uint16` - `Uint` with 16 bits of storage.
- `Uint.Uint16Clamped` - Clamped `Uint` with 16 bits of storage.
- `Uint.Uint32` - `Uint` with 32 bits of storage.
- `Uint.Uint32Clamped` - Clamped `Uint` with 32 bits of storage.
- `Uint.Uint64` - `Uint` with 64 bits of storage.
- `Uint.Uint64Clamped` - Clamped `Uint` with 64 bits of storage.

## `Int`

Extends `TypedInteger`.

Base class of the Signed Integer types.

### Instance properties

#### `readonly bounds: [number, number]`

The minimum and maximum value that the `Int` can store.

### Static Methods

#### `valueLimitsFromBits(bits: number): number`

Get the maximum and minimum value of the variable from the number
of bits it will be stored in.

**Parameters**:

- `bits: number` - The size in bits.

**Returns**: The maximum and minimum values of a Iint with the given size.

### SubClasses

- `Int.Int8` - `Int` with 8 bits of storage.
- `Int.Int8Clamped` - Clamped `Int` with 8 bits of storage.
- `Int.Int16` - `Int` with 16 bits of storage.
- `Int.Int16Clamped` - Clamped `Int` with 16 bits of storage.
- `Int.Int32` - `Int` with 32 bits of storage.
- `Int.Int32Clamped` - Clamped `Int` with 32 bits of storage.
- `Int.Int64` - `Int` with 64 bits of storage.
- `Int.Int64Clamped` - Clamped `Int` with 64 bits of storage.
