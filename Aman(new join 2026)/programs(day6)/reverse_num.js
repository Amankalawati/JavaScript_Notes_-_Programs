let n = 123;
let s = 0;
while(n){
  let r = n%10;
   s = s*10+r;
  let num = Math.floor(n/10);
}
console.log(s);