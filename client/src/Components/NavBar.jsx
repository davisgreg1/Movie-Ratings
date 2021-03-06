import React, {Component, Fragment} from "react";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {FormGroup} from "material-ui/Form";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "material-ui/IconButton";
import Menu from "material-ui/Menu";
import Fade from "@material-ui/core/Fade";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {withStyles} from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import "../Views/App.css";
import {logOutUser} from '../actions/SessionActions.js';

const styles = {
  flex: {
    flex: 1,
    color: "white",
    paddingLeft: "25px"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  root: {
    height: "100%",
    flexGrow: 1
    // width: '100%', maxWidth: 360, backgroundColor:
    // theme.palette.background.paper,
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
        <div className="onLoadNavCont">
          <AppBar position="sticky" className="testBar">
            <Toolbar className="testToolBar">
              <Link to="/">
                <Typography variant="title" color="inherit" className="NavBar-flex-2">
                  Movie Fights!
                </Typography>
              </Link>
            </Toolbar>
          </AppBar>
          <div>LOADING...</div>
        </div>
      </Fragment>
    );
  };

  loggedOutNav = () => {
    return (
      <Fragment>
        <AppBar position="sticky" className="testBar">
          <Toolbar className="testToolBar">
            <Link to="/" className="links">
              <Typography variant="title" color="inherit" className={this.props.classes.flex}>
                Movie Fights!
              </Typography>
            </Link>
            <div className="user-nav-options iconbutton-container">
              <Button href="/login" style={{
                color: "white"
              }}>
                Login/ Sign Up
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </Fragment>
    );
  };

  loggedInNav = () => {
    const {currentUser, logOutCurrentUser} = this.props;

    const {anchorEl} = this.state;
    let open = Boolean(this.state.anchorEl);
    return (
      <Fragment>
        <div className="loggedInNavContainer">
          <FormGroup className="seek">
            <Link to={`/users/${currentUser && currentUser.username}`}>
              <div title="Profile"/>
            </Link>
          </FormGroup>
          <AppBar position="sticky" className="testBar">
            <Toolbar className="testToolBar">
              <Link to="/" className="links">
                <Typography variant="title" color="inherit" className={this.props.classes.flex}>
                  <p className="navBar-p-text">
                    Movie Fights!
                  </p>
                </Typography>
              </Link>
              <div className="user-nav-options">
                <IconButton
                  aria-owns={open
                  ? "menu-appbar"
                  : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit">
                  <AccountCircle/>
                </IconButton>
                <Menu
                  style={{
                  outline: "none"
                }}
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
                  TransitionComponent={Fade}>
                  <List
                    component="nav"
                    style={{
                    outline: "none"
                  }}>
                    <Link to={`/users/${currentUser && currentUser.username}`} className="links">
                      <ListItem onClick={this.handleClose}>My Dashboard</ListItem>
                    </Link>
                    <Link to="/game" className="links">
                      <ListItem onClick={this.handleClose}>Game</ListItem>
                    </Link>
                    <Link to="/favorites" className="links">
                      <ListItem onClick={this.handleClose}>My Favorites</ListItem>
                    </Link>
                    <Link to="/leaderboard" className="links">
                      <ListItem onClick={this.handleClose}>Leaderboard</ListItem>
                    </Link>
                <Button
                  href="/login"
                  onClick={logOutCurrentUser}
                //   style={{
                //   color: "black"
                // }}
                >
                  <p className="navBar-p-text">
                    Logout
                  </p>
                </Button>
                  </List>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
        </div>
      </Fragment>
    );
  };

  handleChange = event => {
    if (this.props.currentUser) {
      this.setState({checked: true});
    } else {
      this.setState({checked: false});
    }
  };

  //Material UI Menu feature
  handleMenu = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  goToGame = () => {
    this.setState({
      goToGame: !this.state.goToGame
    });
  };

  render() {
    const {loggedInNav, loggedOutNav, onLoadNav} = this;
    const {goToGame} = this.state;
    const {loggedIn} = this.props;

    if (goToGame) {}

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
const mapStateToProps = state => ({currentUser: state.sessionReducer.user, isAuthenticated: state.sessionReducer.userAuthenticated});

const mapDispatchToProps = dispatch => ({
  logOutCurrentUser: () => dispatch(logOutUser())

})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavBar))
