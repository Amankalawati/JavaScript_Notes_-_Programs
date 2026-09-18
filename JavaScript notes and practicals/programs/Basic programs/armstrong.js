let n = 371;
let s = 0;
while(n)
{
    let r = n%10;
    s = s+r**3;
    n = Math.floor(n/10);
}
console.log(s)