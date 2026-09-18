let arr = [29,10,40,339,58,57,8,12];
let min1 = arr[0];
let min2 = arr[1];
// let min3 = 0;
let min3 = arr[2];
for(let i=0;i<= arr.length;i++)
{
    if(arr[i]<min1)
    {
        min1=arr[i];
    }
    else if(arr[i]<min2)
    {
        min2 = arr[i];
    
    }
    else if(arr[i]<min3){
        min3=arr[i];
    }
}
console.log("Min1= "+min1, "Min2 = "+min2, "Min3= "+min3 );

// if(arr[0]>arr[1])
// {
//     min1=arr[0];
//     min2=arr[1];
//     min3=arr[2];
// }
// else{
//     min1=arr[2];
//     min2=arr[1];
//     min3=arr[0];
// }

// for(i=0;i<arr.length;i++)
// {
//    if(arr[i]<min1)
//    {
//     min2=min1;
//     min1=arr[i];
//    }
//    else if(arr[i]<min2){
//     min3=min2
//     min2=arr[i];
//    }
//    else if(arr[i]<min3){
//     min3=arr[i];
//    }
// }
// console.log("m1:"+min1,"m2:"+min2,"m3:"+min3);

