let questionBank = [
    {
        quetion: "Who has the most centuries in international cricket?",
        options: ["Sachin Tendulkar", "Virat Kohli", "Ricky Ponting", "Jacques Kallis"],
        answer: "Sachin Tendulkar"
    },
    {
        quetion: "Who is known as the 'God of Cricket'?",
        options: ["Virat Kohli", "Sachin Tendulkar", "MS Dhoni", "Brian Lara"],
        answer: "Sachin Tendulkar"
    },
    {
        quetion: "Which country won the first Cricket World Cup in 1975?",
        options: ["Australia", "India", "West Indies", "England"],
        answer: "West Indies"
    },
    {
        quetion: "Who has scored the most runs in Test cricket?",
        options: ["Sachin Tendulkar", "Ricky Ponting", "Kumar Sangakkara", "Brian Lara"],
        answer: "Sachin Tendulkar"
    },
    {
        quetion: "Who is the highest wicket-taker in international cricket?",
        options: ["Muttiah Muralitharan", "Shane Warne", "James Anderson", "Anil Kumble"],
        answer: "Muttiah Muralitharan"
    },
    {
        quetion: "Which team won the 2011 Cricket World Cup?",
        options: ["Australia", "India", "Sri Lanka", "Pakistan"],
        answer: "India"
    },
    {
        quetion: "Who scored 264 runs in an ODI, the highest individual ODI score at the time?",
        options: ["Rohit Sharma", "Virat Kohli", "Chris Gayle", "AB de Villiers"],
        answer: "Rohit Sharma"
    },
    {
        quetion: "Who is known as the 'Universe Boss'?",
        options: ["Chris Gayle", "Andre Russell", "Kieron Pollard", "Dwayne Bravo"],
        answer: "Chris Gayle"
    },
    {
        quetion: "Which bowler took 800 Test wickets?",
        options: ["Shane Warne", "Muttiah Muralitharan", "James Anderson", "Anil Kumble"],
        answer: "Muttiah Muralitharan"
    },
    {
        quetion: "Who captained India to victory in the 2011 Cricket World Cup?",
        options: ["Sourav Ganguly", "MS Dhoni", "Virat Kohli", "Rahul Dravid"],
        answer: "MS Dhoni"
    },
    {
        quetion: "Which player scored 400 not out in a Test innings?",
        options: ["Brian Lara", "Matthew Hayden", "Sachin Tendulkar", "Virender Sehwag"],
        answer: "Brian Lara"
    },
    {
        quetion: "Which country has won the most Cricket World Cups?",
        options: ["India", "Australia", "West Indies", "Pakistan"],
        answer: "Australia"
    },
    {
        quetion: "Who is the first player to score 200 runs in an ODI innings?",
        options: ["Rohit Sharma", "Sachin Tendulkar", "Virender Sehwag", "Chris Gayle"],
        answer: "Sachin Tendulkar"
    },
    {
        quetion: "Who has the most international wickets among these players?",
        options: ["Shane Warne", "Muttiah Muralitharan", "Anil Kumble", "Wasim Akram"],
        answer: "Muttiah Muralitharan"
    },
    {
        quetion: "Which Indian batsman is nicknamed 'King Kohli'?",
        options: ["Rohit Sharma", "Virat Kohli", "KL Rahul", "Shubman Gill"],
        answer: "Virat Kohli"
    },
    {
        quetion: "Who won the 1983 Cricket World Cup?",
        options: ["India", "West Indies", "Australia", "England"],
        answer: "India"
    },
    {
        quetion: "Which Pakistani bowler is famous for his devastating pace and swing?",
        options: ["Wasim Akram", "Babar Azam", "Shoaib Malik", "Inzamam-ul-Haq"],
        answer: "Wasim Akram"
    },
    {
        quetion: "Who holds the record for the fastest century in men's ODI cricket?",
        options: ["AB de Villiers", "Chris Gayle", "Shahid Afridi", "Virat Kohli"],
        answer: "AB de Villiers"
    },
    {
        quetion: "Which player is famous for the nickname 'Captain Cool'?",
        options: ["MS Dhoni", "Sourav Ganguly", "Rohit Sharma", "Steve Smith"],
        answer: "MS Dhoni"
    },
    {
        quetion: "Who scored the first ever double century in ODI cricket?",
        options: ["Rohit Sharma", "Sachin Tendulkar", "Virender Sehwag", "Sourav Ganguly"],
        answer: "Sachin Tendulkar"
    }
];

//generating quiz questions:
let randomQuestions = [];
for(i=0;i<5;i++){
    let index = Math.floor(Math.random()*questionBank.length);
    randomQuestions.push(questionBank[index]);
   
}
//  console.log(randomQuestions);

//reference:
/* <div class="question">
                <p>1. Who has the most centuries in international cricket?</p>
                 <br>
                <label>
                    <input type="radio" name="q1" value="Virat Kohli"> Virat Kohli
                </label><br>
                <label>
                    <input type="radio" name="q1" value="Ricky Ponting"> Ricky Ponting
                </label><br>
                <label>
                    <input type="radio" name="q1" value="Jacques Kallis"> Jacques Kallis
                </label><br>
// </div> */


//generating options with questions:
randomQuestions.forEach((data,index)=>{
        
let div = document.createElement('div');
div.className="question";

let para = document.createElement('p');
para.innerText = `${index+1}.${data.quetion}`;

div.appendChild(para);
div.appendChild(document.createElement('br'));

let label = document.createElement('label');

let input= document.createElement('input');
input.type="radio";
input.name= `q${index+1}`
input.value=data.options;

label.appendChild(input)
div.appendChild(label)
console.log(div);

})