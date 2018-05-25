import React from "react";
import { Route, Link, Redirect } from "react-router-dom";
import axios from "axios";
import dateFormat from 'dateformat';
import { withStyles } from "material-ui/styles";
import { FormControlLabel, FormGroup } from "material-ui/Form";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import CircularProgress from "material-ui/Progress/CircularProgress";
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
  },
  pos: {
    marginBottom: 12
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  card: {
    minWidth: 275
  }
};
const profileStyle = {
  border: "5px solid black",
  borderRadius: "7em"
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    auth: false,
    anchorEl: null,
    fireRedirect: false,
    blogs: null
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

  getAllBlogPosts = () => {
    axios
      .get("/users/all_blogs")
      .then(res => {
        this.setState({
          blogs: res.data.body
        });
      })
      .catch(err => {
        console.log("Error Getting Blogs:", err);
      });
  };

  componentDidMount() {
    const { getUserScore, allBlogs, getAllBlogPosts } = this.props;
    // const { getAllBlogPosts } = this;
    getUserScore();
    getAllBlogPosts();
  }

  // static getDerivedStateFromProps = (nextProps, prevState) => {
  //   console.log("nextProps:", nextProps);
  //   console.log("prevState:", prevState);
  //   return {
  //     blogs: nextProps.allBlogs
  //   };
  // };

  render() {
    const {
      classes,
      currentUser,
      score,
      getUserScore,
      allBlogs,
      getAllBlogPosts
    } = this.props;
    const { auth, anchorEl, fireRedirect, blogs } = this.state;
    const open = Boolean(anchorEl);
    const base = "http://res.cloudinary.com/movie-fights/image/upload/";
    console.log("Blogs??:", allBlogs);

    return (
      <React.Fragment>
        {currentUser ? (
          <div className="flex profile">
            <div className="flex profile-img">
              <img
                src={`${base}${currentUser.imgurl}`}
                width="200px"
                height="200px"
                style={profileStyle}
                alt={`Photo of ${currentUser.firstname}`}
              />
              <a href={`/users/${currentUser.username}/edit`}>Edit Profile</a>
            </div>
            <div className={"classes.root"}>
              Welcome {currentUser.firstname} currentscore:{addCommas(score)}
            </div>
            {/* CSS HERE ⏬ */}
            <div className="blog-section">
              {!allBlogs ? (
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
                allBlogs.map(elem => (
                  <Card
                  className={classes.card}>
                    <CardContent>
                      <Typography
                        variant="headline"
                        component="h5"
                        className={classes.title}
                        color="textSecondary"
                      >
                        {elem.blog_title}
                      </Typography>
                      <Typography component="p">{elem.blog_body}</Typography>
                      <Typography className={classes.pos} color="textSecondary">
                      Posted on {dateFormat(elem.time_posted,"fullDate")} at {dateFormat(elem.time_posted,"shortTime")}
                      </Typography>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        ) : (
          <div>Must Be Logged In...</div>
        )}
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(Profile);
