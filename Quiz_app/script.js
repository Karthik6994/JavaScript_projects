const quizData = [
  {
    question: "1. Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "let", "const", "All of the above"],
    answer: "All of the above"
  },
  {
    question: "2. Which method is used to write something to the console?",
    options: ["console.write()", "console.log()", "log.console()", "print()"],
    answer: "console.log()"
  },
  {
    question: "3. What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Method",
      "Document Oriented Module",
      "Digital Ordinance Model"
    ],
    answer: "Document Object Model"
  },
  {
    question: "4. Which symbol is used for comments in JavaScript?",
    options: ["//", "/* */", "#", "<!-- -->"],
    answer: "//"
  },
  {
    question: "5. Which company developed JavaScript?",
    options: ["Microsoft", "Google", "Netscape", "Oracle"],
    answer: "Netscape"
  }
];

const quizContainer = document.getElementById("quiz");
const nextBtn = document.getElementById("next");
const resultContainer = document.getElementById("result");

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const q = quizData[currentQuestion];
  quizContainer.innerHTML = `
    <div class="question">
      <p>${q.question}</p>
      ${q.options.map(option => `
        <label>
          <input type="radio" name="q" value="${option}"> ${option}
        </label><br>
      `).join("")}
    </div>
  `;
}

function checkAnswer() {
  const selected = document.querySelector('input[name="q"]:checked');
  if (selected && selected.value === quizData[currentQuestion].answer) {
    score++;
  }
}

nextBtn.addEventListener("click", () => {
  checkAnswer();
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    quizContainer.innerHTML = "";
    nextBtn.style.display = "none";
    resultContainer.innerHTML = `🎉 You scored <b>${score}</b> out of <b>${quizData.length}</b>!`;
  }
});

loadQuestion();
