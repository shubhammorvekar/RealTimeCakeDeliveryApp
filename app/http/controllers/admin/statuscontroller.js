const Order = require("../../../models/order")
function statusUpdaterController(){
    return{
        statusUpdate(req,res){
            Order.updateOne({_id:req.body.orderId},{status:req.body.status},(err,data)=>{
                if(err){
                    res.redirect("/admin/orders")
                    console.log(err)
                }
                //Emit event
                const eventEmitter = req.app.get("eventEmitter")
                eventEmitter.emit("orderUpdated",{id:req.body.orderId, status:req.body.status}) 
                res.redirect("/admin/orders")
            })
        }
    }
}

module.exports = statusUpdaterController