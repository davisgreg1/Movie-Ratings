import React from "react";
import { Route, Link, Redirect } from "react-router-dom";
import axios from "axios";
import dateFormat from "dateformat";
import { withStyles } from "material-ui/styles";
import { FormControlLabel, FormGroup } from "material-ui/Form";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import CircularProgress from "material-ui/Progress/CircularProgress";
import Divider from "material-ui/Divider";
import AppBar from "material-ui/AppBar";
import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";
import ListItemText from "material-ui/List/ListItemText";
import Modal from "material-ui/Modal";
import Avatar from "material-ui/Avatar";
import Switch from "material-ui/Switch";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "material-ui/Button";
import NavBar from "../NavBar";
import Menu, { MenuItem } from "material-ui/Menu";
import "../../Views/App.css";
import { addCommas } from "../../utils/movieData";
import EditProfile from "./EditProfile";
import NewBlog from "../Blogs/NewBlog";

//Styles for Material UI
// const styles = theme => ({
// paper: {
//   position: "absolute",
//   width: theme.spacing.unit * 50,
//   backgroundColor: theme.palette.background.paper,
//   boxShadow: theme.shadows[5],
//   padding: theme.spacing.unit * 4
// },
// root: {
//   height: "100%",
//   flexGrow: 1
// },
// flex: {
//   flex: 1,
//   color: "white",
//   paddingLeft: "0px"
// },
// menuButton: {
//   marginLeft: -12,
//   marginRight: 20
// },
// pos: {
//   marginBottom: 12
// },
// title: {
//   marginBottom: 16,
//   fontSize: 14
// },
// card: {
//   minWidth: 275,
//   width: "50vw"
// }
// });

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
    minWidth: 275,
    width: "50vw"
  },
  paper: {
    position: "absolute",
    backgroundColor: "black"
  }
};

const profileStyle = {
  border: "5px solid black",
  borderRadius: "7em"
};

const modalStyleEdit = {
  display: "flex",
  boxSizing: "borderBox",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  boxShadow: "10px 5px 5px black"

  // opacity: ".9"
};

const modalStyleBlog = {
  display: "flex",
  boxSizing: "borderBox",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  boxShadow: "10px 5px 5px black"

  // opacity: ".9"
};
const modalIsOpen = {
  filter: "blur(5px) grayscale(50%)"

  //  transform:" scale(0.9)",
};

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    auth: false,
    anchorEl: null,
    fireRedirect: false,
    blogs: null,
    isHide: false,
    editOpen: false,
    blogOpen: false
  };

  hidePic = () => {
    let { isHide } = this.state;
    window.scrollY > this.prev
      ? !isHide && this.setState({ isHide: true })
      : isHide && this.setState({ isHide: false });

    this.prev = window.scrollY;
  };

  handleBlogOpen = e => {
    e.stopPropagation();
    this.setState({ blogOpen: true });
  };
  handleEditOpen = e => {
    e.stopPropagation();
    this.setState({ editOpen: true });
  };

  handleBlogModalClose = e => {
    e.stopPropagation();
    this.setState({ blogOpen: false });
  };

  handleEditModalClose = e => {
    e.stopPropagation();
    this.setState({ editOpen: false });
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
    window.addEventListener("scroll", this.hidePic);
    getUserScore();
    getAllBlogPosts();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.hidePic);
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
    const {
      auth,
      anchorEl,
      fireRedirect,
      blogs,
      isHide,
      blogOpen,
      editOpen
    } = this.state;
    const open = Boolean(anchorEl);
    const base = "http://res.cloudinary.com/movie-fights/image/upload/";
    let classHide = isHide ? "fadeOut" : "fadeIn";
    console.log("Blogs??:", allBlogs);

    return (
      <React.Fragment>
        {currentUser ? (
          <div
            className="flex profile"
            style={blogOpen || editOpen ? modalIsOpen : null}
          >
            <div className={"animated profile-img " + classHide}>
              <img
                src={`${base}${currentUser.imgurl}`}
                width="175px"
                height="175px"
                style={profileStyle}
                alt={`Photo of ${currentUser.firstname}`}
              />
              <p className="blurb">"{currentUser.blurb}"</p>
              <div>
                <Modal
                  style={modalStyleBlog}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={this.state.blogOpen}
                  onClose={this.handleBlogModalClose}
                >
                  <NewBlog currentUser={currentUser} />
                </Modal>
                <Button onClick={this.handleBlogOpen}>New Blog</Button>
              </div>
              <div>
                <Modal
                  style={modalStyleEdit}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={this.state.editOpen}
                  onClose={this.handleEditModalClose}
                >
                  <EditProfile currentUser={currentUser} />
                </Modal>
                <Button onClick={this.handleEditOpen}>Edit Profile</Button>
              </div>
            </div>
            <div className={"welcome-message-profile"}>
              Welcome {currentUser.firstname} currentscore:{addCommas(score)}
            </div>
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
                  <List className="blog-list">
                    <ListItem>
                      <Card className={classes.card}>
                        <CardContent>
                          <Avatar
                            alt="pic"
                            src={`${base}${currentUser.imgurl}`}
                          />
                          <Typography
                            variant="headline"
                            component="h5"
                            className={classes.title}
                            color="textSecondary"
                          >
                            <ListItemText>{elem.blog_title}</ListItemText>
                          </Typography>
                          <Typography component="p">
                            {elem.blog_body}
                          </Typography>
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Posted on {dateFormat(elem.time_posted, "fullDate")}{" "}
                            at {dateFormat(elem.time_posted, "shortTime")}
                          </Typography>
                        </CardContent>
                      </Card>
                    </ListItem>
                  </List>
                ))
              )}
              <Divider />
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
