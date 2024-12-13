const div = document.getElementById("cart");
const btn = document.getElementById("btn-change-text");
const parentDiv = document.getElementById("main");

let num = 0;

btn.addEventListener('click', (event) => {
  const newDiv = document.createElement("div");
  num = num + 1;
  newDiv.textContent = `№${num}`;

  parentDiv.appendChild(newDiv);
})
