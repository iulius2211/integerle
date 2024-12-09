const flashcards = [
  { question: "∫ dx", answer: "x + C" },
  { question: "∫ x dx", answer: "x² / 2 + C" },
  { question: "∫ xⁿ dx", answer: "(xⁿ⁺¹) / (n + 1) + C" },
  { question: "∫ √x dx", answer: "(2 / 3) x√x + C" },
  { question: "∫ eˣ dx", answer: "eˣ + C" },
  { question: "∫ aˣ dx", answer: "aˣ / ln(a) + C" },
  { question: "∫ (1 / x) dx", answer: "ln|x| + C" },
  { question: "∫ (1 / (x² - a²)) dx", answer: "(1 / (2a)) ln|x - a / x + a| + C" },
  { question: "∫ (1 / (x² + 1)) dx", answer: "arctg(x) + C" },
  { question: "∫ (1 / (x² + a²)) dx", answer: "(1 / a) arctg(x / a) + C" },
  { question: "∫ (1 / √(x² - a²)) dx", answer: "ln|x + √(x² - a²)| + C" },
  { question: "∫ (1 / √(x² + a²)) dx", answer: "ln|x + √(x² + a²)| + C" },
  { question: "∫ (1 / √(1 - x²)) dx", answer: "arcsin(x) + C" },
  { question: "∫ (1 / √(a² - x²)) dx", answer: "arcsin(x / a) + C" },
  { question: "∫ sin(x) dx", answer: "-cos(x) + C" },
  { question: "∫ cos(x) dx", answer: "sin(x) + C" },
  { question: "∫ tg(x) dx", answer: "-ln|cos(x)| + C" },
  { question: "∫ ctg(x) dx", answer: "ln|sin(x)| + C" },
  { question: "∫ (1 / cos²(x)) dx", answer: "tg(x) + C" },
  { question: "∫ (1 / sin²(x)) dx", answer: "-ctg(x) + C" },
  { question: "∫ (x / √(x² - a²)) dx", answer: "√(x² - a²) + C" },
  { question: "∫ (x / √(x² + a²)) dx", answer: "√(x² + a²) + C" },
  { question: "∫ (x / √(a² - x²)) dx", answer: "-√(a² - x²) + C" },
];

let currentFlashcard;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const nextButton = document.getElementById("next");

function getRandomFlashcard() {
  const randomIndex = Math.floor(Math.random() * flashcards.length);
  return flashcards[randomIndex];
}

function getRandomAnswers(correctAnswer) {
  const answers = new Set();
  answers.add(correctAnswer);

  while (answers.size < 4) {
    const randomAnswer = flashcards[Math.floor(Math.random() * flashcards.length)].answer;
    if (randomAnswer !== correctAnswer) {
      answers.add(randomAnswer);
    }
  }

  return Array.from(answers).sort(() => Math.random() - 0.5); // Shuffle
}

function displayFlashcard() {
  currentFlashcard = getRandomFlashcard();
  const choices = getRandomAnswers(currentFlashcard.answer);

  questionEl.textContent = currentFlashcard.question;
  optionsEl.innerHTML = choices
    .map(
      (choice, index) =>
        `<label class="option"><input type="radio" name="answer" value="${choice}" id="option${index}"> ${choice}</label>`
    )
    .join("");

  resultEl.textContent = "";
}

document.getElementById("submit").addEventListener("click", () => {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (!selectedOption) {
    resultEl.textContent = "Please select an answer.";
    resultEl.style.color = "red";
    return;
  }

  if (selectedOption.value === currentFlashcard.answer) {
    resultEl.textContent = "Correct!";
    resultEl.style.color = "green";
  } else {
    resultEl.textContent = `Wrong! Correct answer: ${currentFlashcard.answer}`;
    resultEl.style.color = "red";
  }
});

nextButton.addEventListener("click", displayFlashcard);

// Initialize the first flashcard
displayFlashcard();