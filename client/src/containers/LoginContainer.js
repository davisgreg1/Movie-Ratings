// import PropTypes from 'prop-types'
import React from 'react';
import {connect} from 'react-redux'
import {login} from '../actions/SessionActions';
import LoginUser from '../Components/login/LoginUser';

const LoginContainer = ({isAuthenticated, authenticatedUser, loginUser}) => {
  const submitLoginForm = (username, password) => {
    const {loginUser} = props;
    return (loginUser(username, password))
  }
  return (<LoginUser
    submitForm={submitLoginForm}
    loggedIn={isAuthenticated}
    user={authenticatedUser}
    loginUser={loginUser}/>)
}

const mapStateToProps = state => ({authenticatedUser: state.sessionReducer.user.data, isAuthenticated: state.sessionReducer.user.userAuthenticated})

const mapDispatchToProps = dispatch => ({
  loginUser: (username, password) => dispatch(login(username, password))
})
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
