const express = require("express");
const app = express();
const port = 3001;
const path = require("path");
const logger = require("./logger");

/**
 * default logger and importing both jason files and putting the assets folder as static for quests
 */
app.use(logger);
const { products } = require("./assets/data.js");
const { users } = require("./assets/users.js");
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "assets")));

// Route for about page
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

/**
 * returning all products
 */
app.get("/products", (req, res) => {
  res.json(products);
});

/**
 * checking if there is a product with certain ID, if there is, it will return the details about the product
 * we requested, if not it will notify so and return status 404 with message product doesnt exist
 */
app.get("/products/:id", (req, res) => {
  //getting id of a product
  const { id } = req.params;
  const singleProduct = products.find((product) => product.id === Number(id));

  if (!singleProduct) {
    return res.status(404).send("Product Does Not Exist");
  }
  return res.json(singleProduct);
});

/**
 * users with above certain age
 */
app.get("/users", (req, res) => {
  const { age } = req.query;
  console.log(age);
  if (!age) {
    return res.json(users);
  }
  const usersAboveAge = users.filter((user) => user.age >= Number(age));

  if (!usersAboveAge) {
    console.log("here");
    return res.json(users);
  }
  return res.json(usersAboveAge);
});

// 404 error handler
app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
  res.status(404).send("<h1>File not found</h1>");
});

/**
 * port
 */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
