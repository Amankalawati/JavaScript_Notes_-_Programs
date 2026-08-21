let arr=[2,4,6,8,9,10];
let target = 2;
let start = 0;
let end = arr.length-1;

while(start<=end)
{
    let mid = Math.floor((start+end)/2);
    if(target == arr[mid])
    {
        console.log("Found");
        //break;
    }
    if(arr[mid]>target)
    {
        end = mid-1;  
    }
    else
    {
        start = mid+1;
    }
}
