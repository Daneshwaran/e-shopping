import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Products from "./pages/products/products.component";
import Cart from "./pages/cart";
import Order from "./pages/orders/orders";
import MainNavigation from "./components/layout/MainNavigation";
import Login from "./components/login/login";
export default class App extends React.Component<
  any,
  { cartItems: Array<any>; user: any }
> {
  constructor(props: any) {
    super(props);
    this.state = { cartItems: [], user: "" };
  }

  addItemToCartHandler(productId: any) {
    this.setState((prevState) => {
      return {
        cartItems: [productId, ...prevState.cartItems],
      };
    });
  }

  authUser(user: any) {
    this.setState({
      user: user,
    });
  }

  removeProductFromCartHandler(product: any) {
    this.setState((prevState) => ({
      cartItems: [product, ...prevState.cartItems].filter(
        (item: any) => item.id !== product.id
      ),
    }));
  }

  removeItemFromCartHandler(product: any) {
    this.setState((prevState) => {
      let cartItems = prevState.cartItems;
      cartItems.splice(
        cartItems.findIndex((item) => item.id === product.id),
        1
      );
      return {
        cartItems: cartItems,
      };
    });
  }

  render() {
    return (
      <div className="root_container">
        {this.state.user === "" && (
          <div className="login_container">
            <Login authResponse={this.authUser.bind(this)} />
          </div>
        )}
        {this.state.user !== "" && (
          <div className="main_container">
            <MainNavigation />
            <div className="userName">  Logged in as: {this.state.user}</div>
            <Switch>
              <Route path="/" exact>
                <Products
                  cartItemIds={this.state.cartItems.map((item) => item.id)}
                  addItemToCart={this.addItemToCartHandler.bind(this)}
                  removeProductFromCart={this.removeProductFromCartHandler.bind(
                    this
                  )}
                  removeItemFromCart={this.removeItemFromCartHandler.bind(this)}
                />
              </Route>
              <Route path="/cart">
                <Cart
                  cartItems={this.state.cartItems}
                  cartItemIds={this.state.cartItems.map((item) => item.id)}
                  addItemToCart={this.addItemToCartHandler.bind(this)}
                  removeProductFromCart={this.removeProductFromCartHandler.bind(
                    this
                  )}
                  removeItemFromCart={this.removeItemFromCartHandler.bind(this)}
                />
              </Route>
              <Route path="/orders">
                <Order user={this.state.user} />
              </Route>
            </Switch>
          </div>
        )}
      </div>
    );
  }
}
