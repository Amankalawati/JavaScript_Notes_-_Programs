//tic_tac_toe
/**
 * what happens in the game?
 * 
 * p1----------> take either X or O 
 * p2----------> take either X or O
 * 
 * if p1(or)p2 ---> X then p1(or)p2--->cannton take O and viceversa
 * -a player can make there move once at a time
 * -a player can make there move where ever on the board but on the empty ones only
 * 
 * 
 * 
 * winning patterns:
 -in case of X:
   |x|x|x|
   |o|o|o| ------> same for this (in case of horizontal pattern) ----> for all the rows
   |o|o|o| 

   |x|o|o|  
   |x|o|o|  ---------->  same for this (in case of vertical pattern) ----> for all the columns
   |x|o|o| ,
   
   |o|o|x|
   |o|x|o|    ------> same for this (in case of diagonal pattern) ----> same for diagonal in opposite case
   |x|o|o| ,
   
-in case of O:
   |o|o|o|
   |x|x|x| ------> same for this (in case of horizontal pattern)----> for all the rows
   |x|x|x| 

   |o|x|x|
   |o|x|x|  ---------->  same for this (in case of vertical pattern) ----> for all the columns
   |o|x|x| ,
   
   |x|x|o|
   |x|o|x|    ------> same for this (in case of diagonal pattern) ----> same for diagonal in opposite case
   |o|x|x| ,
   
   

 */

let p1;
let p2;



