"use strict";
//! selecting all inputs 
const title = document.getElementById('title');
const price = document.getElementById('price');
const taxes = document.getElementById('taxes');
const ads = document.getElementById('ads');
const discount = document.getElementById('discount');
const total = document.getElementById('total');
const count = document.getElementById('count');
const category = document.getElementById('category');
const create = document.getElementById("submit");
const priceInputs = document.querySelectorAll(".price input");
//! Get Total price
const getTotalPrice = () => {
    if (price.value !== "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = String(result);
        total.style.background = "#040";
    }
    else {
        total.innerHTML = "";
        total.style.background = "#a00d02";
    }
};
//! Calling a function 
priceInputs.forEach(item => {
    item.addEventListener("keyup", () => {
        getTotalPrice();
    });
});
