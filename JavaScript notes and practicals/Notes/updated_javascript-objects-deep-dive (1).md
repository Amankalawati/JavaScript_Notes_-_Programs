# 🧠 JavaScript Objects – Deep Dive (Complete Notes)

## 1. The Basics: Objects are Key-Value Stores

```javascript
let user = {
    name: "Bhushan",
    age: 25,
    gender: "male",
    city: "Mumbai"
};
```

You access values via `user.name` or `user["age"]`.

Keys are always strings (or Symbols). Numbers get converted to strings.

## 2. Iterating Over Objects – for...in vs Object.keys()

### A. The for...in Loop

- It loops over all enumerable properties of an object.
- That includes properties from the object itself and inherited properties (from the prototype chain).

```javascript
let user = {
    name: "Bhushan",
    age: 25,
    city: "Mumbai"
};

for (let key in user) {
    console.log(key);          // prints: name, age, city
    console.log(user[key]);    // prints: Bhushan, 25, Mumbai
}
```

### B. Object.keys(obj)

Returns an array of only the object's own enumerable property keys (ignores inherited ones).

```javascript
console.log(Object.keys(user));  // ["name", "age", "city"]
```

**Why do we need both?**

- Use `for...in` when you want to check inherited properties too.
- Use `Object.keys()` when you only care about the object's own properties (safer and more predictable).

## 3. Inheritance with Object.create()

`Object.create(proto)` creates a new object that inherits from `proto`.

```javascript
const baseEmployee = {
    company: "Google",
    role: "Software Engineer"
};

let employee1 = Object.create(baseEmployee);
employee1.name = "Bhushan";
employee1.id = 101;

console.log(employee1);
// { name: "Bhushan", id: 101 }  (inherits company & role from prototype)

console.log(employee1.company); // "Google" (found in prototype)
```

Now, what happens with `for...in` and `Object.keys`?

```javascript
// Inherited properties are NOT included in Object.keys()
console.log(Object.keys(employee1)); // ["name", "id"]  (only own keys)

// But for...in DOES include inherited enumerable properties
for (let key in employee1) {
    console.log(key);   // "name", "id", "company", "role"
}
```

**Takeaway:** `for...in` walks up the prototype chain. That's why it can print keys you didn't define on the object itself.

## 4. 🚨 The BIG Warning: Why NOT to use for...in with Arrays

- Arrays in JavaScript are objects under the hood.
- Their numeric indices (0, 1, 2, …) are stored as keys.
- You can add extra custom properties because arrays are objects.

```javascript
const fruits = ["apple", "banana", "cherry"];
fruits.owner = "Bhushan";    // adding a custom property
fruits.isFresh = true;
```

Now, if we use `for...in`:

```javascript
for (let key in fruits) {
    console.log(key); 
}
// OUTPUT: "0", "1", "2", "owner", "isFresh"
```

**Problems here:**

