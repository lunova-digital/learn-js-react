# Data types in JavaScript

## Primitives

| Type | Example | Notes |
|------|---------|--------|
| `string` | `"hello"`, `'hi'` | Text |
| `number` | `42`, `3.14`, `NaN` | IEEE-754 double; `NaN` is still type `number` |
| `bigint` | `123n` | Arbitrary-precision integers |
| `boolean` | `true`, `false` | |
| `undefined` | `undefined` | Variable declared but not assigned; missing property |
| `null` | `null` | Intentional "no value" (typeof quirk: `typeof null === "object"`) |

```javascript
const label = "count";
const n = 0;
const big = 9007199254740993n; // beyond safe integer range as number

let notSet;
console.log(notSet); // undefined

const empty = null;
```

## Objects (reference types)

```javascript
const user = { name: "Ada", score: 10 };

const nums = [1, 2, 3];

```

## typeof

Quick runtime checks (remember the `null` quirk):

```javascript
typeof "text"; // "string"
typeof 42; // "number"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof {}; // "object"
typeof []; // "object" (arrays are objects)
typeof function () {}; // "function"
typeof null; // "object" (historical bug in the language)
```

## Static vs non-static methods


**Static** (also called a **class method** in other languages): you call it on the **Class itself** — here, `Number`. The method lives on `Number`, not on individual numbers.
```javascript
Number.isFinite(42); // true — ask the Number “toolbox”
Number.isFinite(NaN); // false
```

You can **not** write something like `42.isFinite()` for this check; `isFinite` is not defined that way on each number value.

**Non-static** ( **instance** ) methods: you call them on **one specific value** (an instance). The method uses that value as its subject.

```javascript
const s = "hello";
s.toUpperCase(); // called on this string instance

```

## Mini exercise

1. Log `typeof` for a string, a number, an array, and `null`.
2. Explore build-in static & non-static methods for `string`, `number` & `array`
