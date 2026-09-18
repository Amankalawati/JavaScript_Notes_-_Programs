//Objects in JavaScript : the deep dive:

//1.Basics:

//What are objects ?

// -Objects are nothing but  collections of  key-value pairs.
// -syntax: {key:value}.
// -we can also create objects inside an object also known as nested objects.

//example1:
// let obj1 = {name: "Aman"};
// console.log(obj1);

// //example2: nested objects
// let obj2 = {name:"Aman",
//     age:22,
//     address:{
//         pin:40022,
//         city: "Mumbai",
//     }
// }
// console.log(obj2);

// // -keys are always string or symbols , and if we use numbers as keys they  are also converted to string.
// //example:
// let obj3 = {10:"aman"}
// console.log(obj3)//ouput: { '10': 'aman' } - as we can see the number used as key here is treated as a string too.

// //*We access the enumerable properties of the object using ==> 'object.key_name' or 'object["key_name"]'.

/**Important NOTE:Enumerable means a property is allowed to be shown/visited when 
 JavaScript goes through an object's properties using things like for...in or Object.keys().**/

 // //example: let's try to access obj2's key
// console.log(obj2.name);//ouput: Aman
// console.log(obj2["name"]);//ouput: Aman

/*------------------------------------------------------------------------------------------------------------------*/

//2.Iterating over the  objects : 
// -There are two ways to iterate over an object :
// a.using for...in loop
// b.using object.keys()

//A.For..in loop:

// -by using  for..in loop we can enumerate through the object's own properties.
//exmple:
// let obj4={
//     name:"Aman",
//     age:22,
// }

// for (let key in obj4) {
//     console.log(key)
// } //this loop will print the enumerable keys: name and age as output.


//B.Object.keys():

// -by using 'Object.keys()' we can create an object that can be inherited from 'proto'.
// -Using 'Object.keys()' we can access  all the eneumerable keys of an object.
// -And it returns array of enumerated properties of it's own object.
//example: let's try to access the propertiesof the obj4.
//console.log(Object.keys(obj4))// output: [ 'name', 'age' ]

/*
So the main question here is when we can access the keys through both the ways then why not just 
use  'for..in' loop only  and why we need 'Object.keys()' also?

Answer: Because there is a problem with  using 'for..in' loop which is when we use for..in loop 
we can access all  inherited enumerable properties too . And to avoid this problem we can use 'Object.keys()'
as it can access only the enumerated properties of it's own object not the inherited ones.
*/

/* -for...in loops through the enumerable properties of an object, including both its own properties and  
     inherited enumerable properties from its prototype chain.
   - `Object.create(proto)` creates a new object that inherits from `proto`.
 */
//example:

// const user = {
//     country:"India"
// }

// let user1  = Object.create(user);

/**Why do we need both?**

- Use `for...in` when you want to check inherited properties too.
- Use `Object.keys()` when you only care about the object's own properties (safer and more predictable).*/


/*------------------------------------------------------------------------------------------------------------------*/

//3. Inheritance with Object.create():

// const baseEmployee = {
//     compony:"Google",
//     role: "SOftware Engineer"
// }

// let employee1 = Object.create(baseEmployee);
// employee1.name = "Aman";
// employee1.id = 12345;;

// console.log(employee1); 
//ouput: { name: 'Aman', id: 12345 }  and it will inherit name and id properties from the baseEmployees.


//Now, what happens with `for...in` and `Object.keys`?

// Inherited enumerable properties can be showned using for..in loop because it includes those properties .
/*for (let i  in employee1) {
  console.log(i);
}
//ouput: as we can see it inherits thr  object's keys of baseEmployees -
name
id
compony
role
*/

/**But for object.keys  it does not include properties from outside of it's own enumerable properties. */

//console.log( Object.keys(employee1));//ouput: [ 'name', 'id' ] -as we can see it does not show inherited properties.

//**Takeaway:** `for...in` walks up the prototype chain. That's why it can print keys you didn't define on the object itself.

/*------------------------------------------------------------------------------------------------------------------*/

//4.Using For..in loop in Arrays:

/*Arrays:
   -Arrays  in JavaScript are also  objects.
   -There numeric indices are stored as keys .
   -And as arrays are also object in JS we can add custom properties too just like any objects. 
*/
//example:
// let arr1 = ["apple","banana","mango"]
// arr1.owner = "Aman";
// arr1.city = "Mumbai";

// console.log(arr1) 
/*ouput: [ 'apple', 'banana', 'mango', owner: 'Aman', city: 'Mumbai' ] as we can see owner 
and city is being added just like anyother object*/

//For..in loop in Array:
// for (let i in arr1) {
//    console.log(i);
// }
/** ouput: we can see it can iterate through all the enumerable properties including the added ones too of the array.
0
1
2
owner
city */

/*
**But there is a problem here in using this loop directly:
- You get extra keys that are not array elements.
- The order is not guaranteed (though usually it follows insertion order, but you shouldn't rely on it).
- It iterates over inherited enumerable properties too (e.g., if someone added a method to `Array.prototype`).
-We should avoid using for...in with arrays because arrays are objects, so for...in can iterate over extra 
   enumerable properties and inherited enumerable properties, not just the array elements.
-We can use for, for...of, or forEach() instead as they only shows the values not the property's names.
*/


