import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";

import { FormGroup } from "material-ui/Form";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "material-ui/Menu/MenuItem";
import IconButton from "material-ui/IconButton";
import Menu from "material-ui/Menu";
import Fade from "@material-ui/core/Fade";

import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";

import Button from "material-ui/Button";

import "../Views/App.css";

const styles = {
  root: {
    height: "100%",
    flexGrow: 1
  },
  flex: {
    flex: 1,
    color: "white",
    paddingLeft: "0px"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      anchorEl: null,
      fireRedirect: false
    };
  }

  onLoadNav = () => {
    return (
      <Fragment>
        <AppBar position="sticky" className="testBar">
          <Toolbar className="testToolBar">
            <Link to="/">
              <Typography
                variant="title"
                color="inherit"
                className="NavBar-flex-2"
              >
                Movie Fights!
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <div>LOADING...</div>
      </Fragment>
    );
  };

  loggedOutNav = () => {
    return (
      <Fragment>
        <AppBar position="sticky" className="testBar">
          <Toolbar className="testToolBar">
            <Link to="/" className="links">
              <Typography
                variant="title"
                color="inherit"
                className="NavBar-flex-2"
              >
                Movie Fights!
              </Typography>
            </Link>
            <div className="iconbutton-container">
              <Button href="/login" style={{ color: "white" }}>
                Login/ Sign Up
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </Fragment>
    );
  };

  loggedInNav = () => {
    const { currentUser, logOut } = this.props;
    const { anchorEl } = this.state;
    let open = Boolean(this.state.anchorEl);
    return (
      <Fragment>
        <FormGroup className="seek">
          <Link to={`/users/${currentUser.username}`}>
            <div title="Profile" />
          </Link>
        </FormGroup>
        <AppBar position="sticky" className="testBar">
          <Toolbar className="testToolBar">
            <Link to="/" className="links">
              <Typography
                variant="title"
                color="inherit"
                className={this.props.classes.flex}
              >
                Movie Fights!
              </Typography>
            </Link>
            <div>
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
                TransitionComponent={Fade}
              >
                <Link to={`/users/${currentUser.username}`} className="links">
                  <MenuItem onClick={this.handleClose}>My Dashboard</MenuItem>
                </Link>
                <Link to="/game" className="links">
                  <MenuItem onClick={this.handleClose}>Game</MenuItem>
                </Link>
                <Link to="/favorites" className="links">
                  <MenuItem onClick={this.handleClose}>My Favorites</MenuItem>
                </Link>
                <Link to="/leaderboard" className="links">
                  <MenuItem onClick={this.handleClose}>Leaderboard</MenuItem>
                </Link>
              </Menu>
              <Button href="/login" onClick={logOut} style={{ color: "white" }}>
                Logout
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </Fragment>
    );
  };

  handleChange = event => {
    if (this.props.currentUser) {
      this.setState({
        checked: true
      });
    } else {
      this.setState({
        checked: false
      });
    }
  };

  //Material UI Menu feature
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  doSum = () => {
    window.alert("nah");
  };

  goToGame = () => {
    this.setState({
      goToGame: !this.state.goToGame
    });
  };

  render() {
    const { loggedInNav, loggedOutNav, onLoadNav } = this;
    const { goToGame } = this.state;
    const { loggedIn } = this.props;

    if (goToGame) {
      console.log("clicked");
    }

    if (loggedIn) {
      return loggedInNav();
    }

    if (loggedIn === null) {
      return onLoadNav();
    }

    if (!loggedIn) {
      return loggedOutNav();
    }
  }
}
export default withStyles(styles)(NavBar);
