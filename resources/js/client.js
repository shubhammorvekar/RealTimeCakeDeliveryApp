import axios from 'axios'
import Noty from 'noty'
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