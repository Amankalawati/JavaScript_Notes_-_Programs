//Strings are a sequence of charecters.
//There are 3 ways to create a string.

//1) Using single qoutes:
let name = 'Aman';
console.log(name);

//2)Using double qoutes:
let fname = "Aman";
console.log(fname);

//3)Using template literals:
let age = 22;
let str = `My name is ${fname}.\nMy age is ${age}.`;
console.log(str);

let str1 = "JavaScript";

//toLowerCase():
//console.log(str1.toLowerCase());
//console.log(str1.toUpperCase());

//Reversing the string:


// let length = str2.length;
// let data = " ";

// for(let i= length-1; i>=0;i--)
// {
//     data =data+str2[i];
// }
// console.log(data);


//method 1:
// let str2 = "Aman";
// //method 2:
// let start = 0;
// let end  = str2.length-1;

// while(start<= end)
// {
//     let temp = str2[start];
//     str2[start] = str2[end];
//     str2[end] = temp;

//     console.log(start);
//     console.log(end);
//     start++;
//     end--;
//     console.log(str2);
// }
// // console.log(str2);

//Sorting an array:
//Selection sort:

let arr = [2,4,1,5,3,9,11];
 
for(let row= 0; row<arr.length;row++)
{
    let index = row;
    for(let j= row+1; j<arr.length;j++)
    {
        if(arr[j]<arr[index])
        {
            index=j;
        }
    }

    let temp = arr[row];
    arr[row]= arr[index];
    arr[index] = temp;
}
  console.log(arr);
