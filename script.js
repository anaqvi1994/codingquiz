var headerEl = document.getElementById("top");
var contentId = document.getElementById("content");

function createElement(element, type, value, text) {
    var tmp = document.createElement(element);
    tmp.setAttribute(type, value);
    tmp.textContent = text;
    return tmp;
};

function createButton(idValue) {
    var tmp = document.createElement("button");
    tmp.setAttribute("type", "button");
    tmp.setAttribute("class", "answers");
    tmp.setAttribute("id", idValue);
    return tmp;
};

function createSpan(idValue) {
    var tmp = document.createElement("span");
    tmp.setAttribute("data-answer", "option" + idValue);
    tmp.setAttribute("id", "option" + idValue);
    return tmp;
};

function appendChild(location, element) {
    var tmp = location.appendChild(element);
    return tmp;
};

function startQuiz(event) {
    event.preventDefault;
    questionList = [];

    var question0 = {
        text: "There are ___ levels of heading in HTML",
        choices: ["1 - Three", "2 - Four", "3 - Five", "4 - Six"],
        correctAnswer: "option4"
    };
    questionList.push(question0);

    var question1 = {
        text: "The purpose of markup is to:",
        choices: ["1 - Add hypertext capabilites", "2 - Enhance the document", "3 - both A&B", "4 - None of the above"],
        correctAnswer: "option2",
    };
    questionList.push(question1);

    var question2 = {
        text: "If we want to define style for a unique element, which CSS selector will we use?",
        choices: ["1 - Id", "2 - text", "3 - class", "4 - name"],
        correctAnswer: "option0",
    };
    questionList.push(question2);

    var question3 = {
        text: "Which of the following tags do not require a terminator?",
        choices: ["1 - <u>", "2 - <br>", "3 - <b>", "4 - All of the above",],
        correctAnswer: "option1",
    };
    questionList.push(question3);

    var question4 = {
        text: "To get an ordered list we use:",
        choices: ["1 - <h1>", "2 - <ul>", "3 - <ol>", "4 - <ml>"],
        correctAnswer: "option2",
    };
    questionList.push(question4);

    var question5 = {
        text: "if we want to wrap a block of text around an image which CSS property will we use? ",
        choices: ["1 - Wrap", "2 - Push", "3 - Float", "4 - Align"],
        correctAnswer: "option2",
    };
    questionList.push(question5);

    var question6 = {
        text: "How can we write comments within the CSS code?",
        choices: ["1 - /*a comment*/", "2 - // a comment //", "3 - / a comment /", "4 - <' a comment '>"],
        correctAnswer: "option0"
    };
    questionList.push(question6);

    var question7 = {
        text: "How do you link JavaScript to HTML?",
        choices: ["1 - <javascript>", "2 - <scripting>", "3 - <script>", "4 - <js>"],
        correctAnswer: "option2"

    };
    questionList.push(question7);

    var question8 = {
        text: "Which of the following is true about variable naming conventions in JavaScript?",
        choices: ["1 - JavaScript variable names must begin with a letter or the underscore character", "2 - JavaScript variable names are case sensitive", "3 - Both of the above", " 4 - None of the above"],
        correctAnswer: "option2"
    };
    questionList.push(question8);

    var question9 = {
        text: "What kind of case is JavaScript written in?",
        choices: ["1 - uppercase", "2 - Mule case", "3 - lowercase", "4 - Camel case"],
        correctAnswer: "option3"
    };
    questionList.push(question9);

    shuffle(questionList);

    var lastQuestionIndex = questionList.length - 1;
    var score = 0;
    var currentQuestionIndex = 0;
    countDown = 75;
    countDownSpan.textContent = countDown;

    document.querySelector("#description").style.display = "none";
    document.querySelector("#start-quiz").style.display = "none";
    contentId.style.textAlign = "left";

    setTime();

    createAnswers();

    renderQuestion();

    var answerList = document.querySelectorAll(".answers");
    for (var i = 0; i < answerList.length; i++) {
        answerList[i].addEventListener('click', checkAnswer)
    };

    function setTime() {
        var timerInterval = setInterval(function () {
            countDown--;
            countDownSpan.textContent = countDown;
            if (countDown === 0) {
                clearInterval(timerInterval);
                gameOver();
            } else if (countDown < 0) {
                clearInterval(timerInterval);
                gameOver();
                countDown = 0
            }
            else if (currentQuestionIndex === lastQuestionIndex) {
                clearInterval(timerInterval);
            }
        }, 1000);
    };

    function createAnswers() {
        var q = questionList[currentQuestionIndex];
        var answers = createElement("div", "id", "answers");
        appendChild(contentId, answers);
        var answersDiv = document.getElementById("answers");
        appendChild(answersDiv, button0);
        appendChild(answersDiv, button1);
        appendChild(answersDiv, button2);
        appendChild(answersDiv, button3);
        for (var i = 0; i < q.choices.length; i++) {
            var textSpan = createSpan(i);
            appendChild(document.getElementById("btn" + i), textSpan)
        };
    };

    function shuffle(array) {
        var currentIndex = array.length;
        var temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };

    function renderQuestion() {
        var q = questionList[currentQuestionIndex];

        questionH1.textContent = q.text;

        for (var i = 0; i < q.choices.length; i++) {
            document.getElementById("option" + i).textContent = q.choices[i];
        }
    };

    function checkAnswer(event) {
        event.preventDefault();
        var wrongAnswer = 10;
        var q = questionList[currentQuestionIndex];
        var userInput = this.children[0].getAttribute("data-answer");
        if (userInput === q.correctAnswer) {
            score++;
            displayCorrect();
        } else {
            countDown = countDown - wrongAnswer;
            countDown.textContent = countDown;
            displayWrong();
        };
        if (currentQuestionIndex < lastQuestionIndex) {
            currentQuestionIndex++;
            renderQuestion();
        } else {
            gameOver();
        };
    };

    function displayCorrect() {
        var correct = createElement("h3", "id", "correct", "Correct!");
        appendChild(document.body, correct);
        timer = 1;
        var timerInterval = setInterval(function () {
            timer--;
            if (timer === 0) {
                clearInterval(timerInterval);
                var element = document.getElementById("correct");
                element.parentNode.removeChild(element);
                timer = 1;
            };
        }, 1000);
    };

    function displayWrong() {
        var wrong = createElement("h3", "id", "wrong", "Wrong!")
        appendChild(document.body, wrong);
        timer = 1;
        var timerInterval = setInterval(function () {
            timer--;
            if (timer === 0) {
                clearInterval(timerInterval);
                var element = document.getElementById("wrong");
                element.parentNode.removeChild(element);
                timer = 1;
            };
        }, 1000);
    };

    function gameOver() {
        countDownSpan.textContent = 0;
        contentId.style.textAlign = "center";
        questionH1.textContent = "GAME OVER"
        hideButtons();
        showScore();
        addInitials()
    }

    function hideButtons() {
        var q = questionList[currentQuestionIndex];
        for (var i = 0; i < q.choices.length; i++) {
            document.getElementById("btn" + i).style.display = "none";
        };
    };

    function showScore() {
        var scoreDiv = createElement("h2", "class", "score", "Score: " + score);
        appendChild(contentId, scoreDiv);
    };

    function addInitials() {
        var input = createElement("input", "type", "text");
        input.setAttribute("id", "input");
        input.setAttribute("placeholder", "Type your initials!");
        input.setAttribute("size", "20");
        var submit = createElement("button", "id", "submit", "Submit");
        var msg = createElement("div", "id", "msg");
        appendChild(contentId, input);
        appendChild(contentId, submit);
        appendChild(contentId, msg);

        document.getElementById("submit").addEventListener("click", function () {
            if (document.getElementById("input").value == "") {
                document.getElementById("msg").textContent = "Please type in your initials!"
            } else {
                var highScoreList = JSON.parse(localStorage.getItem("highScores"));
                if (highScoreList == null) {
                    var highScoreList = [];
                    var newScore = new Object();
                    newScore.initials = document.getElementById("input").value;
                    newScore.score = score;
                    highScoreList.push(newScore);
                    var rankedScore = highScoreList.sort(({ score: a }, { score: b }) => b - a);
                    localStorage.setItem("highScores", JSON.stringify(rankedScore));
                }
                else {
                    var highScore = new Object();
                    highScore.initials = document.getElementById("input").value;
                    highScore.score = score;
                    highScoreList.push(highScore);
                    var rankedScore = highScoreList.sort(({ score: a }, { score: b }) => b - a);
                    localStorage.setItem("highScores", JSON.stringify(rankedScore));
                };
                location.href = "highscores.html"
            };
        });
    };
};

