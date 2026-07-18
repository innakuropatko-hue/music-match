const menu = document.querySelector(".menu");
const quizScreen = document.getElementById("quizScreen");

const questionTitle = document.getElementById("questionTitle");
const questionImage = document.getElementById("questionImage");
const questionSound = document.getElementById("questionSound");
const playSoundBtn = document.getElementById("playSoundBtn");   
const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");

const earTrainingBtn = document.getElementById("earTrainingBtn");
const earTrainingScreen = document.getElementById("earTrainingScreen");
const backFromEarTraining = document.getElementById("backFromEarTraining"); 

const scalesBtn = document.getElementById("scalesBtn");
const scalesScreen = document.getElementById("scalesScreen"); 
const backFromScales = document.getElementById("backFromScales"); 
const homeBtn = document.getElementById("homeBtn");
document.getElementById("homeTitle").style.display = "block";
document.getElementById("earTrainingTitle").style.display = "none";
document.getElementById("scalesTitle").style.display = "none";

earTrainingBtn.addEventListener("click", () => {
    menu.style.display = "none";
    document.getElementById("homeTitle").style.display = "none";
    document.getElementById("earTrainingTitle").style.display = "block";
    document.getElementById("subtitle").style.display = "none";
    menuFooter.style.display = "block"; 
    earTrainingScreen.style.display = "block";
});

backFromEarTraining.addEventListener("click", () => {
    earTrainingScreen.style.display = "none";
    document.getElementById("homeTitle").style.display = "block";
    document.getElementById("earTrainingTitle").style.display = "none";
    document.getElementById("subtitle").style.display = "block";
    menuFooter.style.display = "block";
    menu.style.display = "grid";
});

scalesBtn.addEventListener("click", () => {
    menu.style.display = "none";
    document.getElementById("homeTitle").style.display = "none";
    document.getElementById("scalesTitle").style.display = "block";
    document.getElementById("subtitle").style.display = "none";
    menuFooter.style.display = "block";
    scalesScreen.style.display = "block";
});

backFromScales.addEventListener("click", () => {
    scalesScreen.style.display = "none";
    document.getElementById("homeTitle").style.display = "block";
    document.getElementById("scalesTitle").style.display = "none";
    document.getElementById("subtitle").style.display = "block";
    menuFooter.style.display = "block";
    menu.style.display = "grid"; 
});

const menuFooter = document.getElementById("menuFooter");
let currentQuiz;
let currentQuestion;
let questionIndex = 0;
let score = 0;

function preloadImages(questions) {
    questions.forEach(question => {
        if (question.image) {
            const img = new Image();
            img.src = question.image;
        }
    });
}

// Shuffles quiz questions randomly
function shuffle(array) {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}
function startQuiz(quiz) {
    const title = document.getElementById("homeTitle");
    const subtitle = document.getElementById("subtitle");   
    if (title) title.style.display = "none";
    if (subtitle) subtitle.style.display = "none";
    currentQuiz = {
    ...quiz,
    questions: shuffle(quiz.questions)
    };
    
    questionIndex = 0;
    score = 0;
    menu.style.display = "none";
    earTrainingScreen.style.display = "none";
    scalesScreen.style.display = "none";
    menuFooter.style.display = "none";
    quizScreen.style.display = "block";
    preloadImages(currentQuiz.questions);
    loadQuestion();
}

function loadQuestion() {
    if (questionIndex >= currentQuiz.questions.length) {
        endQuiz();
        return;
    }
    document.activeElement.blur();// Reset button colors
    answer1.classList.remove("correct", "wrong");
    answer2.classList.remove("correct", "wrong");
    answer3.classList.remove("correct", "wrong");

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
            selectedButton.blur();
            feedbackMessage.textContent = "";
            loadQuestion();
        }, 1500);

    } else {

        selectedButton.classList.add("wrong");

        feedbackMessage.textContent = "Try again! ❌";
        feedbackMessage.style.color = "red";

        setTimeout(() => {
            selectedButton.classList.remove("wrong");
            selectedButton.blur();
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
    .getElementById("singleNotesBtn")
    .addEventListener("click", () => startQuiz(quizzes.sounds));
document
    .getElementById("scaleIdentificationBtn")
    .addEventListener("click", () => startQuiz(quizzes.scale_identification));
document
    .getElementById("chordInversionsBtn")
    .addEventListener("click", () => startQuiz(quizzes.chord_inversions));
document
    .getElementById("chordsBtn")
    .addEventListener("click", () => startQuiz(quizzes.chords));
document
    .getElementById("keySignaturesBtn")
    .addEventListener("click", () => startQuiz(quizzes.scales));
document
    .getElementById("dominantsBtn")
    .addEventListener("click", () => startQuiz(quizzes.dominant));

playSoundBtn.addEventListener("click", () => {

    questionSound.currentTime = 0;
    questionSound.play();
});

document.getElementById("homeBtn").addEventListener("click", () => {
    // stop sound safely
    if (questionSound) {
        questionSound.pause();
        questionSound.currentTime = 0;
    }

    
    quizScreen.style.display = "none";
    menu.style.display = "grid";

    // Show home page headers and elements again
    const homeTitle = document.getElementById("homeTitle");
    const subtitle = document.getElementById("subtitle");
    
    if (homeTitle) homeTitle.style.display = "block";
    if (subtitle) subtitle.style.display = "block";
    if (menuFooter) menuFooter.style.display = "block";

    // reset quiz state variables
    currentQuiz = null;
    currentQuestion = null;
    questionIndex = 0;
    score = 0;
});
