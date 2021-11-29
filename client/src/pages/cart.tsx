import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import React from "react";
import Item from "../components/product-item/product-item";
import productsServices from "../services/products.services";
import classes from "./products/products.module.css";
export default class Cart extends React.Component<
  any,
  { cartItems: Array<any>; cartItemIds: any }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      cartItems: [],
      cartItemIds: [],
    };
  }

  addItemtToCartHandler = (productId: any) => {
    this.props.addItemToCart(productId);
  };

  checkOutHandler = () => {
    let cartItemIds = [...new Set(this.state.cartItemIds)];

    let order = cartItemIds.map((itemId, index, array) => {
      return JSON.stringify({
        id: itemId,
        quantity: this.state.cartItemIds.filter((id: any) => id === itemId).length,
      });
    });

    productsServices.placeOrder(JSON.stringify(order));
    this.setState({
      cartItems: [],
      cartItemIds: [],
    });
  };

  clearAllHandler = () => {
    this.setState({
      cartItems: [],
      cartItemIds: [],
    });
  };

  removeProductFromCartHandler = (productId: any) => {
    this.props.removeProductFromCart(productId);
  };

  removeItemFromCartHandler = (productId: any) => {
    this.props.removeItemFromCart(productId);
  };

  componentDidMount() {
    this.setState({
      cartItemIds: this.props.cartItemIds,
      cartItems: [
        ...new Map(
          this.props.cartItems.map((item: any) => [item["id"], item])
        ).values(),
      ],
    });
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.cartItemIds !== this.props.cartItemIds) {
      this.setState({
        cartItemIds: this.props.cartItemIds,
      });
    }
  }

  render() {
    return (
      <div className={classes.main_container}>
        <div className={classes.products_container}>
          <div className={classes.products_list}>
            {this.state.cartItems.map((item: any) => {
              return (
                <Item
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  description={item.description}
                  category={item.category}
                  image={item.image}
                  rating={item.rating}
                  addItemToCart={this.addItemtToCartHandler}
                  removeProductFromCart={this.removeProductFromCartHandler}
                  removeItemFromCart={this.removeItemFromCartHandler}
                  cartItems={this.props.cartItems}
                  quantity={
                    this.state.cartItemIds.filter((id: any) => id === item.id)
                      .length
                  }
                  addedToCart={this.props.cartItemIds.includes(item.id)}
                />
              );
            })}
          </div>
        </div>
        <Card className={classes.footer}>
          <Button onClick={this.clearAllHandler} variant="outlined">
            Clear All
          </Button>
          <Button
            onClick={this.checkOutHandler}
            variant="contained"
            disableElevation
          >
            Check out
          </Button>
        </Card>
      </div>
    );
  }
}
