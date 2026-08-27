//JavaScript : Copying, Memory and References.

// In memory the data lives in two parts: 1.Primitive and 2.Objects
//1.Primitive :  It is the data itself for example storing a string , number, boolean , bigint, etc
//let object  = {name: "Aman", age:22};// here the premitive will hold  variable "object"

//2.Object : in object the reference of the data will be pointed. For example {},[] or finction(){}.

// **Mental Model:**

// ```
// Primitive:     variable → [ 10 ]
// Object:        variable → [ 0x001 ] → { name: "Vikash" }
//                               ▲
//                          (Memory Address)



// let obj1 = {name:"Aman", age:22}
// console.log(obj1); 

//reference copy :
// let obj2 = obj1;
// obj2.name = "Bhushan";//it will change the name value of the original one as it referce to that obj1 name key. And it is  called as reference copy.
// console.log(obj1);

//Shoallow copy :
let data = { name: "Bhushan",
    age:25,
    address:{                       // <=== a nested Object
        pin:402201,
        city : "Mumbai"  
    }
}

console.log(data);

let  obj2 ;

obj2 = {...data};

obj2.name = "Aman";
obj2.address.city = "lucknow";
console.log(obj2);

console.log(data);