# Mutability, `const`, and shallow copy with spread

## Two different ideas people mix up

1. **Mutability** — Can the *data* change? Objects are *mutable*: you can add, remove, or change properties after creation. Primitives (`string`, `number`, `boolean`, etc.) are *immutable*: you replace them with new values; the old value does not “mutate in place.”
2. **Reassignment** — Can the *variable* point somewhere else? `let` allows `x = somethingElse`; `const` does not.

JavaScript often trips people up because **`const` only blocks reassignment of the variable**, not mutation of whatever the variable points at.

## `const` and object values

`const` means **the binding (the name) cannot be reassigned**. It does **not** freeze the object. If the value is an object, you can still change that object’s **properties** unless you use something like `Object.freeze` (and even `Object.freeze` is *shallow*: nested objects are not automatically frozen).

```javascript
const user = { name: "Ada" };
user.name = "Grace"; // allowed — you mutated the object
// user = { name: "Bob" }; // SyntaxError or TypeError — you tried to reassign `user`
```

So when you read “`const` object,” think: **the arrow from the name to the object is fixed**; the **inside** of the object can still change.

## Spread `{ ...obj }` — what it actually copies

The **object spread** syntax builds a **new object** and copies **enumerable own properties** from the source into it. For each property:

- If the value is a **primitive** (`string`, `number`, etc.), the new object gets a **copy** of that value (independent).
- If the value is a **reference** (object, array, function, another `Map`, etc.), the new object gets a **copy of the reference** — so **both** old and new objects **point at the same inner thing**. That is what **shallow copy** means: only the **outer shell** is new; **one level deep**, references are shared.

```javascript
const a = {
  name: "John",
  age: 30,
  city: "New York",
};

const b = { ...a };

b.name = "Jane";

console.log("a", a);
console.log("b", b);
```

What happens step by step:

1. `a` refers to one object in memory.
2. `{ ...a }` allocates a **different** object and copies `name`, `age`, and `city` onto it. `b` refers to this new object.
3. `b.name = "Jane"` only changes the `name` property **on `b`’s object**. `a`’s object still has `name: "John"` because that is a separate property slot holding a string (strings are immutable, but here you replaced `b`’s slot only).

So for **top-level primitive fields**, spread behaves like an intuitive “copy”: changing `b.name` does not change `a.name`.

## Where shallow copy bites: nested data

Add a nested object:

```javascript
const a = {
  name: "John",
  profile: { role: "dev", years: 2 },
};

const b = { ...a };

b.profile.role = "lead";

console.log(a.profile.role); // "lead" — `a` and `b` share the SAME `profile` object
console.log(b.profile.role); // "lead"
```

Why: spread copied the **property** `profile` from `a` to `b`. That property’s value is a **reference** to one `{ role, years }` object. Both `a.profile` and `b.profile` point at **that same object**. Mutating `b.profile.role` is mutating the shared object, so `a` “sees” it too.

**Rule of thumb:** shallow copy = **new outer object**, **same inner objects** where the source had object references.

## Other shallow copies (same idea)

These are all shallow in the same sense for plain objects:

- `{ ...obj }`
- `Object.assign({}, obj)`
- `Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj))` (more complete for descriptors, still shallow for nested values)

For **arrays**, `[...arr]` is also shallow: nested arrays or objects inside `arr` are still shared.

## Equality checks: primitives vs objects

### Primitives — `===` compares **values**

For `string`, `number`, `boolean`, `undefined`, `null`, `symbol`, and `bigint`, **strict equality** (`===`) asks whether the two sides represent the **same value** (with no type coercion).

```javascript
3 === 3; // true
"hi" === "hi"; // true
```

Loose equality (`==`) allows **coercion** (e.g. `0 == "0"` is `true`). In modern code, **`===` is the default** so you are not surprised by implicit conversions.

### Objects and arrays — `===` compares **identity** (same reference)

For **objects** (including plain objects, arrays, functions, dates, etc.), `===` does **not** walk the tree and compare fields. It only answers: **do both sides point at the exact same object in memory?**

```javascript
const a = { x: 1 };
const b = a;
a === b; // true — same reference

const c = { ...a };
a === c; // false — `c` is a new object; `{ x: 1 }` looks “equal” in English but not to `===`

{} === {}; // false — two literals create two different objects every time
```

So **“looks the same” ≠ “=== the same”** for objects. That is why after a shallow copy you get:

```javascript
const a = { name: "John", profile: { role: "dev" } };
const b = { ...a };

a === b; // false — spread made a new outer object
a.profile === b.profile; // true — shallow copy reused the same nested object
```

If you change `b.profile` to a **new** object (`b = { ...a, profile: { ...a.profile } }`), then `a.profile === b.profile` becomes **false** even when the nested *contents* still match—because equality for objects is about **identity**, not deep structure.

### `Object.is` (same idea as `===` for objects)

For **objects**, `Object.is(a, b)` is the same as `a === b` (same reference check). `Object.is` is mainly useful for **primitives** where it differs from `===` in edge cases: `Object.is(NaN, NaN)` is `true` but `NaN === NaN` is `false`; `Object.is(-0, +0)` is `false` but `-0 === +0` is `true`.

### If you need “same shape / same data”

There is **no built-in deep equality** for arbitrary objects in the language core. People use:

- Small tests: **Jest** `expect(a).toEqual(b)` (deep value comparison for plain data).
- Manual loops, or libraries, for production logic (with clear rules for what “equal” means).

**Do not rely on `JSON.stringify(a) === JSON.stringify(b)`** for correctness: key order, `undefined`, functions, `Map`/`Set`, circular references, and more make it unreliable.

**Summary**

| Type | `===` means |
|------|----------------|
| Primitive | Same value (no coercion with `===`) |
| Object / array | **Same reference** — same chunk of memory, not “same contents” |

## Mini exercise

1. Add a nested object to `a` (e.g. `a.profile = { role: "dev" }`), copy with `{ ...a }` into `b`, then set `b.profile.role`. Log `a.profile.role` and explain what you see.
2. After `const b = { ...a }`, predict and then verify in the console: `a === b`, `a.name === b.name`, and `a.profile === b.profile` (use a version of `a` that includes `profile`).
3. Read MDN for **`structuredClone`** and try cloning a nested object; confirm `a` and `b` are fully independent for that nested part, and that `a.profile === b.profile` is **false** after a true deep clone of that branch.
