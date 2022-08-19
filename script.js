import data from "./data.js";
let body = document.querySelector("body");
let container = document.querySelector(".container");
let input = document.querySelector("input");
let carter = document.querySelector(".carter");
let carterContainer = document.querySelector(".carter-container.active");
let cartProducts = [];

function renderMainContent(data) {
  data.forEach((item) => {
    let box = document.createElement("div");
    let url = document.createElement("img");
    let name = document.createElement("div");
    let price = document.createElement("div");
    let add = document.createElement("i");

    url.setAttribute("src", item.url);
    url.setAttribute("class", "img");
    box.setAttribute("class", "box");
    add.setAttribute("class", "fa-solid fa-circle-plus add");

    name.innerHTML = item.name;
    name.setAttribute("class", "name");
    price.innerHTML = item.price;
    price.setAttribute("class", "price");

    box.appendChild(url);
    box.appendChild(name);
    box.appendChild(price);
    box.appendChild(add);

    container.appendChild(box);
  });
}

function handleInput(e) {
  let filteredData = data.filter((item) => {
    return item.name.toLowerCase().includes(e.target.value);
  });

  container.innerHTML = "";
  renderMainContent(filteredData);
}

input.addEventListener("input", handleInput);

renderMainContent(data);

// Collect Add Icons
let adds = document.querySelectorAll(".add");

[...adds].forEach((add) => {
  add.addEventListener("click", handleAdd);
});

function handleAdd(e) {
  if (e.target.classList.contains("chosen")) {
    e.target.classList.remove("chosen");
    
  } else {
    e.target.classList.add("chosen");
  }

  let parentElement = e.target.parentElement;
  let productName = parentElement.querySelector(".name").innerHTML;

  cartProducts.push(data.find((item) => item.name === productName));
  buildCarter();
}

carter.addEventListener("click", openCarter);

function openCarter() {
  buildCarter();
}

function buildCarter() {
  carterContainer.innerHTML = "";
  let img, name, price, icon, carterWrapUp;

  cartProducts.forEach((item) => {
    carterWrapUp = document.createElement("div");
    img = document.createElement("img");
    name = document.createElement("div");
    price = document.createElement("div");
    icon = document.createElement("i");

    carterWrapUp.setAttribute("class", "carter-box");
    img.setAttribute("class", "carter-img");
    name.setAttribute("class", "carter-name");
    price.setAttribute("class", "carter-price");
    icon.setAttribute("class", "fa-solid fa-trash trash");

    img.setAttribute("src", item.url);
    name.innerText = item.name;
    price.innerHTML = item.price;

    img.classList.add("carter-img");
    name.classList.add("carter-name");
    price.classList.add("carter-price");

    carterWrapUp.appendChild(img);
    carterWrapUp.appendChild(name);
    carterWrapUp.appendChild(price);
    carterWrapUp.appendChild(icon);
    carterContainer.appendChild(carterWrapUp);

    icon.addEventListener("click", deleteCartItem);
  });
}

function deleteCartItem(e) {
  let parentElement = e.target.parentElement;
  let productName = parentElement.querySelector(".carter-name").innerHTML;

  cartProducts = cartProducts.filter((item) => item.name !== productName);

  buildCarter();
}