//Arrays with for..of loop: (recmmended)

let  fruits = ["apple", "banana", "cherry"];

// fruits.owner = "Bhushan";
// fruits.isFresh = true;

// for (let fruit of fruits) {
//     console.log(fruit);
// } 
/*ouput: as we can see it prints only values of the properties of it's own only not with the added ones.
apple
banana
cherry*/

//Array with forEach() method:
///fruits.forEach(fruit => console.log(fruit));


/*------------------------------------------------------------------------------------------------------------------*/

//## 5. Property Descriptors (The Hidden Attributes)

// Every property in an object has three special boolean flags:

// | Flag | What it does |
// |---|---|
// | writable | Can I change the value? (true = yes, false = read-only) |
// | enumerable | Does it show up in for...in, Object.keys(), etc.? (true = shows up) |
// | configurable | Can I delete the property or change these flags later? (true = yes) |

// By default, when you create a property using `obj.key = value`, all three flags are set to `true`.

// ### A. writable – Read-Only Control:
// let book = {};

// Object.defineProperty(book, 'title' ,{
//     value: "The Alchemist",
//     writable: false,   // cannot change
//     enumerable: false,
//     configurable: false,
// });

//console.log(book.title); // "The Alchemist"

// book.title = "The Monk"; // fails silently (or throws error in strict mode)
// console.log(book.title); // still "The Alchemist"

// for (let key in book) {
//    console.log(key);
// }

//### B. enumerable – Hide from Loops:

// let car = {};

// Object.defineProperty(car, 'VIN', {
//     value: "ABC123XYZ",
//     enumerable: false   // secret – won't appear in loops
// });

// car.model = "Tesla";
// car.color = "Red";

// for (let key in car) {
//     console.log(key);   // "model", "color"  (VIN is missing!)
// }

// console.log(Object.keys(car)); // ["model", "color"]
// console.log(car.VIN);          // "ABC123XYZ"  (still accessible directly)

/*This is important:
enumerable: false does NOT mean the property is inaccessible.
It only means it doesn't appear in enumeration methods such as for...in and Object.keys().

enumerable = false
        ↓
Hidden from enumeration
        ↓
NOT deleted
        ↓
Still accessible directly
*/


// ### C. configurable – Lock the Property:

// If `configurable` is `false`:
// - You cannot delete the property.
// - You cannot change its descriptor flags later (except `writable` can be turned from `true` to `false`, but not back).


// let employee = {};

// Object.defineProperty(employee, 'id', {
//     value: 12345,
//     configurable: false
// });

// Trying to delete

//when  'configurable: false':
// delete employee.id;
// console.log(employee.id); //ouput: 12345 ---> (value is still appeering means deletion failed )

// //when 'configurable: true':
// delete employee.id;
// console.log(employee.id);//ouput: undefined ---> (value is not appeering means deletion successfull)

// Trying to redefine after configering : false
// Object.defineProperty(employee, 'id', {
//     enumerable: true
// }); 
// ouput: TypeError: Cannot redefine property: id

/**
 * Note :
 -writable: false
→ Can't change "The Alchemist"
 -enumerable: false
→ Doesn't appear in for...in/Object.keys()
 -configurable: false
→ Can't delete/reconfigure the property

*/

/*------------------------------------------------------------------------------------------------------------------*/

// ## 6. Object.defineProperty() – In Detail:

// -You use `Object.defineProperty(obj, key, descriptor)` to set these flags.
// **Example – Creating a property with custom settings:**
// let laptop = {};
// Object.defineProperty(laptop, 'serialNumber', {
//     value: "SN-999",
//     writable: false,
//     enumerable: false,
//     configurable: false
// });

// // -Now serialNumber is fully locked – can't change, can't delete, can't loop.
// laptop.brand = "Dell";

// // -To change multiple properties at once, use `Object.defineProperties()`:

// let player = {};
// Object.defineProperties(player, {
//     name: { value: "Bhushan", writable: true, enumerable: true },
//     score: { value: 100, writable: false, enumerable: true }
// });

// ## 7. Inspecting Descriptors

// Use `Object.getOwnPropertyDescriptor(obj, 'key')` to see the flags.
// console.log(Object.getOwnPropertyDescriptor(laptop, 'serialNumber'));
// { value: "SN-999", writable: false, enumerable: false, configurable: false }


// ## 9. Summary Cheat Sheet

// | Concept | Explanation |
// |---|---|
// | for...in | Loops over all enumerable keys (own + inherited). Use for objects, NOT arrays. |
// | Object.keys() | Returns an array of own enumerable keys. Safe and predictable. |
// | Object.create() | Creates a new object that inherits from a prototype. |
// | writable: false | Property becomes read-only. |
// | enumerable: false | Property is hidden from for...in and Object.keys(). |
// | configurable: false | Property cannot be deleted, and its flags cannot be changed later. |
// | Object.defineProperty() | Use to set or change property descriptors. |
// | Arrays are objects | They can hold extra properties → for...in picks them up → bad. |

// ## 10. Final Word of Advice

// - Use `for...in` only for plain objects when you intentionally want inherited properties.
// - Use `Object.keys()` or `Object.entries()` for own properties.
// - For arrays, stick to `for`, `for...of`, or `.forEach()`.
// - Use `Object.defineProperty()` to secure critical data (like IDs, passwords, or internal states).
