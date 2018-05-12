import React, { Component, Fragment } from "react";
import { Redirect } from "react-router";
import { Route, Link } from "react-router-dom";
import { FormControl, FormHelperText } from "material-ui/Form";
import { FormControlLabel, FormGroup } from "material-ui/Form";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "material-ui/Menu/MenuItem";
import IconButton from "material-ui/IconButton";
import Menu from "material-ui/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import RaisedButton from "material-ui/Button";
import Switch from "material-ui/Switch";
import Button from "material-ui/Button";
import Game from "./Game/Game";
import "../Views/App.css";
//Styles for Material UI
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
      user: null,
      anchorEl: null,
      fireRedirect: false
    };
  }

  onLoadNav = () => {
    let open = Boolean(this.state.anchorEl);
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
    return (
      <Fragment>
        <AppBar position="sticky">
          <Toolbar>
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
    let open = Boolean(this.state.anchorEl);
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
    return (
      <Fragment>
        <FormGroup className="seek">
          {/* <FormControlLabel
            control={
              <Switch
                checked={this.props.loggedIn}
                onChange={this.props.handleIWantToLoginChange}
                value={this.props.loggedIn}
                onClick={this.props.handleClick}
                aria-label="LoginSwitch"
              />
            }
            label={!this.props.loggedIn ? "Login/Sign Up" : "Logout"}
          /> */}
        </FormGroup>
        <AppBar position="sticky">
          <Toolbar>
            {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
             <MenuIcon />
           </IconButton> */}
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
              <Button href="/login" className={"classes.button"}>
                Log In
              </Button>
            </div>
          </Toolbar>
        </AppBar>
        {/* <Redirect to={`/`} /> */}
      </Fragment>
    );
  };

  loggedInNav = () => {
    const { user, logOut } = this.props;
    const { anchorEl } = this.state;
    let open = Boolean(this.state.anchorEl);
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
    return (
      <Fragment>
        <FormGroup className="seek">
          <Link to={`/users/${user.username}`}>
            <div title="Profile" />
          </Link>
        </FormGroup>
        <AppBar position="sticky">
          <Toolbar>
            <Link to="/" className="links">
              <Typography
                variant="title"
                color="inherit"
                className={this.props.classes.flex}
              >
                Movie Fights!
              </Typography>
            </Link>
            <Button href="/login" onClick={logOut} className={"classes.button"}>
              Log Out
            </Button>
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
              >
                <Link to={`/users/${user.username}`} className="links"><MenuItem onClick={this.handleClose}>Profile</MenuItem></Link>
                <Link to="/game" className="links">
                  <MenuItem onClick={this.handleClose}>
                    Play Movie Fights!
                  </MenuItem>
                </Link>
                <Link to="/favorites" className="links">
                  <MenuItem onClick={this.handleClose}>
                    Favorites
                  </MenuItem>
                </Link>
              </Menu>
            </div>

            <div className="iconbutton-container">
              {/* <IconButton
                  aria-owns={this.open ? "menu-appbar" : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton> */}
            </div>
          </Toolbar>
        </AppBar>
      </Fragment>
    );
  };

  handleChange = event => {
    if (this.props.user) {
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

  componentDidMount() {
    this.props.getUserInfo;
  }

  goToGame = () => {
    this.setState({
      goToGame: !this.state.goToGame
    });
  };

  render() {
    const { loggedInNav, loggedOutNav, onLoadNav } = this;
    const { anchorEl, fireRedirect, goToGame } = this.state;
    const { user, classes, loggedIn, getUserInfo, logOut } = this.props;

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
