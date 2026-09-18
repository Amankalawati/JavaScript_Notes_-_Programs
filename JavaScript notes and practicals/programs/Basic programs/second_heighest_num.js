let arr = [29,10,40,339,58,57];
let max1 = arr[0];
let max2 = arr[1];
let max3 = arr[2];
for(let i=0;i<= arr.length;i++)
{
    if(arr[i]>max1)
    {
        max1=arr[i];
          console.log("1:"+max1);
 
    }
   else if(arr[i]>max2)
    {
        max2 = arr[i];   
          console.log("2:"+max2);
 
    }
 
   else if(arr[i]>max3){
        max3=arr[i];
        console.log("3:"+max3);
 
    }
}
console.log("Max1= "+max1, "Max2 = "+max2, "Max3 = "+max3);

 