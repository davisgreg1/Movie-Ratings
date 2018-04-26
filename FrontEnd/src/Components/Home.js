import React from "react";
import { Redirect } from "react-router";
import { Link, Route } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "material-ui/Switch";
import Input from "material-ui/Input";
import { FormControlLabel, FormGroup } from "material-ui/Form";
import Menu, { MenuItem } from "material-ui/Menu";
import MovieList from "./MovieList";
import "../Views/App.css";

const styles = {
  root: {
    height: "100%",
    flexGrow: 1
  },
  flex: {
    flex: 1,
    color: "white"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

// const _styles = theme => ({
//   container: {
//     display: "flex",
//     alignItems: "flex-start",
//     height: "100%",
//     justifyContent: "center"
//   },
//   input: {
//     margin: theme.spacing.unit,
//     display: "flex"
//   }
// });

const myStyle = {
    display: "flex",
    alignItems: "flex-start",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
}

const inputStyle = {
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
}

const API_KEY = "d3b24aad8f7a69f5d20f89822a6102f8";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    searchText: "",
    data: null,
    auth: false,
    anchorEl: null
  };

  handleInput = e => {
    //   e.preventDefault();
    const { data } = this.state;
    this.setState({
      searchText: e.target.value
    });
    /////////////////////////uncomment the following line to get live updates as you type
    // this.getMovie();
    if (!this.state.searchText.length) {
      this.setState({
        data: null
      });
    }
  };

  getMovie = () => {
    const { searchText } = this.state;
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchText}&page=1&include_adult=false`
      )
      .then(response => {
        console.log("The movie response:", response);
        this.setState({
          data: response.data.results
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  _keyPress = e => {
    //   e.preventDefault();
    if (e.key === "Enter") {
      this.getMovie();
    }
  };

  clearData = () => {
    const { searchText } = this.state;
    if (!searchText) {
      this.setState({
        data: null
      });
    }
  };

  handleChange = (event, checked) => {
    console.log("event in change:", event);
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    console.log("event curr:", event.currentTarget);
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, user } = this.props;
    const { auth, anchorEl, data, searchText } = this.state;
    const { _keyPress, handleInput } = this;
    const open = Boolean(anchorEl);

    console.log("State in Home:", this.state);
    console.log("Props in Home:", this.props);

    if (auth) {
      return <Redirect to="/users/login" />;
    }

    return (
      <React.Fragment>
        <div className={classes.root}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={auth}
                  onChange={this.handleChange}
                  aria-label="LoginSwitch"
                />
              }
              label={auth ? "Logout" : "Login/Sign Up"}
            />
          </FormGroup>
          <AppBar position="sticky">
            <Toolbar>
              {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton> */}
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                Movie Fights!
              </Typography>
              {auth && (
                <div className="iconbutton-container">
                  <IconButton
                    aria-owns={open ? "menu-appbar" : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My Favorites</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
          <div className="search-input-container">
            <div className={classes.container} >
            {/* style={{myStyle}} */}
              <Input
                onChange={handleInput}
                onKeyPress={_keyPress}
                placeholder="Search Movies..."
                className={classes.input}
                // style = {{inputStyle}}
                inputProps={{
                  "aria-label": "Description"
                }}
              />
            </div>
            <div className="home-movie-container">
              {searchText ? <MovieList data={data} /> : null}
            </div>
          </div>
          <div className="default-home-screen" />
        </div>
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
