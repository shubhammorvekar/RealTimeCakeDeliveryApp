function serverRoutes(app){

    const homeController = require("../app/http/controllers/homecontroller");
    const authController = require("../app/http/controllers/authcontroller");
    const cartController = require("../app/http/controllers/customers/cartcontroller");
    app.get("/",homeController().index);

    app.get("/register",authController().register);
    app.get("/login",authController().login);
    
    app.get("/cart", (req,res) => {
        res.render("customers/cart");
    });

}

module.exports = serverRoutes