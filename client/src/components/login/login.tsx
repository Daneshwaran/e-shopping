import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import * as React from "react";
import Classes from "../login/login.module.css";
import usersService from "../../services/users.services";

export default class Login extends React.Component<
  any,
  { email: any; password: any }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  emailHandler = (event: any) => {
    this.setState({
      email: event.target.value,
    });
  };

  passwordHandler = (event: any) => {
    this.setState({
      password: event.target.value,
    });
  };

  loginHandler = () => {
    usersService
      .authenticateUsers({
        email: this.state.email,
        password: this.state.password,
      })
      .then((res: any) => {
        if(res.data === 'success') this.props.authResponse(this.state.email);
      });
  };

  render() {
    return (
      <Card className={Classes.main_container}>
        Login
        <TextField
          id="outlined-basic-email"
          label="Email"
          variant="outlined"
          onChange={this.emailHandler}
        />
        <TextField
          id="outlined-basic-password"
          label="Password"
          variant="outlined"
          type="password"
          onChange={this.passwordHandler}
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            this.loginHandler();
          }}
          variant="contained"
          disableElevation
        >
          Login
        </Button>
      </Card>
    );
  }
}
