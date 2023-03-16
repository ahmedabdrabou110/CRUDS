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
const search = document.getElementById('search');
const create = document.getElementById("submit");
const priceInputs = document.querySelectorAll(".price input");
const tbody = document.querySelector("#tableBody");
//! Mood is a variable to check if create button work as create or update
let mood = "create";
//! Mood is a variable to check if search button is by title or by category
let searchMood = "title";
//! This is a variable to store index inside it
let temp;
//! get products is blank if no localstorage or get data from localstorage
let products = JSON.parse(localStorage.getItem('product')) || [];
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
//! function of clear inputs after create new product 
const clearInputs = () => {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.textContent = "";
    count.value = "";
    category.value = "";
};
//! function of read data [second operation of CRUDS] 
const readData = () => {
    let table = "";
    products.find((item, id) => {
        table += `<tr>
            <td>${id + 1}</td>
            <td>${item.title}</td>
            <td>${item.price}</td>
            <td>${item.taxes}</td>
            <td>${item.ads}</td>
            <td>${item.discount}</td>
            <td>${item.total}</td>
            <td>${item.category}</td>
            <td>
              <button class="update" onclick="updateProduct(${id})" id="update">update</button>
            </td>
           <td>
              <button class="delete"  onclick="deleteProduct(${id + 1})"  id="delete">delete</button>
           </td>
          </tr>`;
    });
    tbody.innerHTML = table;
    const deleteAll = document.querySelector(".delete-all");
    if (products.length) {
        deleteAll.innerHTML = `
        <button onclick="deleteAll()" >Delete All ( ${products.length} )</button>
    `;
    }
    else {
        deleteAll.innerHTML = "";
    }
};
function createMood() {
    mood = "create";
    create.innerHTML = "create";
    count.style.display = "block";
}
//! create product and push to product array and save to localstorage [first operation of CRUDS]
create.addEventListener("click", () => {
    let newProduct = {
        title: title.value,
        price: +price.value,
        taxes: +taxes.value,
        ads: +ads.value,
        discount: +discount.value,
        total: total.innerHTML,
        count: +count.value,
        category: category.value,
    };
    if (mood === "create") {
        if (newProduct.count > 1) {
            for (let i = 0; i < newProduct.count; i++) {
                products.push(newProduct);
            }
        }
        else {
            products.push(newProduct);
        }
    }
    else {
        products[temp] = newProduct;
        createMood();
    }
    readData();
    localStorage.setItem("product", JSON.stringify(products));
    clearInputs();
    getTotalPrice();
});
//! delete a  product from product array and save to localstorage [third operation of CRUDS]
function deleteProduct(id) {
    products.splice(id - 1, 1);
    localStorage.setItem("product", JSON.stringify(products));
    readData();
}
//! delete all data from product from array and localstorage
function deleteAll() {
    localStorage.clear();
    products.splice(0);
    readData();
    createMood();
}
readData();
//! update a  product from product array and save to localstorage [forth operation of CRUDS]
function updateProduct(id) {
    title.value = products[id].title;
    price.value = products[id].price;
    taxes.value = products[id].taxes;
    ads.value = products[id].ads;
    discount.value = products[id].discount;
    getTotalPrice();
    category.value = products[id].category;
    count.style.display = "none";
    create.innerHTML = "update";
    mood = "update";
    temp = id;
    scroll({
        top: 0,
        behavior: "smooth"
    });
}
//! search  a  product with title or categoru  from product array  [fifth operation of CRUDS]
//* get mood which search by title or by category 
function getSearchMood(id) {
    if (id === "searchTitle") {
        searchMood = "title";
        search.placeholder = "search by title";
    }
    else {
        searchMood = "category";
        search.placeholder = "search by category";
    }
    search.focus();
}
function searchData(value) {
    let table = "";
    if (searchMood === "title") {
        for (let index = 0; index < products.length; index++) {
            if (products[index].title.includes(value)) {
                table += `<tr>
                    <td>${index + 1}</td>
                    <td>${products[index].title}</td>
                    <td>${products[index].price}</td>
                    <td>${products[index].taxes}</td>
                    <td>${products[index].ads}</td>
                    <td>${products[index].discount}</td>
                    <td>${products[index].total}</td>
                    <td>${products[index].category}</td>
                    <td>
                    <button class="update" onclick="updateProduct(${index})" id="update">update</button>
                    </td>
                <td>
                    <button class="delete"  onclick="deleteProduct(${index + 1})"  id="delete">delete</button>
                </td>
                </tr>`;
            }
        }
    }
    else {
        for (let index = 0; index < products.length; index++) {
            if (products[index].category.includes(value)) {
                table += `<tr>
                    <td>${index + 1}</td>
                    <td>${products[index].title}</td>
                    <td>${products[index].price}</td>
                    <td>${products[index].taxes}</td>
                    <td>${products[index].ads}</td>
                    <td>${products[index].discount}</td>
                    <td>${products[index].total}</td>
                    <td>${products[index].category}</td>
                    <td>
                    <button class="update" onclick="updateProduct(${index})" id="update">update</button>
                    </td>
                <td>
                    <button class="delete"  onclick="deleteProduct(${index + 1})"  id="delete">delete</button>
                </td>
                </tr>`;
            }
        }
    }
    tbody.innerHTML = table;
}
search.addEventListener("keyup", () => {
    const searchValue = search.value;
    searchData(searchValue);
});
