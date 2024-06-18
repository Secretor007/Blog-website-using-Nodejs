import express from "express";
import body_parser from "body-parser";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var date = new Date();
var today = date.getDate();
var month = months[date.getMonth()];
var year = date.getFullYear();
const app = express();
const port = 3000;
var post = [];
app.use(body_parser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { data: post });
});
app.get("/new-post", (req, res) => {
  res.render("new-post.ejs");
});

app.get("/view-post", (req, res) => {
  var id = req.query.id;
  res.render("post.ejs", { id: id, data: post[id] });
});

app.post("/submit", (req, res) => {
  let new_post = {
    date: `${month} ${today}, ${year}`,
    title: req.body["title"],
    subtitle: req.body["subtitle"],
    author: req.body["author"],
    image: req.body["image"],
    body: req.body["body"],
  };
  post.push(new_post);
  res.redirect("/");
});

app.get("/edit-post", (req, res) => {
  var id = req.query.id;
  res.render("edit-post.ejs", { id: id, data: post[id] });
});

app.post("/edit", (req, res) => {
  let update_post = {
    date: `${month} ${today}, ${year}`,
    title: req.body["title"],
    subtitle: req.body["subtitle"],
    author: req.body["author"],
    image: req.body["image"],
    body: req.body["body"],
  };
  post[req.query.id] = update_post;
  res.redirect("/");
});

app.get("/delete", (req, res) => {
  const index = parseInt(req.query.id);

  if (isNaN(index) || index < 0 || index >= post.length) {
    return res.status(400).send("Invalid index");
  }

  post.splice(index, 1);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
