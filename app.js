const div = document.getElementById("cart");
const btn = document.getElementById("btn-change-text");
const parentDiv = document.getElementById("main");
const input = document.getElementById("input-text");

let textInput = "";
let cardCount = 0;

input.addEventListener("input", function (event) {
  textInput = event.target.value;
});

const card = document.createElement("div");
card.className = "card";

btn.addEventListener("click", function () {
  cardCount++;

  const card = document.createElement("div");
  card.className = "card";
  card.id = `card${cardCount}`;

  const cardText = textInput ? textInput : `card${cardCount}`;

  card.textContent = cardText;


  parentDiv.appendChild(card);
});
