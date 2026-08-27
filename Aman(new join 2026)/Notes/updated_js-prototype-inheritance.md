# JavaScript Prototype Inheritance – Comprehensive Notes

Prototype inheritance is a core feature of JavaScript. It allows objects to inherit properties and methods from other objects. Every object has an internal link to another object called its prototype. When you access a property on an object, JavaScript first looks for it on the object itself; if not found, it follows the prototype chain until it either finds the property or reaches the end (`null`).

---

## 1. The Prototype Chain

- Every JavaScript object (except `Object.prototype`) has a hidden internal property `[[Prototype]]` (often accessible via `__proto__` or `Object.getPrototypeOf()`).
- This `[[Prototype]]` points to its parent object (the prototype).
- When you read a property that doesn't exist on the object, JavaScript moves up the chain to its prototype, then its prototype's prototype, and so on, until it either finds the property or reaches an object whose prototype is `null` (the top is `Object.prototype` whose prototype is `null`).

Example chain for an array:

```javascript
let arr = [10, 20, 30, 40];
console.log(arr.__proto__ === Array.prototype);        // true
console.log(arr.__proto__.__proto__ === Object.prototype); // true
console.log(arr.__proto__.__proto__.__proto__ === null);   // true
```

So: `arr → Array.prototype → Object.prototype → null`

---

## 2. `__proto__` vs `prototype`

- **`__proto__`** (or `Object.getPrototypeOf()`) is a property on the instance that points to its prototype (the object it inherits from).
- **`prototype`** is a property on constructor functions (e.g., `Array.prototype`, `Object.prototype`). It defines the prototype that will be assigned to all objects created by that constructor.

Example:

```javascript
function Person() {}
Person.prototype.sayHello = function() { console.log("Hi"); };

let p = new Person();
console.log(p.__proto__ === Person.prototype); // true
```

---

## 3. Built-in Prototypes

JavaScript provides built-in constructor functions and their prototypes:

| Constructor | Prototype object | Inherits from |
|---|---|---|
| `Object` | `Object.prototype` | `null` |
| `Array` | `Array.prototype` | `Object.prototype` |
| `Function` | `Function.prototype` | `Object.prototype` |
| `String` | `String.prototype` | `Object.prototype` |
| etc. | | |

So arrays get all array methods (like `push`, `pop`, `map`) from `Array.prototype`, and also object methods (like `toString`, `hasOwnProperty`) from `Object.prototype`.

---

## 4. Custom Inheritance Using `__proto__`

You can directly set an object's prototype using `__proto__` (though it's recommended to use `Object.setPrototypeOf()` or `Object.create()` for performance reasons).

Your code:

```javascript
let user1 = {
    name: "vikash",
    age: 20,
};

let user2 = {
    amount: 20,
    money: 50
};

user2.__proto__ = user1;
```

Now `user2` inherits from `user1`. So:

- `user2.name` → `"vikash"` (found on `user1`)
- `user2.age` → `20` (found on `user1`)
- `user2.amount` → `20` (own property)
- `user2.money` → `50` (own property)

The prototype chain for `user2` is:
`user2 → user1 → Object.prototype → null`

---

## 5. Property Shadowing

If an object has its own property with the same name as one in its prototype, the own property shadows (overrides) the prototype's property. For example:

```javascript
user2.name = "Ravi";
console.log(user2.name); // "Ravi" (own property)
console.log(user1.name); // "vikash" (unchanged)
```

---

## 6. Prototype Inheritance with Constructor Functions (Classical)

When you use `new` with a constructor, the new object's prototype is set to the constructor's `prototype` property.

```javascript
function Animal(type) {
    this.type = type;
}
Animal.prototype.speak = function() {
    console.log(this.type + " makes a sound");
};

let dog = new Animal("dog");
dog.speak(); // "dog makes a sound"
```

The chain: `dog → Animal.prototype → Object.prototype → null`.

---

## 7. ES6 Classes (Syntactic Sugar)

Classes in JavaScript are just syntactic sugar over prototype-based inheritance.

```javascript
class Animal {
    constructor(type) { this.type = type; }
    speak() { console.log(this.type + " makes a sound"); }
}
class Dog extends Animal {
    bark() { console.log("Woof!"); }
}
let d = new Dog("dog");
d.speak(); // inherited from Animal
d.bark();  // own method
```

Internally, `Dog.prototype` inherits from `Animal.prototype`, and so on.

---

## 8. Checking the Prototype Chain

- `Object.getPrototypeOf(obj)` – returns the prototype of `obj`.
- `obj instanceof Constructor` – checks if `Constructor.prototype` appears in the prototype chain of `obj`.
- `obj.hasOwnProperty(prop)` – checks if `prop` is a direct property of `obj` (not inherited).

Example:

```javascript
console.log(user2.hasOwnProperty('name')); // false (inherited)
console.log(user2.hasOwnProperty('amount')); // true (own)
console.log(user2 instanceof Object); // true
```

---

## 9. Important Points to Remember

- All objects (except `Object.prototype`) have a prototype, forming a chain.
- The top of the chain is `Object.prototype` whose prototype is `null`.
- Methods and properties are looked up dynamically along the chain at runtime.
- Modifying a prototype affects all objects that inherit from it (including built-ins if you extend them, which is generally discouraged).
- Use `Object.create(proto)` to create a new object with a given prototype without using constructors.
- `__proto__` is deprecated in favor of `Object.getPrototypeOf()` / `Object.setPrototypeOf()`.

---

## 10. Summary Diagram

```
null
  ↑
Object.prototype  ←  has methods: toString, hasOwnProperty, etc.
  ↑
Array.prototype    ←  has methods: push, pop, map, etc.
  ↑
arr instance       ←  own properties: length, indexed elements
```

For your `arr` example:

```javascript
arr (own: 0:10, 1:20, 2:30, 3:40, length:4)
   → Array.prototype (push, pop, map, ...)
       → Object.prototype (toString, hasOwnProperty, ...)
           → null
```

---

## 11. Why This Matters

- **Code reusability** – you can share methods via prototypes instead of copying them to each object.
- **Dynamic behavior** – you can add methods to a prototype and they become available to all existing and future instances.
- **Understanding JavaScript** – many libraries and frameworks rely on prototype manipulation.

---

## 12. Practice with Your Code

Let's trace your code:

```javascript
let user1 = { name: "vikash", age: 20 };
let user2 = { amount: 20, money: 50 };
user2.__proto__ = user1;

console.log(user2.name);   // "vikash" (from user1)
console.log(user2.age);    // 20 (from user1)
console.log(user2.amount); // 20 (own)
console.log(user2.money);  // 50 (own)

let arr = [10,20,30,40];
console.log(arr.__proto__ == Array.prototype); // true
console.log(arr.__proto__.__proto__ == Object.prototype); // true
console.log(arr.__proto__.__proto__.__proto__ == null); // true
```
