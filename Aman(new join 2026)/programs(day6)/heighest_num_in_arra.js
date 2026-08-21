let arr = [10,5,20,30,50,100,90,300,99];
let max = arr[0];

for( let i=1; i<arr.length ; i++)
{
    if(arr[i] > max )
    {
         max = arr[i];
         
    }

}
 console.log("Heighest number in arra: "+max);

 let smax = arr[0];
 for(i=0; i<arr.length;i++)
 {
    if(arr[i] != max && arr[i]>smax)
    {
        smax = arr[i];
    }
 }
 console.log("second heighest: "+smax);

 
 let tmax = arr[0];
 for(i=0; i<arr.length;i++)
 {
    if(arr[i] != smax && arr[i] != max && arr[i]>tmax)
    {
        tmax = arr[i];
    }
 }
 console.log("third heighest: "+tmax);
