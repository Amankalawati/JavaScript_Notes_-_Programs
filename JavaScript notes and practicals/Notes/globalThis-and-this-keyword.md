# Detailed Note on `globalThis` and the `this` Keyword in JavaScript

This note synthesizes the provided code snippets and explanations to give a comprehensive overview of the global object and the `this` keyword in JavaScript. It covers different execution contexts, strict mode effects, and related concepts.

## 1. The Global Object (`globalThis`)

### What is the Global Object?

In JavaScript, the global object is a special object that provides variables and functions that are available everywhere.

It exists in all environments, but its name differs:

- **Browsers:** `window`
- **Node.js:** `global`
- **Standardized (ES2020+):** `globalThis` – works across all environments.

### Accessing the Global Object

```javascript
console.log(globalThis);      // Works in browsers, Node, Deno, etc.
console.log(window);          // Browser only
console.log(global);          // Node.js only
```

### Important Behaviours

- In the global scope (outside any function), `this` refers to the global object only in browsers. In Node.js modules, top-level `this` refers to `module.exports`, not the global object.
- Variables declared with `var` (or without any keyword in non-strict mode) become properties of the global object.
- In strict mode, assigning a value to an undeclared variable throws a `ReferenceError` (prevents accidental global pollution).

**Example from code:**

```javascript
"use strict";
// a = 10;  // ❌ ReferenceError: a is not defined
```

## 2. The `this` Keyword

The `this` keyword refers to the execution context of the current code. Its value is determined by how a function is called, not where it is defined (except for arrow functions).

### 2.1. Global Context (Outside Any Function)

- **Browsers:** `this === window`
- **Node.js (module top-level):** `this === module.exports` (not the global object)
- **Node.js REPL or non-module scripts:** `this === global`

```javascript
// In browser console:
console.log(this); // Window object

// In Node.js module:
console.log(this); // {} (module.exports)
```

### 2.2. Inside a Regular Function

The value of `this` depends on whether strict mode is enabled.

**Non-Strict Mode**

```javascript
function greet() {
  console.log(this);
}
greet();          // global object (window/global)
window.greet();   // window (if browser)
```

**Strict Mode**

```javascript
"use strict";
function greet() {
  console.log(this);
}
greet();          // undefined
```

### 2.3. Inside a Method (Object Context)

When a function is called as a method of an object, `this` refers to the object that owns the method.

```javascript
const obj = {
  name: "vikash",
  age: 20,
  meet: function() {
    console.log(this.name);   // "vikash"
  }
};

obj.meet();   // this === obj
```

### 2.4. Arrow Functions

Arrow functions do not have their own `this`. They inherit `this` from the lexical (surrounding) scope – i.e., the `this` of the enclosing function or global context.

```javascript
let obj = {
  name: "vikash",
  age: 11,
  greet: () => {
    console.log(this);   // inherits from global scope (window/global)
  }
};
obj.greet();   // In browser: Window; in Node: module.exports (if top-level)

// Lexical inheritance from an enclosing function:
let obj2 = {
  name: "vikash",
  age: 11,
  greet: function() {
    let ab = () => {
      console.log(this);   // this = obj2 (lexically from greet)
    };
    ab();
  }
};
obj2.greet();   // logs obj2
```

### 2.5. In Constructors / Classes

When a function is used as a constructor (with `new`) or inside a class, `this` refers to the newly created instance.

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

let a = new Person("vikash", 20);
console.log(a);   // Person { name: 'vikash', age: 20 }
```

### 2.6. Other Cases

- **Event Handlers:** `this` usually refers to the element that fired the event.
- **`call`, `apply`, `bind`:** Explicitly set `this` to a custom value.

## 3. Strict Mode and `this`

Enabling `"use strict"` changes the default behaviour:

- `this` in functions becomes `undefined` (instead of the global object).
- Prevents accidental global variable creation.
- Makes JavaScript more secure and easier to debug.

**Example:**

```javascript
"use strict";
let meet = function() {
  console.log(this);
};
meet();   // undefined (not global)
```

## 4. Object Freezing (`Object.freeze`)

The second code snippet demonstrates `Object.freeze()`, which makes an object immutable – you cannot add, remove, or modify existing properties (in strict mode, modifications silently fail or throw a `TypeError`).

```javascript
"use strict";
let obj = { name: 10 };
Object.freeze(obj);
obj.name = 30;   // ❌ TypeError: Cannot assign to read-only property 'name'
console.log(obj); // { name: 10 }
```

**Note:** In non-strict mode, the assignment fails silently (no error, property unchanged).

## 5. Summary Table

| Context | `this` Value (non-strict) | `this` Value (strict) |
|---|---|---|
| Global scope (browser) | `window` | `window` |
| Global scope (Node module) | `module.exports` | `module.exports` |
| Regular function call | Global object (`window`/`global`) | `undefined` |
| Method call (object) | The object itself | The object itself |
| Arrow function | Lexical `this` (no own `this`) | Lexical `this` |
| Constructor (`new`) / Class | Newly created instance | Newly created instance |
| Event handler (DOM) | The DOM element | The DOM element |

## 6. Key Takeaways

- `globalThis` provides a reliable way to access the global object in any environment.
- `this` is dynamic – its value depends on how the function is invoked.
- Arrow functions are special – they capture `this` from the surrounding scope, making them useful for callbacks.
- Strict mode (`"use strict"`) improves safety by making `this` `undefined` in non-method functions and preventing global variable leakage.
- `Object.freeze` makes objects read-only; modifications will fail (especially in strict mode).
