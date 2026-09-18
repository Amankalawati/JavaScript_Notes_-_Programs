//-----------** Strings **-----------// 
//String are sequence of set of charecters .
//there are three ways to create or declare a string .
//string are immutable .

//1) Using single qoutes (' '):

let str1 = 'Using single qoutes: Aman ';
console.log(str1);

//2) Using double qoutes (" "):

let str2 = "Using double qoutes: Aman";
console.log(str2);


//3) Using template literals (`${}`), writing string in backticks (` `) :

let name = "Aman";
let age = 22;
let str3 = `Using template literals: My name is ${name} and my age is ${age}.`;
console.log(str3);


//basic string functions:
//1)toUpperCase()-----> it converts all the charectersof a string into an upercase :
console.log(name.toUpperCase());
//2)toLowerCase()-----> it converts all the charectersof a string into an lowercase :
console.log(name.toLowerCase());
//3)charAt(index) -----> shows the charecter present in the given index number:
console.log(name.charAt(3));
//4)str[indedx] shows the charecter present in the given index:
console.log(name[2]);
//5)length -----> shows the length of a string  :
console.log(name.length);


//-----String concatination (using :+): --------//
//string concationaton is a way by which we can combine some set of arrays into a single string and plus(+) symbol is used for concatination.

let str4 = "My name is "+name+" and my age is "+age+" and i am a coder.";
console.log(str4);

//-----String slicing : ---------//
/**string slicing is a way in which we can extract some portions from the original string and create a new string out of it without changing 
or the original as strings are immutable.**/ 

//using slice() to slice the string :
let str5 = "Aman12345";
console.log(str5.slice(0,6));
console.log(str5.slice(-9,-1));

//using replace() and replaceAll() to replace a sub string from the required sub string :

/* replace() ---> will replace a sub string or the string for once for example 
if there is a sub string that has bien repeated multiple times then this function will replace only one sub string which comes the first time not all.
and to make all the sub string in the string with the given sub string we have to use replaceAll() function. **/

let str6 = "Hello world! let's learn react and master react language.";

//replace():
console.log(str6.replace("react","javaScript"));

//replaceAll():
console.log(str6.replaceAll("react","javaScript"));

//splitting the string using split() :
//this function splits the string and convert it into an array of sub-string and it splits the array by using  delimiter or splitter.
let str7 = "Red,Blue,Green,Black";
console.log(str7.split());

//There is a 4rth way too to declare or create a string and that is to use the 'new' keyword:
let str8 = new String("Aman54321");
console.log(str8);


let str = "   Welcome to JavaScript!   ";

console.log(str.trim().length); // Output: 29
