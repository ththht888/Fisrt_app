const div = document.getElementById("cart");
const btn = document.getElementById("btn-change-text");
const parentDiv = document.getElementById("main");
const input = document.getElementById("input-text");
const select = document.getElementById("select");
const inputNum = document.getElementById("input-number");

let textInput = "";
let numInput = "";
let cardCount = 0;
btn.disabled = true;

let dataCards = JSON.parse(localStorage.getItem("cards")) || [];

function buttonState() {
  const isTextInputValid = textInput.trim().length > 0;
  const isNumInputValid = numInput.length === 11;
  const isSelectValid = select.value !== "";
  btn.disabled = !(isTextInputValid && isNumInputValid && isSelectValid);
}

function createAndAppendCard(cardData, parent) {
  const card = document.createElement("div");
  card.className = "card";

  const nameDisplay = document.createElement("p");
  nameDisplay.textContent = `Имя: ${cardData.name}`;
  card.appendChild(nameDisplay);

  const numberDisplay = document.createElement("p");
  numberDisplay.textContent = `Телефон: ${cardData.phone}`;
  card.appendChild(numberDisplay);

  const jobDisplay = document.createElement("p");
  jobDisplay.textContent = `Должность: ${cardData.worker}`;
  card.appendChild(jobDisplay);

  const timeDisplay = document.createElement("p");
  timeDisplay.textContent = `${cardData.date}`;
  card.appendChild(timeDisplay);

  switch (cardData.jobValue) {
    case "red":
      card.classList.add("card-red");
      break;
    case "yellow":
      card.classList.add("card-yellow");
      break;
    case "green":
      card.classList.add("card-green");
      break;
  }

  parent.appendChild(card);
}

input.addEventListener("input", function (event) {
  textInput = event.target.value;
  buttonState();
});

inputNum.addEventListener("keydown", function (event) {
  const listParams = ["e", "-", "+", ".", ",", "ArrowUp", "ArrowDown"];
  listParams.forEach((item) => {
    if (item === event.key) {
      event.preventDefault();
    }
  });
});

inputNum.addEventListener("input", function (event) {
  numInput = event.target.value;
  buttonState();
});

select.addEventListener("change", function () {
  buttonState();
});

btn.addEventListener("click", function () {
  cardCount++;

  const originalDate = new Date().toLocaleString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const [datePart, timePart] = originalDate.split(", ");
  const [day, month, year] = datePart.split(".");

  const data = `${year}-${month}-${day} ${timePart}`;

  const selectedOption = select.options[select.selectedIndex];

  const objCard = {
    name: textInput,
    phone: numInput,
    worker: selectedOption.text,
    date: data,
    jobValue: select.value,
  };

  dataCards.push(objCard);
  localStorage.setItem("cards", JSON.stringify(dataCards));
  createAndAppendCard(objCard, parentDiv);

  input.value = "";
  textInput = "";
  inputNum.value = "";
  numInput = "";
  select.value = "";
  btn.disabled = true;
});

dataCards.forEach((cardData) => {
  createAndAppendCard(cardData, parentDiv);
});
