const div = document.getElementById("cart");
const btn = document.getElementById("btn-change-text");
const parentDiv = document.getElementById("main");
const input = document.getElementById("input-text");
const select = document.getElementById("select");
const inputNum = document.getElementById("input-number");

let textInput = "";
let numInput = "";
let cardCount = 0;
let id = 0;
btn.disabled = true;

let dataCards = JSON.parse(localStorage.getItem("cards")) || [];

function buttonState() {
  const isTextInputValid = textInput.trim().length > 0;
  const isNumInputValid = numInput.length === 11;
  const isSelectValid = select.value !== "";
  btn.disabled = !(isTextInputValid && isNumInputValid && isSelectValid);
}

function createAndAppendCard(cardData, parent, index) {
  const card = document.createElement("div");
  card.id = `${id++}`;
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

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "./static/icons/trash.svg";
  deleteIcon.classList.add("delete-icon");
  deleteButton.appendChild(deleteIcon);
  deleteButton.addEventListener("click", () => deleteCard(index));
  card.appendChild(deleteButton);

  const changeButton = document.createElement("button");
  changeButton.classList.add("change-button");
  const changeIcon = document.createElement("img");
  changeIcon.src = "./static/icons/changeBtn.svg";
  changeIcon.classList.add("change-icon");
  changeButton.appendChild(changeIcon);
  changeButton.addEventListener("click", (event) => openForm(event, index));
  card.appendChild(changeButton);

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

function openForm(ev, index) {
  const currentCard = ev.target.parentNode;
  const currentDataCard = dataCards[index];
  currentCard.innerHTML = ""; 

  const changeInputName = document.createElement("input");
  changeInputName.placeholder = "Имя";
  changeInputName.value = currentDataCard.name;

  const changeInputNumber = document.createElement("input");
  changeInputNumber.placeholder = "Телефон";
  changeInputNumber.value = currentDataCard.phone;

  const changeSelectJob = document.createElement("select");
  const options = Array.from(select.options).map((option) => {
    const newOption = document.createElement("option");
    newOption.value = option.value;
    newOption.text = option.text;
    return newOption;
  });
  options.forEach((option) => changeSelectJob.appendChild(option));
  changeSelectJob.value = currentDataCard.jobValue;

  let changeName = changeInputName.value;
  let changeNumber = changeInputNumber.value;
  let changeJob = changeSelectJob.value;

  changeInputName.addEventListener("input", (event) => {
    changeName = event.target.value;
  });

  changeInputNumber.addEventListener("input", (event) => {
    changeNumber = event.target.value;
  });

  changeSelectJob.addEventListener("change", (event) => {
    changeJob = event.target.value;
  });


  const okButton = document.createElement("button");
  okButton.textContent = "OK";
  okButton.addEventListener("click", () => {
    saveEditedData(currentCard, index, changeName, changeNumber, changeJob);
  });

  currentCard.appendChild(changeInputName);
  currentCard.appendChild(changeInputNumber);
  currentCard.appendChild(changeSelectJob);
  currentCard.appendChild(okButton);
}

function saveEditedData(card, index, name, phone, job) {

  dataCards[index] = {
    ...dataCards[index],
    name,
    phone,
    worker: select.options[select.selectedIndex].text,
    jobValue: job,
  };

  localStorage.setItem("cards", JSON.stringify(dataCards));

  switch (job) {
    case "red":
      card.className = "card card-red";
      break;
    case "yellow":
      card.className = "card card-yellow";
      break;
    case "green":
      card.className = "card card-green";
      break;
  }

  renderCards();
}

function deleteCard(index) {
  dataCards.splice(index, 1);
  localStorage.setItem("cards", JSON.stringify(dataCards));
  renderCards();
}

function renderCards() {
  parentDiv.innerHTML = "";
  dataCards.forEach((cardData, index) => {
    createAndAppendCard(cardData, parentDiv, index);
  });
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
  renderCards();

  input.value = "";
  textInput = "";
  inputNum.value = "";
  numInput = "";
  select.value = "";
  btn.disabled = true;
});

renderCards();
