const div = document.getElementById("cart");
const btn = document.getElementById("btn-change-text");
const parentDiv = document.getElementById("main");

let num = 0;

btn.addEventListener('click', (event) => {
  const newDiv = document.createElement("div");
  num = num + 1;
  newDiv.textContent = `№${num}`;

btn.addEventListener("click", function () {
  cardCount++;

  const card = document.createElement("div");
  card.className = "card";

  const cardText = textInput ? textInput : `card${cardCount}`;

  card.textContent = cardText;

  parentDiv.appendChild(card);
});
