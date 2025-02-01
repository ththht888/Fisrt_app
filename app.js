const div = document.getElementById("cart");
const btn = document.getElementById("btn-change-text");
const parentDiv = document.getElementById("main");
const input = document.getElementById("input-text");
const select = document.getElementById("select");
const inputNum = document.getElementById("input-number");

let textInput = "";
let numInput = "";
// let cardCount = 0;
let id = 0;
// btn.disabled = true;

// let dataCards = JSON.parse(localStorage.getItem("cards")) || [];
let dataCards = [];
getData();

function buttonState() {
  // const isTextInputValid = textInput.trim().length > 0;
  // const isNumInputValid = numInput.length === 11;
  // const isSelectValid = select.value !== "";
  btn.disabled = !(textInput && numInput && select.value);
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
  jobDisplay.textContent = `Должность: ${cardData.jobPosition}`;
  card.appendChild(jobDisplay);

  const timeDisplay = document.createElement("p");
  timeDisplay.textContent = `${cardData.createDate}`;
  card.appendChild(timeDisplay);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "./static/icons/trash.svg";
  deleteIcon.classList.add("delete-icon");
  deleteButton.appendChild(deleteIcon);
  deleteButton.addEventListener("click", () => deleteCard(index));
  card.appendChild(deleteButton);

  const changeButton = document.createElement("div");
  changeButton.classList.add("change-button");
  changeButton.addEventListener("click", (event) => openForm(event, index));
  card.appendChild(changeButton);

  switch (cardData.jobPosition) {
    case "Администратор":
      card.classList.add("card-red");
      break;
    case "Девопс":
      card.classList.add("card-yellow");
      break;
    case "Разработчик":
      card.classList.add("card-green");
      break;
    case "Тестировщик":
      card.classList.add("card-green");
      break;
  }

  parent.appendChild(card);
}

function openForm(ev, index) {
  const currentCard = ev.target.parentNode;
  const currentDataCard = dataCards[index];
  currentCard.innerHTML = "";

  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Имя: ";
  const changeInputName = document.createElement("input");
  changeInputName.type = "text";
  changeInputName.value = currentDataCard.name;

  const nameContainer = document.createElement("div");
  nameContainer.appendChild(nameLabel);
  nameContainer.appendChild(changeInputName);

  const phoneLabel = document.createElement("label");
  phoneLabel.textContent = "Телефон: ";
  const changeInputNumber = document.createElement("input");
  changeInputNumber.type = "number";
  changeInputNumber.placeholder = "Телефон";
  changeInputNumber.value = currentDataCard.phone;

  changeInputNumber.addEventListener("keydown", function (event) {
    const listParams = ["e", "-", "+", ".", ",", "ArrowUp", "ArrowDown"];
    listParams.forEach((item) => {
      if (item === event.key) {
        event.preventDefault();
      }
    });
  });

  changeInputNumber.addEventListener("input", function (event) {
    if (event.target.value.length > 11) {
      event.target.value = event.target.value.slice(0, 11);
    }
  });

  const phoneContainer = document.createElement("div");
  phoneContainer.appendChild(phoneLabel);
  phoneContainer.appendChild(changeInputNumber);

  const jobLabel = document.createElement("label");
  jobLabel.textContent = "Должность: ";
  const changeSelectJob = document.createElement("select");
  const options = Array.from(select.options)
    .filter((option) => option.value !== "")
    .map((option) => {
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

  const jobContainer = document.createElement("div");
  jobContainer.appendChild(jobLabel);
  jobContainer.appendChild(changeSelectJob);

  const okButton = document.createElement("button");
  okButton.classList.add("ok-button");
  const okIcon = document.createElement("img");
  okIcon.src = "./static/icons/ok.svg";
  okIcon.classList.add("ok-icon");
  okButton.appendChild(okIcon);
  okButton.addEventListener("click", () => {
    saveEditedData(currentCard, index, changeName, changeNumber, changeJob);
  });

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("cancel-button");
  const cancelIcon = document.createElement("img");
  cancelIcon.src = "./static/icons/cancel.svg";
  cancelIcon.classList.add("cancel-icon");
  cancelButton.appendChild(cancelIcon);
  cancelButton.addEventListener("click", () => {
    renderCards();
  });

  currentCard.appendChild(nameContainer);
  currentCard.appendChild(phoneContainer);
  currentCard.appendChild(jobContainer);
  currentCard.appendChild(okButton);
  currentCard.appendChild(cancelButton);
}

function saveEditedData(card, index, name, phone, job) {
  const selectedOption = Array.from(select.options).find(
    (option) => option.value === job
  );

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

  const formattedDate = `${year}-${month}-${day} ${timePart}`;

  const updatedCard = {
    id: dataCards[index].id,
    name: name,
    phone: phone,
    jobPosition: selectedOption.text,
    date: formattedDate,
  };
  const url = `http://localhost:8080/task/${updatedCard.id}`;
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedCard),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      getData();
    })
    .catch((e) => console.error(e));
}

// dataCards[index] = {
//   ...dataCards[index],
//   name,
//   phone,
//   worker: selectedOption.text,
//   jobValue: job,
//   date: formattedDate,
// };

// localStorage.setItem("cards", JSON.stringify(dataCards));

// switch (job) {
//   case "Администратор":
//     card.className = "card card-red";
//     break;
//   case "Девопс":
//     card.className = "card card-yellow";
//     break;
//   case "Разработчик":
//     card.className = "card card-green";
//     break;
//   case "Тестировщик":
//     card.className = "card card-green";
//     break;
// }

// renderCards();

// function deleteCard(index) {
// dataCards.splice(index, 1);
// localStorage.setItem("cards", JSON.stringify(dataCards));
// renderCards();
// }
function deleteCard(index) {
  const cardId = dataCards[index].id;
  const url = `http://localhost:8080/task/${cardId}`;
  fetch(url, {
    method: "DELETE",
  })
    .then((response) => {
      console.log(response);
      getData();
    })
    .catch((e) => console.error(e));
}

function renderCards() {
  parentDiv.innerHTML = "";
  dataCards.forEach((cardData, index) => {
    createAndAppendCard(cardData, parentDiv, index);
  });
}

function getData() {
  fetch("http://localhost:8080/task/all", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      dataCards = res;
      console.log(dataCards);
      renderCards();
    })
    .catch((e) => console.log(e, "catch"));
}

function createCard(card) {
  fetch("http://localhost:8080/task/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      getData();
    })
    .catch((e) => console.error(e));
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
  if (event.target.value.length > 11) {
    event.target.value = event.target.value.slice(0, 11);
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
  // cardCount++;

  // const originalDate = new Date().toLocaleString("ru-RU", {
  //   year: "numeric",
  //   month: "2-digit",
  //   day: "2-digit",
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   second: "2-digit",
  // });

  // const [datePart, timePart] = originalDate.split(", ");
  // const [day, month, year] = datePart.split(".");

  // const data = `${year}-${month}-${day} ${timePart}`;

  const selectedOption = select.options[select.selectedIndex];

  const objCard = {
    name: textInput,
    phone: numInput,
    jobPosition: selectedOption.text,
  };

  // dataCards.push(objCard);
  // localStorage.setItem("cards", JSON.stringify(dataCards));
  createCard(objCard);
  // renderCards();

  input.value = "";
  textInput = "";
  inputNum.value = "";
  numInput = "";
  select.value = "";
  btn.disabled = true;
});

getData();
