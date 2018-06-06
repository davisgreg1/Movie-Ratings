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

class NewBlog extends Component {
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

  handleNewBlogSubmit = e => {
    e.preventDefault();
    const { newBlogTitle, newBlogBody } = this.state;

    axios
      .post("/users/new_blog", {
        blog_title: newBlogTitle,
        blog_body: newBlogBody
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
    const { handleNewBlogSubmit, handleInputChange, fireRedirect } = this;
    const { classes } = this.props;
    const { newBlogBody, newBlogTitle, doneEditing } = this.state;

    if (doneEditing) {
      window.location.reload();
    }

    return (
      <Fragment>
        <div style={this.props.style} className="edit-fields">
          <form id="modal-form" onSubmit={handleNewBlogSubmit}>
            <div id="user-banner-edit" className="background-banner sq2-edit">
              <div className="text-field">
                <TextField
                  className={classes.textField}
                  id="helper-text"
                  fullWidth="true"
                  label="New Blog Title"
                  name="newBlogTitle"
                  placeholder="Title"
                  onChange={handleInputChange}
                  margin="normal"
                />
              </div>
              <br />
              <div className="text-field">
                <TextField
                  className={classes.textField}
                  id="multiline-flexible"
                  fullWidth="true"
                  multiline
                  rowsMax="20"
                  label="New Blog Text"
                  name="newBlogBody"
                  placeholder="What's up?"
                  onChange={handleInputChange}
                  margin="normal"
                />
              </div>
              <br />
            </div>
            <div>
              <div id="quick-user-info">
                <RaisedButton
                  onClick={fireRedirect}
                  disabled={!newBlogBody && !newBlogTitle}
                  variant="Submit"
                  label="Submit"
                  type="submit"
                  value="submit"
                  style={{ backgroundColor: "gray;", color: "white" }}
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
export default withStyles(styles)(NewBlog);
