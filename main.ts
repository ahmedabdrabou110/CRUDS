//! selecting all inputs 
const title = document.getElementById('title') as HTMLInputElement;
const price = document.getElementById('price') as HTMLInputElement;
const taxes = document.getElementById('taxes') as HTMLInputElement;
const ads = document.getElementById('ads') as HTMLInputElement;
const discount = document.getElementById('discount') as HTMLInputElement;
const total = document.getElementById('total') as HTMLInputElement;
const count = document.getElementById('count') as HTMLInputElement;
const category = document.getElementById('category') as HTMLInputElement;
const create = document.getElementById("submit") as HTMLButtonElement;
const priceInputs = document.querySelectorAll(".price input")

//! get products is blank if no localstorage or get data from localstorage
let products = JSON.parse(localStorage.getItem("product")!) || [] ;


//! interface of create new object of product 
interface productInterface {
    title:string;
    price:number;
    taxes:number;
    ads:number;
    discount:number;
    total:string;
    count:number;
    category:string;
}

//! Get Total price
const getTotalPrice = () => {
    if(price.value !== "") {
        let result:(string | number) = (+price.value + +taxes.value + +ads.value) - +discount.value ;
        total.innerHTML = String(result);
        total.style.background = "#040"
    }else {
        total.innerHTML = "";
        total.style.background = "#a00d02";
    }
}

//! Calling a function [get total]
priceInputs.forEach(item => {
    item.addEventListener("keyup" , () =>{
        getTotalPrice();
    })
})

//! function of clear inputs after create new product 
const clearInputs= () => {
    title.value = "" ;
    price.value = "" ;
    taxes.value = "" ;
    ads.value = "" ;
    discount.value = "" ;
    total.innerHTML="";
    count.value="";
    category.value="";
}



//! create product and push to product array and save to localstorage 
create.addEventListener("click" , () =>{
    const newProduct : productInterface  = {
        title:title.value ,
        price:+price.value ,
        taxes:+taxes.value,
        ads:+ads.value,
        discount:+discount.value,
        total:total.value,
        count:+count.value,
        category:category.value
    }
    products.push(newProduct);
    localStorage.setItem("product", JSON.stringify(products));
    clearInputs();
})


