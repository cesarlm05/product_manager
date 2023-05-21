import express from "express";
import ProductManager from "./productManager.js";

const app = express();
const port = 8080;

const productManager = new ProductManager("products.json");

app.get("/products", (req, res) => {
  const limit = req.query.limit;
  let products = productManager.getAllProducts();
  if (limit) {
    products = products.slice(0, limit);
  }
  res.send({ products: products });
});

app.get("/products/:pid", (req, res) => {
  const pid = req.params.pid;
  const product = productManager.getProductById(pid);
  res.send({ product: product });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});