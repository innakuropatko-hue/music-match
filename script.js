const menu = document.querySelector(".menu");
const quizScreen = document.getElementById("quizScreen");

const questionTitle = document.getElementById("questionTitle");
const questionImage = document.getElementById("questionImage");
const questionSound = document.getElementById("questionSound");
const playSoundBtn = document.getElementById("playSoundBtn");   
const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");
const homeFooter = document.getElementById("homeFooter");
let currentQuiz;
let currentQuestion;
let questionIndex = 0;
let score = 0;
function startQuiz(quiz) {
    const title = document.getElementById("title");
    const subtitle = document.getElementById("subtitle");   
    if (title) title.style.display = "none";
    if (subtitle) subtitle.style.display = "none";
    currentQuiz = quiz;
    questionIndex = 0;
    score = 0;
    menu.style.display = "none";
    homeFooter.style.display = "none";
    quizScreen.style.display = "block";

    loadQuestion();
}

function loadQuestion() {
    if (questionIndex >= currentQuiz.questions.length) {
        endQuiz();
        return;
    }

    currentQuestion = currentQuiz.questions[questionIndex];

    questionIndex++;

    questionTitle.textContent = currentQuiz.prompt;

    if (currentQuestion.type === "image") {

        questionImage.style.display = "block";
        questionSound.style.display = "none";
        questionImage.src = currentQuestion.image;
        playSoundBtn.style.display = "none";

    } else if (currentQuestion.type === "sound") {

        questionImage.style.display = "none";
        questionSound.style.display = "block";
        playSoundBtn.style.display = "inline-block";

        questionSound.src = currentQuestion.sound;
        questionSound.currentTime = 0;
        questionImage.style.display = "none";
        questionSound.play().catch(() => {});
    }

    answer1.textContent = currentQuestion.answers[0];
    answer2.textContent = currentQuestion.answers[1];
    answer3.textContent = currentQuestion.answers[2];
}
function checkAnswer(selectedAnswer, selectedButton) {

    const feedbackMessage = document.getElementById("feedbackMessage");

    if (selectedAnswer === currentQuestion.correct) {

        selectedButton.classList.add("correct");
        score++;
        createMusicNotes();

        feedbackMessage.textContent = "Correct! 🎉";
        feedbackMessage.style.color = "green";

        setTimeout(() => {
            selectedButton.classList.remove("correct");
            feedbackMessage.textContent = "";
            loadQuestion();
        }, 1500);

    } else {

        selectedButton.classList.add("wrong");

        feedbackMessage.textContent = "Try again! ❌";
        feedbackMessage.style.color = "red";

        setTimeout(() => {
            selectedButton.classList.remove("wrong");
            feedbackMessage.textContent = "";
        }, 1000);
    }
}
function createMusicNotes() {

    const notes = ["♪", "♫", "🎵", "♩", "♬"];

    const noteColors = [
        "#FFD700", // gold
        "#FF69B4", // pink
        "#00BFFF", // blue
        "#7FFF00", // green
        "#FF8C00", // orange
        "#BA55D3", // purple
        "#FF0000"  // red
    ];

    for (let i = 0; i < 8; i++) {

        const note = document.createElement("div");

        note.className = "music-note";

        // Add the note symbol here
        note.textContent = notes[Math.floor(Math.random() * notes.length)];

        // Add the rainbow/gold color here
        note.style.color =
            noteColors[Math.floor(Math.random() * noteColors.length)];

        note.style.left =
            Math.random() * 80 + 10 + "%";

        note.style.top =
            "60%";

        note.style.animationDelay =
            Math.random() * 0.5 + "s";

        document.body.appendChild(note);


        setTimeout(() => {
            note.remove();
        }, 2000);
    }
}
answer1.addEventListener("click", () => {
    checkAnswer(answer1.textContent, answer1);
});

answer2.addEventListener("click", () => {
    checkAnswer(answer2.textContent, answer2);
});

answer3.addEventListener("click", () => {
    checkAnswer(answer3.textContent, answer3);
});

function endQuiz() {

    quizScreen.innerHTML = `
        <div class="final-screen">
            <h2>Quiz Complete! 🎵</h2>
            <p>Your score: ${score} / ${currentQuiz.questions.length}</p>
            <button id="returnMenuBtn">Return to Main Menu</button>
        </div>
    `;

    document.getElementById("returnMenuBtn").addEventListener("click", () => {
        location.reload();
    });
}
document
    .getElementById("noteValuesBtn")
    .addEventListener("click", () => startQuiz(quizzes.note_values));
document
    .getElementById("noteNamesBtn")
    .addEventListener("click", () => startQuiz(quizzes.note_names));
document
    .getElementById("ornamentsBtn")
    .addEventListener("click", () => startQuiz(quizzes.ornaments));
document
    .getElementById("dynamicsBtn")
    .addEventListener("click", () => startQuiz(quizzes.dynamics));
document
    .getElementById("earTrainingBtn")
    .addEventListener("click", () => startQuiz(quizzes.sounds)); 
document
    .getElementById("scalesBtn")
    .addEventListener("click", () => startQuiz(quizzes.scales));

playSoundBtn.addEventListener("click", () => {

    questionSound.currentTime = 0;
    questionSound.play();
});

document.getElementById("homeBtn").addEventListener("click", () => {

    // stop sound
    questionSound.pause();
    questionSound.currentTime = 0;

    // return to menu
    quizScreen.style.display = "none";
    menu.style.display = "grid";

    // show home page items again
    document.getElementById("title").style.display = "block";
    document.getElementById("subtitle").style.display = "block";
    homeFooter.style.display = "block";

    // reset quiz
    currentQuiz = null;
    currentQuestion = null;
    questionIndex = 0;
    score = 0;

});