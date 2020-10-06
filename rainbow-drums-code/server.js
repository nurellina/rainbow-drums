const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index");
});
app.listen(PORT, () => {
  console.log("The app is running on port ${PORT}");
});
