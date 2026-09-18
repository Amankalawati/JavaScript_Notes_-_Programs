# JavaScript Copying, Memory & References: The Definitive Guide

## 1. The Core Concept: Values Live in Two Worlds

In JavaScript, every variable holds a value. But there are two completely different types of values:

| Type | What the Variable Holds | Examples |
|---|---|---|
| Primitive | The actual data itself. | `10`, `"Hello"`, `true`, `null`, `undefined` |
| Object | A reference (memory address) pointing to where the data lives. | `{}`, `[]`, `function() {}`, `new Date()` |

**Mental Model:**

```
Primitive:     variable → [ 10 ]
Object:        variable → [ 0x001 ] → { name: "Vikash" }
                              ▲
                         (Memory Address)
```

---

## 2. Primitives (The Independent Ones)

Primitives are the simplest building blocks.

```javascript
let age = 25;
let name = "Vikash";
let isLoggedIn = true;
```

**The 7 Primitive Types:** Number, String, Boolean, Undefined, Null, BigInt, Symbol.

### Rules of Primitives:

- **Immutable:** You cannot change the actual value `"Vikash"`. You can only replace it with a new value.
- **Copied by Value:** When you assign a primitive to another variable, the actual value is duplicated.

```javascript
let a = 10;
let b = a;  // b gets a COPY of the value 10
b = 20;

console.log(a); // 10 (Unaffected)
console.log(b); // 20
```

---

## 3. Objects (The Shared Ones)

Objects hold collections of data and behave completely differently.

```javascript
let user = {
  name: "Vikash",
  age: 20
};
```

### Rules of Objects:

- **Mutable:** You can change their properties without replacing the whole object.
- **Copied by Reference:** When you assign an object to another variable, only the memory address is copied. The actual object is not duplicated.

```javascript
let user1 = { name: "Vikash" };
let user2 = user1;  // user2 gets a COPY of the memory address

user2.name = "Raj";

console.log(user1.name); // "Raj" (Changed! Because both point to the same object)
```

**Visual:**

```
user1 ──┐
        ▼
     { name: "Raj" }   ← Only ONE object exists.
        ▲
user2 ──┘
```

---

## 4. Assignment (`=`) Does NOT Mean Copy

This is the #1 mistake beginners make.

- **For Primitives:** `=` copies the value.
- **For Objects:** `=` copies the reference (address).

```javascript
// Primitive (Value Copy)
let a = 10;
let b = a;   // Safe. Completely independent.

// Object (Reference Copy)
let objA = { value: 10 };
let objB = objA; // DANGER! Both point to the same object.
objB.value = 20;
console.log(objA.value); // 20 (Accidentally changed!)
```

---

## 5. The 3 Levels of Handling Objects

When dealing with objects, you have exactly 3 choices:

| Method | New Outer Object? | New Nested Objects? | Code |
|---|---|---|---|
| 1. Reference | ❌ No | ❌ No | `let b = a;` |
| 2. Shallow Copy | ✅ Yes | ❌ No (Shared) | `let b = { ...a };` |
| 3. Deep Copy | ✅ Yes | ✅ Yes (Independent) | `let b = structuredClone(a);` |

---

## 6. Shallow Copy (The Half-Measure)

A shallow copy creates a new outer object, but nested objects are still shared.

```javascript
let user = {
  name: "Vikash",      // Primitive (Safe)
  address: {           // Nested Object (DANGER!)
    city: "Delhi"
  }
};

let copy = { ...user }; // Shallow copy

// Safe change (primitive)
copy.name = "Raj";
console.log(user.name); // "Vikash" (Unaffected)

// Dangerous change (nested object)
copy.address.city = "Mumbai";
console.log(user.address.city); // "Mumbai" (Accidentally changed!)
```

**Why?** Because `copy.address` still points to the same nested object as `user.address`.

### Common Shallow Copy Methods:
- **Objects:** `{ ...obj }`, `Object.assign({}, obj)`
- **Arrays:** `[...arr]`, `arr.slice()`

---

## 7. Deep Copy (The Full Independence)

A deep copy creates a completely independent clone. Changes to the copy never affect the original.

```javascript
let user = {
  name: "Vikash",
  address: { city: "Delhi" }
};

let copy = structuredClone(user); // Deep copy

copy.address.city = "Mumbai";

console.log(user.address.city); // "Delhi" (Safe! Unchanged)
```

### Deep Copy Methods:

**`structuredClone()`** (Modern & Recommended)
- Handles Dates, Maps, Sets, and Arrays.
- ❌ Cannot clone Functions or DOM nodes.

**`JSON.parse(JSON.stringify(obj))`** (Old Trick)
- Works for simple JSON data.
- ❌ Loses `undefined`, functions, Symbols, and Dates (turns to string).

---

## 8. Arrays Are Objects Too

Arrays follow the exact same reference rules.

