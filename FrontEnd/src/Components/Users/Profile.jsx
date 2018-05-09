import React from "react";
import { Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
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
import NavBar from '../NavBar';

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

  // componentWillMount = () => {
  //   if (this.props.user) {
  //     this.setState({
  //       user: this.props.user,
  //       auth: true
  //     });
  //   }
  // };

  getProfileUser = () => {
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
    if (this.props.match.params.username !== this.state.profileUser.username) {
      this.getProfileUser();
    }
  };

  componentDidMount() {
    const { getProfileUser } = this;
    getProfileUser();
  }

  render() {
    const { classes, currentUser } = this.props;
    const { auth, anchorEl, fireRedirect, profileUser } = this.state;
    const open = Boolean(anchorEl);

    // if (fireRedirect) {
    //   return <Redirect to={`/`} />;
    // }

    return (
      <React.Fragment>
        <div className={"classes.root"}>
        {/* <NavBar/> */}
          Welcome {profileUser.username} currentscore:{this.props.score}
        </div>
      </React.Fragment>
    );
  }
}
export default Profile;
