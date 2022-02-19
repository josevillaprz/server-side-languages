"use strict"

//import all libraries
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const request = require('request');
const res = require('express/lib/response');

// express has a built in router
const router = express.Router();
// creates an express application into the app variable where you can then access all of express methods
const app = express();

// parses the request out to json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// setting the engine for the view, ejs
app.set("view engine", "ejs")
app.engine("ejs", require("ejs").__express)

//routes
router.get("/", (req, res) => {
    res.render("index", {
        pagename: "index"
    })
})

router.get("/about", (req, res) => {
    res.render("about", {
        pagename: "about"
    })
})

router.get("/contact", (req, res) => {
    res.render("contact", {
        pagename: "contact"
    })
})

router.post("/registration", (req, res) => {
    let errors = []
    let valid = false
    // validate blank inputs
    if(req.body.name.trim() == ""){
        errors.push("Name cannot be blank")
    }
    if(req.body.address.trim() == ""){
        errors.push("Address cannot be blank")
    }
    if(req.body.city.trim() == ""){
        errors.push("City cannot be blank")
    }
    if(req.body.zip.trim() == ""){
        errors.push("zip cannot be blank")
    }
    if(req.body.bio.trim() == ""){
        errors.push("bio cannot be empty")
    }
    // regex validate only letters in name
    if(!/^[a-zA-z]+\s[a-zA-Z]+$/.test(req.body.name)){
        errors.push("Invalid name format")
    }
    // regex validate 5 digit zip
    if (!/^\d{5}$/.test(req.body.zip)){
        errors.push("Invalid zip code")
    }
    
    // once valide update valid variable to pass locally
    if(errors.length == 0){
        console.log('passed validation')
        valid = true;
    }

    res.render("contact", {
        pagename: "contact",
        errs: errors,
        valid: valid
    })
})

router.post("/login", (req, res) => {
    console.log(req.body)
    let errors = [];
    // validate the email not blank
    if (req.body.email.trim() == "") {
        errors.push("Email cannot be blank")
    }
    // validate the password not blank
    if (req.body.password.trim() == "") {
        errors.push("Password cannot be blank")
    }
    // validate the email incorrect format
    if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(req.body.email)) {
        errors.push("Invalid email address")
    }
    // validate the password incorrect format
    if (!/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(req.body.password)) {
        errors.push("Invalid password format")
    }
    console.log(errors)
    res.render("index", {
        pagename: "index",
        errs: errors
    })
})

//declare static file locations
app.use(express.static("views"))
app.use(express.static("public"))
app.use("/", router)

// start server
let server = app.listen("8080", () => {
    console.log("server running on port 8080")
})