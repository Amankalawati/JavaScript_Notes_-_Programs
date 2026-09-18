// Countdown of the olympic going to happen on july 14 2028:
setInterval(()=>{

let current_date = new Date();
//console.log(current_date);
let olympic_date = new Date("2028-07-14T10:00:00");
//console.log(olympic_date); 

let timer = olympic_date - current_date;
//console.log(timer);

const days = Math.floor(timer/(1000*60*60*24));
//console.log("days:"+days); 

const hours = Math.floor((timer/(1000*60*60))%24);
//console.log("Hours:"+hours);

const min = Math.floor((timer/(1000*60))%60);
//console.log("Minutes:"+min);

const sec = Math.floor((timer/(1000))%60);
//console.log("Seconds:"+sec);

 let countdown = document.getElementById('count');
 countdown.innerHTML=` Days ${days}: Hours ${hours}: Minutes ${min}: Seconds ${sec}`;
//countdown = `next olympics 2028 countdown days ${days} hours ${hours} minutes ${min} seconds ${sec}`;
//console.log(countdown);
},1000);



