import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Profile from './Profile';

import NewBlog from '../Blogs/NewBlog';

class Users extends Component {

  render() {
    const { currentUser, score, getUserScore, allBlogs, getAllBlogPosts, classes, loggedIn } = this.props
    return (
      <Switch>
        <Route  exact path='/users/:username' render={(props) => <Profile {...props} currentUser={currentUser} loggedIn={loggedIn} score={score} getUserScore={getUserScore} allBlogs={allBlogs} classes={classes} getAllBlogPosts={getAllBlogPosts} />}/>
  
        <Route  exact path='/users/:username/blog' render={(props) => <NewBlog {...props} classes={classes} currentUser={currentUser} allBlogs={allBlogs} getAllBlogPosts={getAllBlogPosts}/>}/>
      </Switch>
    );
  }
}

export default Users;
