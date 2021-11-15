import axios from "axios";

export default {
  // Gets products
  getAllProducts: function () {
    return axios.get("http://localhost:9042/products");
  },

  // Gets products by Title
  getProductByTitle: function (title: any) {
    return fetch(`http://localhost:9042/products/${title}`).then((res) =>
      res.json()
    );
  },

  // Place order
  placeOrder: function (products: any) {
    console.log(products);
    return axios
      .post(`http://localhost:9042/orders/`, {
        products: products,
      })
      .then((res) => console.log("order placed"));
  },
};
