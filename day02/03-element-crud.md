# Element CRUD: create, read, update, delete (DOM nodes)

**CRUD** is a common acronym: **C**reate, **R**ead, **U**pdate, **D**elete. In the DOM, you often **create** elements, **append** or **insert** them, **change** their content, and **remove** them from the tree.

## Selecting elements (read)

```javascript
const app = document.getElementById("app");
const btn = document.getElementById("btn");
```

## Clone an existing node

`cloneNode(true)` copies the node and, with `true`, all descendants (“deep” clone).

```javascript
const btn2 = btn.cloneNode(true);
app.appendChild(btn2);
```

## Remove a node

```javascript
btn.remove();
```

`remove()` takes the node out of its parent. If you still hold a variable pointing to it, the element can be re-inserted later.

## Create and append a new element

```javascript
const newDiv = document.createElement("div");
newDiv.innerHTML = "I am the <b>new</b> div";
app.appendChild(newDiv);
```

`createElement` makes an element; it does not put it on the page until you **insert** it (e.g. `appendChild`).

## Pattern: add a new element on each click

```javascript
let count = 0;
btn.addEventListener("click", () => {
  const newDiv = document.createElement("div");
  newDiv.innerHTML = `I am the <b>new</b> div ${count}`;
  app.appendChild(newDiv);
  count++;
});
```

## Mini exercise

1. Build a small “todo” list: a button that `createElement("li")`, sets `textContent`, and `appendChild` to a `ul`.
2. Add a “clear” button that removes all `li` children from the `ul` (loop with `remove()` or set `ul.textContent = ""` for a quick reset—know the tradeoff).
