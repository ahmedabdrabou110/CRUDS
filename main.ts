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

//   for (let index = 0 ; index <  products.length ; index++) {
//     table += `<tr>
//             <td>${index + 1}</td>
//             <td>${products[index].title}</td>
//             <td>${products[index].price}</td>
//             <td>${products[index].taxes}</td>
//             <td>${products[index].ads}</td>
//             <td>${products[index].discount}</td>
//             <td>${products[index].total}</td>
//             <td>${products[index].category}</td>
//             <td>
//               <button class="update" id="update">update</button>
//             </td>
//            <td>
//               <button class="delete" id="delete">delete</button>
//            </td>
//           </tr>`;
//   }

    products.find((item , id) => {
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
              <button class="update" id="update">update</button>
            </td>
           <td>
              <button class="delete" id="delete">delete</button>
           </td>
          </tr>`;
    })

  tbody.innerHTML = table ;
  
}


//! create product and push to product array and save to localstorage [first operation of CRUDS]
create.addEventListener("click" , () =>{
    const newProduct : productInterface  = {
        title:title.value ,
        price:+price.value ,
        taxes:+taxes.value,
        ads:+ads.value,
        discount:+discount.value,
        total:total.innerHTML,
        count:+count.value,
        category:category.value,
    }
    products.push(newProduct);
    readData()
    localStorage.setItem("product", JSON.stringify(products));
    clearInputs();
})




