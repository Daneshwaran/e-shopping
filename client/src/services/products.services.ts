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

 // Gets all orders
  getOrders: function () {
    return axios.get("http://localhost:9042/orders");
  },

  // Place order
  placeOrder: function (products: any) {
    return axios
      .post(`http://localhost:9042/orders/`, {
        products: products,
      })
      .then((res) => console.log("order placed"));
  },
};
