import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import Game from "./Components/Game";
import Profile from "./Components/Users/Profile";
import LoginUser from "./Components/Users/LoginUser";
import LogOut from "./Components/Users/LogOut";
import NewUser from "./Components/Users/NewUser";
import axios from "axios";
import "./Views/App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      newUser: true
    };
  }

  setUser = user => {
    this.setState({ user: user });
  };

  logOutUser = () => {
    this.setState({ user: null });
  };

  renderLogin = () => {
    return <LoginUser setUser={this.setUser} />;
  };

  renderLogOut = () => {
    return <LogOut logOutUser={this.logOutUser} />;
  };

  renderNew = () => {
    return <NewUser />;
  };

  // Home is the feed screen
  renderProfile = () => {
    const { user } = this.state;
    if (user) {
      return <Profile user={user} />;
    } else {
      return <h1>Must be logged in</h1>;
    }
  };
  renderHome = () => {
    const { user } = this.state;
    if (user) {
      return <Home user={user} />;
    } else {
      return <Home user={null}/>
    }
  };

  render() {
    const { user, newUser } = this.state;
    console.log(user);
    if (user) {
      console.log(user.fullname);
    }

    return (
      <div className="entire-app"> 
          <Route exact path="/" render={this.renderHome} />
          <Route exact path="/users" render={this.renderLogin} />
          <Route path="/users/login" render={this.renderLogin} />
          <Route path="/users/new" render={this.renderNew} />
          <Route path="/users/logout" render={this.renderLogout} />
          <Route path="/users/profile" render={this.renderProfile} />
          {/* <Route path="/users/u/:id" component={User} /> */}
      </div>
    );
  }
}

export default App;


// class App extends React.Component {
// constructor(props){
//   super(props)
// }
//   state = {
//     user: null
//   }

//   setUser = user => {
//     this.setState({ user: user });
//   };
  
//   logOutUser = () => {
//     this.setState({ user: null });
//   };
  
//   renderLogin = () => {
//     return <LoginUser setUser={this.setUser} />;
//   };
  
//   renderLogOut = () => {
//     return <LogOut logOutUser={this.logOutUser} />;
//   };

//   render() {
//     return (

//         <div className="app">
//           <Switch>
//             <Route exact path="/" component={Home} />
//             <Route path="/game" component={Game} />
//             <Route path="/login" render={this.renderLogin} />
//           </Switch>
//         </div>

//     )}
//   }

// export default App;
