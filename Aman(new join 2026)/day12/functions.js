//functions continution:
//function with returning value:
function abc(n1,n2){
    return n1+n2;
   //return {name:"Aman"};
   //return "Aman";
}
let data = abc(100,20);
console.log(data);
//function storing in a variable:
let add = function(num1,num2){
 let sum = num1+num2;
 console.log(sum);
}
add(10,20);

// arrow function:
//syntax---> abc()=>{}
let fun = (n1,n2) => n1+n2;
console.log(fun(100,200));

//rest operator: it creates an array of the data passed in the function.
let addition = function(...arr){
let sum = 0;
    for(let i=0;i<arr.length;i++){
        sum += arr[i];
    }
    return sum;

}
let result= addition(10,20,30,40,50);
console.log(result);

let arr = [1,2,3,4,5,6,7,8,9,0];
let copyOfArray = [...arr]; 
console.log(arr);
console.log(copyOfArray);

//spread operator:  spreads the data in the array and the object.
let obj = {
    name:"Aman",
    age:22,
    //nested object
    address:{
        city:"Mumbai"
    }
}
let newObj = {...obj}
console.log(newObj);

//Some Properties of Object:entries,values,keys:
let obj2 = {
    name:"Bhushan",
    age:22,
    address:{
        pincode:12345,
        city:"atlas"
    },
    fun:()=>{console.log("This is a arraow functions")},
    arr:[1,2,3,4,5],
    null:"this is null",
    Boolean:"it's boolean",
    Number:"this is numbers",
    undefined:"this is undefined",
    0:"this is a zero",
    1:"this is number"
}

console.log("---------------------------------------------------");
console.log("Normal object:"+obj2);
console.log("---------------------------------------------------");
//entries:
console.log("Object printing using \"Enteries\" protperties : "+Object.entries(obj2));

console.log("---------------------------------------------------");
//Keys:
console.log("Object printing using \"Keys\" protperties : "+Object.keys(obj2));

console.log("---------------------------------------------------");
//values:
console.log("Object printing using \"Values\" protperties : "+Object.values(obj2));