const homeController = require("../app/http/controllers/homecontroller");
const authController = require("../app/http/controllers/authcontroller");
const cartController = require("../app/http/controllers/customers/cartcontroller");
const guest = require("../app/http/middlewares/guest");
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
}

module.exports = serverRoutes