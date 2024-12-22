const div = document.getElementById("cart");
const btn = document.getElementById("btn-change-text");
const parentDiv = document.getElementById("main");
const input = document.getElementById("input-text");
const select = document.getElementById("select");

let textInput = "";
let cardCount = 0;
btn.disabled = true;

input.addEventListener("input", function (event) {
  textInput = event.target.value;
  if (textInput.length === 0) {
    btn.disabled = true;
  } else {
    btn.disabled = false;
  }
});

btn.addEventListener("click", function () {
  cardCount++;

  const card = document.createElement("div");
  card.className = "card";

  card.textContent = textInput;

  const selectedColor = select.value;
  switch (selectedColor) {
    case "red":
      card.className = "card-red";
      break;
    case "yellow":
      card.className = "card-yellow";
      break;
    case "green":
      card.className = "card-green";
      break;
  }
  parentDiv.appendChild(card);
});
