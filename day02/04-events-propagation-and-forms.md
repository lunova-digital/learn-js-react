# DOM events: what they are, phases, default actions, and forms

This lesson pulls together **how the browser reports user input and other activity**, **how those signals move through the DOM tree**, and **how you can intercept forms and keys**—including `preventDefault`, which is about **default browser behavior**, not the same thing as stopping propagation.

---

## What is an “event”?

An **event** is a **message** from the browser to your script: something happened (or is happening) that the platform thinks your code might care about.

Examples:

- The user **clicked** an element, **pressed a key**, **moved the pointer**, **submitted a form**, **resized the window**, **finished loading** a resource, and many more.
- Your code can also **dispatch** synthetic events (e.g. `element.dispatchEvent(new Event("custom"))`), but most learning starts with **user-driven** and **document lifecycle** events.

For each occurrence, the browser creates an **`Event`** object (or a specialized subtype like `MouseEvent`, `KeyboardEvent`, `SubmitEvent`). That object is passed as the **first argument** to any listener you registered:

```javascript
element.addEventListener("click", (event) => {
  console.log(event.type); // "click"
});
```

So in practice: **event** can mean (1) the **kind** of thing (`"click"`, `"submit"`), or (2) the **`event` object instance** your handler receives. Both usages are common.

### Useful fields on the event object (subset)

| Property | Role |
|----------|------|
| `type` | String name of the event (`"click"`, `"keydown"`, …). |
| `target` | The innermost element the event **originated** on (often what the user actually interacted with). |
| `currentTarget` | The element **this listener** is attached to (equals `target` only when the listener is on the target). |
| `bubbles` | Whether this event type participates in the **bubble** phase after the target. |
| `cancelable` | Whether **`preventDefault()`** is allowed to cancel the default action for this dispatch. |
| `defaultPrevented` | After handlers run, whether `preventDefault()` was called (when cancelable). |

`target` vs `currentTarget` matters most when the listener is on an **ancestor** (e.g. delegation): `target` is still the inner button; `currentTarget` is the `div` you attached the listener to.

---

## Listening: `addEventListener`

You register a **listener** (callback) for a named event on a node:

```javascript
node.addEventListener("click", handler);
node.addEventListener("click", handler, { capture: true }); // run in capture phase
```

The third argument can be a **boolean** (`useCapture`, older style) or an **options object**. The default is **bubble phase** (`capture: false`).

Multiple listeners on the same node for the same event run in **registration order** (unless one calls `stopImmediatePropagation()`).

---

## How an event travels: capture, target, bubble

Many DOM events are designed to go through **three conceptual phases** in order:

1. **Capture phase** — The event travels **from the root** (e.g. `window` → `document` → …) **down toward** the `target`. Listeners registered with **`{ capture: true }`** run **during this downward** walk, **outer ancestors first**, then inward.
2. **Target phase** — The event reaches the **target** element (the element that is the subject of the action, e.g. the clicked node). Listeners on the target run: **capture-registered** listeners on the target run **before** **bubble-registered** listeners on the target (per spec ordering for that node).
3. **Bubble phase** — If the event **bubbles** (`bubbles: true` for that event type), the event propagates **from the target back up** toward `window`. Listeners with **default** `capture: false` run **during this upward** walk, **target’s parent → … → root**.

Not every event bubbles (e.g. **`focus`** and **`blur`** do not bubble in the classic sense; **`focusin`** / **`focusout`** do). **`click`** on elements **does** bubble, which is why nested boxes are a good mental model.

### Nested boxes (from the lesson HTML)

```html
<div id="grandparent"> …
  <div id="parent"> …
    <div id="child"> …
    </div>
  </div>
</div>
```

If you only attach **bubble** listeners and you **click** `#child`, a typical order is: **handlers on `child`**, then **`parent`**, then **`grandparent`**, then higher until stopped or the root.

If you attach **capture** listeners on ancestors, those run **on the way down** before the target’s bubble handlers run—so you often log **grandparent capture → parent capture → child (target) → child bubble → parent bubble → grandparent bubble** (exact target-phase ordering on the target itself depends on how you registered; experiment with one listener per node to see the full picture).

### Registering on bubble vs capture

```javascript
grandparent.addEventListener("click", (event) => {
  console.log("Grandparent bubbled");
});

grandparent.addEventListener(
  "click",
  (event) => {
    console.log("Grandparent captured");
  },
  { capture: true }
);
```

- **Capture** on ancestors: **outer → inner** as the event goes **down**.
- **Bubble** on ancestors: **inner → outer** as the event goes **up**.

---

## Stopping propagation vs canceling the default

These solve **different** problems.

### `event.stopPropagation()`

