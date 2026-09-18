let n = 1234;
let s = 0;

while(n)
{
    let r = n%10;
    s = s*10 + r;
    n = Math.floor(n/10);
}
console.log(s);