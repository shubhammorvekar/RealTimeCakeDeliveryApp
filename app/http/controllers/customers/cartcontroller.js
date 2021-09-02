function cartController(){
    return{
        cart(req,res){
            res.render("customers/cart");
        },
        //post update
        update(req,res){      
            //creating cart key and adding object structure for first time inside session                              
            if(!req.session.cart){
                req.session.cart = {
                    items:{},
                    totalQty:0,
                    totalPrc:0
                }
            }
            let cart =req.session.cart;
            //check iif items does not exists
            if(!cart.items[req.body._id]){
                cart.items[req.body._id] = {
                    item:req.body,
                    qty:1
                }
                cart.totalQty = cart.totalQty + 1;
                cart.totalPrc = cart.totalPrc + req.body.price;
            }
            else{
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
                cart.totalQty = cart.totalQty + 1;
                cart.totalPrc = cart.totalPrc + req.body.price;  
            }
            
            return res.json({totalQty:cart.totalQty})
        }
    }
}
module.exports = cartController