# JavaScript Asynchronous Concepts — Visual Notes

> Read top-to-bottom. Diagrams are kept as code blocks so the ASCII art renders correctly.

---

## 1. One-Page Mental Model

```
┌──────────────────────────────────────────────────────────────┐
│                    JavaScript Runtime                        │
│                                                                │
│  ┌──────────────┐    async call    ┌──────────────────────┐  │
│  │  Call Stack  │ ───────────────> │      Web APIs        │  │
│  │  (sync code) │                  │ setTimeout, fetch,   │  │
│  │  LIFO        │ <─────────────── │ DOM events, console  │  │
│  └──────┬───────┘    push callback └──────────┬───────────┘  │
│         ▲                                     │              │
│         │                                     ▼              │
│         │                          ┌──────────────────────┐  │
│         │                          │  Microtask Queue     │  │
│         │                          │  Promise.then,       │  │
│         │                          │  queueMicrotask      │  │
│         │                          └──────────┬───────────┘  │
│         │                                     │              │
│         │                          ┌──────────▼───────────┐  │
│         │                          │  Callback Queue      │  │
│         │                          │  setTimeout, events  │  │
│         │                          └──────────┬───────────┘  │
│         │                                     │              │
│         └──────────── Event Loop ─────────────┘              │
│      when stack empty: run microtasks, then callback tasks   │
└──────────────────────────────────────────────────────────────┘
```

**Simple rule:** Sync code runs first → then **all** microtasks → then **one** callback task → repeat.

---

## 2. Synchronous vs Asynchronous JavaScript

### Synchronous

JavaScript normally runs one command at a time.

```js
console.log('Start');
console.log('End');
```

```
Call Stack:
[Start] → print "Start" → pop
[End]   → print "End"   → pop

Output:
Start
End
```

### Asynchronous

Async tasks are handed off to the browser/Node environment, so the main thread doesn't wait.

```js
console.log('Start');

setTimeout(() => {
  console.log('Async Task');
}, 2000);

console.log('End');
```

```
Timeline:

0s  ── console.log('Start')      → print "Start"
0s  ── setTimeout(...)           → sent to Web API
0s  ── console.log('End')        → print "End"
2s  ── Web API finishes          → callback goes to Callback Queue
2s  ── Event Loop moves callback → Call Stack
2s  ── callback runs             → print "Async Task"

Output:
Start
End
Async Task
```

---

## 3. Call Stack

The Call Stack tracks function calls. It works with **LIFO**: Last In, First Out.

```js
function greet() {
  console.log('Hello');
}

function welcome() {
  greet();
  console.log('Welcome!');
}

welcome();
```

**Stack diagram:**

```
welcome() is called:

| greet()    |  <-- top: runs first
| welcome()  |
| global     |
|____________|

greet() finishes and pops:

| welcome()  |
| global     |
|____________|

welcome() finishes and pops:

| global     |
|____________|
```

> **Key point:** If the Call Stack is busy, async callbacks must wait.

---

## 4. Web APIs

Web APIs are provided by the **browser environment**, not by JavaScript's core engine. In Node.js, equivalent features are provided by **Node APIs**.

**Examples:**
- `setTimeout()`
- `setInterval()`
- `fetch()`
- Event Listeners
- `console`

**Diagram:**

```
JavaScript Engine                 Browser / Web APIs
-----------------                 ------------------
setTimeout(...)  ───────────────> Timer API
                                    |
                                    | 2 seconds pass
                                    v
                              Callback Queue
                                    |
                                    v
                              Event Loop
                                    |
                                    v
                              Call Stack
```

> **Important:** `setTimeout` doesn't run after *exactly* 2 seconds. It runs after **at least** 2 seconds, and only once the Call Stack is free.

---

## 5. Event Loop

The Event Loop decides when queued callbacks can enter the Call Stack.

### Event Loop Steps

```
Forever loop:

1. Is Call Stack empty?
   ├── No  → keep running synchronous code
   └── Yes → go to step 2

2. Run ALL Microtasks
   Example: Promise.then, queueMicrotask

3. Run ONE Callback Queue task
   Example: setTimeout, click event

4. Repeat
```

### Visual Flow

```
        ┌────────────────────┐
        │    Call Stack      │
        │  (sync code runs)  │
        └─────────┬──────────┘
                   │ empty?
                   v
        ┌────────────────────┐
        │  Microtask Queue   │
        │  run ALL tasks     │
        └─────────┬──────────┘
                   │
                   v
        ┌────────────────────┐
        │  Callback Queue    │
        │  run ONE task      │
        └─────────┬──────────┘
                   │
                   └────── repeat
```

