const homeController = require("../app/http/controllers/homecontroller");
const authController = require("../app/http/controllers/authcontroller");
const cartController = require("../app/http/controllers/customers/cartcontroller");

function serverRoutes(app){
    app.get("/",homeController().index);

    app.get("/register",authController().register);
    app.get("/login",authController().login);
    //cart routes
    app.get("/cart", cartController().cart);
    app.post("/update-cart",cartController().update)
}

module.exports = serverRoutes