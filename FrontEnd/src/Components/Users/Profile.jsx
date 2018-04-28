import React from "react";
import { Route, Link, Redirect } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import { FormControlLabel, FormGroup } from "material-ui/Form";
import AppBar from "material-ui/AppBar";
import Switch from "material-ui/Switch";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu, { MenuItem } from "material-ui/Menu";
import "../../Views/App.css";

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

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    user: null,
    auth: false,
    anchorEl: null,
    fireRedirect: false
  };

  handleChange = () => {
    this.setState({
      fireRedirect: !this.state.fireRedirect
    });
  };

  handleMenu = event => {
    console.log("event curr:", event.currentTarget);
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  componentWillMount = () => {
    if (this.props.user) {
      this.setState({
        user: this.props.user,
        auth: true
      });
    }
  };

  render() {
    console.log("props in Profile:", this.props);
    console.log("the state in profile:", this.state);
    console.log("auth?", this.state.auth);
    const { classes, user } = this.props;
    const { auth, anchorEl, fireRedirect } = this.state;
    const open = Boolean(anchorEl);

    if (fireRedirect) {
      return <Redirect to={`/`} />;
    }

    return (
      <React.Fragment>
        <div className={classes.root}>
          <FormGroup className="seek">
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
              <Link to="/">
                <Typography
                  variant="title"
                  color="inherit"
                  className={classes.flex}
                >
                  Movie Fights!
                </Typography>
              </Link>
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
        </div>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(Profile);
