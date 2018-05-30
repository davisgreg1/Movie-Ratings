import React, { Component, Fragment } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Route, Link, Switch } from "react-router-dom";
import classNames from "classnames";
import TextField from "material-ui/TextField";
import Input, { InputLabel, InputAdornment } from "material-ui/Input";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Paper from 'material-ui/Paper';
import CircularProgress from "material-ui/Progress/CircularProgress";
import { FormControl, FormHelperText } from "material-ui/Form";
import MenuItem from "material-ui/Menu/MenuItem";
import { withStyles } from "material-ui/styles";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Divider from "material-ui/Divider";
import RaisedButton from "material-ui/Button";
import "../../Views/App.css";

import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";

import cloudinary from "cloudinary-core";

const cloudinaryCore = new cloudinary.Cloudinary({
  cloud_name: "movie-fights"
});

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  },
  textField: {
    flexBasis: 200
  }
});
class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      public_id: "",
      newPublic_id: "",
      newUserName: "",
      newFirstName: "",
      newLastName: "",
      newEmail: "",
      newBlurb: "",
      newImgURL: "",
      doneEditing: false,
      validEmail: false,
      showPassword: false,
      cloudResult: false
    };
  }

  makeWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: "movie-fights",
        upload_preset: "mrlvavj5"
      },
      (error, result) => {
        if (!result) {
          return;
        }
        result.map(elem => {
          console.log("cloud result:", result);
          if (!elem.public_id) {
            return "default";
          } else {
            this.setState({
              newPublic_id: elem.public_id,
              newImgURL: elem.path
            });
          }
        });
      }
    );
  };

  handleTextArea = e => {
    this.setState({
      userMessage: e.target.value
    });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  // Track username and password input inside state
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleProfileSubmitForm = e => {
    e.preventDefault();
    let {
      user,
      newUserName,
      newFirstName,
      newLastName,
      newEmail,
      newBlurb,
      newImgURL,
      public_id,
      newPublic_id
    } = this.state;

    axios
      .patch("/users/edit", {
        username: newUserName || user.username,
        firstname: newFirstName || user.firstname,
        lastname: newLastName || user.lastname,
        email: newEmail || user.email,
        blurb: newBlurb || user.blurb,
        imgurl: newImgURL || user.imgurl,
        public_id: newPublic_id || user.public_id
      })
      .then(res => {
        this.setState({
          message: "User Profile updated!"
        });
      })
      .catch(err => {
        this.setState({
          message: "Error updating profile"
        });
      });
  };

  fireRedirect = () => {
    const { doneEditing } = this.state;
    this.setState({
      doneEditing: true
    });
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    return {
      user: nextProps.currentUser
    };
  };

  render() {
    const {
      handleTextArea,
      handleInputChange,
      handleProfileSubmitForm,
      fireRedirect,
      makeWidget,
      handleClickShowPassword,
      handleMouseDownPassword
    } = this;

    const {
      user,
      newUserName,
      newFirstName,
      newLastName,
      newEmail,
      newBlurb,
      newImgURL,
      doneEditing,
      public_id,
      newPublic_id,
      cloudResult
    } = this.state;
    const { currentUser, classes } = this.props;


    if (doneEditing ) {
      window.location.reload()
    }

    return (
      <Fragment>
        <div id="user-profile" className="margin">
          <div className="image-crop margin flex row" id="user_image">
            {!this.state.user ? (
              <CircularProgress
                size={50}
                left={70}
                top={0}
                loadingColor="#FF9800"
                status="loading"
                style={{
                  display: "inlineBlock",
                  position: "relative"
                }}
              />
            ) : (
              // <Paper className={"paper-edit"} elevation={5}>
              <div className="ternary-div">
              <div className="upload_widget_">
                <button id="upload_widget_btn" onClick={makeWidget}>
                  <Image
                    className="upload_widget_img"
                    cloudName="movie-fights"
                    publicId={this.props.currentUser.public_id}
                    crop="scale"
                  >
                  {/* <Transformation effect="vignette:20" quality="100" radius="0" width="250" crop="scale" />
                  <Transformation angle="0" /> */}
                  </Image>
                </button>
                </div>
              <div className="edit-fields">
                <form onSubmit={handleProfileSubmitForm} id="input-container">
                  <div
                    id="user-banner-edit"
                    className="background-banner sq2-edit"
                  >
                    <div className="edit-user-username">
                      <TextField
                        className={classes.textField}
                        id="helperText"
                        defaultValue={user.username}
                        label="Username"
                        name="newUserName"
                        placeholder="New Username"
                        onChange={handleInputChange}
                        margin="normal"
                      />
                    </div>
                    <br />
                    <div className="edit-user-firstname">
                      <TextField
                        className={classes.textField}
                        id="helperText"
                        label="First Name"
                        name="newFirstName"
                        defaultValue={user.firstname}
                        placeholder="First Name"
                        onChange={handleInputChange}
                        margin="normal"
                      />
                    </div>
                    <br />
                    <div className="edit-user-lastname">
                      <TextField
                        className={classes.textField}
                        id="helperText"
                        label="Last Name"
                        name="newLastName"
                        defaultValue={user.lastname}
                        placeholder="Last Name"
                        onChange={handleInputChange}
                        margin="normal"
                      />
                    </div>
                    <br />
                    <div className="edit-user-email">
                      <TextField
                        className={classes.textField}
                        id="helperText"
                        label="Email"
                        name="newEmail"
                        defaultValue={user.email}
                        placeholder="Email"
                        onChange={handleInputChange}
                        margin="normal"
                      />
                    </div>
                    <br />
                    <div className="edit-user-blurb">
                      <TextField
                        className={classes.textField}
                        id="multiline-flexible"
                        multiline
                        rowsMax="10"
                        label="Blurb"
                        name="newBlurb"
                        defaultValue={user.blurb}
                        placeholder="Blurb"
                        onChange={handleInputChange}
                        margin="normal"
                      />
                    </div>
                    <br />
                  </div>
                  <div className="user-info-content">
                    <div id="quick-user-info">
                      <RaisedButton
                        onClick={fireRedirect}
                        variant="Register"
                        label="Register"
                        type="submit"
                        value="submit"
                        primary={true}
                        style={{ backgroundColor: "#253C78", color: "white" }}
                      >
                        Submit
                      </RaisedButton>
                    </div>
                  </div>
                </form>
              </div>
              </div>
              // </Paper>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}
export default withStyles(styles)(EditProfile);
