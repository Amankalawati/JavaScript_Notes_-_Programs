let str = "India";
let length = str.length;
let data = " ";
for(let i=length-1;i>=0;i--)
{
    data = data+str[i];
}
console.log(data);

//reversing the string using Two_Pointer approach :

let str2 = "Aman";
let arr = str2.split("");
let start = 0;
let end = arr.length - 1;

while(start < end){
    let temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;

    start++;
    end--;
}
str2 = arr.join("");
console.log(str2);