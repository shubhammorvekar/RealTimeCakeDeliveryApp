function homeController(){
    return{
        index:function(req,res){
            res.render("home");
        }
    }
}

module.exports = homeController