import React, { Component, Fragment } from "react";
import axios from "axios";
import TextField from "material-ui/TextField";
import CircularProgress from "material-ui/Progress/CircularProgress";
import { withStyles } from "material-ui/styles";
import RaisedButton from "material-ui/Button";
import "../../Views/App.css";
import { Image } from "cloudinary-react";

// import cloudinary from "cloudinary-core";

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
      cloudResult: false,
      imageChanged: false
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
        // eslint-disable-next-line
        result.map(elem => {
          if (!elem.public_id) {
            return "default";
          } else {
            this.setState({
              newPublic_id: elem.public_id,
              newImgURL: elem.path,
              imageChanged: true
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
      handleInputChange,
      handleProfileSubmitForm,
      fireRedirect,
      makeWidget
    } = this;

    const {
      user,
      doneEditing,
      newPublic_id,
      imageChanged
    } = this.state;
    const { classes } = this.props;
    const base = "http://res.cloudinary.com/movie-fights/image/upload/a_auto/";

    if (doneEditing) {
      window.location.reload();
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
              <div className="ternary-div">
                <div className="upload_widget_">
                  <button id="upload_widget_btn" onClick={makeWidget}>
                    {!imageChanged ? (
                      <Image
                        className="upload_widget_img"
                        cloudName="movie-fights"
                        publicId={this.props.currentUser.public_id}
                        crop="scale"
                      />
                    ) : (
                      <Image
                        className="upload_widget_img"
                        cloudName="movie-fights"
                        publicId={base + newPublic_id}
                        crop="scale"
                      />
                    )}
                  </button>
                </div>
                <div className="edit-fieldss">
                  <form
                    className={classes.container}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleProfileSubmitForm}
                  >
                    <div
                      id="user-banner-edit"
                      className="background-banner sq2-edit"
                    >
                      <div>
                        <TextField
                          className={classes.textField}
                          id="helper-text"
                          defaultValue={user.username}
                          label="Username"
                          name="newUserName"
                          placeholder="New Username"
                          onChange={handleInputChange}
                          margin="normal"
                        />
                      </div>
                      <br />
                      <div>
                        <TextField
                          className={classes.textField}
                          id="helper-text"
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
                          id="helper-text"
                          label="Last Name"
                          fullWidth="true"
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
                          id="helper-text"
                          label="Email"
                          fullWidth="true"
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
                          fullWidth="true"
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
                          style={{
                            backgroundColor: "rgb(70, 73, 71, 0.83)",
                            color: "white"
                          }}
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
