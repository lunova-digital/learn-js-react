# Day 02 — DOM depth: content, elements, and events

This folder collects notes from the second JS session: how object references relate to “mutation,” reading and writing element text and HTML, creating and moving nodes, and **how DOM events work**—from the event object and **capture / target / bubble** phases to **default actions** (`preventDefault`), propagation control, **forms**, and **keyboard** input.

## Lesson files

| Topic | File |
|--------|------|
| Mutability, `const`, and shallow copies (spread) | [01-mutability-and-shallow-copy.md](01-mutability-and-shallow-copy.md) |
| `innerHTML`, `innerText`, and `textContent` | [02-innerhtml-innertext-textcontent.md](02-innerhtml-innertext-textcontent.md) |
| Element CRUD: `createElement`, `appendChild`, `remove`, `cloneNode` | [03-element-crud.md](03-element-crud.md) |
| DOM events: phases, propagation, `preventDefault`, forms, keyboard | [04-events-propagation-and-forms.md](04-events-propagation-and-forms.md) |

Open any file above for explanations plus copy-paste examples. The project’s `index.html` includes a `form` and a nested `grandparent` / `parent` / `child` block you can use with the demos in `src/main.js`.
