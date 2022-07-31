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
const startQ = document.getElementById('startQ');
const firstPg = document.getElementById('firstPg');
const main = document.getElementById('main');
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

/*const displays = document.getElementById('displays'); */
function startQuiz () {
    // alert('Quiz started');
    console.log('Hello');
    console.log('questions length');
    console.log(questions.length);

    currentQ=0;
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

    let timeObj = document.getElementById('time');
    timeObj.innerText = maxTime;
    time = maxTime;
    myInterval=setInterval(timeFunc, 1000);

    console.log('Hello');
    const h1 = document.createElement('h1');

    console.log('questionNo' + questionNo);
    h1.innerText = questions[questionNo].questionText;
    h1.setAttribute("class", "header")

    firstPg.remove();
    newDisplay = document.createElement('section');
    newDisplay.setAttribute("class", "displays")
    newDisplay.appendChild(h1); 
    main.appendChild(newDisplay); 
    opt1 = document.createElement('div');
    opt2 = document.createElement('div');
    opt3 = document.createElement('div');
    opt4 = document.createElement('div');


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
    button1 = document.createElement('button');
    button1.innerText = 'Next';


    newDisplay.appendChild(opt1); 
    newDisplay.appendChild(opt2); 
    newDisplay.appendChild(opt3); 
    newDisplay.appendChild(opt4); 
    newDisplay.appendChild(p); 
    //newDisplay.appendChild(button1); 


    opt1.addEventListener('click', verifyAnswer);
    opt2.addEventListener('click', verifyAnswer);
    opt3.addEventListener('click',  verifyAnswer)
    opt4.addEventListener('click', verifyAnswer);

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
    }
    else {
        console.log ( 'Verify FALSE' );
        resultPara.innerText = 'Incorrect';
    }
    
    
    setTimeout (nextQuestion, 2000)


}

function nextQuestion () {
    console.log ( 'Next Question' );

    newDisplay.remove();
    console.log( 'Questions Length : ' + questions.length );
    console.log( 'CurrentQ : ' + currentQ );
    
    currentQ += 1;
    if (currentQ < questions.length  ) {
        createQuestionPage(currentQ);
    }
    else {
        createResultSection();
    }
  
}

function createResultSection() {
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

/*
    h1.setAttribute("class", "header")

    newDisplay = document.createElement('section');
    newDisplay.setAttribute("class", "displays")
    newDisplay.appendChild(h1); 
    main.appendChild(newDisplay); 
    opt1 = document.createElement('div');
    opt2 = document.createElement('div');
    opt3 = document.createElement('div');
    opt4 = document.createElement('div');


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
    button1 = document.createElement('button');
    button1.innerText = 'Next';


    newDisplay.appendChild(opt1); 
    newDisplay.appendChild(opt2); 
    newDisplay.appendChild(opt3); 
    newDisplay.appendChild(opt4); 
    newDisplay.appendChild(p); 
*/
}

function addUserToHighScore(event ) {

        initialsDiv = event.target.parentElement;
        myInput = initialsDiv.querySelector('input');
        console.log ('Score :', score);
       // myInput = document.querySelector('input');
        console.log ('Initials :', myInput.innerText);
        console.log ( myInput.innerText);
       //highScores.push( { input.innerText, score } );

        newDisplay.remove();
        createFrontPage();

}

function createFrontPage() {
    h1 = document.createElement('h1');
    h1.innerText = 'Coding Quiz Challenge';

    p1 = document.createElement('p');
    p1.innerText = 'Try to answer to following code-related questions within the time limit';

    p2 = document.createElement('p');
    p2.innerText = 'Keep in mind that incorrect answers will penalize your scope time by ten seconds !';

    button = document.createElement('button');
    button.innerText = 'Submit';
    button.setAttribute('id', 'startQ');
    newDisplay.appendChild(h1);
    newDisplay.appendChild(p1);
    newDisplay.appendChild(p2);
    newDisplay.appendChild(button);
    main.appendChild(newDisplay);


}
 

function opt1f(){
    alert('opt1 clicked')
    if ( opt1.innerText === questions[0].answer ) {
        result = true;
    } else {
        result = false;
    }

}


function opt2f(){
    alert('q2 clicked')
    if ( q2.innerText === questions[0].answer ) {
        result = true;
    } else {
        result = false;
    }

}
function opt3f(){
    alert('q3 clicked')
    console.log(q3.innerText);
    console.log(questions[0].answer);
    if ( q3.innerText === questions[0].answer ) {
        result = true;
    } else {
        result = false;
    }

}
function opt4f(){
    alert('q4 clicked')
    if ( q4.innerText === questions[0].answer ) {
        result = true;
    } else {
        result = false;
    }

}


startQ.addEventListener('click', startQuiz)



/* OLD CODE
    opt3.addEventListener('click',  () => {
                   alert('opt3 clicked')
                    console.log(opt3.innerText);
                    console.log('opt3 length : ' + opt3.innerText.length);

                    console.log(questions[0].answer);
                    console.log('questions[0].answer length : ' + questions[0].answer.length);

                   if (  opt3.innerText ===  questions[0].answer ) {
                        result = true;
                        score = score + 50;
                    } else {
                        result = false;
                    }       
                    console.log('result : ' + (opt3.innerText === questions[0].answer) );
                    console.log('result : ' + result );
                    if (result) {
                        p.innerText = 'Correct';
                    } else {
                        p.innerText = 'Incorrect';

                    }


    });

OLD CODE */
