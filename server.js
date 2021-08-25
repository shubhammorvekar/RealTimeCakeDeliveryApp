const express = require("express");
const app = express();
const ejs = require("ejs");
const ejsLayouts = require("express-ejs-layouts");
const path = require("path");
const port =process.env.PORT||3000;

app.use(express.static("public"));
//setting ejs templates
app.use(ejsLayouts);
app.set('views', path.join(__dirname, "/resources/views"));
app.set("view engine","ejs");

require("./routes/web")(app);

// set server 
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});