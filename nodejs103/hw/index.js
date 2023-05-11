const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");

/* ---------------------------- setups and config --------------------------- */
const app = express();
const membersArr = [
  { id: uuid.v4(), name: "Mario", email: "mario@mail.com" },
  { id: uuid.v4(), name: "Luigi", email: "luigi@mail.com" },
  { id: uuid.v4(), name: "Yoshi", email: "yoshi@mail.com" }
];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

/* ------------------------------- middleware ------------------------------- */
// app.use("/members", require("./routes/members"));

// homepage(input)
app.get("/", (req, res, next) => {
  // const user = req.query.username || "andasan";

  res.render("index");
});
// members page
app.post("/", (req, res, next) => {
  //retrieve the form data from the req.body
  const { name, email } = req.body; // { name: "abc", password: "123"}
  const newData = {
    id: uuid.v4(),
    name: name,
    email: email
  };
  membersArr.push(newData);
  res.render("members", { members: membersArr });
});

app.get("/members", (req, res, next) => {
  res.render("members", { members: membersArr });
});

app.get("/members/:id", (req, res) => {
  const paramsID = req.params.id;

  const found = membersArr.find((member) => member.id === paramsID);

  if (found) {
    res.render("member", { member: found });
  } else {
    res.status(400).json({ msg: `The Member is not found ` });
  }
});

app.use((req, res) => res.sendFile(path.join(__dirname, "public", "404.html")));

/* -------------------------------- listener -------------------------------- */
const PORT = process.env.PORT || 8000;
app.listen(PORT);
