const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },

];

let newDisplay = null;
let startQ = document.getElementById('startQ');
const firstPg = document.getElementById('firstPg');
const main = document.getElementById('main');
highScoresNode = document.getElementById('leaderboard');
let result=false;
let opt1=null;
let opt2=null;
let opt3=null;
let opt4=null;
let p =null;
let highScores = [];
let score = 0;
let currentQ = -1;
let ques_no = -1;
let myInput = null;
let time = null;
let maxTime = 50;
let myInterval =null;
let prevAnswer = ""

/*const displays = document.getElementById('displays'); */
function startQuiz () {
    // alert('Quiz started');
    console.log('Hello');
    console.log('questions length');
    console.log(questions.length);

    currentQ=0;

    let timeObj = document.getElementById('time');
    timeObj.innerText = maxTime;
    time = maxTime;
    myInterval=setInterval(timeFunc, 1000);


    createQuestionPage(currentQ);


}

function timeFunc () {
    timeObj = document.getElementById('time');
    timeObj.innerText = time - 1;
    time = time - 1;

    if (time <= 0) {
        clearInterval(myInterval);
        if ( newDisplay != null)
        newDisplay.remove();
        createResultSection();
        time=0;

        
    }
    // createResultSection();

}

function createQuestionPage (questionNo) {

    while( main.firstChild) {
        main.removeChild(main.lastChild);
    }

    console.log('Hello');
    const h1 = document.createElement('h1');

    console.log('questionNo' + questionNo);
    h1.innerText = questions[questionNo].questionText;
    h1.setAttribute("class", "header")

    firstPg.remove();
    //newDisplay.remove();
    if (newDisplay != null )
       newDisplay.remove();

    newDisplay = document.createElement('section');
    newDisplay.setAttribute("class", "displays")
    newDisplay.appendChild(h1); 
    main.appendChild(newDisplay); 
    opt1 = document.createElement('div');
    opt2 = document.createElement('div');
    opt3 = document.createElement('div');
    opt4 = document.createElement('div');

    button = document.createElement('button');
    button.innerText = 'Next'
    button.setAttribute("class", "questions");


    opt1.innerText = questions[questionNo].options[0];
    opt2.innerText = questions[questionNo].options[1];
    opt3.innerText = questions[questionNo].options[2];
    opt4.innerText = questions[questionNo].options[3];
    opt1.setAttribute("class", "questions");
    opt2.setAttribute("class", "questions");
    opt3.setAttribute("class", "questions");
    opt4.setAttribute("class", "questions");

    opt1.setAttribute("data-qnum", questionNo);
    opt2.setAttribute("data-qnum", questionNo);
    opt3.setAttribute("data-qnum", questionNo);
    opt4.setAttribute("data-qnum", questionNo);


    p = document.createElement('p');
    p.innerText = "";

    button1 = document.createElement('button');
    button1.innerText = 'Next';


    newDisplay.appendChild(opt1); 
    newDisplay.appendChild(opt2); 
    newDisplay.appendChild(opt3); 
    newDisplay.appendChild(opt4); 
    newDisplay.appendChild(p); 
    newDisplay.appendChild(button1); 

    //newDisplay.appendChild(button1); 


    opt1.addEventListener('click', verifyAnswer, { once: true });
    opt2.addEventListener('click', verifyAnswer,{ once: true });
    opt3.addEventListener('click',  verifyAnswer,{ once: true });
    opt4.addEventListener('click', verifyAnswer,{ once: true });
    button1.addEventListener('click', nextQuestion);

}

function verifyAnswer(event) {
    const opt = event.target;
    resultPara = opt.parentElement.querySelector('p');
    console.log ( 'Opt clicked');
    console.log ( 'Opt inner text : ' + opt.innerText);
    
    let qnumber = opt.getAttribute('data-qnum');

    console.log ( 'Q num : ' + qnumber );
    console.log ("Answer : " + questions[qnumber].answer ) ;

    if (opt.innerText === questions[qnumber].answer ) {
        console.log ( 'Verify TRUE' );
        score += 50;
        resultPara.innerText = 'Correct';
        prevAnswer = 'Correct'  ;
    }
    else {
        console.log ( 'Verify FALSE' );
        resultPara.innerText = 'Incorrect';
        prevAnswer = 'Correct'  ;

    }
    
    //nextQuestion();
   // setTimeout (nextQuestion, 1000)


}

function nextQuestion (event) {
    const opt = event.target;
    resultPara = opt.parentElement.querySelector('p');
    resultPara.innerText = '';


    console.log ( 'Next Question' );

    newDisplay.remove();
    console.log( 'Questions Length : ' + questions.length );
    console.log( 'CurrentQ : ' + currentQ );
    
    currentQ += 1;
    if (currentQ < questions.length  ) {
        createQuestionPage(currentQ);
    }
    else {
        newDisplay.remove();
        createResultSection();
    }
  
}

