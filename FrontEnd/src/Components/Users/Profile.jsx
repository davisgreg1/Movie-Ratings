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
const profileStyle = {
  border:"5px solid black",
  borderRadius: "7em",
}

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
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

  componentDidMount() {
    const { getUserScore } = this.props;
    getUserScore();
  }

  render() {
    const { classes, currentUser, score, getUserScore } = this.props;
    const {
      auth,
      anchorEl,
      fireRedirect
  
    } = this.state;
    const open = Boolean(anchorEl);
    console.log("state in profile:", this.state);
    console.log("props in profile:", this.props);
    return (
      <React.Fragment>
        {currentUser ? (
          <div className = "flex profile">
          <div className={"classes.root"}>
            Welcome {currentUser.username} currentscore:{addCommas(score)}
            </div>
            <div className="flex">
              <img src={currentUser.imgurl} width="200px" height="200px" style={profileStyle} alt={`Photo of ${currentUser.firstname}`}/>
            </div>
          </div>
          
        ) : (
          <div>Must Be Logged In...</div>
        )}
      </React.Fragment>
    );
  }
}
export default Profile;
