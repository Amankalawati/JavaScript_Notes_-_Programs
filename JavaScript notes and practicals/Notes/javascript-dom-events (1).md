# JavaScript DOM Events — Complete Notes

## 1. What Are DOM Events?

An **event** is an action that happens in the browser.

Examples:

- Clicking a button
- Typing in an input
- Submitting a form
- Moving the mouse
- Pressing a keyboard key
- Loading a page

JavaScript allows us to listen for these events using:

```javascript
element.addEventListener("event", callback);
```

Example:

```javascript
button.addEventListener("click", () => {
    console.log("Button clicked");
});
```

When the button is clicked, the callback function executes.

---

## 2. `addEventListener()`

The general syntax is:

```javascript
element.addEventListener(eventType, callback, useCapture);
```

Example:

```javascript
parent.addEventListener("click", () => {
    console.log("Parent clicked");
}, false);
```

There are three important parts:

### 2.1 `eventType`

The type of event we want to listen for.

```javascript
"click"
"mouseover"
"keydown"
"submit"
```

### 2.2 `callback`

The function that executes when the event occurs.

```javascript
() => {
    console.log("Clicked");
}
```

### 2.3 `useCapture`

This controls whether the listener participates in the **capturing phase** or **bubbling phase**.

- `true` → means capturing
- `false` → means bubbling (default)

---

## 3. Event Propagation

When an event occurs on an element inside other elements, the event travels through the DOM.

Consider:

```text
grandParent
    └── parent
          └── child
```

Suppose we click `child`. The event doesn't simply execute on `child` — it travels through different phases.

The basic flow is:

```text
Capturing Phase
      ↓
    Target
      ↓
Bubbling Phase
```

More visually:

```text
window
   ↓
document
   ↓
grandParent
   ↓
parent
   ↓
child  ← clicked element
   ↑
parent
   ↑
grandParent
   ↑
document
   ↑
window
```

So event propagation has three conceptual phases:

1. Capturing
2. Target
3. Bubbling

---

## 4. Event Capturing

### 4.1 What is Event Capturing?

**Event capturing** is the phase where an event travels from the outermost ancestor toward the element that was actually clicked.

Direction: `Parent/Ancestor → Child`

For example, clicking `child` in:

```text
grandParent
    ↓
  parent
    ↓
  child
```

...causes the event to travel: `grandParent → parent → child`

A listener participates in the capturing phase when `useCapture = true`.

Example:

```javascript
grandParent.addEventListener("click", () => {
    console.log("grandParent Clicked");
}, true);

parent.addEventListener("click", () => {
    console.log("parent Clicked");
}, true);

child.addEventListener("click", () => {
    console.log("child Clicked");
}, true);
```

Clicking `child` produces:

```text
grandParent Clicked
parent Clicked
child Clicked
```

**Why?** Because the event is traveling downward: `grandParent → parent → child`

---

## 5. Event Bubbling

### 5.1 What is Event Bubbling?

**Event bubbling** is the phase where an event travels from the element that was clicked toward its ancestors.

Direction: `Child → Parent → GrandParent`

A listener participates in the bubbling phase when `useCapture = false`.

Example:

```javascript
grandParent.addEventListener("click", () => {
    console.log("grandParent Clicked");
}, false);

parent.addEventListener("click", () => {
    console.log("parent Clicked");
}, false);

child.addEventListener("click", () => {
    console.log("child Clicked");
}, false);
```

Clicking `child` produces:

```text
child Clicked
parent Clicked
grandParent Clicked
```

**Why?** Because after reaching the target, the event bubbles upward: `child → parent → grandParent`

---

## 6. Capturing vs Bubbling

The easiest way to remember:

| Feature      | Capturing                    | Bubbling                     |
| ------------ | ----------------------------- | ----------------------------- |
| `useCapture` | `true`                        | `false`                       |
| Direction    | Outside → Inside              | Inside → Outside              |
| Example      | GrandParent → Parent → Child  | Child → Parent → GrandParent  |
| Happens      | Before target                 | After target                  |
| Default      | No                             | Yes                            |

### Memory trick

```text
CAPTURE = Come down
BUBBLE  = Go up
```

---

## 7. Target Phase

The **target phase** is when the event reaches the element that actually triggered the event.

If we click:

```html
<div id="child"></div>
```

then `event.target` is the `child`.

Conceptually:

```text
Capturing
    ↓
grandParent
    ↓
parent
    ↓
child  ← TARGET
    ↑
Bubbling
```

**Important point:** A listener attached directly to the target element can run during the target phase regardless of whether its capture flag is `true` or `false`. So if `child` is the target, both:

