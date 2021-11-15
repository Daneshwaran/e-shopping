import React from "react";
import ProductsService from "../../services/products.services";
import Item from "../../components/product-item/product-item";
import classes from "./products.module.css";
import SearchBox from "../../components/search-box/search-box";

class Products extends React.Component<
  any,
  { products: Array<any>; cartItemIds: any }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      products: [],
      cartItemIds: [],
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  async getProducts() {
    let data = await ProductsService.getAllProducts().then((res) => {
      return res.data.rows;
    });
    this.setState({ products: data });
  }

   searchHandler = async (value: any) => {
    let data = await ProductsService.getProductByTitle(value).then(
      (res: any) => {
        return res.rows;
      }
    );
    this.setState({ products: data });
  }

  addItemtToCartHandler = (productId: any) => {
    this.props.addItemToCart(productId);
  };

  removeProductFromCartHandler = (productId: any) => {
    this.props.removeProductFromCart(productId);
  };

  removeItemFromCartHandler = (productId: any) => {
    this.props.removeItemFromCart(productId);
  };

  componentDidUpdate(prevProps: any) {
    if (prevProps.cartItemIds !== this.props.cartItemIds) {
      this.setState({
        cartItemIds: this.props.cartItemIds,
      });
    }
  }

  render() {
    return (
      <div className={classes.products_container}>
        <SearchBox onSearch={this.searchHandler} />
        <br />
        <div className={classes.products_list}>
          {this.state.products.map((item: any) => {
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
    );
  }
}

export default Products;
