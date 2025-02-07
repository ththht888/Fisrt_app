var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var blockButton = document.getElementById("btn-change-text");
var blockCards = document.getElementById("main");
var blockName = document.getElementById("input-text");
var blockJob = document.getElementById("select");
var blockPhone = document.getElementById("input-number");
var textName = "";
var textPhone = "";
var idCounter = 0;
var dataCard = [];
blockButton.disabled = true;
getDataCard();
blockName.addEventListener("input", function (event) {
    var target = event.target;
    textName = target.value;
    btnSetState();
});
blockPhone.addEventListener("keydown", function (event) {
    var listParams = [
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
blockPhone.addEventListener("input", function (event) {
    var target = event.target;
    if (target.value.length > 11) {
        target.value = target.value.slice(0, 11);
    }
});
blockPhone.addEventListener("input", function (event) {
    var target = event.target;
    textPhone = target.value;
    btnSetState();
});
blockJob.addEventListener("change", function () {
    btnSetState();
});
blockButton.addEventListener("click", function () {
    var selectedOption = blockJob.options[blockJob.selectedIndex];
    var objCard = {
        name: textName,
        phone: textPhone,
        jobPosition: selectedOption.value,
    };
    createdCard(objCard);
    clearFormCard();
});
function clearFormCard() {
    blockName.value = "";
    textName = "";
    blockPhone.value = "";
    textPhone = "";
    blockJob.value = "";
    blockButton.disabled = true;
}
function btnSetState() {
    var isTextInputValid = textName.trim().length > 0;
    var isNumInputValid = textPhone.length === 11;
    var isSelectValid = blockJob.value !== "";
    blockButton.disabled = !(isTextInputValid &&
        isNumInputValid &&
        isSelectValid);
}
function addCard(cardData, parent, index) {
    var card = document.createElement("div");
    var nameDisplay = document.createElement("p");
    var numberDisplay = document.createElement("p");
    var jobDisplay = document.createElement("p");
    var timeDisplay = document.createElement("p");
    var deleteButton = document.createElement("button");
    var deleteIcon = document.createElement("img");
    var changeButton = document.createElement("div");
    card.id = "".concat(idCounter++);
    card.className = "card";
    nameDisplay.textContent = "\u0418\u043C\u044F: ".concat(cardData.name);
    numberDisplay.textContent = "\u0422\u0435\u043B\u0435\u0444\u043E\u043D: ".concat(cardData.phone);
    jobDisplay.textContent = "\u0414\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C: ".concat(cardData.jobPosition);
    timeDisplay.textContent = cardData.createDate ? cardData.createDate : "";
    deleteIcon.src = "./static/icons/trash.svg";
    deleteIcon.classList.add("delete-icon");
    deleteButton.classList.add("delete-button");
    deleteButton.appendChild(deleteIcon);
    deleteButton.addEventListener("click", function () { return deletedCard(index); });
    changeButton.classList.add("change-button");
    changeButton.addEventListener("click", function (event) { return openFormCard(event, index); });
    card.classList.add(cardData.jobPosition);
    [
        nameDisplay,
        numberDisplay,
        jobDisplay,
        timeDisplay,
        deleteButton,
        changeButton,
    ].forEach(function (item) {
        card.appendChild(item);
    });
    parent.appendChild(card);
}
function openFormCard(ev, index) {
    var target = ev.target;
    var currentCard = target.parentNode;
    var currentDataCard = dataCard[index];
    currentCard.innerHTML = "";
    var nameLabel = document.createElement("label");
    nameLabel.textContent = "Имя: ";
    var changeInputName = document.createElement("input");
    changeInputName.type = "text";
    changeInputName.value = currentDataCard.name;
    var nameContainer = document.createElement("div");
    nameContainer.appendChild(nameLabel);
    nameContainer.appendChild(changeInputName);
    var phoneLabel = document.createElement("label");
    phoneLabel.textContent = "Телефон: ";
    var changeInputNumber = document.createElement("input");
    changeInputNumber.type = "number";
    changeInputNumber.value = currentDataCard.phone;
    changeInputNumber.placeholder = "Телефон";
    var phoneContainer = document.createElement("div");
    phoneContainer.appendChild(phoneLabel);
    phoneContainer.appendChild(changeInputNumber);
    changeInputNumber.addEventListener("keydown", function (event) {
        var listParams = [
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
    changeInputNumber.addEventListener("input", function (event) {
        var target = event.target;
        if (target.value.length > 11) {
            target.value = target.value.slice(0, 11);
        }
    });
    var jobLabel = document.createElement("label");
    jobLabel.textContent = "Должность: ";
    var changeSelectJob = document.createElement("select");
    var options = Array.from(blockJob.options)
        .filter(function (option) { return option.value !== ""; })
        .map(function (option) {
        var newOption = document.createElement("option");
        newOption.value = option.value;
        newOption.text = option.text;
        return newOption;
    });
    options.forEach(function (option) { return changeSelectJob.appendChild(option); });
    changeSelectJob.value = currentDataCard.jobPosition;
    var changeName = changeInputName.value;
    var changeNumber = changeInputNumber.value;
    var changeJob = changeSelectJob.value;
    changeInputName.addEventListener("input", function (event) {
        var target = event.target;
        changeName = target.value;
    });
    changeInputNumber.addEventListener("input", function (event) {
        var target = event.target;
        changeNumber = target.value;
    });
    changeSelectJob.addEventListener("change", function (event) {
        var target = event.target;
        changeJob = target.value;
    });
    var jobContainer = document.createElement("div");
    jobContainer.appendChild(jobLabel);
    jobContainer.appendChild(changeSelectJob);
    var okButton = document.createElement("button");
    okButton.classList.add("ok-button");
    var okIcon = document.createElement("img");
    okIcon.src = "./static/icons/ok.svg";
    okIcon.classList.add("ok-icon");
    okButton.appendChild(okIcon);
    okButton.addEventListener("click", function () {
        saveEditedCard(index, changeName, changeNumber, changeJob);
    });
    var cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel-button");
    var cancelIcon = document.createElement("img");
    cancelIcon.src = "./static/icons/cancel.svg";
    cancelIcon.classList.add("cancel-icon");
    cancelButton.appendChild(cancelIcon);
    cancelButton.addEventListener("click", function () {
        renderedCards();
    });
    [nameContainer, phoneContainer, jobContainer, okButton, cancelButton].forEach(function (item) {
        currentCard.appendChild(item);
    });
}
function saveEditedCard(index, name, phone, job) {
    var selectedOption = Array.from(blockJob.options).find(function (option) { return option.value === job; });
    if (!selectedOption)
        return;
    var updatedCard = {
        id: dataCard[index].id,
        name: name,
        phone: phone,
        jobPosition: selectedOption.value,
    };
    changedCard(updatedCard);
}
function changedCard(card) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    url = "http://localhost:8080/task/".concat(card.id);
                    return [4 /*yield*/, fetch(url, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(card),
                        })];
                case 1:
                    response = _a.sent();
                    if (response.ok) {
                        getDataCard();
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error updating card:", error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function deletedCard(index) {
    return __awaiter(this, void 0, void 0, function () {
        var cardId, url, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    cardId = dataCard[index].id;
                    url = "http://localhost:8080/task/".concat(cardId);
                    return [4 /*yield*/, fetch(url, {
                            method: "DELETE",
                        })];
                case 1:
                    response = _a.sent();
                    if (response.ok) {
                        getDataCard();
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error("Error deleting card:", error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function renderedCards() {
    blockCards.innerHTML = "";
    dataCard.forEach(function (cardData, index) {
        addCard(cardData, blockCards, index);
    });
}
function getDataCard() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, fetch("http://localhost:8080/task/all", {
                            method: "GET",
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    dataCard = data;
                    renderedCards();
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.error("Error fetching card data:", error_3);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function createdCard(card) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch("http://localhost:8080/task", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(card),
                        })];
                case 1:
                    response = _a.sent();
                    if (response.ok) {
                        getDataCard();
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.error("Error creating card:", error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
