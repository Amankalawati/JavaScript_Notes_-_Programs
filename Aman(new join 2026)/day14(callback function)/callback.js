//Callback Functions:
// A callback fumction is a function that is passed to anither function as a parameter. 
// And it is called as callback function.

function greet(){
    console.log("Hello , I am greet function ");
    goodAfternoon();
    //callback();

}

function goodMorning(){
    console.log("Good Morning");
}

function goodAfternoon(){
    console.log("Good Afternoon");
}


function goodNight(){
    console.log("Good Afternoon");
}

greet(goodAfternoon);
//greet(()=>{
    //console.log("Good night guys");
//})
