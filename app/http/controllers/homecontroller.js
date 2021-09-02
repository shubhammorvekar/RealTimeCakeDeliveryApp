const Menu = require("../../models/menu");
function homeController(){
    return{
        index:async function(req,res){
            const menus = await Menu.find()
            res.render("home",{cakes:menus});
            // Menu.find().then(function(menus){
            //     console.log(menus)
            //     res.render("home");
            // })
           
        }
    }
}

module.exports = homeController