import React from "react";
import axios from "axios";
import {connect} from 'react-redux';
import dateFormat from "dateformat";
import { withStyles } from "material-ui/styles";
import Card, { CardContent} from "material-ui/Card";
import CircularProgress from "material-ui/Progress/CircularProgress";
import Divider from "material-ui/Divider";
import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemText from "material-ui/List/ListItemText";
import Modal from "material-ui/Modal";
import Avatar from "material-ui/Avatar";
import Typography from "material-ui/Typography";
import Icon from "@material-ui/core/Icon";
import Button from "material-ui/Button";
import Tooltip from "@material-ui/core/Tooltip";
import "../../Views/App.css";
import EditProfile from "./EditProfile";
import NewBlog from "../Blogs/NewBlog";
import EditBlog from "../Blogs/EditBlog";
import {getUserBlogs} from '../../actions/PostsActions.js';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
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
  },
  fab: {
    margin: theme.spacing.unit * 0
  }
});

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
};

const modalStyleBlog = {
  display: "flex",
  boxSizing: "borderBox",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  boxShadow: "10px 5px 5px black"
};
const modalStyleEditBlog = {
  display: "flex",
  boxSizing: "borderBox",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  boxShadow: "10px 5px 5px black"
};
const modalIsOpen = {
  filter: "blur(5px) grayscale(50%)"
};

class Profile extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      auth: false,
      anchorEl: null,
      fireRedirect: false,
      blogs: null,
      editOpen: false,
      blogOpen: false,
      blogEditOpen: false,
      blogToEdit: null,
      blogToDelete: null
    };
  }
  

  handleBlogOpen = e => {
    e.preventDefault();
    this.setState({ blogOpen: true });
  };

  handleEditOpen = e => {
    e.preventDefault();
    this.setState({ editOpen: true });
  };

  handleEditBlogOpen = (e, elem) => {
    e.preventDefault();
    this.setState({ blogEditOpen: true, blogToEdit: elem });
  };

  handleBlogDelete = async elem => {
    this.setState({
      blogToDelete: elem.id
    });
    const response = await axios
      .delete(`/users/removeBlog/${elem.id}`)

    window.location.reload();
  };

  handleBlogModalClose = e => {
    e.preventDefault();
    this.setState({ blogOpen: false });
  };

  handleEditModalClose = e => {
    e.preventDefault();
    this.setState({ editOpen: false });
  };

  handleEditBlogModalClose = e => {
    e.preventDefault();
    this.setState({ blogEditOpen: false });
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

  render() {
    const {
      classes,
      currentUser,
      allBlogs,
      loggedIn,
    } = this.props;
    const {
      blogOpen,
      editOpen,
      blogToEdit,
      blogEditOpen,
  
    } = this.state;
    const { handleEditBlogOpen, handleBlogDelete } = this;
    const base = "http://res.cloudinary.com/movie-fights/image/upload/a_auto/";
    
    return (
      <React.Fragment>
        {loggedIn ? (
          <div
            className="profile"
            style={blogOpen || editOpen || blogEditOpen ? modalIsOpen : null}
          >
            {/* left section of profile */}
            <div className={"animated profile-img"}>
            {/* user image */}
              <img
                src={`${base}${currentUser.imgurl}`}
                width="175px"
                height="175px"
                style={profileStyle}
                alt={`${currentUser.firstname}`}
              />
              {/* user blurb */}
              <div className="user-choices">
                {currentUser.blurb ? (
                  <p className="blurb">"{currentUser.blurb}"</p>
                ) : null}
              </div>
                {/* new blog */}
              <div className="user-choices">
                <Modal
                  style={modalStyleBlog}
                  aria-labelledby="openBlogTitle"
                  aria-describedby="openBlogDescription"
                  open={this.state.blogOpen}
                  onClose={this.handleBlogModalClose}
                >
                  <NewBlog currentUser={currentUser} />
                </Modal>
                <Button onClick={this.handleBlogOpen}>New Blog</Button>
              </div>
                  {/* edit profile */}
              <div className="user-choices">
                <Modal
                  style={modalStyleEdit}
                  aria-labelledby="openEditProfileTitle"
                  aria-describedby="openBlogDescription"
                  open={this.state.editOpen}
                  onClose={this.handleEditModalClose}
                >
                  <EditProfile currentUser={currentUser} />
                </Modal>
                <Button onClick={this.handleEditOpen}>Edit Profile</Button>
              </div>
            </div>
            {/* welcome greeting */}
            <div className={"welcome-message-profile"} id="greeting">
              <span
                style={{
                  fontSize: "39px",
                  position: "relative",
                  top: "-11px",
                  paddingRight: "12px"
                }}
              >
                Welcome
              </span>{" "}
              to your dashboard {currentUser.firstname}!
            </div>

            {/* blog section */}
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
              ) : allBlogs.length === 0 ? (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "15%"
                  }}
                >
                  Blog about your favorite movies...or, just whatever!
                </div>
              ) : (
                allBlogs.map((elem, idx) => (
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
                            <Divider />
                            {elem.time_posted === elem.time_edited ? (
                              <p>
                                Posted on{" "}
                                {dateFormat(elem.time_posted, "fullDate")} at{" "}
                                {dateFormat(elem.time_posted, "shortTime")}{" "}
                              </p>
                            ) : (
                              <div>
                                <p>
                                  Original Post{" "}
                                  {dateFormat(elem.time_posted, "fullDate")} at{" "}
                                  {dateFormat(elem.time_posted, "shortTime")}{" "}
                                </p>
                                <p>
                                  Last Edited on{" "}
                                  {dateFormat(elem.time_edited, "fullDate")} at{" "}
                                  {dateFormat(elem.time_edited, "shortTime")}
                                </p>
                              </div>
                            )}
                          </Typography>
                          <div className="edit-blog-container">
                            <Tooltip
                              id="tooltip-edit"
                              title="Edit"
                              enterDelay={300}
                              leaveDelay={300}
                              placement="bottom"
                            >
                              <IconButton
                                size="mini"
                                variant="fab"
                                mini
                                onClick={(event) => handleEditBlogOpen(event, elem)}
                                aria-label="Edit"
                                className={classes.fab}
                              >
                                <Icon size="mini">edit_icon</Icon>
                              </IconButton>
                            </Tooltip>
                            <div>
                              <Tooltip
                                id="tooltip-icon"
                                enterDelay={300}
                                leaveDelay={300}
                                title="Delete"
                                placement="bottom"
                              >
                                <IconButton
                                  size="mini"
                                  onClick={() => handleBlogDelete(elem)}
                                  aria-label="Delete"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </ListItem>
                    <Divider />
                  </List>
                ))
              )}
              <Modal
                style={modalStyleEditBlog}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.blogEditOpen}
                onClose={this.handleEditBlogModalClose}
              >
                <EditBlog currentUser={currentUser} blogToEdit={blogToEdit} />
              </Modal>
            </div>

          </div>
        ) : (
          <div style={{display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center", height:"100vh"}}>Must Be Logged In...</div>
        )}
      </React.Fragment>
    );
  }
}
// const mapDispatchToProps = dispatch => ({
//   getBlogs: () => dispatch(getUserBlogs())
// })

const mapStateToProps = state => ({
  loggedIn: state.sessionReducer.userAuthenticated,
  currentUser: state.sessionReducer.user,
  // allUserBlogs: state.postsReducer.posts
})
export default connect(mapStateToProps, null)(withStyles(styles)(Profile));
