const div = document.getElementById('cart');
console.log(div)
console.log(div.innerText)




const btn = document.getElementById('btn-cnahge-text');
const parentDiv = document.getElementById('main');

btn.addEventListener('click', (event) => {
    const text = `***${div.innerText}***`;
    div.innerHTML =text;

    const newDiv = document.createElement('div');
    newDiv.innerHTML = 'новый див';
    const blockCount = newDiv.children.length + 1;
    newDiv.textContent = `№${blockCount}`

    parentDiv.appendChild(newDiv);
})