Stops the event from **continuing to other nodes** along the propagation path (subject to spec details for that phase). Practically: ancestors (or further descendants in capture) **won’t** run their listeners for this propagation **after** you stop it—useful so a **parent** does not react to a **child** click.

```javascript
grandparent.addEventListener("click", (event) => {
  console.log("Grandparent bubbled");
  event.stopPropagation();
});
```

### `event.stopImmediatePropagation()`

Stronger: on the **same node**, remaining listeners for this event **do not run** after the current one—even if they were registered on the same element. Use when multiple scripts attach listeners and one must “win.”

```javascript
child.addEventListener("click", () => console.log("Child clicked 1"));
child.addEventListener("click", (event) => {
  console.log("Child clicked 2");
  event.stopImmediatePropagation();
});
child.addEventListener("click", () => console.log("Child clicked 3")); // skipped
```

### `event.preventDefault()`

**Does not** stop the event from visiting other elements. It tries to cancel the **default action** the browser would perform **for that event**, **if** the event is **`cancelable`**.

Examples of **default actions**:

- **`submit`** on a form: navigate to `action` or reload, send GET/POST request.
- **`click`** on an `<a href="...">`: follow the link.
- **`keydown`** in a text field: insert the character, Tab moves focus, etc.

Your other listeners on the same element and (unless propagation was stopped) on ancestors **can still run**. So: **propagation** = who hears the event along the tree; **default** = what the browser does *in addition* when you do not cancel it.

| API | What it affects |
|-----|-------------------|
| `preventDefault()` | **Default browser behavior** for this event (when cancelable). |
| `stopPropagation()` / `stopImmediatePropagation()` | **Which other listeners** run along the path / on the same node. |

You often use **`preventDefault()`** on **`submit`** or **`click`** on links; you use **propagation** controls for **layered UI** (modals, nested cards, delegation with exceptions).

---

## Forms, `submit`, and `preventDefault`

Forms often **navigate** or **reload** when submitted. In SPAs or demos you usually listen for **`submit`** on the **`<form>`**, run your logic, and call **`preventDefault()`** so the browser does not perform its default submit navigation.

```javascript
const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Form submitted");
});
```

**Why `submit` on the form?** Submit can be triggered by the submit button, Enter in certain fields, etc.; one listener on the form catches the **form’s** submit lifecycle in one place.

### Accessing form controls

HTML `form` elements expose controls via **indexed order**, **`name`**, **`id`**, and **`form.elements`**. The lesson uses the first control:

```javascript
const nameInput = form[0];
```

Clearer options when markup grows:

```javascript
const nameInput = form.querySelector("input[type=text]");
// or document.getElementById("input") when that id exists
```

### `submit` and propagation

`submit` **bubbles** (in modern HTML). You can rely on **delegation** from a parent if needed, but attaching to the `<form>` is the most direct pattern.

---

## Keyboard: `keydown` and `preventDefault`

`keydown` fires when a key is pressed down. Many keys have **default behavior** (typing into the field, Tab moving focus). Calling **`preventDefault()`** in `keydown` **blocks that default**—so the character might **not** appear. That is useful for games or shortcuts; it is **surprising** on a normal text field if you block every key.

```javascript
nameInput.addEventListener("keydown", (event) => {
  console.log("Key pressed:", event.key);
  event.preventDefault();
});
```

- **`event.key`** — logical character / key name (`"a"`, `"Enter"`, `"Tab"`). For **physical** key position (layout-independent), many apps use **`event.code`** (e.g. `"KeyQ"`).

### Related events

- **`input`** — fires when the control’s value changes; good for **live validation** (fires after the value updates, unlike every `keydown` repeat).
- **IME / composition** — for some languages, the final character is committed after **`compositionend`**; `keydown` alone is not always enough for advanced input.

---

## Mini exercises

### Events and phases

1. Add **bubble** listeners on `grandparent`, `parent`, and `child`. Click `child` and log **`event.target`** vs **`event.currentTarget`** in each handler.
2. Add **`{ capture: true }`** listeners on the three nodes and compare log order to bubble-only.
3. On `child`’s first bubble handler, call **`stopPropagation`** and confirm whether `parent` and `grandparent` bubble handlers still run.
4. On `child`, register three **`click`** listeners; in the second, call **`stopImmediatePropagation`** and confirm the third never runs.

### Default actions and forms

5. Remove **`preventDefault`** from **`keydown`** and observe normal typing; add it back and confirm typing is blocked.
6. On **`submit`**, log **`nameInput.value`** (or the appropriate field) instead of only logging a fixed string.
7. Validate on submit: if the name is empty, **`preventDefault`** and show a message; if valid, you may still **`preventDefault`** to avoid real navigation in a SPA while you send data with **`fetch`**.
