let n = 11;
let isPrime = true;
let i;
for( i=2;i<n;i++)
{
    if(n%i == 0)
    {
        isPrime = false;
    }
}
if(isPrime){

        console.log(" is prime.");
    }
else{
        console.log(" is not prime.");
}
