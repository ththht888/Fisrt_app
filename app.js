const div = document.getElementById("cart");
const btn = document.getElementById("btn-change-text");
const parentDiv = document.getElementById("main");
const input = document.getElementById("input-text");
const select = document.getElementById("select");

let textInput = "";
let cardCount = 0;

input.addEventListener("input", function (event) {
  textInput = event.target.value;
  if (textInput.length == 0) {
    btn.disabled = true;
  } else {
    btn.disabled = false;
  }
});

btn.addEventListener("click", function () {
  cardCount++;

  const card = document.createElement("div");
  card.className = "card";

  const cardText = textInput ? textInput : `card${cardCount}`;

  card.textContent = cardText;

  const selectedColor = select.value;
  if (selectedColor === "red") {
    card.className = "card-red";
  } else if (selectedColor === "yellow") {
    card.className = "card-yellow";
  } else if (selectedColor === "green") {
    card.className = "card-green";
  }
  parentDiv.appendChild(card);
});
