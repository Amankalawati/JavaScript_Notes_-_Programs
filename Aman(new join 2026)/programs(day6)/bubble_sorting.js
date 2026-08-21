//DAY 10
let arr = [2,10,3,6,5];
console.log(arr);
for(let row = 0;row<arr.length;row++){
    //let isSorted = true;

    for(let j=0; j<arr.length-row-1;j++)
    {
        if(arr[j]>arr[j+1])
        {
            let temp = arr[j];
            arr[j]=arr[j+1];
            arr[j+1] = temp;

          //  isSorted = false;

        }
        //if(isSorted){
        //    return arr;
      //  }
    }
}
console.log("Sorted array:"+arr);
