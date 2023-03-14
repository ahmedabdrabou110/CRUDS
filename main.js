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
//! get products is blank if no localstorage or get data from localstorage
let products = JSON.parse(localStorage.getItem("product")) || [];
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
//! Calling a function [get total]
priceInputs.forEach(item => {
    item.addEventListener("keyup", () => {
        getTotalPrice();
    });
});
//! create product and push to product array and save to localstorage 
create.addEventListener("click", () => {
    const newProduct = {
        title: title.value,
        price: +price.value,
        taxes: +taxes.value,
        ads: +ads.value,
        discount: +discount.value,
        total: total.value,
        count: +count.value,
        category: category.value
    };
    products.push(newProduct);
    localStorage.setItem("product", JSON.stringify(products));
});
