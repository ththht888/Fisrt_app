const blockButton = document.getElementById(
  "btn-change-text"
) as HTMLButtonElement;
const blockCards = document.getElementById("main") as HTMLElement;
const blockName = document.getElementById("input-text") as HTMLInputElement;
const blockJob = document.getElementById("select") as HTMLSelectElement;
const blockPhone = document.getElementById("input-number") as HTMLInputElement;

interface ICard {
  id?: number;
  name: string;
  phone: string;
  jobPosition: string;
  createDate?: string;
}

let textName: string = "";
let textPhone: string = "";
let idCounter: number = 0;
let dataCard: ICard[] = [];

blockButton.disabled = true;

getDataCard();

blockName.addEventListener("input", (event: Event) => {
  const target = event.target as HTMLInputElement;
  textName = target.value;
  btnSetState();
});

blockPhone.addEventListener("keydown", (event: KeyboardEvent) => {
  const listParams: any = [
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

blockPhone.addEventListener("input", (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.value.length > 11) {
    target.value = target.value.slice(0, 11);
  }
});

blockPhone.addEventListener("input", (event: Event) => {
  const target = event.target as HTMLInputElement;
  textPhone = target.value;
  btnSetState();
});

blockJob.addEventListener("change", () => {
  btnSetState();
});

blockButton.addEventListener("click", () => {
  const selectedOption = blockJob.options[blockJob.selectedIndex];
  const objCard: ICard = {
    name: textName,
    phone: textPhone,
    jobPosition: selectedOption.value,
  };

  createdCard(objCard);
  clearFormCard();
});

function clearFormCard(): void {
  blockName.value = "";
  textName = "";
  blockPhone.value = "";
  textPhone = "";
  blockJob.value = "";
  blockButton.disabled = true;
}

function btnSetState(): void {
  const isTextInputValid: boolean = textName.trim().length > 0;
  const isNumInputValid: boolean = textPhone.length === 11;
  const isSelectValid: boolean = blockJob.value !== "";
  blockButton.disabled = !(
    isTextInputValid &&
    isNumInputValid &&
    isSelectValid
  );
}

function addCard(cardData: ICard, parent: HTMLElement, index: number): void {
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
  deleteButton.addEventListener("click", () => deletedCard(index));

  changeButton.classList.add("change-button");
  changeButton.addEventListener("click", (event) => openFormCard(event, index));

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

function openFormCard(ev: Event, index: number): void {
  const target = ev.target as HTMLElement;
  const currentCard = target.parentNode as HTMLElement;
  const currentDataCard = dataCard[index];

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
    const listParams: any = [
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
  const options:any = Array.from(blockJob.options)
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
    saveEditedCard(index, changeName, changeNumber, changeJob);
  });

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("cancel-button");
  const cancelIcon = document.createElement("img");
  cancelIcon.src = "./static/icons/cancel.svg";
  cancelIcon.classList.add("cancel-icon");
  cancelButton.appendChild(cancelIcon);
  cancelButton.addEventListener("click", () => {
    renderedCards();
  });

  [nameContainer, phoneContainer, jobContainer, okButton, cancelButton].forEach(
    (item) => {
      currentCard.appendChild(item);
    }
  );
}

function saveEditedCard(
  index: number,
  name: string,
  phone: string,
  job: string
): void {
  const selectedOption:any = Array.from(blockJob.options).find(
    (option) => option.value === job
  );
  if (!selectedOption) return;

  const updatedCard: ICard = {
    id: dataCard[index].id,
    name: name,
    phone: phone,
    jobPosition: selectedOption.value,
  };

  changedCard(updatedCard);
}

async function changedCard(card: ICard): Promise<void> {
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
      getDataCard();
    }
  } catch (error) {
    console.error("Error updating card:", error);
  }
}

async function deletedCard(index: number): Promise<void> {
  try {
    const cardId = dataCard[index].id;
    const url = `http://localhost:8080/task/${cardId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (response.ok) {
      getDataCard();
    }
  } catch (error) {
    console.error("Error deleting card:", error);
  }
}

function renderedCards(): void {
  blockCards.innerHTML = "";
  dataCard.forEach((cardData, index) => {
    addCard(cardData, blockCards, index);
  });
}

async function getDataCard(): Promise<void> {
  try {
    const response = await fetch("http://localhost:8080/task/all", {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      dataCard = data;
      renderedCards();
    }
  } catch (error) {
    console.error("Error fetching card data:", error);
  }
}

async function createdCard(card: ICard): Promise<void> {
  try {
    const response = await fetch("http://localhost:8080/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    });
    if (response.ok) {
      getDataCard();
    }
  } catch (error) {
    console.error("Error creating card:", error);
  }
}
