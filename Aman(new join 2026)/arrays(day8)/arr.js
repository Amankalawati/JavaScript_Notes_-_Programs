let arr = [10,"Aman",undefined,null,true,123];

console.log(arr.join());

console.log(arr.length);

console.log(arr.slice(1,4));

console.log(arr.splice(1,3,"Vikas",1234));
console.log(arr);

console.log(arr.unshift("Vikas"));

console.log(arr.shift());

//multi dimensional array:
//these arrays within the array.
let arr2 = [[10,20,30],[40,50,60],[70,80,90]];

console.log(arr2);

console.log(arr2[1][2], arr2[2][1]);

let arr3 = [[10,[20,30]], [40,[50,60,[80,90]]], [70,80,90]];

console.log(arr3[0][1][1]);

console.log(arr3[2][2]);

console.log(arr3.flat(2));