---

## 6. Callback Queue vs Microtask Queue

| Queue | Contains | Priority | Examples |
|---|---|---|---|
| **Microtask Queue** | Promises, mutation observers | Higher | `Promise.then`, `queueMicrotask` |
| **Callback Queue** | Timers, DOM events | Lower | `setTimeout`, `click` |

**Example:**

```js
setTimeout(() => console.log('Timeout'), 0);

Promise.resolve().then(() => console.log('Promise'));
```

**Diagram:**

```
Microtask Queue: [ Promise callback ]   <-- runs first
Callback Queue:  [ Timeout callback ]   <-- runs after

Output:
Promise
Timeout
```

**Why?**

```
1. setTimeout callback goes to Callback Queue
2. Promise.then callback goes to Microtask Queue
3. Event Loop checks stack
4. Stack is empty
5. Event Loop runs ALL microtasks first
6. Then runs one callback queue task
```

---

## 7. Event Listeners

Event listeners are async handlers that respond to user actions.

```js
button.addEventListener('click', () => {
  console.log('Clicked!');
});
```

**Diagram:**

```
User clicks button
        |
        v
DOM event happens
        |
        v
Web API stores the handler
        |
        v
Callback Queue
        |
        v
Event Loop
        |
        v
Call Stack
        |
        v
Handler runs: "Clicked!"
```

---

## 8. `setTimeout()` and `setInterval()`

### `setTimeout()`

Runs a function **once**, after a delay.

```js
setTimeout(() => {
  console.log('2s delay');
}, 2000);
```

```
0s ── register timer
       |
       v
2s ── callback queued
       |
       v
Event Loop → Call Stack → run once
```

### `setInterval()`

Runs a function **repeatedly** at intervals.

```js
setInterval(() => {
  console.log('Repeating every 1s');
}, 1000);
```

```
0s ── register interval
       |
       v
1s ── run
       |
       v
2s ── run
       |
       v
3s ── run
       |
       v
... continues until cleared
```

---

## 9. Console and Its Role

`console.log()` is **not** part of JavaScript's core ECMAScript engine. It's provided by the host environment — browser DevTools or the Node.js terminal.

**Diagram:**

```
console.log()
      |
      v
Host Environment API
(Browser / Node.js)
      |
      v
Prints message to console
```

---

## 10. Full Asynchronous Execution Flow

```
1. JavaScript starts running
        |
        v
2. Synchronous code enters Call Stack
        |
        v
3. Async operation found?
   ├── No  → continue executing sync code
   └── Yes → send to Web APIs
        |
        v
4. Main thread continues without waiting
        |
        v
5. Web API finishes task
        |
        v
6. Callback is placed in a Queue
   ├── Microtask Queue → Promise, queueMicrotask
   └── Callback Queue  → setTimeout, events
        |
        v
7. Event Loop checks Call Stack
        |
        v
8. If Call Stack is empty:
   → run all Microtasks
   → then run one Callback Queue task
        |
        v
9. Callback runs in Call Stack
        |
        v
10. Repeat
```

---

## 11. Order of Execution Cheat Sheet

```js
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');
```

**Output:**

```
1
4
3
2
```

**Diagram:**

```
Synchronous code:   1, 4
Microtask Queue:    3
Callback Queue:     2

Order:
Sync → Microtasks → Callback Queue
```

---

## 12. Summary Table

| Concept | What It Does | Example |
|---|---|---|
| Synchronous | Runs one line at a time | `console.log('A')` |
| Asynchronous | Doesn't block the main thread | `setTimeout`, `fetch` |
| Call Stack | Tracks function calls, LIFO | `greet()`, `welcome()` |
| Web APIs | Handle async operations in the browser | `setTimeout`, `fetch`, events |
| Event Loop | Moves queued callbacks to the stack | Controls execution order |
| Microtask Queue | High-priority async queue | `Promise.then` |
| Callback Queue | Normal-priority async queue | `setTimeout`, `click` |
| Event Listeners | Respond to user actions | `addEventListener` |
| `setTimeout` | Runs once, after a delay | `setTimeout(fn, 2000)` |
| `setInterval` | Repeats at intervals | `setInterval(fn, 1000)` |
| `console` | Host API, not part of JS core | `console.log()` |

---

## Final Key Takeaway

```
JavaScript is single-threaded.

But async behavior works because of:
Call Stack + Web APIs + Queues + Event Loop

Execution order:
1. Synchronous code
2. All microtasks
3. One callback queue task
4. Repeat
```

That's why JavaScript can handle timers, API requests, and user events — all without blocking the main thread.
