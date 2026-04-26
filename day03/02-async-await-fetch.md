# Day 03 - Async/Await and Fetch (Simple Guide)

This file explains:
- `async` and `await`
- `fetch` for GET
- `fetch` for POST
- `AbortController`
- custom headers
- rendering API data to the page

---

## 1) `async` and `await` in plain words

- `async` makes a function return a Promise
- `await` pauses inside that function until Promise finishes

Example:

```ts
async function getNumber() {
  return 42;
}
```

This returns a Promise, not a plain number.

Waiting for a Promise:

```ts
async function main() {
  const value = await getNumber();
  console.log(value); // 42
}
```

Use `try...catch` with `await`:

```ts
async function main() {
  try {
    const value = await getNumber();
    console.log("Result:", value);
  } catch (error) {
    console.log("Error:", error);
  }
}
```

---

## 2) Fetch GET request

In your `main.ts`, this URL is used:

```ts
const url = "https://jsonplaceholder.typicode.com/posts";
```

Simple GET example:

```ts
async function main() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error:", error);
  }
}
```

---

## 3) Render API data in the DOM

Your code loops over `data` and creates a `<div>` for each post.

Simple idea:
- find `#app`
- create elements
- put `title` and `body`
- append to page

Example pattern:

```ts
const renderData = (data: Array<{ title: string; body: string }>) => {
  const app = document.getElementById("app");

  for (const item of data) {
    const div = document.createElement("div");
    div.innerHTML = `
      <h1>${item.title}</h1>
      <p>${item.body}</p>
    `;
    app?.appendChild(div);
  }
};
```

---

## 4) Fetch POST request

GET reads data. POST sends data.

Example:

```ts
async function createPost() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "New title",
      body: "New body",
      userId: 1,
    }),
  });

  const data = await response.json();
  console.log("Created:", data);
}
```

---

## 5) Headers

Headers are extra information sent with the request.

Common headers:
- `Content-Type: application/json` (body is JSON)
- `Authorization: Bearer <token>` (auth token)

Example:

```ts
const response = await fetch(url, {
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer my-token",
  },
});
```

---

## 6) AbortController (cancel request)

Use this when:
- user leaves page
- request is too slow
- user clicks "Cancel"

Example:

```ts
const controller = new AbortController();

setTimeout(() => {
  controller.abort(); // cancel after 2 seconds
}, 2000);

try {
  const response = await fetch(url, { signal: controller.signal });
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.log("Request cancelled or failed:", error);
}
```

---

## 7) Full flow in one sentence

`main()` -> `fetch(url)` -> `response.json()` -> `renderData(data)` -> show posts on screen.

---

## 8) Quick beginner checklist

- Wrap async API code in `try...catch`
- Use `await response.json()` to read JSON data
- Use GET to read, POST to create
- Add headers when needed
- Use `AbortController` to cancel requests

