import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import classes from "./orders.module.css";
import productsService from "../../services/products.services";
export default class Orders extends React.Component<
  any,
  { orders: Array<any> }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      orders: [],
    };
  }

  async componentDidMount() {
    let data = await productsService.getAllProducts().then((res) => {
      return res.data.rows;
    });

    let products = data.reduce((acc: any, item: any) => {
      acc[item.id] = item;
      return acc;
    }, {});

    productsService.getOrders().then((res: any) => {
      let orders = res.data.rows
        .map((item: any) => {
          return JSON.parse(item.orders).map((product: any) => {
            return {
              ...JSON.parse(product),
              date: item.date,
              user: item.email,
            };
          });
        })
        .flat()
        .filter((item: any) => item.user === this.props.user)
        .map((item: any) => {
          return { ...item, title: products[item.id].title };
        });
      this.setState({
        orders: orders,
      });
      console.log(orders);
    });
  }

  render() {
    return (
      <div className={classes.main_container}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="left">Product</TableCell>
                <TableCell align="left">Quantity</TableCell>
              </TableRow>
            </TableHead>
            {this.state.orders.length > 0 && (
              <TableBody>
                {this.state.orders.map((row: any, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.date}
                    </TableCell>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">{row.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>
    );
  }
}
