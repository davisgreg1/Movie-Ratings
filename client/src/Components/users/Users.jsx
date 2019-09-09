import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Profile from './Profile';
import NewBlog from '../Blogs/NewBlog';
import {getUserBlogs} from '../../actions/PostsActions.js';


class Users extends Component {
  
  componentDidMount() {
    this.props.getBlogs()
  }

  render() {
    const {
      score,
      getUserScore,
      allUserBlogs,
      classes
    } = this.props
    return (
      <Switch>
        <Route
          exact
          path='/users/:username'
          render={(props) => <Profile
          {...props}
          score={score}
          getUserScore={getUserScore}
          allBlogs={allUserBlogs}
          classes={classes}
          />}/>

        <Route
          exact
          path='/users/:username/blog'
          render={(props) => <NewBlog
          {...props}
          classes={classes}
          allBlogs={allUserBlogs}
          />}/>
      </Switch>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getBlogs: () => dispatch(getUserBlogs())
})

const mapStateToProps = state => ({
  loggedIn: state.sessionReducer.userAuthenticated,
  currentUser: state.sessionReducer.user,
  allUserBlogs: state.postsReducer.posts
})
export default connect(mapStateToProps, mapDispatchToProps)(Users)
