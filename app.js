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

function buttonState() {
  const TextInputValid = textInput.trim().length > 0;
  const NumInputValid = numInput.length === 11;
  const SelectValid = select.value !== "";
  btn.disabled = !(TextInputValid && NumInputValid && SelectValid);
}

input.addEventListener("input", function (event) {
  textInput = event.target.value;
  buttonState();
});

inputNum.addEventListener("keydown", function (event) {
  if (event.key < "0" || (event.key > "9" && event.key !== "Backspace")) {
    event.preventDefault();
  }
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

  const card = document.createElement("div");
  card.className = "card";

  const nameDisplay = document.createElement("p");
  nameDisplay.textContent = `Имя: ${textInput}`;
  card.appendChild(nameDisplay);

  const numberDisplay = document.createElement("p");
  numberDisplay.textContent = `Телефон: ${numInput}`;
  card.appendChild(numberDisplay);

  const selectedOption = select.options[select.selectedIndex];
  const jobDisplay = document.createElement("p");
  jobDisplay.textContent = `Должность: ${selectedOption.text}`;
  card.appendChild(jobDisplay);

  const selectedValue = select.value;
  switch (selectedValue) {
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
  parentDiv.appendChild(card);
});
