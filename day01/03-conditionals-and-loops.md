# Conditionals and loops

## Conditionals

### `if` / `else if` / `else`

```javascript
const score = 85;

if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else {
  console.log("Keep practicing");
}
```

### `switch`

Useful when comparing one expression against many discrete values (remember `break`):

```javascript
const role = "editor";

switch (role) {
  case "admin":
    console.log("Full access");
    break;
  case "editor":
    console.log("Can edit");
    break;
  default:
    console.log("Read only");
}
```

### Ternary operator

Compact `if`/`else` for expressions:

```javascript
const max = a > b ? a : b;
```

### Logical operators

- `&&` — short-circuit "and"
- `||` — short-circuit "or"
- `!` — negation

```javascript
const name = input || "guest";
if (user && user.isActive) {
  console.log("Hello", user.name);
}
```

## Loops

### `for`

```javascript
for (let i = 0; i < 3; i++) {
  console.log(i); // 0, 1, 2
}
```

### `while` / `do...while`

```javascript
let n = 0;
while (n < 3) {
  console.log(n);
  n++;
}

let m = 0;
do {
  console.log(m);
  m++;
} while (m < 3);
```

### `for...of` (values of iterables — arrays, strings, etc.)

```javascript
const colors = ["red", "green", "blue"];
for (const c of colors) {
  console.log(c);
}
```

### `for...in` (keys of objects — often indices for arrays)

```javascript
const obj = { a: 1, b: 2 };
for (const key in obj) {
  console.log(key, obj[key]);
}
```

Prefer `for...of` or array methods for arrays unless you specifically need indices as strings.

## Mini exercise

1. Print even numbers from 0 through 20 using a `for` loop.
2. Given an array of numbers, use a loop to compute their sum.
