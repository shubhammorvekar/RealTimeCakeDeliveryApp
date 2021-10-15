import axios from 'axios'
import Noty from 'noty'
import {initAdmin} from './admin.js'
import moment from 'moment'
let addCart = document.querySelectorAll(".add-cart");
let cartCounter = document.querySelector("#cartCounter");
function updateCart(cake){
    axios.post("/update-cart",cake).then(res => {
        cartCounter.innerText = res.data.totalQty;
         //add cart popup
        new Noty({
            type:"success",
            timeout:1000,
            text:"Item added to cart"
        }).show();
    }).catch(err=>{
        new Noty({
            type:"error",
            timeout:1000,
            text:"Something wnt wrong"
        }).show();
    })
}

addCart.forEach((btn)=>{
    btn.addEventListener("click",(event)=>{
        let cake =JSON.parse(btn.dataset.cake);
        updateCart(cake);
       
    })
})

//remove order alert message 
let alertMsg= document.querySelector("#successO")
if(alertMsg){
    setTimeout(()=>{
        alertMsg.remove();
    },2000)
}



// change order statuss
var statusLine = document.querySelectorAll(".status_line")

let order = document.querySelector("#hiddenInput") ? document.querySelector("#hiddenInput").value:null;
order = JSON.parse(order)
let time = document.createElement("small")
function updateStatus(order){
    statusLine.forEach(currentList=>{
        currentList.classList.remove("step-completed")
        currentList.classList.remove("current")
    })
    let stepCompleted = true;
    statusLine.forEach(currentList=>{
        let dataSetValue = currentList.dataset.status
        if(stepCompleted){
            currentList.classList.add("step-completed")
        }
        if(dataSetValue === order.status){
            stepCompleted = false;
            time.innerText = moment(order.updatedAt).format("hh:mm A")
            currentList.appendChild(time)
            
            if(currentList.nextElementSibling){
                currentList.nextElementSibling.classList.add("current")
            }
            
        }     
    })

}
updateStatus(order);

//   socket
const socket = io();
initAdmin(socket);
//join
if(order){
    socket.emit("join",`order_${order._id}`)
}

let adminPathName = window.location.pathname;
console.log(adminPathName)
if(adminPathName.includes("admin")){
    socket.emit("join","adminRoom")
}



socket.on("orderUpdated",(data)=>{
    const updatedOrder = { ...order }
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    updateStatus(updatedOrder)
    new Noty({
        type:"success",
        timeout:1000,
        text:"Order Updated"
    }).show();
})