- You get extra keys that are not array elements.
- The order is not guaranteed (though usually it follows insertion order, but you shouldn't rely on it).
- It iterates over inherited enumerable properties too (e.g., if someone added a method to `Array.prototype`).

✅ **Correct ways to iterate arrays:**

- `for (let i = 0; i < fruits.length; i++)` – traditional loop.
- `for (let fruit of fruits)` – `for...of` gives only values.
- `fruits.forEach(fruit => console.log(fruit))` – array method.

### 🔥 Your understanding is 100% correct!

> "If I add arr.name="bhushan" it can be added and if enumerable of this key is true then it will print inside for in loop. That's why we are not using for in loop with arrays."

✅ Absolutely! That's the golden reason. You nailed it.

## 5. Property Descriptors (The Hidden Attributes)

Every property in an object has three special boolean flags:

| Flag | What it does |
|---|---|
| writable | Can I change the value? (true = yes, false = read-only) |
| enumerable | Does it show up in for...in, Object.keys(), etc.? (true = shows up) |
| configurable | Can I delete the property or change these flags later? (true = yes) |

By default, when you create a property using `obj.key = value`, all three flags are set to `true`.

### A. writable – Read-Only Control

```javascript
let book = {};

Object.defineProperty(book, 'title', {
    value: "The Alchemist",
    writable: false,   // cannot change
    enumerable: true,
    configurable: true
});

console.log(book.title); // "The Alchemist"

book.title = "The Monk"; // fails silently (or throws error in strict mode)
console.log(book.title); // still "The Alchemist"
```

### B. enumerable – Hide from Loops

```javascript
let car = {};

Object.defineProperty(car, 'VIN', {
    value: "ABC123XYZ",
    enumerable: false   // secret – won't appear in loops
});

car.model = "Tesla";
car.color = "Red";

for (let key in car) {
    console.log(key);   // "model", "color"  (VIN is missing!)
}

console.log(Object.keys(car)); // ["model", "color"]
console.log(car.VIN);          // "ABC123XYZ"  (still accessible directly)
```

### C. configurable – Lock the Property

If `configurable` is `false`:

- You cannot delete the property.
- You cannot change its descriptor flags later (except `writable` can be turned from `true` to `false`, but not back).

```javascript
let employee = {};

Object.defineProperty(employee, 'id', {
    value: 12345,
    configurable: false
});

// Trying to delete
delete employee.id;
console.log(employee.id); // 12345  (deletion failed)

// Trying to redefine
Object.defineProperty(employee, 'id', {
    enumerable: true
}); 
// ❌ TypeError: Cannot redefine property: id
```

## 6. Object.defineProperty() – In Detail

You use `Object.defineProperty(obj, key, descriptor)` to set these flags.

**Example – Creating a property with custom settings:**

```javascript
let laptop = {};
Object.defineProperty(laptop, 'serialNumber', {
    value: "SN-999",
    writable: false,
    enumerable: false,
    configurable: false
});

// Now serialNumber is fully locked – can't change, can't delete, can't loop.
laptop.brand = "Dell";
```

To change multiple properties at once, use `Object.defineProperties()`:

```javascript
let player = {};
Object.defineProperties(player, {
    name: { value: "Bhushan", writable: true, enumerable: true },
    score: { value: 100, writable: false, enumerable: true }
});
```

## 7. Inspecting Descriptors

Use `Object.getOwnPropertyDescriptor(obj, 'key')` to see the flags.

```javascript
console.log(Object.getOwnPropertyDescriptor(laptop, 'serialNumber'));
// { value: "SN-999", writable: false, enumerable: false, configurable: false }
```

## 8. Bringing It All Together – A Realistic Example

Imagine we have a `BankAccount` object. We want:

- `accountNumber` → never change, never show in loops.
- `balance` → can be changed, but not deleted.
- `owner` → normal, fully editable.

```javascript
const BankAccount = {};

Object.defineProperties(BankAccount, {
    accountNumber: {
        value: "ACC-101",
        writable: false,
        enumerable: false,
        configurable: false
    },
    balance: {
        value: 5000,
        writable: true,
        enumerable: true,
        configurable: false   // cannot delete, but can change value
    },
    owner: {
        value: "Bhushan",
        writable: true,
        enumerable: true,
        configurable: true
    }
});

// Test
BankAccount.balance = 8000;   // works
console.log(BankAccount.balance); // 8000

delete BankAccount.balance;   // fails (configurable: false)
console.log(BankAccount.balance); // 8000

for (let key in BankAccount) {
    console.log(key);   // "balance", "owner" (accountNumber is hidden)
}
```

## 9. Summary Cheat Sheet

| Concept | Explanation |
|---|---|
| for...in | Loops over all enumerable keys (own + inherited). Use for objects, NOT arrays. |
| Object.keys() | Returns an array of own enumerable keys. Safe and predictable. |
| Object.create() | Creates a new object that inherits from a prototype. |
| writable: false | Property becomes read-only. |
| enumerable: false | Property is hidden from for...in and Object.keys(). |
| configurable: false | Property cannot be deleted, and its flags cannot be changed later. |
| Object.defineProperty() | Use to set or change property descriptors. |
| Arrays are objects | They can hold extra properties → for...in picks them up → bad. |

## 10. Final Word of Advice

- Use `for...in` only for plain objects when you intentionally want inherited properties.
- Use `Object.keys()` or `Object.entries()` for own properties.
- For arrays, stick to `for`, `for...of`, or `.forEach()`.
- Use `Object.defineProperty()` to secure critical data (like IDs, passwords, or internal states).
