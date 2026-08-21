//Finding the first and second occerance of the target value:

let arr = [1,2,3,4,5,,6,7,4,8,9];
let target = 4;
let mid = Math.floor(arr.length/2);
let index = -1;

let start = 0;


for(let i=0;i<arr.length-1;i++)
{
    if(target == arr[mid])
    {
        index = mid;
        end = mid-1;

        
    }

}//not complete yet