```javascript
child.addEventListener("click", handler, true);
child.addEventListener("click", handler, false);
```

can participate when the event reaches `child`.

---

## 8. `event.target`

`event.target` tells us: *Which element originally triggered the event?*

Example:

```javascript
child.addEventListener("click", (event) => {
    console.log(event.target);
});
```

If we click the child: `event.target = child`

**The important point:** `event.target` remains the original element that triggered the event — even when the event reaches the parent:

```javascript
parent.addEventListener("click", (event) => {
    console.log(event.target);
});
```

If the child was clicked: `event.target = child`

---

## 9. `event.currentTarget`

`event.currentTarget` tells us: *Which element's event listener is currently executing?*

Example:

```javascript
parent.addEventListener("click", (event) => {
    console.log(event.currentTarget);
});
```

If the child was clicked and the parent's listener is executing:

```text
event.target        → child
event.currentTarget → parent
```

### Important Difference

```text
target        → Original element that caused the event
currentTarget → Element whose listener is currently executing
```

Example:

```javascript
parent.addEventListener("click", (event) => {
    console.log("target:", event.target);
    console.log("currentTarget:", event.currentTarget);
});
```

If we click `child`:

```text
target: child
currentTarget: parent
```

---

## 10. `event.stopPropagation()`

`stopPropagation()` is used to stop an event from continuing to propagate through the DOM.

Syntax:

```javascript
event.stopPropagation();
```

Example:

```javascript
parent.addEventListener("click", (event) => {
    console.log("parent Clicked");
    event.stopPropagation();
}, false);
```

If the event is bubbling:

```text
child
  ↑
parent  ← stopPropagation()
  ↑
grandParent
```

The event stops at the parent. Output:

```text
child Clicked
parent Clicked
```

The grandParent listener does not execute.

---

## 11. `stopPropagation()` During Capturing

This is especially important. Suppose:

```javascript
grandParent.addEventListener("click", () => {
    console.log("grandParent Clicked");
}, true);

parent.addEventListener("click", (event) => {
    console.log("parent Clicked");
    event.stopPropagation();
}, true);

child.addEventListener("click", () => {
    console.log("child Clicked");
}, true);
```

The event starts capturing: `grandParent → parent → child`

At `parent`, `event.stopPropagation()` is called, so the event does not continue to the child.

Output:

```text
grandParent Clicked
parent Clicked
```

`child` does not execute.

---

## 12. Original Code — Nested Elements

The structure:

```text
grandParent
    ↓
 parent
    ↓
 child
```

The JavaScript setup:

```javascript
const grandParent = document.getElementById("grandParent");
const parent = document.getElementById("parent");
const child = document.getElementById("child");
```

---

## 13. Scenario 1 — All `false`

Code:

```javascript
child.addEventListener("click", (event) => {
    console.log("child Clicked");
}, false);

parent.addEventListener("click", (event) => {
    console.log("parent Clicked");
    event.stopPropagation();
}, false);

grandParent.addEventListener("click", (event) => {
    console.log("grandParent Clicked");
}, false);
```

All listeners use bubbling. Clicking `child`:

**Execution:** First, the event reaches the child (`child Clicked`), then it bubbles to parent (`parent Clicked`). Parent calls `event.stopPropagation()`, so it cannot reach grandParent.

**Output:**

```text
child Clicked
parent Clicked
```

**Why?**

```text
child
  ↑
parent  ← stopPropagation()
  ↑
grandParent ❌
```

---

## 14. Scenario 2 — All `true`

Now change all listeners to `true`:

```javascript
child.addEventListener("click", (event) => {
    console.log("child Clicked");
}, true);

parent.addEventListener("click", (event) => {
    console.log("parent Clicked");
    event.stopPropagation();
}, true);

grandParent.addEventListener("click", (event) => {
    console.log("grandParent Clicked");
}, true);
```

Now all listeners participate in capturing. The event travels: `grandParent → parent → child`.

GrandParent executes (`grandParent Clicked`), parent executes (`parent Clicked`), then `event.stopPropagation()` stops the event — child is never reached.

**Output:**

```text
grandParent Clicked
parent Clicked
```

---

## 15. Mixed `true` and `false` Values

This is the most important part of the experiment.

Let's represent the three values as `(grandParent, parent, child)`. For example, `(true, false, true)` means:

```text
grandParent → true
parent      → false
child       → true
```

**Remember:** The parent always has `stopPropagation()` in this example — that changes the result significantly.

---

## 16. All Possible Combinations

There are 8 possible combinations (2 × 2 × 2 = 8):

