
const domainLists = [
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
    price: 299,
    categories: [3]
  },
  {
    domainName: "example5",
    domainExtension: ".org.ge",
    price: 299,
    categories: [1, 3]
  }
]
const addCart = document.querySelectorAll(".add-to_cart")
const domeinCLick = document.querySelectorAll(".domein-card")
let clicked = true;
for (let i = 0; i < domeinCLick.length; i++) {
  domeinCLick[i].addEventListener("click", (e) => {
    if (clicked === true) {
      addCart[i].innerHTML += "დამატება";
      clicked = false
    } else {
      addCart[i].removeChild(addCart[i].lastChild)
      addCart[i].innerHTML += ""
      clicked = true
    }
  })
}
//add cart
if (localStorage.getItem("cart") === null) {
  localStorage.setItem("cart", "[]")
}
for (let i = 0; i < addCart.length; i++) {
  addCart[i].addEventListener('click', () => {
    let local=JSON.parse(localStorage.getItem("cart"))
   if(local[i]===undefined){
    cartNumbers(domainLists[i])
   }else if(domainLists[i].domainName===local[i].domainName){
     alert("its already added")
   }
  })
};
function cartNumbers(product) {
  const cart = product;
  const techdata = JSON.parse(localStorage.getItem("cart"))
  techdata.push(cart)
  localStorage.setItem('cart', JSON.stringify(techdata))
  total.textContent = techdata.length
}

//toggle menu
const burgerMenu = document.querySelector(".burger")
const filterContainer = document.querySelector(".filter-container")
burgerMenu.addEventListener("click", () => {
  filterContainer.classList.toggle("active")
})

window.addEventListener("resize", () => {
  if (window.innerWidth >= 669) {
    filterContainer.classList.remove("active")
  }
})

//display cart

const cart = document.querySelector(".cart")
const total = document.querySelector(".red-button")
const selectedDomani = document.querySelector(".selected-domein")
let dataFromSelected = JSON.parse(localStorage.getItem("cart"))
total.textContent = dataFromSelected.length
function displayCart(item) {
  for (let i = 0; i < item.length; i++) {
    let cartdisplay = `
      <div class="selected-domein_card">
                        <h5 class="domein-name">${item[i].domainName}</h5>
                        <div class="selected-domein_right-side">
                            <h5 class="selected-price">${item[i].price}$</h5>
                            <div class="remove-item" id="${item[i].domainName}">remove</div>
                        </div>
                </div>
                
      ` 
      selectedDomani.innerHTML+=cartdisplay;
  }
  cart.addEventListener("click",(e)=>{
    selectedDomani.classList.toggle("open")
  })
}

displayCart(dataFromSelected)

//delete item from cart
const removeItem =document.querySelectorAll(".remove-item")
const removed =[]; 
for(let i=0;i<removeItem.length;i++){
  removed.push(removeItem[i])
  removeItem[i].addEventListener('click',(e)=>{
    let deleteIndex= removed.indexOf(e.target)
    let remove=dataFromSelected.splice(deleteIndex,1)
    console.log(remove)
    localStorage.setItem('cart', JSON.stringify(dataFromSelected))
    window.location.reload()
  })
}

