# Day 03 - Error Handling and Promises (Simple Guide)

This file explains:
- `try...catch`
- `Promise`
- `.then()` and `.catch()`

---

## 1) Error Handling with `try...catch`

Use `try...catch` when code might fail.

- `try` block: code that may throw an error
- `catch` block: runs if an error happens

Example:

```ts
try {
  const user = JSON.parse("{ bad json }");
  console.log(user);
} catch (e) {
  console.log("Something went wrong:", e);
}
```

Real life meaning:
- "Try to do the task."
- "If it fails, handle it nicely instead of crashing."

---

## 2) What is a Promise?

A Promise is a value for the future.

It has 3 states:
- `pending` -> still working
- `fulfilled` -> success (`resolve`)
- `rejected` -> failed (`reject`)

Example:

```ts
const futureFood = new Promise<string>((resolve, reject) => {
  const num = Math.random();

  if (num > 0.5) {
    resolve("Shawarma is ready");
  } else {
    reject("Kitchen error");
  }
});
```

Handle it with `.then()` and `.catch()`:

```ts
futureFood
  .then((result) => {
    console.log("Success:", result);
  })
  .catch((error) => {
    console.log("Failed:", error);
  });
```

---

## 3) Why Promises are useful

Promises help with async work like:
- API calls
- timers (`setTimeout`)
- file/network operations

Without promises, async code becomes messy quickly.

---

## 4) Mini Practice

Try this:

```ts
const p = new Promise<number>((resolve, reject) => {
  const ok = true;
  if (ok) resolve(100);
  else reject("No value");
});

p.then((x) => console.log("Value:", x)).catch((e) => console.log("Error:", e));
```

Change `ok` to `false` and see what happens.

