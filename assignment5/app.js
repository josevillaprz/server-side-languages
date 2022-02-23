"use strict";

//import all libraries
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const request = require("request");
const res = require("express/lib/response");
const session = require("express-session");

// express has a built in router
const router = express.Router();
// creates an express application into the app variable where you can then access all of express methods
const app = express();

// tel app to use session
app.use(session({ secret: "secret", saveUninitialized: true, resave: true }));

// parses the request out to json
app.use(bodyParser.json());
// lets you access data from the body
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// setting the engine for the view, ejs
app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);

let sess;

//routes ==================================================
// index
router.get("/", (req, res) => {
  sess = req.session;
  res.render("index", {
    pagename: "index",
    sess: sess,
  });
});

// about
router.get("/about", (req, res) => {
  sess = req.session;
  res.render("about", {
    pagename: "about",
    sess: sess,
  });
});

// contact
router.get("/contact", (req, res) => {
  sess = req.session;
  res.render("contact", {
    pagename: "contact",
    sess: sess,
  });
});

// profile
router.get("/profile", (req, res) => {
  sess = req.session;
  if (typeof sess == "undefined" || sess.loggedin != true) {
    let errs = ["Not authenticated user"];
    res.render("index", {
      pagename: "index",
      errs: errs,
    });
  } else {
    res.render("profile", {
      pagename: "profile",
      sess: sess,
    });
  }
});

// registration
router.post("/registration", (req, res) => {
  let errors = [];
  let valid = false;
  // validate blank inputs
  if (req.body.name.trim() == "") {
    errors.push("Name cannot be blank");
  }
  if (req.body.address.trim() == "") {
    errors.push("Address cannot be blank");
  }
  if (req.body.city.trim() == "") {
    errors.push("City cannot be blank");
  }
  if (req.body.zip.trim() == "") {
    errors.push("zip cannot be blank");
  }
  if (req.body.bio.trim() == "") {
    errors.push("bio cannot be empty");
  }
  // regex validate only letters in name
  if (!/^[a-zA-z]+\s[a-zA-Z]+$/.test(req.body.name)) {
    errors.push("Invalid name format");
  }
  // regex validate 5 digit zip
  if (!/^\d{5}$/.test(req.body.zip)) {
    errors.push("Invalid zip code");
  }
  // once valide update valid variable to pass locally
  if (errors.length == 0) {
    valid = true;
  }
  sess = req.session;
  res.render("contact", {
    sess: sess,
    pagename: "contact",
    errs: errors,
    valid: valid,
  });
});

// logout
router.get("/logout", (req, res) => {
  sess = req.session;
  sess.destroy((err) => {
    res.redirect("/");
  });
});

// login
router.post("/login", (req, res) => {
  console.log(req.body);
  let errors = [];
  // validate the email not blank
  if (req.body.email.trim() == "") {
    errors.push("Email cannot be blank");
  }
  // validate the password not blank
  if (req.body.password.trim() == "") {
    errors.push("Password cannot be blank");
  }
  // // validate the email incorrect format
  // if (
  //   !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(req.body.email)
  // ) {
  //   errors.push("Invalid email address");
  // }
  // // validate the password incorrect format
  // if (
  //   !/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(
  //     req.body.password
  //   )
  // ) {
  //   errors.push("Invalid password format");
  // }
  // create a condition test if the email == "mike@aol.com" and password == "!Hello1234"
  if (req.body.email != "Mike@aol.com") {
    errors.push("Username is incorrect");
  }
  if (req.body.password != "abc123") {
    errors.push("Password is incorrect");
  }

  if (errors.length == 0) {
    sess = req.session;
    sess.loggedin = true;
    res.render("profile", {
      pagename: "profile",
      sess: sess,
    });
  } else {
    sess = req.session;
    sess.loggedin = false;
    res.render("index", {
      pagename: "index",
      errs: errors,
      sess: sess,
    });
  }
});

//declare static file locations ========================================
app.use(express.static("views"));
app.use(express.static("public"));

// telling express to use router
// app.use("/", router) mounts the middleware at path "/", then router.get sets the subpath accordingly.
app.use("/", router);

// starting the server
app.listen("8080", () => {
  console.log("server running on port 8080");
});
