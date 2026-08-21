/* let arr = [1,2,3,4,5]

console.log(arr.unshift(5));
console.log(arr);
console.log(arr.pop(5));
console.log(arr); */

let arr = [1,2,3,4,5];
//let lastData = arr.length-1;
let k = 3;
 while(k){
     let lastData = arr[arr.length-1];
     //console.log(lastData);
     for(let i= arr.length-2;i>=0;i--)
      {
       arr[i+1] = arr[i]; 
       //console.log(arr);
     }
 arr[0] = lastData;
 //console.log(arr);
 k--;
 }
 console.log(arr);