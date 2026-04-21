# Variables, scope, and how scripts load

## Declaring variables

JavaScript offers three common ways to bind a name to a value:

- **`let`** — block-scoped; can be reassigned. Prefer this for locals that change.
- **`const`** — block-scoped; the binding cannot be reassigned. Default choice when the binding should not be replaced.
- **`var`** — function-scoped (or global). Modern code usually avoids `var` in new projects.

```javascript
const max = 100;
let count = 0;
count = count + 1;

// max = 500; // Error - Cannot re assign const

// var is function-scoped, not block-scoped
if (true) {
  var x = 1;
  let y = 2;
}
console.log(x); // 1 — var "leaks" out of the block
// console.log(y); // ReferenceError — y is block-scoped
```

## Scope (quick mental model)

- **Block scope** — `{ ... }` for `let` / `const`.
- **Function scope** — parameters and `var` inside a function.
- **Global scope** — top level of a script (in browsers, global `let`/`const` do not become properties of `window`; global `var` and `function` declarations can).

```javascript
function outer() {
  const a = 10;
  function inner() {
    console.log(a); // inner sees outer's variables (closure)
  }
  inner();
}
outer();
```

## Script tags: `type="text/javascript"` vs `type="module"`

### Classic script (`text/javascript` or omitted type)

- Default in older HTML; still valid.
- Top-level `var` and `function` declarations attach to the global object in sloppy mode contexts; scripts share one global scope.

```html
<script type="text/javascript" src="./main.js"></script>
<!-- type can be omitted; browsers treat it as classic JS -->
<script src="./main.js"></script>
```
main.js:
```javascript
var SOME_VAR = 'Okay, I am a var'; // this gets attached to the window
```

### ES module (`type="module"`)

- Module code runs in **strict mode** automatically.
- Each module has its own top-level scope (no accidental globals from `let`/`const`/`class`/`function` at top level).

```html
<script type="module" src="./app.js"></script>
```
app.js:
```javascript
var SOME_VAR = 'Okay, I am a var'; // this does not get attached to the window
```


## Mini exercise

1. Create two `let` bindings in a block `{ }` and try to read them outside the block.
2. Add two script files in a html where both files have a variable `GLOBAL_VAR` declared with `var`
3. Try the 2nd exercise with const, let & type="module"
