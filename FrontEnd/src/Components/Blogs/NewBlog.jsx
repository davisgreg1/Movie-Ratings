import React, { Component, Fragment } from "react";
import { Redirect } from "react-router";
import { Route, Link, Switch } from "react-router-dom";

import axios from "axios";
import classNames from "classnames";
import TextField from "material-ui/TextField";
import Input, { InputLabel, InputAdornment } from "material-ui/Input";
import Paper from "material-ui/Paper";
// import CircularProgress from "material-ui/Progress/CircularProgress";
import { FormControl, FormHelperText } from "material-ui/Form";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import RaisedButton from "material-ui/Button";

import "../../Views/App.css";

// ;
// console.log();

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

class NewBlog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newBlogTitle: "",
      newBlogBody: "",
      finished: false,
      message: ""
    };
  }

  handleNewBlogSubmit = e => {
    e.preventDefault();
    const { newBlogTitle, newBlogBody } = this.state;
    const { currentUser } = this.props;
    let timeBlogPosted = new Date(Date.now());
    console.log("timeBlogPosted.toISOString()", timeBlogPosted.toISOString());
    console.log("currentUser is:", currentUser);

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
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmitClick = () => {
    this.setState({
      finished: true
    })
  }

  componentDidMount() {
    const { getAllBlogPosts } = this.props;
    // getAllBlogPosts();
  }

  render() {
    console.log("state in NewBlog:", this.state);
    const {
      handleNewBlogSubmit,
      getTheTimeBlogIsPosted,
      handleInputChange,
      fireRedirect,
      handleSubmitClick
    } = this;
    const { allBlogs, currentUser, classes } = this.props;
    const { newBlogBody, newBlogTitle, finished } = this.state;

    if(finished){
      return <Redirect from={`/users/${currentUser.username}/blog`} to={`/users/${currentUser.username}`}/>
    }

    return (
      <Fragment>
        <div className="edit-fields">
          <form onSubmit={handleNewBlogSubmit} id="input-container">
            <div id="user-banner-edit" className="background-banner sq2-edit">
              <div className="edit-user-username">
                <TextField
                  className={classes.textField}
                  id="helperText"
                  //   defaultValue={"New Title"}
                  label="New Blog Title"
                  name="newBlogTitle"
                  placeholder="Title"
                  onChange={handleInputChange}
                  margin="normal"
                />
              </div>
              <br />
              <div className="edit-user-firstname">
                <TextField
                  className={classes.textField}
                  id="multiline-flexible"
                  multiline
                  rowsMax="20"
                  label="New Blog Text"
                  name="newBlogBody"
                  //   defaultValue={"New Blog"}
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
                  onClick={()=>this.handleSubmitClick}
                  disabled={!newBlogBody && !newBlogTitle}
                  variant="Submit"
                  label="Submit"
                  type="submit"
                  value="submit"
                  primary={true}
                  style={{ backgroundColor: "#253C78", color: "white" }}
                >
                  Submit
                </RaisedButton>
              </div>
              {/* <RaisedButton>View Profile</RaisedButton> */}
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}
export default withStyles(styles)(NewBlog);
