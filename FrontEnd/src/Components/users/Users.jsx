import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Profile from './Profile';
// import NavBar from "./Components/NavBar";
// import EditProfile from './EditProfile'


class Users extends Component {
  constructor(props){
    super(props)
  }
  render() {
    const { currentUser, loggedIn, user } = this.props
    return (
      <Switch>
        <Route  path='/users/:username' render={(props) => <Profile {...props} currentUser={user}  />}/>
        {/* <Route path='/users/:username/edit' render={(props) => <EditProfile {...props} user={user} />}/> */}
      </Switch>
    );
  }
}

export default Users;
