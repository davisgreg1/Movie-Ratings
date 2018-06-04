import React, { Component, Fragment } from "react";
import { Redirect } from "react-router";
import { Route, Link, Switch } from "react-router-dom";

import axios from "axios";
import classNames from "classnames";
import TextField from "material-ui/TextField";
// import TextField from '@material-ui/core/TextField'
import Input, { InputLabel, InputAdornment } from '@material-ui/core/Input';
// import Input, { InputLabel, InputAdornment } from "material-ui/Input";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import { FormControl, FormHelperText } from "material-ui/Form";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import RaisedButton from "material-ui/Button";

import "../../Views/App.css";

const getTheTimeBlogIsPosted = event => {
  return event.toISOString();
};

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

class EditBlog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newBlogTitle: "",
      newBlogBody: "",
      finished: false,
      message: "",
      doneEditing: false
    };
  }

  handleEditBlogSubmit = e => {
    e.preventDefault();
    const { newBlogTitle, newBlogBody } = this.state;
    const { currentUser, blogToEdit } = this.props;
    // let timeBlogPosted = new Date(Date.now());
    console.log("currentUser is:", currentUser);
    console.log("Blog to edit is:", blogToEdit);

    axios
      .patch("/users/edit_blog", {
        blog_title: newBlogTitle,
        blog_body: newBlogBody,
        id: this.props.blogToEdit.id
      })
      .then(res => {
        this.setState({
          message: "Blog posted!",
          finished: true
        });
      })
      .catch(err => {
        this.setState({
          message: err
        });
      });
  };

  // Track username and password input inside state
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmitClick = () => {
    this.setState({
      finished: true
    });
  };

  componentDidMount() {
    const { getAllBlogPosts } = this.props;
  }

  fireRedirect = () => {
    const { doneEditing } = this.state;
    this.setState({
      doneEditing: true
    });
  };

  render() {
    // console.log("state in edit blog:", this.state);
    console.log("props in edit blog:", this.props);
    const {
      handleEditBlogSubmit,
      getTheTimeBlogIsPosted,
      handleInputChange,
      fireRedirect,
      handleSubmitClick
    } = this;
    const {
      allBlogs,
      currentUser,
      classes,
      blogToEdit
    } = this.props;
    const { newBlogBody, newBlogTitle, finished, doneEditing } = this.state;

    if (doneEditing) {
      window.location.reload();
    }

    return (
      <Fragment>
        <div style={this.props.style} className="edit-fields">
          <form  id="modal-form" className={classes.container} noValidate autoComplete="off" onSubmit={handleEditBlogSubmit}>
            <div id="user-banner-edit" className="background-banner sq2-edit">
              <div className="text-field">
                <TextField
                  className={classes.textField}
                  id="helper-text"
                  name="newBlogTitle"
                  fullWidth="true"
                  defaultValue={blogToEdit.blog_title}
                  label="Edited Title"
                  placeholder="New Title"
                  onChange={handleInputChange}
                  margin="normal"
                />
              </div>
              <div className="text-field">
                <TextField
                  className={classes.textField}
                  id="multiline-flexible"
                  fullWidth="true"
                  name="newBlogBody"
                  defaultValue={blogToEdit.blog_body}
                  label="Edited Blog Text"
                  multiline
                  rowsMax="20"
                  placeholder="What's up?"
                  onChange={handleInputChange}
                  margin="normal"
                />
              </div>
              <br />
            </div>
            <div className="user-info-content">
              <div id="quick-user-info">
                <RaisedButton
                  style={{ backgroundColor: "rgba(70, 73, 71, 0.83)", color: "white" }}
                  onClick={fireRedirect}
                  disabled={!newBlogBody && !newBlogTitle}
                  variant="Submit"
                  label="Submit"
                  type="submit"
                  value="submit"
                  // primary={true}
                >
                  Submit
                </RaisedButton>
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}
export default withStyles(styles)(EditBlog);
