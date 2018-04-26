import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../../Views/App.css';

class NewUser extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      fullname: "",
      username: "",
      password: "",
      userAvailable: "",
      message: "By signing up, you agree to our Terms and Privacy Policy",
      validEmail: false
    };
  }

  // Track username and password input inside state
  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // When user submits form
  handleFormSubmit = e => {
    e.preventDefault();
    const { email, username, password, fullname } = this.state;
    if (email) {
      axios.get("/users").then(response => {
        console.log("RESPONSE FOR GET REQUEST", response.data.data);
        console.log(email);

        if (!response.data.data.find(n => n.email_add === email)) {
          this.setState({
            validEmail: true
          });
        } else {
          this.setState({
            validEmail: false,
            message: "email already in use"
          });
        }
      });
    }
    if (username && password) {
      if (password.length < 6) {
        return this.setState({
          message: "Password must be at least 6 characters"
        });
      }
      axios.get("/users").then(response => {
        console.log("RESPONSE FOR GET REQUEST", response.data.data);
        if (!response.data.data.find(n => n.username === username)) {
          axios
            .post("/users/new", {
              email: email,
              fullname: fullname,
              username: username,
              password: password
            })
            .then(res => {
              console.log(res);
              this.setState({
                email: "",
                fullname: "",
                username: "",
                password: "",
                message: "Registered user"
                
              });
            })
            .catch(err => {
              console.log(err);
              this.setState({
                email: "",
                fullname: "",
                username: "",
                password: "",
                message: "Error registering user"
              });
            });
        } else {
          this.setState({
            message: "Username  already exists"
          });
        }
      });
    } else {
      this.setState({
        message: "Please fill all forms"
      });
    }
  };

  render() {
    const { email, username, password, message, fullname } = this.state;
    console.log(this.state);

    return (
      <div className="register-user-container">
        <div className="registerBox">
          <h1 className="site-name">Movie Fights</h1>
          <form onSubmit={this.handleFormSubmit}>
            <input
              className="inputBoxes"
              type="email"
              placeholder="Email"
              name="email"
              onChange={this.handleInput}
              value={email}
            />
            <br />
            <input
              className="inputBoxes"
              type="text"
              placeholder="Full Name"
              name="fullname"
              onChange={this.handleInput}
              value={fullname}
            />
            <br />
            <input
              className="inputBoxes"
              type="text"
              placeholder="Username"
              name="username"
              onChange={this.handleInput}
              value={username}
            />
            <br />
            <input
              className="inputBoxes"
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleInput}
              value={password}
            />
            <br />
            <input
              className="loginBtn"
              type="submit"
              value="Sign up"
            />
          </form>
          <br />
          <p className="messageSize messageColor">{message}</p>
        </div> {/* End registerBox */}

        <div className="smallerBox">
          <p className="haveAnAcct">
            Have an account? <Link to="/users/login" className="noUnderline">Login</Link>
          </p>
        </div> {/* End smallerBox */}

        <div className="getAppBox">
          <p className="getTheApp">Get the app.</p>
          <div>
            <img
              className="appStore"
              src="https://i.imgur.com/UAP0XMk.png"
              alt="available on the app store"
              width="136"
              height="40"
            />
            <img
              src="https://i.imgur.com/1dnbtWG.png"
              alt="available on google play"
              width="136"
              height="40"
            />
          </div>
          <div>
            <img
              src="https://i.imgur.com/EVU0sxy.png"
              alt="Coalition for Queens"
              width="100"
              height="30"
              align="center"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default NewUser;