| GrandParent | Parent  | Child   | Output     |
| ----------- | ------- | ------- | ---------- |
| `true`      | `true`  | `true`  | GP → P     |
| `true`      | `true`  | `false` | GP → P     |
| `false`     | `true`  | `true`  | P          |
| `false`     | `true`  | `false` | P          |
| `true`      | `false` | `true`  | GP → C → P |
| `true`      | `false` | `false` | GP → C → P |
| `false`     | `false` | `true`  | C → P      |
| `false`     | `false` | `false` | C → P      |

Let's understand each one.

---

## 17. Case 1 — `(true, true, true)`

Flow:

```text
grandParent
      ↓
parent  ← stopPropagation()
      ↓
child ❌
```

**Output:**

```text
grandParent Clicked
parent Clicked
```

**Why?** Both grandParent and parent are capturing listeners. Parent stops the event before it reaches child.

---

## 18. Case 2 — `(true, true, false)`

**Output:**

```text
grandParent Clicked
parent Clicked
```

The child value doesn't matter — parent stops propagation during capturing, so the event never reaches child.

---

## 19. Case 3 — `(false, true, true)`

Flow:

```text
grandParent → skipped
       ↓
parent → executes + stopPropagation()
       ↓
child → never reached
```

**Output:**

```text
parent Clicked
```

**Why?** GrandParent is not a capture listener. Parent is a capture listener, so it catches the event and stops it before the event reaches child.

---

## 20. Case 4 — `(false, true, false)`

**Output:**

```text
parent Clicked
```

Again, the child value does not matter. Parent stops propagation during capture.

---

## 21. Case 5 — `(true, false, true)`

Flow:

```text
Capture:
grandParent → executes

Target:
child → executes

Bubble:
parent → executes + stopPropagation()
```

**Output:**

```text
grandParent Clicked
child Clicked
parent Clicked
```

**Why?** GrandParent is capturing (`true`), so it runs while the event is moving downward. Parent is bubbling (`false`), so it waits until the event starts moving upward. The child is the target, so the child listener executes. Then the event bubbles to parent, which calls `event.stopPropagation()`, so the event does not continue to grandParent during bubbling.

---

## 22. Case 6 — `(true, false, false)`

**Output:**

```text
grandParent Clicked
child Clicked
parent Clicked
```

**Why?** The child is the target, so its listener executes when the event reaches it. Then parent handles the event during bubbling and stops propagation.

---

## 23. Case 7 — `(false, false, true)`

Flow:

```text
Capture:
grandParent → skipped

Target:
child → executes

Bubble:
parent → executes + stopPropagation()
```

**Output:**

```text
child Clicked
parent Clicked
```

GrandParent does not execute because `grandParent = false`, and the parent's `stopPropagation()` prevents the event from continuing to grandParent during bubbling.

---

## 24. Case 8 — `(false, false, false)`

This is the original bubbling example.

Flow:

```text
child
  ↑
parent  ← stopPropagation()
  ↑
grandParent ❌
```

**Output:**

```text
child Clicked
parent Clicked
```

---

## 25. The Most Important Rule

The entire experiment becomes much easier if you remember this:

### If Parent is `true`

Parent handles the event during **capturing**.

```text
grandParent
     ↓
parent ← STOP
     ↓
child ❌
```

Therefore: **child will never execute.**

Possible output: `grandParent Clicked` + `parent Clicked`, or just `parent Clicked` — depending on the GrandParent's value.

### If Parent is `false`

Parent handles the event during **bubbling**. The event has already reached the target.

```text
grandParent
     ↓
parent
     ↓
child
     ↑
parent ← STOP
     ↑
grandParent ❌
```

Therefore: child executes, parent executes, and GrandParent's bubbling listener does not execute. If GrandParent has `true`, it can execute earlier during capturing.

---

## 26. `true`/`false` Cheat Sheet

Think of each listener like this:

- `true` means: *"I'm interested while the event is coming DOWN."*
- `false` means: *"I'm interested while the event is going UP."*

```text
             CAPTURE
                ↓
grandParent
                ↓
             parent
                ↓
              child
             TARGET
                ↑
             BUBBLE
                ↑
             parent
                ↑
          grandParent
```

---

## 27. Event Delegation

### 27.1 What is Event Delegation?

**Event delegation** is a technique where we put one event listener on a parent element instead of adding separate listeners to every child.

It works especially well because of **event bubbling**.

Suppose we have:

```html
<ul id="list">
    <li>Apple</li>
    <li>Banana</li>
    <li>Mango</li>
</ul>
```

Instead of:

```javascript
document.querySelectorAll("li").forEach(item => {
    item.addEventListener("click", () => {
        console.log("clicked");
    });
});
```

we can put one listener on the parent:

