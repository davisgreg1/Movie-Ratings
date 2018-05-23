import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Profile from './Profile';
import EditProfile from './EditProfile';

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
        <Route  exact path='/users/:username' render={(props) => <Profile {...props} currentUser={currentUser} score={score} getUserScore={getUserScore}/>}/>
        <Route  exact path='/users/:username/edit' render={(props) => <EditProfile {...props} currentUser={currentUser} />}/>
      </Switch>
    );
  }
}

export default Users;
