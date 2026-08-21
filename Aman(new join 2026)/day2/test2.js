//Data types and variables

// variable assignment 
console.log("Constant value:")
const x = 120;
console.log(x);

//using let
console.log("-----------------");
let y = "aman";
y = "abcd";
console.log(y);

//using var
console.log("------------------");
var name = "aman"
name = "kumar"

//Data types:

//1> number :
let  data = 123;
console.log(typeof data);

//2> string:
let data2 = "Aman"
console.log(typeof data2);

//3> bigint:
let data3 = BigInt(112325456467);
console.log(typeof data3)

//4>booleon:
let data4 = true;
let data_4 = false;
console.log(typeof data4);
console.log(data_4);

//5>null:
let data5 = null;
console.log(typeof data5);

//6> undefined:
let data6 ;
console.log(typeof data6);

//7> symbol:
let id1 = Symbol("hello");
let id2 = Symbol("world");

console.log(typeof id1, id2);
