import express from "express";
import ProductManager from "./productManager.js";

const app = express();
const port = 8080;

const productManager = new ProductManager("products.json");

app.get("/products", async (req, res) => {
  const limit = req.query.limit;
  let products = await productManager.getAllProducts();
  if (limit) {
    products = products.slice(0, limit);
  }
  res.send({ products: products });
});

app.get("/products/:pid", async (req, res) => {
  const pid = req.params.pid;
  const product = await productManager.getProductById(pid);
  res.send({ product: product });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});