function createResultSection() {


    clearInterval(myInterval);
    time=0;
    timeObj = document.getElementById('time');
    timeObj.innerText = 0;


    console.log ( 'Result Section' );
    console.log('Hello');
    const h1 = document.createElement('h1');

    h1.innerText = 'All done !'
    scoreDiv = document.createElement('div');
    scoreDiv.innerText = 'Your final score is :' + score;
    breakLine = document.createElement('br');

    initialsDiv = document.createElement('div');
    initialsSpan = document.createElement('span');
    initialsSpan.innerText = 'Enter initials :'
    myInput = document.createElement('input');
    myInput.setAttribute('type', 'text')
    button = document.createElement('button');
    button.innerText = 'Submit';
    button.setAttribute("id", "startQ")

    initialsDiv.appendChild(initialsSpan); 
    initialsDiv.appendChild(myInput); 
    initialsDiv.appendChild(button); 

    //myInput.innerText = 'MRRRR';
    //console.log ('myInput : ', myInput.innerText);


    newDisplay = document.createElement('section');
    newDisplay.appendChild(h1); 
    newDisplay.appendChild(scoreDiv); 
    newDisplay.setAttribute("class", "result")
    newDisplay.appendChild(breakLine); 
    newDisplay.appendChild(initialsDiv); 
    main.appendChild(newDisplay);

    button.addEventListener('click', addUserToHighScore ) ;


}

function addUserToHighScore(event ) {

        initialsDiv = event.target.parentElement;
        myInput = initialsDiv.querySelector('input');
        console.log ('Score :', score);
       // myInput = document.querySelector('input');
        console.log ('Initials :', myInput.value);
        const player = [];
        player.name = myInput.value;
        player.score = score;
        //highScores.push( { $(myInput.value), $(score) } );
        highScores.push(player);
        console.log('highScores');
        console.log(highScores);


       // main.querySelectorAll('section').forEach(el=>el.remove());
//    const child =    main.querySelectorAll('section');
  //  console.log('child');
   // console.log(child);
    //setInterval( ()=> console.log('Timer'), 10000);
    //main.querySelectorAll('text').forEach(el=>el.remove());
      while( main.firstChild) {
        main.removeChild(main.lastChild);
      }

        createFrontPage();

}

function createFrontPage() {
    newDisplay.remove();
   // console.log('main');
    //console.log(main);
    score=0;
    newDisplay = document.createElement('section');
    newDisplay.setAttribute("class","displays");
    h1 = document.createElement('h1');
    h1.innerText = 'Coding Quiz Challenge';

    p1 = document.createElement('p');
    p1.innerText = 'Try to answer to following code-related questions within the time limit';

    p2 = document.createElement('p');
    p2.innerText = 'Keep in mind that incorrect answers will penalize your scope time by ten seconds !';

    br = document.createElement('br');
    button = document.createElement('button');
    button.innerText = 'Submit';
    button.setAttribute('id', 'startQ');
    newDisplay.appendChild(h1);
    newDisplay.appendChild(p1);
    newDisplay.appendChild(p2);
    //newDisplay.appendChild(br);

    newDisplay.appendChild(button);
    main.appendChild(newDisplay);

    startQ = document.getElementById('startQ');
    
    startQ.addEventListener('click', startQuiz)

}
 
 
function displayHighScores() {
    console.log(highScores);

    if (firstPg != null )
        firstPg.remove();

    if (newDisplay != null )
        newDisplay.remove();
   // console.log('main');
    //console.log(main);
    newDisplay = document.createElement('section');
    newDisplay.setAttribute("class","displays");
    h1 = document.createElement('h1');
    h1.innerText = 'Highscores';
    newDisplay.appendChild(h1);

    p1 = document.createElement('p');

    highScores.forEach( (item, index) => {
       const str = (index+1) +'. ' + item.name  + ' - ' + item.score;
       console.log('Str :');
       console.log(str);
       const p2 = document.createElement('p');
       p2.innerText = str;
       newDisplay.appendChild(p2);
       

    });

    console.log(highScores);
    //newDisplay.appendChild(p1);

    br = document.createElement('br');
    button = document.createElement('button');
    button.innerText = 'Go Back';
    button.setAttribute('id', 'GoBack');
    button.setAttribute('id', 'startQ');

    newDisplay.appendChild(button);

    main.appendChild(newDisplay);
    main.appendChild(newDisplay);

    button.addEventListener('click', goBack);
/*    p1.innerText = 'Try to answer to following code-related questions within the time limit';

    p2 = document.createElement('p');
    p2.innerText = 'Keep in mind that incorrect answers will penalize your scope time by ten seconds !';

    br = document.createElement('br');
    button = document.createElement('button');
    button.innerText = 'Submit';
    button.setAttribute('id', 'startQ');
    newDisplay.appendChild(h1);
    newDisplay.appendChild(p1);
    newDisplay.appendChild(p2);
    //newDisplay.appendChild(br);

    newDisplay.appendChild(button);
    main.appendChild(newDisplay);

    startQ = document.getElementById('startQ');
    
    startQ.addEventListener('click', startQuiz)*/
    
}

function goBack() {
    newDisplay.remove();
    createFrontPage();

}

startQ.addEventListener('click', startQuiz)
highScoresNode.addEventListener('click', displayHighScores)



