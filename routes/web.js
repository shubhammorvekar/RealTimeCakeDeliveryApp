const homeController = require("../app/http/controllers/homecontroller");
const authController = require("../app/http/controllers/authcontroller");
const cartController = require("../app/http/controllers/customers/cartcontroller");
const orderController = require("../app/http/controllers/customers/ordercontroller");
const adminOrderController = require("../app/http/controllers/admin/ordercontroller");
const statusOrderController = require("../app/http/controllers/admin/statuscontroller");
//middlewares
const guest = require("../app/http/middlewares/guest");
const admin = require("../app/http/middlewares/admin");
const auth = require("../app/http/middlewares/auth");
function serverRoutes(app){
    app.get("/",homeController().index);
    //register routes
    app.get("/register",guest,authController().register);
    app.post("/register",authController().postRegister);
    //login routes
    app.get("/login",guest,authController().login);
    app.post("/login",authController().postLogin);
    //logout 
    app.post("/logout",authController().postLogout);
    //cart routes
    app.get("/cart", cartController().cart);
    app.post("/update-cart",cartController().update)
    //Custome routes
    app.get("/customers/orders",auth,orderController().custOrders)
    app.get("/customers/orders/:id",auth, orderController().orderStatus)
    app.post("/orders",auth,orderController().storeOrder)
    //admin routes
    app.get("/admin/orders",admin,adminOrderController().index)
    //admin status controller
    app.post("/admin/orders/status",admin,statusOrderController().statusUpdate)

}

module.exports = serverRoutes