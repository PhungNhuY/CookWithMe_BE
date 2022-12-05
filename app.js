const express = require('express');
const path = require('path');
const errorHandle = require("./middleware/errorHandler");
require('dotenv').config();

const app = express();
port = process.env.PORT;

// connect DB
const db = require('./config/database');
db.connect();

app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

// router
const route = require('./routers');
route(app);

// error handle
app.use(errorHandle);

// public folder
app.use(express.static(path.join(__dirname, "public")));

// Welcome
const welcome = express.Router();
welcome.get("/", function(req, res){
    res.send("Welcome to CookWithMe api!");
});
app.use(welcome);

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});