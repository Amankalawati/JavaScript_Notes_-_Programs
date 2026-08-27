//JavaScript Objects : Deep dive 
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------


//In Object: 

//forin loop in bject:

// let obj = {
//     name: "Aman",
//     age:22,
//     city:"Mumbai",
//     key: "I am in object 1.",
// }
//ways to access the keys of an object:
//1.directly accessing th object:  
// console.log(obj.name);

//2.through forin loop:
//*for in loop
// for(let i=0; i<=Object.defineProperty(obj);i++){
//     console.log(i);
// }


//we can access the keys of an object without 'forin' loop but why we still use it?
//we can use forin loop when we want to see keys or keys and  there values.


//accessing  keys of obj through 'forin' loop.
// let obj = {
//     name: "Aman",
//     age:22,
//     city:"Mumbai",
//     key: "I am in object 1.",
// }
// // for (let data in obj ){

// //     //console.log(data,":",obj[data])
   
// // }

// let obj2 = {
//     name2: "my name is khan!.",
//     name3: "Hakla!...."
// }


//------------------------------------------------------------------------------------------

//accessing the object through 'Object.keys()':
//use it when we want to access or see only the object' keys as it return the array of it's own 
// enumerable property's keys and ignore the inherited ones.
//it cannot show there values  and if we try to print there values uisng this it will print 'Undefined'. 

// let obj = {
//     name: "Aman",
//     age:22,
//     city:"Mumbai",
//     key: "I am in object 1.",
// }
// let obj2 = {
//     name2: "my name is khan!.",
//     name3: "Hakla!...."
// }
// let key = Object.keys(obj2);
// console.log(Object.keys(obj2))
// console.log(obj[key])//ouput:undefined


//------------------------------------------------------------------------------------------

//inheriting obj's keys also in obj2:

// let obj = {
//     name: "Aman",
//     age:22,
//     city:"Mumbai",
//     key: "I am in object 1.",
// }
// let obj2 = {
//     name2: "my name is khan!.",
//     name3: "Hakla!...."
// }
//obj2.__proto__ = obj; 
// for (let data2 in obj2) {
//     console.log(data2)
// }


// Object.defineProperty(Object.prototype,'toString',{enumerable:true})
// for (let data2 in obj2) {
//     console.log(data2)
// }























//---------------------------------------------------------------------------------------------------------
//Forin loop in arrys:
//we don't use forin loop in case of arrays.
//Why we don't use 'Forin' loop for arrays?
// let arr = [10,20,30,40];

// arr.name = "Aman" ;
// arr.age = 22;

// console.log(arr);

// for (let data in arr) {
    
//     console.log(data);
// }
//ans: because  array is also a type of object in javaScript therefor 'Forin' loop can access all the keys of it. 