// console shows error when loading bar/timer can no longer be displayed when function results is called and wipes innerHTML of everything that isnt on the results page.

//When time is out program resets but i havent been able to figure out how to show results page without reseting


$(document).ready(function() {

//progress bar timer
function move() {
    var elem = document.getElementById("myBar"); 
    var width = 0;
    var id = setInterval(frame, 300);
    function frame() {
      if (width == 100) {
        clearInterval(id);
        // if timer reaches full show results page with showScores
        showScores();
      } else {
        width++; 
        elem.style.width = width + '%'; 
      }
    }
  }move();
  
  //60 second timer function alerts "game over" when complete
  function countdown() {
    var seconds = 31;
    function tick() {
        var counter = document.getElementById("timeLeft");
        seconds--;
        counter.innerHTML = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
        } 
    }
    tick();
}

countdown();

});

// if questions length === questionsIndex show scores
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        //show choices
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++){
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        showProgress();
    }
};

// when an answer button is clicked quiz.guess is set to guess and function runs next question
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};

//displays what question you are currently on out of 5
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}

//shows score and clears html of page to get rid of questions and only display score
function showScores(){
    var gameOverHtml = "<h1>Result</h1>";
    gameOverHtml += "<h2 id='score'> Your scores: " + quiz.score + "/5</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHtml;

    $('#quiz').append("<button>Restart Quiz</button>");
    
    $('button').on('click', function(){
        location.reload();
    });
}

// function sets object format for question
function Question(text, choices, answer){
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

// prototype adds correctAnswer property if property = correct answer
Question.prototype.correctAnswer = function (choice) {
    return choice === this.answer;
}

// starts questions area at index of 0 and sets score to 0 
function Quiz(questions){
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

// returns the question array's index with a question
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

//function to tell when the questions have all been answered 
Quiz.prototype.isEnded = function () {
    return this.questions.length === this.questionIndex;
}

// adds +1 score counter if answer matches choice
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().correctAnswer(answer)) {
        this.score++;
    
        // if score is 5/5
        if(this.score === 5){
            alert("You Passed!");
        }

    }
    this.questionIndex++;
   
}


// array of questions to be displayed in format
var questions = [
    new Question("What is the most expensive item in runescape?", ["Twisted Bow", "Scyth of Vitur", "Goblin Mail", "Purple Party Hat"], "Scyth of Vitur"),
    new Question("Where is the most reliable source of info on runescape?", ["google", "runewiki", "yahoo", "books"], "runewiki"),
    new Question("What is the maxium amount of gold a character can have in runescape", ["100 coins", "2147M coins", "1B coins", "There is no limit"], "2147M coins"),
    new Question("What year did OSRS servers date back to?", ["2007", "2001", "1990", "2015"], "2007"),
    new Question("What is the best money making boss in runescape?", ["Kalphite Queen", "King Black Dragon", "Zulrah", "Raids"], "Raids")
];


 var quiz = new Quiz (questions);



populate();