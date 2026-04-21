# Functions: named, anonymous, and arrow

A **function** is a reusable block of code. You can **declare** it, **assign** it to a variable, or pass it as a **callback**.

## Named function declaration

Hoisted as a whole (you can call it before its line in the same scope in many cases):

```javascript
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 5
```

## Anonymous function expression

A function **without** a name on the left of `function`, often stored in a variable:

```javascript
const multiply = function (a, b) {
  return a * b;
};

console.log(multiply(2, 4)); // 8
```

You can still give an **internal** name for stack traces (optional):

```javascript
const factorial = function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);
};
```

## Arrow functions (`=>`)

```javascript
const square = (x) => x * x;

console.log(square(5)); // 25
```

Multi-line body with explicit `return`:

```javascript
const clamp = (value, min, max) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};
```

## Passing functions as arguments

```javascript
function runTwice(fn) {
  fn();
  fn();
}

runTwice(() => console.log("hello"));
```

## Mini exercise

1. Write a named function `isEven(n)` that returns `true` / `false`.
2. Rewrite it as a `const` holding an arrow function.
