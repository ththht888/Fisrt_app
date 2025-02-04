const div = document.getElementById("cart");
const btn = document.getElementById("btn-change-text");
const parentDiv = document.getElementById("main");
const input = document.getElementById("input-text");
const select = document.getElementById("select");
const inputNum = document.getElementById("input-number");

let textInput = "";
let numInput = "";
let id = 0;
let dataCards = [];

btn.disabled = true;

// let dataCards = JSON.parse(localStorage.getItem("cards")) || [];
getData();

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
  const selectedOption = select.options[select.selectedIndex];
  console.log(selectedOption);
  const objCard = {
    name: textInput,
    phone: numInput,
    jobPosition: selectedOption.value,
  };

  // localStorage.setItem("cards", JSON.stringify(dataCards));
  createCard(objCard);
  clearForm();
});

function clearForm() {
  input.value = "";
  textInput = "";
  inputNum.value = "";
  numInput = "";
  select.value = "";
  btn.disabled = true;
}

function buttonState() {
  const isTextInputValid = textInput.trim().length > 0;
  const isNumInputValid = numInput.length === 11;
  const isSelectValid = select.value !== "";
  btn.disabled = !(isTextInputValid && isNumInputValid && isSelectValid);
}

function createAndAppendCard(cardData, parent, index) {
  const card = document.createElement("div");
  const nameDisplay = document.createElement("p");
  const numberDisplay = document.createElement("p");
  const jobDisplay = document.createElement("p");
  const timeDisplay = document.createElement("p");
  const deleteButton = document.createElement("button");
  const deleteIcon = document.createElement("img");
  const changeButton = document.createElement("div");
  const listBlock = [
    nameDisplay,
    numberDisplay,
    jobDisplay,
    timeDisplay,
    deleteButton,
    changeButton,
  ];

  card.id = `${id++}`;
  card.className = "card";

  nameDisplay.textContent = `Имя: ${cardData.name}`;
  numberDisplay.textContent = `Телефон: ${cardData.phone}`;
  jobDisplay.textContent = `Должность: ${cardData.jobPosition}`;
  timeDisplay.textContent = `${cardData.createDate}`;

  deleteIcon.src = "./static/icons/trash.svg";
  deleteIcon.classList.add("delete-icon");

  deleteButton.classList.add("delete-button");
  deleteButton.appendChild(deleteIcon);
  deleteButton.addEventListener("click", () => deleteCard(index));

  changeButton.classList.add("change-button");
  changeButton.addEventListener("click", (event) => openForm(event, index));

  card.classList.add(cardData.jobPosition);

  listBlock.forEach((item) => card.appendChild(item));
  parent.appendChild(card);
}

function openForm(ev, index) {
  const currentCard = ev.target.parentNode;
  const currentDataCard = dataCards[index];
  const nameLabel = document.createElement("label");
  const changeInputName = document.createElement("input");
  const nameContainer = document.createElement("div");
  const phoneLabel = document.createElement("label");
  const changeInputNumber = document.createElement("input");
  const phoneContainer = document.createElement("div");
  const jobLabel = document.createElement("label");

  currentCard.innerHTML = "";

  nameLabel.textContent = "Имя: ";
  phoneLabel.textContent = "Телефон: ";
  jobLabel.textContent = "Должность: ";

  changeInputName.type = "text";
  changeInputNumber.type = "number";

  changeInputName.value = currentDataCard.name;
  changeInputNumber.value = currentDataCard.phone;

  nameContainer.appendChild(nameLabel);
  nameContainer.appendChild(changeInputName);

  changeInputNumber.placeholder = "Телефон";

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

  phoneContainer.appendChild(phoneLabel);
  phoneContainer.appendChild(changeInputNumber);

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
  changeSelectJob.value = currentDataCard.jobPosition;
 
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
    saveEditedData(index, changeName, changeNumber, changeJob);
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

  const listBlocks = [
    nameContainer,
    phoneContainer,
    jobContainer,
    okButton,
    cancelButton,
  ];
  listBlocks.forEach((item) => currentCard.appendChild(item));
}

function saveEditedData(index, name, phone, job) {
  const selectedOption = Array.from(select.options).find(
    (option) => option.value === job
  );
  const updatedCard = {
    id: dataCards[index].id,
    name: name,
    phone: phone,
    jobPosition: selectedOption.value,
  };
  changeCard(updatedCard);
}

// localStorage.setItem("cards", JSON.stringify(dataCards));

async function changeCard(card) {
  try {
    const url = `http://localhost:8080/task/${card.id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    });
    if (response) {
      getData();
    }
  } catch (e) {
    console.log(e);
  }
}

async function deleteCard(index) {
  try {
    const cardId = dataCards[index].id;
    const url = `http://localhost:8080/task/${cardId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (response) {
      getData();
    }
  } catch (e) {
    console.log(e);
  }
}

function renderCards() {
  parentDiv.innerHTML = "";
  dataCards.forEach((cardData, index) => {
    createAndAppendCard(cardData, parentDiv, index);
  });
}

async function getData() {
  try {
    const response = await fetch("http://localhost:8080/task/all", {
      method: "GET",
    });
    if (response) {
      const data = await response.json();
      dataCards = data;
      renderCards();
    }
  } catch (e) {
    console.log(e);
  }
}

async function createCard(card) {
  try {
    const response = await fetch("http://localhost:8080/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    });
    if (response) {
      getData();
    }
  } catch (e) {
    console.log(e);
  }
}
