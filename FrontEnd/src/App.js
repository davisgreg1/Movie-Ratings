import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import Game from "./Components/Game";
// import LoginUser from "./users/LoginUser";
// import LogOut from "./users/LogOut";
import axios from "axios";
import "./Views/App.css";

// const AppContext = React.createContext();

// class AppProvider extends React.Component {


//   render() {
//     return (
//       <AppContext.Provider value={{ state: this.state }}>
//         {this.props.children}
//       </AppContext.Provider>
//     );
//   }
// }



// Home is the feed screen
// renderHome = () => {
//   const { user } = this.state;
//   if (user) {
//     return <Home user={user} />;
//   } else {
//     return <h1>Must be logged in</h1>;
//   }
// };

class App extends React.Component {
constructor(props){
  super(props)
}
  state = {
    user: null
  }

  setUser = user => {
    this.setState({ user: user });
  };
  
  logOutUser = () => {
    this.setState({ user: null });
  };
  
  // renderLogin = () => {
  //   return <LoginUser setUser={this.setUser} />;
  // };
  
  // renderLogOut = () => {
  //   return <LogOut logOutUser={this.logOutUser} />;
  // };

  render() {
    return (
      // <AppProvider>
        <div className="app">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/game" component={Game} />
          </Switch>
        </div>
      // {/* </AppProvider> */}
    )}
  }

export default App;
