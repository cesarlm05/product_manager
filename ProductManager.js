import fs from 'fs';

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(product) {
    const products = await this.getProducts();
    const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    product.id = id;
    products.push(product);
    await this.saveProducts(products);
    return product;
  }

  async getProducts() {
    try {
        const data = await fs.promises.readFile(this.path);
        return JSON.parse(data.toString());
    } catch (error) {
        console.log(error);
        return [];
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find(product => product.id == id);
  }

  async updateProduct(id, productData) {
    const products = await this.getProducts();
    const index = products.findIndex(product => product.id == id);
    if (index !== -1) {
        const product = products[index];
        product.title = productData.title || product.title;
        product.description = productData.description || product.description;
        product.price = productData.price || product.price;
        product.thumbnail = productData.thumbnail || product.thumbnail;
        product.code = productData.code || product.code;
        product.stock = productData.stock || product.stock;
        products[index] = product;
        await this.saveProducts(products);
        return product;
    }
    return null;
  }

  async deleteProduct(id) {
    let products = await this.getProducts();
    products = products.filter(product => product.id != id);
    await this.saveProducts(products);
  }

  async saveProducts(products) {
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
  }
}


const productManager = new ProductManager('products.json');
const product = {
  title: 'Kit de teclado y mouse',
  description: 'inalámbrico Logitech MK235',
  price: 15990,
  thumbnail: 'https://www.istore.co.za/media/PO-banner_1.png',
  code: '23234',
  stock: 65,
};
//productManager.addProduct(product);
//productManager.updateProduct(1,product)
//productManager.deleteProduct(2)