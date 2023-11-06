//List of elements from HTML to manipulate
var testframe = document.getElementById("test");
testframe.style.display = "none";
var results = document.getElementById("result");
var finalScore = document.getElementById("finalScore");
var endOfGame = document.getElementById("end-of-game");
endOfGame.style.display = "none";
var questions = document.getElementById("questions");
var timer = document.getElementById("timer");
var Beginquizbtn = document.getElementById("beginbtn");
var startPage = document.getElementById("firstpage");
var containerForHighScore = document.getElementById("containerforhighscore");
containerForHighScore.style.display = "none";
var highScoresD = document.getElementById("high-scores");
var inputForIntials = document.getElementById("intials");
var displayHighScore = document.getElementById("high-score-intials");
var endGameBtns = document.getElementById("end-games-btns");
var SubmitScoreBtn = document.getElementById("submit-score");
var highScoreList = document.getElementById("highscoretotal");
var button1 = document.getElementById("1");
var button2 = document.getElementById("2");
var button3 = document.getElementById("3");
var button4 = document.getElementById("4");
var savedHighScores = JSON.parse(localStorage.getItem("savedHighScores")) || [];
console.log(savedHighScores);

//Test questions
var testQuestions = [{
    question: "Which of these statements is false?",
    choice1: "All HTML elements can have attributes.",
    choice2: "Attributes do not provide additional information about the elements.",
    choice3: "Attributes are always specified in the start tag.",
    choice4: "Attributes usually come in name/value pairs like: name = 'value'",
    correctAnswer: "2",
},
{
    question: "What does CSS stand for?",
    choice1: "CSS stands for Cascading Sheets with Style",
    choice2: "CSS stands for Continuing Style Sheets",
    choice3: "CSS stands for Cascading Style Strips",
    choice4: "CSS stands for Cascading Style Sheets",
    correctAnswer: "4",
},

{
    question: "What statement regarding JavaScript Display Possibilities is false?",
    choice1: "Writing into an HTML element, using innerHTML",
    choice2: "Writing into an alert box, using windows.alert",
    choice3: "Writing into the browser console, using document.write()",
    choice4: "Writing into the HTML output using document.write()",
    correctAnswer: "3",
},

{
    question: "Which tag is used to create a heading element in HTML?",
    choice1: "head",
    choice2: "title",
    choice3: "heading",
    choice4: "h1",
    correctAnswer: "4",
},
{
    question: "Which of the elements that requires a container tag?",
    choice1: "src",
    choice2: "link",
    choice3: "button",
    choice4: "img",
    correctAnswer: "3",
},
]

//Global variables to add
var finalQuestionIndex = testQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 90;
var timerInterval;
var score = 0;
var correct;

//Function for the object array containing quiz questions
function generateTestQuestions() {

    var currentQuestion = testQuestions[currentQuestionIndex];
    questions.innerHTML = "<p>" + currentQuestion.question + "</p>";
    button1.innerHTML = currentQuestion.choice1;
    button2.innerHTML = currentQuestion.choice2;
    button3.innerHTML = currentQuestion.choice3;
    button4.innerHTML = currentQuestion.choice4;
};

//Starts Test and timer
function startTest() {
    endOfGame.style.display = "none";
    startPage.style.display = "none";
    generateTestQuestions();

    //Timer
    timerInterval = setInterval(function () {
        timeLeft--;
        timer.textContent = "Time left:" + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    testframe.style.display = "block";
}

//End of page screen which will display score when time runs out
function showScore() {
    testframe.style.display = "none";
    endOfGame.style.display = "flex";
    clearInterval(timerInterval);
    inputForIntials.value = "";
    finalScore.innerHTML = "You got " + score + "out of " + testQuestions.length + "right!";
}

//Click of subit button will run funciton highscore
//Pushes new user name and score into the array storing in local storage
SubmitScoreBtn.addEventListener("click", function () {
    if (inputForIntials.value === "") {
        alert("Initials required");
        return false;
    } else {

        var currentPlayer = inputForIntials.value.trim();
        var currentHighScore = {
            name: currentPlayer,
            score: score,
        };

        endOfGame.style.display = "none";
        containerForHighScore.style.display = "flex";


        highScoresD.style.display = "block";

        savedHighScores.push(currentHighScore);
        localStorage.setItem("savedHighScores", JSON.stringify(savedHighScores));
        generateHighScores();
    }
});

//Function that will clear the list and use local storage for new list

function generateHighScores() {
    displayHighScore.innerHTML = "";
    highScoreList.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i = 0; i < highscores.length; i++) {
        var newName = document.createElement("li");
        var newScore = document.createElement("li");
        newName.textContent = highscores[i].name;
        newScore.textContent = highscores[i].score;
        inputForIntials.appendChild(newName);
        highScoreList.appendChild(newScore);
    }
};


// Function that will clear local storage

function clearScore() {
    window.localStorage.clear();
    inputForIntials.textContent = "";
    highScoreList.textContent = "";
}

//Function that will reset test and startover

function replayTest() {
    containerForHighScore.style.display = "block";
    endOfGame.style.display = "flex";
    timeLeft = 90;
    score = 0;
    currentQuestionIndex = 0;
}

//Function that checks the responses with the answers

function checkAnswer(answer) {
    console.log(answer);
    correct = testQuestions[currentQuestionIndex].correctAnswer;
    document.getElementById("result").textContent = "";
    if (answer === correct) {
        score++;
        document.getElementById("result").textContent = "correct";

    } else {
        document.getElementById("result").textContent = "incorrect";
    }

    currentQuestionIndex++;
    if (currentQuestionIndex === testQuestions.length) {
        testframe.style.display = "none";
        containerForHighScore.style.display = "block";
        endOfGame.style.display = "block";
        // endGameBtns.style.display = "flex";
        var finalScore = score * timeLeft;
        console.log(finalScore);
        document.getElementById("score-display").textContent = finalScore;
        generateHighScores();
    } else {
        generateTestQuestions();
    }
}


Beginquizbtn.addEventListener("click", startTest);