```javascript
let arr1 = [1, 2, 3];
let arr2 = arr1;       // Reference copy (DANGER)
arr2.push(4);
console.log(arr1);     // [1, 2, 3, 4]
```

Shallow copying an array:

```javascript
let arr1 = [1, 2, 3];
let arr2 = [...arr1];  // New array (Safe at top level)
arr2.push(4);
console.log(arr1);     // [1, 2, 3]
```

But if the array holds objects:

```javascript
let users = [{ name: "Vikash" }];
let copy = [...users];      // New array, but...
copy[0].name = "Raj";       // Changes the object INSIDE the array!
console.log(users[0].name); // "Raj" (DANGER)
```

---

## 9. Functions, Pass-by-Value, and the Big Confusion

This is the part you just mastered, but let's lock it in with absolute clarity.

**JavaScript is strictly "Pass-by-Value".**

But wait! If it passes the value, why does changing `user.name` affect the outside?

Because the "value" of an object is its memory address (e.g., `0x001`).

### Scenario A: Mutation (Changes the outside object)

```javascript
function changeUser(user) {
  user.name = "Raj"; // Mutating the object at address 0x001
}

const person = { name: "Vikash" }; // person holds address 0x001
changeUser(person);
console.log(person.name); // "Raj" (Changed!)
```

**Why it works:** The function received a copy of `0x001`. It used that address to find the original house and repaint the door.

### Scenario B: Reassignment (Does NOT change the outside)

```javascript
function changeUser(user) {
  user = { name: "Raj" }; // Reassigning the LOCAL variable to a NEW address (0x002)
}

const person = { name: "Vikash" }; // person still holds address 0x001
changeUser(person);
console.log(person.name); // "Vikash" (Unchanged!)
```

**Why it doesn't work:** The function overwrote its own copy of the address (`user`) to point to a new house. The original `person` variable outside is still holding the old address (`0x001`) and is completely unaffected. The local `user` variable is destroyed when the function ends.

---

## 10. Mutation vs Reassignment (The Golden Distinction)

| Action | Code | What happens to the original object? |
|---|---|---|
| Mutation | `obj.property = newValue;` | Changes the existing object. |
| Reassignment | `obj = newValue;` | Variable points to a new object. Original remains untouched. |

---

## 11. `const` and `Object.freeze()`

### `const` prevents reassignment, NOT mutation.

```javascript
const user = { name: "Vikash" };
user.name = "Raj"; // ✅ Allowed (Mutation)
user = {};         // ❌ Error (Reassignment)
```

### `Object.freeze()` prevents mutation (but is shallow).

```javascript
const user = { name: "Vikash" };
Object.freeze(user);
user.name = "Raj"; // ❌ Fails silently

// But nested objects are still vulnerable!
const user2 = { address: { city: "Delhi" } };
Object.freeze(user2);
user2.address.city = "Mumbai"; // ✅ Works! (Nested not frozen)
```

---

## 12. Checking Equality (`===`)

`===` checks if two variables point to the exact same object in memory.

```javascript
let a = { name: "Vikash" };
let b = a;
let c = { name: "Vikash" };

console.log(a === b); // true (Same object)
console.log(a === c); // false (Different objects, same content)
```

---

## 13. Quick Reference Cheat Sheet

| Concept | New Object? | Nested Objects? | Code Example |
|---|---|---|---|
| Assignment | ❌ No | ❌ No | `b = a` |
| Shallow Copy | ✅ Yes (Outer) | ❌ No (Shared) | `{ ...a }`, `[...arr]` |
| Deep Copy | ✅ Yes (All) | ✅ Yes (All) | `structuredClone(a)` |
| Mutation | ❌ No | ❌ No | `obj.x = 10` |
| Reassignment | Variable changes pointer | — | `obj = {}` |
| `const` | Prevents `=` reassignment | Allows mutation | `const x = {}` |

---

## 14. Your Final Mental Model

Keep this image in your head forever:

```
                  JAVASCRIPT VALUES
                        │
          ┌─────────────┴─────────────┐
          │                           │
     PRIMITIVE                    OBJECT (Reference)
     (Actual Data)                (Memory Address)
          │                           │
          │                     ┌─────┴─────┐
          │                     │           │
    Copied by Value       REFERENCE    SHALLOW    DEEP
                          (b = a)     ({...a})   (clone)
          │                     │           │
          │                Same Object  New Outer  New All
      Independent           (Shared)   (Shared     (Independent)
                                      inside)
```

### 🧠 The 5 Golden Rules to Memorize

1. **Primitive + `=`** → Value is copied (Safe).
2. **Object + `=`** → Reference is copied (Dangerous).
3. **Spread (`...`)** → Shallow copy (Outer is safe, nested is not).
4. **`structuredClone()`** → Deep copy (Everything is independent).
5. **Functions** → You get a copy of the reference. Reassigning the parameter does nothing outside; mutating the parameter changes the original.
