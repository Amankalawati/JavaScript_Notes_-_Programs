//Dates in JS:
//Dates are stored in milliseconds in all the programs and the date is bieng counted from the year 1970 starting from 12'o clock (format : 1970:00:00:00:00) .

//Defsult time taken from the system:
//let date = new Date();
//console.log(date);


//in seconds
// let date = new Date();
// console.log(date.getTime());
// console.log(date.toString());
// console.log(date.toUTCString());
// console)
let newdate = new Date("2026-08-20");
console.log(newdate);

//getting date data:
// let date1 = new Date();
// console.log(date1.getDate());
// console.log(date1.getDay());
// console.log(date1.getMonth());
// console.log(date1.getHours());
// console.log(date1.getMinutes());
// console.log(date1.getSeconds());
// console.log(date1.getFullYear());
//console.log(date1.getDateString);

//setting dates data:
// let date2 = new Date();

// console.log(date2.setDate(21));
// console.log(date2.setTime(10000));
// console.log(date2.setMonth(9));
// console.log(date2.setHours(12));
// console.log(date2.setMinutes(45));
// console.log(date2.setMilliseconds(500));
// console.log(date2.setSeconds(12));

// console.log(date2.toLocaleString());//date: 1/10/1970, 12:45:12 pm


//Countdown Code:

// let date = new Date();

// let date2 = new Date("2028-08-20T00:00:00.000Z");

// let timer = date2 - date;

// const days = Math.floor(timer/1000*60*60*24);

// const hours = Math.floor((timer/1000*60*60)%24);

// const minutes = Math.floor((timer/1000*60)%60);

// const seconds = Math.floor((timer/1000)%60);


setInterval(() =>{
    let date = new Date();

let date2 = new Date("2028-07-14T00:00:00.000Z");

let timer = date2 - date;

const days = Math.floor(timer/(1000*60*60*24));

const hours = Math.floor((timer/(1000*60*60)%24));

const minutes = Math.floor((timer/(1000*60)%60));

const seconds = Math.floor((timer/(1000))%60);

let countdown = document.getElementById("count");
countdown.innerText = `next olompycs countdown 2028: days:${days} / hours:${hours} /minutes:${minutes} / seconds:${seconds} `
//console.log(`next olompycs countdown 2028: days:${days} / hours:${hours} /minutes:${minutes} / seconds:${seconds}`);

})
