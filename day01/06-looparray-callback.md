# `loopArray(array, callback)`

This pattern mirrors what built-in `Array.prototype.forEach` does: walk an array and run a **callback** for each item. Writing it by hand is good practice for **functions as values** and **loops**.

## Behavior we want

- Accept an `array` and a `callback` function.
- For each element, call `callback` with useful arguments (class-style: element, index, whole array).

## Example implementation

```javascript
function loopArray(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}
```

## Usage examples

### Log each value

```javascript
const nums = [10, 20, 30];

loopArray(nums, (value) => {
  console.log(value);
});
// 10, 20, 30
```

## Relation to the real standard library

JavaScript already provides:

```javascript
[1, 2, 3].forEach((value, index, array) => {
  console.log(value, index);
});
```

Our `loopArray` is a teaching version of the same idea: **separate data (the array) from behavior (the callback)**.

## Mini exercise

1. Write a `doubleTap` function that accepts two arguments: `array` & `callback` and calls the callback twice for each item