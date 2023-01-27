import { menuArray } from './data.js'

let orderArray = []
let btnOrder = document.getElementById("btn-order")
let cardForm = document.getElementById("modal")
let body = document.getElementById("body")
let form = document.getElementById("form")
let footer = document.getElementById("footer")
let closeBtn = document.getElementById("close-btn")
let modalText = document.getElementById("modal-text")

document.addEventListener("click", function(e) {
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add) 
    }
    else if(e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove)
    }
    else if(e.target.id == "btn-order") {
        handleOrderClick()
    }
    else if(e.target.id == "close-btn") {
        closePayment()
    }
})

function handleAddClick(menuId) {
   orderArray.push(menuArray.filter(function(menu){
       return menu.id == menuId
   })[0])
   render()
}

function handleRemoveClick(menuId) {
    orderArray.splice(menuArray.filter(function(menu){
        return menu.id == menuId
    }),1)
    render()
}

function handleOrderClick() {
    body.classList.add("change-body-bg")
    cardForm.style.display = "block"  
}

function closePayment() {
    cardForm.style.display = "none" 
    body.classList.remove("change-body-bg")
}

form.addEventListener("submit", function(e) {
    e.preventDefault()
    modalText.innerHTML = `
        <h1>We are processing your order.</h1>
        <img src="https://media0.giphy.com/media/pIj4Yg3dudUddwGbHO/giphy.gif?cid=ecf05e47af1ha4if0wtghm27pyp8buc5dhqwk3ld94b0xao8&rid=giphy.gif&ct=g">
    `
    form.innerHTML = ""
    setTimeout(function() {
        closePayment()
        footer.innerHTML = `
        <p class="thanks">Thanks Alice! Your order is on its way!</p>
    ` 
    },1500)  
    setTimeout(function refreshPage() {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        document.location.reload(true)
    },3000)
})

function yourOrderHtml(){
    let orderHtml = ""
    let yourOrderHtml = ""
    orderArray.forEach(function(food){  
        orderHtml += `
            <div class="order">
                <div class="food">${food.name}</div> 
                <button class="remove" data-remove="${food.id}">remove</button>
                <div class="price">$${food.price}</div>
            </div>          
        `
    })
    if(orderArray.length > 0){
        yourOrderHtml += `
                <h1 class="order-title">Your order</h1>
                <div>${orderHtml}</div>
        `
    }
    return yourOrderHtml
}

function totalHtml() {
    let totalHtml = ""
    let totalPrice = 0
    orderArray.forEach(function(food){
        totalPrice += food.price
    })
    if(totalPrice) {
        totalHtml += `
            <div class="total">
                <div>Total price:</div> 
                <div class="price">$${totalPrice}</div>
            </div>  
            <button class="btn-order" id="btn-order">Complete order</button>
        `
    }
    return totalHtml
}

function getMainHtml(){
    let mainHtml = ""
    menuArray.forEach(function(menu){
       mainHtml += `
            <div class="section">
                <div class="img">${menu.emoji}</div>
                <div class="menu-inner">
                    <h3 class="item-name">${menu.name}</h3>
                    <p class="item-ingredients">${menu.ingredients}</p>
                    <h4 class="item-price">$${menu.price}</h4>
                </div>
                    <button class="add" data-add="${menu.id}">+</button>
            </div>
    ` 
    })
    return mainHtml
}

function render() {
    document.getElementById("food").innerHTML = getMainHtml()
    footer.innerHTML = yourOrderHtml() + totalHtml()
}
render()