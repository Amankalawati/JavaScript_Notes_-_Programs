# 1. Comparison Operators (The Deep Dive)

Comparison operators return a boolean (`true` or `false`). The biggest confusion comes from how JavaScript decides to convert types.

## A. Basic Number Comparisons

These are straightforward. JavaScript converts both sides to numbers (if needed) and compares them.

```javascript
console.log(1 < 2);   // true
console.log(10 >= 5); // true
```

## B. Loose Equality (`==`) vs. Strict Equality (`===`)

- **`==` (Loose Equality):** Tries to convert both values to the same type before comparing (type coercion).
- **`===` (Strict Equality):** Compares value AND type. If types differ, it returns `false` immediately without converting.

```javascript
let num = 10;
let str = "10";
console.log(num == str);  // true (String "10" becomes Number 10)
console.log(num === str); // false (Number vs String)
```

## C. The BIG Confusion: `null` vs `undefined` vs `0`

**Question:** *"Why is `undefined == null` always true, and why is it NOT converted to a number when comparing with a number?"*

Here is the exact breakdown:

### 1. Why is `null == undefined` ALWAYS true?

The JavaScript specification (ECMAScript) has a special hardcoded rule for the `==` operator:

> "If one side is `null` and the other is `undefined`, return `true`."

Crucially, it does **NOT** convert `null` to `0` or `undefined` to `NaN` for this specific equality check. The engine sees `null` and `undefined`, immediately returns `true`, and stops. No number conversion happens here.

```javascript
console.log(null == undefined);  // true (Special rule)
console.log(null === undefined); // false (Different types: object vs undefined)
```

### 2. Why is `null == 0` false, but `null >= 0` true?

This is the #1 source of confusion. Equality operators (`==`) and Relational operators (`<`, `>`, `<=`, `>=`) follow **completely different rules**!

**For `==` (Equality):** When comparing `null` or `undefined` to anything other than the other one (like a number `0`), JavaScript does NOT convert them to numbers. The rule is: If you compare `null` or `undefined` to a number, string, or boolean, it just returns `false`. So `null == 0` is `false` because the spec says so.

**For `>=` / `<=` (Relational):** These operators force JavaScript to use the "Abstract Relational Comparison" algorithm. This algorithm explicitly converts `null` to the number `0` (and `undefined` to `NaN`).

- `null >= 0` → `Number(null)` is `0` → `0 >= 0` is `true`.
- `null <= 0` → `Number(null)` is `0` → `0 <= 0` is `true`.

```javascript
console.log(null == 0);  // false (Equality rule: doesn't convert)
console.log(null >= 0);  // true  (Relational rule: converts null to 0)
console.log(null <= 0);  // true  (Same rule)
```

### 3. Why is `undefined == 0` false, and `undefined < 0` false?

- `undefined == 0`: The equality rule says comparing `undefined` to a number is `false` (it doesn't convert).
- `undefined < 0`: The relational rule converts `undefined` to `Number(undefined)`, which is `NaN`. Any comparison (`<`, `>`, `<=`, `>=`) involving `NaN` always returns `false`.

```javascript
console.log(undefined == 0); // false (No conversion)
console.log(undefined < 0);  // false (undefined becomes NaN, and NaN < 0 is false)
console.log(undefined > 0);  // false (Same reason)
```

## D. The Weirdness of `NaN`

`NaN` stands for "Not-a-Number". It is the only value in JavaScript that is never equal to itself. This is because it represents an invalid mathematical result (e.g., `0/0`).

```javascript
console.log(NaN == NaN);  // false (By specification)
console.log(NaN === NaN); // false
```

---

# 2. Logical Operators

These are used to combine multiple boolean conditions.

- **AND (`&&`):** Returns `true` only if all conditions are `true`. If one is `false`, it short-circuits.
- **OR (`||`):** Returns `true` if at least one condition is `true`.
- **NOT (`!`):** Flips `true` to `false` and vice versa.

```javascript
let age = 18;
let money = 420;

console.log(age < 18 && money > 200); // false (age < 18 is false)
console.log(age > 10 || money > 200); // true  (one is true)
console.log(!(age > 10));             // false (!(true) becomes false)
```

---

# 3. Bitwise Operators

These work at the binary (bit) level. They convert numbers to 32-bit binary, perform the operation, and convert back.

- **AND (`&`):** Returns `1` only if both bits are `1`.
- **OR (`|`):** Returns `1` if at least one bit is `1`.
- **XOR (`^`):** Returns `1` if the bits are different.
- **Left Shift (`<<`):** Moves bits to the left, filling with zeros on the right (effectively multiplies by 2^n).
- **Right Shift (`>>`):** Moves bits to the right, dropping the shifted bits (effectively divides by 2^n).

```javascript
console.log(4 & 5);   // 4  (0100 & 0101 = 0100)
console.log(11 | 14); // 15 (1011 | 1110 = 1111)
console.log(5 ^ 7);   // 2  (0101 ^ 0111 = 0010)
console.log(5 << 3);  // 40 (5 * 2^3 = 40)
console.log(20 >> 2); // 5  (20 / 2^2 = 5)
```

---

# 4. Homework Explanation

```javascript
console.log(undefined != null); // false
```

`!=` is the loose inequality operator. It means "Is `undefined` NOT loosely equal to `null`?"

Since we know `undefined == null` is `true` because of the special spec rule, asking `undefined != null` is asking if `true` is `false`. Therefore, it returns `false`.

---

## 📌 Key Takeaways (Comparison Operators Cheat Sheet)

- `===` is your best friend. Always prefer `===` over `==` in real code to avoid the confusion below.

**For `==` ONLY:**
- `null == undefined` is hardcoded to `true`. No numbers are involved here.
- Comparing `null` or `undefined` to `0` (or any number/string/boolean) returns `false` immediately.

**For `<`, `>`, `<=`, `>=` ONLY:**
- JavaScript forces number conversion.
- `Number(null)` is `0`.
- `Number(undefined)` is `NaN` (which makes any comparison `false`).
- `NaN` never equals itself, even with `===`.
