import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Profile from './Profile';

class Users extends Component {
  constructor(props){
    super(props)
  }
  // componentDidMount() {
  //   this.props.getUserInfo()
  // }
  render() {
    const { currentUser, loggedIn, score, getUserScore, getUserInfo } = this.props
    console.log("props in User:", this.props)
    return (
      <Switch>
        <Route  path='/users/:username' render={(props) => <Profile {...props} currentUser={currentUser} score={score} getUserScore={getUserScore}/>}/>
        {/* <Route path='/users/:username/edit' render={(props) => <EditProfile {...props} user={user} />}/> */}
      </Switch>
    );
  }
}

export default Users;
