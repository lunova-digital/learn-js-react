# The DOM and selecting elements

## What is the DOM?

**DOM** stands for **Document Object Model**. When the browser parses HTML, it builds a tree of **nodes** (elements, text, comments, etc.). JavaScript can **read** and **change** that tree: add/remove nodes, change text, styles, attributes, and respond to events.

Think of the DOM as the **live** representation of the page that your scripts manipulate.

## `document` and common selectors

Assume this HTML:

```html
<button id="btn" class="btn_class">Click me</button>
<ul class="ul">
  <li class="item_1">Item 1</li>
  <li class="item_2">Item 2</li>
</ul>
```

### `getElementById`

Returns **one** element (or `null`). Fast and explicit when you have an `id`:

```javascript
const button = document.getElementById("btn");
button.addEventListener("click", () => {
  console.log("clicked");
});
```

### `getElementsByClassName`

Returns a **live** `HTMLCollection` of elements with that class (note: **Elements**, plural):

```javascript
const items = document.getElementsByClassName("item_1");
console.log(items.length); // 1
console.log(items[0].textContent); // "Item 1"
```

### `querySelector`

Returns the **first** element that matches a **CSS selector**, or `null`:

```javascript
const firstItem = document.querySelector("li");
const btn = document.querySelector("#btn");
```

### `querySelectorAll`

Returns a **static** `NodeList` of **all** matches (good for looping):

```javascript
const allItems = document.querySelectorAll("li");
console.log(allItems);
```

## Quick comparison

| API | Returns | Notes |
|-----|---------|--------|
| `getElementById(id)` | one `Element` / `null` | No `#` prefix |
| `getElementsByClassName(names)` | live `HTMLCollection` | Space-separated for multiple classes in one string |
| `querySelector(sel)` | first match / `null` | Full CSS selector string |
| `querySelectorAll(sel)` | static `NodeList` | Empty if none match |

## Mini exercise

1. Use `querySelectorAll` on all `li` elements under `.ul` log them.
