//Arrays Iteration in JavaScript:

//For..Of loop:

// let obj = {
//     name: "Aman",
//     age:22
// }

// console.log(obj)

//if we directly use the for..of loop for iterating in an object  it returns error ,
//TypeError: obj is not iterable
// for (const element of obj) {
//     console.log(element)
// }


//it works with string : 
// let str = "I am a coder";

// for (const element of str) {
//     console.log(element);
    
// }

//also works with arrays: 
//  let arr = [10,20,30,40,50]
// for (const element of arr) {
//     console.log(element)
// }


//Foreach() function:
//syntax: array.forEach(element,index,arrays)
// let arr = [10,20,30,40,50,60]

// arr.forEach((element)=> console.log(element)) // returns only elements in the array
// arr.forEach((element,index)=> console.log(element,index))//returns elements and it's index
// arr.forEach((element,index,arrays)=> console.log(element,index,arrays))//returns elements and index along with entire array.


//Filter(): returns true or false

// let arr2 = [
//     {name:"Aman", marks:100},
//     {name:"Bunty", marks:90},
//     {name:"Jay",marks:80},
//     {name:"Shiv", marks:70},
//     {name:"Ansh",  marks:60}
// ]

// let data= arr2.filter((obj)=>{
//     return obj.marks >= 80;
// })
// console.log(data)

//map(): it does not return anything

// let arr = [10,20,30,40,50]

// let newData = arr.map((element)=>{
//     return element.arr;
// })
// console.log(newData)

// function great(element){
//     console.log(element);
// }

// let newData = arr.map(great)

//Experiment:
//filter() and map()  

let arr2 = [
    {name:"Aman", marks:100},
    {name:"Bunty", marks:90},
    {name:"Jay",marks:80},
    {name:"Shiv", marks:70},
    {name:"Ansh",  marks:60}
]

let newData = arr2.filter((obj)=>(obj.marks >= 70)).map((element)=>console.log(element.marks+2))

