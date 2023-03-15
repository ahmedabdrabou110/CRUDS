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
const priceInputs = document.querySelectorAll(".price input");
const tbody = document.querySelector("#tableBody") as HTMLElement;

//! Mood is a variable to check if create button work as create or update
let mood: string = "create";

//! This is a variable to store index inside it
let temp :number ;

//! get products is blank if no localstorage or get data from localstorage
let products = JSON.parse(localStorage.getItem('product')!) || [] ;


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
    total.textContent="";
    count.value="";
    category.value="";
}


//! function of read data [second operation of CRUDS] 

const readData = () => {
    let table = "";
    products.find((item: { title: any; price: any; taxes: any; ads: any; discount: any; total: any; category: any; } , id: number) => {
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
              <button class="delete"  onclick="deleteProduct(${id+1})"  id="delete">delete</button>
           </td>
          </tr>`;
    })

  tbody.innerHTML = table ;
const deleteAll = document.querySelector(".delete-all") as HTMLElement ;
  if(products.length) {
    deleteAll.innerHTML= `
        <button onclick="deleteAll()" >Delete All ( ${products.length} )</button>
    `
  }else{
    deleteAll.innerHTML =""
  }
}


function createMood () {
    mood = "create";
        create.innerHTML = "create";
        count.style.display = "block" ;
}


//! create product and push to product array and save to localstorage [first operation of CRUDS]
create.addEventListener("click" , () =>{
    
    let newProduct : productInterface  = {
        title:title.value ,
        price:+price.value ,
        taxes:+taxes.value,
        ads:+ads.value,
        discount:+discount.value,
        total:total.innerHTML,
        count:+count.value,
        category:category.value,
    }
    if(mood === "create") {
        if(newProduct.count > 1) {
            for(let i = 0 ; i < newProduct.count ;i++) {
                products.push(newProduct);
            }
        }else{
            products.push(newProduct);
        }
        
        
    }else {
        products[temp] =  newProduct;
        createMood();
    }
    readData();
    localStorage.setItem("product", JSON.stringify(products));
    clearInputs();
    getTotalPrice()
})


//! delete a  product from product array and save to localstorage [third operation of CRUDS]

function deleteProduct (id:number)  {
    products.splice(id-1,1);
    localStorage.setItem("product",JSON.stringify(products));
    readData();
}


//! delete all data from product from array and localstorage

function deleteAll(){
    localStorage.clear();
    products.splice(0);
    readData();
    createMood();
}

readData();

//! update a  product from product array and save to localstorage [forth operation of CRUDS]

function updateProduct (id:number) {
    title.value = products[id].title ;
    price.value = products[id].price ;
    taxes.value = products[id].taxes ;
    ads.value = products[id].ads ;
    discount.value = products[id].discount ; 
    getTotalPrice();
    category.value = products[id].category ;
    count.style.display = "none";
    create.innerHTML = "update";
    mood = "update";
    temp = id; 
    scroll({
        top:0 ,
        behavior:"smooth"
    })
}