const categories = [
    {
        name: "უძრავი ქონება",
        id: 1
    },
    {
        name: "ბიზნესი",
        id: 2
    },
    {
        name: "მედია",
        id: 3
    }
]

let domainList = [
    {
        domainName: "example1",
        domainExtension: ".ge",
        price: 299,
        categories: [1, 2]
    },
    {
        domainName: "example2",
        domainExtension: ".com.ge",
        price: 299,
        categories: [2, 3]
    },
    {
        domainName: "example3",
        domainExtension: ".edu.ge",
        price: 299,
        categories: [2]
    },
    {
        domainName: "example4",
        domainExtension: ".ge",
        price: 100,
        categories: [3]
    },
    {
        domainName: "example5",
        domainExtension: ".org.ge",
        price: 99,
        categories: [1, 3]
    }
]
const domeinCard = document.getElementsByClassName("domein-card")
const categories_container = document.querySelector(".filter-categories")
const domein_categories = document.querySelector(".filter-zone")
const domein_list = document.querySelector(".domein-list");
const priceInput = document.querySelector(".price_filter");
const priceValue = document.querySelector(".price-value");
const inputVal = document.getElementsByClassName("input_val")
//const filtered;
//categories List display
for (let i = 0; i < categories.length; i++) {
    const formList = `
     <form class="categories-list">
         <input type="checkbox" class="input_val"  value="${categories[i].name}" data-filter="${categories[i].id}"/>
         <label>${categories[i].name}</label>
     </form>
     `;
    categories_container.innerHTML += formList
}
//domein zone display
for (let i = 0; i < domainList.length; i++) {
    domein_categories.innerHTML += `
    <form class="domein-zone">
      <input type="checkbox" value="${domainList[i].domainExtension}" >
      <label>${domainList[i].domainExtension}</label>
     </form>
    `
}

//data display
function displayData(data) {
    for (let i = 0; i < data.length; i++) {
        const domein = data[i];
        domein_list.innerHTML += `
       <div class="domein-card" data-category="${domein.categories}">
       <div class="right-side">
       <img src="./assets/Btn_send.svg" alt="btn-send">
       <div class="name">${domein.domainName}${domein.domainExtension}</div>
       </div>
         <div class="left-side">
             <div class="price">${domein.price}$</div>
             <div class="add-to_cart">
                 <i class="fa-solid fa-cart-shopping"></i>
             </div>
         </div>
        </div>
       `
    };
}


displayData(domainList)

//filter with price
let maxPrice = domainList.map((product) => product.price);
maxPrice = Math.max(...maxPrice);
maxPrice = Math.ceil(maxPrice / 100);
priceInput.value = maxPrice;
priceInput.max = maxPrice;
priceInput.min = 0;
priceValue.textContent = `Value: $${maxPrice * 100}`

priceInput.addEventListener("input", () => {
    while (domein_list.lastChild) {
        domein_list.removeChild(domein_list.lastChild);
    }

    const value = parseInt(priceInput.value);
    priceValue.textContent = `Value : $${value * 100}`
    let newData = domainList.filter((product) => product.price / 100 <= value)
    displayData(newData);

})
//filter with simbol
const simbolInput = document.querySelector('.symbolInput')
const symbolVAlue = document.querySelector(".symbol-value")
let symbol = domainList.map(product => product.domainExtension)
let arr = []
for (let i = 0; i < symbol.length; i++) {
    let maxSymbol = symbol[i].length
    arr.push(maxSymbol)
    let simbol = Math.max(...arr)
    simbolInput.value = simbol;
    simbolInput.max = simbol;
    priceInput.min = 1;
    symbolVAlue.textContent = `Value: ${simbol}`
}

simbolInput.addEventListener('input', () => {
    while (domein_list.lastChild) {
        domein_list.removeChild(domein_list.lastChild);
    }
    const symbolValue = parseInt(simbolInput.value);
    symbolVAlue.textContent = `Value: ${symbolValue}`
    let newValue = domainList.filter((product) => product.domainExtension.length <= symbolValue)
    displayData(newValue)
})


//filter with categories
const categoryList = document.querySelectorAll(".categories-list")

for (let i = 0; i < categoryList.length; i++) {
    categoryList[i].addEventListener("change", (e) => {
        while (domein_list.lastChild) {
            domein_list.removeChild(domein_list.lastChild)
        }
        domein_list.innerHTML += `<div class="domein-card"></div>`
        for (let j = 0; j < domeinCard.length; j++) {
            if(e.target.checked){
            const index = categories.findIndex(res => res.name === e.target.value)
            let dil = domainList.filter(res => res.categories[j] === index + 1)
             displayData(dil)
            }
        }
        if(e.target.checked===false){
            displayData(domainList)
        }
    })
}


//filter with zone
const domeiZone = document.querySelectorAll(".domein-zone")
for(let i=0;i<domeiZone.length;i++){
    domeiZone[i].addEventListener('click',(e)=>{
        while (domein_list.lastChild) {
            domein_list.removeChild(domein_list.lastChild)
        }
        if(e.target.checked){
        let domeiz=domainList.filter(res=>res.domainExtension===e.target.value)
         displayData(domeiz)
        }
        if(e.target.checked===false){
            displayData(domainList)
        }
    })
}



