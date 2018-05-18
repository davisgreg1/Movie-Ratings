import React from "react";
import { Route, Link, Redirect } from "react-router-dom";
import axios from "axios";
import { withStyles } from "material-ui/styles";
import { FormControlLabel, FormGroup } from "material-ui/Form";
import AppBar from "material-ui/AppBar";
import Switch from "material-ui/Switch";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NavBar from "../NavBar";
import Menu, { MenuItem } from "material-ui/Menu";
import "../../Views/App.css";
import { addCommas } from "../../utils/movieData";

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
    loggedInUser: null,
    profileUser: {},
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
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  getProfileUser = () => {
    console.log(
      "this.props.match.params.username:",
      this.props.match.params.username
    );
    let username = this.props.match.params.username;
    axios
      .get(`/users/getuser/${username}`)
      .then(res => {
        let profileUser = res.data.user;
        this.setState({
          profileUser: profileUser
        });
      })
      .catch(err => {
        this.setState({
          message: err
        });
      });
  };

  checkReload = () => {
    if (this.props.match.params.username !== this.state.loggedInUser.username) {
      this.getProfileUser();
    }
  };

  componentDidMount() {
    const { getProfileUser } = this;
    const { getUserScore } = this.props;
    getProfileUser();
    getUserScore();
  }

  componentWillMount() {
    this.setState({
      loggedInUser: this.props.currentUser
    });
  }

  render() {
    const { classes, currentUser, score, getUserScore } = this.props;
    const {
      auth,
      anchorEl,
      fireRedirect,
      profileUser,
      loggedInUser
    } = this.state;
    const open = Boolean(anchorEl);
    console.log("state in profile:", this.state);
    console.log("props in profile:", this.props);
    return (
      <React.Fragment>
        {loggedInUser ? (
          <div className={"classes.root"}>
            Welcome {loggedInUser.username} currentscore:{addCommas(score)}
          </div>
        ) : (
          <div>Must Be Logged In...</div>
        )}
      </React.Fragment>
    );
  }
}
export default Profile;
