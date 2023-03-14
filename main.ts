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

//! Calling a function 
priceInputs.forEach(item => {
    item.addEventListener("keyup" , () =>{
        getTotalPrice();
    })
})