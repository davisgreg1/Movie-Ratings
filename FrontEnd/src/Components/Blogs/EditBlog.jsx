import React, { Component, Fragment } from "react";

import axios from "axios";

import TextField from "material-ui/TextField";

import { withStyles } from "material-ui/styles";

import RaisedButton from "material-ui/Button";

import "../../Views/App.css";

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

  fireRedirect = () => {
    this.setState({
      doneEditing: true
    });
  };

  render() {
    // console.log("state in edit blog:", this.state);
    console.log("props in edit blog:", this.props);
    const { handleEditBlogSubmit, handleInputChange, fireRedirect } = this;
    const { classes, blogToEdit } = this.props;
    const { newBlogBody, newBlogTitle, doneEditing } = this.state;

    if (doneEditing) {
      window.location.reload();
    }

    return (
      <Fragment>
        <div className="edit-fields">
          <form
            id="modal-form"
            className={classes.container}
            noValidate
            autoComplete="off"
            onSubmit={handleEditBlogSubmit}
          >
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
                  id="dumb-btn"
                  style={{ backgroundColor: "#507dbc", color: "white" }}
                  onClick={fireRedirect}
                  disabled={!newBlogBody && !newBlogTitle}
                  variant="Submit"
                  label="Submit"
                  type="submit"
                  value="submit"
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