var highScoreDiv = createElement("div", "id", "high-scores");
highScoreDiv.setAttribute("class", "top-position");
appendChild(headerEl, highScoreDiv);
var highScoreA = createElement("a");
highScoreA.setAttribute("href", "highscores.html");
highScoreA.textContent = "View High Scores";
appendChild(document.getElementById("high-scores"), highScoreA);

var countDown = 0;
var timerDiv = createElement("div", "id", "timer", "Timer: ");
timerDiv.setAttribute("class", "top-position");
appendChild(headerEl, timerDiv);
var countDownSpan = createElement("span", "id", "countdown", countDown);
headerEl.childNodes[1].appendChild(countDownSpan);

var questionH1 = createElement("h1", "id", "h1", "Coding Quiz Challenge");
appendChild(contentId, questionH1);

var descriptionDiv = createElement("p", "id", "description", "Try to answer the following code - related questions within the time limit. Keep in mind that incorrect answers will penalize your scoretime by ten seconds!");
appendChild(contentId, descriptionDiv);

var startButton = createElement("button", "id", "start-quiz", "Start Quiz");
startButton.setAttribute("type", "button");
appendChild(contentId, startButton);

var button0 = createButton("btn0");
var button1 = createButton("btn1");
var button2 = createButton("btn2");
var button3 = createButton("btn3");

document.getElementById("start-quiz").addEventListener("click", startQuiz);