# `innerHTML`, `innerText`, and `textContent`

## Three ways to read (and write) what’s “inside” an element

These properties all relate to the element’s **contents**, but they behave differently—especially for **HTML tags**, **whitespace**, and **performance/security**.

| Property | Typical use |
|----------|-------------|
| `innerHTML` | String of HTML. Parsing HTML. **Caution:** inserting untrusted strings can lead to XSS. |
| `innerText` | “Rendered” text as the user sees it; reflects CSS and line breaks; can trigger reflow. |
| `textContent` | All text in the subtree, including script/style content; no HTML parsing when **setting**; more predictable for plain text. |

## Examples

```javascript
const app = document.getElementById("app");

console.log("innerHTML: ", app.innerHTML);
console.log("innerText: ", app.innerText);
console.log("textContent: ", app.textContent);
```

**Appending HTML as text vs markup:**

- `app.textContent += "<h1>Hello</h1>"` adds the **characters** `<h1>…` as text; you will not get a new heading in the DOM.
- `app.innerHTML += "<h1>Hello</h1>"` parses the string and **inserts real elements** (and **re-parses** the existing HTML on assignment, which can be costly and can break event listeners on replaced nodes).

## Mini exercise

1. Create a `div`, set `innerText` and then `textContent` with the same string that includes newlines. Compare the result in the DOM.
2. Read the MDN page on XSS and why you should not set `innerHTML` from unescaped user input.
