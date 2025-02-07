interface Card {
  id: number;
  name: string;
  phone: string;
  jobPosition: string;
  createDate?: string;
}

const div = document.getElementById("cart") as HTMLElement;
const btn = document.getElementById("btn-change-text") as HTMLButtonElement;
const parentDiv = document.getElementById("main") as HTMLElement;
const input = document.getElementById("input-text") as HTMLInputElement;
const select = document.getElementById("select") as HTMLSelectElement;
const inputNum = document.getElementById("input-number") as HTMLInputElement;

let textInput: string = "";
let numInput: string = "";
let idCounter: number = 0;
let dataCards: Card[] = [];

btn.disabled = true;

getData();

input?.addEventListener("input", (event: Event) => {
  const target = event.target as HTMLInputElement;
  textInput = target.value;
  buttonState();
});

inputNum?.addEventListener("keydown", (event: KeyboardEvent) => {
  const listParams: readonly string[] = [
    "e",
    "-",
    "+",
    ".",
    ",",
    "ArrowUp",
    "ArrowDown",
  ];
  if (listParams.includes(event.key)) {
    event.preventDefault();
  }
});

inputNum?.addEventListener("input", (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.value.length > 11) {
    target.value = target.value.slice(0, 11);
  }
});

inputNum?.addEventListener("input", (event: Event) => {
  const target = event.target as HTMLInputElement;
  numInput = target.value;
  buttonState();
});

select?.addEventListener("change", () => {
  buttonState();
});

btn?.addEventListener("click", () => {
  const selectedOption = select.options[select.selectedIndex];
  if (!selectedOption) return;

  const objCard: Omit<Card, "id" | "createDate"> = {
    name: textInput,
    phone: numInput,
    jobPosition: selectedOption.value,
  };

  createCard(objCard);
  clearForm();
});

function clearForm(): void {
  input.value = "";
  textInput = "";
  inputNum.value = "";
  numInput = "";
  select.value = "";
  btn.disabled = true;
}

function buttonState(): void {
  const isTextInputValid: boolean = textInput.trim().length > 0;
  const isNumInputValid: boolean = numInput.length === 11;
  const isSelectValid: boolean = select.value !== "";
  btn.disabled = !(isTextInputValid && isNumInputValid && isSelectValid);
}

function createAndAppendCard(
  cardData: Card,
  parent: HTMLElement,
  index: number
): void {
  const card = document.createElement("div");
  const nameDisplay = document.createElement("p");
  const numberDisplay = document.createElement("p");
  const jobDisplay = document.createElement("p");
  const timeDisplay = document.createElement("p");
  const deleteButton = document.createElement("button");
  const deleteIcon = document.createElement("img");
  const changeButton = document.createElement("div");

  card.id = `${idCounter++}`;
  card.className = "card";

  nameDisplay.textContent = `Имя: ${cardData.name}`;
  numberDisplay.textContent = `Телефон: ${cardData.phone}`;
  jobDisplay.textContent = `Должность: ${cardData.jobPosition}`;
  timeDisplay.textContent = cardData.createDate ? cardData.createDate : "";

  deleteIcon.src = "./static/icons/trash.svg";
  deleteIcon.classList.add("delete-icon");

  deleteButton.classList.add("delete-button");
  deleteButton.appendChild(deleteIcon);
  deleteButton.addEventListener("click", () => deleteCard(index));

  changeButton.classList.add("change-button");
  changeButton.addEventListener("click", (event) => openForm(event, index));

  card.classList.add(cardData.jobPosition);

  [
    nameDisplay,
    numberDisplay,
    jobDisplay,
    timeDisplay,
    deleteButton,
    changeButton,
  ].forEach((item) => {
    card.appendChild(item);
  });
  parent.appendChild(card);
}

function openForm(ev: Event, index: number): void {
  const target = ev.target as HTMLElement;
  const currentCard = target.parentNode as HTMLElement;
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
  changeInputNumber.value = currentDataCard.phone;
  changeInputNumber.placeholder = "Телефон";
  const phoneContainer = document.createElement("div");
  phoneContainer.appendChild(phoneLabel);
  phoneContainer.appendChild(changeInputNumber);

  changeInputNumber.addEventListener("keydown", (event: KeyboardEvent) => {
    const listParams: string[] = [
      "e",
      "-",
      "+",
      ".",
      ",",
      "ArrowUp",
      "ArrowDown",
    ];
    if (listParams.includes(event.key)) {
      event.preventDefault();
    }
  });
  changeInputNumber.addEventListener("input", (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.value.length > 11) {
      target.value = target.value.slice(0, 11);
    }
  });

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
  changeSelectJob.value = currentDataCard.jobPosition;

  let changeName: string = changeInputName.value;
  let changeNumber: string = changeInputNumber.value;
  let changeJob: string = changeSelectJob.value;

  changeInputName.addEventListener("input", (event: Event) => {
    const target = event.target as HTMLInputElement;
    changeName = target.value;
  });

  changeInputNumber.addEventListener("input", (event: Event) => {
    const target = event.target as HTMLInputElement;
    changeNumber = target.value;
  });

  changeSelectJob.addEventListener("change", (event: Event) => {
    const target = event.target as HTMLSelectElement;
    changeJob = target.value;
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

  [nameContainer, phoneContainer, jobContainer, okButton, cancelButton].forEach(
    (item) => {
      currentCard.appendChild(item);
    }
  );
}

function saveEditedData(
  index: number,
  name: string,
  phone: string,
  job: string
): void {
  const selectedOption = Array.from(select.options).find(
    (option) => option.value === job
  );
  if (!selectedOption) return;

  const updatedCard: Card = {
    id: dataCards[index].id,
    name: name,
    phone: phone,
    jobPosition: selectedOption.value,
  };

  changeCard(updatedCard);
}

async function changeCard(card: Card): Promise<void> {
  try {
    const url = `http://localhost:8080/task/${card.id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    });
    if (response.ok) {
      getData();
    }
  } catch (error) {
    console.error("Error updating card:", error);
  }
}

async function deleteCard(index: number): Promise<void> {
  try {
    const cardId = dataCards[index].id;
    const url = `http://localhost:8080/task/${cardId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (response.ok) {
      getData();
    }
  } catch (error) {
    console.error("Error deleting card:", error);
  }
}

function renderCards(): void {
  parentDiv.innerHTML = "";
  dataCards.forEach((cardData, index) => {
    createAndAppendCard(cardData, parentDiv, index);
  });
}

async function getData(): Promise<void> {
  try {
    const response = await fetch("http://localhost:8080/task/all", {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      dataCards = data;
      renderCards();
    }
  } catch (error) {
    console.error("Error fetching card data:", error);
  }
}

async function createCard(
  card: Omit<Card, "id" | "createDate">
): Promise<void> {
  try {
    const response = await fetch("http://localhost:8080/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    });
    if (response.ok) {
      getData();
    }
  } catch (error) {
    console.error("Error creating card:", error);
  }
}
