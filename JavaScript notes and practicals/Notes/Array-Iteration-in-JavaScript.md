# Complete Guide to Array Iteration in JavaScript

## Table of Contents
1. [for...of and Objects (The Golden Rule)](#1-forof-and-objects-the-golden-rule)
2. [The Big Three: forEach, filter, map](#2-the-big-three-foreach-filter-map)
3. [Deep Dive: forEach (The Doer)](#3-deep-dive-foreach-the-doer)
4. [Deep Dive: filter (The Selector)](#4-deep-dive-filter-the-selector)
5. [Deep Dive: map (The Transformer)](#5-deep-dive-map-the-transformer)
6. [Quick Comparison Table](#6-quick-comparison-table)
7. [The Magic of Chaining](#7-the-magic-of-chaining)
8. [Understanding thisArg (When & Why)](#8-understanding-thisarg-when--why)
9. [Final Cheat Sheet](#9-final-cheat-sheet)

---

## 1. for...of and Objects (The Golden Rule)

### The Rule:
`for...of` works only on **iterable** objects.
Iterable = Arrays, Strings, Maps, Sets, NodeLists (anything with a `Symbol.iterator`).
Plain objects `{ }` are **NOT** iterable. Using `for...of` on them throws a `TypeError`.

**❌ Wrong way (Error):**

```javascript
const user = { name: "Ananya", age: 25 };
// for (let val of user) { console.log(val); } // TypeError: user is not iterable
```

**✅ Correct ways to loop over objects:**

| Method | What it returns |
|---|---|
| `Object.keys(obj)` | Array of keys |
| `Object.values(obj)` | Array of values |
| `Object.entries(obj)` | Array of `[key, value]` pairs (perfect for `for...of`) |

**Example using `Object.entries()`:**

```javascript
const user = { name: "Ananya", age: 25, city: "Pune" };

for (let [key, value] of Object.entries(user)) {
  console.log(`${key} → ${value}`);
}
// Output:
// name → Ananya
// age → 25
// city → Pune
```

---

## 2. The Big Three: forEach, filter, map

All three methods accept a **callback function** that runs for every element.
The callback can take up to 3 parameters (in this exact order):

| Parameter | Description |
|---|---|
| `element` | The current item being processed. |
| `index` (optional) | The index of the current item. |
| `array` (optional) | The original array itself. |

**Generic Syntax Template:**

```javascript
array.methodName((element, index, array) => { ... });
```

---

## 3. Deep Dive: forEach (The Doer)

**Returns:** `undefined` (nothing).

**Purpose:** Perform side effects – logging, updating external variables, writing to a database, making API calls.

**Does it mutate?** You can, but it's not recommended.

**Can you chain it?** ❌ No (because it returns `undefined`).

**Syntax:**

```javascript
array.forEach((element, index, array) => { ... });
```

**Example 1: Logging each item**

```javascript
const colors = ["Red", "Green", "Blue"];
colors.forEach((color, index) => {
  console.log(`Index ${index}: ${color}`);
});
// Output:
// Index 0: Red
// Index 1: Green
// Index 2: Blue
```

**Example 2: Calculating a total (side effect)**

```javascript
const cart = [50, 100, 150];
let total = 0;

cart.forEach((price) => {
  total += price;
});

console.log(total); // Output: 300
```

---

## 4. Deep Dive: filter (The Selector)

**Returns:** A new array containing only the elements that passed the test.

**Purpose:** Select / keep items that meet a specific condition (returns `true`).

**Length:** Same as original or shorter (never longer).

**Does it mutate?** ❌ Never.

**Can you chain it?** ✅ Yes (returns an array).

**Syntax:**

```javascript
array.filter((element, index, array) => { 
  return true;  // Keep this element
  // OR
  return false; // Discard this element
});
```

**Example 1: Get only even numbers**

```javascript
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter((num) => num % 2 === 0);
console.log(evens); // Output: [2, 4, 6]
```

**Example 2: Get only active users**

```javascript
const users = [
  { name: "Priya", active: true },
  { name: "Arjun", active: false },
  { name: "Kiran", active: true }
];

const activeUsers = users.filter((user) => user.active === true);
console.log(activeUsers);
// Output: [{ name: "Priya", active: true }, { name: "Kiran", active: true }]
```

---

## 5. Deep Dive: map (The Transformer)

**Returns:** A new array with the transformed values.

**Purpose:** Transform every single element – apply a math operation, extract a property, add a new field.

**Length:** Exactly the same as the original (always 1:1 mapping).

**Does it mutate?** ❌ Never.

**Can you chain it?** ✅ Yes (returns an array).

**Syntax:**

```javascript
array.map((element, index, array) => { 
  return transformedValue; // Must return something!
});
```

**Example 1: Double every number**

```javascript
const numbers = [1, 2, 3, 4];
const doubled = numbers.map((num) => num * 2);
console.log(doubled); // Output: [2, 4, 6, 8] (still 4 items)
```

**Example 2: Extract specific property (get all names)**

```javascript
const users = [
  { name: "Priya", age: 25 },
  { name: "Arjun", age: 30 },
  { name: "Kiran", age: 28 }
];

const names = users.map((user) => user.name);
console.log(names); // Output: ['Priya', 'Arjun', 'Kiran'] (still 3 items)
```

**Example 3: Add a new property to every object**

```javascript
const products = [
  { name: "Laptop", price: 50000 },
  { name: "Mouse", price: 500 }
];

const productsWithTax = products.map((product) => {
  return {
    name: product.name,
    price: product.price,
    tax: Math.round(product.price * 0.18) // New field
  };
});
console.log(productsWithTax);
// Output: 
// [{ name: "Laptop", price: 50000, tax: 9000 }, 
//  { name: "Mouse", price: 500, tax: 90 }]
```

---

## 6. Quick Comparison Table

| Feature | forEach | filter | map |
|---|---|---|---|
| Return Value | `undefined` | New Array (filtered) | New Array (transformed) |
| Length of Result | Same (original) | Same or Shorter | Exactly Same |
| Main Purpose | Perform actions (side effects) | Select / Keep matching items | Transform every item |
| Must return? | No | Yes (true/false) | Yes (new value) |
| Can chain? | ❌ No | ✅ Yes | ✅ Yes |
| Mutates original? | Never (unless you force it) | Never | Never |

---

## 7. The Magic of Chaining

Because `filter` and `map` both return arrays, you can chain them together to write powerful one-liners.

**Task:** Get the names of all even numbers, multiplied by 10.

```javascript
const numbers = [1, 2, 3, 4, 5, 6];

const result = numbers
  .filter((num) => num % 2 === 0)   // Step 1: Keep [2, 4, 6]
  .map((num) => num * 10);          // Step 2: Transform to [20, 40, 60]

console.log(result); // Output: [20, 40, 60]
```

⚠️ **Important:** You cannot use `forEach` in a chain because it returns `undefined` and breaks the chain.

---

## 8. Understanding thisArg (When & Why)

`thisArg` is an optional second parameter you can pass to `forEach`, `filter`, `map` (and others like `find`, `every`). It sets the value of `this` inside your callback.

### ⚠️ The Golden Rule of thisArg

| Callback Type | Does thisArg work? |
|---|---|
| Arrow Function `() => {}` | ❌ NO – completely ignored. Arrow functions don't have their own `this`. |
| Regular Function `function() {}` | ✅ YES – thisArg sets the `this` context. |

### Why not just "access directly" (closures)?

In 95% of modern JavaScript, you don't need `thisArg`. You can just use an arrow function and access a variable from the outer scope:

```javascript
const config = { rate: 0.18 };
const prices = [100, 200];

// ✅ Modern way - No thisArg needed!
const result = prices.map((price) => price + price * config.rate);
console.log(result); // [118, 236]
```

### So, when should you use thisArg? (The 3 edge cases)

**Case 1: You have a pre-written, reusable function that relies on `this`.**

```javascript
// A utility function defined elsewhere
function applyTax(price) {
  return price + price * this.taxRate;
}

const config = { taxRate: 0.18 };
const prices = [100, 200];

// ✅ Cleanly inject 'config' as 'this' without wrapping in a new function
const result = prices.map(applyTax, config);
console.log(result); // [118, 236]
```

**Case 2: Performance-critical code (avoid creating millions of new arrow functions).**
If you are looping over millions of items, reusing the exact same function saves memory.

**Case 3: Prototypal inheritance.**
If your callback uses methods from a prototype chain.

### The Modern Verdict

Skip `thisArg` and use arrow functions + closures. It's cleaner, easier to read, and works for 99% of real-world projects. Only use `thisArg` if you are maintaining legacy code or building a high-performance library.

---

## 9. Final Cheat Sheet

| If you want to... | Use this method | Example |
|---|---|---|
| Log every item or update a counter. | `forEach` | `arr.forEach((item) => console.log(item));` |
| Select items that match a condition. | `filter` | `arr.filter((x) => x > 10);` |
| Transform every item (double, extract, add field). | `map` | `arr.map((x) => x * 2);` |
| Select then Transform (e.g., get names of active users). | `filter().map()` | `users.filter(u => u.active).map(u => u.name);` |
| Loop over a plain object `{ }`. | `for...in` or `Object.entries() + for...of` | `for(let [k,v] of Object.entries(obj)) {}` |
| Inject `this` into a callback. | Use `thisArg` (only with `function(){}`) | `.map(function(x){ return this.fn(x); }, context);` |
