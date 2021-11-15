import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default class SearchBox extends React.Component<any, { value: any }> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: "",
    };
  }
  searchHandler = () => {
    this.props.onSearch(this.state.value);
  };

  handleChange = (event: any) => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 800 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for products"
          inputProps={{ "aria-label": "search for products" }}
          value={this.state.value}
          onChange={this.handleChange}
        />
        <IconButton
          onClick={(e)=>{
            e.preventDefault();
            this.searchHandler();
          }
          }
          type="submit"
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    );
  }
}
