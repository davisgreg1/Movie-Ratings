import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Profile from './Profile';
import EditProfile from './EditProfile';
import NewBlog from '../Blogs/NewBlog';

class Users extends Component {
  constructor(props){
    super(props)
  }
  
  render() {
    const { currentUser, loggedIn, score, getUserScore, getUserInfo, allBlogs, getAllBlogPosts, classes } = this.props
    return (
      <Switch>
        <Route  exact path='/users/:username' render={(props) => <Profile {...props} currentUser={currentUser} score={score} getUserScore={getUserScore} allBlogs={allBlogs} classes={classes} getAllBlogPosts={getAllBlogPosts} />}/>
        <Route  exact path='/users/:username/edit' render={(props) => <EditProfile {...props} classes={classes} currentUser={currentUser} />}/>
        <Route  exact path='/users/:username/blog' render={(props) => <NewBlog {...props} classes={classes} currentUser={currentUser} allBlogs={allBlogs} getAllBlogPosts={getAllBlogPosts}/>}/>
      </Switch>
    );
  }
}

export default Users;
