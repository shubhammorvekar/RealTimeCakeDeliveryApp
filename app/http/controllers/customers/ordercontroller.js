const Order = require("../../../models/order")
const moment= require("moment");
function orderController(){
    return{
        storeOrder(req,res){
            //validate request
            const {phone,address}=req.body;
            if(!phone||!address){
                req.flash("error","All fields are required");
                return res.redirect("/cart")
            }
            const order = new Order({
                custId:req.user._id,
                items:req.session.cart.items,
                phone,
                address
            })
            order.save().then(result=>{
                Order.populate(result,{path:"custId"},(err,newData)=>{
                    req.flash("success","Order placed successfully")
                    delete req.session.cart
                    //Emit event
                    const eventEmitter = req.app.get("eventEmitter")
                    eventEmitter.emit("orderPlaced",newData)
                    return res.redirect("/customers/orders")
                })
                
            }).catch(err=>{
                req.flash("error","Something went wrong")
                return res.redirect("/cart")
            })
        },
        async custOrders(req,res){
            const orders = await Order.find({custId:req.user._id},null,{sort:{createdAt:-1}});
            res.header("Cache-Control",
            "no-cache,no-store,private,must-revalidate,max-stale=0,post-check=0,pre-check=0")
            res.render("customers/orders",{orders:orders,moment:moment})
        },
        async orderStatus(req,res){
            const order =await Order.findById(req.params.id)
            //user authentication
            if(req.user._id.toString() === order.custId.toString()){
                res.render("customers/singleorder",{order})
            }else{
                res.redirect("/")
            } 
    
        }
    }
}
module.exports = orderController