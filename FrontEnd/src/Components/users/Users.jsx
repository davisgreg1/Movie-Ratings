import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Profile from './Profile';

class Users extends Component {
  constructor(props){
    super(props)
  }
  render() {
    const { currentUser, loggedIn, user, score } = this.props
    return (
      <Switch>
        <Route  path='/users/:username' render={(props) => <Profile {...props} currentUser={user} score={score} />}/>
        {/* <Route path='/users/:username/edit' render={(props) => <EditProfile {...props} user={user} />}/> */}
      </Switch>
    );
  }
}

export default Users;