```javascript
const list = document.getElementById("list");

list.addEventListener("click", (event) => {
    console.log(event.target);
});
```

When an `li` is clicked, the event bubbles from the `li` to the `ul`, and the `ul` listener can determine which child was clicked using `event.target`.

---

## 28. Event Delegation Example

HTML:

```html
<div id="grandParent">
    <div id="parent">
        <button id="child">Click Me</button>
    </div>
</div>
```

JavaScript:

```javascript
grandParent.addEventListener("click", (event) => {
    if (event.target.id === "child") {
        console.log("Child button clicked");
    }
});
```

If the button is clicked, the event bubbles up through `parent` to `grandParent`. Then `event.target` tells us that the original clicked element was the child button.

---

## 29. Why Event Delegation Is Useful

### 1. Fewer event listeners

Instead of adding listeners to 100 children (100 listeners ❌), we can use 1 parent with 1 listener ✅.

### 2. Dynamic elements

If new child elements are added later, the parent's listener can still handle their events through bubbling.

### 3. Cleaner code

Instead of repeating the same listener on many elements, we can handle them from one parent.

---

## 30. `event.target` in Event Delegation

Suppose:

```html
<div id="parent">
    <button id="button1">One</button>
    <button id="button2">Two</button>
</div>
```

Listener:

```javascript
parent.addEventListener("click", (event) => {
    console.log(event.target);
});
```

- If we click button 1: `event.target → button1`
- If we click button 2: `event.target → button2`
- But `event.currentTarget → parent`

So: `target` = actual clicked element, `currentTarget` = element containing the listener.

---

## 31. Complete Event Flow

When an event happens, remember this model:

```text
                 WINDOW
                    ↓
                DOCUMENT
                    ↓
              GRANDPARENT
                    ↓
                 PARENT
                    ↓
              CHILD/TARGET
                    ↑
                 PARENT
                    ↑
              GRANDPARENT
                    ↑
                DOCUMENT
                    ↑
                 WINDOW
```

The three conceptual stages are:

```text
1. CAPTURE
      ↓
2. TARGET
      ↓
3. BUBBLE
```

---

## 32. Easy Real-Life Example

Imagine three people standing in a line:

```text
GrandParent
    ↓
  Parent
    ↓
  Child
```

Someone sends a message to Child.

**Capturing:** The message travels `GrandParent → Parent → Child`. Think: *"The message is coming down."*

**Target:** The message reaches `Child`. Think: *"This is the person the message was intended for."*

**Bubbling:** The message travels back `Child → Parent → GrandParent`. Think: *"The message is going back up."*

---

## 33. Quick Revision Table

| Topic                 | Meaning                                      |
| ---------------------- | --------------------------------------------- |
| Event                  | An action such as click, keypress, submit    |
| `addEventListener()`   | Used to listen for events                    |
| `true`                 | Capture phase                                |
| `false`                | Bubble phase                                 |
| Capturing              | Event travels ancestor → target              |
| Target                 | Element that triggered the event             |
| Bubbling               | Event travels target → ancestors             |
| `event.target`         | Original element that triggered the event    |
| `event.currentTarget`  | Element whose listener is currently running  |
| `stopPropagation()`    | Stops further event propagation              |
| Event delegation       | Parent listener handles events from children |

---

## 34. Final Cheat Sheet

### Event Capturing

```javascript
addEventListener("click", handler, true);
```

Direction: `Parent → Child`

### Event Bubbling

```javascript
addEventListener("click", handler, false);
```

Direction: `Child → Parent`

### Target

```javascript
event.target
```

Means: *Who originally caused the event?*

### Current Target

```javascript
event.currentTarget
```

Means: *Whose listener is currently running?*

### Stop Propagation

```javascript
event.stopPropagation();
```

Means: *Stop the event from continuing through the DOM.*

### Event Delegation

```javascript
parent.addEventListener("click", (event) => {
    console.log(event.target);
});
```

Means: *Use one parent listener to handle events from children.*

---

## 35. One Formula to Remember Everything

When you click `child`:

```text
CAPTURE
GrandParent
    ↓
Parent
    ↓
TARGET
Child
    ↓
BUBBLE
Parent
    ↓
GrandParent
```

And:

```text
true  = Capture
false = Bubble
```

Finally:

```text
event.target
    ↓
Original clicked element

event.currentTarget
    ↓
Element whose listener is executing

event.stopPropagation()
    ↓
Stop the event from continuing
```

### The Most Important Concept

**`true` and `false` do not mean "event works" and "event doesn't work."**

They decide **when the listener participates in event propagation**:

```text
true  → capturing
false → bubbling
```

And in this experiment, `stopPropagation()` on `parent` is the key reason the output changes.
